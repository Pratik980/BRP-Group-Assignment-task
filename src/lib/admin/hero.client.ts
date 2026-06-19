import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { HERO_MORPHING_WORDS_KEY, parseHeroMorphingWords, parseHeroMorphingColor, parseHeroMorphingGlow, DEFAULT_HERO_MORPHING_COLOR, DEFAULT_HERO_MORPHING_GLOW } from "@/lib/cms/hero-morphing";

export type HeroSlide = Tables<"hero_slides">;

export async function fetchHeroSlides() {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchHeroSlideById(id: string) {
  const { data, error } = await supabase.from("hero_slides").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Slide not found");
  return data;
}

export async function createHeroSlide(payload: TablesInsert<"hero_slides">) {
  const { data, error } = await supabase.from("hero_slides").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateHeroSlide(id: string, payload: TablesUpdate<"hero_slides">) {
  const { data, error } = await supabase
    .from("hero_slides")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteHeroSlide(id: string) {
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchHeroMorphingWords() {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", HERO_MORPHING_WORDS_KEY)
    .maybeSingle();
  if (error) throw error;
  return {
    words: parseHeroMorphingWords(data?.metadata),
    color: parseHeroMorphingColor(data?.metadata),
    glowColor: parseHeroMorphingGlow(data?.metadata),
  };
}

export async function saveHeroMorphingWords(words: string[], color: string, glowColor: string) {
  const cleaned = words.map((w) => w.trim()).filter(Boolean);
  if (cleaned.length === 0) throw new Error("Add at least one word");

  const { data, error } = await supabase
    .from("about_content")
    .upsert(
      {
        section_key: HERO_MORPHING_WORDS_KEY,
        title: "Hero rotating words",
        content: 'Words that cycle in the homepage hero headline after "Through Diversified".',
        metadata: { words: cleaned, color: color || DEFAULT_HERO_MORPHING_COLOR, glowColor: glowColor || DEFAULT_HERO_MORPHING_GLOW },
      },
      { onConflict: "section_key" },
    )
    .select("metadata")
    .single();
  if (error) throw error;
  return {
    words: parseHeroMorphingWords(data.metadata),
    color: parseHeroMorphingColor(data.metadata),
    glowColor: parseHeroMorphingGlow(data.metadata),
  };
}

export async function fetchHeroVisualCards() {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", "hero_visual_cards")
    .maybeSingle();
  if (error) throw error;
  return data?.metadata?.cards || null;
}

export async function saveHeroVisualCards(cards: any[]) {
  const { data, error } = await supabase
    .from("about_content")
    .upsert(
      {
        section_key: "hero_visual_cards",
        title: "Hero visual cards",
        content: "The 6 cards shown in the homepage hero section.",
        metadata: { cards },
      },
      { onConflict: "section_key" },
    )
    .select("metadata")
    .single();
  if (error) throw error;
  return data?.metadata?.cards || null;
}

export async function uploadHeroImage(file: File) {
  const { uploadMediaFile } = await import("@/lib/admin/media-upload");
  return uploadMediaFile(file, "hero");
}
