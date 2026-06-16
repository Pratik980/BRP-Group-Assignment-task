import { motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { alternateSlideIn, splitSlideIn, slideEase } from "@/lib/alternate-slide";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

import img1 from "@/assets/optimized/image-1.webp";
import img2 from "@/assets/optimized/image-2.webp";
import img3 from "@/assets/optimized/image-3.webp";
import img4 from "@/assets/optimized/image-4.webp";
import img5 from "@/assets/optimized/image-5.webp";
import img6 from "@/assets/optimized/image-6.webp";
import brpImg1 from "@/assets/optimized/Brp-image-1.webp";
import babuRamImg from "@/assets/optimized/Babu-Ram-Pokharel-image-1.webp";
import ubinImg2 from "@/assets/optimized/Ubin-Pokharel-image-2.webp";
import ubinPng2 from "@/assets/optimized/Ubin-Pokherel-2.webp";

const images = [
  { src: img6, label: "Corporate Team & Governance" },
  { src: ubinImg2, label: "Leadership & Chairman Dr. Ubin Pokharel" },
  { src: img1, label: "Incubator Workshops & Satin Leaf" },
  { src: babuRamImg, label: "Chairman Emeritus Dr. Babu Ram Pokharel" },
  { src: img2, label: "Venture Summit & Collaboration" },
  { src: brpImg1, label: "BRP Headquarters & Operations" },
  { src: img3, label: "IT Infrastructure Planning" },
  { src: ubinPng2, label: "Executive Board Meetings" },
  { src: img4, label: "Strategic Investments Group" },
  { src: img5, label: "Nepal-US Cooperation Summits" },
];

const DRAG_BUFFER = 50;
const AUTO_INTERVAL_MS = 7000;

export function CorporateGallery() {
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
  }, [dragX]);

  const handlePrev = useCallback(() => {
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
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
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-16 sm:py-24"
    >
      <ThemeBackdrop variant="section" />
      <div className="relative z-10 brp-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <motion.div {...splitSlideIn(0, "visual", { margin: "-60px" })}>
            <div className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
              Corporate Gallery
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl xl:text-7xl">
              BRP Group <span className="text-gradient italic">In Action</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light text-muted-foreground md:text-base xl:text-lg">
              Browse the full gallery below — select any photo to view it without cropping.
            </p>
          </motion.div>

          <motion.div
            {...splitSlideIn(0, "content", { margin: "-60px" })}
            transition={{ duration: 0.85, ease: slideEase, delay: 0.08 }}
            className="flex items-center gap-3 mt-6 md:mt-0 relative z-20"
          >
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-background/50 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-glass"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[4.5rem] text-center text-xs font-semibold tabular-nums text-muted-foreground">
              {imgIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-background/50 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-glass"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Main viewer — object-contain shows the entire photo */}
        <motion.div
          ref={containerRef}
          {...alternateSlideIn(0, { margin: "-80px", duration: 0.95 })}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-muted/40 border border-border/40 shadow-glass"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            style={{ x: dragX }}
            animate={{ translateX: `-${imgIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onDragEnd={onDragEnd}
            className="flex cursor-grab items-stretch active:cursor-grabbing"
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative flex w-full shrink-0 flex-col">
                <div className="flex min-h-[280px] max-h-[min(75vh,720px)] w-full items-center justify-center bg-muted/30 p-3 sm:min-h-[360px] sm:p-5 md:min-h-[420px]">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="max-h-[min(70vh,680px)] w-full object-contain pointer-events-none select-none"
                    loading={idx <= 1 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                <div className="border-t border-border/30 bg-gradient-to-t from-foreground/90 to-foreground/75 px-6 py-5 text-white sm:px-8 sm:py-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-semibold md:text-xs">
                    Photo {idx + 1} of {images.length}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl text-pretty tracking-tight font-medium sm:text-2xl md:text-3xl">
                    {img.label}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Thumbnail grid — see every photo at a glance */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              {...alternateSlideIn(idx, { margin: "-40px", duration: 0.7 })}
              transition={{ duration: 0.7, ease: slideEase, delay: idx * 0.04 }}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 bg-muted/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                idx === imgIndex
                  ? "border-primary shadow-glow scale-[1.02]"
                  : "border-border/40 opacity-80 hover:border-primary/40 hover:opacity-100",
              )}
              aria-label={`View ${img.label}`}
              aria-current={idx === imgIndex ? "true" : undefined}
            >
              <div className="flex aspect-[4/3] items-center justify-center p-1.5">
                <img
                  src={img.src}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="sr-only">{img.label}</span>
              {idx === imgIndex && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" aria-hidden />
              )}
            </motion.button>
          ))}
        </div>

        {/* Dot indicators */}
        <motion.div
          {...alternateSlideIn(1, { margin: "-20px", duration: 0.75 })}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === imgIndex
                  ? "w-8 bg-primary shadow-glow"
                  : "w-2 bg-border hover:bg-muted-foreground/40",
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
