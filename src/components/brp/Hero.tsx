import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/optimized/BRPGrouplogo.png";
import {
  usePublicAboutSections,
  usePublicHero,
  usePublicHeroMorphingWords,
  usePublicHeroBgTheme,
  usePublicHeroTextColors,
} from "@/hooks/usePublicContent";
import {
  DEFAULT_HERO_HEADLINE_LINE1,
  DEFAULT_HERO_MORPHING_WORDS,
  DEFAULT_HERO_MORPHING_COLOR,
  DEFAULT_HERO_MORPHING_GLOW,
  parseHeroHeadline,
} from "@/lib/cms/hero-morphing";


// Sector configs for the visual cluster layout
interface VisualCard {
  title: string;
  image: string;
  baseRotateX: number;
  baseRotateY: number;
  floatDuration: number;
  floatDelay: number;
  positionClass: string;
  bgTint?: string;
  bgColor?: string;
}

/** Map venture tints to Grevy-style solid pastel card backgrounds. */
function heroCardPastel(hex: string | undefined): string {
  return "#ffffff";
}

const REDDOT_CARD_POSITION =
  "left-[78%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]";

const DEFAULT_CARDS: VisualCard[] = [
  {
    title: "Small Heaven School",
    image: "/site-assets/shs.webp", // Top Card
    baseRotateX: 8,
    baseRotateY: 0,
    floatDuration: 5.6,
    floatDelay: 0.1,
    positionClass:
      "left-[50%] top-[18%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
    bgColor: "#ffffff",
  },
  {
    title: "Satin Leaf Investment",
    image: "/site-assets/satin-leaf.webp", // Right Card
    baseRotateX: 0,
    baseRotateY: -10,
    floatDuration: 5.2,
    floatDelay: 0.3,
    positionClass:
      "left-[70%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
    bgColor: "#ffffff",
  },
  {
    title: "B.R.P. Ventures",
    image: "/site-assets/logo-BRP.webp", // Bottom Card
    baseRotateX: -8,
    baseRotateY: 0,
    floatDuration: 5.8,
    floatDelay: 0.7,
    positionClass:
      "left-[50%] top-[72%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
    bgColor: "#ffffff",
  },
  {
    title: "BRP Tours & Travels",
    image: "/site-assets/Brp-tours-and-travel.webp", // Left Card
    baseRotateX: -4,
    baseRotateY: 4,
    floatDuration: 6.4,
    floatDelay: 0.6,
    positionClass:
      "left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
    bgColor: "#ffffff",
  },
  {
    title: "Reddot",
    image: "/site-assets/reddot.webp", // Far Right Top Card
    baseRotateX: 4,
    baseRotateY: -4,
    floatDuration: 4.8,
    floatDelay: 0.2,
    positionClass: REDDOT_CARD_POSITION,
    bgColor: "#ffffff",
  },
];

const DEFAULT_CARD_LAYOUT_BY_TITLE = new Map(
  DEFAULT_CARDS.map((card) => [card.title, card.positionClass]),
);

const MORPH_INTERVAL_MS = 3500;

const VENTURE_SLUG_BY_TITLE: Record<string, string> = {
  "Small Heaven School": "small-heaven-school",
"Satin Leaf Investment": "satin-leaf-investment",
  "B.R.P. Ventures": "brp-ventures",
  Reddot: "reddot",
  "BRP Tours & Travels": "brp-tours-travels",
};

const revealEase = [0.22, 1, 0.36, 1] as const;

const contentReveal = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: revealEase },
  }),
};

function ventureHref(title: string) {
  const slug = VENTURE_SLUG_BY_TITLE[title];
  return slug
    ? { to: "/ventures" as const, hash: `venture-${slug}` }
    : { to: "/ventures" as const };
}

function tiltTransform(x: number, y: number) {
  return `rotateX(${x}deg) rotateY(${y}deg)`;
}

