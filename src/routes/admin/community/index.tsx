import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdminRoute } from "@/lib/admin/require-admin";
import {
  fetchCommunityPage,
  toFormValues,
  saveCommunityPage,
  uploadGalleryImage,
  type CommunityFormValues,
} from "@/lib/admin/community.client";
import { invalidatePublicAbout } from "@/lib/admin/invalidate-public";
import { GALLERY_IMAGE_MAP } from "@/lib/cms/about-content";
import defaultStoryImg0 from "@/assets/optimized/image-5-1200.webp";
import defaultStoryImg1 from "@/assets/optimized/image-1-1200.webp";
import defaultStoryImg2 from "@/assets/optimized/image-2-1200.webp";

const DEFAULT_SECTION_IMAGES = [defaultStoryImg0, defaultStoryImg1, defaultStoryImg2];

export const Route = createFileRoute("/admin/community/")({
  beforeLoad: requireAdminRoute,
  component: AdminCommunityPage,
});

function AdminCommunityPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: dbRow, isLoading } = useQuery({
    queryKey: ["admin-community"],
    queryFn: fetchCommunityPage,
  });

  const [form, setForm] = useState<CommunityFormValues>({
    heroTitle: "",
    heroIntro: "",
    heroHeadline: "",
    heroLocation: "",
    highlights: [],
    sections: [],
    initiativesBadge: "",
    initiativesTitle: "",
    initiativesDescription: "",
    galleryBadge: "",
    galleryTitle: "",
    galleryImages: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaButtons: [],
  });

  useEffect(() => {
    if (dbRow !== undefined) {
      setForm(toFormValues(dbRow));
    }
  }, [dbRow]);

  const mutation = useMutation({
    mutationFn: () => saveCommunityPage(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-community"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      void invalidatePublicAbout(queryClient);
      toast.success("Community page saved");
    },
    onError: () => toast.error("Could not save"),
  });

  const addHighlight = () =>
    setForm((f) => ({ ...f, highlights: [...f.highlights, { value: "", label: "" }] }));

  const removeHighlight = (i: number) =>
    setForm((f) => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }));

  const updateHighlight = (i: number, field: "value" | "label", val: string) =>
    setForm((f) => {
      const h = [...f.highlights];
      h[i] = { ...h[i], [field]: val };
      return { ...f, highlights: h };
    });

  const addSection = () =>
    setForm((f) => ({ ...f, sections: [...f.sections, { headline: "", paragraphs: [""] }] }));

  const removeSection = (i: number) =>
    setForm((f) => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));

  const updateSection = (i: number, field: string, val: string | string[]) =>
    setForm((f) => {
      const s = [...f.sections];
      s[i] = { ...s[i], [field]: val };
      return { ...f, sections: s };
    });

  const addParagraph = (i: number) =>
    setForm((f) => {
      const s = [...f.sections];
      s[i] = { ...s[i], paragraphs: [...s[i].paragraphs, ""] };
      return { ...f, sections: s };
    });

  const removeParagraph = (sIdx: number, pIdx: number) =>
    setForm((f) => {
      const s = [...f.sections];
      s[sIdx] = { ...s[sIdx], paragraphs: s[sIdx].paragraphs.filter((_, idx) => idx !== pIdx) };
      return { ...f, sections: s };
    });

  const updateParagraph = (sIdx: number, pIdx: number, val: string) =>
    setForm((f) => {
      const s = [...f.sections];
      s[sIdx] = { ...s[sIdx] };
      s[sIdx].paragraphs = [...s[sIdx].paragraphs];
      s[sIdx].paragraphs[pIdx] = val;
      return { ...f, sections: s };
    });

  const addGalleryImage = () =>
    setForm((f) => ({ ...f, galleryImages: [...f.galleryImages, { src: "", label: "" }] }));

  const removeGalleryImage = (i: number) =>
    setForm((f) => ({ ...f, galleryImages: f.galleryImages.filter((_, idx) => idx !== i) }));

  const updateGalleryImage = (i: number, field: "src" | "label", val: string) =>
    setForm((f) => {
      const g = [...f.galleryImages];
      g[i] = { ...g[i], [field]: val };
      return { ...f, galleryImages: g };
    });

  const addCtaButton = () =>
    setForm((f) => ({ ...f, ctaButtons: [...f.ctaButtons, { label: "", href: "" }] }));

  const removeCtaButton = (i: number) =>
    setForm((f) => ({ ...f, ctaButtons: f.ctaButtons.filter((_, idx) => idx !== i) }));

  const updateCtaButton = (i: number, field: "label" | "href", val: string) =>
    setForm((f) => {
      const b = [...f.ctaButtons];
      b[i] = { ...b[i], [field]: val };
      return { ...f, ctaButtons: b };
    });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Community page</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit all content on the community page: hero, initiatives, gallery, and CTA.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hero section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Badge label (small tag above heading)</Label>
                  <Input
                    value={form.heroTitle}
                    onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                    placeholder="Our Community"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Main heading (H1)</Label>
                  <Input
                    value={form.heroHeadline}
                    onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                    placeholder="Empowering through health & education"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Intro paragraph</Label>
                  <Textarea
                    value={form.heroIntro}
                    onChange={(e) => setForm({ ...form, heroIntro: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location tagline</Label>
                  <Input
                    value={form.heroLocation}
                    onChange={(e) => setForm({ ...form, heroLocation: e.target.value })}
                    placeholder="Chhoprak · Siranchok Rural Municipality, Gorkha"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Impact highlights</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.highlights.length === 0 && (
                  <p className="text-sm text-muted-foreground">No highlights yet.</p>
                )}
                {form.highlights.map((h, i) => (
                  <div key={i} className="flex items-end gap-3 rounded-lg border p-4">
                    <div className="flex-1 space-y-2">
                      <Label>Value (e.g. 50+)</Label>
                      <Input
                        value={h.value}
                        onChange={(e) => updateHighlight(i, "value", e.target.value)}
                        placeholder="50+"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Label (e.g. Scholarships)</Label>
                      <Input
                        value={h.label}
                        onChange={(e) => updateHighlight(i, "label", e.target.value)}
                        placeholder="Scholarships"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeHighlight(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Story sections</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addSection}>
                    <Plus className="h-4 w-4" />
                    Add section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {form.sections.length === 0 && (
                  <p className="text-sm text-muted-foreground">No sections yet.</p>
                )}
                {form.sections.map((section, sIdx) => (
                  <SectionField
                    key={sIdx}
                    section={section}
                    index={sIdx}
                    onUpdateHeadline={(val) => updateSection(sIdx, "headline", val)}
                    onUpdateImageUrl={(val) => updateSection(sIdx, "imageUrl", val)}
                    onRemove={() => removeSection(sIdx)}
                    onAddParagraph={() => addParagraph(sIdx)}
                    onUpdateParagraph={(pIdx, val) => updateParagraph(sIdx, pIdx, val)}
                    onRemoveParagraph={(pIdx) => removeParagraph(sIdx, pIdx)}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Initiatives section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section badge</Label>
                  <Input
                    value={form.initiativesBadge}
                    onChange={(e) => setForm({ ...form, initiativesBadge: e.target.value })}
                    placeholder="Our initiatives"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section title</Label>
                  <Input
                    value={form.initiativesTitle}
                    onChange={(e) => setForm({ ...form, initiativesTitle: e.target.value })}
                    placeholder="Impact in Chhoprak"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section description</Label>
                  <Textarea
                    value={form.initiativesDescription}
                    onChange={(e) => setForm({ ...form, initiativesDescription: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Gallery section</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addGalleryImage}>
                    <Plus className="h-4 w-4" />
                    Add image
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Gallery badge</Label>
                  <Input
                    value={form.galleryBadge}
                    onChange={(e) => setForm({ ...form, galleryBadge: e.target.value })}
                    placeholder="Gallery"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gallery title</Label>
                  <Input
                    value={form.galleryTitle}
                    onChange={(e) => setForm({ ...form, galleryTitle: e.target.value })}
                    placeholder="Community in action"
                  />
                </div>
                {form.galleryImages.length === 0 && (
                  <p className="text-sm text-muted-foreground">No gallery images yet.</p>
                )}
                {form.galleryImages.map((img, i) => (
                  <GalleryImageField
                    key={i}
                    img={img}
                    index={i}
                    onUpdate={updateGalleryImage}
                    onRemove={removeGalleryImage}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">CTA section</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addCtaButton}>
                    <Plus className="h-4 w-4" />
                    Add button
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>CTA title</Label>
                  <Input
                    value={form.ctaTitle}
                    onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
                    placeholder="Explore our legacy"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA description</Label>
                  <Textarea
                    value={form.ctaDescription}
                    onChange={(e) => setForm({ ...form, ctaDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                {form.ctaButtons.length === 0 && (
                  <p className="text-sm text-muted-foreground">No buttons yet.</p>
                )}
                {form.ctaButtons.map((btn, i) => (
                  <div key={i} className="flex items-end gap-3 rounded-lg border p-4">
                    <div className="flex-1 space-y-2">
                      <Label>Button label</Label>
                      <Input
                        value={btn.label}
                        onChange={(e) => updateCtaButton(i, "label", e.target.value)}
                        placeholder="Our history"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Link (href)</Label>
                      <Input
                        value={btn.href}
                        onChange={(e) => updateCtaButton(i, "href", e.target.value)}
                        placeholder="/history"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeCtaButton(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save community page
              </Button>
              <Button variant="outline" onClick={() => navigate({ to: "/admin" })}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function GalleryImageField({
  img,
  index,
  onUpdate,
  onRemove,
}: {
  img: { src: string; label: string };
  index: number;
  onUpdate: (i: number, field: "src" | "label", val: string) => void;
  onRemove: (i: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const resolvedSrc = GALLERY_IMAGE_MAP[img.src] || img.src;

  return (
    <div className="flex items-end gap-3 rounded-lg border p-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted/30">
        {resolvedSrc ? (
          <img
            src={resolvedSrc}
            alt={img.label || "Gallery preview"}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><rect fill='%23f0f0f0' width='80' height='80'/><text x='40' y='44' text-anchor='middle' fill='%23999' font-size='10'>No image</text></svg>";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <Label>Image</Label>
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
              onUpdate(index, "src", url);
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
          {uploading ? "Uploading..." : "Upload image"}
        </Button>
      </div>
      <div className="flex-1 space-y-2">
        <Label>Caption</Label>
        <Input
          value={img.label}
          onChange={(e) => onUpdate(index, "label", e.target.value)}
          placeholder="Community outreach programs"
        />
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function SectionField({
  section,
  index,
  onUpdateHeadline,
  onUpdateImageUrl,
  onRemove,
  onAddParagraph,
  onUpdateParagraph,
  onRemoveParagraph,
}: {
  section: { headline: string; paragraphs: string[]; imageUrl?: string };
  index: number;
  onUpdateHeadline: (val: string) => void;
  onUpdateImageUrl: (val: string) => void;
  onRemove: () => void;
  onAddParagraph: () => void;
  onUpdateParagraph: (pIdx: number, val: string) => void;
  onRemoveParagraph: (pIdx: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const fallbackImg = DEFAULT_SECTION_IMAGES[index] || DEFAULT_SECTION_IMAGES[0];
  const previewSrc = section.imageUrl || fallbackImg;

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Label>Headline</Label>
          <Input
            value={section.headline}
            onChange={(e) => onUpdateHeadline(e.target.value)}
            placeholder="Education"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Section image</Label>
        <div className="flex items-end gap-3">
          <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md border bg-muted/30">
            <img
              src={previewSrc}
              alt={section.headline || "Section image"}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'><rect fill='%23f0f0f0' width='120' height='80'/><text x='60' y='44' text-anchor='middle' fill='%23999' font-size='10'>No image</text></svg>";
              }}
            />
          </div>
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
                onUpdateImageUrl(url);
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
            {uploading ? "Uploading..." : "Upload image"}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Paragraphs</Label>
          <Button type="button" variant="ghost" size="sm" onClick={onAddParagraph}>
            <Plus className="h-3 w-3" />
            Add paragraph
          </Button>
        </div>
        {section.paragraphs.map((p, pIdx) => (
          <div key={pIdx} className="flex items-start gap-2">
            <Textarea
              value={p}
              onChange={(e) => onUpdateParagraph(pIdx, e.target.value)}
              rows={3}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 shrink-0"
              onClick={() => onRemoveParagraph(pIdx)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
