"use server";

import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/store/cart-store";

export async function checkout(items: CartItem[]) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in .env.local");
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${item.image}`,
        ],
        metadata: {
          size: item.size,
          product_id: item.id,
        },
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop`,
    metadata: {
      sizes: items.map((i) => `${i.name}: ${i.size}`).join(", "),
    },
  });

  return { url: session.url };
}
