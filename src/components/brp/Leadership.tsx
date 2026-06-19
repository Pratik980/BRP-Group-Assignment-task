import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { siteMeta } from "@/data/brp-site-content";
import { usePublicExecutiveTeam, usePublicSiteMeta } from "@/hooks/usePublicContent";
import { LazyImage } from "@/components/ui/lazy-image";

type LeadershipProps = {
  title?: string;
};

export function Leadership({ title = "Our Executive Team" }: LeadershipProps) {
  const { data: leaders = [], isLoading } = usePublicExecutiveTeam();
  const { data: siteMetaLive = siteMeta } = usePublicSiteMeta();

  return (
    <section id="leadership" className="relative overflow-hidden py-24 md:py-32">
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 brp-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-display text-4xl tracking-tight text-primary md:text-5xl">{title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">Leadership — up to 3 executives</p>
        </motion.div>

        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">Loading team…</p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {leaders.map((leader, i) => (
              <motion.article
                key={leader.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-[400px]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted shadow-sm sm:aspect-[265/300] lg:aspect-[400/450]">
                  {leader.photo_url ? (
                    <LazyImage
                      src={leader.photo_url}
                      alt={leader.full_name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No photo
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-4 pt-16 sm:px-4 sm:pb-6 sm:pt-20">
                    <h3 className="text-left text-[15px] font-semibold leading-snug text-white sm:text-base">
                      {leader.full_name}
                    </h3>
                    <p className="mt-1 text-left text-sm font-light text-white/90 sm:text-base">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {leader.linkedin_url || leader.role === "Chairman" ? (
                  <div className="mt-3 flex justify-center gap-2">
                    {(leader.linkedin_url || siteMetaLive.linkedIn) && (
                      <a
                        href={leader.linkedin_url || siteMetaLive.linkedIn}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label={`${leader.full_name} LinkedIn`}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {leader.role === "Chairman" && (
                      <a
                        href="mailto:ubin@brpgroup.com.np"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label={`${leader.full_name} Email`}
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
