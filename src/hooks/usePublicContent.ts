import { useQuery, type QueryClient } from "@tanstack/react-query";
import {
  DEFAULT_HERO_MORPHING_WORDS,
  DEFAULT_HERO_MORPHING_COLOR,
  DEFAULT_HERO_MORPHING_GLOW,
} from "@/lib/cms/hero-morphing";
import { resolveHeroBgTheme } from "@/lib/cms/hero-bg-theme";
import { resolveHeroTextColors } from "@/lib/cms/hero-colors";
import { DEFAULT_HERO_VISUAL_CARDS } from "@/lib/cms/hero-visual-cards";
import {
  fetchPublicAboutSections,
  fetchPublicHeroBrandLogo,
  fetchPublicHeroMorphingWords,
  fetchPublicHeroSlides,
  fetchPublicHeroVisualCards,
  fetchPublicImpactStats,
  fetchPublicSiteSettings,
  fetchPublicExecutiveTeam,
  fetchPublicOurTeam,
  mergeSiteMeta,
  parseStatValue,
  fetchPublicAboutSection,
} from "@/lib/cms/content.public";
import { resolveHistoryPage, resolveHistoryLegacy, ABOUT_SECTION_KEYS } from "@/lib/cms/about-content";

const PUBLIC_CACHE = {
  staleTime: 5 * 60_000,
  gcTime: 30 * 60_000,
  refetchOnWindowFocus: false,
} as const;

const heroMorphingQuery = {
  queryKey: ["public-hero-morphing-words"] as const,
  queryFn: async () => {
    const data = await fetchPublicHeroMorphingWords();
    return (
      data ?? {
        words: [...DEFAULT_HERO_MORPHING_WORDS],
        color: DEFAULT_HERO_MORPHING_COLOR,
        glowColor: DEFAULT_HERO_MORPHING_GLOW,
      }
    );
  },
};

const heroVisualCardsQuery = {
  queryKey: ["public-hero-visual-cards"] as const,
  queryFn: async () => (await fetchPublicHeroVisualCards()) ?? DEFAULT_HERO_VISUAL_CARDS,
};

const heroBrandLogoQuery = {
  queryKey: ["public-hero-brand-logo"] as const,
  queryFn: async () => (await fetchPublicHeroBrandLogo()) ?? null,
};

export async function prefetchPublicHeroContent(queryClient: QueryClient) {
  await Promise.all([
    queryClient.ensureQueryData({
      queryKey: ["public-about"],
      queryFn: fetchPublicAboutSections,
    }),
    queryClient.ensureQueryData({
      queryKey: ["public-hero"],
      queryFn: fetchPublicHeroSlides,
    }),
    queryClient.ensureQueryData(heroVisualCardsQuery),
    queryClient.ensureQueryData(heroBrandLogoQuery),
    queryClient.ensureQueryData(heroMorphingQuery),
  ]);
}

export function usePublicHero() {
  return useQuery({ queryKey: ["public-hero"], queryFn: fetchPublicHeroSlides, ...PUBLIC_CACHE });
}

export function usePublicHeroMorphingWords() {
  return useQuery({
    ...heroMorphingQuery,
    ...PUBLIC_CACHE,
    initialData: () => ({
      words: [...DEFAULT_HERO_MORPHING_WORDS],
      color: DEFAULT_HERO_MORPHING_COLOR,
      glowColor: DEFAULT_HERO_MORPHING_GLOW,
    }),
    initialDataUpdatedAt: 0,
  });
}

export function usePublicImpactStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: fetchPublicImpactStats,
    ...PUBLIC_CACHE,
  });
}

export function usePublicExecutiveTeam() {
  return useQuery({
    queryKey: ["public-team-executive"],
    queryFn: fetchPublicExecutiveTeam,
    ...PUBLIC_CACHE,
  });
}

export function usePublicOurTeam() {
  return useQuery({
    queryKey: ["public-team-our-team"],
    queryFn: fetchPublicOurTeam,
    ...PUBLIC_CACHE,
  });
}

export function usePublicSiteMeta() {
  return useQuery({
    queryKey: ["public-site-settings"],
    queryFn: async () => mergeSiteMeta(await fetchPublicSiteSettings()),
    ...PUBLIC_CACHE,
  });
}

export function usePublicAboutSections() {
  return useQuery({
    queryKey: ["public-about"],
    queryFn: fetchPublicAboutSections,
    ...PUBLIC_CACHE,
    placeholderData: (previousData) => previousData,
  });
}

export function usePublicHeroVisualCards() {
  return useQuery({
    ...heroVisualCardsQuery,
    ...PUBLIC_CACHE,
    initialData: () => DEFAULT_HERO_VISUAL_CARDS,
    initialDataUpdatedAt: 0,
  });
}

export function usePublicHeroBrandLogo() {
  return useQuery({
    ...heroBrandLogoQuery,
    ...PUBLIC_CACHE,
  });
}

export function usePublicHeroBgTheme() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHeroBgTheme(
    aboutSections?.hero_bg_theme?.metadata as Record<string, unknown> | undefined,
  );
}

export function usePublicHeroTextColors() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHeroTextColors(
    aboutSections?.hero_text_colors?.metadata as Record<string, unknown> | undefined,
  );
}

export function usePublicHistoryPage() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHistoryPage(
    aboutSections?.history_page?.metadata as Record<string, unknown> | undefined,
  );
}

export function usePublicHistoryLegacy() {
  const { data: aboutSections } = usePublicAboutSections();
  return resolveHistoryLegacy(
    aboutSections?.history_legacy?.metadata as Record<string, unknown> | undefined,
  );
}

export { parseStatValue };
