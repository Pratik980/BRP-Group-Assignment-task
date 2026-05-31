import logo from "@/assets/brp/Brp-Nav-logo.webp";
import { ArrowUp, Mail, Linkedin, Facebook, Twitter, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { ventures } from "@/data/ventures";
import { siteMeta } from "@/data/brp-site-content";
import { FooterNavLink, useHashScroll } from "@/components/brp/FooterNavLink";

const exploreLinks = [
  { label: "Home", to: "/" as const },
  { label: "Ventures", to: "/ventures" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Contact", to: "/" as const, hash: "contact" },
] as const;

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

  return (
    <footer className="relative border-t border-border/40 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-6 lg:gap-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3" aria-label="BRP Group home">
              <img src={logo} alt="BRP Group" className="h-10 w-auto object-contain" />
              <div>
                <div className="text-sm font-semibold tracking-[0.18em] text-foreground">
                  BRP GROUP
                </div>
                <div className="text-xs font-light text-muted-foreground">
                  Diversified ventures · Since {siteMeta.foundedYear}
                </div>
              </div>
            </Link>
            <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
              A business enterprise focused on technology, real estate, education, and healthcare —
              combining the digital and physical worlds to transform daily life.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { icon: Linkedin, href: siteMeta.linkedIn, label: "LinkedIn" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm font-light text-muted-foreground">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <FooterNavLink to={link.to} hash={"hash" in link ? link.hash : undefined}>
                    {link.label}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Ventures
            </div>
            <ul className="space-y-2.5 text-sm font-light text-muted-foreground">
              {ventures.map((venture) => (
                <li key={venture.name}>
                  <FooterNavLink to="/ventures" hash={`venture-${venture.slug}`}>
                    {venture.name}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Newsletter
            </div>
            <p className="mb-4 text-xs font-light leading-relaxed text-muted-foreground">
              Subscribe to stay updated with BRP Group's corporate insights, announcements, and
              venture progress.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative grow">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-border/60 bg-background/60 py-2 pr-4 pl-10 text-xs text-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.1)]"
                />
              </div>
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-all hover:opacity-90 active:scale-95"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              <a
                href={`mailto:${siteMeta.email}`}
                className="hover:text-primary transition-colors"
              >
                {siteMeta.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 text-xs font-light text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} BRP Group. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <div className="hidden text-[10px] tracking-[0.2em] uppercase sm:block">
              Building what comes next
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex cursor-pointer items-center gap-2 text-[10px] tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary transition-all group-hover:bg-primary group-hover:text-white">
                <ArrowUp className="h-3 w-3" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
