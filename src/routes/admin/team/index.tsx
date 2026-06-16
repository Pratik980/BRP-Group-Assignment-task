import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, Loader2, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EXECUTIVE_TEAM_MAX,
  TEAM_DEPARTMENT_EXECUTIVE,
  TEAM_DEPARTMENT_OUR_TEAM,
} from "@/lib/admin/team-constants";
import { invalidatePublicTeam } from "@/lib/admin/invalidate-public";
import { deleteTeamMember, fetchTeamMembersByDepartment } from "@/lib/admin/team.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/team/")({
  beforeLoad: requireAdminRoute,
  component: AdminTeamPage,
});

function TeamTable({
  members,
  onDelete,
}: {
  members: Awaited<ReturnType<typeof fetchTeamMembersByDepartment>>;
  onDelete: (id: string) => void;
}) {
  if (members.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">No members yet.</p>;
  }
  return (
    <div className="space-y-3">
      {members.map((m) => (
        <div
          key={m.id}
          className="flex flex-wrap items-center gap-4 rounded-lg border border-border/60 p-3"
        >
          {m.photo_url ? (
            <img src={m.photo_url} alt="" className="h-14 w-14 rounded-lg object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
              No photo
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium">{m.full_name}</p>
            <p className="text-sm text-muted-foreground">{m.role}</p>
          </div>
          <Badge variant={m.is_active ? "default" : "secondary"}>
            {m.is_active ? "Active" : "Hidden"}
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/team/$id" params={{ id: m.id }}>
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(m.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminTeamPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: executives = [], isLoading: loadingExec } = useQuery({
    queryKey: ["admin-team", TEAM_DEPARTMENT_EXECUTIVE],
    queryFn: () => fetchTeamMembersByDepartment(TEAM_DEPARTMENT_EXECUTIVE),
  });
  const { data: ourTeam = [], isLoading: loadingOur } = useQuery({
    queryKey: ["admin-team", TEAM_DEPARTMENT_OUR_TEAM],
    queryFn: () => fetchTeamMembersByDepartment(TEAM_DEPARTMENT_OUR_TEAM),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      void invalidatePublicTeam(queryClient);
      toast.success("Deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Could not delete"),
  });

  const canAddExecutive = executives.length < EXECUTIVE_TEAM_MAX;

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Team</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Executive team (3 max) appears above Our Team on the About page.
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                Our Executive Team ({executives.length}/{EXECUTIVE_TEAM_MAX})
              </CardTitle>
            </div>
            {canAddExecutive ? (
              <Button asChild size="sm">
                <Link to="/admin/team/new" search={{ dept: "executive" }}>
                  <Plus className="h-4 w-4" />
                  Add executive
                </Link>
              </Button>
            ) : (
              <span className="text-xs text-muted-foreground">Maximum reached</span>
            )}
          </CardHeader>
          <CardContent>
            {loadingExec ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TeamTable members={executives} onDelete={setDeleteId} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Our Team ({ourTeam.length})</CardTitle>
            </div>
            <Button asChild size="sm">
              <Link to="/admin/team/new" search={{ dept: "our-team" }}>
                <Plus className="h-4 w-4" />
                Add team member
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loadingOur ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TeamTable members={ourTeam} onDelete={setDeleteId} />
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={Boolean(deleteId)} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete team member?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}
