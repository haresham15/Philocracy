"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  charity_partner: string;
  charity_description: string;
  images: string[];
  sizes: string[];
  category: string;
  featured?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [isHovering, setIsHovering] = useState(false);
  const [badgeHover, setBadgeHover] = useState(false);

  const handleQuickAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[1] || product.sizes[0],
      image: product.images[0],
    });
    openCart();
  };

  const handleCardClick = () => {
    router.push(`/shop/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group block cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleCardClick();
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-warm-cream"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovering ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Quick add overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${
              isHovering
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleQuickAdd();
              }}
              className="w-full rounded-xl bg-charcoal/90 py-3 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-charcoal hover:shadow-lg"
            >
              Quick Add — {product.sizes[1] || product.sizes[0]}
            </button>
          </div>

          {/* Charity Badge */}
          <div
            className="absolute top-3 left-3 z-10"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setBadgeHover(true)}
            onMouseLeave={() => setBadgeHover(false)}
          >
            <Badge className="charity-badge-glow cursor-help bg-blush-pink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-blush-pink border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Gives Back
            </Badge>

            {/* Charity tooltip */}
            {badgeHover && (
              <div className="absolute top-full left-0 z-20 mt-2 w-56 rounded-xl bg-charcoal/95 p-3 shadow-xl backdrop-blur-sm">
                <p className="text-xs font-semibold text-blush-pink">
                  Proceeds support
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                  {product.charity_partner}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                  {product.charity_description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading text-base font-semibold tracking-tight text-charcoal group-hover:text-blush-pink-deep transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>
          <p className="mt-2 font-heading text-lg font-bold text-charcoal">
            ${(product.price / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
