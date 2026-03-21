"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function Counter({
  end,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

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

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <p className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl gradient-text-brand">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-charcoal/50 sm:text-base">
        {label}
      </p>
    </div>
  );
}

export function LiveImpact() {
  return (
    <section className="relative bg-soft-cream py-20 sm:py-28 overflow-hidden" id="impact">
      {/* Decorative dots */}
      <div className="absolute top-10 right-10 h-4 w-4 rounded-full bg-blush-pink/25 animate-dot-pulse" />
      <div className="absolute bottom-16 left-12 h-6 w-6 rounded-full bg-amber/20 animate-dot-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-blush-pink/20 animate-dot-pulse" style={{ animationDelay: "2s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blush-pink">
            Real-time impact
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
            Every Purchase Matters
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
            Every purchase makes a measurable difference. Here&apos;s where
            we stand — and it&apos;s growing every day.
          </p>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <Counter end={127450} prefix="$" label="Total Donated" />
          <Counter end={12} label="Charities Supported" />
          <Counter end={8340} label="Items Sold" />
        </div>

        {/* Bottom accent — gradient line */}
        <div className="mx-auto mt-16 h-1 w-32 rounded-full bg-gradient-to-r from-blush-pink via-amber to-blush-pink-light" />
      </div>
    </section>
  );
}
