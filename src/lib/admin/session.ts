import { supabase } from "@/integrations/supabase/client";

export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("[admin] getSession failed", error);
    return null;
  }
  return data.session;
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
