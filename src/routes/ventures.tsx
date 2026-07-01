import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useHashScroll } from "@/components/brp/FooterNavLink";
import { LazyImage } from "@/components/ui/lazy-image";
import { useRouterState } from "@tanstack/react-router";
import {
  Cpu,
  GraduationCap,
  Building2,
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Globe,
  Users,
  Calendar,
} from "lucide-react";

import { alternateSlideIn } from "@/lib/alternate-slide";
import type { PublicVenture } from "@/lib/cms/venture-display";
import { categoryIcon } from "@/lib/cms/venture-display";
import {
  findImpactStatValue,
  resolveImpactStatItems,
  resolveVenturesHeroIntro,
} from "@/lib/cms/about-content";
import {
  parseStatValue,
  usePublicAboutSections,
  usePublicImpactStats,
} from "@/hooks/usePublicContent";
import { PUBLIC_VENTURES_QUERY_KEY, usePublicVentures } from "@/hooks/usePublicVentures";
import { fetchPublicVentures } from "@/lib/cms/ventures.public";

export const Route = createFileRoute("/ventures")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: PUBLIC_VENTURES_QUERY_KEY,
      queryFn: fetchPublicVentures,
    }),
  head: () => ({
    meta: [
      { title: "B.R.P. Group - Diversified Corporate Ventures Portfolio" },
      {
        name: "description",
        content:
          "Explore B.R.P. Group's operations in education, technology, finance, real estate, and travel. Driven by compounding trust and innovation in Nepal.",
      },
    ],
  }),
  component: VenturesPage,
});

/* ─── Data ─── */

const BASE_CATEGORIES = [
  { key: "All", icon: Sparkles, color: "#6366f1" },
  { key: "Education", icon: GraduationCap, color: "#ef4444" },
  { key: "Technology", icon: Cpu, color: "#14b8a6" },
  { key: "Investments & Real Estate", icon: Building2, color: "#8b5cf6" },
  { key: "Travel & Hospitality", icon: Compass, color: "#f59e0b" },
] as const;

function buildCategoryFilters(ventures: PublicVenture[]) {
  const known = new Set<string>(BASE_CATEGORIES.map((c) => c.key));
  const extras = [...new Set(ventures.map((v) => v.filterCategory))]
    .filter((key) => !known.has(key))
    .map((key) => ({
      key,
      icon: categoryIcon(key),
      color: "#6366f1",
    }));
  return [...BASE_CATEGORIES, ...extras];
}

/** Unified card hover glow - brand primary, not per-venture colors */
const CARD_HOVER_GLOW = "oklch(0.42 0.11 275 / 0.11)";

function buildVenturePageStats(
  ventureCount: number,
  verticalCount: number,
  statItems: ReturnType<typeof resolveImpactStatItems>,
) {
  const legacy = parseStatValue(findImpactStatValue(statItems, ["legacy", "years"], "45+"));
  const networks = parseStatValue(findImpactStatValue(statItems, ["network"], "1000+"));

  return [
    { label: "Years of Legacy", value: legacy.target, suffix: legacy.suffix, icon: Calendar },
    { label: "Active Ventures", value: ventureCount, suffix: "", icon: TrendingUp },
    { label: "Business Verticals", value: verticalCount, suffix: "", icon: Globe },
    { label: "Network Partners", value: networks.target, suffix: networks.suffix, icon: Users },
  ];
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    import("framer-motion").then(({ animate }) => {
      animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
    });
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    setRotateX(-yPct * 6);
    setRotateY(xPct * 6);
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, ${CARD_HOVER_GLOW}, transparent 75%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
        style={glowStyle}
      />
      {children}
    </div>
  );
}

