import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { invalidatePublicStats } from "@/lib/admin/invalidate-public";
import {
  createImpactStat,
  deleteImpactStat,
  fetchImpactStats,
  updateImpactStat,
} from "@/lib/admin/stats.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/stats/")({
  beforeLoad: requireAdminRoute,
  component: AdminStatsPage,
});

function AdminStatsPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchImpactStats,
  });
  const [draft, setDraft] = useState({ label: "", value: "", display_order: 0, is_active: true });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    void invalidatePublicStats(queryClient);
  };

  const createMutation = useMutation({
    mutationFn: () => createImpactStat(draft),
    onSuccess: () => {
      invalidate();
      setDraft({ label: "", value: "", display_order: 0, is_active: true });
      toast.success("Stat added");
    },
    onError: () => toast.error("Could not add stat"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Impact stats</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Numbers shown in the homepage hero (e.g. 45+, 1000+).
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add stat</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                value={draft.value}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                placeholder="45+"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              stats.map((stat) => <StatRow key={stat.id} stat={stat} onSaved={invalidate} />)
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function StatRow({
  stat,
  onSaved,
}: {
  stat: Awaited<ReturnType<typeof fetchImpactStats>>[number];
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    label: stat.label,
    value: stat.value,
    display_order: stat.display_order,
    is_active: stat.is_active,
  });
  const save = useMutation({
    mutationFn: () => updateImpactStat(stat.id, form),
    onSuccess: () => {
      onSaved();
      toast.success("Saved");
    },
    onError: () => toast.error("Save failed"),
  });
  const del = useMutation({
    mutationFn: () => deleteImpactStat(stat.id),
    onSuccess: () => {
      onSaved();
      toast.success("Deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_120px_80px_auto_auto] md:items-end">
      <div className="space-y-1">
        <Label className="text-xs">Label</Label>
        <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Value</Label>
        <Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Order</Label>
        <Input
          type="number"
          value={form.display_order}
          onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) || 0 })}
        />
      </div>
      <div className="flex items-center gap-2 pb-1">
        <Switch
          checked={form.is_active}
          onCheckedChange={(c) => setForm({ ...form, is_active: c })}
        />
        <span className="text-xs">Active</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => save.mutate()} disabled={save.isPending}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={() => del.mutate()} disabled={del.isPending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
