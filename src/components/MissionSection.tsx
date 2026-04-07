"use client";

import React, { useEffect, useState } from "react";

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple intersection observer to trigger entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById("mission");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative bg-[#FAFAFA] py-24 sm:py-32 overflow-hidden"
      id="mission"
    >
      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blush-pink/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-[40%] -right-[15%] h-[600px] w-[600px] rounded-full bg-amber/15 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-block rounded-full bg-blush-pink-light px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-blush-pink-deep ring-1 ring-blush-pink/30">
            Our Manifesto
          </span>
          <h2 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-7xl">
            Fashion Should
            <br />
            <span className="bg-gradient-to-r from-blush-pink-deep via-blush-pink to-amber bg-clip-text text-transparent">
              Fund the Future
            </span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Philocracy was built on a radical premise: the clothes you choose
            should be a form of action. Every hoodie, every tee, every piece you
            wear directly channels capital to verified non-profits fighting the
            world's most critical battles. 
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: The Pipeline & Values */}
          <div
            className={`lg:col-span-7 space-y-16 transition-all delay-200 duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            {/* The Transparency Pipeline */}
            <div>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                How It Works
              </h3>
              <p className="mt-2 text-charcoal/70">
                True philanthropy isn't an afterthought. It's built into the core
                supply chain of Philocracy. 
              </p>
              
              <div className="mt-8 space-y-8 relative before:absolute before:inset-y-0 before:left-[27px] before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-blush-pink before:to-amber">
                {[
                  {
                    title: "1. You Purchase",
                    desc: "You buy a premium, high-quality garment representing your values.",
                    icon: "🛍️",
                  },
                  {
                    title: "2. We Fulfill",
                    desc: "Sustainably sourced, ethically produced, and shipped to your door.",
                    icon: "📦",
                  },
                  {
                    title: "3. 100% Profits Donated",
                    desc: "After base material costs, absolutely everything else goes to the charity.",
                    icon: "💸",
                  },
                  {
                    title: "4. Real Impact",
                    desc: "Meals funded, trees planted, scholarships given. A better world.",
                    icon: "🌍",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 group">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 border-4 border-[#FAFAFA] items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:scale-110">
                      <span className="text-xl">{step.icon}</span>
                    </div>
                    <div className="pt-3">
                      <h4 className="font-heading text-lg font-bold text-charcoal group-hover:text-blush-pink transition-colors">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values / Pillars */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {[
                { icon: "♻️", title: "Sustainable", desc: "Organic cotton & recycled packaging" },
                { icon: "🤝", title: "Transparent", desc: "Open-book finances on every drop" },
                { icon: "❤️", title: "Community First", desc: "Built by people who give a damn" },
                { icon: "⚖️", title: "Ethical Labor", desc: "Fair wages across the supply chain" },
              ].map((val) => (
                <div 
                  key={val.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blush-pink-light/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="text-3xl">{val.icon}</span>
                  <h4 className="font-heading mt-4 text-base font-bold text-charcoal">
                    {val.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Receipt Breakdown & Visual */}
          <div
            className={`lg:col-span-5 transition-all delay-400 duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="sticky top-32 flex flex-col items-center">
              
              {/* Glassmorphic Receipt */}
              <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                {/* Decorative tear at top like a receipt */}
                <div className="absolute -top-3 left-0 right-0 flex justify-between space-x-2 px-4 opacity-20">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-white" />
                  ))}
                </div>

                <div className="text-center">
                  <span className="text-5xl">🧾</span>
                  <h3 className="font-heading mt-4 text-xl font-bold tracking-widest text-charcoal uppercase">
                    The Philocracy Promise
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/60">
                    Transaction #0001 - Blueprint
                  </p>
                </div>

                <div className="my-6 border-t-2 border-dashed border-charcoal/20" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-charcoal/80">Labor & Materials</span>
                    <span className="font-mono text-muted-foreground">At Cost</span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-charcoal/80">Shipping & Tax</span>
                    <span className="font-mono text-muted-foreground">Pass-Through</span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-charcoal/80">Operations</span>
                    <span className="font-mono text-muted-foreground">$0.00</span>
                  </div>
                </div>

                <div className="my-6 border-t-2 border-dashed border-charcoal/20" />
                
                <div className="flex flex-col rounded-xl bg-charcoal p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                      Total Donated
                    </span>
                    <span className="font-heading text-xl font-black text-amber">
                      100% Profits
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-white/50 leading-relaxed">
                    Zero compromises. When you buy, we give exactly what we make on top of the raw costs directly to the charity of your choice.
                  </p>
                </div>
              </div>

              {/* Call to action inside mission */}
              <div className="mt-12 text-center">
                <p className="text-sm font-medium text-charcoal/60 uppercase tracking-widest mb-4">
                  Ready to impact?
                </p>
                <a
                  href="/shop/current"
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blush-pink group hover:-translate-y-1"
                >
                  Select a Garment
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
