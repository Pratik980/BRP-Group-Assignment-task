import {
  aboutUs,
  communityPage,
  heritageStrip,
  ourCommunity,
  ourHistory,
  ourLegacy,
} from "@/data/brp-site-content";
import type { AboutSectionRow } from "@/lib/cms/content.public";

import galleryImg3 from "@/assets/optimized/image-3-1200.webp";
import galleryImg4 from "@/assets/optimized/image-4-1200.webp";
import galleryImg5 from "@/assets/optimized/image-5-1200.webp";
import galleryImg6 from "@/assets/optimized/image-6-1200.webp";
import galleryChildren from "@/assets/optimized/childrents-1200.webp";
import galleryEducation1 from "@/assets/optimized/education-1-1200.webp";
import galleryEducation2 from "@/assets/optimized/education-2-1200.webp";

export const GALLERY_IMAGE_MAP: Record<string, string> = {
  "childrents-1200.webp": galleryChildren,
  "education-1-1200.webp": galleryEducation1,
  "education-2-1200.webp": galleryEducation2,
  "image-3-1200.webp": galleryImg3,
  "image-4-1200.webp": galleryImg4,
  "image-5-1200.webp": galleryImg5,
  "image-6-1200.webp": galleryImg6,
};

export const ABOUT_SECTION_KEYS = {
  HOME_HISTORY: "home_history",
  ABOUT_VISION: "about_vision",
  ABOUT_MISSION: "about_mission",
  HOME_LEGACY: "home_legacy",
  HOME_COMMUNITY: "home_community",
  HERITAGE_STRIP: "heritage_strip",
  VENTURES_HERO: "ventures_hero",
  COMMUNITY_PAGE: "community_page",
  HISTORY_PAGE: "history_page",
  HISTORY_LEGACY: "history_legacy",
} as const;

export type AboutSectionsMap = Record<string, AboutSectionRow | undefined>;

export type VisionMissionContent = {
  vision: { title: string; body: string };
  mission: { title: string; body: string };
};

export type StoryPanelContent = {
  label: string;
  paragraphs: string[];
};

export type GalleryImage = { src: string; label: string };
export type CtaButton = { label: string; href: string };

export type CommunityPageSection = {
  headline: string;
  paragraphs: string[];
  imageUrl?: string;
};

export type CommunityPageContent = {
  heroTitle: string;
  heroIntro: string;
  heroHeadline: string;
  heroLocation: string;
  highlights: { value: string; label: string }[];
  sections: CommunityPageSection[];
  initiativesBadge: string;
  initiativesTitle: string;
  initiativesDescription: string;
  galleryBadge: string;
  galleryTitle: string;
  galleryImages: GalleryImage[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtons: CtaButton[];
};

function parseParagraphs(metadata: unknown, fallback: readonly string[]): string[] {
  if (
    metadata &&
    typeof metadata === "object" &&
    Array.isArray((metadata as { paragraphs?: unknown }).paragraphs)
  ) {
    const cleaned = (metadata as { paragraphs: unknown[] }).paragraphs
      .map((p) => (typeof p === "string" ? p.trim() : ""))
      .filter(Boolean);
    if (cleaned.length > 0) return cleaned;
  }
  return [...fallback];
}

export function resolveHomeHistory(sections: AboutSectionsMap | undefined): string {
  const row = sections?.[ABOUT_SECTION_KEYS.HOME_HISTORY];
  return row?.content?.trim() || ourHistory.body;
}

export function resolveHeritageStripLabel(sections: AboutSectionsMap | undefined): string {
  const row = sections?.[ABOUT_SECTION_KEYS.HERITAGE_STRIP];
  return row?.title?.trim() || row?.content?.trim() || heritageStrip.label;
}

export function resolveVenturesHeroIntro(sections: AboutSectionsMap | undefined): string {
  const row = sections?.[ABOUT_SECTION_KEYS.VENTURES_HERO];
  return (
    row?.content?.trim() ||
    "Operating across critical nodes of education, technology, finance, and logistics - B.R.P. Group combines physical strength with digital adaptability to lead the Himalayan region."
  );
}

export function resolveVisionMission(sections: AboutSectionsMap | undefined): VisionMissionContent {
  const visionRow = sections?.[ABOUT_SECTION_KEYS.ABOUT_VISION];
  const missionRow = sections?.[ABOUT_SECTION_KEYS.ABOUT_MISSION];

  return {
    vision: {
      title: visionRow?.title?.trim() || aboutUs.vision.title,
      body: visionRow?.content?.trim() || aboutUs.vision.body,
    },
    mission: {
      title: missionRow?.title?.trim() || aboutUs.mission.title,
      body: missionRow?.content?.trim() || aboutUs.mission.body,
    },
  };
}

export function resolveCommunityIntro(sections: AboutSectionsMap | undefined): string[] {
  const row = sections?.[ABOUT_SECTION_KEYS.HOME_COMMUNITY];
  if (row) return parseParagraphs(row.metadata, ourCommunity.paragraphs);
  return [...ourCommunity.paragraphs];
}

export function resolveLegacyStory(sections: AboutSectionsMap | undefined): StoryPanelContent {
  const row = sections?.[ABOUT_SECTION_KEYS.HOME_LEGACY];
  return {
    label: row?.title?.trim() || ourLegacy.label,
    paragraphs: row
      ? parseParagraphs(row.metadata, ourLegacy.paragraphs)
      : [...ourLegacy.paragraphs],
  };
}

export function resolveCommunityStory(sections: AboutSectionsMap | undefined): StoryPanelContent {
  const row = sections?.[ABOUT_SECTION_KEYS.HOME_COMMUNITY];
  return {
    label: row?.title?.trim() || ourCommunity.label,
    paragraphs: row
      ? parseParagraphs(row.metadata, ourCommunity.paragraphs)
      : [...ourCommunity.paragraphs],
  };
}

function parseCommunityHighlights(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") return null;
  const highlights = (metadata as { highlights?: unknown }).highlights;
  if (!Array.isArray(highlights)) return null;

  const cleaned = highlights
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const value = (item as { value?: unknown }).value;
      const label = (item as { label?: unknown }).label;
      if (typeof value !== "string" || typeof label !== "string") return null;
      return { value: value.trim(), label: label.trim() };
    })
    .filter((item): item is { value: string; label: string } =>
      Boolean(item?.value && item?.label),
    );

  return cleaned.length > 0 ? cleaned : null;
}

