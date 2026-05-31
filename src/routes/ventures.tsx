import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useHashScroll } from "@/components/brp/FooterNavLink";
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

import reddotLogo from "@/assets/brp/reddot.webp";
import shsLogo from "@/assets/brp/shs.jpg";
import assabetLogo from "@/assets/brp/Assabet.webp";
import satinLeafLogo from "@/assets/brp/satin-leaf.webp";
import brpVenturesLogo from "@/assets/brp/logo-BRP.webp";
import ubVenturesLogo from "@/assets/brp/uv-ventures.webp";
import brpToursLogo from "@/assets/brp/Brp-tours-and-travel.webp";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "BRP Group — Diversified Corporate Ventures Portfolio" },
      {
        name: "description",
        content:
          "Explore BRP Group's operations in education, technology, finance, real estate, and travel. Driven by compounding trust and innovation in Nepal.",
      },
    ],
  }),
  component: VenturesPage,
});

/* ─── Data ─── */

const categories = [
  { key: "All", icon: Sparkles, color: "#6366f1" },
  { key: "Education", icon: GraduationCap, color: "#ef4444" },
  { key: "Technology", icon: Cpu, color: "#14b8a6" },
  { key: "Investments & Real Estate", icon: Building2, color: "#8b5cf6" },
  { key: "Travel & Hospitality", icon: Compass, color: "#f59e0b" },
];

const venturesData = [
  {
    title: "Reddot",
    slug: "reddot",
    category: "Education",
    logo: reddotLogo,
    tagline: "Bridging classrooms and cloud-based learning.",
    focus: "Digital Learning & Supply of Resources",
    desc: "An established resource provider evolving into a digital learning platform to make quality education available online. Red Dot combines technology and education to make it simple to find various educational resources.",
    glowColor: "oklch(0.65 0.18 15)",
    gradient: "from-rose-500 to-red-600",
    themeColor: "rgba(239, 68, 68, 0.15)",
  },
  {
    title: "Small Heaven School",
    slug: "small-heaven-school",
    category: "Education",
    logo: shsLogo,
    tagline: "Nurturing modern minds for future leadership.",
    focus: "Holistic Foundations & Academic Rigor",
    desc: "Established in 2062 B.S., committed to maintaining high standards of academic excellence and holistic development. Integrating innovative teaching methodologies with creative exploration.",
    glowColor: "oklch(0.6 0.15 240)",
    gradient: "from-blue-400 to-cyan-600",
    themeColor: "rgba(14, 165, 233, 0.15)",
  },
  {
    title: "Assabet Technologies",
    slug: "assabet-technologies",
    category: "Technology",
    logo: assabetLogo,
    tagline: "Pioneering enterprise automation and global technology integration.",
    focus: "Enterprise-grade Systems & Data Science",
    desc: "Designing and developing tech-powered solutions for businesses. Enterprise software, data science, cybersecurity, and automation. Proud offshore technology partner for U.S.-based ESR LLC.",
    glowColor: "oklch(0.65 0.16 180)",
    gradient: "from-teal-400 to-cyan-600",
    themeColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    title: "Satin Leaf Investment",
    slug: "satin-leaf-investment",
    category: "Investments & Real Estate",
    logo: satinLeafLogo,
    tagline: "Reshaping venture capital and global market growth.",
    focus: "Venture Incubation & Capital Injection",
    desc: "Supporting and investing in companies across education, finance, healthcare, agriculture, energy, and technology. Bridging Nepalese startups with international VC capital.",
    glowColor: "oklch(0.55 0.15 280)",
    gradient: "from-violet-400 to-indigo-600",
    themeColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    title: "B.R.P. Ventures",
    slug: "brp-ventures",
    category: "Investments & Real Estate",
    logo: brpVenturesLogo,
    tagline: "Analyzing and developing property opportunities with high precision.",
    focus: "Real Estate & Fund Management",
    desc: "Specializing in property investment and fund management. Utilizing deep local real estate insight and strategic partnerships for long-term capital success.",
    glowColor: "oklch(0.5 0.15 250)",
    gradient: "from-indigo-400 to-blue-600",
    themeColor: "rgba(79, 70, 229, 0.15)",
  },
  {
    title: "U.B. Ventures",
    slug: "ub-ventures",
    category: "Investments & Real Estate",
    logo: ubVenturesLogo,
    tagline: "Building commercial frameworks for institutional growth.",
    focus: "Commercial Leasing & Structures",
    desc: "An established real estate holding company active for almost a decade. Locating resources, constructing, and providing structures to various businesses and services.",
    glowColor: "oklch(0.55 0.11 140)",
    gradient: "from-emerald-400 to-green-600",
    themeColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "BRP Tours & Travels",
    slug: "brp-tours-travels",
    category: "Travel & Hospitality",
    logo: brpToursLogo,
    tagline: "Your preferred partner for global and local destinations.",
    focus: "Tourism & Corporate Travel",
    desc: "Widest coverage of local and international destinations at affordable prices. Delivering excellent services with the aim of becoming 'Your Preferred Travel Agency'.",
    glowColor: "oklch(0.6 0.15 45)",
    gradient: "from-amber-400 to-orange-600",
    themeColor: "rgba(245, 158, 11, 0.15)",
  },
];

