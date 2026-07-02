import { useState, useEffect, Fragment, memo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import defaultLogo from "@/assets/optimized/BRPGrouplogo.png";
import {
  usePublicHero,
  usePublicHeroBrandLogo,
  usePublicHeroMorphingWords,
  usePublicHeroBgTheme,
  usePublicHeroTextColors,
  usePublicHeroVisualCards,
} from "@/hooks/usePublicContent";
import type { HeroVisualCard } from "@/lib/cms/hero-visual-cards";
import { LazyImage } from "@/components/ui/lazy-image";
import {
  DEFAULT_HERO_HEADLINE_LINE1,
  DEFAULT_HERO_MORPHING_WORDS,
  DEFAULT_HERO_MORPHING_COLOR,
  DEFAULT_HERO_MORPHING_GLOW,
  parseHeroHeadline,
} from "@/lib/cms/hero-morphing";

const MORPH_INTERVAL_MS = 3500;
const DEFAULT_HERO_SUBHEADLINE =
  "Combining physical assets with digital scale to develop and fund legacy-driven organizations in Education, Real Estate, Technology, and Partnerships.";
const revealEase = [0.22, 1, 0.36, 1] as const;

const textReveal = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: revealEase },
  }),
};

const networkFrameReveal = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: 0.12, ease: revealEase },
  },
};

const hubReveal = {
  hidden: { opacity: 0, scale: 0.72 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.28, ease: revealEase },
  },
};

const nodeReveal = {
  hidden: { opacity: 0, scale: 0.78, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.38 + delay, ease: revealEase },
  }),
};

function heroMotionInitial(reduced: boolean | null) {
  return reduced ? false : "hidden";
}

function tiltTransform(x: number, y: number) {
  return `rotateX(${x}deg) rotateY(${y}deg)`;
}

const NETWORK_NODES = [
  { id: 0, x: 50, y: 14, title: "Small Heaven School", path: "small-heaven-school" },
  { id: 1, x: 81.18, y: 32, title: "Satin Leaf Investment", path: "satin-leaf-investment" },
  { id: 2, x: 81.18, y: 68, title: "B.R.P. Ventures", path: "brp-ventures" },
  { id: 3, x: 50, y: 86, title: "B.R.P. Tours & Travels", path: "brp-tours-travels" },
  { id: 4, x: 18.82, y: 68, title: "Reddot", path: "reddot" },
  { id: 5, x: 18.82, y: 32, title: "Cloud Axis", path: "cloud-axis" },
];

