import type { QueryClient } from "@tanstack/react-query";

export function invalidatePublicVentures(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["public-ventures"] });
}

export function invalidatePublicHero(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ["public-hero"] }),
    queryClient.invalidateQueries({ queryKey: ["public-hero-morphing-words"] }),
  ]);
}

export function invalidatePublicStats(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["public-stats"] });
}

export function invalidatePublicAbout(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["public-about"] });
}

export function invalidatePublicTeam(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ["public-team-executive"] }),
    queryClient.invalidateQueries({ queryKey: ["public-team-our-team"] }),
  ]);
}

export function invalidatePublicSiteSettings(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["public-site-settings"] });
}

export function invalidatePublicCareers(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["public-careers"] });
}

export function invalidatePublicHistory(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ["public-about"] }),
  ]);
}