function parseCommunitySections(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") return null;
  const sections = (metadata as { sections?: unknown }).sections;
  if (!Array.isArray(sections)) return null;

  const cleaned = sections
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const headline = (item as { headline?: unknown }).headline;
      const paragraphs = (item as { paragraphs?: unknown }).paragraphs;
      const imageUrl = (item as { imageUrl?: unknown }).imageUrl;
      if (typeof headline !== "string" || !Array.isArray(paragraphs)) return null;
      const body = paragraphs.map((p) => (typeof p === "string" ? p.trim() : "")).filter(Boolean);
      if (!headline.trim() || body.length === 0) return null;
      return {
        headline: headline.trim(),
        paragraphs: body,
        imageUrl: typeof imageUrl === "string" && imageUrl.trim() ? imageUrl.trim() : undefined,
      };
    })
    .filter((item) => Boolean(item)) as CommunityPageSection[];

  return cleaned.length > 0 ? cleaned : null;
}

function parseGalleryImages(metadata: unknown): GalleryImage[] | null {
  if (!metadata || typeof metadata !== "object") return null;
  const images = (metadata as { galleryImages?: unknown }).galleryImages;
  if (!Array.isArray(images)) return null;

  const cleaned = images
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const src = (item as { src?: unknown }).src;
      const label = (item as { label?: unknown }).label;
      if (typeof src !== "string" || typeof label !== "string") return null;
      const resolvedSrc = GALLERY_IMAGE_MAP[src] || src;
      return { src: resolvedSrc, label: label.trim() };
    })
    .filter((item): item is GalleryImage => Boolean(item?.src && item?.label));

  return cleaned.length > 0 ? cleaned : null;
}

function parseCtaButtons(metadata: unknown): CtaButton[] | null {
  if (!metadata || typeof metadata !== "object") return null;
  const buttons = (metadata as { ctaButtons?: unknown }).ctaButtons;
  if (!Array.isArray(buttons)) return null;

  const cleaned = buttons
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const label = (item as { label?: unknown }).label;
      const href = (item as { href?: unknown }).href;
      if (typeof label !== "string" || typeof href !== "string") return null;
      return { label: label.trim(), href: href.trim() };
    })
    .filter((item): item is CtaButton => Boolean(item?.label && item?.href));

  return cleaned.length > 0 ? cleaned : null;
}

