import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type {
  HistoryPageContent,
  HistoryLegacyContent,
} from "@/lib/cms/about-content";
import { ABOUT_SECTION_KEYS } from "@/lib/cms/about-content";

export async function fetchHistoryPage(): Promise<HistoryPageContent | null> {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", ABOUT_SECTION_KEYS.HISTORY_PAGE)
    .maybeSingle();
  if (error || !data?.metadata) return null;
  return (data.metadata as unknown as HistoryPageContent) ?? null;
}

export async function fetchHistoryLegacy(): Promise<HistoryLegacyContent | null> {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", ABOUT_SECTION_KEYS.HISTORY_LEGACY)
    .maybeSingle();
  if (error || !data?.metadata) return null;
  return (data.metadata as unknown as HistoryLegacyContent) ?? null;
}

export async function saveHistoryPage(
  content: HistoryPageContent,
): Promise<void> {
  const { error } = await supabase.from("about_content").upsert(
    {
      section_key: ABOUT_SECTION_KEYS.HISTORY_PAGE,
      title: "History page",
      content: null,
      metadata: content as unknown as Json,
    },
    { onConflict: "section_key" },
  );
  if (error) throw error;
}

export async function saveHistoryLegacy(
  content: HistoryLegacyContent,
): Promise<void> {
  const { error } = await supabase.from("about_content").upsert(
    {
      section_key: ABOUT_SECTION_KEYS.HISTORY_LEGACY,
      title: "History legacy section",
      content: null,
      metadata: content as unknown as Json,
    },
    { onConflict: "section_key" },
  );
  if (error) throw error;
}

export async function uploadHistoryImage(file: File) {
  const { uploadMediaFile } = await import("@/lib/admin/media-upload");
  return uploadMediaFile(file, "history");
}
