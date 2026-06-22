import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Trees, Heart, Lightbulb, Globe, Flame, Quote } from "lucide-react";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { cn } from "@/lib/utils";
import babuRamImg from "@/assets/optimized/babu-ram.webp";
import ubinImg from "@/assets/optimized/ubin.webp";
import { EXECUTIVE_PHOTO_BY_NAME } from "@/lib/cms/site-assets";

const bidushiImg = EXECUTIVE_PHOTO_BY_NAME["Ms. Bidushi Pandey Pokharel"];

const ease = [0.22, 1, 0.36, 1] as const;

const legacyValues = [
  {
    icon: Trees,
    title: "Rooted in Service",
    desc: "Founded on the principle that enterprise exists to serve community — not the other way around.",
  },
  {
    icon: Heart,
    title: "Compassionate Leadership",
    desc: "Leading with empathy, integrity, and a deep sense of responsibility toward every stakeholder.",
  },
  {
    icon: Lightbulb,
    title: "Visionary Foresight",
    desc: "Building across generations with a long-term view that transcends quarterly outcomes.",
  },
  {
    icon: Globe,
    title: "Nepal First",
    desc: "Every venture, every investment, every partnership — grounded in the mission to elevate Nepal.",
  },
];

const torchActs = [
  {
    id: "foundation",
    label: "1947 – 2022",
    title: "The Foundation",
    subtitle: "Dr. Babu Ram Pokharel",
    desc: "A lifetime dedicated to education, public service, and nation-building. From a single school to a legacy that would span generations.",
    accent: "from-amber-600/30 to-orange-600/20",
    borderAccent: "border-amber-500/30",
    iconColor: "text-amber-500",
  },
  {
    id: "transition",
    label: "The Bridge",
    title: "Passing the Torch",
    subtitle: "Values that transcend time",
    desc: "Principles of integrity, service, and visionary leadership — carefully instilled and now carried forward with renewed purpose.",
    accent: "from-primary/30 to-accent/20",
    borderAccent: "border-primary/30",
    iconColor: "text-primary",
  },
  {
    id: "future",
    label: "Present – Future",
    title: "The Next Chapter",
    subtitle: "Dr. Ubin Pokharel & Bidushi Pandey Pokharel",
    desc: "Building on 45+ years of foundation with modern vision, global perspective, and an unwavering commitment to Nepal's tomorrow.",
    accent: "from-sky-600/30 to-indigo-600/20",
    borderAccent: "border-sky-500/30",
    iconColor: "text-sky-500",
  },
];

