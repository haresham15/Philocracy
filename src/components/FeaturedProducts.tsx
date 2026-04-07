"use client";

import { ProductCard } from "@/components/ProductCard";
import products from "@/data/products.json";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="relative bg-soft-cream py-28 sm:py-36 overflow-hidden" id="featured">
      <div className="bg-noise absolute inset-0 z-0 opacity-15 mix-blend-overlay" />

      {/* Sweeping Ambient Background Blurs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-blush-pink/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-amber/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-charcoal/10 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-charcoal backdrop-blur-md mb-6 shadow-sm">
              Exclusive Drops
            </span>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl md:text-6xl drop-shadow-sm">
              Current Collaborations
            </h2>
          </div>
          
          <Link
            href="/shop"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-full border border-charcoal/20 bg-white/60 backdrop-blur-md px-8 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-500 hover:bg-charcoal hover:text-white hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Archive
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </Link>
        </div>

        {/* Product grid - Dark spacing */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
