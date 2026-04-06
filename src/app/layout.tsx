import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://philocracy.com"),
  title: {
    default: "Philocracy — Governance By Love",
    template: "%s | Philocracy",
  },
  description:
    "Premium streetwear that gives back to the community. Every piece you wear makes an impact. Supporting non-profits through fashion.",
  keywords: [
    "streetwear",
    "charity",
    "non-profit fashion",
    "exclusive drops",
    "Columbus OH",
    "Philocracy",
    "governance by love",
  ],
  authors: [{ name: "Philocracy" }],
  openGraph: {
    title: "Philocracy — Governance By Love",
    description:
      "Premium streetwear that gives back to the community. Every piece you wear makes an impact.",
    siteName: "Philocracy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philocracy — Governance By Love",
    description:
      "Premium streetwear that gives back to the community. Every piece you wear makes an impact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Philocracy",
              url: "https://philocracy.com",
              logo: "https://philocracy.com/icon.jpeg",
              description:
                "Premium streetwear that gives back to the community. Every piece you wear makes an impact.",
            }),
          }}
        />
        <Navbar />
        <CartSidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
