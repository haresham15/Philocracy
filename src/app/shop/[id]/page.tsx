"use client";

import { use } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-cream pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Product not found
          </h1>
          <Link
            href="/shop"
            className="mt-4 inline-block text-light-orange underline"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-charcoal transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Charity badge */}
            <Badge className="absolute top-4 left-4 charity-badge-glow bg-sand-green/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1.5 h-3.5 w-3.5"
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
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-purple">
              {product.category}
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              ${(product.price / 100).toFixed(2)}
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-charcoal">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-5 py-3 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-border bg-white text-charcoal hover:border-warm-tan"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-2 text-xs text-light-orange">
                  Please select a size
                </p>
              )}
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              size="lg"
              className={`mt-8 py-7 text-sm font-semibold uppercase tracking-widest transition-all ${
                added
                  ? "bg-sand-green text-white hover:bg-sand-green"
                  : "bg-charcoal text-white hover:bg-charcoal/90"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </Button>

            {/* Charity info */}
            <div className="mt-10 rounded-xl border border-sand-green/30 bg-sand-green/5 p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💚</span>
                <div>
                  <p className="text-sm font-bold text-charcoal">
                    Proceeds support{" "}
                    <span className="text-sand-green">
                      {product.charity_partner}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.charity_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
