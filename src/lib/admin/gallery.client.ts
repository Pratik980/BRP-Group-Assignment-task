import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

const GALLERY_KEY = "corporate_gallery";

export type GalleryImage = {
  src: string;
  label: string;
};

export async function fetchGallery(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", GALLERY_KEY)
    .maybeSingle();
  if (error) throw error;
  const images = (data?.metadata as any)?.images as GalleryImage[] | undefined;
  return images ?? [];
}

export async function saveGallery(images: GalleryImage[]) {
  const payload: TablesInsert<"about_content"> = {
    section_key: GALLERY_KEY,
    title: "Corporate Gallery",
    content: "Gallery images displayed on the homepage.",
    metadata: { images },
  };
  const { data, error } = await supabase
    .from("about_content")
    .upsert(payload, { onConflict: "section_key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadGalleryImage(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `gallery/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteGalleryStorageImage(url: string) {
  const path = url.replace(/.*\/storage\/v1\/object\/public\/media\//, "");
  if (!path || path === url) return;
  await supabase.storage.from("media").remove([path]);
}
