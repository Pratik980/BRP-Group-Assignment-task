import { supabase } from "@/integrations/supabase/client";

export type DashboardStats = {
  ventures: number;
  teamMembers: number;
  unreadContacts: number;
  openJobs: number;
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const nowIso = new Date().toISOString();

  const [ventures, teamMembers, unreadContacts, openJobs] = await Promise.all([
    supabase.from("ventures").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
    supabase
      .from("job_vacancies")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("status", "open")
      .gte("application_deadline", nowIso),
  ]);

  const firstError =
    ventures.error ||
    teamMembers.error ||
    unreadContacts.error ||
    openJobs.error;

  if (firstError) {
    console.error("[admin] dashboard stats", firstError);
    throw new Error("Could not load dashboard statistics. Ensure admin RLS policies are applied.");
  }

  return {
    ventures: ventures.count ?? 0,
    teamMembers: teamMembers.count ?? 0,
    unreadContacts: unreadContacts.count ?? 0,
    openJobs: openJobs.count ?? 0,
  };
}

export type RecentContact = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
};

export async function fetchRecentContacts(): Promise<RecentContact[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, email, subject, message, created_at, is_read")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("[admin] recent contacts", error);
    throw new Error("Could not load recent contact submissions.");
  }

  return data ?? [];
}
