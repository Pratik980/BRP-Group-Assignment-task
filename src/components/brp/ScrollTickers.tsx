import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Landmark } from "lucide-react";
import { heritageStrip } from "@/data/brp-site-content";

const ease = [0.22, 1, 0.36, 1] as const;

const rotatingLines = [
  "Second generation stewardship",
  "45 years of family legacy · Founded 2019",
  "10+ businesses · 1000+ networks",
];

const legacyStats = [
  { value: "45+", label: "Years of legacy" },
  { value: "10+", label: "Active businesses" },
  { value: "1000+", label: "Networks built" },
];

const marqueeItems = [
  "45 years of trust",
  "2nd generation",
  "10+ active businesses",
  "1000+ networks built",
];

export function ScrollTickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bandRotate = useTransform(scrollYProgress, [0, 1], [-2.5, 1.5]);
  const numeralY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % rotatingLines.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 overflow-hidden border-y border-border/25 bg-background py-16 sm:py-20 md:py-28"
      aria-label="BRP heritage and impact highlights"
    >
      {/* Ambient bridges — matches Intro (top) and Ventures (bottom) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.02_240/0.45),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.97_0.02_275/0.35),transparent_55%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-primary/8 blur-3xl md:h-80 md:w-80"
      />

      <motion.div
        style={{ rotate: prefersReducedMotion ? 0 : bandRotate }}
        className="heritage-band pointer-events-none absolute left-[-8%] right-[-8%] top-[72%] z-0 hidden h-[min(320px,50vw)] -translate-y-1/2 md:top-1/2 md:block md:h-[min(480px,65vw)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Landmark className="h-3 w-3 shrink-0" aria-hidden />
            {heritageStrip.label}
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10 md:gap-12">
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : numeralY }}
                className="relative shrink-0"
              >
                <span className="heritage-numeral font-display block leading-[0.82] tracking-[-0.06em]">
                  45
                </span>
              </motion.div>

              <div className="pb-1 sm:pb-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  Years of
                </p>
                <h2 className="font-display text-[clamp(3rem,10vw,5.75rem)] leading-[0.95] tracking-tight">
                  <span className="relative inline-block">
                    <span
                      className="pointer-events-none absolute inset-0 font-display italic text-gradient opacity-25 blur-[0.5px]"
                      aria-hidden
                    >
                      Trust
                    </span>
                    <span className="heritage-stroke relative italic">Trust</span>
                  </span>
                </h2>

                <div className="mt-4 min-h-[1.75rem] overflow-hidden md:mt-5">
                  {prefersReducedMotion ? (
                    <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                      {rotatingLines[0]}
                    </p>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={rotatingLines[lineIndex]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, ease }}
                        className="text-sm font-light leading-relaxed text-muted-foreground md:text-base"
                      >
                        {rotatingLines[lineIndex]}
                      </motion.p>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop: mirrors Hero stat labels */}
            <ul className="hidden lg:flex flex-col gap-5 border-l border-border/40 pl-8">
              {legacyStats.map((stat, i) => (
                <motion.li
                  key={stat.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease }}
                  className="text-right"
                >
                  <span className="font-display text-2xl text-gradient">{stat.value}</span>
                  <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile / tablet: glass stat chips aligned with Hero */}
          <ul className="mt-8 flex flex-wrap gap-2 sm:gap-3 lg:hidden">
            {legacyStats.map((stat, i) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease }}
                className="glass rounded-full border border-border/30 px-4 py-2 shadow-sm"
              >
                <span className="font-display text-lg text-gradient">{stat.value}</span>
                <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Subtle marquee — echoes page rhythm without competing with headline */}
        <div className="heritage-marquee-fade relative mt-12 overflow-hidden border-t border-border/25 pt-8 md:mt-16">
          {prefersReducedMotion ? (
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50 md:text-xs">
              {marqueeItems.join(" · ")}
            </p>
          ) : (
            <motion.div
              className="flex w-max gap-12 whitespace-nowrap md:gap-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-12 md:gap-16">
                  {marqueeItems.map((item) => (
                    <span
                      key={`${copy}-${item}`}
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 md:text-xs"
                    >
                      {item}
                      <span className="mx-6 text-border md:mx-8">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
