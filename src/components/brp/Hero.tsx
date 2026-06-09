import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ourHistory } from "@/data/brp-site-content";
import { lazy, Suspense, useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";

const Scene3D = lazy(() => import("./Scene3D").then((m) => ({ default: m.Scene3D })));

const easeOut = [0.22, 1, 0.36, 1] as const;

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    import("framer-motion").then(({ animate }) => {
      animate(0, target, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
    });
  }, [inView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const words = ["Ventures", "Innovation", "Growth", "Legacy"];

function MorphingText() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const measurerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const measureWidth = useCallback(() => {
    if (!measurerRef.current) return;
    const nodes = Array.from(measurerRef.current.children) as HTMLElement[];
    let max = 0;
    for (const n of nodes) {
      const r = n.getBoundingClientRect();
      if (r.width > max) max = r.width;
    }
    if (max > 0) setWidth(Math.ceil(max));
  }, []);

  useLayoutEffect(() => {
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, [measureWidth]);

  return (
    <span
      className="inline-flex align-baseline items-baseline text-left"
      style={{ display: "inline-flex" }}
    >
      {/* Measurer (offscreen) to determine widest word without affecting layout */}
      <div
        ref={measurerRef}
        aria-hidden
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {words.map((word) => (
          <span
            key={word}
            className="text-gradient italic"
            style={{ fontSize: "inherit", fontFamily: "inherit" }}
          >
            {word}
          </span>
        ))}
      </div>

      <span
        className="relative inline-block align-baseline text-center sm:text-left"
        style={{ width: width ? `${width}px` : "auto" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            className="text-gradient italic inline-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block" }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

function MobileScene3DPlaceholder() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldMountScene, setShouldMountScene] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    const run = () => {
      if (!cancelled) setShouldMountScene(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(run, 450);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  const placeholder = (
    <div
      className="absolute inset-x-0 top-40 bottom-0 md:top-32 bg-gradient-to-b from-primary/8 to-transparent"
      aria-hidden
    />
  );

  if (prefersReducedMotion || !shouldMountScene) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      <Scene3D className="absolute inset-x-0 top-40 bottom-0 md:top-32" />
    </Suspense>
  );
}

export function Hero() {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden pt-32 sm:pt-36 md:pt-40">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.85_0.1_240/0.5),transparent_60%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%] h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[12%] h-72 w-72 rounded-full bg-gradient-to-tl from-accent/20 to-primary/15 blur-3xl"
      />

      {/* 3D scene — lazy chunk; render on all devices (Scene3D self-reduces on low-power) */}
      <MobileScene3DPlaceholder />

      {/* Soft vignettes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(1_0_0/0.4)_85%)]" />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center px-4 pt-4 pb-16 text-center sm:min-h-[calc(100vh-9rem)] sm:px-6 sm:pt-4 sm:pb-20 md:min-h-[calc(100vh-10rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="glass mb-6 inline-flex max-w-[min(100%,22rem)] items-center justify-center gap-2 rounded-full px-4 py-1.5 text-center text-[11px] font-medium leading-snug text-muted-foreground sm:mb-8 sm:max-w-none sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span>A diversified venture ecosystem · Est. 2019</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: easeOut }}
          className="font-display w-full max-w-[20rem] text-balance text-4xl leading-[1.08] tracking-tight text-foreground sm:max-w-none sm:text-5xl sm:leading-[1.05] md:text-7xl lg:text-[88px]"
        >
          Building Nepal&apos;s Future
          <span className="mt-2 block text-balance sm:mt-3">
            Through Diversified{" "}
            <MorphingText />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: easeOut }}
          className="mt-8 max-w-2xl text-balance text-base font-light text-muted-foreground md:text-lg"
        >
          {ourHistory.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: easeOut }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href="#ecosystem"
            onClick={(e) => scrollToSection(e, "#ecosystem")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-float transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
          >
            Explore Ecosystem
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="glass-strong inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.03]"
          >
            Contact BRP Group
          </a>
        </motion.div>

        {/* Stats strip with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: easeOut }}
          className="glass mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 rounded-2xl p-5 sm:mt-20 sm:grid-cols-3 sm:gap-2 sm:rounded-3xl sm:p-6 md:gap-6"
        >
          {[
            { target: 45, suffix: "+", label: "Years of legacy" },
            { target: 10, suffix: "+", label: "Active businesses" },
            { target: 1000, suffix: "+", label: "Networks built" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-row items-center justify-between gap-4 border-b border-border/20 pb-4 last:border-0 last:pb-0 sm:flex-col sm:border-0 sm:pb-0"
            >
              <div className="font-display text-3xl text-gradient sm:text-center md:text-4xl">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-right text-sm font-light text-muted-foreground sm:mt-1 sm:text-center sm:text-xs md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll to discover</span>
          <div className="h-8 w-px animate-scroll-hint bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
