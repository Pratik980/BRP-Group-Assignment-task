import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import {
  EXECUTIVE_TEAM_MAX,
  TEAM_DEPARTMENT_EXECUTIVE,
  TEAM_DEPARTMENT_OUR_TEAM,
  type TeamDepartment,
} from "@/lib/admin/team-constants";

export type TeamMember = Tables<"team_members">;

export type TeamFormValues = {
  full_name: string;
  role: string;
  department: string;
  bio: string;
  photo_url: string;
  linkedin_url: string;
  display_order: number;
  is_active: boolean;
};

export const emptyTeamForm = (
  department: TeamDepartment = TEAM_DEPARTMENT_OUR_TEAM,
): TeamFormValues => ({
  full_name: "",
  role: "",
  department,
  bio: "",
  photo_url: "",
  linkedin_url: "",
  display_order: 0,
  is_active: true,
});

function toPayload(values: TeamFormValues): TablesInsert<"team_members"> {
  return {
    full_name: values.full_name.trim(),
    role: values.role.trim(),
    department: values.department.trim() || "General",
    bio: values.bio.trim() || null,
    photo_url: values.photo_url.trim() || null,
    linkedin_url: values.linkedin_url.trim() || null,
    display_order: values.display_order,
    is_active: values.is_active,
  };
}

export async function fetchTeamMembers() {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchTeamMembersByDepartment(department: TeamDepartment) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("department", department)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function countExecutiveMembers(excludeId?: string) {
  let query = supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("department", TEAM_DEPARTMENT_EXECUTIVE);
  if (excludeId) query = query.neq("id", excludeId);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function assertExecutiveSlotAvailable(values: TeamFormValues, excludeId?: string) {
  if (values.department !== TEAM_DEPARTMENT_EXECUTIVE) return;
  const count = await countExecutiveMembers(excludeId);
  if (count >= EXECUTIVE_TEAM_MAX) {
    throw new Error(
      `Executive team is limited to ${EXECUTIVE_TEAM_MAX} members. Edit an existing executive or remove one first.`,
    );
  }
}

export async function fetchTeamMemberById(id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Team member not found");
  return data;
}

export async function createTeamMember(values: TeamFormValues) {
  await assertExecutiveSlotAvailable(values);
  const { data, error } = await supabase
    .from("team_members")
    .insert(toPayload(values))
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTeamMember(id: string, values: TeamFormValues) {
  const existing = await fetchTeamMemberById(id);
  const becomingExecutive =
    values.department === TEAM_DEPARTMENT_EXECUTIVE &&
    existing.department !== TEAM_DEPARTMENT_EXECUTIVE;
  if (becomingExecutive) await assertExecutiveSlotAvailable(values, id);
  const { data, error } = await supabase
    .from("team_members")
    .update(toPayload(values))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadTeamPhoto(file: File) {
  const { uploadMediaFile } = await import("@/lib/admin/media-upload");
  return uploadMediaFile(file, "team");
}

export function teamToFormValues(member: TeamMember): TeamFormValues {
  return {
    full_name: member.full_name,
    role: member.role,
    department: member.department,
    bio: member.bio ?? "",
    photo_url: member.photo_url ?? "",
    linkedin_url: member.linkedin_url ?? "",
    display_order: member.display_order,
    is_active: member.is_active,
  };
}
