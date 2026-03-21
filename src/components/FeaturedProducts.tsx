"use client";

import { ProductCard } from "@/components/ProductCard";
import products from "@/data/products.json";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden" id="featured">
      {/* Subtle decorative elements */}
      <div className="absolute top-8 left-8 h-20 w-20 rounded-full bg-blush-pink/5 blur-xl" />
      <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-amber/5 blur-xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blush-pink">
              Exclusive Drops
            </p>
            <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
              Current Collaborations
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-charcoal px-6 py-2.5 text-sm font-medium text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white hover:shadow-lg"
          >
            View All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
