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
