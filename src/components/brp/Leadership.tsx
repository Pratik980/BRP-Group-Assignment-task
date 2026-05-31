import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { executiveTeam, siteMeta } from "@/data/brp-site-content";

import BrpSir480 from "@/assets/optimized/Brp-sir-image-480.webp";
import BrpSir768 from "@/assets/optimized/Brp-sir-image-768.webp";
import BrpSir from "@/assets/optimized/Brp-sir-image.webp";

import Ubin480 from "@/assets/optimized/Ubin-Pokherel-480.webp";
import Ubin768 from "@/assets/optimized/Ubin-Pokherel-768.webp";
import Ubin1200 from "@/assets/optimized/Ubin-Pokherel-1200.webp";

import Bidushi480 from "@/assets/optimized/Bidushi-Pandey-Pokherel-480.webp";
import Bidushi768 from "@/assets/optimized/Bidushi-Pandey-Pokherel-768.webp";
import Bidushi1200 from "@/assets/optimized/Bidushi-Pandey-Pokherel-1200.webp";

const leaderImages = {
  babuRam: { src: BrpSir, src480: BrpSir480, src768: BrpSir768 },
  ubin: { src: Ubin1200, src480: Ubin480, src768: Ubin768 },
  bidushi: { src: Bidushi1200, src480: Bidushi480, src768: Bidushi768 },
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
          <h2 className="font-display text-4xl tracking-tight text-primary md:text-5xl">{title}</h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
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
                  src={leaderImages[leader.imageKey].src}
                  srcSet={`${leaderImages[leader.imageKey].src480} 480w, ${leaderImages[leader.imageKey].src768} 768w, ${leaderImages[leader.imageKey].src} 1200w`}
                  sizes="(max-width: 768px) 100vw, 33vw"
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
