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
import { Textarea } from "@/components/ui/textarea";
import type { Json } from "@/integrations/supabase/types";
import { invalidatePublicAbout } from "@/lib/admin/invalidate-public";
import { fetchAboutSection, updateAboutSection } from "@/lib/admin/about.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/about/$key")({
  beforeLoad: requireAdminRoute,
  component: AdminEditAboutPage,
});

function AdminEditAboutPage() {
  const { session } = Route.useRouteContext();
  const { key } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: section, isLoading } = useQuery({
    queryKey: ["admin-about", key],
    queryFn: () => fetchAboutSection(key),
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metadataJson, setMetadataJson] = useState("{}");

  useEffect(() => {
    if (section) {
      setTitle(section.title ?? "");
      setContent(section.content ?? "");
      setMetadataJson(JSON.stringify(section.metadata ?? {}, null, 2));
    }
  }, [section]);

  const mutation = useMutation({
    mutationFn: () => {
      let metadata: Record<string, unknown> = {};
      try {
        metadata = JSON.parse(metadataJson) as Record<string, unknown>;
      } catch {
        throw new Error("Invalid JSON in metadata");
      }
      return updateAboutSection(key, {
        title: title || null,
        content: content || null,
        metadata: metadata as unknown as Json,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      void invalidatePublicAbout(queryClient);
      toast.success("Saved");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not save"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/about">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit: {key}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
                </div>
                <div className="space-y-2">
                  <Label>Metadata (JSON - for paragraphs, highlights, etc.)</Label>
                  <Textarea
                    value={metadataJson}
                    onChange={(e) => setMetadataJson(e.target.value)}
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                    Save changes
                  </Button>
                  <Button variant="outline" onClick={() => navigate({ to: "/admin/about" })}>
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
