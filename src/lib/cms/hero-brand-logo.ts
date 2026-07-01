export const HERO_BRAND_LOGO_KEY = "hero_brand_logo";

export const DEFAULT_HERO_BRAND_LOGO = "/site-assets/BRPGrouplogo.png";

export function resolveHeroBrandLogo(metadata: Record<string, unknown> | undefined): string | null {
  const value = metadata?.url;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}