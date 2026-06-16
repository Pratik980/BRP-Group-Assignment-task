import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FileText, Loader2, Pencil } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAboutSections } from "@/lib/admin/about.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

const SECTION_LABELS: Record<string, string> = {
  home_history: "Home — intro paragraph",
  about_vision: "About — vision",
  about_mission: "About — mission",
  home_legacy: "Home — legacy story",
  home_community: "Home — community story",
  heritage_strip: "Heritage strip label",
  ventures_hero: "Ventures page intro",
  community_page: "Community page content",
};

export const Route = createFileRoute("/admin/about/")({
  beforeLoad: requireAdminRoute,
  component: AdminAboutPage,
});

function AdminAboutPage() {
  const { session } = Route.useRouteContext();
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["admin-about"],
    queryFn: fetchAboutSections,
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Page content</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit text sections across the website (vision, mission, legacy, etc.).
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sections ({sections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : sections.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No sections yet. Run the site content seed migration.
              </p>
            ) : (
              <ul className="divide-y divide-border/60">
                {sections.map((section) => (
                  <li
                    key={section.section_key}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <p className="font-medium">
                          {SECTION_LABELS[section.section_key] ??
                            section.title ??
                            section.section_key}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {section.content ?? "(metadata only)"}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/about/$key" params={{ key: section.section_key }}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
