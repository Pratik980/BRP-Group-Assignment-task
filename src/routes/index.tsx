import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Hero } from "@/components/brp/Hero";
import { VenturesEcosystem } from "@/components/brp/VenturesEcosystem";
import { StoryPanels } from "@/components/brp/StoryPanels";
import { Values } from "@/components/brp/Values";
import { CTA } from "@/components/brp/CTA";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { ScrollTickers } from "@/components/brp/ScrollTickers";
import { CorporateGallery } from "@/components/brp/CorporateGallery";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Target, Compass } from "lucide-react";
import { aboutUs } from "@/data/brp-site-content";

export const Route = createFileRoute("/")({
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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-16 sm:py-24">
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Header block */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-3 w-3 text-primary shrink-0 mr-1.5" />
                About Us
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
                Who We <span className="text-gradient italic">Are</span>
              </h2>
            </motion.div>
          </div>

          {/* Content block */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong border border-border/40 p-8 md:p-10 rounded-3xl shadow-glass flex flex-col justify-center h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="space-y-4 relative z-10 text-base sm:text-lg font-light text-muted-foreground leading-relaxed text-pretty">
                {aboutUs.communityIntro.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: 0.25 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
                className="mt-8 relative z-10"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Learn more about our journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong border border-border/40 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">
                {aboutUs.vision.title}
              </h3>
            </div>
            <p className="text-sm font-light text-muted-foreground leading-relaxed text-pretty">
              {aboutUs.vision.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong border border-border/40 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">
                {aboutUs.mission.title}
              </h3>
            </div>
            <p className="text-sm font-light text-muted-foreground leading-relaxed text-pretty">
              {aboutUs.mission.body}
            </p>
          </motion.div>
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

      {/* ── Who We Are (IntroSection) track ── */}
      {/* On desktop: slides up over Hero, then sticks */}
      <div className="intro-parallax-track">
        <div className="intro-parallax-sticky">
          <IntroSection />
        </div>
      </div>

      {/* ── Heritage & Impact and remaining sections ── */}
      {/* On desktop: slides up over Who We Are, then scrolls normally */}
      <div className="intro-slide-panel relative overflow-hidden">
        <ThemeBackdrop variant="page" className="opacity-60" />
        <div className="relative z-10">
        <ScrollTickers />
        <VenturesEcosystem />
        <StoryPanels />
        <CorporateGallery />
        <Values />
        <CTA />
        <Footer />
        </div>
      </div>
    </main>
  );
}

export default Index;
