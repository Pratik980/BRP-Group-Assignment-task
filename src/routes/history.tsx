import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award,
  Landmark,
  Compass,
} from "lucide-react";

import { alternateSlideIn } from "@/lib/alternate-slide";
import histImg1 from "@/assets/optimized/History-image-1.webp";
import histImg2 from "@/assets/optimized/History-image-2-1200.webp";
import hallOfFrame from "@/assets/optimized/hall-of-frame.webp";
import commaImg from "@/assets/optimized/comma.webp";
import babuRam2 from "@/assets/optimized/Babu-Ram-Pokharel-image-2-1200.webp";
import vsImg1 from "@/assets/optimized/new-vs.webp";
import vsImg2 from "@/assets/optimized/education-1.webp";
import vsImg3 from "@/assets/optimized/education-2.webp";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "BRP Group — Corporate History & Timeline" },
      {
        name: "description",
        content:
          "Explore the 45-year history of BRP Group, starting from foundational education in 1980 by late Dr. Babu Ram Pokharel to modern diversified sectors today.",
      },
    ],
  }),
  component: HistoryPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

const cardContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease },
  },
};

// Helper Image Slider Component
function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/40 shadow-sm flex items-center justify-center bg-white p-2 min-h-[200px] md:min-h-[280px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt="VS Niketan Slider"
          className="w-full h-auto max-h-[320px] md:max-h-[400px] object-contain rounded-2xl"
          loading="lazy"
          decoding="async"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, x: -24 }}
          transition={{ duration: 0.45, ease }}
        />
      </AnimatePresence>
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

const historyMilestones = [
  {
    period: "2040-50 BS",
    title: "The Educational Genesis",
    icon: GraduationCap,
    desc: "Dr. Babu Ram Pokharel started his long and impactful journey in the education sector with the establishment of V.S. Niketan School in 2037 B.S. A school that was initiated with 7 teachers and 147 students is now one of the biggest educational institutions in the country.\nHe was also the founding member of Private and Boarding Schools’ Organization Nepal (PABSON), established in B.S. 2047.",
    image: histImg1,
    glowColor: "oklch(0.65 0.18 15 / 0.15)", // Rose/Red
  },
  {
    period: "2050-60 BS",
    title: "National Recognition & Honors",
    icon: Award,
    desc: "Recognizing the efforts of Dr. Babu Ram Pokharel and his initiatives in the social sector of the country, he was awarded with the Gorkha Dakshina Bahu in B.S. 2054, highest of awards from the then kingship of Nepal. He also received the Trishakti Patta, and the Birendra-Aishwarya medal in the years B.S. 2056 and B.S 2059 respectively.",
    image: histImg2,
    glowColor: "oklch(0.6 0.15 240 / 0.15)", // Blue
  },
  {
    period: "2060-70 BS",
    title: "Institutional Scaling & Public Service",
    icon: Landmark,
    desc: "V.S. Niketan has been able to accomplish excellent outcomes in education since the 37 years of its establishment. Having won the Best School of the Nation award in B.S. 2065, it is now a family for 300+ teachers and about 5000 students.\nHis influence in bringing reforms doesn’t only limit to the education sector, an equally active member of the society Dr. Babu Ram Pokharel was the member of parliament from B.S. 2070.",
    images: [vsImg1, vsImg2, vsImg3], // Uses slider!
    glowColor: "oklch(0.65 0.16 180 / 0.15)", // Teal/Cyan
  },
  {
    period: "2070-80 BS",
    title: "Legacy Transition & Ecosystem Building",
    icon: Compass,
    desc: "A visionary and an influential figure for thousands of people, Dr. Babu Ram Pokharel was also actively involved in more than a dozen social groups, such as the Rotary Club, Lions Clubs, Community Development and Guidance Center (CDGC), SAARC Relations Council, and others.\nHis involvements, deeds, and beliefs have now paved a way and given younger generations direction. The legacy of Dr. Babu Ram Pokharel is carried on by Dr. Ubin Pokharel and Ms. Bidushi Pandey Pokharel, who embody the same values and ethics but are motivated by fresher concepts.",
    image: hallOfFrame,
    glowColor: "oklch(0.55 0.15 280 / 0.15)", // Violet
  },
];

const timelineNavItemClass =
  "relative min-h-[60px] py-3 px-4 rounded-xl cursor-pointer select-none flex flex-col justify-center transition-colors duration-300 hover:bg-primary/[0.03]";

