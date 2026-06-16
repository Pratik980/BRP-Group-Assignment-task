import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicVentures,
  getStaticPublicVentures,
  PUBLIC_VENTURES_QUERY_KEY,
} from "@/lib/cms/ventures.public";

export { PUBLIC_VENTURES_QUERY_KEY };

export function usePublicVentures() {
  return useQuery({
    queryKey: PUBLIC_VENTURES_QUERY_KEY,
    queryFn: fetchPublicVentures,
    initialData: getStaticPublicVentures,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
  });
}
