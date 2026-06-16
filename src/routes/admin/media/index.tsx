import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALL_SITE_ASSETS } from "@/lib/cms/site-assets";
import { requireAdminRoute } from "@/lib/admin/require-admin";

const GROUPS = [
  { key: "ventures", label: "Venture logos" },
  { key: "executive", label: "Executive photos" },
  { key: "gallery", label: "Gallery & page images" },
  { key: "brand", label: "Brand" },
] as const;

export const Route = createFileRoute("/admin/media/")({
  beforeLoad: requireAdminRoute,
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const { session } = Route.useRouteContext();

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Site media library</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Built-in images from the website. Pick these when editing ventures or team members, or
            copy the URL.
          </p>
        </div>

        {GROUPS.map((group) => {
          const assets = ALL_SITE_ASSETS.filter((a) => a.category === group.key);
          if (assets.length === 0) return null;
          return (
            <Card key={group.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ImageIcon className="h-4 w-4" />
                  {group.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {assets.map((asset) => (
                    <div key={asset.id} className="rounded-lg border border-border/60 p-3">
                      <img src={asset.url} alt="" className="mx-auto h-16 w-16 object-contain" />
                      <p className="mt-2 text-center text-xs font-medium">{asset.label}</p>
                      <p className="mt-1 break-all text-center text-[10px] text-muted-foreground">
                        {asset.url}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}
