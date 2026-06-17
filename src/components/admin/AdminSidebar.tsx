import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  FileText,
  Heart,
  Image,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Hero", to: "/admin/hero", icon: Sparkles },
  { label: "Impact stats", to: "/admin/stats", icon: BarChart3 },
  { label: "Page content", to: "/admin/about", icon: FileText },
  { label: "Ventures", to: "/admin/ventures", icon: Briefcase },
  { label: "Team", to: "/admin/team", icon: Users },
  { label: "Community", to: "/admin/community", icon: Heart },
  { label: "Careers", to: "/admin/careers", icon: Briefcase },
  { label: "Media library", to: "/admin/media", icon: Image },
  { label: "Gallery", to: "/admin/gallery", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
] as const;

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-card">
      <div className="border-b border-border/60 px-5 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          BRP Group
        </p>
        <h1 className="font-display mt-1 text-lg text-foreground">Admin CMS</h1>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          if ("disabled" in item && item.disabled) {
            return (
              <span
                key={item.to}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground/50"
                title="Coming soon"
              >
                <Icon className="h-4 w-4" />
                {item.label}
                <span className="ml-auto text-[10px] uppercase tracking-wider">Soon</span>
              </span>
            );
          }
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
