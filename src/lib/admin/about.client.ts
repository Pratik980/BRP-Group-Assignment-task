import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type AboutSection = Tables<"about_content">;

export async function fetchAboutSections() {
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .order("section_key", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAboutSection(key: string) {
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .eq("section_key", key)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Section not found");
  return data;
}

export async function upsertAboutSection(payload: TablesInsert<"about_content">) {
  const { data, error } = await supabase
    .from("about_content")
    .upsert(payload, { onConflict: "section_key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAboutSection(key: string, payload: TablesUpdate<"about_content">) {
  const { data, error } = await supabase
    .from("about_content")
    .update(payload)
    .eq("section_key", key)
    .select()
    .single();
  if (error) throw error;
  return data;
}
