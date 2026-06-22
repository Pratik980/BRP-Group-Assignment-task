import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageLayout, AdminCard } from "@/components/admin/AdminPageLayout";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchVacancies, deleteVacancy } from "@/lib/admin/careers.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/careers/")({
  beforeLoad: requireAdminRoute,
  component: AdminCareersPage,
});

function AdminCareersPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: vacancies = [], isLoading } = useQuery({
    queryKey: ["admin-careers"],
    queryFn: fetchVacancies,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      toast.success("Vacancy deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Could not delete"),
  });

  return (
    <AdminShell email={session.user.email}>
      <AdminPageLayout
        title="Careers"
        description="Manage job vacancies and listings."
        actions={
          <Button asChild>
            <Link to="/admin/careers/new">
              <Plus className="h-4 w-4" />
              Add vacancy
            </Link>
          </Button>
        }
      >
        <AdminCard title={`Vacancies (${vacancies.length})`}>
          {isLoading ? (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : vacancies.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No vacancies yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vacancies.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.title}</TableCell>
                    <TableCell>{v.department}</TableCell>
                    <TableCell>{v.employment_type}</TableCell>
                    <TableCell>
                      <Badge variant={v.is_active && v.status === "open" ? "default" : "secondary"}>
                        {v.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {v.application_deadline
                        ? new Date(v.application_deadline).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/careers/$id" params={{ id: v.id }}>
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setDeleteId(v.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </AdminCard>
      </AdminPageLayout>
      <AlertDialog open={Boolean(deleteId)} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete vacancy?</AlertDialogTitle>
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
