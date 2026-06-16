import { supabase } from "@/integrations/supabase/client";
import type { TablesUpdate } from "@/integrations/supabase/types";

export async function fetchSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
}

export async function fetchSeoSettings() {
  const { data, error } = await supabase.from("seo_settings").select("*").order("page_slug");
  if (error) throw error;
  return data ?? [];
}

export async function updateSiteSetting(key: string, value: string) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}

export async function updateSeoSetting(pageSlug: string, payload: TablesUpdate<"seo_settings">) {
  const { error } = await supabase.from("seo_settings").update(payload).eq("page_slug", pageSlug);
  if (error) throw error;
}
