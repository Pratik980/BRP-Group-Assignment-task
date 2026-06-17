import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "@/lib/admin/gallery.client";

export function useGallery() {
  return useQuery({
    queryKey: ["public-gallery"],
    queryFn: fetchGallery,
    staleTime: 60_000,
  });
}
