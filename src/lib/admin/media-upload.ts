import { supabase } from "@/integrations/supabase/client";
import { compressImageForUpload } from "@/lib/media/compress-image";
import { MEDIA_CACHE_CONTROL } from "@/lib/media/constants";

export async function uploadMediaFile(file: File, folder: string): Promise<string> {
  const compressed = await compressImageForUpload(file);
  const safeName = compressed.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `${folder}/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage.from("media").upload(path, compressed, {
    cacheControl: MEDIA_CACHE_CONTROL,
    contentType: compressed.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
