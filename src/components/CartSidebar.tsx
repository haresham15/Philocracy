"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { checkout } from "@/app/actions/checkout";
import { useState } from "react";
import { getShippingRates, type ShippingRate } from "@/app/actions/shipping";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } =
    useCartStore();
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  const [zipCode, setZipCode] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);

  const handleCheckout = async () => {
    try {
      let finalRates = shippingRates;
      
      // Attempt to calculate rates immediately if they haven't but provided a zip
      if (!finalRates.length) {
        setIsCalculating(true);
        finalRates = await getShippingRates(zipCode, items);
        setShippingRates(finalRates);
        setIsCalculating(false);
      }

      const result = await checkout(items, finalRates);
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        "Checkout is unavailable. Please add your Stripe API keys to .env.local"
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col bg-soft-cream sm:max-w-lg" side="right">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl font-bold tracking-tight text-charcoal">
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blush-pink-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blush-pink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button
              onClick={closeCart}
              variant="outline"
              className="border-blush-pink text-charcoal hover:bg-blush-pink-light rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 rounded-xl bg-white p-3 shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-warm-cream">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-charcoal">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 rounded-full border border-border bg-soft-cream">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="px-2.5 py-1 text-sm text-charcoal hover:text-blush-pink-deep transition-colors"
                          >
                            −
                          </button>
                          <span className="min-w-[20px] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="px-2.5 py-1 text-sm text-charcoal hover:text-blush-pink-deep transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-heading text-sm font-bold text-charcoal">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-warm-tan-light" />

            {/* Footer */}
            <SheetFooter className="flex-col gap-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-xl font-bold text-charcoal">
                  ${(totalPrice / 100).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>

              {/* Zip Code for Shipping */}
              <div className="flex flex-col gap-2 w-full pt-2 pb-2">
                <label htmlFor="zipCode" className="text-xs font-semibold text-charcoal">
                  Calculate Shipping
                </label>
                <div className="flex gap-2">
                  <input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Destination Zip Code"
                    className="flex h-10 w-full rounded-xl border border-input/50 bg-white/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    maxLength={10}
                  />
                  <Button 
                    variant="outline" 
                    className="whitespace-nowrap rounded-xl border-input/50"
                    onClick={async () => {
                      if (zipCode.length < 5) return;
                      setIsCalculating(true);
                      const rates = await getShippingRates(zipCode, items);
                      setShippingRates(rates);
                      setIsCalculating(false);
                    }}
                    disabled={isCalculating || zipCode.length < 5}
                  >
                    {isCalculating ? "Calculating..." : "Get Rates"}
                  </Button>
                </div>
                {shippingRates.length > 0 && (
                  <div className="rounded-lg bg-green-50 p-2 mt-1">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Shipping rates calculated and ready for checkout.
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full rounded-full bg-charcoal py-6 text-sm font-semibold uppercase tracking-widest text-white hover:bg-charcoal/90 transition-all"
              >
                Checkout — ${(totalPrice / 100).toFixed(2)}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
