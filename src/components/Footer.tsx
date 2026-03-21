import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src="/circleLogo.jpeg"
                  alt="Philocracy"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
                philocracy
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Wear your values. Every purchase supports real communities through
              verified non-profit partnerships.
            </p>
            {/* Social dots — brand homage */}
            <div className="flex gap-2 pt-2">
              <div className="h-3 w-3 rounded-full bg-blush-pink/60 hover:bg-blush-pink transition-colors cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-blush-pink/50 hover:bg-blush-pink transition-colors cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-amber/60 hover:bg-amber transition-colors cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-amber/50 hover:bg-amber transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-blush-pink">
              Shop
            </h4>
            <ul className="space-y-2">
              {["New Arrivals", "Tees", "Hoodies", "Bottoms", "Accessories"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="text-sm transition-colors hover:text-amber"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-blush-pink">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Our Mission", href: "/#mission" },
                { label: "Board Members", href: "/board" },
                { label: "Charity Partners", href: "/#mission" },
                { label: "Sustainability", href: "/#mission" },
                { label: "Contact", href: "/" }
              ].map(
                (item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-amber"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-blush-pink">
              Connect
            </h4>
            <ul className="space-y-2">
              {["Instagram", "Twitter / X", "TikTok", "Newsletter"].map(
                (item) => (
                  <li key={item}>
                    <span className="cursor-pointer text-sm transition-colors hover:text-amber">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Philocracy. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Every item purchased supports a non-profit partner.
          </p>
        </div>
      </div>
    </footer>
  );
}
