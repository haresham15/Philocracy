"use server";

import { Shippo } from "shippo";
import type { CartItem } from "@/store/cart-store";
import products from "@/data/products.json";

// Initialize Shippo client
const shippo = new Shippo({
  apiKeyHeader: process.env.SHIPPO_API_KEY || "shippo_test_dummy_key",
});

export type ShippingRate = {
  id: string;
  provider: string;
  amount: string;
  currency: string;
  duration_terms: string;
  title: string;
};

// UPS Center in Perimeter, Dublin OH
const ADDRESS_FROM = {
  name: "Philocracy",
  street1: "6659 Perimeter Dr", // The UPS Store at Perimeter
  city: "Dublin",
  state: "OH",
  zip: "43016",
  country: "US",
};

export async function getShippingRates(
  zipCode: string,
  items: CartItem[]
): Promise<ShippingRate[]> {
  // 1. Calculate total weight
  let totalWeightOz = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (product?.weight_oz) {
      totalWeightOz += product.weight_oz * item.quantity;
    } else {
      totalWeightOz += 10 * item.quantity; // Default to 10oz if not found
    }
  }

  // 2. Local pickup is always an option
  const localPickupOption: ShippingRate = {
    id: "pickup",
    provider: "Local",
    amount: "0.00",
    currency: "USD",
    duration_terms: "Available immediately at OSU Base",
    title: "Local Pickup (OSU Base)",
  };

  // If no dummy key provided or dummy zip, we might fail Shippo call,
  // but let's try calling it when ZIP is provided.
  if (!zipCode || zipCode.length < 5) {
    return [localPickupOption];
  }

  try {
    // 3. Create a shipment via Shippo
    const shipmentMatch = await shippo.shipments.create({
      addressFrom: ADDRESS_FROM,
      addressTo: {
        zip: zipCode,
        country: "US", // We default to US for now
      },
      parcels: [
        {
          length: "10",
          width: "10",
          height: "10",
          distanceUnit: "in",
          weight: totalWeightOz.toString(),
          massUnit: "oz",
        },
      ],
      async: false,
    });

    // 4. Map rates
    const mappedRates: ShippingRate[] = (shipmentMatch.rates || [])
      .filter(
        (rate) =>
          rate.provider.toLowerCase().includes("ups") ||
          rate.provider.toLowerCase().includes("usps") // fallback to USPS if UPS is disabled on test account
      )
      .map((rate) => ({
        id: rate.objectId,
        provider: rate.provider,
        amount: rate.amount,
        currency: rate.currency,
        duration_terms: rate.durationTerms || rate.estimatedDays + " Days",
        title: rate.provider + " " + rate.servicelevel.name,
      }));

    // Optionally sort or filter to explicitly just UPS Ground / Next Day
    // But returning what Shippo gives us for UPS is safer.

    // Return the default pickup option first
    return [localPickupOption, ...mappedRates];
  } catch (error) {
    console.error("Error fetching Shippo rates:", error);
    // If Shippo fails (e.g., missing API key or bad zip), return at least local pickup and a generic fallback
    return [
      localPickupOption,
      {
        id: "fallback-standard",
        provider: "Fallback",
        amount: "5.00",
        currency: "USD",
        duration_terms: "3-5 Business Days",
        title: "Standard Shipping (Fallback)",
      },
    ];
  }
}
