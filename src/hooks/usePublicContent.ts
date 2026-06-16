import { useQuery } from "@tanstack/react-query";
import { DEFAULT_HERO_MORPHING_WORDS } from "@/lib/cms/hero-morphing";
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
      const words = await fetchPublicHeroMorphingWords();
      return words ?? [...DEFAULT_HERO_MORPHING_WORDS];
    },
    initialData: () => [...DEFAULT_HERO_MORPHING_WORDS],
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

export { parseStatValue };
