import logo from "@/assets/optimized/Brp-Nav-logo.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "Ventures", to: "/ventures" },
  { label: "About Us", to: "/about" },
  { label: "History", to: "/history" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-2rem))]">
        <nav
          className={`rounded-full px-5 py-2.5 md:px-6 md:py-3 flex items-center justify-between transition-colors duration-500 h-14 md:h-16 ${
            scrolled
              ? "glass-strong shadow-float"
              : "bg-white/30 backdrop-blur-md border border-white/40"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="BRP Group home"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              src={logo as string}
              alt="BRP Group"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="relative py-1 transition-colors duration-300"
                  onClick={(e) => {
                    if (link.to === "/" && window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              hash="contact"
              className="hidden sm:inline-flex rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Connect
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md md:hidden"
            >
              <div className="glass-strong rounded-3xl p-6 shadow-float">
                <ul className="space-y-1">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                    >
                      <Link
                        to={link.to}
                        onClick={(e) => {
                          closeMobile();
                          if (link.to === "/" && window.location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base transition-all"
                      >
                        {({ isActive }) => (
                          <span
                            className={
                              isActive
                                ? "bg-foreground text-background font-medium w-full px-4 py-2 rounded-xl text-center"
                                : "text-foreground hover:bg-foreground/5 w-full px-4 py-2 rounded-xl text-center"
                            }
                          >
                            {link.label}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-border/40 pt-4">
                  <Link
                    to="/"
                    hash="contact"
                    onClick={closeMobile}
                    className="flex w-full items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