export function resolveCommunityPage(sections: AboutSectionsMap | undefined): CommunityPageContent {
  const row = sections?.[ABOUT_SECTION_KEYS.COMMUNITY_PAGE];
  const metadata = row?.metadata;

  function metaStr(key: string, fallback: string): string {
    if (!metadata || typeof metadata !== "object") return fallback;
    const val = (metadata as Record<string, unknown>)[key];
    return typeof val === "string" && val.trim() ? val.trim() : fallback;
  }

  return {
    heroTitle: row?.title?.trim() || communityPage.heroTitle,
    heroIntro: row?.content?.trim() || communityPage.heroIntro,
    heroHeadline: metaStr("heroHeadline", communityPage.heroHeadline),
    heroLocation: metaStr("heroLocation", communityPage.heroLocation),
    highlights:
      parseCommunityHighlights(metadata) ?? communityPage.highlights.map((h) => ({ ...h })),
    sections:
      parseCommunitySections(metadata) ??
      communityPage.sections.map((s) => ({
        headline: s.headline,
        paragraphs: [...s.paragraphs],
      })),
    initiativesBadge: metaStr("initiativesBadge", communityPage.initiativesBadge),
    initiativesTitle: metaStr("initiativesTitle", communityPage.initiativesTitle),
    initiativesDescription: metaStr("initiativesDescription", communityPage.initiativesDescription),
    galleryBadge: metaStr("galleryBadge", communityPage.galleryBadge),
    galleryTitle: metaStr("galleryTitle", communityPage.galleryTitle),
    galleryImages:
      parseGalleryImages(metadata) ??
      communityPage.galleryImages.map((i) => ({
        src: GALLERY_IMAGE_MAP[i.src] || i.src,
        label: i.label,
      })),
    ctaTitle: metaStr("ctaTitle", communityPage.ctaTitle),
    ctaDescription: metaStr("ctaDescription", communityPage.ctaDescription),
    ctaButtons: parseCtaButtons(metadata) ?? communityPage.ctaButtons.map((b) => ({ ...b })),
  };
}

export type ImpactStatItem = { value: string; label: string };

const DEFAULT_IMPACT_STATS: ImpactStatItem[] = [
  { value: "45+", label: "Years of legacy" },
  { value: "10+", label: "Active businesses" },
  { value: "1000+", label: "Networks built" },
];

export function resolveImpactStatItems(
  stats: { value: string; label: string }[] | null | undefined,
): ImpactStatItem[] {
  if (!stats?.length) return DEFAULT_IMPACT_STATS;
  return stats.map((s) => ({ value: s.value, label: s.label }));
}

export function findImpactStatValue(
  stats: ImpactStatItem[],
  matchers: string[],
  fallback: string,
): string {
  for (const matcher of matchers) {
    const found = stats.find((s) => s.label.toLowerCase().includes(matcher.toLowerCase()));
    if (found) return found.value;
  }
  return fallback;
}

export function legacyNumeralFromStats(stats: ImpactStatItem[]): string {
  const legacyValue = findImpactStatValue(stats, ["legacy", "years"], "45+");
  const match = legacyValue.match(/^(\d+)/);
  return match?.[1] ?? "45";
}

/* ─── History Page ────────────────────────────────────────────── */

export type HistoryMilestoneItem = {
  period: string;
  title: string;
  description: string;
  imageUrl: string;
  extraImages: string[];
  iconName: string;
  glowColor: string;
};

export type HistoryPageContent = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  overviewBadge: string;
  overviewTitle: string;
  milestones: HistoryMilestoneItem[];
};

export type LegacyFounderParagraphs = {
  title: string;
  paragraphs: string[];
  imageUrl: string;
  name: string;
  subtitle: string;
};

export type LegacyTorchAct = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  quoteAttribution: string;
  accentFrom: string;
  accentTo: string;
  borderAccent: string;
  iconColor: string;
  imageUrl: string;
  imageUrl2: string;
};

export type LegacyValueItem = {
  iconName: string;
  title: string;
  description: string;
};

export type HistoryLegacyContent = {
  introBadge: string;
  introTitle: string;
  introDescription: string;
  torchBadge: string;
  torchTitle: string;
  founder: LegacyFounderParagraphs;
  torchActs: LegacyTorchAct[];
  valuesTitle: string;
  valuesDescription: string;
  values: LegacyValueItem[];
};

