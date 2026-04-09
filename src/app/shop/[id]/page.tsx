import products from "@/data/products.json";
import { ProductClient } from "./ProductClient";
import Link from "next/link";
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Philocracy`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-cream pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Product not found
          </h1>
          <Link
            href="/shop"
            className="mt-4 inline-block text-amber-deep underline"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const ldJson = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0].startsWith('http') ? product.images[0] : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://philocracy.com'}${product.images[0]}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Philocracy"
    },
    "offers": {
      "@type": "Offer",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://philocracy.com'}/shop/${product.id}`,
      "priceCurrency": "USD",
      "price": (product.price / 100).toFixed(2),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Philocracy"
      }
    }
  };

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-20 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      
      <ProductClient product={product} />
    </div>
  );
}
