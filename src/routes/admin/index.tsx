import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, FileText, Mail, Plus, Users, UserRound } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardStats } from "@/lib/admin/dashboard.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAdminRoute,
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { session } = Route.useRouteContext();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => fetchDashboardStats(),
  });

  const cards = [
    { label: "Ventures", value: stats?.ventures ?? 0, icon: Briefcase },
    { label: "Team members", value: stats?.teamMembers ?? 0, icon: Users },
    { label: "Blog posts", value: stats?.blogPosts ?? 0, icon: FileText },
    { label: "Unread contacts", value: stats?.unreadContacts ?? 0, icon: Mail },
    { label: "Open jobs", value: stats?.openJobs ?? 0, icon: UserRound },
  ];

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Overview of your BRP Group website content and submissions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl">{isLoading ? "—" : card.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/ventures">
                <Briefcase className="h-4 w-4" />
                Manage ventures
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/admin/ventures/new">
                <Plus className="h-4 w-4" />
                Add venture
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
