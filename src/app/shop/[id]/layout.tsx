import type { Metadata } from "next";
import products from "@/data/products.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found | Philocracy" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
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

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: `https://philocracy.com${product.images[0]}`,
              description: product.description,
              brand: {
                "@type": "Brand",
                name: "Philocracy",
              },
              offers: {
                "@type": "Offer",
                url: `https://philocracy.com/shop/${product.id}`,
                priceCurrency: "USD",
                price: (product.price / 100).toFixed(2),
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
              },
            }),
          }}
        />
      )}
      {children}
    </>
  );
}
