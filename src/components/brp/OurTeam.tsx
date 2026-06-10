import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { alternateSlideIn, slideEase } from "@/lib/alternate-slide";
import { ourTeam } from "@/data/brp-site-content";

export function OurTeam() {
  return (
    <section id="our-team" className="relative overflow-hidden border-t border-border/30 py-16 md:py-20">
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: slideEase }}
          className="text-center"
        >
          <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            <Users className="h-3.5 w-3.5" />
            {ourTeam.title}
          </div>
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
            {ourTeam.title}
          </h2>
        </motion.div>

        {ourTeam.members.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {ourTeam.members.map((member, i) => (
              <motion.article
                key={member.name}
                {...alternateSlideIn(i, { margin: "-40px", duration: 0.75 })}
                transition={{ duration: 0.75, ease: slideEase, delay: i * 0.05 }}
                className="glass-strong rounded-2xl border border-border/40 px-5 py-4 shadow-sm transition-shadow duration-300 hover:shadow-glass"
              >
                <h3 className="text-sm font-semibold leading-snug text-foreground md:text-base">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-xs font-light leading-relaxed text-muted-foreground md:text-sm">
                  {member.role}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
