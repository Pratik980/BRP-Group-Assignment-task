import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { TeamForm } from "@/components/admin/TeamForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEAM_DEPARTMENT_EXECUTIVE, TEAM_DEPARTMENT_OUR_TEAM } from "@/lib/admin/team-constants";
import { invalidatePublicTeam } from "@/lib/admin/invalidate-public";
import { createTeamMember, emptyTeamForm } from "@/lib/admin/team.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/team/new")({
  validateSearch: (search: Record<string, unknown>) => ({
    dept: search.dept === "executive" ? ("executive" as const) : ("our-team" as const),
  }),
  beforeLoad: requireAdminRoute,
  component: AdminNewTeamPage,
});

function AdminNewTeamPage() {
  const { session } = Route.useRouteContext();
  const { dept } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const department = dept === "executive" ? TEAM_DEPARTMENT_EXECUTIVE : TEAM_DEPARTMENT_OUR_TEAM;
  const title = dept === "executive" ? "Add executive" : "Add team member";

  const mutation = useMutation({
    mutationFn: createTeamMember,
    onSuccess: (m) => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      void invalidatePublicTeam(queryClient);
      toast.success("Member added");
      navigate({ to: "/admin/team/$id", params: { id: m.id } });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not create"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/team">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamForm
              initialValues={emptyTeamForm(department)}
              submitLabel="Create member"
              lockDepartment
              onCancel={() => navigate({ to: "/admin/team" })}
              onSubmit={(v) => mutation.mutateAsync(v)}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
