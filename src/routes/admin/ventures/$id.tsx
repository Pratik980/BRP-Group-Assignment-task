import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { VentureForm } from "@/components/admin/VentureForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminRoute } from "@/lib/admin/require-admin";
import { invalidatePublicVentures } from "@/lib/admin/invalidate-public";
import { fetchVentureById, updateVenture, ventureToFormValues } from "@/lib/admin/ventures.client";

export const Route = createFileRoute("/admin/ventures/$id")({
  beforeLoad: requireAdminRoute,
  component: AdminEditVenturePage,
});

function AdminEditVenturePage() {
  const { session } = Route.useRouteContext();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: venture,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-venture", id],
    queryFn: () => fetchVentureById(id),
  });

  const updateMutation = useMutation({
    mutationFn: (values: Parameters<typeof updateVenture>[1]) => updateVenture(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ventures"] });
      queryClient.invalidateQueries({ queryKey: ["admin-venture", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      void invalidatePublicVentures(queryClient);
      toast.success("Venture saved");
    },
    onError: () => toast.error("Could not save venture"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/ventures">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-3xl tracking-tight">
              {venture?.name ?? "Edit venture"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Update venture details and images.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Venture details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : isError || !venture ? (
              <div className="py-8 text-sm text-muted-foreground">
                Venture not found.{" "}
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => navigate({ to: "/admin/ventures" })}
                >
                  Back to list
                </Button>
              </div>
            ) : (
              <VentureForm
                key={venture.id}
                initialValues={ventureToFormValues(venture)}
                submitLabel="Save changes"
                onCancel={() => navigate({ to: "/admin/ventures" })}
                onSubmit={async (values) => {
                  await updateMutation.mutateAsync(values);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
