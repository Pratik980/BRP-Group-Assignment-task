import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Network, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { PublicVenture } from "@/lib/cms/venture-display";
import { findImpactStatValue, resolveImpactStatItems } from "@/lib/cms/about-content";
import { usePublicImpactStats } from "@/hooks/usePublicContent";
import { usePublicVentures } from "@/hooks/usePublicVentures";
import brpGroupLogo from "@/assets/optimized/BRPGrouplogo.png";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { LazyImage } from "@/components/ui/lazy-image";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTO_ROTATE_MS = 6000;

function VentureLogo({ src, className }: { src: string; className?: string }) {
  if (!src) {
    return (
      <span
        className={cn(
          "flex items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground",
          className,
        )}
        aria-hidden
      >
        B.R.P.
      </span>
    );
  }
  return <LazyImage src={src} alt="" className={className} />;
}

function VentureDetailPanel({
  venture,
  index,
  totalCount,
  paused,
}: {
  venture: PublicVenture;
  index: number;
  totalCount: number;
  paused: boolean;
}) {
  const Icon = venture.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease }}
      className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-card shadow-float sm:min-h-[380px] md:min-h-[480px] md:rounded-[2.25rem]"
    >
      {/* Top accent bar + timer */}
      <div className="relative h-1 w-full overflow-hidden bg-border/30">
        <motion.div
          key={`${index}-${paused}`}
          className="h-full origin-left bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? undefined : 1 }}
          transition={{ duration: AUTO_ROTATE_MS / 1000, ease: "linear" }}
        />
      </div>

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/8 opacity-100 blur-3xl" />

      <div className="relative flex flex-1 flex-col p-5 sm:p-8 md:p-10">
        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Icon className="h-3 w-3 text-primary" />
                {venture.category}
              </span>
              <span className="text-[10px] font-medium tabular-nums text-muted-foreground/70">
                {String(index + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-display mt-3 sm:mt-4 text-2xl tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              {venture.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{venture.desc}</p>
          </div>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-border/40 bg-white p-4 shadow-sm sm:h-28 sm:w-28">
            <VentureLogo src={venture.logo} className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        <p className="mt-6 flex-1 text-base font-light leading-relaxed text-muted-foreground md:text-[1.05rem] md:leading-8">
          {venture.longDesc}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {venture.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-border/50 bg-muted/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/40 pt-6">
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Division", value: venture.code },
              { label: "Sector", value: venture.category },
              { label: "Group", value: "B.R.P. Constellation" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-muted/30 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function VenturesEcosystem() {
  const { data: ventures = [] } = usePublicVentures();
  const { data: impactStats } = usePublicImpactStats();
  const statItems = resolveImpactStatItems(impactStats ?? undefined);
  const verticalCount = new Set(ventures.map((v) => v.filterCategory)).size || 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectVenture = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 10000);
  }, []);

  useEffect(() => {
    if (paused || ventures.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ventures.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, ventures.length]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  if (ventures.length === 0) {
    return (
      <section id="ecosystem" className="relative py-24 md:py-32">
        <div className="brp-container text-sm text-muted-foreground">
          No ventures to display yet.
        </div>
      </section>
    );
  }

  const safeIndex = activeIndex >= ventures.length ? 0 : activeIndex;
  const currentVenture = ventures[safeIndex]!;

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background py-16 sm:py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ThemeBackdrop variant="section" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.97_0.02_275/0.35),transparent_50%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.42 0.11 275 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.11 275 / 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto brp-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Network className="h-3.5 w-3.5" />
            The Ecosystem
          </div>
          <h2 className="font-display text-3xl leading-[1.08] tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            An interconnected network of <span className="text-gradient italic">ventures</span>{" "}
            driving innovation and growth.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground md:text-lg md:leading-8 xl:text-xl">
            Each company in the B.R.P. constellation operates independently - yet draws strength from a
            shared core of values, capital, and 45 years of compounding trust.
          </p>
        </motion.div>

        {/* Portfolio hub */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="mt-14 lg:mt-16"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Venture navigator */}
            <aside className="lg:col-span-4 xl:col-span-4">
              <div className="glass-strong overflow-hidden rounded-[1.75rem] border border-border/50 shadow-glass">
                <div className="border-b border-border/40 bg-muted/20 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border/40 bg-white p-1.5 shadow-sm">
                      <img
                        src={brpGroupLogo}
                        alt="B.R.P. Group"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Holding company
                      </p>
                      <p className="font-display text-lg text-foreground">B.R.P. Group</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
                    {ventures.length} operating companies. One shared standard of governance and
                    long-term capital discipline.
                  </p>
                </div>

                <nav className="p-2" aria-label="Venture portfolio">
                  <ul className="space-y-1">
                    {ventures.map((venture, index) => {
                      const selected = index === safeIndex;
                      const Icon = venture.icon;
                      return (
                        <li key={venture.name}>
                          <button
                            type="button"
                            onClick={() => selectVenture(index)}
                            className={cn(
                              "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300",
                              selected
                                ? "bg-foreground text-background shadow-md"
                                : "hover:bg-muted/60",
                            )}
                            aria-current={selected ? "true" : undefined}
                          >
                            <span
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border p-1.5 transition-colors",
                                selected ? "border-white/20 bg-white" : "border-border/50 bg-white",
                              )}
                            >
                              <VentureLogo
                                src={venture.logo}
                                className="h-full w-full object-contain"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block truncate text-sm font-semibold",
                                  selected ? "text-background" : "text-foreground",
                                )}
                              >
                                {venture.name}
                              </span>
                              <span
                                className={cn(
                                  "mt-0.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider",
                                  selected ? "text-background/70" : "text-muted-foreground",
                                )}
                              >
                                <Icon className="h-2.5 w-2.5" />
                                {venture.category}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-semibold tabular-nums",
                                selected ? "text-background/60" : "text-muted-foreground/50",
                              )}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Featured venture */}
            <div className="lg:col-span-8 xl:col-span-8">
              <AnimatePresence mode="wait">
                <VentureDetailPanel
                  key={currentVenture.name}
                  venture={currentVenture}
                  index={safeIndex}
                  totalCount={ventures.length}
                  paused={paused}
                />
              </AnimatePresence>

              {/* Quick jump - desktop dots */}
              <div className="mt-4 hidden items-center justify-between sm:flex">
                <div className="flex gap-1.5">
                  {ventures.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectVenture(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === safeIndex
                          ? "w-8 bg-primary"
                          : "w-1.5 bg-border hover:bg-muted-foreground/40",
                      )}
                      aria-label={`Show ${ventures[i].name}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {paused ? "Paused" : "Auto-advancing"} · select any venture to explore
                </p>
              </div>
            </div>
          </div>

          {/* Mobile venture strip */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden no-scrollbar">
            {ventures.map((venture, index) => (
              <button
                key={venture.name}
                type="button"
                onClick={() => selectVenture(index)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 transition-all",
                  index === safeIndex
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/60 bg-background/80 text-muted-foreground",
                )}
              >
                <VentureLogo src={venture.logo} className="h-5 w-5 object-contain" />
                <span className="text-xs font-semibold whitespace-nowrap">{venture.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Ecosystem summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mt-12"
        >
          {[
            { value: String(ventures.length), label: "Operating companies" },
            { value: String(verticalCount), label: "Industry verticals" },
            {
              value: findImpactStatValue(statItems, ["legacy", "years"], "45+"),
              label: "Years of legacy",
            },
            {
              value: findImpactStatValue(statItems, ["business"], "10+"),
              label: "Businesses in group",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/40 bg-card/60 px-4 py-4 text-center backdrop-blur-sm"
            >
              <p className="font-display text-2xl text-gradient md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/ventures"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background shadow-float transition-all duration-300 hover:scale-[1.02]"
          >
            View full ventures portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/"
            hash="contact"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3.5 text-sm font-medium text-muted-foreground"
          >
            Partner with B.R.P.
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </div>
    </section>
  );
}
