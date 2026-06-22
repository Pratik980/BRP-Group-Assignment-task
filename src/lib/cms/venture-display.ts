import type { LucideIcon } from "lucide-react";
import { Building2, Compass, Cpu, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

import { VENTURE_LOGO_BY_SLUG } from "@/lib/cms/site-assets";

export type VentureRow = Tables<"ventures">;

export type PublicVenture = {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: string;
  filterCategory: string;
  desc: string;
  longDesc: string;
  tagline: string;
  focus: string;
  icon: LucideIcon;
  logo: string;
  accent: string;
  tags: string[];
  themeColor: string;
  glowColor: string;
  gradient: string;
  externalUrl: string | null;
  navColor: string;
};

type StylePreset = {
  code: string;
  focus: string;
  tags: string[];
  accent: string;
  themeColor: string;
  glowColor: string;
  gradient: string;
  filterCategory: string;
  navColor: string;
};

const STYLE_BY_SLUG: Record<string, StylePreset> = {
  reddot: {
    code: "REDDOT",
    focus: "Digital Learning & Supply of Resources",
    tags: ["EdTech", "Digital Learning", "Resources"],
    accent: "oklch(0.55 0.18 15)",
    themeColor: "rgba(239, 68, 68, 0.15)",
    glowColor: "oklch(0.65 0.18 15)",
    gradient: "from-rose-500 to-red-600",
    filterCategory: "Education",
    navColor: "#ef4444",
  },
  "small-heaven-school": {
    code: "SHS",
    focus: "Holistic Foundations & Academic Rigor",
    tags: ["K–12", "Holistic Growth", "Nepal"],
    accent: "oklch(0.55 0.14 240)",
    themeColor: "rgba(14, 165, 233, 0.15)",
    glowColor: "oklch(0.6 0.15 240)",
    gradient: "from-blue-400 to-cyan-600",
    filterCategory: "Education",
    navColor: "#0ea5e9",
  },
  "satin-leaf-investment": {
    code: "SATIN LEAF",
    focus: "Venture Capital & Incubation",
    tags: ["Venture Capital", "Incubation", "Funding"],
    accent: "oklch(0.5 0.15 280)",
    themeColor: "rgba(139, 92, 246, 0.15)",
    glowColor: "oklch(0.58 0.15 280)",
    gradient: "from-violet-400 to-purple-600",
    filterCategory: "Investments & Real Estate",
    navColor: "#8b5cf6",
  },
  "brp-ventures": {
    code: "BRP VENTURES",
    focus: "Property Investment & Fund Management",
    tags: ["Real Estate", "Fund Management", "Investments"],
    accent: "oklch(0.48 0.14 275)",
    themeColor: "rgba(99, 102, 241, 0.15)",
    glowColor: "oklch(0.55 0.14 275)",
    gradient: "from-indigo-400 to-violet-600",
    filterCategory: "Investments & Real Estate",
    navColor: "#4f46e5",
  },
  "ub-ventures": {
    code: "UB VENTURES",
    focus: "Commercial Leasing & Structures",
    tags: ["Commercial Leasing", "Real Estate", "Structures"],
    accent: "oklch(0.52 0.11 140)",
    themeColor: "rgba(34, 197, 94, 0.12)",
    glowColor: "oklch(0.55 0.11 140)",
    gradient: "from-green-400 to-emerald-600",
    filterCategory: "Investments & Real Estate",
    navColor: "#10b981",
  },
  "brp-tours-travels": {
    code: "BRP TOURS",
    focus: "Local & International Travel",
    tags: ["Corporate Travel", "Tours", "Hospitality"],
    accent: "oklch(0.58 0.14 55)",
    themeColor: "rgba(245, 158, 11, 0.15)",
    glowColor: "oklch(0.65 0.14 55)",
    gradient: "from-amber-400 to-orange-600",
    filterCategory: "Travel & Hospitality",
    navColor: "#f59e0b",
  },
};

const DEFAULT_STYLE: StylePreset = {
  code: "VENTURE",
  focus: "Operating company",
  tags: ["BRP Group"],
  accent: "oklch(0.55 0.12 275)",
  themeColor: "rgba(99, 102, 241, 0.12)",
  glowColor: "oklch(0.55 0.12 275)",
  gradient: "from-indigo-400 to-violet-600",
  filterCategory: "Other",
  navColor: "#6366f1",
};

export function categoryIcon(category: string): LucideIcon {
  switch (category) {
    case "Education":
      return GraduationCap;
    case "Technology":
      return Cpu;
    case "Real Estate":
      return Building2;
    case "Tours & Travel":
      return Compass;
    case "Healthcare":
      return Sparkles;
    default:
      return TrendingUp;
  }
}

export function dbCategoryToFilter(category: string): string {
  switch (category) {
    case "Real Estate":
      return "Investments & Real Estate";
    case "Tours & Travel":
      return "Travel & Hospitality";
    case "Other":
      return "Other";
    default:
      return category;
  }
}

export function mapVentureRow(row: VentureRow): PublicVenture {
  const style = STYLE_BY_SLUG[row.slug] ?? DEFAULT_STYLE;
  const filterCategory =
    style.filterCategory === "Other" ? dbCategoryToFilter(row.category) : style.filterCategory;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    code: style.code,
    category: row.category,
    filterCategory,
    desc: row.tagline ?? row.description?.slice(0, 120) ?? "",
    longDesc: row.description ?? row.tagline ?? "",
    tagline: row.tagline ?? "",
    focus: style.focus,
    icon: categoryIcon(row.category),
    logo: row.logo_url ?? VENTURE_LOGO_BY_SLUG[row.slug] ?? "",
    accent: style.accent,
    tags: style.tags,
    themeColor: style.themeColor,
    glowColor: style.glowColor,
    gradient: style.gradient,
    externalUrl: row.external_url,
    navColor: style.navColor,
  };
}
