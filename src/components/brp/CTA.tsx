import { motion } from "framer-motion";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";
import { siteMeta } from "@/data/brp-site-content";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.9_0.08_230/0.6),transparent_70%)]" />

      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass mb-8 inline-flex rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
                Get in Touch
              </div>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Building <span className="text-gradient italic">what comes next.</span>
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground">
                Whether you are a founder seeking capital, a prospective business partner, or
                looking to join our growing team — we'd love to hear from you.
              </p>

              {/* Info Cards */}
              <div className="mt-10 space-y-4">
                <div className="glass-strong flex items-center gap-4 rounded-2xl p-4 shadow-glass">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Email us
                    </div>
                    <a
                      href={`mailto:${siteMeta.email}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {siteMeta.email}
                    </a>
                  </div>
                </div>

                <div className="glass-strong flex items-center gap-4 rounded-2xl p-4 shadow-glass">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Call office
                    </div>
                    <a
                      href={`tel:${siteMeta.phone.replace(/\s/g, "")}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {siteMeta.phone}
                    </a>
                  </div>
                </div>

                <div className="glass-strong flex items-center gap-4 rounded-2xl p-4 shadow-glass">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Headquarters
                    </div>
                    <div className="text-sm font-medium text-foreground">{siteMeta.headquarters}</div>
                  </div>
                </div>
              </div>

              {/* Map: office location */}
              <div className="mt-8">
                <div
                  role="region"
                  aria-label="BRP Group office location map"
                  className="rounded-2xl overflow-hidden border bg-white/5"
                >
                  <iframe
                    title="BRP Group Office Location"
                    src={`https://www.google.com/maps?q=27.723054,85.3303128&z=17&output=embed`}
                    className="w-full h-56 md:h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="mt-3 text-sm">
                <a
                  href="https://www.google.com/maps/place/BRP+Group/@27.7230754,85.327657,16.95z/data=!4m6!3m5!1s0x39eb19057fa77a2b:0x766ba8ecfbddab60!8m2!3d27.723054!4d85.3303128!16s%2Fg%2F11nfpklz9b?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>

              {/* Social Channels */}
              <div className="mt-10">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Follow BRP Group
                </div>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: siteMeta.linkedIn, label: "LinkedIn" },
                    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
