import { resolveCommunityPage } from "@/lib/cms/about-content";
import { usePublicAboutSections } from "@/hooks/usePublicContent";
import { LazyImage } from "@/components/ui/lazy-image";
import { motion, useMotionValue } from "framer-motion";
import {
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
import { cn } from "@/lib/utils";
import { splitSlideIn } from "@/lib/alternate-slide";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

import educationImg from "@/assets/optimized/image-5-1200.webp";
import healthcareImg from "@/assets/optimized/image-1-1200.webp";
import communityCentreImg from "@/assets/optimized/image-2-1200.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const pillarThemes = [
  {
    image: educationImg,
    icon: GraduationCap,
    themeColor: "rgba(42, 69, 128, 0.12)",
    accent: "#2A4580",
  },
  {
    image: healthcareImg,
    icon: HeartPulse,
    themeColor: "rgba(13, 148, 136, 0.12)",
    accent: "#0d9488",
  },
  {
    image: communityCentreImg,
    icon: Building2,
    themeColor: "rgba(99, 102, 241, 0.12)",
    accent: "#6366f1",
  },
] as const;

type CommunityPillar = {
  headline: string;
  paragraphs: string[];
  image: string;
  icon: typeof GraduationCap;
  themeColor: string;
  accent: string;
};

const DRAG_BUFFER = 50;
const AUTO_INTERVAL_MS = 6500;

function CommunityHero() {
  const { data: aboutSections } = usePublicAboutSections();
  const content = resolveCommunityPage(aboutSections);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background py-28 md:py-36">
      <ThemeBackdrop variant="hero" />

      <div className="relative z-10 brp-container pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
            <Heart className="h-3 w-3 text-primary" />
            {content.heroTitle}
          </span>

          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {content.heroHeadline}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-balance text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {content.heroIntro}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {content.heroLocation}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactStats() {
  const { data: aboutSections } = usePublicAboutSections();
  const content = resolveCommunityPage(aboutSections);

  return (
    <section className="relative z-10 -mt-10 px-4 pb-4 md:-mt-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.75, ease }}
        className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/40 bg-border/30 shadow-float glass-strong"
      >
        {content.highlights.map((item) => (
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

function PillarStory({ pillar, index }: { pillar: CommunityPillar; index: number }) {
  const reverse = index % 2 === 1;
  const Icon = pillar.icon;
  const shadow = reverse
    ? "18px 18px 0px 0px rgba(42, 69, 128, 0.08)"
    : "-18px 18px 0px 0px rgba(42, 69, 128, 0.08)";

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <motion.div
        {...splitSlideIn(index, "visual")}
        className={cn("lg:col-span-6 flex justify-center", reverse ? "lg:order-2" : "lg:order-1")}
      >
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border bg-white p-2"
          style={{ border: "2.5px solid rgba(0,0,0,0.06)", boxShadow: shadow }}
        >
          <LazyImage
            src={pillar.image}
            alt={pillar.headline}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        {...splitSlideIn(index, "content", { duration: 0.9, margin: "-80px" })}
        transition={{ duration: 0.9, ease, delay: 0.08 }}
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
      </motion.div>
    </article>
  );
}

function ImpactStories() {
  const { data: aboutSections } = usePublicAboutSections();
  const content = resolveCommunityPage(aboutSections);
  const pillars: CommunityPillar[] = content.sections.map((section, index) => {
    const theme = pillarThemes[index] ?? pillarThemes[0];
    return {
      headline: section.headline,
      paragraphs: section.paragraphs,
      image: section.imageUrl || theme.image,
      icon: theme.icon,
      themeColor: theme.themeColor,
      accent: theme.accent,
    };
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-20 md:py-28">
      <ThemeBackdrop variant="section" />

      <div className="relative z-10 brp-container space-y-20 md:space-y-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="glass mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            {content.initiativesBadge}
          </span>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            {content.initiativesTitle}
          </h2>
          <p className="mt-4 text-sm font-light text-muted-foreground">
            {content.initiativesDescription}
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
  const { data: aboutSections } = usePublicAboutSections();
  const content = resolveCommunityPage(aboutSections);
  const images = content.galleryImages;
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
    setImgIndex((prev) => (prev + 1) % images.length);
    dragX.set(0);
  }, [dragX, images.length]);

  const handlePrev = useCallback(() => {
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
    dragX.set(0);
  }, [dragX, images.length]);

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
      <div className="relative z-10 brp-container">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
              {content.galleryBadge}
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              {content.galleryTitle}
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
              {imgIndex + 1} / {images.length}
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
            {images.map((img, idx) => (
              <div key={img.src + idx} className="w-full shrink-0">
                <div className="flex min-h-[260px] max-h-[min(70vh,640px)] items-center justify-center bg-muted/20 p-4 sm:min-h-[360px] sm:p-6">
                  <LazyImage
                    src={img.src}
                    alt={img.label}
                    className="max-h-[min(65vh,600px)] w-full object-contain"
                    priority={idx <= 1}
                  />
                </div>
                <div className="border-t border-border/30 bg-gradient-to-t from-foreground/90 to-foreground/75 px-6 py-5 text-white sm:px-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    Photo {idx + 1} of {images.length}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl sm:text-2xl">{img.label}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7 md:gap-3">
          {images.map((img, idx) => (
            <button
              key={img.src + idx}
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
              <LazyImage src={img.src} alt="" className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCTA() {
  const { data: aboutSections } = usePublicAboutSections();
  const content = resolveCommunityPage(aboutSections);

  return (
    <section className="relative overflow-hidden border-t border-border/30 bg-gradient-to-b from-secondary/20 via-background to-background py-16 md:py-20">
      <ThemeBackdrop variant="section" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl xl:text-5xl">
          {content.ctaTitle}
        </h2>
        <p className="mt-4 text-sm font-light text-muted-foreground md:text-base">
          {content.ctaDescription}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {content.ctaButtons.map((btn) => (
            <a
              key={btn.href + btn.label}
              href={btn.href}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-float transition hover:scale-[1.02]"
            >
              {btn.label}
            </a>
          ))}
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