const DEFAULT_HISTORY_PAGE: HistoryPageContent = {
  heroBadge: "Our Timeline",
  heroTitle: "Chronicle of Trust",
  heroDescription:
    "A 45-year narrative of corporate responsibility, educational transformation, and compound value creation across Nepal.",
  overviewBadge: "Overview",
  overviewTitle: "Complete timeline",
  milestones: [
    {
      period: "2040-50 BS",
      title: "The Educational Genesis",
      iconName: "GraduationCap",
      description:
        "Dr. Babu Ram Pokharel started his long and impactful journey in the education sector with the establishment of V.S. Niketan School in 2037 B.S. A school that was initiated with 7 teachers and 147 students is now one of the biggest educational institutions in the country.\nHe was also the founding member of Private and Boarding Schools\u2019 Organization Nepal (PABSON), established in B.S. 2047.",
      imageUrl: "",
      extraImages: [],
      glowColor: "oklch(0.65 0.18 15 / 0.15)",
    },
    {
      period: "2050-60 BS",
      title: "National Recognition & Honors",
      iconName: "Award",
      description:
        "Recognizing the efforts of Dr. Babu Ram Pokharel and his initiatives in the social sector of the country, he was awarded with the Gorkha Dakshina Bahu in B.S. 2054, highest of awards from the then kingship of Nepal. He also received the Trishakti Patta, and the Birendra-Aishwarya medal in the years B.S. 2056 and B.S 2059 respectively.",
      imageUrl: "",
      extraImages: [],
      glowColor: "oklch(0.6 0.15 240 / 0.15)",
    },
    {
      period: "2060-70 BS",
      title: "Institutional Scaling & Public Service",
      iconName: "Landmark",
      description:
        "V.S. Niketan has been able to accomplish excellent outcomes in education since the 37 years of its establishment. Having won the Best School of the Nation award in B.S. 2065, it is now a family for 300+ teachers and about 5000 students.\nHis influence in bringing reforms doesn\u2019t only limit to the education sector, an equally active member of the society Dr. Babu Ram Pokharel was the member of parliament from B.S. 2070.",
      imageUrl: "",
      extraImages: ["", "", ""],
      glowColor: "oklch(0.65 0.16 180 / 0.15)",
    },
    {
      period: "2070-80 BS",
      title: "Legacy Transition & Ecosystem Building",
      iconName: "Compass",
      description:
        "A visionary and an influential figure for thousands of people, Dr. Babu Ram Pokharel was also actively involved in more than a dozen social groups, such as the Rotary Club, Lions Clubs, Community Development and Guidance Center (CDGC), SAARC Relations Council, and others.\nHis involvements, deeds, and beliefs have now paved a way and given younger generations direction. The legacy of Dr. Babu Ram Pokharel is carried on by Dr. Ubin Pokharel and Ms. Bidushi Pandey Pokharel, who embody the same values and ethics but are motivated by fresher concepts.",
      imageUrl: "",
      extraImages: [],
      glowColor: "oklch(0.55 0.15 280 / 0.15)",
    },
  ],
};

function parseString(val: unknown, fallback: string): string {
  return typeof val === "string" && val.trim() ? val.trim() : fallback;
}

function parseStringArray(val: unknown, fallback: string[]): string[] {
  if (Array.isArray(val)) {
    const cleaned = val.map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean);
    if (cleaned.length > 0) return cleaned;
  }
  return fallback;
}

function parseMilestones(val: unknown): HistoryMilestoneItem[] | null {
  if (!Array.isArray(val)) return null;
  const milestones = val
    .map((m) => {
      if (!m || typeof m !== "object") return null;
      const obj = m as Record<string, unknown>;
      return {
        period: parseString(obj.period, ""),
        title: parseString(obj.title, ""),
        description: parseString(obj.description, ""),
        imageUrl: parseString(obj.imageUrl, ""),
        extraImages: Array.isArray(obj.extraImages)
          ? obj.extraImages.map((v) => (typeof v === "string" ? v : ""))
          : [],
        iconName: parseString(obj.iconName, "GraduationCap"),
        glowColor: parseString(obj.glowColor, "oklch(0.65 0.18 15 / 0.15)"),
      };
    })
    .filter((m) => m && m.period && m.title);
  return milestones.length > 0 ? milestones : null;
}

