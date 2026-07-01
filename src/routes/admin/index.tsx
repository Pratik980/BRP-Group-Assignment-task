import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Heart,
  Image,
  LayoutDashboard,
  Mail,
  Plus,
  Settings,
  Sparkles,
  UserRound,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchDashboardStats, fetchRecentContacts } from "@/lib/admin/dashboard.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAdminRoute,
  component: AdminDashboardPage,
});

const quickActions = [
  { label: "Hero slides", to: "/admin/hero", icon: Sparkles },
  { label: "Impact stats", to: "/admin/stats", icon: BarChart3 },
  { label: "Page content", to: "/admin/about", icon: BookOpen },
  { label: "Ventures", to: "/admin/ventures", icon: Briefcase },
  { label: "Team", to: "/admin/team", icon: Users },
  { label: "Community", to: "/admin/community", icon: Heart },
  { label: "Careers", to: "/admin/careers", icon: UserRound },
  { label: "Gallery", to: "/admin/gallery", icon: Image },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const CARD_COLORS = [
  {
    border: "border-l-blue-500",
    bg: "bg-blue-500/10",
    icon: "text-blue-500",
    value: "text-blue-400",
  },
  {
    border: "border-l-emerald-500",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-500",
    value: "text-emerald-400",
  },
  {
    border: "border-l-amber-500",
    bg: "bg-amber-500/10",
    icon: "text-amber-500",
    value: "text-amber-400",
  },
  {
    border: "border-l-rose-500",
    bg: "bg-rose-500/10",
    icon: "text-rose-500",
    value: "text-rose-400",
  },
];

const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e"];

function AdminDashboardPage() {
  const { session } = Route.useRouteContext();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => fetchDashboardStats(),
  });

  const { data: recentContacts } = useQuery({
    queryKey: ["admin-recent-contacts"],
    queryFn: () => fetchRecentContacts(),
  });

  const statCards = [
    { label: "Ventures", value: stats?.ventures ?? 0, icon: Briefcase },
    { label: "Team members", value: stats?.teamMembers ?? 0, icon: Users },
    { label: "Unread contacts", value: stats?.unreadContacts ?? 0, icon: Mail },
    { label: "Open jobs", value: stats?.openJobs ?? 0, icon: UserRound },
  ];

  const chartData = statCards.map((s, i) => ({
    name: s.label,
    value: statsLoading ? 0 : s.value,
    fill: CHART_COLORS[i],
  }));

  const unreadCount = recentContacts?.filter((c) => !c.is_read).length ?? 0;

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Overview of your B.R.P. Group website content and submissions.
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/admin/ventures/new">
              <Plus className="h-4 w-4" />
              New venture
            </Link>
          </Button>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            const colors = CARD_COLORS[i];
            return (
              <Card
                key={card.label}
                className={cn(
                  "border-l-4 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                  colors.border,
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                  <div className={cn("rounded-lg p-2", colors.bg)}>
                    <Icon className={cn("h-4 w-4", colors.icon)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={cn("font-display text-3xl tracking-tight", colors.value)}>
                    {statsLoading ? (
                      <span className="animate-pulse text-muted-foreground/30"> - </span>
                    ) : (
                      card.value
                    )}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Content chart + Recent contacts ── */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="rounded-md bg-primary/10 p-1.5">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                Content overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                  Loading chart...
                </div>
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
                      <defs>
                        {CHART_COLORS.map((color, idx) => (
                          <linearGradient
                            key={idx}
                            id={`barGrad${idx}`}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor={color} stopOpacity={0.85} />
                            <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        width={110}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: 13,
                          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        }}
                        formatter={(value: number) => [value, "Count"]}
                        cursor={{ fill: "hsl(var(--muted)/0.3)" }}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
                        {chartData.map((entry, idx) => (
                          <Cell key={idx} fill={`url(#barGrad${idx})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent contacts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-1.5">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  Recent contacts
                </span>
                {unreadCount > 0 && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(() => {
                if (!recentContacts) {
                  return (
                    <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
                  );
                }
                if (recentContacts.length === 0) {
                  return (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No contacts yet.
                    </p>
                  );
                }
                return recentContacts.map((contact) => {
                  const initials = contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <div
                      key={contact.id}
                      className={cn(
                        "group rounded-lg border px-3 py-2.5 transition-all duration-200 hover:shadow-sm",
                        contact.is_read
                          ? "border-border/40 bg-background/40"
                          : "border-primary/20 bg-primary/[0.03]",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-wide",
                            contact.is_read
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary/15 text-primary",
                          )}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium text-foreground">
                                {contact.name}
                              </span>
                              {!contact.is_read && (
                                <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-primary align-middle" />
                              )}
                            </div>
                            <time className="shrink-0 text-[10px] text-muted-foreground">
                              {formatRelativeDate(contact.created_at)}
                            </time>
                          </div>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {contact.subject || contact.email}
                          </p>
                          <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground/70">
                            {contact.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </CardContent>
          </Card>
        </div>

        {/* ── Quick actions ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-1.5">
                <LayoutDashboard className="h-4 w-4 text-primary" />
              </div>
              Quick actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-2 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-sm"
                  >
                    <div className="rounded-lg bg-muted/60 p-2 transition-colors group-hover:bg-primary/10">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 text-right">
              <Button variant="ghost" size="sm" className="text-xs gap-1" asChild>
                <Link to="/admin/settings">
                  All settings
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function formatRelativeDate(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
