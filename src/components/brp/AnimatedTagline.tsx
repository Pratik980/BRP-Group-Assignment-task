import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Phrases to display – can be extended as needed
const phrases = ["The principles that compound over decades"];

/**
 * AnimatedTagline
 * A premium, glass‑morphic container that cycles through key phrases with a smooth slide‑in/fade animation.
 * The design ensures readability (large crisp text) while adding a unique motion that differentiates it from the old static ticker.
 */
export function AnimatedTagline() {
  const [index, setIndex] = useState(0);

  // Cycle through phrases every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative flex items-center justify-center py-12">
      {/* Glassmorphic backdrop */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 shadow-lg" />
      <div className="relative z-10 overflow-hidden w-full max-w-2xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phrases[index]}
            className="font-display text-2xl sm:text-3xl md:text-5xl text-center text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-secondary"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {phrases[index]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
}
