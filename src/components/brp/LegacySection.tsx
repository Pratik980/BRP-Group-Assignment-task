import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Trees, Heart, Lightbulb, Globe, Flame, Quote, GraduationCap, Award, Landmark, Compass, type LucideIcon } from "lucide-react";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import babuRamImg from "@/assets/optimized/babu-ram.webp";
import ubinImg from "@/assets/optimized/ubin.webp";
import bidushiImgDefault from "@/assets/optimized/Bidushi-Pandey-Pokherel.webp";
import { EXECUTIVE_PHOTO_BY_NAME } from "@/lib/cms/site-assets";
import { usePublicHistoryLegacy } from "@/hooks/usePublicContent";
import type { HistoryLegacyContent, LegacyTorchAct, LegacyValueItem } from "@/lib/cms/about-content";

const bidushiImg = EXECUTIVE_PHOTO_BY_NAME["Ms. Bidushi Pandey Pokharel"] || bidushiImgDefault;

const ease = [0.22, 1, 0.36, 1] as const;

const ICON_MAP_LEGACY: Record<string, LucideIcon> = {
  Trees, Heart, Lightbulb, Globe, Flame, Quote, GraduationCap, Award, Landmark, Compass, Sparkles,
};

function resolveLegacyIcon(name: string): LucideIcon {
  return ICON_MAP_LEGACY[name] || Trees;
}

const DEFAULT_LEGACY: HistoryLegacyContent = {
  introBadge: "Carrying the Torch",
  introTitle: "Our Legacy",
  introDescription:
    "B.R.P. Group is more than a name \u2014 it is the living legacy of late Dr. Babu Ram Pokharel, carried forward by a new generation driven by the same values, renewed purpose, and a vision for Nepal\u2019s tomorrow.",
  torchBadge: "Passing the Torch",
  torchTitle: "From One Generation to the Next",
  founder: {
    title: "The Man Behind the Vision",
    paragraphs: [
      "Dr. Babu Ram Pokharel\u2019s journey began with a single school \u2014 V.S. Niketan \u2014 founded in 2037 B.S. with 7 teachers and 147 students. What started as a humble educational initiative grew into a lifelong mission of public service, enterprise, and community upliftment that would span over four decades.",
      "Recognized nationally with the Gorkha Dakshina Bahu, Trishakti Patta, and the Birendra-Aishwarya medals, Dr. Pokharel\u2019s influence extended far beyond education. He served as a member of parliament, was a founding member of PABSON, and actively contributed to Rotary Clubs, Lions Clubs, CDGC, and the SAARC Relations Council.",
      "His life was a testament to the belief that true leadership is measured not by what you accumulate, but by what you pass on. He planted seeds of education, nurtured institutions of care, and built bridges of opportunity \u2014 a legacy that now finds its next caretakers.",
    ],
    imageUrl: babuRamImg,
    name: "Dr. Babu Ram Pokharel",
    subtitle: "Chairman Emeritus \u00b7 1947\u20132022",
  },
  torchActs: [
    {
      id: "foundation",
      label: "1947 \u2013 2022",
      title: "The Foundation",
      subtitle: "Dr. Babu Ram Pokharel",
      description:
        "A lifetime dedicated to education, public service, and nation-building. From a single school to a legacy that would span generations.",
      quote: "",
      quoteAttribution: "",
      accentFrom: "#d97706",
      accentTo: "#ea580c",
      borderAccent: "#d97706",
      iconColor: "text-amber-500",
    },
    {
      id: "transition",
      label: "The Bridge",
      title: "Passing the Torch",
      subtitle: "Values that transcend time",
      description:
        "Principles of integrity, service, and visionary leadership \u2014 carefully instilled and now carried forward with renewed purpose.",
      quote:
        "\u201cThe foundation of a great nation is built not in years, but in the values we pass to the next generation.\u201d",
      quoteAttribution: "\u2014 Dr. Babu Ram Pokharel",
      accentFrom: "#8b5cf6",
      accentTo: "#a78bfa",
      borderAccent: "#8b5cf6",
      iconColor: "text-primary",
    },
    {
      id: "future",
      label: "Present \u2013 Future",
      title: "The Next Chapter",
      subtitle: "Dr. Ubin Pokharel & Bidushi Pandey Pokharel",
      description:
        "Building on 45+ years of foundation with modern vision, global perspective, and an unwavering commitment to Nepal\u2019s tomorrow.",
      quote: "",
      quoteAttribution: "",
      accentFrom: "#0284c7",
      accentTo: "#4f46e5",
      borderAccent: "#0284c7",
      iconColor: "text-sky-500",
    },
  ],
  valuesTitle: "Principles That Endure",
  valuesDescription:
    "The core values that Dr. Pokharel instilled continue to guide every decision, every venture, and every partnership.",
  values: [
    { iconName: "Trees", title: "Rooted in Service", description: "Founded on the principle that enterprise exists to serve community \u2014 not the other way around." },
    { iconName: "Heart", title: "Compassionate Leadership", description: "Leading with empathy, integrity, and a deep sense of responsibility toward every stakeholder." },
    { iconName: "Lightbulb", title: "Visionary Foresight", description: "Building across generations with a long-term view that transcends quarterly outcomes." },
    { iconName: "Globe", title: "Nepal First", description: "Every venture, every investment, every partnership \u2014 grounded in the mission to elevate Nepal." },
  ],
};