export function resolveHistoryPage(
  metadata: Record<string, unknown> | undefined,
): HistoryPageContent {
  if (!metadata || typeof metadata !== "object") return { ...DEFAULT_HISTORY_PAGE };
  return {
    heroBadge: parseString(metadata.heroBadge, DEFAULT_HISTORY_PAGE.heroBadge),
    heroTitle: parseString(metadata.heroTitle, DEFAULT_HISTORY_PAGE.heroTitle),
    heroDescription: parseString(metadata.heroDescription, DEFAULT_HISTORY_PAGE.heroDescription),
    overviewBadge: parseString(metadata.overviewBadge, DEFAULT_HISTORY_PAGE.overviewBadge),
    overviewTitle: parseString(metadata.overviewTitle, DEFAULT_HISTORY_PAGE.overviewTitle),
    milestones: parseMilestones(metadata.milestones) ?? DEFAULT_HISTORY_PAGE.milestones,
  };
}

/* ─── History Legacy ──────────────────────────────────────────── */

const DEFAULT_HISTORY_LEGACY: HistoryLegacyContent = {
  introBadge: "Carrying the Torch",
  introTitle: "Our Legacy",
  introDescription:
    "B.R.P. Group is more than a name \u2014 it is the living legacy of late Dr. Babu Ram Pokharel, carried forward by a new generation driven by the same values, renewed purpose, and a vision for Nepal\u2019s tomorrow.",
  torchBadge: "Passing the Torch",
  torchTitle: "From One Generation to the Next",
  founder: {
    title: "The Man Behind the Vision",
    paragraphs: [
      "Dr. Babu Ram Pokharel\u2019s journey began with a single school \u2014 V.S. Niketan \u2014 founded in 2037 B.S. with 7 teachers and 147 students. What started as a humble educational initiative grew into a lifelong mission of public service, enterprise, and community upliftment that would span over four decades.",
      "Recognized nationally with the Gorkha Dakshina Bahu, Trishakti Patta, and the Birendra-Aishwarya medals, Dr. Pokharel\u2019s influence extended far beyond education. He served as a member of parliament, was a founding member of PABSON, and actively contributed to Rotary Clubs, Lions Clubs, CDGC, and the SAARC Relations Council.",
      "His life was a testament to the belief that true leadership is measured not by what you accumulate, but by what you pass on. He planted seeds of education, nurtured institutions of care, and built bridges of opportunity \u2014 a legacy that now finds its next caretakers.",
    ],
    imageUrl: "",
    name: "Dr. Babu Ram Pokharel",
    subtitle: "Chairman Emeritus \u00b7 1947\u20132022",
  },
  torchActs: [
    {
      id: "foundation",
      label: "1947 \u2013 2022",
      title: "The Foundation",
      subtitle: "Dr. Babu Ram Pokharel",
      description:
        "A lifetime dedicated to education, public service, and nation-building. From a single school to a legacy that would span generations.",
      quote: "",
      quoteAttribution: "",
      accentFrom: "#d97706",
      accentTo: "#ea580c",
      borderAccent: "#d97706",
      iconColor: "text-amber-500",
      imageUrl: "",
      imageUrl2: "",
    },
    {
      id: "transition",
      label: "The Bridge",
      title: "Passing the Torch",
      subtitle: "Values that transcend time",
      description:
        "Principles of integrity, service, and visionary leadership \u2014 carefully instilled and now carried forward with renewed purpose.",
      quote:
        "\u201cThe foundation of a great nation is built not in years, but in the values we pass to the next generation.\u201d",
      quoteAttribution: "\u2014 Dr. Babu Ram Pokharel",
      accentFrom: "#8b5cf6",
      accentTo: "#a78bfa",
      borderAccent: "#8b5cf6",
      iconColor: "text-primary",
      imageUrl: "",
      imageUrl2: "",
    },
    {
      id: "future",
      label: "Present \u2013 Future",
      title: "The Next Chapter",
      subtitle: "Dr. Ubin Pokharel & Bidushi Pandey Pokharel",
      description:
        "Building on 45+ years of foundation with modern vision, global perspective, and an unwavering commitment to Nepal\u2019s tomorrow.",
      quote: "",
      quoteAttribution: "",
      accentFrom: "#0284c7",
      accentTo: "#4f46e5",
      borderAccent: "#0284c7",
      iconColor: "text-sky-500",
      imageUrl: "",
      imageUrl2: "",
    },
  ],
  valuesTitle: "Principles That Endure",
  valuesDescription:
    "The core values that Dr. Pokharel instilled continue to guide every decision, every venture, and every partnership.",
  values: [
    { iconName: "Trees", title: "Rooted in Service", description: "Founded on the principle that enterprise exists to serve community \u2014 not the other way around." },
    { iconName: "Heart", title: "Compassionate Leadership", description: "Leading with empathy, integrity, and a deep sense of responsibility toward every stakeholder." },
    { iconName: "Lightbulb", title: "Visionary Foresight", description: "Building across generations with a long-term view that transcends quarterly outcomes." },
    { iconName: "Globe", title: "Nepal First", description: "Every venture, every investment, every partnership \u2014 grounded in the mission to elevate Nepal." },
  ],
};

