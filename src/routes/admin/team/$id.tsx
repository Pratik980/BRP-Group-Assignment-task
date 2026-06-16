import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { TeamForm } from "@/components/admin/TeamForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invalidatePublicTeam } from "@/lib/admin/invalidate-public";
import { fetchTeamMemberById, teamToFormValues, updateTeamMember } from "@/lib/admin/team.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/team/$id")({
  beforeLoad: requireAdminRoute,
  component: AdminEditTeamPage,
});

function AdminEditTeamPage() {
  const { session } = Route.useRouteContext();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: member, isLoading } = useQuery({
    queryKey: ["admin-team", id],
    queryFn: () => fetchTeamMemberById(id),
  });
  const mutation = useMutation({
    mutationFn: (values: Parameters<typeof updateTeamMember>[1]) => updateTeamMember(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      void invalidatePublicTeam(queryClient);
      toast.success("Saved");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not save"),
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
            <CardTitle className="text-base">{member?.full_name ?? "Edit member"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || !member ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TeamForm
                key={member.id}
                initialValues={teamToFormValues(member)}
                submitLabel="Save changes"
                onCancel={() => navigate({ to: "/admin/team" })}
                onSubmit={(v) => mutation.mutateAsync(v)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
