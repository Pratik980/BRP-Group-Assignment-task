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
import sidebarLogo from "@/assets/optimized/BRPGrouplogo.png";

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

const navGroups = [
  { label: "Content", items: navItems.slice(0, 9) },
  { label: "System", items: navItems.slice(9) },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border/40 bg-card">
      <div className="border-b border-border/40 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm">
            <img
              src={sidebarLogo}
              alt="BRP"
              className="h-6 w-6 object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              BRP Group
            </p>
            <h1 className="font-display text-[15px] text-foreground">Admin CMS</h1>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2.5 py-4" aria-label="Admin navigation">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.to
                  : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-primary/10 text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground/70")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
