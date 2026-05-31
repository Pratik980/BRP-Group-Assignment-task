import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Hero } from "@/components/brp/Hero";
import { VenturesEcosystem } from "@/components/brp/VenturesEcosystem";
import { StoryPanels } from "@/components/brp/StoryPanels";
import { Values } from "@/components/brp/Values";
import { CTA } from "@/components/brp/CTA";
import { Footer } from "@/components/brp/Footer";
import { ScrollTickers } from "@/components/brp/ScrollTickers";
import { CorporateGallery } from "@/components/brp/CorporateGallery";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import { valueStatements } from "@/data/brp-site-content";

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
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.95_0.02_240/0.5),transparent_60%)] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Header block */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass mb-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-3 w-3 text-primary shrink-0 mr-1.5" />
                Value Statements
              </div>
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-foreground">
                Technology <br />
                with <span className="text-gradient italic">purpose.</span>
              </h2>
            </motion.div>
          </div>

          {/* Staggered Content blocks */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-strong border border-border/40 p-8 rounded-3xl shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3 font-semibold">
                  Stakeholder Success
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed text-pretty">
                  {valueStatements.left}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-strong border border-border/40 p-8 rounded-3xl shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3 font-semibold">
                  Digital Integration
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed text-pretty">
                  {valueStatements.right}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <IntroSection />
      <ScrollTickers />
      <VenturesEcosystem />
      <StoryPanels />
      <CorporateGallery />
      <Values />
      <CTA />
      <Footer />
    </main>
  );
}

export default Index;
