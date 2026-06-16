import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import type { GalleryImage, CtaButton } from "@/lib/cms/about-content";
import { communityPage } from "@/data/brp-site-content";

export const COMMUNITY_SECTION_KEY = "community_page";

export type CommunityPageRow = Tables<"about_content">;

export type CommunityFormValues = {
  heroTitle: string;
  heroIntro: string;
  heroHeadline: string;
  heroLocation: string;
  highlights: { value: string; label: string }[];
  sections: { headline: string; paragraphs: string[]; imageUrl?: string }[];
  initiativesBadge: string;
  initiativesTitle: string;
  initiativesDescription: string;
  galleryBadge: string;
  galleryTitle: string;
  galleryImages: GalleryImage[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtons: CtaButton[];
};

export async function fetchCommunityPage() {
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .eq("section_key", COMMUNITY_SECTION_KEY)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export function toFormValues(row: CommunityPageRow | null): CommunityFormValues {
  if (!row)
    return {
      heroTitle: communityPage.heroTitle,
      heroIntro: communityPage.heroIntro,
      heroHeadline: communityPage.heroHeadline,
      heroLocation: communityPage.heroLocation,
      highlights: communityPage.highlights.map((h) => ({ ...h })),
      sections: communityPage.sections.map((s) => ({
        headline: s.headline,
        paragraphs: [...s.paragraphs],
      })),
      initiativesBadge: communityPage.initiativesBadge,
      initiativesTitle: communityPage.initiativesTitle,
      initiativesDescription: communityPage.initiativesDescription,
      galleryBadge: communityPage.galleryBadge,
      galleryTitle: communityPage.galleryTitle,
      galleryImages: communityPage.galleryImages.map((i) => ({ ...i })),
      ctaTitle: communityPage.ctaTitle,
      ctaDescription: communityPage.ctaDescription,
      ctaButtons: communityPage.ctaButtons.map((b) => ({ ...b })),
    };
  const metadata = (row.metadata ?? {}) as Record<string, unknown>;
  return {
    heroTitle: row.title?.trim() || communityPage.heroTitle,
    heroIntro: row.content?.trim() || communityPage.heroIntro,
    heroHeadline: (metadata.heroHeadline as string)?.trim() || communityPage.heroHeadline,
    heroLocation: (metadata.heroLocation as string)?.trim() || communityPage.heroLocation,
    highlights:
      (metadata.highlights as CommunityFormValues["highlights"]) ??
      communityPage.highlights.map((h) => ({ ...h })),
    sections:
      (metadata.sections as CommunityFormValues["sections"]) ??
      communityPage.sections.map((s) => ({
        headline: s.headline,
        paragraphs: [...s.paragraphs],
      })),
    initiativesBadge:
      (metadata.initiativesBadge as string)?.trim() || communityPage.initiativesBadge,
    initiativesTitle:
      (metadata.initiativesTitle as string)?.trim() || communityPage.initiativesTitle,
    initiativesDescription:
      (metadata.initiativesDescription as string)?.trim() || communityPage.initiativesDescription,
    galleryBadge: (metadata.galleryBadge as string)?.trim() || communityPage.galleryBadge,
    galleryTitle: (metadata.galleryTitle as string)?.trim() || communityPage.galleryTitle,
    galleryImages:
      (metadata.galleryImages as CommunityFormValues["galleryImages"]) ??
      communityPage.galleryImages.map((i) => ({ ...i })),
    ctaTitle: (metadata.ctaTitle as string)?.trim() || communityPage.ctaTitle,
    ctaDescription: (metadata.ctaDescription as string)?.trim() || communityPage.ctaDescription,
    ctaButtons:
      (metadata.ctaButtons as CommunityFormValues["ctaButtons"]) ??
      communityPage.ctaButtons.map((b) => ({ ...b })),
  };
}

export async function uploadGalleryImage(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `community/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { cacheControl: "3600" });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveCommunityPage(values: CommunityFormValues) {
  const payload: TablesInsert<"about_content"> = {
    section_key: COMMUNITY_SECTION_KEY,
    title: values.heroTitle,
    content: values.heroIntro,
    metadata: {
      heroHeadline: values.heroHeadline,
      heroLocation: values.heroLocation,
      highlights: values.highlights,
      sections: values.sections,
      initiativesBadge: values.initiativesBadge,
      initiativesTitle: values.initiativesTitle,
      initiativesDescription: values.initiativesDescription,
      galleryBadge: values.galleryBadge,
      galleryTitle: values.galleryTitle,
      galleryImages: values.galleryImages,
      ctaTitle: values.ctaTitle,
      ctaDescription: values.ctaDescription,
      ctaButtons: values.ctaButtons,
    },
  };
  const { data, error } = await supabase
    .from("about_content")
    .upsert(payload, { onConflict: "section_key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
