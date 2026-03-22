"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showSolid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid ? "nav-glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* SVG filter to extract alpha mask from the JPEG's luminance */}
          <svg width="0" height="0" className="absolute pointer-events-none">
            <filter id="remove-white-bg">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        -0.34 -0.34 -0.34 0 1.02"
                result="luminanceMask"
              />
              <feComposite in="luminanceMask" in2="SourceGraphic" operator="in" />
            </filter>
          </svg>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/circleLogo.jpeg"
                alt="Philocracy"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="relative h-6 w-[120px] sm:h-7 sm:w-[140px] flex items-center justify-center">
              <Image
                src="/mainTextTitle.jpg"
                alt="philocracy"
                fill
                className="object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
                style={{ filter: `url(#remove-white-bg) ${!showSolid ? 'invert(1)' : ''}` }}
                sizes="(max-width: 640px) 120px, 140px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              { label: "Home", href: "/" },
              {
                label: "Shop",
                dropdown: [
                  { label: "Current Drop", href: "/shop/current" },
                  { label: "Legacy Drops", href: "/shop/legacy" },
                ],
              },
              { label: "Mission", href: "/#mission" },
              { label: "Board", href: "/board" },
            ].map((item) =>
              item.dropdown ? (
                <div key={item.label} className="group relative">
                  <button
                    className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-amber ${
                      showSolid ? "text-charcoal" : "text-white/90"
                    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blush-pink after:transition-all after:duration-300 hover:after:w-full`}
                  >
                    {item.label}
                  </button>
                  <div className="absolute left-0 top-full mt-0 hidden min-w-[160px] flex-col rounded-xl bg-white p-2 shadow-xl border border-border group-hover:flex">
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-blush-pink-light"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-amber ${
                    showSolid ? "text-charcoal" : "text-white/90"
                  } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blush-pink after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              className={`relative p-2 transition-colors duration-300 hover:text-amber ${
                showSolid ? "text-charcoal" : "text-white"
              }`}
              aria-label="Open cart"
              id="cart-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blush-pink text-[10px] font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`p-2 md:hidden transition-colors duration-300 ${
                showSolid ? "text-charcoal" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-glass border-t border-warm-tan-light md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {[
              { label: "Home", href: "/" },
              { label: "Current Drop", href: "/shop/current" },
              { label: "Legacy Drops", href: "/shop/legacy" },
              { label: "Mission", href: "/#mission" },
              { label: "Board", href: "/board" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium tracking-wide uppercase text-charcoal transition-colors hover:bg-blush-pink-light hover:text-charcoal"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
