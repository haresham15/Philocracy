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
  title: "Philocracy — Governance By Love",
  description:
    "Premium streetwear that gives back to the community. Every piece you wear makes an impact.",
  openGraph: {
    title: "Philocracy — Governance By Love",
    description:
      "Premium streetwear that gives back to the community. Every piece you wear makes an impact.",
    type: "website",
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
        <Navbar />
        <CartSidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
