import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fetchHeroSlideById, updateHeroSlide } from "@/lib/admin/hero.client";
import { parseHeroHeadline, serializeHeroHeadline } from "@/lib/cms/hero-morphing";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/hero/$id")({
  beforeLoad: requireAdminRoute,
  component: AdminEditHeroPage,
});

function AdminEditHeroPage() {
  const { session } = Route.useRouteContext();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: slide, isLoading } = useQuery({
    queryKey: ["admin-hero", id],
    queryFn: () => fetchHeroSlideById(id),
  });
  const [form, setForm] = useState({
    headlineLine1: "",
    headlineLine2: "",
    subheadline: "",
    cta_text: "",
    cta_url: "",
    background_image_url: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (!slide) return;
    const { line1, line2 } = parseHeroHeadline(slide.headline);
    setForm({
      headlineLine1: line1,
      headlineLine2: line2,
      subheadline: slide.subheadline ?? "",
      cta_text: slide.cta_text ?? "",
      cta_url: slide.cta_url ?? "",
      background_image_url: slide.background_image_url ?? "",
      display_order: slide.display_order,
      is_active: slide.is_active,
    });
  }, [slide]);

  const mutation = useMutation({
    mutationFn: () =>
      updateHeroSlide(id, {
        headline: serializeHeroHeadline(form.headlineLine1, form.headlineLine2),
        subheadline: form.subheadline || null,
        cta_text: form.cta_text || null,
        cta_url: form.cta_url || null,
        background_image_url: form.background_image_url || null,
        display_order: form.display_order,
        is_active: form.is_active,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      queryClient.invalidateQueries({ queryKey: ["public-hero"] });
      toast.success("Saved");
    },
    onError: () => toast.error("Could not save"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/hero">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit hero slide</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Headline line 1</Label>
                  <Input
                    value={form.headlineLine1}
                    onChange={(e) => setForm({ ...form, headlineLine1: e.target.value })}
                    placeholder="Building Nepal's Future"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Headline line 2 (before rotating word)</Label>
                  <Input
                    value={form.headlineLine2}
                    onChange={(e) => setForm({ ...form, headlineLine2: e.target.value })}
                    placeholder="Through Diversified"
                  />
                  <p className="text-xs text-muted-foreground">
                    Rotating words (Ventures, Innovation, etc.) are edited separately on the Hero
                    list page.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Subheadline</Label>
                  <Textarea
                    value={form.subheadline}
                    onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>CTA text</Label>
                    <Input
                      value={form.cta_text}
                      onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA URL</Label>
                    <Input
                      value={form.cta_url}
                      onChange={(e) => setForm({ ...form, cta_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background image URL</Label>
                  <Input
                    value={form.background_image_url}
                    onChange={(e) => setForm({ ...form, background_image_url: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <Label>Active</Label>
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(c) => setForm({ ...form, is_active: c })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                    Save changes
                  </Button>
                  <Button variant="outline" onClick={() => navigate({ to: "/admin/hero" })}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
