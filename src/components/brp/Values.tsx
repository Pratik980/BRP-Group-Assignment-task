import { motion } from "framer-motion";
import { Lightbulb, Leaf, TrendingUp, Compass, Layers } from "lucide-react";
import React from "react";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type ValueItem = {
  icon: IconComponent;
  name: string;
  desc: string;
  detail: string;
  bgClass: string;
};

// Replaced image backgrounds with theme gradients for better consistency

const values: ValueItem[] = [
  {
    icon: Lightbulb,
    name: "Innovation",
    desc: "Technology with purpose — building solutions that genuinely change daily life.",
    detail:
      "By harnessing artificial intelligence, modern software engineering, and smart hardware integration, we build products that solve real infrastructure and logistical pain points in Nepal.",
    bgClass: "bg-gradient-to-br from-primary/10 via-accent/6 to-primary/4",
  },
  {
    icon: Leaf,
    name: "Sustainability",
    desc: "Resource-efficient systems across every venture, from education to infrastructure.",
    detail:
      "We believe in sustainable capitalism. Every building we build and school we operate integrates solar energy, efficient insulation, and smart resource management.",
    bgClass: "bg-gradient-to-br from-emerald-400/8 via-emerald-300/6 to-emerald-200/4",
  },
  {
    icon: TrendingUp,
    name: "Strategic Growth",
    desc: "Disciplined capital allocation toward ideas with compounding upside.",
    detail:
      "We reinvest our capital compoundingly. Our focus is on long-term enterprise value, picking industries with high barriers to entry and strong fundamentals.",
    bgClass: "bg-gradient-to-br from-sky-400/8 via-indigo-300/6 to-indigo-200/4",
  },
  {
    icon: Compass,
    name: "Long-Term Vision",
    desc: "A 45-year horizon — we are stewards, not speculators.",
    detail:
      "Over a 45-year generational horizon, we prioritize building enduring infrastructure and institutional knowledge that outlasts short-term market cycles.",
    bgClass: "bg-gradient-to-br from-indigo-500/10 via-primary/6 to-sky-200/4",
  },
  {
    icon: Layers,
    name: "Diverse Investments",
    desc: "A portfolio of independent ventures bound by shared values.",
    detail:
      "From digital healthcare and smart real estate to educational technology, our portfolio minimizes risk while maximizing exposure to emerging markets.",
    bgClass: "bg-gradient-to-br from-violet-400/8 via-indigo-300/6 to-indigo-200/4",
  },
];

export function Values() {
  return (
    <section id="values" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="glass mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            What we stand for
          </div>
          <h2 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
            The principles that <span className="text-gradient italic">compound over decades.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:mt-20 md:grid-cols-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            const span = i === 0 ? "md:col-span-3" : i === 1 ? "md:col-span-3" : "md:col-span-2";
            return (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative min-h-[220px] overflow-hidden rounded-3xl shadow-glass transition-all duration-500 hover:shadow-float sm:min-h-[260px] md:min-h-[280px] ${span}`}
              >
                {/* Background photo */}
                <div
                  className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${v.bgClass}`}
                />

                {/* Light overlay for a professional, airy look */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/10 transition-opacity duration-500 group-hover:from-white/60 group-hover:via-white/40 group-hover:to-white/6" />

                {/* Accent glow (subtle) */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/12 to-accent/10 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/0 border border-border/10 shadow-sm transition-all duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl tracking-tight text-foreground">
                      {v.name}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground transition-opacity duration-300 group-hover:opacity-85">
                      {v.desc}
                    </p>
                  </div>

                  {/* Detail — always visible on touch; expand on hover for desktop */}
                  <div className="mt-4 max-h-40 border-t border-border/10 pt-3 opacity-100 md:max-h-0 md:border-transparent md:pt-0 md:opacity-0 md:transition-all md:duration-500 md:ease-in-out md:group-hover:max-h-40 md:group-hover:border-border/10 md:group-hover:pt-3 md:group-hover:opacity-100">
                    <p className="text-xs font-light leading-relaxed text-muted-foreground">
                      {v.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
