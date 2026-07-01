import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Compass, Rocket, Sparkles } from "lucide-react";
import { resolveVisionMission } from "@/lib/cms/about-content";
import { usePublicAboutSections } from "@/hooks/usePublicContent";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

import photoHeritage from "@/assets/optimized/History-image-2-1200.webp";
import photoGrowth from "@/assets/optimized/image-5-1200.webp";
import photoCommunity from "@/assets/optimized/education-2-1200.webp";

const ease = [0.22, 1, 0.36, 1] as const;
const slideEase = [0.45, 0, 0.25, 1] as const;
const AUTOPLAY_MS = 5500;

const galleryPhotos = [
  {
    src: photoHeritage,
    alt: "B.R.P. Group heritage and long-term vision",
    caption: "Legacy & vision",
  },
  {
    src: photoGrowth,
    alt: "B.R.P. Group growth across sectors",
    caption: "Growth & scale",
  },
  {
    src: photoCommunity,
    alt: "B.R.P. Group community impact",
    caption: "Community impact",
  },
] as const;

function PhotoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = galleryPhotos[activeIndex];
  const slideCount = galleryPhotos.length;
  const slidePercent = 100 / slideCount;

  const goTo = (index: number) => {
    setActiveIndex((index + slideCount) % slideCount);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [slideCount]);

  return (
    <div className="relative flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-muted/40 shadow-glass">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <motion.div
            className="flex h-full will-change-transform"
            style={{ width: `${slideCount * 100}%` }}
            animate={{ x: `-${activeIndex * slidePercent}%` }}
            transition={{ duration: 0.85, ease: slideEase }}
          >
            {galleryPhotos.map((photo) => (
              <div
                key={photo.src}
                className="h-full shrink-0 overflow-hidden"
                style={{ width: `${slidePercent}%` }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-contain object-center bg-muted/10"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {slideCount > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/50 md:left-4 md:h-11 md:w-11"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white shadow-md backdrop-blur-sm transition hover:bg-black/50 md:right-4 md:h-11 md:w-11"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-0.5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/85 md:text-sm">
          {active.caption}
        </p>

        {slideCount > 1 ? (
          <div className="flex items-center gap-1.5">
            {galleryPhotos.map((photo, index) => (
              <button
                key={`${photo.src}-dot`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/45"
                }`}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>

      {slideCount > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show ${photo.caption}`}
              aria-current={activeIndex === index}
              onClick={() => goTo(index)}
              className={`relative aspect-[3/2] overflow-hidden rounded-xl border transition-all ${
                activeIndex === index
                  ? "border-primary ring-2 ring-primary/25"
                  : "border-border/50 opacity-75 hover:opacity-100"
              }`}
            >
              <img src={photo.src} alt="" className="h-full w-full object-cover object-center" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PurposeBlock({
  icon: Icon,
  label,
  title,
  body,
  delay,
}: {
  icon: typeof Compass;
  label: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease }}
      className="relative pl-0 md:pl-1"
    >
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm"
          whileHover={{ rotate: 6, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          {label}
        </span>
      </div>

      <h3 className="font-display text-2xl tracking-tight text-foreground md:text-3xl lg:text-4xl">
        {title}
      </h3>

      <motion.div
        className="mt-3 h-1 w-14 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.12, duration: 0.75, ease }}
      />

      <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg md:leading-8">
        {body}
      </p>
    </motion.div>
  );
}

export function VisionMissionSection() {
  const { data: aboutSections } = usePublicAboutSections();
  const { vision, mission } = resolveVisionMission(aboutSections);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="vision-mission"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-20 md:py-28"
    >
      <ThemeBackdrop variant="subtle" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-px w-[min(90%,720px)] -translate-x-1/2 origin-left bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{ scaleX: lineScale }}
      />

      <div className="relative z-10 brp-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <span className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Purpose & Direction
          </span>
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
            Vision & mission, <span className="text-gradient italic">one direction.</span>
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease }}
          className="vision-mission-card relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/80 shadow-glass backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/10 to-teal-400/10" />
          <motion.div
            className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
            animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />

          <div className="relative grid items-stretch gap-10 p-6 md:gap-12 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div className="flex flex-col justify-center gap-10 md:gap-12">
              <PurposeBlock
                icon={Compass}
                label="Our Vision"
                title={vision.title}
                body={vision.body}
                delay={0.08}
              />

              <motion.div
                aria-hidden
                className="h-px w-full bg-gradient-to-r from-primary/35 via-border to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease }}
              />

              <PurposeBlock
                icon={Rocket}
                label="Our Mission"
                title={mission.title}
                body={mission.body}
                delay={0.18}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.8, ease }}
              className="w-full"
            >
              <PhotoShowcase />
            </motion.div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