function TimelineNavItem({
  active,
  onClick,
  title,
  subtitle,
  index,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className={timelineNavItemClass}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {active && (
        <motion.div
          layoutId="timeline-active-pill"
          className="absolute inset-0 rounded-xl bg-primary/5 ring-1 ring-primary/10"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      <div className="relative z-10">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </motion.div>
  );
}

function HistoryPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [overviewHeight, setOverviewHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = cardsContainerRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (activeIdx === null) {
        setOverviewHeight(el.offsetHeight);
      }
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeIdx]);

  const setTimelineView = (idx: number | null) => {
    setActiveIdx(idx);
  };

  const isCardVisible = (index: number) => activeIdx === null || activeIdx === index;

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeBackdrop variant="page" className="opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.42 0.11 275 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.11 275 / 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
        aria-hidden
      />
      <Nav />
      <div className="relative z-10">
        {/* Hero Banner */}
          <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background py-16 sm:py-24 md:py-36">
          <ThemeBackdrop variant="hero" />
          <div className="relative z-10 brp-container pt-12 sm:pt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6 shadow-sm">
                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                Our Timeline
              </span>
              <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-6xl md:text-7xl">
                Chronicle of <span className="text-gradient italic">Trust</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base font-light text-muted-foreground md:text-lg xl:text-xl">
                A 45-year narrative of corporate responsibility, educational transformation, and
                compound value creation across Nepal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Milestones Tree */}
        <section className="relative overflow-hidden px-4 pb-20 sm:px-6 sm:pb-32">
          <ThemeBackdrop variant="section" />
          <div className="relative z-10 brp-container">
            <div className="hidden md:grid md:grid-cols-[240px_1fr] md:gap-x-10 lg:gap-x-14 xl:gap-x-20 md:items-start [overflow-anchor:none]">
              <aside className="sticky top-[96px] z-10 self-start">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                  className="mb-6 flex w-full items-center justify-center gap-3"
                >
                  <motion.span
                    className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    style={{ originX: 1 }}
                  />
                  <h3 className="shrink-0 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Timeline
                  </h3>
                  <motion.span
                    className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                <div className="relative flex flex-col gap-4 pl-3">
                  <motion.div
                    className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.15, ease }}
                    style={{ originY: 0 }}
                  />
                  <TimelineNavItem
                    active={activeIdx === null}
                    onClick={() => setTimelineView(null)}
                    title="Overview"
                    subtitle="View all milestones"
                    index={0}
                  />
                  {historyMilestones.map((m, i) => (
                    <TimelineNavItem
                      key={m.period}
                      active={activeIdx === i}
                      onClick={() => setTimelineView(i)}
                      title={m.period}
                      subtitle={m.title}
                      index={i + 1}
                    />
                  ))}
                </div>
              </aside>

              <div
                ref={cardsContainerRef}
                className="min-w-0 md:pt-11 [overflow-anchor:none]"
                style={overviewHeight > 0 ? { minHeight: overviewHeight } : undefined}
              >
                {activeIdx === null ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="glass-strong rounded-[2rem] border border-border/40 p-4 shadow-glass md:p-6"
                  >
                    <div className="mb-5 border-b border-border/30 pb-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                        Overview
                      </p>
                      <h2 className="font-display mt-2 text-2xl tracking-tight text-foreground md:text-3xl">
                        Complete timeline
                      </h2>
                    </div>
                    <div className="max-h-[calc(100vh-190px)] overflow-y-auto pr-2">
                      <div className="flex flex-col gap-8 pb-1">
                        {historyMilestones.map((milestone, i) => (
                          <MilestoneCard key={milestone.period} milestone={milestone} index={i} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-12">
                    {historyMilestones.map((milestone, i) => (
                      <div
                        key={milestone.period}
                        className={isCardVisible(i) ? "block" : "hidden"}
                        aria-hidden={!isCardVisible(i)}
                      >
                        <MilestoneCard milestone={milestone} index={i} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden [overflow-anchor:none]">
              <motion.h3
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
              >
                Timeline
              </motion.h3>
              <div
                className="flex flex-col gap-12"
                style={overviewHeight > 0 ? { minHeight: overviewHeight } : undefined}
              >
                {historyMilestones.map((milestone, i) => (
                  <div
                    key={milestone.period}
                    className={isCardVisible(i) ? "block" : "hidden"}
                    aria-hidden={!isCardVisible(i)}
                  >
                    <MilestoneCard milestone={milestone} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function MilestoneCard({
  milestone,
  index = 0,
}: {
  milestone: (typeof historyMilestones)[number];
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      {...(reduceMotion
        ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
        : alternateSlideIn(index, { margin: "-60px", duration: 0.9 }))}
      viewport={{ once: true, margin: "-60px" }}
      className="group relative"
    >
      <motion.div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: milestone.glowColor }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
      />
      <motion.div
        className="glass-strong overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 p-3 sm:p-6 md:p-10"
        whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.35, ease } }}
      >
        <motion.div
          className="absolute left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-[#2A4580] via-primary to-transparent"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.08 + 0.2, ease }}
        />
        <RightCardContent milestone={milestone} />
      </motion.div>
    </motion.div>
  );
}

function RightCardContent({ milestone }: { milestone: (typeof historyMilestones)[number] }) {
  const reduceMotion = useReducedMotion();

  return (
      <motion.div
        className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:gap-8"
        variants={reduceMotion ? undefined : cardContentVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div
          className="flex-shrink-0 md:w-48"
          variants={reduceMotion ? undefined : cardItemVariants}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0"
              whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <milestone.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs text-muted-foreground">{milestone.period}</div>
              <div className="font-display text-base sm:text-lg font-bold text-foreground sm:text-xl">
                {milestone.title}
              </div>
            </div>
          </div>
        </motion.div>

      <motion.div className="flex-1 min-w-0" variants={reduceMotion ? undefined : cardItemVariants}>
        <div className="mb-3 sm:mb-4">
          <motion.div
            className="my-2 h-1 w-16 sm:w-24 rounded-full bg-[#2A4580]"
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 md:items-start">
          <motion.div variants={reduceMotion ? undefined : cardItemVariants}>
            <p className="text-sm font-light text-muted-foreground text-pretty whitespace-pre-line">
              {milestone.desc}
            </p>
          </motion.div>

          <motion.div className="w-full" variants={reduceMotion ? undefined : cardItemVariants}>
            {milestone.images && milestone.images.length > 1 ? (
              <ImageSlider images={milestone.images} />
            ) : milestone.image ? (
              <motion.div
                className="overflow-hidden rounded-2xl border bg-white p-2 shadow-sm"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.35, ease }}
              >
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-auto rounded-xl pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
