"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData: FormData) {
  const passcode = formData.get("passcode") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (passcode.trim() === adminPassword?.trim()) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", passcode.trim(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    redirect("/admin/orders");
  } else {
    throw new Error("Invalid access code.");
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { error } = await supabase
    .from("orders")
    .update({ fulfillment_status: status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error.message);
    throw new Error("Failed to update status");
  }
  
  revalidatePath("/admin/orders");
}

import { stripe } from "@/lib/stripe";

export async function syncHistoricalOrders() {
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    status: 'complete',
    expand: ['data.shipping_cost.shipping_rate']
  });

  const { data: existingIds } = await supabase.from("orders").select("stripe_session_id");
  const mappedExisting = new Set(existingIds?.map((i) => i.stripe_session_id) || []);

  const newSessions = sessions.data.filter((s) => !mappedExisting.has(s.id));

  if (newSessions.length === 0) {
    return { success: true, count: 0 };
  }

  const ordersToInsert = newSessions.map((session: any) => {
    const shippingDetails = session.shipping_details;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const amountTotal = session.amount_total;
    
    const shippingRate = session.shipping_cost?.shipping_rate;
    const shippingMethodTitle = shippingRate?.display_name || "Local Pickup (OSU Base)";
    const isPickup = shippingMethodTitle.toLowerCase().includes("pickup");
    const itemsSummary = session.metadata?.sizes || "No sizes metadata";

    return {
      stripe_session_id: session.id,
      customer_email: customerEmail,
      customer_name: customerName,
      amount_total: amountTotal,
      shipping_method: shippingMethodTitle,
      is_pickup: isPickup,
      shipping_address: shippingDetails?.address || null,
      status: "paid",
      items_summary: itemsSummary,
      fulfillment_status: "unfulfilled",
      created_at: new Date(session.created * 1000).toISOString()
    };
  });

  const { error } = await supabase.from("orders").insert(ordersToInsert);

  if (error) {
    console.error("Error syncing orders from Stripe:", error.message);
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local. Your database is not connected.");
    }
    throw new Error(`Database error: ${error.message}`);
  }

  revalidatePath("/admin/orders");
  return { success: true, count: newSessions.length };
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }

  return data;
}

import { Shippo } from "shippo";

// Lazy-initialize Shippo to avoid crashing the module at import time
// when SHIPPO_API_KEY is missing (e.g., on the login page)
let _shippoInstance: Shippo | null = null;
function getShippo(): Shippo {
  if (!_shippoInstance) {
    const token = process.env.SHIPPO_API_KEY;
    if (!token) {
      throw new Error("Missing SHIPPO_API_KEY in environment variables. Add it to .env.local and Vercel.");
    }
    _shippoInstance = new Shippo({ apiKeyHeader: token });
  }
  return _shippoInstance;
}

// Must match the origin in src/app/actions/shipping.ts so label costs align with quoted rates
const ORIGIN_ADDRESS = {
  name: "Philocracy Fulfillment",
  company: "Philocracy",
  street1: "6659 Perimeter Dr",
  city: "Dublin",
  state: "OH",
  zip: "43016",
  country: "US",
  phone: "555-555-5555",
  email: "support@philocracy.com",
};

export async function generateShippingLabel(orderId: string) {
  // getShippo() will throw if SHIPPO_API_KEY is missing
  const shippo = getShippo();

  // 1. Fetch order details
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    throw new Error("Order not found in database.");
  }

  if (order.is_pickup) {
    throw new Error("Cannot generate shipping label for a local pickup order.");
  }

  // 2. Prevent double-purchasing a label
  if (order.tracking_number && order.label_url) {
    return {
      success: true,
      labelUrl: order.label_url,
      trackingNumber: order.tracking_number,
      alreadyExisted: true,
    };
  }

  const address = order.shipping_address;
  if (!address || !address.line1 || !address.city || !address.state || !address.postal_code) {
    throw new Error("Incomplete shipping address on order. Cannot generate label.");
  }

  try {
    // 3. Create the shipment with origin and destination
    const shipment = await shippo.shipments.create({
      addressFrom: ORIGIN_ADDRESS,
      addressTo: {
        name: order.customer_name || "Customer",
        street1: address.line1,
        street2: address.line2 || "",
        city: address.city,
        state: address.state,
        zip: address.postal_code,
        country: address.country || "US",
        email: order.customer_email || undefined,
      },
      parcels: [
        {
          length: "12",
          width: "10",
          height: "2",
          distanceUnit: "in",
          weight: "16",
          massUnit: "oz",
        },
      ],
    });

    if (!shipment.rates || shipment.rates.length === 0) {
      throw new Error("No shipping rates available for this address. Verify the address is valid.");
    }

    // 4. Find the lowest cost rate
    const cheapestRate = shipment.rates.reduce((prev: any, curr: any) => {
      return parseFloat(prev.amount) < parseFloat(curr.amount) ? prev : curr;
    });

    // 5. Purchase the label via Transactions
    const transaction = await shippo.transactions.create({
      rate: cheapestRate.objectId,
      async: false,
    });

    if (transaction.status !== "SUCCESS") {
      const msgs = (transaction as any).messages?.map((m: any) => m.text).join("; ") || "Unknown error";
      throw new Error(`Shippo label purchase failed: ${msgs}`);
    }

    // 6. Persist tracking number + label URL and mark shipped
    await supabase.from("orders").update({
      fulfillment_status: "shipped",
      tracking_number: transaction.trackingNumber || null,
      label_url: transaction.labelUrl || null,
    }).eq("id", orderId);

    revalidatePath("/admin/orders");
    
    return { 
      success: true, 
      labelUrl: transaction.labelUrl, 
      trackingNumber: transaction.trackingNumber,
      alreadyExisted: false,
    };

  } catch (err: any) {
    console.error("Shippo error:", err);
    throw new Error(err.message || "Failed to communicate with Shippo API.");
  }
}

