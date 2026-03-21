"use client";

import { ProductCard } from "@/components/ProductCard";
import products from "@/data/products.json";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-soft-cream pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blush-pink">
            Collaborations
          </p>
          <h1 className="font-heading mt-2 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            All Drops
          </h1>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-muted-foreground">
              No drops available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
