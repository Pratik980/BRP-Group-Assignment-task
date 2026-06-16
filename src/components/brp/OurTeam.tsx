import { motion } from "framer-motion";
import { UserRound, Users } from "lucide-react";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { alternateSlideIn, slideEase } from "@/lib/alternate-slide";
import { usePublicOurTeam } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";

function TeamMemberCard({
  name,
  role,
  photoUrl,
}: {
  name: string;
  role: string;
  photoUrl: string | null;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="group relative mx-auto w-full max-w-[17rem]">
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.35rem] border border-border/50 bg-card/90",
          "shadow-glass backdrop-blur-xl transition-all duration-500",
          "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-float",
        )}
      >
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-accent/60" />

        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/12 blur-2xl transition-opacity duration-500 group-hover:bg-primary/18"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.97_0.02_275/0.5),transparent_55%)]"
        />

        <div className="relative flex flex-col items-center px-5 pb-6 pt-7 text-center">
          {/* Avatar with gradient ring */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-primary/40 via-primary/15 to-transparent blur-md"
            />
            <div className="relative rounded-full bg-gradient-to-br from-primary/50 via-primary/25 to-accent/30 p-[3px] shadow-sm">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-card ring-2 ring-background sm:h-[6.5rem] sm:w-[6.5rem]">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                ) : initials ? (
                  <span className="font-display text-2xl text-primary/80">{initials}</span>
                ) : (
                  <UserRound className="h-10 w-10 text-muted-foreground/50" aria-hidden />
                )}
              </div>
            </div>
          </div>

          <h3 className="font-display mt-5 line-clamp-2 text-base leading-snug tracking-tight text-foreground">
            {name}
          </h3>

          <span className="mt-3 inline-flex max-w-full items-center rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="line-clamp-1">{role}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function OurTeam() {
  const { data: members = [], isLoading } = usePublicOurTeam();

  return (
    <section
      id="our-team"
      className="relative overflow-hidden border-t border-border/30 py-16 md:py-20"
    >
      <ThemeBackdrop variant="subtle" />
      <div className="relative z-10 brp-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: slideEase }}
          className="text-center"
        >
          <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            <Users className="h-3.5 w-3.5" />
            Our Team
          </div>
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl xl:text-5xl">
            Our Team
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Staff and team members across BRP Group ventures.
          </p>
        </motion.div>

        {isLoading ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">Loading team…</p>
        ) : members.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Team members will appear here once added in the admin panel.
          </p>
        ) : (
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 md:grid-cols-3">
            {members.map((member, i) => (
              <motion.article
                key={member.id}
                {...alternateSlideIn(i, { margin: "-40px", duration: 0.75 })}
                transition={{ duration: 0.75, ease: slideEase, delay: i * 0.05 }}
              >
                <TeamMemberCard
                  name={member.full_name}
                  role={member.role}
                  photoUrl={member.photo_url}
                />
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
