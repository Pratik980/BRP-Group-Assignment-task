import { useQuery } from "@tanstack/react-query";
import { DEFAULT_HERO_MORPHING_WORDS, DEFAULT_HERO_MORPHING_COLOR, DEFAULT_HERO_MORPHING_GLOW } from "@/lib/cms/hero-morphing";
import { DEFAULT_HERO_BG_THEME, resolveHeroBgTheme } from "@/lib/cms/hero-bg-theme";
import { DEFAULT_HERO_TEXT_COLORS, resolveHeroTextColors } from "@/lib/cms/hero-colors";
import {
  fetchPublicAboutSections,
  fetchPublicHeroMorphingWords,
  fetchPublicHeroSlides,
  fetchPublicImpactStats,
  fetchPublicSiteSettings,
  fetchPublicExecutiveTeam,
  fetchPublicOurTeam,
  mergeSiteMeta,
  parseStatValue,
} from "@/lib/cms/content.public";

export function usePublicHero() {
  return useQuery({ queryKey: ["public-hero"], queryFn: fetchPublicHeroSlides, staleTime: 60_000 });
}

export function usePublicHeroMorphingWords() {
  return useQuery({
    queryKey: ["public-hero-morphing-words"],
    queryFn: async () => {
      const data = await fetchPublicHeroMorphingWords();
      return data ?? { words: [...DEFAULT_HERO_MORPHING_WORDS], color: DEFAULT_HERO_MORPHING_COLOR, glowColor: DEFAULT_HERO_MORPHING_GLOW };
    },
    initialData: () => ({ words: [...DEFAULT_HERO_MORPHING_WORDS], color: DEFAULT_HERO_MORPHING_COLOR, glowColor: DEFAULT_HERO_MORPHING_GLOW }),
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
}

export function usePublicImpactStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: fetchPublicImpactStats,
    staleTime: 60_000,
  });
}

export function usePublicExecutiveTeam() {
  return useQuery({
    queryKey: ["public-team-executive"],
    queryFn: fetchPublicExecutiveTeam,
    staleTime: 60_000,
  });
}

export function usePublicOurTeam() {
  return useQuery({
    queryKey: ["public-team-our-team"],
    queryFn: fetchPublicOurTeam,
    staleTime: 60_000,
  });
}

export function usePublicSiteMeta() {
  return useQuery({
    queryKey: ["public-site-settings"],
    queryFn: async () => mergeSiteMeta(await fetchPublicSiteSettings()),
    staleTime: 60_000,
  });
}

export function usePublicAboutSections() {
  return useQuery({
    queryKey: ["public-about"],
    queryFn: fetchPublicAboutSections,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function usePublicHeroBgTheme() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHeroBgTheme(aboutSections?.hero_bg_theme?.metadata as Record<string, unknown> | undefined);
}

export function usePublicHeroTextColors() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHeroTextColors(aboutSections?.hero_text_colors?.metadata as Record<string, unknown> | undefined);
}

export { parseStatValue };
