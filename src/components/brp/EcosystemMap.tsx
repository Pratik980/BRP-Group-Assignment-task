// src/components/brp/EcosystemMap.tsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import brpVenturesLogo from "@/assets/optimized/logo-BRP.webp";
import reddotLogo from "@/assets/optimized/reddot.webp";
import shsLogo from "@/assets/optimized/shs.webp";
import assabetLogo from "@/assets/optimized/Assabet.webp";
import satinLeafLogo from "@/assets/optimized/satin-leaf.webp";
import ubVenturesLogo from "@/assets/optimized/uv-ventures.webp";
import brpToursLogo from "@/assets/optimized/Brp-tours-and-travel.webp";

const ventures = [
  { title: "Reddot", logo: reddotLogo, angle: 0 },
  { title: "Small Heaven School", logo: shsLogo, angle: 45 },
  { title: "Assabet Technologies", logo: assabetLogo, angle: 90 },
  { title: "Satin Leaf Investment", logo: satinLeafLogo, angle: 135 },
  { title: "B.R.P. Ventures", logo: brpVenturesLogo, angle: 180 },
  { title: "U.B. Ventures", logo: ubVenturesLogo, angle: 225 },
  { title: "BRP Tours & Travels", logo: brpToursLogo, angle: 270 },
];

export function EcosystemMap() {
  const radius = 240; // distance from centre
  const centerSize = 120;

  const positioned = useMemo(
    () =>
      ventures.map((v) => {
        const rad = (v.angle * Math.PI) / 180;
        return {
          ...v,
          x: radius * Math.cos(rad),
          y: radius * Math.sin(rad),
        };
      }),
    [],
  );

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.88_0.08_240/0.12),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative flex justify-center items-center h-[600px]">
        {/* Central BRP hub */}
        <motion.div
          className="relative flex items-center justify-center w-[${centerSize}px] h-[${centerSize}px] rounded-full bg-white shadow-glass border border-border/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          <img
            src={brpVenturesLogo}
            alt="BRP"
            className="w-full h-full object-contain p-3"
          />
        </motion.div>

        {/* Orbiting venture icons */}
        {positioned.map((v) => (
          <motion.div
            key={v.title}
            className="absolute w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-glass border border-border/20"
            style={{ left: `calc(50% + ${v.x}px - 48px)`, top: `calc(50% + ${v.y}px - 48px)` }}
            whileHover={{ scale: 1.12, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={v.logo} alt={v.title} className="w-20 h-20 object-contain" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
