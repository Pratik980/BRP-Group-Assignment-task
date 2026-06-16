import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type ImpactStat = Tables<"impact_stats">;

export async function fetchImpactStats() {
  const { data, error } = await supabase
    .from("impact_stats")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createImpactStat(payload: TablesInsert<"impact_stats">) {
  const { data, error } = await supabase.from("impact_stats").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateImpactStat(id: string, payload: TablesUpdate<"impact_stats">) {
  const { data, error } = await supabase
    .from("impact_stats")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteImpactStat(id: string) {
  const { error } = await supabase.from("impact_stats").delete().eq("id", id);
  if (error) throw error;
}
