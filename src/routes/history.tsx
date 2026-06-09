import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award,
  Landmark,
  Compass,
} from "lucide-react";

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

// Helper Image Slider Component
function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden w-full h-[250px] md:h-[350px] rounded-3xl border border-border/40 shadow-sm flex items-center justify-center bg-white">
      <img
        src={images[index]}
        alt="VS Niketan Slider"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
      />
      {/* Slider controls */}
      <button
        onClick={prev}
        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
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

function HistoryPage() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index ?? 0);
            setActiveIdx(idx);
          }
        });
      },
      { root: null, threshold: 0.5 },
    );

    cardRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeBackdrop variant="page" className="opacity-50" />
      <Nav />
      <div className="relative z-10">

      {/* Hero Banner */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background">
        <ThemeBackdrop variant="hero" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6 shadow-sm">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
              Our Timeline
            </span>
            <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Chronicle of <span className="text-gradient italic">Trust</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light text-muted-foreground md:text-lg">
              A 45-year narrative of corporate responsibility, educational transformation, and
              compound value creation across Nepal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Milestones Tree */}
      <section className="relative overflow-hidden px-4 pb-24 sm:px-6 sm:pb-32">
        <ThemeBackdrop variant="section" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-[240px_1fr] gap-10">
            {/* Left: Sticky Years Column */}
            <aside className="hidden md:block sticky top-[96px] h-fit self-start">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm uppercase text-muted-foreground tracking-wider mb-4">
                  Timeline
                </h3>
                {historyMilestones.map((m, i) => (
                  <div
                    key={m.period}
                    className={`py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer select-none ${
                      activeIdx === i ? "bg-primary/5 scale-100" : "hover:bg-primary/5"
                    }`}
                    data-index={i}
                    onClick={() => {
                      const el = cardRefs.current[i];
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    <div className="text-sm font-semibold text-foreground">{m.period}</div>
                    <div className="text-xs text-muted-foreground">{m.title}</div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right: Cards */}
            <div>
              <div className="flex flex-col gap-12">
                {historyMilestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  return (
                    <div
                      key={milestone.period}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      data-index={idx}
                      className="relative"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.995 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-strong border border-border/40 p-6 md:p-10 rounded-3xl shadow-glass overflow-hidden"
                      >
                        <div className="md:flex md:items-start md:gap-8">
                          <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  {milestone.period}
                                </div>
                                <div className="font-display text-xl text-foreground font-semibold">
                                  {milestone.title}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="mb-4">
                              <div className="w-24 h-1 rounded-full bg-[#2A4580] my-2" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 items-start">
                              <div>
                                <p className="text-sm font-light text-muted-foreground text-pretty whitespace-pre-line">
                                  {milestone.desc}
                                </p>
                              </div>

                              <div className="w-full">
                                {milestone.images ? (
                                  <ImageSlider images={milestone.images} />
                                ) : (
                                  <div className="relative overflow-hidden rounded-2xl border bg-white p-2 shadow-sm aspect-video">
                                    <img
                                      src={milestone.image}
                                      alt={milestone.title}
                                      className="w-full h-full object-cover rounded-xl pointer-events-none"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
