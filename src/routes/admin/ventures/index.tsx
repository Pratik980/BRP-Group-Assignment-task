import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdminRoute } from "@/lib/admin/require-admin";
import { invalidatePublicVentures } from "@/lib/admin/invalidate-public";
import { deleteVenture, fetchVentures } from "@/lib/admin/ventures.client";

export const Route = createFileRoute("/admin/ventures/")({
  beforeLoad: requireAdminRoute,
  component: AdminVenturesPage,
});

function AdminVenturesPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: ventures = [], isLoading } = useQuery({
    queryKey: ["admin-ventures"],
    queryFn: fetchVentures,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVenture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ventures"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      void invalidatePublicVentures(queryClient);
      toast.success("Venture deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Could not delete venture"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Ventures</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage portfolio companies shown on the public Ventures page.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/ventures/new">
              <Plus className="h-4 w-4" />
              Add venture
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">All ventures ({ventures.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading ventures…
              </div>
            ) : ventures.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                <p>No ventures yet.</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/admin/ventures/new">Create your first venture</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ventures.map((venture) => (
                    <TableRow key={venture.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {venture.logo_url ? (
                            <img
                              src={venture.logo_url}
                              alt=""
                              className="h-8 w-8 rounded object-contain"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded bg-muted" />
                          )}
                          <div>
                            <p className="font-medium">{venture.name}</p>
                            <p className="text-xs text-muted-foreground">{venture.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{venture.category}</TableCell>
                      <TableCell>{venture.display_order}</TableCell>
                      <TableCell>
                        <Badge variant={venture.is_active ? "default" : "secondary"}>
                          {venture.is_active ? "Active" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/admin/ventures/$id" params={{ id: venture.id }}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(venture.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={Boolean(deleteId)} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete venture?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the venture from the CMS. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}
