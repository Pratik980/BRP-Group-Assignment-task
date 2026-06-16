import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Landmark } from "lucide-react";
import {
  findImpactStatValue,
  legacyNumeralFromStats,
  resolveHeritageStripLabel,
  resolveImpactStatItems,
} from "@/lib/cms/about-content";
import { usePublicAboutSections, usePublicImpactStats } from "@/hooks/usePublicContent";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

export function ScrollTickers() {
  const [lineIndex, setLineIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { data: aboutSections } = usePublicAboutSections();
  const { data: impactStats } = usePublicImpactStats();
  const legacyStats = resolveImpactStatItems(impactStats ?? undefined);
  const heritageLabel = resolveHeritageStripLabel(aboutSections);
  const legacyNumeral = legacyNumeralFromStats(legacyStats);

  const rotatingLines = useMemo(
    () => [
      "Second generation stewardship",
      `${findImpactStatValue(legacyStats, ["legacy", "years"], "45+")} of family legacy · Founded 2019`,
      `${findImpactStatValue(legacyStats, ["business"], "10+")} businesses · ${findImpactStatValue(legacyStats, ["network"], "1000+")} networks`,
    ],
    [legacyStats],
  );

  const marqueeItems = useMemo(
    () => [
      `${findImpactStatValue(legacyStats, ["legacy", "years"], "45+")} years of trust`,
      "2nd generation",
      `${findImpactStatValue(legacyStats, ["business"], "10+")} active businesses`,
      `${findImpactStatValue(legacyStats, ["network"], "1000+")} networks built`,
    ],
    [legacyStats],
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % rotatingLines.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative z-10 overflow-hidden border-y border-border/25 bg-gradient-to-b from-secondary/20 via-background to-secondary/15 py-16 sm:py-20 md:py-28"
      aria-label="BRP heritage and impact highlights"
    >
      <ThemeBackdrop variant="subtle" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.02_240/0.35),transparent_58%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-primary/8 blur-3xl md:h-80 md:w-80"
      />

      <div className="heritage-band pointer-events-none absolute left-[-8%] right-[-8%] top-[72%] z-0 block h-[min(320px,50vw)] -translate-y-1/2 md:top-1/2 md:h-[min(480px,65vw)]" />

      <div className="relative z-10 brp-container">
        <div>
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Landmark className="h-3 w-3 shrink-0" aria-hidden />
            {heritageLabel}
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10 md:gap-12">
              <div className="relative shrink-0">
                <span className="heritage-numeral font-display block leading-[0.82] tracking-[-0.06em]">
                  {legacyNumeral}
                </span>
              </div>

              <div className="pb-1 sm:pb-3">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  Years of
                </p>
                <h2 className="font-display text-[clamp(3rem,10vw,5.75rem)] font-bold leading-[0.95] tracking-tight xl:text-[clamp(3.5rem,8vw,7rem)] 2xl:text-[clamp(4rem,7vw,8rem)]">
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

            {/* Desktop: stat labels */}
            <ul className="hidden lg:flex flex-col gap-8 border-l border-border/40 pl-10">
              {legacyStats.map((stat) => (
                <li key={stat.label} className="text-right">
                  <span className="font-display text-4xl font-bold leading-none text-gradient xl:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground xl:text-sm">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile / tablet: stat chips */}
          <ul className="mt-8 flex flex-wrap gap-2 sm:gap-3 lg:hidden">
            {legacyStats.map((stat) => (
              <li
                key={stat.label}
                className="glass rounded-full border border-border/30 px-4 py-2 shadow-sm"
              >
                <span className="font-display text-lg font-bold text-gradient">{stat.value}</span>
                <span className="ml-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer marquee */}
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
