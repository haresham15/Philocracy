"use client";

import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-soft-cream" id="hero">
      
      {/* Background — Bright and Warm */}
      <div className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-multiply" style={{ backgroundImage: "url('/hero-poster.jpg')" }} />
      <div className="bg-noise absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" />
      
      {/* Intense Glowing Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] h-[300px] w-[300px] rounded-full bg-blush-pink-light/40 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-amber-light/30 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-cream/70 via-soft-cream/80 to-soft-cream pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative flex h-screen flex-col items-center justify-center px-4 text-center">
        
        {/* Typographic Tagline Layer */}
        <div className="animate-fade-in-up flex flex-col items-center gap-2 mb-8">
          <span className="inline-block rounded-full border border-charcoal/10 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-charcoal backdrop-blur-md shadow-sm">
            Governance by Love
          </span>
        </div>

        {/* Logo Layering - fixed white box by stripping stacking context */}
        <div className="relative mb-8 flex w-[300px] sm:w-[450px] md:w-[600px] lg:w-[800px] items-center justify-center overflow-visible select-none pointer-events-none">
          
          {/* Apply mix-blend-multiply directly on the wrapper, DOM order lets it sink cleanly through background */}
          <div className="animate-fade-in-up delay-100 relative w-full mix-blend-multiply opacity-100">
            <Image
              src="/mainTextTitle.jpg"
              alt="philocracy"
              width={1200}
              height={200}
              className="w-full h-auto drop-shadow-sm"
              priority
            />
          </div>
        </div>

        <p className="animate-fade-in-up delay-200 mt-2 max-w-xl text-base font-medium leading-relaxed text-charcoal/80 sm:text-lg lg:text-xl relative bg-white/30 p-4 rounded-xl backdrop-blur-md border border-white/40 shadow-sm">
          Every piece funnels proceeds to verified non-profits. Fashion that feels good — inside and out.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-300 mt-12 flex flex-col gap-6 sm:flex-row relative">
          <Link
            href="/shop"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-charcoal px-12 py-5 text-sm font-black uppercase tracking-widest text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blush-pink-deep via-amber to-blush-pink opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2 text-white">
              Shop The Collection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </Link>

          <Link
            href="#mission"
            className="group inline-flex items-center justify-center rounded-full border border-charcoal/20 bg-white/60 backdrop-blur-lg px-12 py-5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl"
          >
            The Mission
          </Link>
        </div>
      </div>
    </section>
  );
}