/* ─── Venture Spotlight (Full-Width Immersive Card) ─── */
function VentureSpotlight({ venture, index }: { venture: PublicVenture; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      {...alternateSlideIn(index, { margin: "-100px", duration: 0.9 })}
      className="relative group"
    >
      <TiltCard className="rounded-[2rem] overflow-hidden">
        <div className="glass-strong border border-border/30 rounded-[2rem] overflow-hidden shadow-glass transition-shadow duration-500">
          <div
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-0 lg:min-h-[380px]`}
          >
            {/* Logo Section - Colored gradient background */}
            <div
              className="relative flex items-center justify-center lg:w-[38%] p-6 sm:p-10 lg:p-16 overflow-hidden"
              style={{ background: venture.themeColor }}
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.04)_100%)]" />

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <div
                  className="w-28 h-28 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-white/80 flex items-center justify-center p-3 sm:p-5 select-none"
                  style={{
                    boxShadow: `0 20px 60px -15px ${venture.themeColor}, 0 8px 25px -8px rgba(0,0,0,0.1)`,
                  }}
                >
                  {venture.logo ? (
                    <LazyImage
                      src={venture.logo}
                      alt={`${venture.name} Logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">
                      {venture.name}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center p-5 sm:p-8 lg:p-14">
              {/* Category pill */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: venture.themeColor,
                    color: venture.glowColor,
                  }}
                >
                  {venture.filterCategory}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-3">
                {venture.name}
              </h2>

              {/* Tagline */}
              <p className="text-sm font-medium text-muted-foreground/80 italic mb-5 max-w-xl">
                "{venture.tagline || venture.desc}"
              </p>

              {/* Divider */}
              <div
                className="w-16 h-1 rounded-full mb-6"
                style={{ backgroundColor: venture.glowColor, opacity: 0.5 }}
              />

              {/* Description */}
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {venture.longDesc}
              </p>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border/15">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 block mb-1">
                    Focus Sector
                  </span>
                  <span className="text-xs font-semibold text-foreground tracking-wide">
                    {venture.focus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Page ─── */
function VenturesPage() {
  useHashScroll();
  const { data: venturesData = [] } = usePublicVentures();
  const { data: aboutSections } = usePublicAboutSections();
  const { data: impactStats } = usePublicImpactStats();
  const venturesIntro = resolveVenturesHeroIntro(aboutSections);
  const statItems = resolveImpactStatItems(impactStats ?? undefined);
  const verticalCount = new Set(venturesData.map((v) => v.filterCategory)).size || 4;
  const pageStats = buildVenturePageStats(venturesData.length, verticalCount, statItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (hash?.startsWith("venture-")) {
      setActiveCategory("All");
    }
  }, [hash]);

  const filteredVentures = venturesData.filter(
    (v) => activeCategory === "All" || v.filterCategory === activeCategory,
  );
  const categories = buildCategoryFilters(venturesData);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeBackdrop variant="page" className="opacity-50" />
      <Nav />
      <div className="relative z-10">
        {/* ═══ HERO BANNER ═══ */}
        <section className="relative py-20 sm:py-28 md:py-40 overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background">
          <ThemeBackdrop variant="hero" />

          {/* Floating venture logos behind hero text */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {venturesData.map((v, i) => {
              const positions = [
                { top: "15%", left: "8%" },
                { top: "22%", right: "10%" },
                { top: "60%", left: "5%" },
                { top: "70%", right: "7%" },
                { top: "40%", left: "3%" },
                { top: "50%", right: "4%" },
                { top: "85%", left: "12%" },
              ];
              const pos = positions[i % positions.length];
              return (
                <motion.div
                  key={v.name}
                  className="absolute max-sm:hidden w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm flex items-center justify-center"
                  style={pos as React.CSSProperties}
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 5 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                >
                  {v.logo ? (
                    <LazyImage
                      src={v.logo}
                      alt=""
                      className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-50"
                    />
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 brp-container pt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6 shadow-sm">
                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                Corporate Portfolio
              </span>
              <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                Interconnected <span className="text-gradient italic">Ventures</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-balance text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                {venturesIntro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ CATEGORY ECOSYSTEM MAP ═══ */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <ThemeBackdrop variant="subtle" />
          <div className="relative z-10 brp-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl tracking-tight text-foreground mb-3">
                Our <span className="text-gradient italic">Ecosystem</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Select a vertical to explore our ventures across diverse business sectors.
              </p>
            </motion.div>

            {/* Category selector - interactive nodes */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <motion.button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex flex-col items-center gap-2 max-sm:gap-1.5 px-4 sm:px-6 py-3 sm:py-5 rounded-2xl border transition-all duration-400 select-none min-w-[100px] sm:min-w-[130px] ${
                      isActive
                        ? "border-primary/40 bg-primary/5 shadow-lg"
                        : "border-border/30 bg-white/50 dark:bg-white/5 hover:border-border/60 hover:bg-white/80 dark:hover:bg-white/10 shadow-sm"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryGlow"
                        className="absolute inset-0 rounded-2xl border-2 border-primary/30 pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? "shadow-md" : "shadow-sm"
                      }`}
                      style={{
                        backgroundColor: isActive ? cat.color + "20" : "rgba(0,0,0,0.03)",
                      }}
                    >
                      <Icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: isActive ? cat.color : "var(--muted-foreground)" }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold tracking-wide transition-colors duration-300 text-center leading-tight ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {cat.key === "All" ? "All Ventures" : cat.key}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="w-1.5 h-1.5 rounded-full bg-primary absolute -bottom-1"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ VENTURES SHOWCASE - Alternating Immersive Cards ═══ */}
        <section className="relative overflow-hidden px-4 pb-16 sm:px-6 sm:pb-20">
          <ThemeBackdrop variant="section" />
          <div className="relative z-10 mx-auto max-w-7xl xl:max-w-[90rem]">
            <motion.div layout className="flex flex-col gap-12 md:gap-16">
              <AnimatePresence mode="popLayout">
                {filteredVentures.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-border/40 bg-secondary/20 px-8 py-16 text-center"
                  >
                    <p className="font-display text-xl text-foreground">
                      No ventures in this category
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try selecting a different filter or view all ventures.
                    </p>
                  </motion.div>
                ) : (
                  filteredVentures.map((venture, i) => (
                    <motion.div
                      key={venture.slug}
                      id={`venture-${venture.slug}`}
                      className=""
                      layout
                      initial={{
                        opacity: 0,
                        x: i % 2 === 0 ? -56 : 56,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: i % 2 === 0 ? -24 : 24 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                    >
                      <VentureSpotlight venture={venture} index={i} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ═══ STATS & IMPACT BAR ═══ */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.06_250/0.08),transparent_70%)] pointer-events-none" />

          <div className="brp-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl tracking-tight text-foreground mb-3">
                Impact at <span className="text-gradient italic">Scale</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Numbers that reflect decades of compounding trust and strategic growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {pageStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.7 }}
                    className="glass-strong border border-border/30 rounded-2xl p-8 text-center shadow-glass hover:shadow-float transition-shadow duration-500 group"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
