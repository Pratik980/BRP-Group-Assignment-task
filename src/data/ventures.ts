import type { LucideIcon } from "lucide-react";
import { Cpu, GraduationCap, Building2, Compass, TrendingUp } from "lucide-react";

import reddotLogo from "@/assets/brp/reddot.webp";
import shsLogo from "@/assets/brp/shs.jpg";
import assabetLogo from "@/assets/brp/Assabet.webp";
import satinLeafLogo from "@/assets/brp/satin-leaf.webp";
import brpVenturesLogo from "@/assets/brp/logo-BRP.webp";
import ubVenturesLogo from "@/assets/brp/uv-ventures.webp";
import brpToursLogo from "@/assets/brp/Brp-tours-and-travel.webp";

export type Venture = {
  name: string;
  slug: string;
  code: string;
  category: string;
  desc: string;
  longDesc: string;
  icon: LucideIcon;
  logo: string;
  accent: string;
  tags: string[];
};

/** All operating companies — matches https://brpgroup.com.np/ portfolio (7 ventures). */
export const ventures: Venture[] = [
  {
    name: "Reddot",
    slug: "reddot",
    code: "REDDOT",
    category: "Education",
    desc: "Quality educational resources evolving into a digital learning platform.",
    longDesc:
      "An established resource provider evolving into a digital learning platform to make quality education available online. Red Dot combines technology and education to make it simple to find various educational resources.",
    icon: GraduationCap,
    logo: reddotLogo,
    accent: "oklch(0.55 0.18 15)",
    tags: ["EdTech", "Digital Learning", "Resources"],
  },
  {
    name: "Small Heaven School",
    slug: "small-heaven-school",
    code: "SHS",
    category: "Education",
    desc: "Academic excellence and holistic development since 2062 B.S.",
    longDesc:
      "Established in 2062 B.S., committed to maintaining high standards of academic excellence and holistic development. Integrating innovative teaching methodologies with creative exploration.",
    icon: GraduationCap,
    logo: shsLogo,
    accent: "oklch(0.55 0.14 240)",
    tags: ["K–12", "Holistic Growth", "Nepal"],
  },
  {
    name: "Assabet Technologies",
    slug: "assabet-technologies",
    code: "ASSABET",
    category: "Technology",
    desc: "Assabet assists businesses to build efficiency and security.",
    longDesc:
      "Designing and developing tech-powered solutions for businesses. Enterprise software, data science, cybersecurity, and automation. Proud offshore technology partner for U.S.-based ESR LLC.",
    icon: Cpu,
    logo: assabetLogo,
    accent: "oklch(0.55 0.14 180)",
    tags: ["Enterprise", "Data Science", "Cybersecurity"],
  },
  {
    name: "Satin Leaf Investment",
    slug: "satin-leaf-investment",
    code: "SATIN LEAF",
    category: "Investments",
    desc: "We invest in ideas and help them maximize their potential.",
    longDesc:
      "Supporting and investing in companies across education, finance, healthcare, agriculture, energy, and technology. Bridging Nepalese startups with international VC capital.",
    icon: TrendingUp,
    logo: satinLeafLogo,
    accent: "oklch(0.5 0.15 280)",
    tags: ["Venture Capital", "Incubation", "Funding"],
  },
  {
    name: "B.R.P. Ventures",
    slug: "brp-ventures",
    code: "BRP VENTURES",
    category: "Real Estate",
    desc: "Property investment, market analysis, and fund management.",
    longDesc:
      "Specializing in property investment and fund management. Utilizing deep local real estate insight and strategic partnerships for long-term capital success.",
    icon: Building2,
    logo: brpVenturesLogo,
    accent: "oklch(0.48 0.14 275)",
    tags: ["Real Estate", "Fund Management", "Investments"],
  },
  {
    name: "U.B. Ventures",
    slug: "ub-ventures",
    code: "UB VENTURES",
    category: "Real Estate",
    desc: "Commercial leasing and structures for institutional growth.",
    longDesc:
      "An established real estate holding company active for almost a decade. Locating resources, constructing, and providing structures to various businesses and services.",
    icon: Building2,
    logo: ubVenturesLogo,
    accent: "oklch(0.52 0.11 140)",
    tags: ["Commercial Leasing", "Real Estate", "Structures"],
  },
  {
    name: "BRP Tours & Travels",
    slug: "brp-tours-travels",
    code: "BRP TOURS",
    category: "Travel",
    desc: "Local and international travel management services.",
    longDesc:
      "Widest coverage of local and international destinations at affordable prices. Delivering excellent services with the aim of becoming your preferred travel agency.",
    icon: Compass,
    logo: brpToursLogo,
    accent: "oklch(0.58 0.14 55)",
    tags: ["Corporate Travel", "Tours", "Hospitality"],
  },
];

export const ventureCount = ventures.length;
