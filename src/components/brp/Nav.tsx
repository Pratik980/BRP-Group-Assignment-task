import logo from "@/assets/optimized/BRPGrouplogo.png";
import reddotLogo from "@/assets/optimized/reddot.webp";
import shsLogo from "@/assets/optimized/shs.webp";
import assabetLogo from "@/assets/optimized/Assabet.webp";
import satinLeafLogo from "@/assets/optimized/satin-leaf.webp";
import brpVenturesLogo from "@/assets/optimized/logo-BRP.webp";
import ubVenturesLogo from "@/assets/optimized/uv-ventures.webp";
import brpToursLogo from "@/assets/optimized/Brp-tours-and-travel.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Award,
  Landmark,
  Compass,
  Cpu,
  Building2,
  Plane,
  BookOpen,
  Globe,
  TrendingUp,
  ArrowRight,
  Users,
  Target,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─── Dropdown Data ─── */

const aboutHighlights = [
  {
    icon: Target,
    title: "Mission & Vision",
    desc: "At the forefront of diverse business verticals nationally and globally.",
    category: "Philosophy",
    color: "#3b82f6",
    to: "/about",
  },
  {
    icon: BookOpen,
    title: "Our Story",
    desc: "From modest beginnings to a world-class organization.",
    category: "Heritage",
    color: "#8b5cf6",
    to: "/about",
  },
  {
    icon: Users,
    title: "Leadership",
    desc: "Visionary leadership disrupting Nepal's entrepreneurial ecosystem.",
    category: "Team",
    color: "#10b981",
    to: "/about",
  },
];

const historyHighlights = [
  {
    icon: GraduationCap,
    period: "2040–50 BS",
    title: "Educational Genesis",
    desc: "V.S. Niketan School founded with 7 teachers and 147 students.",
    color: "#ef4444",
  },
  {
    icon: Award,
    period: "2050–60 BS",
    title: "National Honors",
    desc: "Gorkha Dakshina Bahu and Trishakti Patta awarded for social service.",
    color: "#3b82f6",
  },
  {
    icon: Landmark,
    period: "2060–70 BS",
    title: "Institutional Scaling",
    desc: "Best School of Nation award. Parliamentary membership from 2070 BS.",
    color: "#14b8a6",
  },
  {
    icon: Compass,
    period: "2070–80 BS",
    title: "Legacy Transition",
    desc: "Ecosystem-wide growth led by next-generation leadership.",
    color: "#8b5cf6",
  },
];

const ventureHighlights = [
  {
    logo: reddotLogo,
    title: "Reddot",
    desc: "Digital learning & educational resource platform.",
    category: "Education",
    color: "#ef4444",
  },
  {
    logo: shsLogo,
    title: "Small Heaven School",
    desc: "Holistic foundations & academic excellence since 2062 BS.",
    category: "Education",
    color: "#0ea5e9",
  },
  {
    logo: assabetLogo,
    title: "Assabet Technologies",
    desc: "Enterprise software, data science & automation solutions.",
    category: "Technology",
    color: "#14b8a6",
  },
  {
    logo: satinLeafLogo,
    title: "Satin Leaf Investment",
    desc: "Venture incubation & international capital partnerships.",
    category: "Investments",
    color: "#8b5cf6",
  },
  {
    logo: brpVenturesLogo,
    title: "B.R.P. Ventures",
    desc: "Real estate analysis & property fund management.",
    category: "Real Estate",
    color: "#4f46e5",
  },
  {
    logo: ubVenturesLogo,
    title: "U.B. Ventures",
    desc: "Commercial leasing & structural development holdings.",
    category: "Real Estate",
    color: "#10b981",
  },
  {
    logo: brpToursLogo,
    title: "BRP Tours & Travels",
    desc: "Global & local travel — your preferred agency.",
    category: "Travel",
    color: "#f59e0b",
  },
];

/* ─── Nav Links ─── */

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about", hasDropdown: true },
  { label: "History", to: "/history", hasDropdown: true },
  { label: "Ventures", to: "/ventures", hasDropdown: true },
  { label: "Community", to: "/community" },
  { label: "Career", to: "/career" },
];

/* ─── Dropbar Content: About Us ─── */