export function LegacySection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const founderY = useTransform(scrollYProgress, [0, 0.4], [120, 0]);

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 md:py-32"
      >
        <ThemeBackdrop variant="section" />
        <div className="relative z-10 brp-container space-y-24">
          <LegacyIntroStatic />
          <FounderStatic />
          <BridgeStatic />
          <ValuesStatic />
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
            Carrying the Torch
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Our <span className="text-gradient italic">Legacy</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            BRP Group is more than a name — it is the living legacy of late Dr. Babu Ram Pokharel,
            carried forward by a new generation driven by the same values, renewed purpose, and a
            vision for Nepal's tomorrow.
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
                    src={babuRamImg}
                    alt="Dr. Babu Ram Pokharel"
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
                  <p className="text-white font-display text-lg font-bold">Dr. Babu Ram Pokharel</p>
                  <p className="text-white/70 text-xs uppercase tracking-[0.2em] font-semibold">
                    Chairman Emeritus · 1947–2022
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
                The Man Behind the <span className="text-gradient italic">Vision</span>
              </h3>
              <div className="space-y-4 text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                <p>
                  Dr. Babu Ram Pokharel's journey began with a single school — V.S. Niketan —
                  founded in 2037 B.S. with 7 teachers and 147 students. What started as a humble
                  educational initiative grew into a lifelong mission of public service, enterprise,
                  and community upliftment that would span over four decades.
                </p>
                <p>
                  Recognized nationally with the Gorkha Dakshina Bahu, Trishakti Patta, and the
                  Birendra-Aishwarya medals, Dr. Pokharel's influence extended far beyond education.
                  He served as a member of parliament, was a founding member of PABSON, and actively
                  contributed to Rotary Clubs, Lions Clubs, CDGC, and the SAARC Relations Council.
                </p>
                <p>
                  His life was a testament to the belief that true leadership is measured not by
                  what you accumulate, but by what you pass on. He planted seeds of education,
                  nurtured institutions of care, and built bridges of opportunity — a legacy that
                  now finds its next caretakers.
                </p>
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
              Passing the Torch
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
              From One Generation to the <span className="text-gradient italic">Next</span>
            </h3>
          </motion.div>

          {/* Spotlight acts — large photos, no timeline */}
          <div className="relative max-w-5xl mx-auto space-y-24 md:space-y-32">
            {torchActs.map((act, i) => (
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
              Principles That <span className="text-gradient italic">Endure</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              The core values that Dr. Pokharel instilled continue to guide every decision, every
              venture, and every partnership.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {legacyValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
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
                        {item.desc}
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
  act: (typeof torchActs)[number];
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
                  src={babuRam}
                  alt="Dr. Babu Ram Pokharel"
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
            {act.desc}
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
              {act.desc}
            </p>
            <div className="relative pl-7 border-l-2 border-primary/30 text-left max-w-md mx-auto mt-6 pt-4 border-t border-border/30">
              <Quote className="absolute -left-3.5 -top-1 h-5 w-5 text-primary/40" />
              <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                "The foundation of a great nation is built not in years, but in the values we pass
                to the next generation."
              </p>
              <p className="text-xs text-muted-foreground/50 mt-2 font-semibold">
                — Dr. Babu Ram Pokharel
              </p>
            </div>
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
          {act.desc}
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
                  src={ubin}
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
            Steering BRP Group&apos;s diversified investments across technology, healthcare,
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
                  src={bidushi}
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

function LegacyIntroStatic() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
        <Sparkles className="h-3 w-3" />
        Carrying the Torch
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
        Our <span className="text-gradient italic">Legacy</span>
      </h2>
      <p className="mt-5 text-base sm:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        BRP Group is more than a name — it is the living legacy of late Dr. Babu Ram Pokharel,
        carried forward by a new generation driven by the same values, renewed purpose, and a vision
        for Nepal's tomorrow.
      </p>
    </div>
  );
}

function FounderStatic() {
  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-2 relative">
        <div className="relative mx-auto max-w-xs lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/80 shadow-xl">
            <div className="aspect-[3/4]">
              <img
                src={babuRamImg}
                alt="Dr. Babu Ram Pokharel"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
              <p className="text-white font-display text-lg font-bold">Dr. Babu Ram Pokharel</p>
              <p className="text-white/70 text-xs uppercase tracking-[0.2em] font-semibold">
                Chairman Emeritus · 1947–2022
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-5">
        <div className="glass-strong rounded-2xl border border-border/40 p-6 sm:p-8 md:p-10 shadow-glass">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground mb-5">
            The Man Behind the <span className="text-gradient italic">Vision</span>
          </h3>
          <div className="space-y-4 text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
            <p>
              Dr. Babu Ram Pokharel's journey began with a single school — V.S. Niketan — founded in
              2037 B.S. with 7 teachers and 147 students. What started as a humble educational
              initiative grew into a lifelong mission of public service, enterprise, and community
              upliftment that would span over four decades.
            </p>
            <p>
              Recognized nationally with the Gorkha Dakshina Bahu, Trishakti Patta, and the
              Birendra-Aishwarya medals, Dr. Pokharel's influence extended far beyond education. He
              served as a member of parliament, was a founding member of PABSON, and actively
              contributed to Rotary Clubs, Lions Clubs, CDGC, and the SAARC Relations Council.
            </p>
            <p>
              His life was a testament to the belief that true leadership is measured not by what
              you accumulate, but by what you pass on. He planted seeds of education, nurtured
              institutions of care, and built bridges of opportunity — a legacy that now finds its
              next caretakers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BridgeStatic() {
  return (
    <div className="relative">
      <div className="text-center mb-14 md:mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-4">
          <Flame className="h-3 w-3" />
          Passing the Torch
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
          From One Generation to the <span className="text-gradient italic">Next</span>
        </h3>
      </div>

      <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
        {torchActs.map((act) => {
          /* Foundation — large photo left, content right */
          if (act.id === "foundation") {
            return (
              <div key={act.id} className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                <div className="w-full md:w-[45%] max-w-sm">
                  <div className="relative group">
                    <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-amber-500/15 via-amber-300/5 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/15 bg-card shadow-xl">
                      <div className="aspect-[4/5]">
                        <img
                          src={babuRamImg}
                          alt="Dr. Babu Ram Pokharel"
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
                    {act.desc}
                  </p>
                </div>
              </div>
            );
          }

          /* Transition — centered quote */
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
                      {act.desc}
                    </p>
                    <div className="relative pl-7 border-l-2 border-primary/30 text-left max-w-md mx-auto mt-6 pt-4 border-t border-border/30">
                      <Quote className="absolute -left-3.5 -top-1 h-5 w-5 text-primary/40" />
                      <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                        "The foundation of a great nation is built not in years, but in the values
                        we pass to the next generation."
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-2 font-semibold">
                        — Dr. Babu Ram Pokharel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          /* Future — two individual spotlights */
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
                  {act.desc}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
                <div className="w-full md:w-[45%] max-w-sm">
                  <div className="relative">
                    <div className="absolute -inset-5 rounded-[3.5rem] bg-gradient-to-br from-sky-500/15 via-sky-300/5 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-sky-500/15 bg-card shadow-xl">
                      <div className="aspect-[4/5]">
                        <img
                          src={ubinImg}
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
                    Steering BRP Group&apos;s diversified investments across technology, healthcare,
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
                          src={bidushiImg}
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

function ValuesStatic() {
  return (
    <div>
      <div className="text-center mb-12 md:mb-16">
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
          Principles That <span className="text-gradient italic">Endure</span>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
          The core values that Dr. Pokharel instilled continue to guide every decision, every
          venture, and every partnership.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {legacyValues.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="glass-strong rounded-2xl border border-border/30 p-6 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-display text-base sm:text-lg text-foreground font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
