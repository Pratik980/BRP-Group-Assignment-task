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
    { label: "Ventures", value: stats?.ventures ?? 0, icon: Briefcase, color: "text-blue-500" },
    {
      label: "Team members",
      value: stats?.teamMembers ?? 0,
      icon: Users,
      color: "text-emerald-500",
    },
    {
      label: "Unread contacts",
      value: stats?.unreadContacts ?? 0,
      icon: Mail,
      color: "text-amber-500",
    },
    { label: "Open jobs", value: stats?.openJobs ?? 0, icon: UserRound, color: "text-rose-500" },
  ];

  const chartColors = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e"];
  const chartData = statCards.map((s, i) => ({
    name: s.label,
    value: statsLoading ? 0 : s.value,
    fill: chartColors[i],
  }));

  const unreadCount = recentContacts?.filter((c) => !c.is_read).length ?? 0;

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Overview of your BRP Group website content and submissions.
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/admin/ventures/new">
              <Plus className="h-4 w-4" />
              New venture
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl">{statsLoading ? "—" : card.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                Content overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                  Loading chart…
                </div>
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: 13,
                        }}
                        formatter={(value: number) => [value, "Count"]}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                        {chartData.map((entry, idx) => (
                          <Cell key={idx} fill={chartColors[idx]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Recent contacts
                </span>
                {unreadCount > 0 && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(() => {
                if (!recentContacts) {
                  return <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>;
                }
                if (recentContacts.length === 0) {
                  return (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No contacts yet.
                    </p>
                  );
                }
                return recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="group rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 transition-colors hover:bg-background"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-foreground">
                            {contact.name}
                          </span>
                          {!contact.is_read && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {contact.subject || contact.email}
                        </p>
                      </div>
                      <time className="shrink-0 text-[10px] text-muted-foreground">
                        {formatRelativeDate(contact.created_at)}
                      </time>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground/70">
                      {contact.message}
                    </p>
                  </div>
                ));
              })()}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                Quick actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-stretch gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.to}
                      asChild
                      variant="outline"
                      className="flex flex-1 flex-col items-center gap-1.5 px-2 py-3 text-xs h-auto"
                    >
                      <Link to={action.to}>
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-center leading-tight">{action.label}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
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
