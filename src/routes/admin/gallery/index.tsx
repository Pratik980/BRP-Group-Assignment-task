import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageLayout, AdminCard, AdminBadge } from "@/components/admin/AdminPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { invalidatePublicAbout } from "@/lib/admin/invalidate-public";
import {
  fetchGallery,
  saveGallery,
  uploadGalleryImage,
  deleteGalleryStorageImage,
  type GalleryImage,
} from "@/lib/admin/gallery.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

const DEFAULT_IMAGES: GalleryImage[] = [
  { src: "/site-assets/image-6.webp", label: "Corporate Team & Governance" },
  {
    src: "/site-assets/Ubin-Pokharel-image-2.webp",
    label: "Leadership & Chairman Dr. Ubin Pokharel",
  },
  { src: "/site-assets/image-1.webp", label: "Incubator Workshops & Satin Leaf" },
  {
    src: "/site-assets/Babu-Ram-Pokharel-image-1.webp",
    label: "Chairman Emeritus Dr. Babu Ram Pokharel",
  },
  { src: "/site-assets/image-2.webp", label: "Venture Summit & Collaboration" },
  { src: "/site-assets/Brp-image-1.webp", label: "B.R.P. Headquarters & Operations" },
  { src: "/site-assets/image-3.webp", label: "IT Infrastructure Planning" },
  { src: "/site-assets/Ubin-Pokherel-2.webp", label: "Executive Board Meetings" },
  { src: "/site-assets/image-4.webp", label: "Strategic Investments Group" },
  { src: "/site-assets/image-5.webp", label: "Nepal-US Cooperation Summits" },
];

export const Route = createFileRoute("/admin/gallery/")({
  beforeLoad: requireAdminRoute,
  component: AdminGalleryPage,
});

function AdminGalleryPage() {
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: fetchGallery,
  });

  const [draft, setDraft] = useState<GalleryImage[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (!initialized && !isLoading) {
    setDraft(images.length > 0 ? images : DEFAULT_IMAGES);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => saveGallery(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      invalidatePublicAbout(queryClient);
      toast.success("Gallery saved");
    },
    onError: () => toast.error("Could not save gallery"),
  });

  const addImage = () => {
    setDraft((prev) => [...prev, { src: "", label: "New photo" }]);
  };

  const removeImage = (index: number) => {
    const removed = draft[index];
    setDraft((prev) => prev.filter((_, i) => i !== index));
    if (removed.src) deleteGalleryStorageImage(removed.src).catch(() => {});
  };

  const updateLabel = (index: number, label: string) => {
    setDraft((prev) => prev.map((img, i) => (i === index ? { ...img, label } : img)));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setDraft((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index >= draft.length - 1) return;
    setDraft((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  return (
    <AdminShell>
      <AdminPageLayout
        title="Gallery"
        description="Manage images shown in the Corporate Gallery section on the homepage."
        actions={
          <>
            <Button variant="outline" onClick={addImage}>
              <Plus className="mr-2 h-4 w-4" /> Add image
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save gallery
            </Button>
          </>
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : draft.length === 0 ? (
          <AdminCard>
            <div className="admin-empty-state">
              <p className="text-muted-foreground">No gallery images yet.</p>
              <Button variant="outline" onClick={addImage} className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add your first image
              </Button>
            </div>
          </AdminCard>
        ) : (
          <div className="space-y-4">
            {draft.map((img, index) => (
              <GalleryImageRow
                key={`${img.src}-${index}`}
                img={img}
                index={index}
                total={draft.length}
                onUpdateLabel={updateLabel}
                onRemove={removeImage}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                onSrcChange={(src) => {
                  setDraft((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, src } : item)),
                  );
                }}
              />
            ))}
          </div>
        )}
      </AdminPageLayout>
    </AdminShell>
  );
}

function GalleryImageRow({
  img,
  index,
  total,
  onUpdateLabel,
  onRemove,
  onMoveUp,
  onMoveDown,
  onSrcChange,
}: {
  img: GalleryImage;
  index: number;
  total: number;
  onUpdateLabel: (i: number, label: string) => void;
  onRemove: (i: number) => void;
  onMoveUp: (i: number) => void;
  onMoveDown: (i: number) => void;
  onSrcChange: (src: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <AdminCard>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-0.5">
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="flex h-5 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-30 text-xs"
            aria-label="Move up"
          >
            ↑
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">{index + 1}</span>
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={index >= total - 1}
            className="flex h-5 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-30 text-xs"
            aria-label="Move down"
          >
            ↓
          </button>
        </div>

        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
          {img.src ? (
            <img
              src={img.src}
              alt={img.label}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 80'><rect fill='%23f0f0f0' width='128' height='80'/><text x='64' y='44' text-anchor='middle' fill='%23999' font-size='9'>Broken</text></svg>";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="flex flex-col gap-1.5">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try {
                  const url = await uploadGalleryImage(file);
                  onSrcChange(url);
                  toast.success("Image uploaded");
                } catch {
                  toast.error("Upload failed");
                } finally {
                  setUploading(false);
                  if (fileRef.current) fileRef.current.value = "";
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          <div className="flex-1">
            <Label className="admin-label">Caption</Label>
            <Input
              value={img.label}
              onChange={(e) => onUpdateLabel(index, e.target.value)}
              placeholder="Corporate Team & Governance"
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={() => onRemove(index)} className="shrink-0">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </AdminCard>
  );
}