/** Unified card hover glow — brand primary, not per-venture colors */
const CARD_HOVER_GLOW = "oklch(0.42 0.11 275 / 0.11)";

const stats = [
  { label: "Years of Legacy", value: 45, suffix: "+", icon: Calendar },
  { label: "Active Ventures", value: 7, suffix: "", icon: TrendingUp },
  { label: "Business Verticals", value: 4, suffix: "", icon: Globe },
  { label: "Network Partners", value: 1000, suffix: "+", icon: Users },
];

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
function VentureSpotlight({
  venture,
  index,
}: {
  venture: (typeof venturesData)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <TiltCard className="rounded-[2rem] overflow-hidden">
        <div className="glass-strong border border-border/30 rounded-[2rem] overflow-hidden shadow-glass transition-shadow duration-500">
          <div
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[380px]`}
          >
            {/* Logo Section — Colored gradient background */}
            <div
              className="relative flex items-center justify-center lg:w-[38%] p-10 lg:p-16 overflow-hidden"
              style={{ background: venture.themeColor }}
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.04)_100%)]" />

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <div
                  className="w-40 h-40 lg:w-52 lg:h-52 rounded-3xl bg-white shadow-lg border border-white/80 flex items-center justify-center p-5 select-none"
                  style={{
                    boxShadow: `0 20px 60px -15px ${venture.themeColor}, 0 8px 25px -8px rgba(0,0,0,0.1)`,
                  }}
                >
                  <img
                    src={venture.logo}
                    alt={`${venture.title} Logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center p-8 lg:p-14">
              {/* Category pill */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: venture.themeColor,
                    color: venture.glowColor,
                  }}
                >
                  {venture.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-3">
                {venture.title}
              </h2>

              {/* Tagline */}
              <p className="text-sm font-medium text-muted-foreground/80 italic mb-5 max-w-xl">
                "{venture.tagline}"
              </p>

              {/* Divider */}
              <div
                className="w-16 h-1 rounded-full mb-6"
                style={{ backgroundColor: venture.glowColor, opacity: 0.5 }}
              />

              {/* Description */}
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {venture.desc}
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
  const [activeCategory, setActiveCategory] = useState("All");
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (hash?.startsWith("venture-")) {
      setActiveCategory("All");
    }
  }, [hash]);

  const filteredVentures = venturesData.filter(
    (v) => activeCategory === "All" || v.category === activeCategory,
  );

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background">
        <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
        <div className="absolute -left-16 top-20 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-3xl pointer-events-none animate-pulse-glow" />
        <div
          className="absolute -right-20 top-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-sky-500/10 blur-3xl pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

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
                key={v.title}
                className="absolute w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm flex items-center justify-center"
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
                <img
                  src={v.logo}
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-50"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6 shadow-sm">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
              Corporate Portfolio
            </span>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Interconnected <span className="text-gradient italic">Ventures</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              Operating across critical nodes of education, technology, finance, and logistics — BRP
              Group combines physical strength with digital adaptability to lead the Himalayan
              region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CATEGORY ECOSYSTEM MAP ═══ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground mb-3">
              Our <span className="text-gradient italic">Ecosystem</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Select a vertical to explore our ventures across diverse business sectors.
            </p>
          </motion.div>

          {/* Category selector — interactive nodes */}
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
                  className={`relative flex flex-col items-center gap-2.5 px-6 py-5 rounded-2xl border transition-all duration-400 select-none min-w-[130px] ${
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

      {/* ═══ VENTURES SHOWCASE — Alternating Immersive Cards ═══ */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div layout className="flex flex-col gap-12 md:gap-16">
            <AnimatePresence mode="popLayout">
              {filteredVentures.map((venture, i) => (
                <motion.div
                  key={venture.title}
                  id={`venture-${venture.slug}`}
                  className=""
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                >
                  <VentureSpotlight venture={venture} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS & IMPACT BAR ═══ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.06_250/0.08),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground mb-3">
              Impact at <span className="text-gradient italic">Scale</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Numbers that reflect decades of compounding trust and strategic growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
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
    </main>
  );
}
