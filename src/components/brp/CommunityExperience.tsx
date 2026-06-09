import { communityPage } from "@/data/brp-site-content";
import { motion, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  HeartPulse,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

import educationImg from "@/assets/optimized/image-5-1200.webp";
import healthcareImg from "@/assets/optimized/image-1-1200.webp";
import communityCentreImg from "@/assets/optimized/image-2-1200.webp";

import galleryImg3 from "@/assets/optimized/image-3-1200.webp";
import galleryImg4 from "@/assets/optimized/image-4-1200.webp";
import galleryImg5 from "@/assets/optimized/image-5-1200.webp";
import galleryImg6 from "@/assets/optimized/image-6-1200.webp";
import galleryChildren from "@/assets/optimized/childrents-1200.webp";
import galleryEducation1 from "@/assets/optimized/education-1-1200.webp";
import galleryEducation2 from "@/assets/optimized/education-2-1200.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    headline: communityPage.sections[0].headline,
    paragraphs: communityPage.sections[0].paragraphs,
    image: educationImg,
    icon: GraduationCap,
    themeColor: "rgba(42, 69, 128, 0.12)",
    accent: "#2A4580",
  },
  {
    headline: communityPage.sections[1].headline,
    paragraphs: communityPage.sections[1].paragraphs,
    image: healthcareImg,
    icon: HeartPulse,
    themeColor: "rgba(13, 148, 136, 0.12)",
    accent: "#0d9488",
  },
  {
    headline: communityPage.sections[2].headline,
    paragraphs: communityPage.sections[2].paragraphs,
    image: communityCentreImg,
    icon: Building2,
    themeColor: "rgba(99, 102, 241, 0.12)",
    accent: "#6366f1",
  },
] as const;

const galleryImages = [
  { src: galleryChildren, label: "Supporting the next generation" },
  { src: galleryEducation1, label: "School infrastructure & resources" },
  { src: galleryEducation2, label: "Learning environments in Gorkha" },
  { src: galleryImg3, label: "Community outreach programs" },
  { src: galleryImg4, label: "Local partnerships" },
  { src: galleryImg5, label: "Regional initiatives" },
  { src: galleryImg6, label: "Village community programs" },
] as const;

const DRAG_BUFFER = 50;
const AUTO_INTERVAL_MS = 6500;

function CommunityHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background py-28 md:py-36">
      <ThemeBackdrop variant="hero" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
            <Heart className="h-3 w-3 text-primary" />
            {communityPage.heroTitle}
          </span>

          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Empowering through{" "}
            <span className="text-gradient italic">health & education</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-balance text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {communityPage.heroIntro}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Chhoprak · Siranchok Rural Municipality, Gorkha
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section className="relative z-10 -mt-10 px-6 pb-4 md:-mt-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.75, ease }}
        className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/40 bg-border/30 shadow-float glass-strong"
      >
        {communityPage.highlights.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center bg-background/90 px-6 py-8 text-center"
          >
            <div className="font-display text-4xl text-gradient md:text-5xl">{item.value}</div>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function PillarStory({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  const Icon = pillar.icon;
  const shadow = reverse
    ? "18px 18px 0px 0px rgba(42, 69, 128, 0.08)"
    : "-18px 18px 0px 0px rgba(42, 69, 128, 0.08)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease }}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <div
        className={cn(
          "lg:col-span-6 flex justify-center",
          reverse ? "lg:order-2" : "lg:order-1",
        )}
      >
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border bg-white p-2"
          style={{ border: "2.5px solid rgba(0,0,0,0.06)", boxShadow: shadow }}
        >
          <img
            src={pillar.image}
            alt={pillar.headline}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </div>

      <div
        className={cn(
          "lg:col-span-6 flex flex-col text-center md:text-left",
          reverse ? "lg:order-1" : "lg:order-2",
        )}
      >
        <div
          className="mb-5 inline-flex items-center gap-2 self-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] md:self-start"
          style={{ backgroundColor: pillar.themeColor, color: pillar.accent }}
        >
          <Icon className="h-3.5 w-3.5" />
          {pillar.headline}
        </div>

        <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {pillar.headline}
        </h2>

        <div className="mt-6 space-y-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
          {pillar.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        <div
          className="mx-auto mt-6 h-1.5 w-20 rounded-full md:mx-0"
          style={{ backgroundColor: pillar.accent }}
        />
      </div>
    </motion.article>
  );
}

function ImpactStories() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-20 md:py-28">
      <ThemeBackdrop variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-6 md:space-y-28 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="glass mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            Our initiatives
          </span>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Impact in <span className="text-gradient italic">Chhoprak</span>
          </h2>
          <p className="mt-4 text-sm font-light text-muted-foreground">
            Continuing the legacy of Dr. Babu Ram Pokharel through education, healthcare, and
            community infrastructure.
          </p>
        </motion.div>

        {pillars.map((pillar, index) => (
          <PillarStory key={pillar.headline} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  );
}

function CommunityGallery() {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setImgIndex(index);
      dragX.set(0);
    },
    [dragX],
  );

  const handleNext = useCallback(() => {
    setImgIndex((prev) => (prev + 1) % galleryImages.length);
    dragX.set(0);
  }, [dragX]);

  const handlePrev = useCallback(() => {
    setImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    dragX.set(0);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER) handleNext();
    else if (x >= DRAG_BUFFER) handlePrev();
    dragX.set(0);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, AUTO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="relative overflow-hidden border-t border-border/30 bg-gradient-to-b from-background via-secondary/15 to-background py-16 sm:py-24">
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
              Gallery
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Community <span className="text-gradient italic">in action</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/50 shadow-glass transition hover:bg-foreground hover:text-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[4rem] text-center text-xs font-semibold tabular-nums text-muted-foreground">
              {imgIndex + 1} / {galleryImages.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/50 shadow-glass transition hover:bg-foreground hover:text-background"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-muted/30 shadow-glass"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            style={{ x: dragX }}
            animate={{ translateX: `-${imgIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onDragEnd={onDragEnd}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {galleryImages.map((img, idx) => (
              <div key={img.src} className="w-full shrink-0">
                <div className="flex min-h-[260px] max-h-[min(70vh,640px)] items-center justify-center bg-muted/20 p-4 sm:min-h-[360px] sm:p-6">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="max-h-[min(65vh,600px)] w-full object-contain"
                    loading={idx <= 1 ? "eager" : "lazy"}
                  />
                </div>
                <div className="border-t border-border/30 bg-gradient-to-t from-foreground/90 to-foreground/75 px-6 py-5 text-white sm:px-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    Photo {idx + 1} of {galleryImages.length}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl sm:text-2xl">{img.label}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7 md:gap-3">
          {galleryImages.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(idx)}
              className={cn(
                "overflow-hidden rounded-xl border-2 bg-muted/20 transition-all",
                idx === imgIndex
                  ? "border-primary shadow-glow scale-[1.02]"
                  : "border-border/40 opacity-75 hover:border-primary/40 hover:opacity-100",
              )}
              aria-label={`View ${img.label}`}
            >
              <img src={img.src} alt="" className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/30 bg-gradient-to-b from-secondary/20 via-background to-background py-16 md:py-20">
      <ThemeBackdrop variant="section" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Explore our <span className="text-gradient italic">legacy</span>
        </h2>
        <p className="mt-4 text-sm font-light text-muted-foreground md:text-base">
          Learn how BRP Group&apos;s history and leadership shape our commitment to Nepal&apos;s
          communities.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-float transition hover:scale-[1.02]"
          >
            Our history
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="glass-strong inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground transition hover:scale-[1.02]"
          >
            About BRP Group
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CommunityExperience() {
  return (
    <>
      <CommunityHero />
      <ImpactStats />
      <ImpactStories />
      <CommunityGallery />
      <CommunityCTA />
    </>
  );
}
