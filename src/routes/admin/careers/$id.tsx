import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerForm } from "@/components/admin/CareerForm";
import { fetchVacancyById, updateVacancy, vacancyToFormValues } from "@/lib/admin/careers.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/careers/$id")({
  beforeLoad: requireAdminRoute,
  component: AdminEditCareerPage,
});

function AdminEditCareerPage() {
  const { session } = Route.useRouteContext();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vacancy, isLoading } = useQuery({
    queryKey: ["admin-career", id],
    queryFn: () => fetchVacancyById(id),
  });

  const mutation = useMutation({
    mutationFn: (values: Parameters<typeof updateVacancy>[1]) => updateVacancy(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-career", id] });
      toast.success("Saved");
    },
    onError: () => toast.error("Could not save"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/careers">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit vacancy</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : vacancy ? (
              <CareerForm
                initialValues={vacancyToFormValues(vacancy)}
                submitLabel="Save changes"
                onSubmit={async (v) => {
                  await mutation.mutateAsync(v);
                }}
                onCancel={() => navigate({ to: "/admin/careers" })}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Vacancy not found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
