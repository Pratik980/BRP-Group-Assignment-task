import { motion } from "framer-motion";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteMeta } from "@/data/brp-site-content";
import { usePublicSiteMeta } from "@/hooks/usePublicContent";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";

const fadeSlide = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CTA() {
  const { data: siteMetaLive = siteMeta } = usePublicSiteMeta();
  const contactItems = [
    {
      icon: Mail,
      label: "Email us",
      value: siteMetaLive.email,
      href: `mailto:${siteMetaLive.email}`,
    },
    {
      icon: Phone,
      label: "Call office",
      value: siteMetaLive.phone,
      href: `tel:${siteMetaLive.phone.split(",")[0].trim().replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Headquarters",
      value: siteMetaLive.headquarters,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/25 to-background py-20 sm:py-28 md:py-36 scroll-mt-[7.5rem]"
    >
      <ThemeBackdrop variant="section" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-[88rem]">
        {/* Centered header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <motion.div
            custom={0}
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Get in Touch
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.5rem]"
          >
            Building{" "}
            <span className="relative inline-block">
              <span className="text-gradient italic">what comes next.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-primary/60 to-accent/40"
              />
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-7 max-w-xl text-base font-light leading-[1.75] text-muted-foreground md:text-lg"
          >
            Whether you are a founder seeking capital, a prospective business partner, or looking to
            join our growing team - we'd love to hear from you.
          </motion.p>
        </div>

        {/* Main content - form left, details right */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
            className="order-1 lg:order-1"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Details Column */}
          <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-2 lg:sticky lg:top-28">
            <div className="grid grid-cols-1 gap-3">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                        {item.value}
                      </div>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    )}
                  </>
                );

                return (
                  <motion.div
                    key={item.label}
                    custom={i + 3}
                    variants={fadeSlide}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-center gap-3.5 rounded-xl border border-border/40 bg-background/50 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-background/80 hover:shadow-[0_8px_30px_oklch(0.55_0.12_275/0.08)]"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3.5 rounded-xl border border-border/40 bg-background/50 px-4 py-3.5 backdrop-blur-sm">
                        {inner}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Map */}
            <motion.div
              custom={6}
              variants={fadeSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="overflow-hidden rounded-2xl border border-border/40 bg-background/40"
            >
              <iframe
                title="B.R.P. Group Office Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.326657%2C27.721054%2C85.333969%2C27.725054&layer=mapnik&marker=27.723054%2C85.3303128"
                className="h-36 sm:h-44 w-full border-0 sm:h-48"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="border-t border-border/30 px-4 py-3">
                <a
                  href="https://www.google.com/maps/place/BRP+Group/@27.7230754,85.327657,16.95z/data=!4m6!3m5!1s0x39eb19057fa77a2b:0x766ba8ecfbddab60!8m2!3d27.723054!4d85.3303128!16s%2Fg%2F11nfpklz9b?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-75"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
