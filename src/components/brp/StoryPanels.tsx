import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Heart } from "lucide-react";

import legacyImg from "@/assets/optimized/legacy-image-1200.webp";
import childrenImg from "@/assets/optimized/childrents-1200.webp";
import { resolveCommunityStory, resolveLegacyStory } from "@/lib/cms/about-content";
import { usePublicAboutSections } from "@/hooks/usePublicContent";
import { splitSlideIn, slideEase } from "@/lib/alternate-slide";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

export function StoryPanels() {
  const { data: aboutSections } = usePublicAboutSections();
  const legacy = resolveLegacyStory(aboutSections);
  const community = resolveCommunityStory(aboutSections);

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-24 md:py-32"
    >
      <ThemeBackdrop variant="section" />

      <div className="relative z-10 brp-container flex flex-col gap-24 md:gap-36">
        {/* Section 1: Our Legacy */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Text block */}
          <motion.div
            {...splitSlideIn(1, "content", { margin: "-100px" })}
            transition={{ duration: 0.85, ease: slideEase, delay: 0.06 }}
            className="lg:col-span-6 flex flex-col justify-center text-center md:text-left order-last lg:order-first"
          >
            <div className="glass mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary self-center md:self-start shadow-sm">
              <Landmark className="h-3 w-3 text-primary shrink-0 mr-1.5" />
              {legacy.label}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl leading-tight tracking-tight text-foreground mb-6">
              Compounding governance, <span className="text-gradient italic">ethical growth.</span>
            </h2>
            <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed text-pretty md:text-base xl:text-lg">
              {legacy.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            {/* Divider Line */}
            <div className="bg-[#2A4580] w-20 h-1.5 rounded-full my-6 mx-auto md:mx-0 shadow-sm" />
            <div className="mt-2">
              <Link
                to="/history"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 shadow-glass"
              >
                Read More Timeline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Visual block with custom offset shadow */}
          <motion.div
            {...splitSlideIn(1, "visual", { margin: "-100px" })}
            className="lg:col-span-6 flex items-center justify-center select-none z-10"
          >
            <div
              className="relative overflow-hidden rounded-3xl border bg-white p-2 shadow-sm max-w-md w-full aspect-[4/3] flex items-center justify-center"
              style={{
                border: "2.5px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "-18px 18px 0px 0px rgba(42, 69, 128, 0.08)",
              }}
            >
              <img
                src={legacyImg}
                alt="BRP Legacy Portrait"
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 2: Our Community */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Visual block with custom offset shadow (reversed) */}
          <motion.div
            {...splitSlideIn(0, "visual", { margin: "-100px" })}
            className="lg:col-span-6 flex items-center justify-center select-none z-10"
          >
            <div
              className="relative overflow-hidden rounded-3xl border bg-white p-2 shadow-sm max-w-md w-full aspect-[4/3] flex items-center justify-center"
              style={{
                border: "2.5px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "18px 18px 0px 0px rgba(42, 69, 128, 0.08)",
              }}
            >
              <img
                src={childrenImg}
                alt="BRP Community Children"
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Text block */}
          <motion.div
            {...splitSlideIn(0, "content", { margin: "-100px" })}
            transition={{ duration: 0.85, ease: slideEase, delay: 0.06 }}
            className="lg:col-span-6 flex flex-col justify-center text-center md:text-left"
          >
            <div className="glass mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary self-center md:self-start shadow-sm">
              <Heart className="h-3 w-3 text-primary shrink-0 mr-1.5" />
              {community.label}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl leading-tight tracking-tight text-foreground mb-6">
              Empowering through health and <span className="text-gradient italic">education.</span>
            </h2>
            <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed text-pretty">
              {community.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            {/* Divider Line */}
            <div className="bg-[#2A4580] w-20 h-1.5 rounded-full my-6 mx-auto md:mx-0 shadow-sm" />
            <div className="mt-2">
              <Link
                to="/history"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 shadow-glass"
              >
                Read More Timeline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
