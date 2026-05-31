import logo from "@/assets/optimized/Brp-Nav-logo.webp";
import { ArrowUp, Mail, Linkedin, Facebook, Instagram, Send, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { ventures } from "@/data/ventures";
import { siteMeta } from "@/data/brp-site-content";
import { FooterNavLink, useHashScroll } from "@/components/brp/FooterNavLink";
import { cn } from "@/lib/utils";

const exploreLinks = [
  { label: "Home", to: "/" as const },
  { label: "Ventures", to: "/ventures" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Contact", to: "/" as const, hash: "contact" },
] as const;

const socialLinks = [
  { icon: Linkedin, href: siteMeta.linkedIn, label: "LinkedIn" },
  { icon: Facebook, href: siteMeta.facebook, label: "Facebook" },
  { icon: Instagram, href: siteMeta.instagram, label: "Instagram" },
] as const;

function FooterHeading({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h3
      id={id}
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function SocialRow({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "flex items-center justify-center rounded-full border border-border/50 bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary",
              compact ? "h-9 w-9" : "h-11 w-11",
            )}
            aria-label={item.label}
          >
            <Icon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
          </a>
        );
      })}
    </div>
  );
}

function NewsletterBlock({
  email,
  setEmail,
  onSubmit,
  headingId,
  compact,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  headingId?: string;
  compact?: boolean;
}) {
  return (
    <>
      <FooterHeading id={headingId}>Newsletter</FooterHeading>
      {!compact && (
        <p className="mt-3 text-sm font-light leading-[1.65] text-muted-foreground">
          Corporate insights, announcements, and venture progress — delivered to your inbox.
        </p>
      )}
      <form onSubmit={onSubmit} className={cn("space-y-3", compact ? "mt-3" : "mt-5")}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/55" />
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-border/60 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/45 focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.1)]"
          />
        </div>
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          <Send className="h-4 w-4" />
          Subscribe
        </button>
      </form>
    </>
  );
}

export function Footer() {
  useHashScroll();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to BRP Group updates!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneNumbers = siteMeta.phone.split(",").map((p) => p.trim());

  return (
    <footer className="relative border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* ——— Mobile: clean two-column nav + stacked sections ——— */}
        <div className="space-y-8 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] md:hidden">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link to="/" className="flex flex-col items-center gap-3" aria-label="BRP Group home">
              <img src={logo as string} alt="" className="h-11 w-auto object-contain" />
              <div>
                <div className="text-sm font-semibold tracking-[0.18em] text-foreground">
                  BRP GROUP
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Est. {siteMeta.foundedYear}
                </div>
              </div>
            </Link>
            <SocialRow className="justify-center" compact />
          </div>

          {/* Balanced 2 columns — short link lists only */}
          <div className="grid grid-cols-2 gap-5">
            <section
              className="rounded-2xl border border-border/40 bg-secondary/15 px-4 py-5"
              aria-labelledby="footer-explore-mobile"
            >
              <FooterHeading id="footer-explore-mobile">Explore</FooterHeading>
              <ul className="mt-4 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink
                      to={link.to}
                      hash={"hash" in link ? link.hash : undefined}
                      className="block text-sm font-medium text-foreground active:text-primary"
                    >
                      {link.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="rounded-2xl border border-border/40 bg-secondary/15 px-4 py-5"
              aria-labelledby="footer-ventures-mobile"
            >
              <FooterHeading id="footer-ventures-mobile">Ventures</FooterHeading>
              <ul className="mt-4 space-y-3">
                {ventures.slice(0, 4).map((venture) => (
                  <li key={venture.name}>
                    <FooterNavLink
                      to="/ventures"
                      hash={`venture-${venture.slug}`}
                      className="block text-sm font-medium leading-snug text-foreground active:text-primary"
                    >
                      {venture.name}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
              <FooterNavLink
                to="/ventures"
                className="mt-4 inline-block text-xs font-semibold text-primary"
              >
                View all ventures →
              </FooterNavLink>
            </section>
          </div>

          {/* Contact — full width, easy to scan */}
          <section
            className="rounded-2xl border border-border/40 bg-background px-4 py-5"
            aria-labelledby="footer-contact-mobile"
          >
            <FooterHeading id="footer-contact-mobile">Contact</FooterHeading>
            <div className="mt-4 space-y-4">
              <a
                href={`mailto:${siteMeta.email}`}
                className="flex items-center gap-3 rounded-xl bg-secondary/25 px-3 py-3 active:bg-secondary/40"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 text-sm font-medium text-foreground break-all">
                  {siteMeta.email}
                </span>
              </a>
              <div className="rounded-xl bg-secondary/25 px-3 py-3">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="space-y-1.5">
                    {phoneNumbers.map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s/g, "")}`}
                        className="block text-sm font-medium text-foreground active:text-primary"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-secondary/25 px-3 py-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {siteMeta.headquarters}
                </span>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section
            className="rounded-2xl border border-border/40 bg-secondary/15 px-4 py-5"
            aria-labelledby="footer-newsletter-mobile"
          >
            <NewsletterBlock
              email={email}
              setEmail={setEmail}
              onSubmit={handleSubscribe}
              headingId="footer-newsletter-mobile"
              compact
            />
          </section>
        </div>

        {/* ——— Desktop layout ——— */}
        <div className="hidden gap-12 py-16 md:grid md:grid-cols-6 lg:gap-16 lg:py-20">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3" aria-label="BRP Group home">
              <img src={logo as string} alt="" className="h-10 w-auto object-contain" />
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-[0.18em] text-foreground">
                  BRP GROUP
                </div>
                <div className="text-xs font-light text-muted-foreground">
                  Diversified ventures · Since {siteMeta.foundedYear}
                </div>
              </div>
            </Link>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
              A business enterprise focused on technology, real estate, education, and healthcare —
              combining the digital and physical worlds to transform daily life.
            </p>
            <SocialRow className="mt-6" />
          </div>

          <div className="md:col-span-1">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm font-light text-muted-foreground">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <FooterNavLink
                    to={link.to}
                    hash={"hash" in link ? link.hash : undefined}
                    className="inline-block py-0.5 hover:text-primary"
                  >
                    {link.label}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <FooterHeading>Ventures</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm font-light text-muted-foreground">
              {ventures.map((venture) => (
                <li key={venture.name}>
                  <FooterNavLink
                    to="/ventures"
                    hash={`venture-${venture.slug}`}
                    className="inline-block py-0.5 leading-snug hover:text-primary"
                  >
                    {venture.name}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <NewsletterBlock email={email} setEmail={setEmail} onSubmit={handleSubscribe} />
            <p className="mt-5 text-sm text-muted-foreground">
              <a href={`mailto:${siteMeta.email}`} className="hover:text-primary transition-colors">
                {siteMeta.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6 border-t border-border/40 py-8 text-center md:flex-row md:justify-between md:py-8 md:text-left max-md:mt-2">
          <p className="text-xs font-light leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} BRP Group. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
              Building what comes next
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex min-h-11 items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-secondary transition-colors group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