function parseTorchActs(val: unknown): LegacyTorchAct[] | null {
  if (!Array.isArray(val)) return null;
  const acts = val
    .map((a) => {
      if (!a || typeof a !== "object") return null;
      const obj = a as Record<string, unknown>;
      return {
        id: parseString(obj.id, ""),
        label: parseString(obj.label, ""),
        title: parseString(obj.title, ""),
        subtitle: parseString(obj.subtitle, ""),
        description: parseString(obj.description, ""),
        quote: parseString(obj.quote, ""),
        quoteAttribution: parseString(obj.quoteAttribution, ""),
        accentFrom: parseString(obj.accentFrom, "#8b5cf6"),
        accentTo: parseString(obj.accentTo, "#a78bfa"),
        borderAccent: parseString(obj.borderAccent, "#8b5cf6"),
        iconColor: parseString(obj.iconColor, "text-primary"),
        imageUrl: parseString(obj.imageUrl, ""),
        imageUrl2: parseString(obj.imageUrl2, ""),
      };
    })
    .filter((a) => a && a.id && a.title);
  return acts.length > 0 ? acts : null;
}

function parseLegacyValues(val: unknown): LegacyValueItem[] | null {
  if (!Array.isArray(val)) return null;
  const items = val
    .map((v) => {
      if (!v || typeof v !== "object") return null;
      const obj = v as Record<string, unknown>;
      return {
        iconName: parseString(obj.iconName, "Trees"),
        title: parseString(obj.title, ""),
        description: parseString(obj.description, ""),
      };
    })
    .filter((v) => v && v.title);
  return items.length > 0 ? items : null;
}

function parseFounder(val: unknown): LegacyFounderParagraphs | null {
  if (!val || typeof val !== "object") return null;
  const obj = val as Record<string, unknown>;
  return {
    title: parseString(obj.title, DEFAULT_HISTORY_LEGACY.founder.title),
    paragraphs: parseStringArray(obj.paragraphs, DEFAULT_HISTORY_LEGACY.founder.paragraphs),
    imageUrl: parseString(obj.imageUrl, ""),
    name: parseString(obj.name, DEFAULT_HISTORY_LEGACY.founder.name),
    subtitle: parseString(obj.subtitle, DEFAULT_HISTORY_LEGACY.founder.subtitle),
  };
}

export function resolveHistoryLegacy(
  metadata: Record<string, unknown> | undefined,
): HistoryLegacyContent {
  if (!metadata || typeof metadata !== "object") return { ...DEFAULT_HISTORY_LEGACY };
  return {
    introBadge: parseString(metadata.introBadge, DEFAULT_HISTORY_LEGACY.introBadge),
    introTitle: parseString(metadata.introTitle, DEFAULT_HISTORY_LEGACY.introTitle),
    introDescription: parseString(metadata.introDescription, DEFAULT_HISTORY_LEGACY.introDescription),
    torchBadge: parseString(metadata.torchBadge, DEFAULT_HISTORY_LEGACY.torchBadge),
    torchTitle: parseString(metadata.torchTitle, DEFAULT_HISTORY_LEGACY.torchTitle),
    founder: parseFounder(metadata.founder) ?? DEFAULT_HISTORY_LEGACY.founder,
    torchActs: parseTorchActs(metadata.torchActs) ?? DEFAULT_HISTORY_LEGACY.torchActs,
    valuesTitle: parseString(metadata.valuesTitle, DEFAULT_HISTORY_LEGACY.valuesTitle),
    valuesDescription: parseString(metadata.valuesDescription, DEFAULT_HISTORY_LEGACY.valuesDescription),
    values: parseLegacyValues(metadata.values) ?? DEFAULT_HISTORY_LEGACY.values,
  };
}
