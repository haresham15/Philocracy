export function MissionSection() {
  return (
    <section className="relative bg-soft-cream py-20 sm:py-28 overflow-hidden" id="mission">
      {/* Decorative background dots */}
      <div className="absolute top-20 right-20 h-3 w-3 rounded-full bg-blush-pink/20 animate-dot-pulse" />
      <div className="absolute bottom-32 left-16 h-5 w-5 rounded-full bg-amber/15 animate-dot-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Text */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blush-pink">
              Our philosophy
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl md:text-5xl">
              Fashion Should
              <br />
              <span className="gradient-text-brand">Fund the Future</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Philocracy was born from a simple truth: the clothes we choose are
              a form of speech. Every hoodie, every tee, every cap you wear from
              us sends proceeds directly to verified non-profit organizations.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              We partner with organizations tackling hunger, mental health,
              climate change, education, and racial justice. This isn&apos;t
              performative — it&apos;s structural.
            </p>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                {
                  icon: "♻️",
                  title: "Sustainable",
                  desc: "Organic cotton, recycled packaging",
                },
                {
                  icon: "🤝",
                  title: "Transparent",
                  desc: "Track every dollar donated",
                },
                {
                  icon: "🌍",
                  title: "Global Impact",
                  desc: "12+ charities across 6 causes",
                },
                {
                  icon: "❤️",
                  title: "Community",
                  desc: "Built by people who give a damn",
                },
              ].map((value) => (
                <div key={value.title} className="group">
                  <span className="text-2xl">{value.icon}</span>
                  <h4 className="mt-2 font-heading text-sm font-bold text-charcoal group-hover:text-blush-pink-deep transition-colors">
                    {value.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-blush-pink-light via-warm-cream to-amber-light/30 p-8 sm:p-12 shadow-sm">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-6xl sm:text-7xl">🌱</span>
                <h3 className="font-heading mt-6 text-2xl font-bold text-charcoal sm:text-3xl">
                  Wear Your Values
                </h3>
                <p className="mt-4 max-w-xs text-sm text-charcoal/70">
                  Each purchase is a vote for the world you want to live in. We
                  handle the giving — you handle the style.
                </p>

                {/* "Receipt" style breakdown */}
                <div className="mt-8 w-full max-w-xs space-y-2 rounded-2xl bg-white/80 p-5 text-left backdrop-blur-sm shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blush-pink-deep mb-2">
                    Where your money goes
                  </p>
                  <p className="text-sm text-charcoal/80 mb-3 border-b border-border pb-3">
                    We believe in radical transparency. <strong>100% of the profits</strong> go directly to the partnering organization.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Non-Profit Partner", pct: "All Profits" },
                      { label: "Production & Materials", pct: "At Cost" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-charcoal/70">{row.label}</span>
                        <span className="font-bold text-charcoal">
                          {row.pct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blobs — pink and amber */}
            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-blush-pink/15 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-amber/15 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
