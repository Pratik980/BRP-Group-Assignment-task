import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerForm } from "@/components/admin/CareerForm";
import { createVacancy, emptyVacancyForm } from "@/lib/admin/careers.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/careers/new")({
  beforeLoad: requireAdminRoute,
  component: AdminNewCareerPage,
});

function AdminNewCareerPage() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: Parameters<typeof createVacancy>[0]) => createVacancy(values),
    onSuccess: (vacancy) => {
      queryClient.invalidateQueries({ queryKey: ["admin-careers"] });
      toast.success("Vacancy created");
      navigate({ to: "/admin/careers/$id", params: { id: vacancy.id } });
    },
    onError: () => toast.error("Could not create vacancy"),
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
            <CardTitle className="text-base">New vacancy</CardTitle>
          </CardHeader>
          <CardContent>
            <CareerForm
              initialValues={emptyVacancyForm()}
              submitLabel="Create vacancy"
              onSubmit={async (v) => {
                await mutation.mutateAsync(v);
              }}
              onCancel={() => navigate({ to: "/admin/careers" })}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
