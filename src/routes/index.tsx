import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Nav } from "@/components/brp/Nav";
import { Hero } from "@/components/brp/Hero";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { LazyImage } from "@/components/ui/lazy-image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Target, Compass } from "lucide-react";
import { resolveCommunityIntro, resolveVisionMission } from "@/lib/cms/about-content";
import { prefetchPublicHeroContent, usePublicAboutSections } from "@/hooks/usePublicContent";
import aboutSideImg from "@/assets/optimized/Brp-Group-1200.webp";
import { splitSlideIn, slideEase } from "@/lib/alternate-slide";

const ScrollTickers = lazy(() =>
  import("@/components/brp/ScrollTickers").then((m) => ({ default: m.ScrollTickers })),
);
const VenturesEcosystem = lazy(() =>
  import("@/components/brp/VenturesEcosystem").then((m) => ({ default: m.VenturesEcosystem })),
);
const StoryPanels = lazy(() =>
  import("@/components/brp/StoryPanels").then((m) => ({ default: m.StoryPanels })),
);
const CorporateGallery = lazy(() =>
  import("@/components/brp/CorporateGallery").then((m) => ({ default: m.CorporateGallery })),
);
const Values = lazy(() => import("@/components/brp/Values").then((m) => ({ default: m.Values })));
const CTA = lazy(() => import("@/components/brp/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("@/components/brp/Footer").then((m) => ({ default: m.Footer })));

function DeferredSection({ children, minHeight = "12rem" }: { children: React.ReactNode; minHeight?: string }) {
  return (
    <Suspense fallback={<div aria-hidden className="w-full" style={{ minHeight }} />}>
      {children}
    </Suspense>
  );
}

export const Route = createFileRoute("/")({
  loader: ({ context }) => prefetchPublicHeroContent(context.queryClient),
  head: () => ({
    meta: [
      { title: "BRP Group — Building Nepal's Future Through Diversified Ventures" },
      {
        name: "description",
        content:
          "Founded in 2019, BRP Group is focused on tech, real estate, education, and healthcare — combining the real and digital worlds across Nepal.",
      },
      { property: "og:title", content: "BRP Group — A diversified venture ecosystem" },
      {
        property: "og:description",
        content:
          "An interconnected network of ventures driving innovation and growth across Nepal since 2019.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function IntroSection() {
  const { data: aboutSections } = usePublicAboutSections();
  const communityIntro = resolveCommunityIntro(aboutSections);
  const { vision, mission } = resolveVisionMission(aboutSections);

  return (
    <section className="intro-section relative overflow-x-hidden bg-gradient-to-b from-background via-secondary to-background py-6 sm:py-10 lg:py-12">
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 brp-container">
        <div className="grid gap-8 lg:gap-10 xl:gap-12 lg:grid-cols-12 items-start lg:items-center">
          {/* Header block */}
          <div className="lg:col-span-5">
            <motion.div {...splitSlideIn(0, "visual", { margin: "-60px", duration: 0.85 })}>
              <div className="glass mb-4 lg:mb-5 inline-flex rounded-full px-3 py-1 lg:px-4 lg:py-1.5 text-[10px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-3 w-3 text-primary shrink-0 mr-1.5" />
                About Us
              </div>
              <h2 className="font-display text-2xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-foreground">
                Who We <span className="text-gradient italic">Are</span>
              </h2>
            </motion.div>

            <motion.div
              {...splitSlideIn(0, "visual", { margin: "-60px", duration: 0.9 })}
              transition={{ duration: 0.9, ease: slideEase, delay: 0.1 }}
              className="mt-6 lg:mt-8"
            >
              <div
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/30 bg-card/60 p-3 sm:p-4 shadow-sm"
                style={{ boxShadow: "-14px 14px 0 0 rgba(42, 69, 128, 0.07)" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-muted/10">
                  <LazyImage
                    src={aboutSideImg}
                    alt="BRP Group — building Nepal's future through diversified ventures"
                    className="w-full h-auto max-h-[200px] sm:max-h-[260px] lg:max-h-[300px] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content block */}
          <div className="lg:col-span-7">
            <motion.div
              {...splitSlideIn(0, "content", { margin: "-60px", duration: 0.9 })}
              transition={{ duration: 0.9, ease: slideEase, delay: 0.08 }}
              className="glass-strong border border-border/40 p-5 sm:p-7 md:p-8 lg:p-9 rounded-2xl sm:rounded-3xl shadow-glass flex flex-col justify-center h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="space-y-3 sm:space-y-4 relative z-10 text-sm sm:text-base lg:text-lg font-light text-muted-foreground leading-relaxed text-pretty">
                {communityIntro.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.25 + idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 sm:mt-6 relative z-10"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Learn more about our journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission — avoid opacity-only whileInView; covered by parallax on short laptops */}
        <div className="mt-8 sm:mt-12 lg:mt-14 pt-6 sm:pt-10 border-t border-border/30">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <div className="glass-strong border border-border/40 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-foreground font-bold">
                  {vision.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed text-pretty">
                {vision.body}
              </p>
            </div>

            <div className="glass-strong border border-border/40 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-foreground font-bold">
                  {mission.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed text-pretty">
                {mission.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen text-foreground">
      <Nav />

      {/*
        IME-style parallax: Hero sticks while content slides up over it.
        
        Structure:
        1. hero-track (height: 200vh) — creates extra scroll runway
        2. Hero (sticky top:0, h:screen) — stays put while we scroll through the track
        3. content-panel (relative z-10, solid bg) — sits right after the track,
           pulled up by 100vh via negative margin so it enters the viewport
           while the Hero is still stuck. The solid background fully covers
           the Hero as it slides up.
      */}

      {/* ── Hero track ── */}
      <div className="hero-parallax-track">
        <div className="hero-parallax-sticky">
          <Hero />
        </div>
      </div>

      {/* ── Who We Are (IntroSection) ── */}
      <div className="relative z-5 -mt-[100svh]">
        <IntroSection />
      </div>

      {/* ── Heritage & Impact and remaining sections ── */}
      <div className="relative z-10 bg-background">
        <ThemeBackdrop variant="page" className="opacity-60" />
        <div className="relative z-10">
          <DeferredSection minHeight="4rem">
            <ScrollTickers />
          </DeferredSection>
          <DeferredSection minHeight="28rem">
            <VenturesEcosystem />
          </DeferredSection>
          <DeferredSection minHeight="24rem">
            <StoryPanels />
          </DeferredSection>
          <DeferredSection minHeight="20rem">
            <CorporateGallery />
          </DeferredSection>
          <DeferredSection minHeight="16rem">
            <Values />
          </DeferredSection>
          <DeferredSection minHeight="14rem">
            <CTA />
          </DeferredSection>
          <DeferredSection minHeight="10rem">
            <Footer />
          </DeferredSection>
        </div>
      </div>
    </main>
  );
}

export default Index;
