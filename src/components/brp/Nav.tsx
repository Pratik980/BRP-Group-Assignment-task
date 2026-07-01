import logoImg from "@/assets/optimized/BRPGrouplogo.png";
import type { PublicVenture } from "@/lib/cms/venture-display";
import { resolveVenturesHeroIntro } from "@/lib/cms/about-content";
import { usePublicAboutSections } from "@/hooks/usePublicContent";
import { usePublicVentures } from "@/hooks/usePublicVentures";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Award,
  Landmark,
  Compass,
  BookOpen,
  Globe,
  TrendingUp,
  ArrowRight,
  Users,
  Target,
  Building2,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { scrollToSection } from "@/lib/navigation";

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

/* ─── Nav Links ─── */

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about", hasDropdown: true },
  { label: "History", to: "/history", hasDropdown: true },
  { label: "Ventures", to: "/ventures", hasDropdown: true },
  { label: "Community", to: "/community" },
  { label: "Career", to: "/career" },
];

const navSwitchEase = [0.22, 1, 0.36, 1] as const;
const navSwitchSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

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
            B.R.P. <span className="text-gradient italic">Group</span>
          </h3>
          <p className="dropbar-featured-desc">
            B.R.P. Group seeks to create a long-term positive impact on the Nepalese economy and the
            lives of our citizens.
          </p>
          <Link to="/about" className="dropbar-featured-link" onClick={onClose}>
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
            A 45-year narrative of corporate responsibility, educational transformation, and
            compound value creation across Nepal.
          </p>
          <Link to="/history" className="dropbar-featured-link" onClick={onClose}>
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

