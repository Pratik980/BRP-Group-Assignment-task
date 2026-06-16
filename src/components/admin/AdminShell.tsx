import { Link } from "@tanstack/react-router";
import { ExternalLink, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { signOutAdmin } from "@/lib/admin/session";

type AdminShellProps = {
  email?: string | null;
  children: React.ReactNode;
};

export function AdminShell({ email, children }: AdminShellProps) {
  async function handleLogout() {
    try {
      await signOutAdmin();
      toast.success("Signed out");
      window.location.href = "/admin/login";
    } catch {
      toast.error("Could not sign out");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30 text-foreground">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background px-6">
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{email ?? "Admin"}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                View site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
