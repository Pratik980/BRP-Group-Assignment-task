import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createHeroSlide } from "@/lib/admin/hero.client";
import {
  DEFAULT_HERO_HEADLINE_LINE1,
  DEFAULT_HERO_HEADLINE_LINE2,
  serializeHeroHeadline,
} from "@/lib/cms/hero-morphing";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/hero/new")({
  beforeLoad: requireAdminRoute,
  component: AdminNewHeroPage,
});

function AdminNewHeroPage() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    headlineLine1: DEFAULT_HERO_HEADLINE_LINE1,
    headlineLine2: DEFAULT_HERO_HEADLINE_LINE2,
    subheadline: "",
    cta_text: "",
    cta_url: "",
    background_image_url: "",
    display_order: 0,
    is_active: true,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createHeroSlide({
        headline: serializeHeroHeadline(form.headlineLine1, form.headlineLine2),
        subheadline: form.subheadline || null,
        cta_text: form.cta_text || null,
        cta_url: form.cta_url || null,
        background_image_url: form.background_image_url || null,
        display_order: form.display_order,
        is_active: form.is_active,
      }),
    onSuccess: (slide) => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      queryClient.invalidateQueries({ queryKey: ["public-hero"] });
      toast.success("Slide created");
      navigate({ to: "/admin/hero/$id", params: { id: slide.id } });
    },
    onError: () => toast.error("Could not create slide"),
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
            <CardTitle className="text-base">New hero slide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Headline line 1</Label>
              <Input
                value={form.headlineLine1}
                onChange={(e) => setForm({ ...form, headlineLine1: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Headline line 2 (before rotating word)</Label>
              <Input
                value={form.headlineLine2}
                onChange={(e) => setForm({ ...form, headlineLine2: e.target.value })}
              />
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
            <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
              Create slide
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
