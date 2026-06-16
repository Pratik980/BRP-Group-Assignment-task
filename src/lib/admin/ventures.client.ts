import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import type { VentureFormValues } from "@/lib/admin/venture-utils";

export type VentureRow = Tables<"ventures">;

function toPayload(values: VentureFormValues): TablesInsert<"ventures"> {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    tagline: values.tagline.trim() || null,
    description: values.description.trim() || null,
    category: values.category,
    external_url: values.external_url.trim() || null,
    logo_url: values.logo_url.trim() || null,
    cover_image_url: values.cover_image_url.trim() || null,
    display_order: values.display_order,
    is_active: values.is_active,
  };
}

export async function fetchVentures() {
  const { data, error } = await supabase
    .from("ventures")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchVentureById(id: string) {
  const { data, error } = await supabase.from("ventures").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Venture not found");
  return data;
}

export async function createVenture(values: VentureFormValues) {
  const { data, error } = await supabase
    .from("ventures")
    .insert(toPayload(values))
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateVenture(id: string, values: VentureFormValues) {
  const payload: TablesUpdate<"ventures"> = toPayload(values);
  const { data, error } = await supabase
    .from("ventures")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteVenture(id: string) {
  const { error } = await supabase.from("ventures").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadVentureImage(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const path = `ventures/${Date.now()}_${safeName}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export function ventureToFormValues(venture: VentureRow): VentureFormValues {
  return {
    name: venture.name,
    slug: venture.slug,
    tagline: venture.tagline ?? "",
    description: venture.description ?? "",
    category: venture.category as VentureFormValues["category"],
    external_url: venture.external_url ?? "",
    logo_url: venture.logo_url ?? "",
    cover_image_url: venture.cover_image_url ?? "",
    display_order: venture.display_order,
    is_active: venture.is_active,
  };
}
