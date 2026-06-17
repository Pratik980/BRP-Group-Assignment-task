import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import {
  DEFAULT_HERO_BG_THEME,
  resolveHeroBgTheme,
  HERO_BG_THEME_KEY,
  type HeroBgTheme,
} from "@/lib/cms/hero-bg-theme";

export { DEFAULT_HERO_BG_THEME, resolveHeroBgTheme, HERO_BG_THEME_KEY, type HeroBgTheme };

export async function fetchHeroBgTheme(): Promise<HeroBgTheme> {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", HERO_BG_THEME_KEY)
    .maybeSingle();
  if (error) throw error;
  return resolveHeroBgTheme(data?.metadata as Record<string, unknown> | undefined);
}

export async function saveHeroBgTheme(theme: HeroBgTheme): Promise<HeroBgTheme> {
  const payload: TablesInsert<"about_content"> = {
    section_key: HERO_BG_THEME_KEY,
    title: "Hero background theme",
    content: "Background color customization for the hero section.",
    metadata: { ...theme },
  };
  const { data, error } = await supabase
    .from("about_content")
    .upsert(payload, { onConflict: "section_key" })
    .select("metadata")
    .single();
  if (error) throw error;
  return data.metadata as HeroBgTheme;
}
