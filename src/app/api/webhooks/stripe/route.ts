import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret or signature missing" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    try {
      // Expand session to get shipping rate details
      const expandedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["shipping_cost.shipping_rate"] }
      ) as any;

      const shippingDetails = expandedSession.shipping_details;
      const customerEmail = expandedSession.customer_details?.email;
      const customerName = expandedSession.customer_details?.name;
      const amountTotal = expandedSession.amount_total;
      
      const shippingRate = expandedSession.shipping_cost?.shipping_rate as any;
      const shippingMethodTitle = shippingRate?.display_name || "Local Pickup (OSU Base)";
      const isPickup = shippingMethodTitle.toLowerCase().includes("pickup");

      // Log into Supabase
      const { error } = await supabase.from("orders").insert([
        {
          stripe_session_id: expandedSession.id,
          customer_email: customerEmail,
          customer_name: customerName,
          amount_total: amountTotal,
          shipping_method: shippingMethodTitle,
          is_pickup: isPickup,
          shipping_address: shippingDetails?.address || null,
          status: "paid",
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error.message);
        // We still return 200 so Stripe doesn't retry infinitely if DB fails,
        // or return 500 so it does retry. 500 is safer if we absolutely must ensure logging.
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    } catch (err: any) {
      console.error("Error processing checkout.session.completed:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
