"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedNumber({ end, prefix = "", suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function LiveImpact() {
  return (
    <section className="relative bg-warm-tan py-24 sm:py-32 overflow-hidden" id="impact">
      <div className="bg-noise absolute inset-0 z-0 opacity-10 mix-blend-overlay" />
      
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-white/40 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal/60 mb-3">
              Real-time impact
            </p>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl md:text-6xl drop-shadow-sm">
              Transparency by the Numbers
            </h2>
          </div>
          <p className="text-charcoal/70 max-w-sm text-base font-medium leading-relaxed lg:text-right">
            Every garment sold contributes to a verifiable metric. Watch the impact grow live.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Main Huge Metric (Total Donated) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/40 border border-white/60 p-8 md:col-span-2 shadow-xl backdrop-blur-md transition-all hover:bg-white/60 hover:border-white hover:-translate-y-1">
            <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-blush-pink/30 blur-[80px] group-hover:bg-blush-pink/50 transition-colors duration-700" />
            
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-amber-deep">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-charcoal">
                  Total Capital Pledged
                </span>
              </div>
              
              <div className="font-heading text-6xl font-black tracking-tighter text-charcoal sm:text-8xl drop-shadow-md">
                <AnimatedNumber end={5500} prefix="$" />
              </div>
            </div>
          </div>

          {/* Secondary Metric (Charities) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/40 border border-white/60 p-8 shadow-xl backdrop-blur-md transition-all hover:bg-white/60 hover:border-white hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-[150px] w-[150px] rounded-full bg-amber/30 blur-[60px] group-hover:bg-amber/50 transition-colors duration-700" />
            
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-blush-pink-deep">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-charcoal">
                  Partners
                </span>
              </div>
              
              <div>
                <span className="font-heading text-6xl font-black text-charcoal opacity-90 block drop-shadow-md">
                  <AnimatedNumber end={4} />
                </span>
                <span className="mt-2 text-sm font-semibold text-charcoal/70">Verified Non-profits Supported</span>
              </div>
            </div>
          </div>

          {/* Third Metric (Items Sold) */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/40 border border-white/60 p-8 shadow-xl backdrop-blur-md transition-all hover:bg-white/60 hover:border-white hover:-translate-y-1">
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-white/70 blur-[80px] group-hover:bg-white transition-colors duration-700" />
            
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-charcoal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-charcoal">
                  Community Action
                </span>
              </div>
              
              <div>
                <span className="font-heading text-6xl font-black text-charcoal opacity-90 block drop-shadow-md">
                  <AnimatedNumber end={400} />
                </span>
                <span className="mt-2 text-sm font-semibold text-charcoal/70">Garments Minted & Worn</span>
              </div>
            </div>
          </div>

          {/* Graphic Element */}
          <div className="hidden md:flex md:col-span-2 group relative overflow-hidden rounded-3xl border border-charcoal/20 bg-charcoal shadow-2xl transition-all hover:scale-[1.02] items-center justify-center">
            
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber/30 blur-3xl group-hover:bg-blush-pink-deep/40 transition-colors duration-700" />
            
            <div className="relative z-10 text-center px-10 w-full flex flex-row items-center justify-between">
               <h3 className="font-heading text-3xl font-black text-white uppercase tracking-tight leading-snug w-2/3 text-left">
                 Changing the structural rules of streetwear.
               </h3>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/30 transition-transform duration-1000 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
