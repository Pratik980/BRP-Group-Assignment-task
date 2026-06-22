export type HeroTextColors = {
  headline_color: string;
  subheadline_color: string;
  cta_text_color: string;
  cta_bg_color: string;
  cta_icon_color: string;
};

export const DEFAULT_HERO_TEXT_COLORS: HeroTextColors = {
  headline_color: "#ffffff",
  subheadline_color: "rgba(255,255,255,0.85)",
  cta_text_color: "#ffffff",
  cta_bg_color: "#ff7a2f",
  cta_icon_color: "#ffffff",
};

const STALE_HERO_COLORS = new Set([
  "rgba(255,140,60,0.38)",
  "rgba(255,140,60,0.18)",
  "rgba(255,170,80,0.38)",
  "#ff8c3c",
  "#ff8c42",
  "#e67e43",
]);

function sanitizeColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed || STALE_HERO_COLORS.has(trimmed.toLowerCase())) return fallback;
  return trimmed;
}

export function resolveHeroTextColors(
  metadata: Record<string, unknown> | undefined,
): HeroTextColors {
  return {
    headline_color: sanitizeColor(
      metadata?.headline_color,
      DEFAULT_HERO_TEXT_COLORS.headline_color,
    ),
    subheadline_color: sanitizeColor(
      metadata?.subheadline_color,
      DEFAULT_HERO_TEXT_COLORS.subheadline_color,
    ),
    cta_text_color: sanitizeColor(
      metadata?.cta_text_color,
      DEFAULT_HERO_TEXT_COLORS.cta_text_color,
    ),
    cta_bg_color: sanitizeColor(metadata?.cta_bg_color, DEFAULT_HERO_TEXT_COLORS.cta_bg_color),
    cta_icon_color: sanitizeColor(
      metadata?.cta_icon_color,
      DEFAULT_HERO_TEXT_COLORS.cta_icon_color,
    ),
  };
}
