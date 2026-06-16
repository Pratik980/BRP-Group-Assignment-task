import { redirect } from "@tanstack/react-router";
import { getAdminSession } from "@/lib/admin/session";

export async function requireAdminRoute() {
  const session = await getAdminSession();
  if (!session) {
    throw redirect({ to: "/admin/login" });
  }
  return { session };
}
