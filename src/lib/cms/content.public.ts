import { supabase } from "@/integrations/supabase/client";
import { siteMeta, executiveTeam } from "@/data/brp-site-content";
import type { Tables } from "@/integrations/supabase/types";
import {
  EXECUTIVE_TEAM_MAX,
  TEAM_DEPARTMENT_EXECUTIVE,
  TEAM_DEPARTMENT_OUR_TEAM,
} from "@/lib/admin/team-constants";
import { HERO_MORPHING_WORDS_KEY, parseHeroMorphingWords, parseHeroMorphingColor, parseHeroMorphingGlow } from "@/lib/cms/hero-morphing";
import { EXECUTIVE_PHOTO_BY_NAME } from "@/lib/cms/site-assets";

export async function fetchPublicHeroSlides() {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchPublicImpactStats() {
  const { data, error } = await supabase
    .from("impact_stats")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchPublicHeroMorphingWords() {
  const { data, error } = await supabase
    .from("about_content")
    .select("metadata")
    .eq("section_key", HERO_MORPHING_WORDS_KEY)
    .maybeSingle();
  if (error || !data) return null;
  return {
    words: parseHeroMorphingWords(data.metadata),
    color: parseHeroMorphingColor(data.metadata),
    glowColor: parseHeroMorphingGlow(data.metadata),
  };
}

export async function fetchPublicAboutSection(key: string) {
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .eq("section_key", key)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function fetchPublicAboutSections(): Promise<Record<string, AboutSectionRow>> {
  const { data, error } = await supabase.from("about_content").select("*");
  if (error || !data?.length) return {};
  return Object.fromEntries(data.map((row) => [row.section_key, row]));
}

async function fetchTeamByDepartment(department: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("department", department)
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) return null;
  return data ?? [];
}

export async function fetchPublicExecutiveTeam() {
  const rows = await fetchTeamByDepartment(TEAM_DEPARTMENT_EXECUTIVE);
  if ((rows?.length ?? 0) > 0) {
    return rows.slice(0, EXECUTIVE_TEAM_MAX).map((m) => ({
      ...m,
      photo_url: m.photo_url ?? EXECUTIVE_PHOTO_BY_NAME[m.full_name] ?? null,
    }));
  }
  return executiveTeam.map((l) => ({
    id: l.name,
    full_name: l.name,
    role: l.role,
    department: TEAM_DEPARTMENT_EXECUTIVE,
    bio: l.bio,
    photo_url: EXECUTIVE_PHOTO_BY_NAME[l.name] ?? null,
    linkedin_url: null,
    display_order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  }));
}

export async function fetchPublicOurTeam() {
  return fetchTeamByDepartment(TEAM_DEPARTMENT_OUR_TEAM);
}

/** @deprecated Use fetchPublicExecutiveTeam or fetchPublicOurTeam */
export async function fetchPublicTeamMembers() {
  return fetchPublicExecutiveTeam();
}

export async function fetchPublicSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data?.length) return {};
  return Object.fromEntries(data.map((row) => [row.key, row.value]));
}

export function parseStatValue(value: string): { target: number; suffix: string } {
  const normalized = value.replace(/,/g, "");
  const match = normalized.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: "" };
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

export type PublicSiteMeta = typeof siteMeta;

export function mergeSiteMeta(settings: Record<string, string>): PublicSiteMeta {
  return {
    ...siteMeta,
    email: settings.company_email || siteMeta.email,
    phone: settings.company_phone || siteMeta.phone,
    headquarters: settings.company_address || siteMeta.headquarters,
    linkedIn: settings.linkedin_url || siteMeta.linkedIn,
    facebook: settings.facebook_url || siteMeta.facebook,
    instagram: settings.instagram_url || siteMeta.instagram,
  };
}

export type AboutSectionRow = Tables<"about_content">;