export function LegacySection() {
  const adminLegacy = usePublicHistoryLegacy();
  const content = adminLegacy?.introBadge ? adminLegacy : DEFAULT_LEGACY;

  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const founderY = useTransform(scrollYProgress, [0, 0.4], [120, 0]);
  const founderImg = content.founder.imageUrl || babuRamImg;

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 md:py-32"
      >
        <ThemeBackdrop variant="section" />
        <div className="relative z-10 brp-container space-y-24">
          <LegacyIntroStatic content={content} />
          <FounderStatic content={content} founderImg={founderImg} />
          <BridgeStatic content={content} />
          <ValuesStatic content={content} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 md:py-32"
    >
      <ThemeBackdrop variant="section" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.85_0.04_275/0.12),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 brp-container space-y-28 md:space-y-36">
        {/* ─── Legacy Intro ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
            <Sparkles className="h-3 w-3 animate-pulse" />
            {content.introBadge}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {content.introTitle}
          </h2>
          <p className="mt-5 text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.introDescription}
          </p>
        </motion.div>

        {/* ─── The Founder ─── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            style={{ y: founderY, opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
            className="lg:col-span-2 relative"
          >
            <div className="relative mx-auto max-w-xs lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/80 shadow-xl">
                <div className="aspect-[3/4]">
                  <img
                    src={founderImg}
                    alt={content.founder.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
                  <p className="text-white font-display text-lg font-bold">{content.founder.name}</p>
                  <p className="text-white/70 text-xs uppercase tracking-[0.2em] font-semibold">
                    {content.founder.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: founderY, opacity: useTransform(scrollYProgress, [0.1, 0.35], [0, 1]) }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="glass-strong rounded-2xl border border-border/40 p-6 sm:p-8 md:p-10 shadow-glass">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground mb-5">
                {content.founder.title}
              </h3>
              <div className="space-y-4 text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                {content.founder.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── The Torch Relay — Three Acts ─── */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-14 md:mb-20"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-4">
              <Flame className="h-3 w-3" />
              {content.torchBadge}
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
              {content.torchTitle}
            </h3>
          </motion.div>

          <div className="relative max-w-5xl mx-auto space-y-24 md:space-y-32">
            {content.torchActs.map((act, i) => (
              <TorchSpotlight
                key={act.id}
                act={act}
                index={i}
                babuRamImg={babuRamImg}
                ubinImg={ubinImg}
                bidushiImg={bidushiImg}
              />
            ))}
          </div>
        </div>

        {/* ─── Values & Principles ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
              {content.valuesTitle}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              {content.valuesDescription}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {content.values.map((item, i) => {
              const Icon = resolveLegacyIcon(item.iconName);
              return (
                <motion.div
                  key={item.title + i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
                  className="group relative"
                >
                  <div className="glass-strong rounded-2xl border border-border/30 p-6 h-full shadow-sm transition-all duration-500 hover:shadow-float hover:border-primary/20">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-400">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-display text-base sm:text-lg text-foreground font-semibold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Torch Spotlight — Large Photo Cards ─── */
function TorchSpotlight({
  act,
  index,
  babuRamImg: babuRam,
  ubinImg: ubin,
  bidushiImg: bidushi,
}: {
  act: LegacyTorchAct;
  index: number;
  babuRamImg: string;
  ubinImg: string;
  bidushiImg: string;
}) {
  const reduceMotion = useReducedMotion();

  const fadeIn = reduceMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: index * 0.1 },
      }
    : {
        initial: { opacity: 0, y: 48 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, delay: index * 0.15, ease },
      };

  /* ─── Foundation Act — Single large photo ─── */
  if (act.id === "foundation") {
    return (
      <motion.div {...fadeIn} className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
        <div className="w-full md:w-[45%] max-w-sm">
          <div className="relative group">
            <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-amber-500/15 via-amber-300/5 to-transparent blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/15 bg-card shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-amber-500/10 group-hover:-translate-y-1">
              <div className="aspect-[4/5]">
                <img
                  src={act.imageUrl || babuRam}
                  alt={act.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                <p className="text-white font-display text-xl font-bold">Dr. Babu Ram Pokharel</p>
                <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                  Chairman Emeritus · 1947–2022
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {act.label}
          </div>
          <h4 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
            {act.title}
          </h4>
          <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
          <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
            {act.description}
          </p>
        </div>
      </motion.div>
    );
  }

  /* ─── Transition Act — Centered quote card ─── */
  if (act.id === "transition") {
    return (
      <motion.div {...fadeIn} className="max-w-2xl mx-auto">
        <div className="glass-strong rounded-2xl border border-primary/20 p-10 md:p-14 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : { rotate: [0, -6, 6, -3, 0], scale: [1, 1.12, 1.12, 1.06, 1] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 inline-flex"
          >
            <Flame className="h-10 w-10 text-primary" />
          </motion.div>
          <div className="relative z-10 mt-5 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {act.label}
              </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
              {act.title}
            </h4>
            <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
            <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
              {act.description}
            </p>
            {act.quote ? (
              <div className="relative pl-7 border-l-2 border-primary/30 text-left max-w-md mx-auto mt-6 pt-4 border-t border-border/30">
                <Quote className="absolute -left-3.5 -top-1 h-5 w-5 text-primary/40" />
                <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                  {act.quote}
                </p>
                {act.quoteAttribution ? (
                  <p className="text-xs text-muted-foreground/50 mt-2 font-semibold">
                    {act.quoteAttribution}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    );
  }

  /* ─── Future Act — Two individual spotlights ─── */
  return (
    <motion.div {...fadeIn} className="space-y-16">
      {/* Shared heading */}
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/8 border border-sky-500/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-500">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          {act.label}
        </div>
        <h4 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
          {act.title}
        </h4>
        <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
        <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
          {act.description}
        </p>
      </div>

      {/* Dr. Ubin Pokharel */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
        <div className="w-full md:w-[45%] max-w-sm">
          <div className="relative group">
            <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-sky-500/15 via-sky-300/5 to-transparent blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative overflow-hidden rounded-[2rem] border border-sky-500/15 bg-card shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky-500/10 group-hover:-translate-y-1">
              <div className="aspect-[4/5]">
                <img
                  src={act.imageUrl || ubin}
                  alt="Dr. Ubin Pokharel"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                <p className="text-white font-display text-xl font-bold">Dr. Ubin Pokharel</p>
                <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                  Chairman
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[55%] space-y-4">
          <h5 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-[1.15]">
            Steering the Vision Forward
          </h5>
          <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
            Steering B.R.P. Group&apos;s diversified investments across technology, healthcare,
            education, and real estate — expanding the ecosystem through innovation and strategic US
            collaborations.
          </p>
        </div>
      </div>

      {/* Bidushi Pandey Pokharel - reversed alignment */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-14">
        <div className="w-full md:w-[45%] max-w-sm">
          <div className="relative group">
            <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-indigo-500/15 via-indigo-300/5 to-transparent blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative overflow-hidden rounded-[2rem] border border-sky-500/15 bg-card shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 group-hover:-translate-y-1">
              <div className="aspect-[4/5]">
                <img
                  src={act.imageUrl2 || bidushi}
                  alt="Bidushi Pandey Pokharel"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                <p className="text-white font-display text-xl font-bold">Bidushi Pandey Pokharel</p>
                <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                  Executive Director
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[55%] space-y-4">
          <h5 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-[1.15]">
            Driving Operational Excellence
          </h5>
          <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
            Driving operations, organizational excellence, and strategic growth across all business
            verticals with a focus on sustainable, tech-enabled solutions.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* Static fallback versions for reduced motion */

function LegacyIntroStatic({ content }: { content: HistoryLegacyContent }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
        <Sparkles className="h-3 w-3" />
        {content.introBadge}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
        {content.introTitle}
      </h2>
      <p className="mt-5 text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {content.introDescription}
      </p>
    </div>
  );
}

function FounderStatic({ content, founderImg }: { content: HistoryLegacyContent; founderImg: string }) {
  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-2 relative">
        <div className="relative mx-auto max-w-xs lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/80 shadow-xl">
            <div className="aspect-[3/4]">
              <img
                src={founderImg}
                alt={content.founder.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
              <p className="text-white font-display text-lg font-bold">{content.founder.name}</p>
              <p className="text-white/70 text-xs uppercase tracking-[0.2em] font-semibold">
                {content.founder.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-5">
        <div className="glass-strong rounded-2xl border border-border/40 p-6 sm:p-8 md:p-10 shadow-glass">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground mb-5">
            {content.founder.title}
          </h3>
          <div className="space-y-4 text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
            {content.founder.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BridgeStatic({ content }: { content: HistoryLegacyContent }) {
  const acts = content.torchActs;
  return (
    <div className="relative">
      <div className="text-center mb-14 md:mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-4">
          <Flame className="h-3 w-3" />
          {content.torchBadge}
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
          {content.torchTitle}
        </h3>
      </div>

      <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
        {acts.map((act) => {
          if (act.id === "foundation") {
            return (
              <div key={act.id} className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                <div className="w-full md:w-[45%] max-w-sm">
                  <div className="relative group">
                    <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-amber-500/15 via-amber-300/5 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/15 bg-card shadow-xl">
                      <div className="aspect-[4/5]">
                        <img
                          src={act.imageUrl || babuRamImg}
                          alt={act.title}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                        <p className="text-white font-display text-xl font-bold">
                          Dr. Babu Ram Pokharel
                        </p>
                        <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                          Chairman Emeritus · 1947–2022
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[55%] space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {act.label}
                  </div>
                  <h4 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
                    {act.title}
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
                  <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            );
          }

          if (act.id === "transition") {
            return (
              <div key={act.id} className="max-w-2xl mx-auto">
                <div className="glass-strong rounded-2xl border border-primary/20 p-10 md:p-14 text-center relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                  <Flame className="h-10 w-10 text-primary mx-auto relative z-10" />
                  <div className="relative z-10 mt-5 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {act.label}
                      </span>
                    </div>
                    <h4 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                      {act.title}
                    </h4>
                    <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
                    <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
                      {act.description}
                    </p>
                    {act.quote ? (
                      <div className="relative pl-7 border-l-2 border-primary/30 text-left max-w-md mx-auto mt-6 pt-4 border-t border-border/30">
                        <Quote className="absolute -left-3.5 -top-1 h-5 w-5 text-primary/40" />
                        <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                          {act.quote}
                        </p>
                        {act.quoteAttribution ? (
                          <p className="text-xs text-muted-foreground/50 mt-2 font-semibold">
                            {act.quoteAttribution}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={act.id} className="space-y-16">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/8 border border-sky-500/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {act.label}
                </div>
                <h4 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
                  {act.title}
                </h4>
                <p className="text-sm font-medium text-muted-foreground/70">{act.subtitle}</p>
                <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
                <div className="w-full md:w-[45%] max-w-sm">
                  <div className="relative">
                    <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-sky-500/15 via-sky-300/5 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-sky-500/15 bg-card shadow-xl">
                      <div className="aspect-[4/5]">
                        <img
                          src={act.imageUrl || ubinImg}
                          alt="Dr. Ubin Pokharel"
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                        <p className="text-white font-display text-xl font-bold">
                          Dr. Ubin Pokharel
                        </p>
                        <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                          Chairman
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[55%] space-y-4">
                  <h5 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-[1.15]">
                    Steering the Vision Forward
                  </h5>
                  <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                    Steering B.R.P. Group&apos;s diversified investments across technology, healthcare,
                    education, and real estate — expanding the ecosystem through innovation and
                    strategic US collaborations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-14">
                <div className="w-full md:w-[45%] max-w-sm">
                  <div className="relative">
                    <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-indigo-500/15 via-indigo-300/5 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-sky-500/15 bg-card shadow-xl">
                      <div className="aspect-[4/5]">
                        <img
                          src={act.imageUrl2 || bidushiImg}
                          alt="Bidushi Pandey Pokharel"
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
                        <p className="text-white font-display text-xl font-bold">
                          Bidushi Pandey Pokharel
                        </p>
                        <p className="text-white/70 text-xs uppercase tracking-[0.22em] font-semibold mt-1">
                          Executive Director
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[55%] space-y-4">
                  <h5 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-[1.15]">
                    Driving Operational Excellence
                  </h5>
                  <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                    Driving operations, organizational excellence, and strategic growth across all
                    business verticals with a focus on sustainable, tech-enabled solutions.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ValuesStatic({ content }: { content: HistoryLegacyContent }) {
  return (
    <div>
      <div className="text-center mb-12 md:mb-16">
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
          {content.valuesTitle}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
          {content.valuesDescription}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {content.values.map((item, i) => {
          const Icon = resolveLegacyIcon(item.iconName);
          return (
            <div
              key={item.title + i}
              className="glass-strong rounded-2xl border border-border/30 p-6 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-display text-base sm:text-lg text-foreground font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
