import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { Leadership } from "@/components/brp/Leadership";
import { OurTeam } from "@/components/brp/OurTeam";
import { Values } from "@/components/brp/Values";
import { VisionMissionSection } from "@/components/brp/VisionMissionSection";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { aboutUs, siteMeta } from "@/data/brp-site-content";
import { resolveCommunityIntro, resolveCommunityStory } from "@/lib/cms/about-content";
import { usePublicAboutSections, usePublicSiteMeta } from "@/hooks/usePublicContent";

import aboutSideImg from "@/assets/optimized/Brp-Group-1200.webp";
import communityImg from "@/assets/optimized/childrents-1200.webp";

const ease = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BRP Group — Vision, Mission & Leadership" },
      {
        name: "description",
        content:
          "Learn about BRP Group's vision, mission, and executive team — from late Dr. Babu Ram Pokharel to Chairman Dr. Ubin Pokharel and Executive Director Ms. Bidushi Pandey Pokharel.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: aboutSections } = usePublicAboutSections();
  const { data: siteMetaLive = siteMeta } = usePublicSiteMeta();
  const communityIntro = resolveCommunityIntro(aboutSections);
  const communityStory = resolveCommunityStory(aboutSections);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
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
        {/* Hero — text left, photo right (no full-width background) */}
        <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-secondary/50 via-background to-background pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24">
          <ThemeBackdrop variant="hero" />
          <div className="relative z-10 brp-container">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                  Who We Are
                </span>
                <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
                  {aboutUs.heroTitle}
                </h1>
                <div className="mt-6 space-y-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base xl:text-lg">
                  {communityIntro.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease }}
                className="relative"
              >
                <div className="overflow-hidden rounded-3xl border border-border/30 shadow-sm bg-muted/10 flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={aboutSideImg}
                    alt="BRP Group"
                    className="w-full h-auto max-h-[480px] object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <VisionMissionSection />

        {/* Community */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <ThemeBackdrop variant="section" />
          <div className="relative z-10 brp-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease }}
              className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
            >
              <span className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Heart className="h-3.5 w-3.5" />
                Our Community
              </span>
              <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
                Community impact rooted in <span className="text-gradient italic">legacy.</span>
              </h2>
            </motion.div>

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="overflow-hidden rounded-3xl shadow-glass lg:order-2">
                <img
                  src={communityImg}
                  alt="BRP Group community initiatives"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="lg:order-1">
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                  {communityStory.paragraphs[0]}
                </p>
                <Link
                  to="/history"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Explore our history
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Leadership title={aboutUs.executiveTeamTitle} />

        <OurTeam />

        <Values />

        <section className="relative overflow-hidden border-t border-border/30 py-12">
          <ThemeBackdrop variant="subtle" />
          <div className="relative z-10 brp-container text-center">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Get in touch
            </div>
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl xl:text-6xl">
              Connect with <span className="text-gradient italic">BRP Group.</span>
            </h2>
            <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 text-sm text-muted-foreground sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-1">
              <span>{siteMetaLive.headquarters}</span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <a href={`mailto:${siteMetaLive.email}`} className="text-primary hover:underline">
                {siteMetaLive.email}
              </a>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={siteMetaLive.linkedIn}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
            </div>
            <Link
              to="/"
              hash="contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Contact BRP Group
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
