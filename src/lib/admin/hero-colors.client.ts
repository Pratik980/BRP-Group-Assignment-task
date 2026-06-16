import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import {
  DEFAULT_HERO_TEXT_COLORS,
  resolveHeroTextColors,
  type HeroTextColors,
} from "@/lib/cms/hero-colors";

export { DEFAULT_HERO_TEXT_COLORS, resolveHeroTextColors, type HeroTextColors };

export const HERO_TEXT_COLORS_KEY = "hero_text_colors";

export async function fetchHeroTextColors(): Promise<HeroTextColors> {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", HERO_TEXT_COLORS_KEY)
    .maybeSingle();
  if (error) throw error;
  return resolveHeroTextColors(data?.metadata as Record<string, unknown> | undefined);
}

export async function saveHeroTextColors(colors: HeroTextColors): Promise<HeroTextColors> {
  const payload: TablesInsert<"about_content"> = {
    section_key: HERO_TEXT_COLORS_KEY,
    title: "Hero text colors",
    content: "Color customization for homepage hero text elements.",
    metadata: { ...colors },
  };
  const { data, error } = await supabase
    .from("about_content")
    .upsert(payload, { onConflict: "section_key" })
    .select("metadata")
    .single();
  if (error) throw error;
  return data.metadata as HeroTextColors;
}
