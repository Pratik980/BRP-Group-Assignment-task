export const HERO_MORPHING_WORDS_KEY = "hero_morphing_words";

export const DEFAULT_HERO_HEADLINE_LINE1 = "Building Nepal's Future";
export const DEFAULT_HERO_HEADLINE_LINE2 = "Through Diversified";
export const HERO_HEADLINE_LINE2_MARKER = "Through Diversified";

export function parseHeroHeadline(headline: string | null | undefined) {
  const raw = headline?.trim();
  if (!raw) {
    return {
      line1: DEFAULT_HERO_HEADLINE_LINE1,
      line2: DEFAULT_HERO_HEADLINE_LINE2,
    };
  }

  if (raw.includes("\n")) {
    const parts = raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      line1: parts[0] ?? DEFAULT_HERO_HEADLINE_LINE1,
      line2: parts.slice(1).join(" ") || DEFAULT_HERO_HEADLINE_LINE2,
    };
  }

  const markerIndex = raw.indexOf(HERO_HEADLINE_LINE2_MARKER);
  if (markerIndex !== -1) {
    return {
      line1: raw.slice(0, markerIndex).trim() || DEFAULT_HERO_HEADLINE_LINE1,
      line2: HERO_HEADLINE_LINE2_MARKER,
    };
  }

  return { line1: raw, line2: DEFAULT_HERO_HEADLINE_LINE2 };
}

export function serializeHeroHeadline(line1: string, line2: string) {
  const l1 = line1.trim() || DEFAULT_HERO_HEADLINE_LINE1;
  const l2 = line2.trim() || DEFAULT_HERO_HEADLINE_LINE2;
  return `${l1}\n${l2}`;
}

export const DEFAULT_HERO_MORPHING_WORDS = ["Innovation", "Ventures", "Growth", "Legacy"] as const;

export function parseHeroMorphingWords(metadata: unknown): string[] {
  if (!metadata || typeof metadata !== "object") return [...DEFAULT_HERO_MORPHING_WORDS];

  const words = (metadata as { words?: unknown }).words;
  if (!Array.isArray(words)) return [...DEFAULT_HERO_MORPHING_WORDS];

  const cleaned = words.map((w) => (typeof w === "string" ? w.trim() : "")).filter(Boolean);

  return cleaned.length > 0 ? cleaned : [...DEFAULT_HERO_MORPHING_WORDS];
}
