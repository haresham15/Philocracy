"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-2 border border-white/10 group">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none" />

        {/* Image */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-[#faf9f6]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-1000 ease-out ${
              isHovering ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Quick add Glass Pill */}
          <div
            className={`absolute inset-x-0 bottom-6 flex justify-center z-20 transition-all duration-500 ease-out ${
              isHovering
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleQuickAdd();
              }}
              className="rounded-full bg-white/20 border border-white/40 px-8 py-3 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl transition-all hover:bg-white hover:text-charcoal hover:scale-105 shadow-xl"
            >
              + Quick Add
            </button>
          </div>

          {/* Premium Streetwear Tag / Badge */}
          <div
            className="absolute top-4 left-4 z-20"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setBadgeHover(true)}
            onMouseLeave={() => setBadgeHover(false)}
          >
            <div className="relative overflow-hidden rounded-sm bg-zinc-900 border-l-2 border-blush-pink px-3 py-1.5 shadow-lg group/badge">
              <span className="relative z-10 flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-blush-pink" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                Impact Embedded
              </span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/badge:translate-x-0 transition-transform duration-300 pointer-events-none" />
            </div>

            {/* Charity tooltip */}
            <div className={`absolute top-full left-0 z-30 mt-2 w-56 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 origin-top-left ${badgeHover ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blush-pink-deep">
                Beneficiary
              </p>
              <p className="mt-1 text-sm font-black text-charcoal">
                {product.charity_partner}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70 border-t border-charcoal/10 pt-2">
                {product.charity_description}
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 bg-white relative z-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-1">
            {product.category}
          </p>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-lg font-black tracking-tight text-charcoal group-hover:text-amber-deep transition-colors duration-300">
              {product.name}
            </h3>
            <p className="font-mono text-base font-medium text-charcoal bg-soft-cream px-2 py-0.5 rounded-md">
              ${(product.price / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
