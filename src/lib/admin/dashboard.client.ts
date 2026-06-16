import { supabase } from "@/integrations/supabase/client";

export type DashboardStats = {
  ventures: number;
  teamMembers: number;
  blogPosts: number;
  unreadContacts: number;
  openJobs: number;
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const nowIso = new Date().toISOString();

  const [ventures, teamMembers, blogPosts, unreadContacts, openJobs] = await Promise.all([
    supabase.from("ventures").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
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
    blogPosts.error ||
    unreadContacts.error ||
    openJobs.error;

  if (firstError) {
    console.error("[admin] dashboard stats", firstError);
    throw new Error("Could not load dashboard statistics. Ensure admin RLS policies are applied.");
  }

  return {
    ventures: ventures.count ?? 0,
    teamMembers: teamMembers.count ?? 0,
    blogPosts: blogPosts.count ?? 0,
    unreadContacts: unreadContacts.count ?? 0,
    openJobs: openJobs.count ?? 0,
  };
}
