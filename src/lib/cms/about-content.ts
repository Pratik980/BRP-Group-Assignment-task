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
    "Operating across critical nodes of education, technology, finance, and logistics — BRP Group combines physical strength with digital adaptability to lead the Himalayan region."
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
