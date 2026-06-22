export const HERO_BG_THEME_KEY = "hero_bg_theme";

export type BackgroundType = "gradient" | "image" | "video";

export type HeroBgTheme = {
  primary_color: string;
  accent_color: string;
  deep_color: string;
  contrast: number;
  background_type: BackgroundType;
  background_url: string;
  background_video_loop: boolean;
};

export const DEFAULT_HERO_BG_THEME: HeroBgTheme = {
  primary_color: "#8a5cc0",
  accent_color: "#c4a8e8",
  deep_color: "#5a1a96",
  contrast: 1.0,
  background_type: "gradient",
  background_url: "",
  background_video_loop: true,
};

export function resolveHeroBgTheme(metadata: Record<string, unknown> | undefined): HeroBgTheme {
  return {
    primary_color:
      typeof metadata?.primary_color === "string" && metadata.primary_color.trim()
        ? metadata.primary_color.trim()
        : DEFAULT_HERO_BG_THEME.primary_color,
    accent_color:
      typeof metadata?.accent_color === "string" && metadata.accent_color.trim()
        ? metadata.accent_color.trim()
        : DEFAULT_HERO_BG_THEME.accent_color,
    deep_color:
      typeof metadata?.deep_color === "string" && metadata.deep_color.trim()
        ? metadata.deep_color.trim()
        : DEFAULT_HERO_BG_THEME.deep_color,
    contrast:
      typeof metadata?.contrast === "number" ? metadata.contrast : DEFAULT_HERO_BG_THEME.contrast,
    background_type:
      typeof metadata?.background_type === "string" &&
      ["gradient", "image", "video"].includes(metadata.background_type)
        ? (metadata.background_type as BackgroundType)
        : DEFAULT_HERO_BG_THEME.background_type,
    background_url:
      typeof metadata?.background_url === "string"
        ? metadata.background_url.trim()
        : DEFAULT_HERO_BG_THEME.background_url,
    background_video_loop:
      typeof metadata?.background_video_loop === "boolean"
        ? metadata.background_video_loop
        : DEFAULT_HERO_BG_THEME.background_video_loop,
  };
}