function VenturesDropbar({
  onClose,
  ventures,
  intro,
}: {
  onClose: () => void;
  ventures: PublicVenture[];
  intro: string;
}) {
  return (
    <div className="dropbar-inner">
      <div className="dropbar-layout">
        {/* Left — Featured intro */}
        <div className="dropbar-featured">
          <div className="dropbar-featured-badge">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{ventures.length} Active Ventures</span>
          </div>
          <h3 className="dropbar-featured-title">
            Interconnected <span className="text-gradient italic">Ventures</span>
          </h3>
          <p className="dropbar-featured-desc">{intro}</p>
          <Link to="/ventures" className="dropbar-featured-link" onClick={onClose}>
            <span>View all ventures</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="dropbar-divider" />

        {/* Right — Grid cards */}
        <div className="dropbar-grid dropbar-grid--ventures">
          {ventures.slice(0, 6).map((item, idx) => {
            return (
              <Link
                key={item.id}
                to="/ventures"
                hash={`venture-${item.slug}`}
                className="dropbar-card"
                onClick={onClose}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div
                  className="dropbar-card-icon"
                  style={{
                    backgroundColor: item.navColor + "14",
                    color: item.navColor,
                  }}
                >
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="h-6 w-6 object-contain" />
                  ) : (
                    <Building2 className="h-5 w-5" />
                  )}
                </div>
                <div className="dropbar-card-body">
                  <div className="dropbar-card-title-row">
                    <h4 className="dropbar-card-title">{item.name}</h4>
                    <span
                      className="dropbar-card-badge"
                      style={{
                        backgroundColor: item.navColor + "12",
                        color: item.navColor,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="dropbar-card-desc">{item.tagline || item.desc}</p>
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
  const { data: ventures = [] } = usePublicVentures();
  const { data: aboutSections } = usePublicAboutSections();
  const venturesIntro = resolveVenturesHeroIntro(aboutSections);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToContact = useCallback(() => {
    if (currentPath === "/") {
      scrollToSection("contact");
    }
  }, [currentPath]);

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

  // Always use light theme navigation matching reference design
  const isDarkTheme = false;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4 overflow-visible">
        <nav
          className={`pointer-events-auto mx-auto flex min-h-14 w-full max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] items-center justify-between overflow-visible rounded-full px-4 py-2 transition-all duration-500 md:px-5 md:py-2 lg:px-5 lg:py-2.5 ${
            isDarkTheme
              ? "border border-white/15 bg-white/10 shadow-lg backdrop-blur-xl"
              : "glass-strong shadow-float"
          }`}
        >
          {/* Logo & Brand (Left) */}
          <div className="flex-1 flex justify-start shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="B.R.P. Group home"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img
                src={logoImg}
                alt="B.R.P. Group"
                className={`h-9 md:h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-300 ${
                  isDarkTheme ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]" : ""
                }`}
              />
            </Link>
          </div>

          {/* Capsule Nav Links (Center) */}
          <div className="flex-none flex justify-center">
            <LayoutGroup id="nav-links">
              <ul
                className={`hidden md:flex items-center gap-0 rounded-full border px-0.5 py-0.5 shadow-md transition-all md:px-1 md:py-1 ${
                  isDarkTheme
                    ? "border-white/15 bg-white/10 backdrop-blur-xl"
                    : "border-neutral-200/50 bg-white/70 backdrop-blur-md"
                }`}
              >
                {links.map((link) => (
                  <li
                    key={link.to}
                    className="relative"
                    onMouseEnter={link.hasDropdown ? () => handleLinkEnter(link.label) : undefined}
                    onMouseLeave={link.hasDropdown ? handleLinkLeave : undefined}
                  >
                    <Link
                      to={link.to}
                      className="relative block transition-all"
                      onClick={(e) => {
                        if (link.to === "/" && window.location.pathname === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        if (link.hasDropdown) {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      {({ isActive }) => {
                        const isOpen = link.hasDropdown && activeDropdown === link.label;
                        const highlighted = isActive || isOpen;

                        return (
                          <span
                            className={`relative flex items-center gap-1 rounded-full px-2 py-0.5 md:px-2.5 lg:px-3 text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-sans tracking-wide transition-colors duration-300 ${
                              highlighted
                                ? "font-semibold !text-background"
                                : "font-medium !text-foreground hover:!text-foreground/80"
                            }`}
                          >
                            {highlighted && (
                              <motion.span
                                layoutId="navActivePill"
                                className={`absolute inset-0 rounded-full !bg-foreground`}
                                transition={navSwitchSpring}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1">
                              {highlighted && (
                                <motion.span
                                  layoutId="navActiveDot"
                                  className={`h-1 w-1 rounded-full !bg-background`}
                                  transition={navSwitchSpring}
                                />
                              )}
                              {link.label}
                            </span>
                          </span>
                        );
                      }}
                    </Link>
                  </li>
                ))}
              </ul>
            </LayoutGroup>
          </div>

          {/* Book A Call CTA (Right) */}
          <div className="flex-1 flex justify-end items-center gap-3 shrink-0">
            <Link
              to="/"
              hash="contact"
              onClick={goToContact}
              className={`flex items-center gap-3 rounded-full pl-3.5 pr-1.5 py-1.5 text-xs md:text-xs lg:text-sm xl:text-sm font-semibold tracking-wide font-sans shadow-xl active:scale-[0.98] transition-all group !bg-foreground !text-background hover:opacity-90`}
            >
              <span>Connect</span>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-neutral-100 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 fill-none stroke-current"
                  strokeWidth={2.5}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full transition-colors bg-white/80 border border-neutral-200/50 text-foreground hover:bg-white shadow-sm"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -95, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 95, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ─── Dropdown Dropbars ─── */}
        <AnimatePresence>
          {activeDropdown && (
            <>
              {/* Subtle backdrop */}
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
                  ease: navSwitchEase,
                }}
                style={{ transformOrigin: "top center" }}
                onMouseEnter={handleDropbarEnter}
                onMouseLeave={handleDropbarLeave}
              >
                <AnimatePresence mode="wait">
                  {activeDropdown === "About Us" && (
                    <motion.div
                      key="about-us"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: navSwitchEase }}
                    >
                      <AboutDropbar onClose={closeDropbar} />
                    </motion.div>
                  )}
                  {activeDropdown === "History" && (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: navSwitchEase }}
                    >
                      <HistoryDropbar onClose={closeDropbar} />
                    </motion.div>
                  )}
                  {activeDropdown === "Ventures" && (
                    <motion.div
                      key="ventures"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: navSwitchEase }}
                    >
                      <VenturesDropbar
                        onClose={closeDropbar}
                        ventures={ventures}
                        intro={venturesIntro}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="fixed left-1/2 top-20 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 md:hidden"
            >
              <div className="glass-strong max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 shadow-float bg-white/90 border border-border/30 text-foreground backdrop-blur-xl">
                <ul className="space-y-0.5 sm:space-y-1">
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
                        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all"
                      >
                        {({ isActive }) => (
                          <span
                            className={
                              isActive
                                ? "bg-foreground text-white font-semibold w-full px-4 py-2 rounded-xl text-center"
                                : "text-foreground/75 hover:bg-foreground/5 w-full px-3 sm:px-4 py-2 rounded-xl text-center"
                            }
                          >
                            {link.label}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-3 sm:mt-4 border-t border-border/30 pt-3 sm:pt-4">
                  <Link
                    to="/"
                    hash="contact"
                    onClick={() => {
                      closeMobile();
                      goToContact();
                    }}
                    className="flex w-full items-center justify-center rounded-xl bg-foreground text-white px-6 py-2.5 sm:py-3 text-sm font-semibold hover:opacity-90 transition-colors"
                  >
                    Connect
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
