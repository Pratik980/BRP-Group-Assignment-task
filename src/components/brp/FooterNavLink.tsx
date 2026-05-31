import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { scrollToSection } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type AppRoute = "/" | "/about" | "/ventures" | "/history";

type FooterNavLinkProps = {
  to: AppRoute;
  hash?: string;
  className?: string;
  children: React.ReactNode;
};

export function FooterNavLink({ to, hash, className, children }: FooterNavLinkProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Link
      to={to}
      hash={hash}
      className={cn("hover:text-primary transition-colors", className)}
      onClick={() => {
        if (hash && pathname === to) {
          scrollToSection(hash);
        }
      }}
    >
      {children}
    </Link>
  );
}

/** Scroll to hash after route change (footer / cross-page anchors). */
export function useHashScroll() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const timer = window.setTimeout(() => scrollToSection(id), 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
}