function renderPlaceholder(nodeId: number) {
  switch (nodeId) {
    case 0: // Education - Progress arc / concentric circles
      return (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 opacity-75" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#ff7a2f"
            strokeWidth="2"
            strokeDasharray="88"
            initial={{ strokeDashoffset: 88 }}
            animate={{ strokeDashoffset: 28 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <circle
            cx="18"
            cy="18"
            r="8"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      );
    case 1: // Investment - Rising trendline chart
      return (
        <svg className="w-8 h-6 sm:w-10 sm:h-8 opacity-75" viewBox="0 0 40 30" fill="none">
          <path
            d="M 5,25 L 35,25"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M 5,22 L 12,18 L 20,24 L 28,10 L 35,4"
            stroke="#ff7a2f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="35"
            cy="4"
            r="2"
            fill="#ff7a2f"
            animate={{ scale: [1, 1.8, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </svg>
      );
    case 2: // Ventures - Interconnected network nodes
      return (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 opacity-75" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="10" r="2.5" fill="#ff7a2f" />
          <circle cx="9" cy="22" r="2.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="23" cy="22" r="2.5" fill="rgba(255,255,255,0.5)" />
          <line x1="16" y1="10" x2="9" y2="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="16" y1="10" x2="23" y2="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line
            x1="9"
            y1="22"
            x2="23"
            y2="22"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      );
    case 3: // Tourism - Radar sweep
      return (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 opacity-75" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="16"
            cy="16"
            r="6"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <motion.line
            x1="16"
            y1="16"
            x2="28"
            y2="16"
            stroke="#ff7a2f"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ originX: "16px", originY: "16px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );
    case 4: // Reddot - High-tech grid matrix
      return (
        <div className="tech-grid">
          <div className="tech-dot tech-dot-active" />
          <div className="tech-dot" />
          <div className="tech-dot" />
          <div className="tech-dot" />
          <div className="tech-dot tech-dot-active" />
          <div className="tech-dot" />
          <div className="tech-dot" />
          <div className="tech-dot" />
          <div className="tech-dot tech-dot-active" />
        </div>
      );
    case 5: // Cloud Axis - Data streams
      return (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 opacity-75" viewBox="0 0 32 32" fill="none">
          <motion.path
            d="M 6,8 L 26,8"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 8"
            animate={{ strokeDashoffset: [-12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 6,16 L 26,16"
            stroke="#ff7a2f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 6,24 L 26,24"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 4"
            animate={{ strokeDashoffset: [-12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );
    default:
      return null;
  }
}

const FuturisticNetworkLines = memo(function FuturisticNetworkLines({
  gradientId,
  prefersReducedMotion,
}: {
  gradientId: string;
  prefersReducedMotion: boolean;
}) {
  const spokes = NETWORK_NODES.map((node) => ({
    x1: 50,
    y1: 50,
    x2: node.x,
    y2: node.y,
    label: `spoke-${node.id}`,
  }));

  const ringLinks = NETWORK_NODES.map((node, index) => {
    const nextNode = NETWORK_NODES[(index + 1) % NETWORK_NODES.length];
    return {
      x1: node.x,
      y1: node.y,
      x2: nextNode.x,
      y2: nextNode.y,
      label: `ring-${node.id}`,
    };
  });

  return (
    <svg
      className="absolute inset-0 z-[2] h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
      </defs>

      {/* Background Outer Ring (Hexagon) */}
      {ringLinks.map((link) => (
        <line
          key={link.label}
          x1={link.x1}
          y1={link.y1}
          x2={link.x2}
          y2={link.y2}
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />
      ))}

      {/* Spokes (Center to nodes) */}
      {spokes.map((spoke, idx) => (
        <Fragment key={spoke.label}>
          {/* Outer glow line */}
          {!prefersReducedMotion && (
            <motion.line
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.06 }}
            />
          )}
          {/* Main line */}
          <motion.line
            x1={spoke.x1}
            y1={spoke.y1}
            x2={spoke.x2}
            y2={spoke.y2}
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.06 }}
          />
        </Fragment>
      ))}

      {/* Traveling Data Pulses (flowing along spokes) */}
      {!prefersReducedMotion &&
        spokes.map((spoke, idx) => (
          <motion.circle
            key={`pulse-${idx}`}
            r="0.8"
            fill="#ff7a2f"
            initial={{ cx: 50, cy: 50, opacity: 0 }}
            animate={{
              cx: [50, spoke.x2],
              cy: [50, spoke.y2],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: idx * 0.35,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 4px #ff7a2f)" }}
          />
        ))}
    </svg>
  );
});

const HeroRotatingWord = memo(function HeroRotatingWord({
  words,
  color,
  glowColor,
}: {
  words: string[];
  color?: string;
  glowColor?: string;
}) {
  const [index, setIndex] = useState(0);
  const safeWords = words.length > 0 ? words : [...DEFAULT_HERO_MORPHING_WORDS];
  const morphColor = color || DEFAULT_HERO_MORPHING_COLOR;
  const morphGlow = glowColor || DEFAULT_HERO_MORPHING_GLOW;
  const longestWord = safeWords.reduce(
    (longest, word) => (word.length > longest.length ? word : longest),
    safeWords[0] ?? "Ventures",
  );

  useEffect(() => {
    if (safeWords.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, MORPH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [safeWords.length]);

  useEffect(() => {
    setIndex(0);
  }, [safeWords.join("|")]);

  const currentWord = safeWords[index] ?? longestWord;

  return (
    <span
      className="relative inline-block align-baseline whitespace-nowrap overflow-visible leading-[1.3]"
      aria-live="polite"
    >
      <span className="invisible font-display font-bold" aria-hidden="true">
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-headline-morph absolute left-0 top-0 font-display font-bold"
          style={{
            color: morphColor,
            WebkitTextFillColor: morphColor,
            background: "none",
            backgroundClip: "unset",
            WebkitBackgroundClip: "unset",
            textShadow: `0 0 24px ${morphGlow}66, 0 0 48px ${morphGlow}44`,
            filter: `drop-shadow(0 2px 12px ${morphGlow}88)`,
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

function splitHeadlineForDisplay(line1: string): [string, string] {
  const trimmed = line1.trim();
  if (trimmed.startsWith("Building Nepal's")) {
    const rest = trimmed.slice("Building Nepal's".length).trim();
    return ["Building Nepal's", rest ? `${rest} Through` : "Future Through"];
  }
  const words = trimmed.split(/\s+/);
  if (words.length <= 2) return [trimmed, "Through"];
  return [words.slice(0, 2).join(" "), `${words.slice(2).join(" ")} Through`];
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { data: morphingData } = usePublicHeroMorphingWords();
  const morphingWords = morphingData?.words ?? [...DEFAULT_HERO_MORPHING_WORDS];
  const morphingColor = morphingData?.color;
  const morphingGlow = morphingData?.glowColor;
  const heroBgTheme = usePublicHeroBgTheme();
  const { background_type, background_url, background_video_loop } = heroBgTheme;
  const isGradientBg = background_type === "gradient";
  const heroTextColors = usePublicHeroTextColors();
  const { data: heroSlides } = usePublicHero();
  const { data: brandLogo } = usePublicHeroBrandLogo();
  const activeSlide = heroSlides?.find((slide) => slide.is_active) ?? heroSlides?.[0];
  const parsedHeadline = parseHeroHeadline(activeSlide?.headline);
  const [headlineTop, headlineMiddle] = splitHeadlineForDisplay(
    parsedHeadline.line1 || DEFAULT_HERO_HEADLINE_LINE1,
  );
  const { data: visualCards } = usePublicHeroVisualCards();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const subheadline = activeSlide?.subheadline?.trim() || DEFAULT_HERO_SUBHEADLINE;
  const logoSrc = brandLogo || defaultLogo;

  useEffect(() => {
    setImageErrors(new Set());
  }, [visualCards]);

  const handleLogoError = useCallback((nodeId: number) => {
    setImageErrors((prev) => {
      const next = new Set(prev);
      next.add(nodeId);
      return next;
    });
  }, []);

  return (
    <section
      id="top"
      className="hero-theme relative flex min-h-[92svh] w-full flex-col overflow-hidden select-none sm:min-h-[92svh] md:min-h-[92svh] lg:min-h-[93svh] xl:min-h-[94svh] pt-16 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32"
      style={
        {
          "--hero-text": heroTextColors.headline_color,
          "--hero-text-muted": heroTextColors.subheadline_color,
          "--hero-cta-glow": heroTextColors.cta_glow_color,
          "--hero-bg-primary": heroBgTheme.primary_color,
          "--hero-bg-accent": heroBgTheme.accent_color,
          "--hero-bg-deep": heroBgTheme.deep_color,
          "--hero-bg-contrast": heroBgTheme.contrast,
        } as React.CSSProperties
      }
    >
      {isGradientBg && (
        <>
          <div
            className="hero-theme__base pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          />
          <div
            className="hero-theme__aurora pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          />
          <div
            className="hero-theme__mesh pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          />
          <div
            className="hero-theme__spectrum pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          />
          <div
            className="hero-theme__glow pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          />
        </>
      )}

      {background_type === "image" && background_url && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <LazyImage src={background_url} alt="" className="h-full w-full object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {background_type === "video" && background_url && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <video
            src={background_url}
            autoPlay
            muted
            loop={background_video_loop}
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div
        className="hero-theme__grain pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div
        className="hero-theme__vignette pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      {/* ─── Main Content Body ─── */}
      <div className="relative z-20 mx-auto grid w-full brp-container flex-1 grid-cols-1 items-center gap-2 py-2 sm:gap-6 sm:py-5 md:gap-8 md:py-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        {/* Left Column content */}
        <div className="flex flex-col items-center justify-center pt-0 text-center lg:col-span-5 lg:items-start lg:text-left">
          <motion.div
            custom={0}
            initial={heroMotionInitial(prefersReducedMotion)}
            animate="show"
            variants={textReveal}
            className="hero-theme__badge mb-2 sm:mb-4 !text-foreground !border-border !bg-background/50 md:mb-5"
            style={{ textShadow: "none", boxShadow: "none" }}
          >
            <span
              className="hero-theme__badge-dot h-1.5 w-1.5 shrink-0 rounded-full !bg-foreground"
              aria-hidden="true"
              style={{ boxShadow: "none" }}
            />
            <span>Professional Venture Ecosystem</span>
          </motion.div>

          <motion.h1
            custom={0.1}
            initial={heroMotionInitial(prefersReducedMotion)}
            animate="show"
            variants={textReveal}
            className="hero-theme__headline font-display max-w-[20ch] text-[clamp(1.5rem,7vw,2.8rem)] font-bold leading-[1.14] tracking-tight sm:max-w-[22ch] sm:text-[clamp(2.2rem,6vw,3rem)] md:max-w-[24ch] md:text-[clamp(2.5rem,5vw,3.3rem)] lg:max-w-[28ch] lg:text-[clamp(2.7rem,3.5vw,3.5rem)] 2xl:max-w-none 2xl:text-[clamp(3.2rem,3.5vw,4.2rem)] will-change-transform"
            style={{ textShadow: "none", color: "var(--hero-text)" }}
          >
            {headlineTop}
            <br />
            {headlineMiddle}
            <br />
            <span className="inline-flex items-baseline gap-1 overflow-visible leading-[1.14]">
              Diversified
              <HeroRotatingWord
                words={morphingWords}
                color={morphingColor}
                glowColor={morphingGlow}
              />
            </span>
          </motion.h1>

          <motion.p
            custom={0.2}
            initial={heroMotionInitial(prefersReducedMotion)}
            animate="show"
            variants={textReveal}
            className="hero-theme__copy mt-1 sm:mt-3 max-w-xl font-sans text-xs sm:text-sm font-normal leading-[1.5] sm:leading-[1.6] sm:max-w-lg sm:text-[0.95rem] md:text-base md:max-w-xl lg:max-w-lg lg:text-[1rem] 2xl:max-w-xl 2xl:text-lg"
            style={{ textShadow: "none", color: "var(--hero-text-muted)" }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            custom={0.3}
            initial={heroMotionInitial(prefersReducedMotion)}
            animate="show"
            variants={textReveal}
          >
            <a
              href={activeSlide?.cta_url?.trim() || "/ventures"}
              className="hero-theme__cta group mt-2 sm:mt-6 md:mt-8"
              style={{
                color: heroTextColors.cta_text_color,
                background: heroTextColors.cta_bg_color,
              }}
            >
              <span>{activeSlide?.cta_text?.trim() || "Explore Ecosystem"}</span>
              <div
                className="hero-theme__cta-icon"
                style={{
                  color: heroTextColors.cta_icon_color,
                  background: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive Futuristic Corporate Network Frame */}
        <motion.div
          initial={heroMotionInitial(prefersReducedMotion)}
          animate="show"
          variants={networkFrameReveal}
          className="relative mt-2 sm:mt-4 flex w-full items-center justify-center lg:col-span-7 lg:mt-0 lg:h-[460px] xl:h-[500px] 2xl:h-[580px] will-change-transform"
        >
          <div className="relative aspect-square w-full max-w-[14rem] sm:max-w-[20rem] md:max-w-[25rem] lg:max-w-[30rem] xl:max-w-[34rem] 2xl:max-w-[38rem] mx-auto flex items-center justify-center perspective-[1200px] transform-style-3d">
            {/* SVG Network Lines */}
            <FuturisticNetworkLines
              gradientId="futuristicNetworkGradient"
              prefersReducedMotion={!!prefersReducedMotion}
            />

            {/* Central Rounded-Square Hub */}
            <motion.div
              initial={heroMotionInitial(prefersReducedMotion)}
              animate="show"
              variants={hubReveal}
              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.1,
                }}
              >
                <div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: tiltTransform(0, 0),
                  }}
                  className="hero-theme__hub hero-theme__hub--network hero-theme__hub--network-center flex items-center justify-center rounded-[1.6rem] sm:rounded-[2rem] md:rounded-[2.2rem] w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] md:w-[7rem] md:h-[7rem] lg:w-[7.5rem] lg:h-[7.5rem] xl:w-[8rem] xl:h-[8rem]"
                >
                  {/* Glowing Outer Spinning Ring */}
                  {!prefersReducedMotion && (
                    <div className="absolute inset-[-4px] rounded-[inherit] border border-dashed border-white/20 animate-spin [animation-duration:16s]" />
                  )}
                  {/* Central Radar Pulse */}
                  {!prefersReducedMotion && (
                    <div className="absolute inset-0 rounded-[inherit] bg-white/5 animate-ping [animation-duration:3s]" />
                  )}
                  <motion.img
                    src={logoSrc}
                    alt="B.R.P. Group Logo"
                    className="hero-theme__logo w-[70%] h-[70%] object-contain"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.45, ease: revealEase }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Surrounding Nodes */}
            {NETWORK_NODES.map((node, idx) => {
              const dbCard = visualCards?.[idx] as HeroVisualCard | undefined;
              const displayTitle = dbCard?.title?.trim() || node.title;
              const logoUrl = dbCard?.image?.trim();
              const showLogo = Boolean(logoUrl) && !imageErrors.has(node.id);
              const tiltX = idx % 2 === 0 ? 4 : -4;
              const tiltY = idx % 3 === 0 ? 4 : -4;
              const amplitude = -4;
              const href = { to: "/ventures" as const, hash: `venture-${node.path}` };

              return (
                <motion.div
                  key={node.id}
                  custom={idx * 0.07}
                  initial={heroMotionInitial(prefersReducedMotion)}
                  animate="show"
                  variants={nodeReveal}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20 w-[3.2rem] h-[3.2rem] sm:w-[5rem] sm:h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[6.2rem] lg:h-[6.2rem] xl:w-[6.8rem] xl:h-[6.8rem]"
                >
                  <motion.div
                    className="h-full w-full"
                    animate={prefersReducedMotion ? undefined : { y: [0, amplitude, 0] }}
                    transition={{
                      duration: 4.8 + idx * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2 + idx * 0.15,
                    }}
                  >
                    <Link
                      {...href}
                      className="hero-venture-link group block h-full w-full rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[1.8rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      aria-label={`Explore ${displayTitle}`}
                    >
                      <div
                        style={{
                          transformStyle: "preserve-3d",
                          transform: tiltTransform(tiltX, tiltY),
                        }}
                        className="hero-theme__card hero-theme__card--network relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] p-2 sm:p-2.5"
                      >
                        <div className={`flex h-full w-full items-center justify-center ${node.id === 0 ? "p-1 sm:p-1.5" : ""}`}>
                          {showLogo ? (
                            <LazyImage
                              src={logoUrl}
                              alt=""
                              className="hero-theme__venture-logo hero-theme__venture-logo--network relative z-[1] h-full w-full object-contain object-center"
                              onError={() => handleLogoError(node.id)}
                            />
                          ) : (
                            renderPlaceholder(node.id)
                          )}
                        </div>

                        {/* Hover Tooltip Label */}
                        <div className="absolute max-sm:top-[-2rem] sm:bottom-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white text-[9px] px-2 py-0.5 rounded border border-white/10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-30 font-sans tracking-wide">
                          {displayTitle}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.footer
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55, ease: revealEase }}
        className="pointer-events-none relative z-30 w-full px-4 pb-4 sm:px-6 sm:pb-5"
      >
        <div className="hero-theme__footer mx-auto flex brp-container items-center justify-between font-sans text-[10px] uppercase tracking-[0.22em] md:text-xs">
          <span>Kathmandu, Nepal</span>
          <span>© {new Date().getFullYear()} B.R.P. Group</span>
        </div>
      </motion.footer>
    </section>
  );
}
