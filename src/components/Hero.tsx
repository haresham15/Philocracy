"use client";

import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-soft-cream" id="hero">
      {/* Background — poster image */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-poster.jpg')" }}
      />

      {/* Video fallback */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
      />

      {/* Overlay — fades to cream at bottom */}
      <div className="hero-overlay absolute inset-0" />

      {/* Decorative floating dots — brand homage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pink dots */}
        <div className="absolute top-[15%] left-[8%] h-5 w-5 rounded-full bg-blush-pink/50 animate-float-slow" />
        <div className="absolute top-[25%] right-[12%] h-8 w-8 rounded-full bg-blush-pink/40 animate-float-medium" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[60%] left-[15%] h-4 w-4 rounded-full bg-blush-pink/35 animate-float-fast" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-[30%] right-[8%] h-6 w-6 rounded-full bg-blush-pink/30 animate-float-slow" style={{ animationDelay: "2s" }} />

        {/* Amber dots */}
        <div className="absolute top-[20%] right-[25%] h-6 w-6 rounded-full bg-amber/40 animate-float-medium" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[25%] left-[20%] h-7 w-7 rounded-full bg-amber/35 animate-float-slow" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[45%] left-[35%] h-3 w-3 rounded-full bg-amber/45 animate-float-fast" style={{ animationDelay: "2.2s" }} />
        <div className="absolute bottom-[40%] right-[30%] h-5 w-5 rounded-full bg-amber/30 animate-float-medium" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <p className="animate-fade-in-up mb-6 text-sm font-medium uppercase tracking-[0.3em] text-white/80 sm:text-base">
          Governance by love
        </p>

        {/* Brand Wordmark */}
        <div className="animate-fade-in-up delay-100 relative w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] mb-6">
          <Image
            src="/mainTextTitle.jpg"
            alt="philocracy"
            width={1200}
            height={200}
            className="w-full h-auto brightness-0 invert"
            priority
          />
        </div>

        <p className="animate-fade-in-up delay-200 mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
          Every piece funnels proceeds to verified non-profits. Fashion that
          feels good — inside and out.
        </p>

        <div className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center rounded-full bg-blush-pink px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-blush-pink-deep hover:scale-105 hover:shadow-lg hover:shadow-blush-pink/25"
          >
            Shop Now
          </Link>
          <Link
            href="/#mission"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:border-white/50"
          >
            Our Mission
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-charcoal/40">Scroll</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-charcoal/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