function AboutDropbar({ onClose }: { onClose: () => void }) {
  return (
    <div className="dropbar-inner">
      <div className="dropbar-layout">
        {/* Left — Featured intro */}
        <div className="dropbar-featured">
          <div className="dropbar-featured-badge">
            <Users className="h-3.5 w-3.5" />
            <span>Who We Are</span>
          </div>
          <h3 className="dropbar-featured-title">
            BRP <span className="text-gradient italic">Group</span>
          </h3>
          <p className="dropbar-featured-desc">
            BRP Group seeks to create a long-term positive impact on the Nepalese economy and the lives of our citizens.
          </p>
          <Link
            to="/about"
            className="dropbar-featured-link"
            onClick={onClose}
          >
            <span>Learn more</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="dropbar-divider" />

        {/* Right — Grid cards */}
        <div className="dropbar-grid dropbar-grid--ventures">
          {aboutHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                className="dropbar-card"
                onClick={onClose}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div
                  className="dropbar-card-icon"
                  style={{
                    backgroundColor: item.color + "14",
                    color: item.color,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="dropbar-card-body">
                  <div className="dropbar-card-title-row">
                    <h4 className="dropbar-card-title">{item.title}</h4>
                    <span
                      className="dropbar-card-badge"
                      style={{
                        backgroundColor: item.color + "12",
                        color: item.color,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="dropbar-card-desc">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Dropbar Content: History ─── */

function HistoryDropbar({ onClose }: { onClose: () => void }) {
  return (
    <div className="dropbar-inner">
      <div className="dropbar-layout">
        {/* Left — Featured intro */}
        <div className="dropbar-featured">
          <div className="dropbar-featured-badge">
            <Landmark className="h-3.5 w-3.5" />
            <span>Since 2037 BS</span>
          </div>
          <h3 className="dropbar-featured-title">
            Chronicle of <span className="text-gradient italic">Trust</span>
          </h3>
          <p className="dropbar-featured-desc">
            A 45-year narrative of corporate responsibility, educational
            transformation, and compound value creation across Nepal.
          </p>
          <Link
            to="/history"
            className="dropbar-featured-link"
            onClick={onClose}
          >
            <span>Explore full timeline</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="dropbar-divider" />

        {/* Right — Grid cards */}
        <div className="dropbar-grid">
          {historyHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to="/history"
                className="dropbar-card"
                onClick={onClose}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className="dropbar-card-icon"
                  style={{
                    backgroundColor: item.color + "14",
                    color: item.color,
                  }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="dropbar-card-body">
                  <span className="dropbar-card-period">{item.period}</span>
                  <h4 className="dropbar-card-title">{item.title}</h4>
                  <p className="dropbar-card-desc">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Dropbar Content: Ventures ─── */

function VenturesDropbar({ onClose }: { onClose: () => void }) {
  return (
    <div className="dropbar-inner">
      <div className="dropbar-layout">
        {/* Left — Featured intro */}
        <div className="dropbar-featured">
          <div className="dropbar-featured-badge">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>7 Active Ventures</span>
          </div>
          <h3 className="dropbar-featured-title">
            Interconnected <span className="text-gradient italic">Ventures</span>
          </h3>
          <p className="dropbar-featured-desc">
            Operating across education, technology, finance, and logistics — BRP
            Group combines physical strength with digital adaptability.
          </p>
          <Link
            to="/ventures"
            className="dropbar-featured-link"
            onClick={onClose}
          >
            <span>View all ventures</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="dropbar-divider" />

        {/* Right — Grid cards */}
        <div className="dropbar-grid dropbar-grid--ventures">
          {ventureHighlights.map((item, idx) => {
            return (
              <Link
                key={item.title}
                to="/ventures"
                hash={`venture-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="dropbar-card"
                onClick={onClose}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div
                  className="dropbar-card-icon"
                  style={{
                    backgroundColor: item.color + "14",
                    color: item.color,
                  }}
                >
                  <img src={item.logo as string} alt={item.title} className="h-6 w-6 object-contain" />
                </div>
                <div className="dropbar-card-body">
                  <div className="dropbar-card-title-row">
                    <h4 className="dropbar-card-title">{item.title}</h4>
                    <span
                      className="dropbar-card-badge"
                      style={{
                        backgroundColor: item.color + "12",
                        color: item.color,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="dropbar-card-desc">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Nav Component ─── */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeDropbar = useCallback(() => setActiveDropdown(null), []);

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

  // Close dropbar on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Helpers for smooth hover intent (prevents flicker)
  const clearLeaveTimeout = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  };

  const scheduleClose = (delay = 180) => {
    clearLeaveTimeout();
    leaveTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, delay);
  };

  const handleLinkEnter = (label: string) => {
    clearLeaveTimeout();
    setActiveDropdown(label);
  };

  const handleLinkLeave = () => {
    scheduleClose(180);
  };

  const handleDropbarEnter = () => {
    clearLeaveTimeout();
  };

  const handleDropbarLeave = () => {
    scheduleClose(120);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-6 overflow-visible">
        <nav
          className={`pointer-events-auto mx-auto flex min-h-16 w-full max-w-[1180px] items-center justify-between overflow-visible rounded-full px-5 py-2.5 transition-colors duration-500 md:min-h-20 md:px-6 md:py-3 ${
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
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 text-sm">
            {links.map((link) => (
              <li
                key={link.to}
                className="relative"
                onMouseEnter={
                  link.hasDropdown
                    ? () => handleLinkEnter(link.label)
                    : undefined
                }
                onMouseLeave={link.hasDropdown ? handleLinkLeave : undefined}
              >
                <Link
                  to={link.to}
                  className="relative py-1 transition-colors duration-300 inline-flex items-center gap-1"
                  onClick={(e) => {
                    if (link.to === "/" && window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    // Allow click-through to page — also close dropbar
                    if (link.hasDropdown) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={
                          isActive || activeDropdown === link.label
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
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
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

        {/* ═══ FULL-WIDTH DROPBAR — slides below the navbar ═══ */}
        <AnimatePresence>
          {activeDropdown && (
            <>
              {/* Subtle backdrop that dims the page */}
              <motion.div
                key="dropbar-backdrop"
                className="pointer-events-auto fixed inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeDropbar}
                style={{ background: "rgba(0,0,0,0.08)" }}
              />

              <motion.div
                key="dropbar-panel"
                className="dropbar-container pointer-events-auto"
                initial={{ opacity: 0, y: -12, scaleY: 0.97 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.98 }}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "top center" }}
                onMouseEnter={handleDropbarEnter}
                onMouseLeave={handleDropbarLeave}
              >
                {activeDropdown === "About Us" && (
                  <AboutDropbar onClose={closeDropbar} />
                )}
                {activeDropdown === "History" && (
                  <HistoryDropbar onClose={closeDropbar} />
                )}
                {activeDropdown === "Ventures" && (
                  <VenturesDropbar onClose={closeDropbar} />
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
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
              className="fixed top-28 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md md:hidden"
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
                          if (
                            link.to === "/" &&
                            window.location.pathname === "/"
                          ) {
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
