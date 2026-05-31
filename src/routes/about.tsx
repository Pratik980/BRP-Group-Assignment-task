import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { Leadership } from "@/components/brp/Leadership";
import { Values } from "@/components/brp/Values";
import { VisionMissionSection } from "@/components/brp/VisionMissionSection";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { aboutUs, ourHistory, siteMeta } from "@/data/brp-site-content";

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
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* Hero — text left, photo right (no full-width background) */}
      <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-secondary/40 via-background to-background pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                {aboutUs.heroTitle}
              </span>
              <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {aboutUs.heroTitle}
              </h1>
              <div className="mt-6 space-y-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                {aboutUs.communityIntro.map((p) => (
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

      {/* Company overview */}
      <section className="border-b border-border/30 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-base font-light leading-relaxed text-muted-foreground md:text-lg md:leading-8"
          >
            {ourHistory.body}
          </motion.p>
        </div>
      </section>

      <VisionMissionSection />

      {/* Community */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-glass lg:order-2">
              <img
                src={communityImg}
                alt="BRP Group community initiatives"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="lg:order-1">
              <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Heart className="h-3.5 w-3.5" />
                Our Community
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                {aboutUs.communityIntro[1]}
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

      <Values />

      <section className="border-t border-border/30 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Get in touch
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-2 text-sm text-muted-foreground sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-1">
            <span>{siteMeta.headquarters}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <a href={`mailto:${siteMeta.email}`} className="text-primary hover:underline">
              {siteMeta.email}
            </a>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <a
              href={siteMeta.linkedIn}
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
    </main>
  );
}
