import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { VentureForm } from "@/components/admin/VentureForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminRoute } from "@/lib/admin/require-admin";
import { emptyVentureForm } from "@/lib/admin/venture-utils";
import { invalidatePublicVentures } from "@/lib/admin/invalidate-public";
import { createVenture } from "@/lib/admin/ventures.client";

export const Route = createFileRoute("/admin/ventures/new")({
  beforeLoad: requireAdminRoute,
  component: AdminNewVenturePage,
});

function AdminNewVenturePage() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createVenture,
    onSuccess: (venture) => {
      queryClient.invalidateQueries({ queryKey: ["admin-ventures"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      void invalidatePublicVentures(queryClient);
      toast.success("Venture created");
      navigate({ to: "/admin/ventures/$id", params: { id: venture.id } });
    },
    onError: () => toast.error("Could not create venture"),
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
            <h1 className="font-display text-3xl tracking-tight">New venture</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a portfolio company to the site.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Venture details</CardTitle>
          </CardHeader>
          <CardContent>
            <VentureForm
              initialValues={emptyVentureForm()}
              submitLabel="Create venture"
              onCancel={() => navigate({ to: "/admin/ventures" })}
              onSubmit={async (values) => {
                await createMutation.mutateAsync(values);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
