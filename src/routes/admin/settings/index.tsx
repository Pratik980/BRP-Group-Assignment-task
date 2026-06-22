import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { invalidatePublicSiteSettings } from "@/lib/admin/invalidate-public";
import {
  fetchSeoSettings,
  fetchSiteSettings,
  updateSeoSetting,
  updateSiteSetting,
} from "@/lib/admin/settings.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

const SITE_KEYS = [
  { key: "company_email", label: "Contact email" },
  { key: "company_phone", label: "Phone" },
  { key: "company_address", label: "Address" },
  { key: "linkedin_url", label: "LinkedIn URL" },
  { key: "facebook_url", label: "Facebook URL" },
  { key: "instagram_url", label: "Instagram URL" },
  { key: "notification_email", label: "Form notification email" },
] as const;

export const Route = createFileRoute("/admin/settings/")({
  beforeLoad: requireAdminRoute,
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const { data: settings = {} as Record<string, string>, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: fetchSiteSettings,
  });
  const { data: seo = [] } = useQuery({ queryKey: ["admin-seo"], queryFn: fetchSeoSettings });
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) setForm(settings as Record<string, string>);
  }, [settings]);

  const saveSite = useMutation({
    mutationFn: async () => {
      for (const { key } of SITE_KEYS) {
        if (form[key] !== undefined) await updateSiteSetting(key, form[key]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      void invalidatePublicSiteSettings(queryClient);
      toast.success("Site settings saved");
    },
    onError: () => toast.error("Could not save settings"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact info, social links, and SEO meta tags.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Site contact & social</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              SITE_KEYS.map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={form[key] ?? ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))
            )}
            <Button onClick={() => saveSite.mutate()} disabled={saveSite.isPending}>
              Save site settings
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SEO — page meta tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {seo.map((row) => (
              <SeoRow
                key={row.page_slug}
                row={row}
                onSaved={() => queryClient.invalidateQueries({ queryKey: ["admin-seo"] })}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function SeoRow({
  row,
  onSaved,
}: {
  row: Awaited<ReturnType<typeof fetchSeoSettings>>[number];
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(row.meta_title ?? "");
  const [desc, setDesc] = useState(row.meta_description ?? "");
  const save = useMutation({
    mutationFn: () =>
      updateSeoSetting(row.page_slug, { meta_title: title, meta_description: desc }),
    onSuccess: () => {
      onSaved();
      toast.success(`SEO saved: ${row.page_slug}`);
    },
    onError: () => toast.error("Could not save SEO"),
  });
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <p className="text-sm font-medium capitalize">{row.page_slug}</p>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Meta title" />
      <Textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={2}
        placeholder="Meta description"
      />
      <Button size="sm" onClick={() => save.mutate()} disabled={save.isPending}>
        Save
      </Button>
    </div>
  );
}
