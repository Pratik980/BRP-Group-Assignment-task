import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { executiveTeam, siteMeta } from "@/data/brp-site-content";

import babuRamImg from "@/assets/brp/Brp-sir-image.png";
import ubinImg from "@/assets/brp/Ubin-Pokherel.webp";
import bidushiImg from "@/assets/brp/Bidushi-Pandey-Pokherel.webp";

const leaderImages = {
  babuRam: babuRamImg,
  ubin: ubinImg,
  bidushi: bidushiImg,
} as const;

type LeadershipProps = {
  title?: string;
};

export function Leadership({ title = "Our Executive Team" }: LeadershipProps) {
  return (
    <section id="leadership" className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-display text-4xl tracking-tight text-primary md:text-5xl">
            {title}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
          {executiveTeam.map((leader, i) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[400px]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted shadow-sm sm:aspect-[265/300] lg:aspect-[400/450]">
                <img
                  src={leaderImages[leader.imageKey]}
                  alt={leader.name}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-4 pt-16 sm:px-4 sm:pb-6 sm:pt-20">
                  <h3 className="text-left text-[15px] font-semibold leading-snug text-white sm:text-base">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-left text-sm font-light text-white/90 sm:text-base">
                    {leader.role}
                  </p>
                </div>
              </div>

              {leader.role === "Chairman" && (
                <div className="mt-3 flex justify-center gap-2">
                  <a
                    href={siteMeta.linkedIn}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={`${leader.name} LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="mailto:ubin@brpgroup.com.np"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={`${leader.name} Email`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
