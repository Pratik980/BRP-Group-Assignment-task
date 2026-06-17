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
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/95 backdrop-blur-sm px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-1 rounded-full bg-primary" />
              <span className="text-sm font-medium text-foreground/70">
                {email ?? "Admin"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                View site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