function HeroRotatingWord({ words, color, glowColor }: { words: string[]; color?: string; glowColor?: string }) {
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
}

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
  const { data: aboutSections } = usePublicAboutSections();
  const { data: morphingData } = usePublicHeroMorphingWords();
  const morphingWords = morphingData?.words ?? [...DEFAULT_HERO_MORPHING_WORDS];
  const morphingColor = morphingData?.color;
  const morphingGlow = morphingData?.glowColor;
  const heroBgTheme = usePublicHeroBgTheme();
  const heroTextColors = usePublicHeroTextColors();
  const { data: heroSlides } = usePublicHero();
  const activeSlide = heroSlides?.find((slide) => slide.is_active) ?? heroSlides?.[0];
  const parsedHeadline = parseHeroHeadline(activeSlide?.headline);
  const [headlineTop, headlineMiddle] = splitHeadlineForDisplay(
    parsedHeadline.line1 || DEFAULT_HERO_HEADLINE_LINE1,
  );
  const cards = DEFAULT_CARDS;

  return (
    <section
      id="top"
      className="hero-theme relative flex min-h-[92svh] w-full flex-col overflow-hidden select-none sm:min-h-[92svh] md:min-h-[92svh] lg:min-h-[93svh] xl:min-h-[94svh] pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32"
      style={{
        "--hero-text": heroTextColors.headline_color,
        "--hero-text-muted": heroTextColors.subheadline_color,
        "--hero-bg-primary": heroBgTheme.primary_color,
        "--hero-bg-accent": heroBgTheme.accent_color,
        "--hero-bg-deep": heroBgTheme.deep_color,
        "--hero-bg-contrast": heroBgTheme.contrast,
      } as React.CSSProperties}
    >
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
      <div
        className="hero-theme__grain pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div
        className="hero-theme__vignette pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      {/* ─── Main Content Body ─── */}
      <div className="relative z-20 mx-auto grid w-full brp-container flex-1 grid-cols-1 items-center gap-4 py-3 sm:gap-6 sm:py-5 md:gap-8 md:py-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        {/* Left Column content */}
        <div className="flex flex-col items-center justify-center pt-0 text-center lg:col-span-5 lg:items-start lg:text-left">
          <motion.div
            custom={0}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={contentReveal}
            className="hero-theme__badge mb-4 !text-foreground !border-border !bg-background/50 md:mb-5"
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
            custom={0.08}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={contentReveal}
            className="hero-theme__headline font-display max-w-[20ch] text-[clamp(2rem,9vw,2.8rem)] font-bold leading-[1.14] tracking-tight sm:max-w-[22ch] sm:text-[clamp(2.2rem,6vw,3rem)] md:max-w-[24ch] md:text-[clamp(2.5rem,5vw,3.3rem)] lg:max-w-[28ch] lg:text-[clamp(2.7rem,3.5vw,3.5rem)] 2xl:max-w-none 2xl:text-[clamp(3.2rem,3.5vw,4.2rem)]"
            style={{ textShadow: "none", color: "var(--hero-text)" }}
            >
            {headlineTop}
            <br />
            {headlineMiddle}
            <br />
            <span className="inline-flex items-baseline gap-1 overflow-visible leading-[1.14]">
              Diversified<HeroRotatingWord words={morphingWords} color={morphingColor} glowColor={morphingGlow} />
            </span>
          </motion.h1>

          <motion.p
            custom={0.16}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={contentReveal}
            className="hero-theme__copy mt-3 max-w-xl font-sans text-sm font-normal leading-[1.6] sm:max-w-lg sm:text-[0.95rem] md:text-base md:max-w-xl lg:max-w-lg lg:text-[1rem] 2xl:max-w-xl 2xl:text-lg"
            style={{ textShadow: "none", color: "var(--hero-text-muted)" }}
            >
            {heroSlides ? (activeSlide?.subheadline?.trim() ||
              "Combining physical assets with digital scale to develop and fund legacy-driven organizations in Education, Real Estate, Technology, and Partnerships.") : ""}
          </motion.p>

          <motion.div
            custom={0.24}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={contentReveal}
          >
            <a
              href={activeSlide?.cta_url?.trim() || "/ventures"}
              className="hero-theme__cta group mt-6 md:mt-8"
              style={{ color: heroTextColors.cta_text_color, background: heroTextColors.cta_bg_color }}
            >
              <span>{activeSlide?.cta_text?.trim() || "Explore Ecosystem"}</span>
              <div className="hero-theme__cta-icon" style={{ color: heroTextColors.cta_icon_color, background: "rgba(255, 255, 255, 0.15)" }}>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Visual Card Cluster Replica */}
        <div className="relative mt-2 flex h-[300px] w-full items-center justify-center perspective-[1200px] transform-style-3d sm:h-[380px] md:h-[420px] lg:col-span-7 lg:mt-0 lg:h-[380px] 2xl:mt-6 2xl:h-[clamp(480px,54vh,620px)]">
          {/* Desktop+ visual cluster (2xl screens and up — 1536px+) */}
          <div className="hidden 2xl:block absolute inset-0">
            <motion.div
              style={{ perspective: "1000px" }}
              animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto"
            >
              <div
                style={{
                  transformStyle: "preserve-3d",
                  transform: tiltTransform(0, 0),
                }}
                className="hero-theme__hub flex h-28 w-28 items-center justify-center rounded-[2.2rem] 2xl:h-32 2xl:w-32"
              >
                <img
                  src={logo}
                  alt="BRP Group Logo"
                  className="hero-theme__logo w-[75%] h-[75%] object-contain"
                />
              </div>
            </motion.div>

            {cards.map((card, idx) => {
              const tiltX = card.baseRotateX;
              const tiltY = card.baseRotateY;
              const isSmall = card.positionClass.includes("w-20");
              const amplitude = isSmall ? -4 : -5;
              const href = ventureHref(card.title);
              const positionClass = card.positionClass
                .replace("w-20", "w-20 2xl:w-24")
                .replace("w-28", "w-28 2xl:w-32")
                .replace("h-20", "h-20 2xl:h-24")
                .replace("h-28", "h-28 2xl:h-32")
                .replace("rounded-[1.4rem]", "rounded-[1.4rem] 2xl:rounded-[1.6rem]")
                .replace("rounded-[1.8rem]", "rounded-[1.8rem] 2xl:rounded-[2rem]");
              return (
                <motion.div
                  key={card.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, y: 16 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: prefersReducedMotion ? 0 : [0, amplitude, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.55, delay: 0.2 + idx * 0.07 },
                    scale: { type: "spring", stiffness: 320, damping: 22 },
                    y: prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: card.floatDuration || 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: card.floatDelay || 0,
                        },
                  }}
                  className={`absolute pointer-events-auto ${positionClass} ${isSmall ? "z-10" : "z-20"}`}
                >
                  <Link
                    {...href}
                    className="hero-venture-link group block h-full w-full rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    aria-label={`Explore ${card.title}`}
                  >
                    <div
                      style={{
                        transformStyle: "preserve-3d",
                        transform: tiltTransform(tiltX, tiltY),
                        ["--hero-card-tint" as string]: heroCardPastel(card.bgColor),
                      }}
                      className="hero-theme__card relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] p-3"
                    >
                      <img
                        src={card.image}
                        alt=""
                        className="hero-theme__venture-logo relative z-[1] h-full w-full object-contain transition-transform duration-500"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Tablet + Laptop visual (sm to 2xl) — simplified 4-card diamond */}
          <div className="hidden sm:block 2xl:hidden absolute inset-0">
            {/* Center hub */}
            <motion.div
              style={{ perspective: "1000px" }}
              animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[50%] top-[42%] -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto"
            >
              <div
                style={{ transformStyle: "preserve-3d", transform: tiltTransform(0, 0) }}
                className="hero-theme__hub flex h-24 w-24 items-center justify-center rounded-[2rem] md:h-[7.5rem] md:w-[7.5rem]"
              >
                <img
                  src={logo}
                  alt="BRP Group Logo"
                  className="hero-theme__logo w-[75%] h-[75%] object-contain"
                />
              </div>
            </motion.div>

            {cards.slice(0, 4).map((card, idx) => {
              const positions = [
                "left-[50%] top-[18%] -translate-x-1/2 -translate-y-1/2 w-[6.5rem] h-[6.5rem] rounded-[1.8rem] md:w-[7.5rem] md:h-[7.5rem]",
                "left-[76%] top-[42%] -translate-x-1/2 -translate-y-1/2 w-[6rem] h-[6rem] rounded-[1.6rem] md:w-[7rem] md:h-[7rem]",
                "left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-[6.5rem] h-[6.5rem] rounded-[1.8rem] md:w-[7.5rem] md:h-[7.5rem]",
                "left-[24%] top-[42%] -translate-x-1/2 -translate-y-1/2 w-[6rem] h-[6rem] rounded-[1.6rem] md:w-[7rem] md:h-[7rem]",
              ];
              const href = ventureHref(card.title);
              return (
                <motion.div
                  key={`tab-${card.title}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, -3, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.15 + idx * 0.08 },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    y: prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 4.2 + idx * 0.4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute pointer-events-auto z-20 ${positions[idx]}`}
                >
                  <Link
                    {...href}
                    className="hero-venture-link group block h-full w-full rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <div
                      style={{
                        transformStyle: "preserve-3d",
                        transform: tiltTransform(0, 0),
                        ["--hero-card-tint" as string]: heroCardPastel(card.bgColor),
                      }}
                      className="hero-theme__card flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] p-3"
                    >
                      <img
                        src={card.image}
                        alt=""
                        className="hero-theme__venture-logo relative z-[1] h-full w-full object-contain"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Layout (Touch friendly layout) */}
          <div className="relative block h-full w-full sm:hidden">
            {/* Center Logo */}
            <div className="hero-theme__hub absolute left-1/2 top-[28%] flex h-[5rem] w-[5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.4rem]">
              <img
                src={logo}
                alt="BRP Group"
                className="hero-theme__logo h-[70%] w-[70%] object-contain"
              />
            </div>

            {/* Mobile Swipeable Carousel */}
            <div className="no-scrollbar absolute bottom-2 left-0 z-30 flex w-full snap-x gap-3 overflow-x-auto px-4 pb-4 scroll-smooth">
              {cards.slice(0, 6).map((card) => {
                const href = ventureHref(card.title);
                return (
                  <Link
                    key={card.title}
                    {...href}
                    className="hero-venture-link group flex-shrink-0 snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-[1.8rem]"
                    aria-label={`Explore ${card.title}`}
                  >
                    <div
                      style={{ ["--hero-card-tint" as string]: heroCardPastel(card.bgColor) }}
                      className="hero-theme__card relative flex h-32 w-24 items-center justify-center overflow-hidden rounded-[1.5rem] p-2.5 transition-transform duration-300 active:scale-[0.97]"
                    >
                      <img
                        src={card.image}
                        alt=""
                        className="hero-theme__venture-logo relative z-[1] w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <footer className="pointer-events-none relative z-30 w-full px-4 pb-4 sm:px-6 sm:pb-5">
        <div
          className="hero-theme__footer mx-auto flex brp-container items-center justify-between font-sans text-[10px] uppercase tracking-[0.22em] md:text-xs"
        >
          <span>Kathmandu, Nepal</span>
          <span>© {new Date().getFullYear()} BRP Group</span>
        </div>
      </footer>
    </section>
  );
}
