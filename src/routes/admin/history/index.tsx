import { createFileRoute } from "@tanstack/react-router";
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
  fetchHistoryPage,
  fetchHistoryLegacy,
  saveHistoryPage,
  saveHistoryLegacy,
  uploadHistoryImage,
} from "@/lib/admin/history.client";
import { invalidatePublicAbout } from "@/lib/admin/invalidate-public";
import type {
  HistoryPageContent,
  HistoryMilestoneItem,
  HistoryLegacyContent,
  LegacyTorchAct,
  LegacyValueItem,
} from "@/lib/cms/about-content";
import babuRamImg from "@/assets/optimized/babu-ram.webp";
import ubinImg from "@/assets/optimized/ubin.webp";
import bidushiImg from "@/assets/optimized/Bidushi-Pandey-Pokherel.webp";

export const Route = createFileRoute("/admin/history/")({
  beforeLoad: requireAdminRoute,
  component: AdminHistoryPage,
});

const ICON_OPTIONS = [
  "GraduationCap",
  "Award",
  "Landmark",
  "Compass",
  "Trees",
  "Heart",
  "Lightbulb",
  "Globe",
  "Flame",
  "Quote",
] as const;

const DEFAULT_MILESTONE: HistoryMilestoneItem = {
  period: "",
  title: "",
  description: "",
  imageUrl: "",
  extraImages: [],
  iconName: "GraduationCap",
  glowColor: "oklch(0.65 0.18 15 / 0.15)",
};

const DEFAULT_TORCH_ACT: LegacyTorchAct = {
  id: "",
  label: "",
  title: "",
  subtitle: "",
  description: "",
  quote: "",
  quoteAttribution: "",
  accentFrom: "#8b5cf6",
  accentTo: "#a78bfa",
  borderAccent: "#8b5cf6",
  iconColor: "text-primary",
  imageUrl: "",
  imageUrl2: "",
};

const DEFAULT_VALUE: LegacyValueItem = {
  iconName: "Trees",
  title: "",
  description: "",
};

function AdminHistoryPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();

  const { data: dbPage, isLoading: loadingPage } = useQuery({
    queryKey: ["admin-history-page"],
    queryFn: fetchHistoryPage,
  });
  const { data: dbLegacy, isLoading: loadingLegacy } = useQuery({
    queryKey: ["admin-history-legacy"],
    queryFn: fetchHistoryLegacy,
  });

  const [page, setPage] = useState<HistoryPageContent>({
    heroBadge: "",
    heroTitle: "",
    heroDescription: "",
    overviewBadge: "",
    overviewTitle: "",
    milestones: [],
  });
  const [legacy, setLegacy] = useState<HistoryLegacyContent>({
    introBadge: "",
    introTitle: "",
    introDescription: "",
    torchBadge: "",
    torchTitle: "",
    founder: { title: "", paragraphs: [""], imageUrl: "", name: "", subtitle: "" },
    torchActs: [],
    valuesTitle: "",
    valuesDescription: "",
    values: [],
  });

  useEffect(() => {
    if (dbPage) {
      setPage((prev) => ({ ...prev, ...dbPage }));
    }
  }, [dbPage]);

  useEffect(() => {
    if (dbLegacy) {
      setLegacy((prev) => ({ ...prev, ...dbLegacy }));
    }
  }, [dbLegacy]);

  const pageMutation = useMutation({
    mutationFn: () => saveHistoryPage(page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-history-page"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      void invalidatePublicAbout(queryClient);
      toast.success("History page saved");
    },
    onError: () => toast.error("Could not save history page"),
  });

  const legacyMutation = useMutation({
    mutationFn: () => saveHistoryLegacy(legacy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-history-legacy"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      void invalidatePublicAbout(queryClient);
      toast.success("Legacy section saved");
    },
    onError: () => toast.error("Could not save legacy section"),
  });

  const loading = loadingPage || loadingLegacy;

  if (loading) {
    return (
      <AdminShell email={session.user.email}>
        <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading…
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-display text-3xl tracking-tight">History &amp; Legacy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit the History page hero, timeline milestones, and the Legacy section content.
          </p>
        </div>

        {/* ── History Page Hero ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hero banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Badge text</Label>
                <Input
                  value={page.heroBadge}
                  onChange={(e) => setPage({ ...page, heroBadge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Overview badge</Label>
                <Input
                  value={page.overviewBadge}
                  onChange={(e) => setPage({ ...page, overviewBadge: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={page.heroTitle}
                onChange={(e) => setPage({ ...page, heroTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={page.heroDescription}
                onChange={(e) => setPage({ ...page, heroDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Overview title</Label>
              <Input
                value={page.overviewTitle}
                onChange={(e) => setPage({ ...page, overviewTitle: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <Button onClick={() => pageMutation.mutate()} disabled={pageMutation.isPending}>
                {pageMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save hero banner
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Milestones ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Timeline milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {page.milestones.map((milestone, i) => (
              <MilestoneForm
                key={i}
                milestone={milestone}
                index={i}
                onChange={(updated) => {
                  const list = [...page.milestones];
                  list[i] = updated;
                  setPage({ ...page, milestones: list });
                }}
                onRemove={() => {
                  setPage({
                    ...page,
                    milestones: page.milestones.filter((_, idx) => idx !== i),
                  });
                }}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage({
                  ...page,
                  milestones: [
                    ...page.milestones,
                    { ...DEFAULT_MILESTONE, extraImages: [] },
                  ],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add milestone
            </Button>
            <div className="pt-2">
              <Button onClick={() => pageMutation.mutate()} disabled={pageMutation.isPending}>
                {pageMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save milestones
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Legacy Intro ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legacy — Intro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Badge text</Label>
                <Input
                  value={legacy.introBadge}
                  onChange={(e) => setLegacy({ ...legacy, introBadge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Torch badge</Label>
                <Input
                  value={legacy.torchBadge}
                  onChange={(e) => setLegacy({ ...legacy, torchBadge: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={legacy.introTitle}
                onChange={(e) => setLegacy({ ...legacy, introTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={legacy.introDescription}
                onChange={(e) => setLegacy({ ...legacy, introDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Torch title</Label>
                <Input
                  value={legacy.torchTitle}
                  onChange={(e) => setLegacy({ ...legacy, torchTitle: e.target.value })}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button onClick={() => legacyMutation.mutate()} disabled={legacyMutation.isPending}>
                {legacyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save intro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Founder Section ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legacy — Founder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Section title</Label>
              <Input
                value={legacy.founder.title}
                onChange={(e) =>
                  setLegacy({
                    ...legacy,
                    founder: { ...legacy.founder, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={legacy.founder.name}
                  onChange={(e) =>
                    setLegacy({
                      ...legacy,
                      founder: { ...legacy.founder, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={legacy.founder.subtitle}
                  onChange={(e) =>
                    setLegacy({
                      ...legacy,
                      founder: { ...legacy.founder, subtitle: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <ImageUploadField
              label="Image"
              value={legacy.founder.imageUrl}
              fallbackSrc={babuRamImg}
              onChange={(url) =>
                setLegacy({
                  ...legacy,
                  founder: { ...legacy.founder, imageUrl: url },
                })
              }
            />
            <div className="space-y-2">
              <Label>Paragraphs</Label>
              {legacy.founder.paragraphs.map((p, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <Textarea
                    value={p}
                    onChange={(e) => {
                      const ps = [...legacy.founder.paragraphs];
                      ps[i] = e.target.value;
                      setLegacy({ ...legacy, founder: { ...legacy.founder, paragraphs: ps } });
                    }}
                    rows={3}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (legacy.founder.paragraphs.length <= 1) return;
                      setLegacy({
                        ...legacy,
                        founder: {
                          ...legacy.founder,
                          paragraphs: legacy.founder.paragraphs.filter((_, idx) => idx !== i),
                        },
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setLegacy({
                    ...legacy,
                    founder: {
                      ...legacy.founder,
                      paragraphs: [...legacy.founder.paragraphs, ""],
                    },
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add paragraph
              </Button>
            </div>
            <div className="pt-2">
              <Button onClick={() => legacyMutation.mutate()} disabled={legacyMutation.isPending}>
                {legacyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save founder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Torch Acts ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legacy — Torch relay acts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {legacy.torchActs.map((act, i) => (
              <TorchActForm
                key={act.id || i}
                act={act}
                index={i}
                onChange={(updated) => {
                  const list = [...legacy.torchActs];
                  list[i] = updated;
                  setLegacy({ ...legacy, torchActs: list });
                }}
                onRemove={() => {
                  if (legacy.torchActs.length <= 1) return;
                  setLegacy({
                    ...legacy,
                    torchActs: legacy.torchActs.filter((_, idx) => idx !== i),
                  });
                }}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const id = `act-${Date.now()}`;
                setLegacy({
                  ...legacy,
                  torchActs: [...legacy.torchActs, { ...DEFAULT_TORCH_ACT, id }],
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add act
            </Button>
            <div className="pt-2">
              <Button onClick={() => legacyMutation.mutate()} disabled={legacyMutation.isPending}>
                {legacyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save torch acts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Values ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legacy — Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Section title</Label>
                <Input
                  value={legacy.valuesTitle}
                  onChange={(e) => setLegacy({ ...legacy, valuesTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Section description</Label>
                <Input
                  value={legacy.valuesDescription}
                  onChange={(e) => setLegacy({ ...legacy, valuesDescription: e.target.value })}
                />
              </div>
            </div>
            {legacy.values.map((v, i) => (
              <ValueForm
                key={i}
                value={v}
                index={i}
                onChange={(updated) => {
                  const list = [...legacy.values];
                  list[i] = updated;
                  setLegacy({ ...legacy, values: list });
                }}
                onRemove={() => {
                  if (legacy.values.length <= 1) return;
                  setLegacy({
                    ...legacy,
                    values: legacy.values.filter((_, idx) => idx !== i),
                  });
                }}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setLegacy({ ...legacy, values: [...legacy.values, { ...DEFAULT_VALUE }] })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add value
            </Button>
            <div className="pt-2">
              <Button onClick={() => legacyMutation.mutate()} disabled={legacyMutation.isPending}>
                {legacyMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save values
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

/* ─── Image Upload Field ─── */

function ImageUploadField({
  label,
  value,
  onChange,
  fallbackSrc,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  fallbackSrc?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const displaySrc = value || fallbackSrc || "";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadHistoryImage(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-3 items-start">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted/30 flex items-center justify-center">
          {displaySrc ? (
            <img src={displaySrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[10px] text-muted-foreground">No image</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={fallbackSrc ? "Custom image URL (leave empty to use default)" : "Image URL"}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
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
    </div>
  );
}

/* ─── Milestone Form ─── */

function MilestoneForm({
  milestone,
  index,
  onChange,
  onRemove,
}: {
  milestone: HistoryMilestoneItem;
  index: number;
  onChange: (m: HistoryMilestoneItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-border/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Milestone {index + 1}
        </span>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Period</Label>
          <Input
            value={milestone.period}
            onChange={(e) => onChange({ ...milestone, period: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={milestone.title}
            onChange={(e) => onChange({ ...milestone, title: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={milestone.description}
          onChange={(e) => onChange({ ...milestone, description: e.target.value })}
          rows={4}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Icon</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={milestone.iconName}
            onChange={(e) => onChange({ ...milestone, iconName: e.target.value })}
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Glow color</Label>
          <Input
            value={milestone.glowColor}
            onChange={(e) => onChange({ ...milestone, glowColor: e.target.value })}
            placeholder="oklch(0.65 0.18 15 / 0.15)"
          />
        </div>
      </div>
      <ImageUploadField
        label="Image"
        value={milestone.imageUrl}
        onChange={(url) => onChange({ ...milestone, imageUrl: url })}
      />
      <div className="space-y-2">
        <Label>Extra images for slider</Label>
        {milestone.extraImages.map((img, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1">
              <ImageUploadField
                label={`Slider image ${i + 1}`}
                value={img}
                onChange={(url) => {
                  const list = [...milestone.extraImages];
                  list[i] = url;
                  onChange({ ...milestone, extraImages: list });
                }}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-6"
              onClick={() => {
                const list = milestone.extraImages.filter((_, idx) => idx !== i);
                onChange({ ...milestone, extraImages: list });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({ ...milestone, extraImages: [...milestone.extraImages, ""] })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add slider image
        </Button>
      </div>
    </div>
  );
}

/* ─── Torch Act Form ─── */

function TorchActForm({
  act,
  index,
  onChange,
  onRemove,
}: {
  act: LegacyTorchAct;
  index: number;
  onChange: (a: LegacyTorchAct) => void;
  onRemove: () => void;
}) {
  const imgFallback = act.id === "foundation" ? babuRamImg : act.id === "future" ? ubinImg : undefined;
  const img2Fallback = act.id === "future" ? bidushiImg : undefined;
  return (
    <div className="rounded-lg border border-border/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Act {index + 1}
        </span>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <Label>ID</Label>
          <Input
            value={act.id}
            onChange={(e) => onChange({ ...act, id: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Label</Label>
          <Input
            value={act.label}
            onChange={(e) => onChange({ ...act, label: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={act.title}
            onChange={(e) => onChange({ ...act, title: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Input
          value={act.subtitle}
          onChange={(e) => onChange({ ...act, subtitle: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={act.description}
          onChange={(e) => onChange({ ...act, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Quote</Label>
          <Textarea
            value={act.quote}
            onChange={(e) => onChange({ ...act, quote: e.target.value })}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label>Quote attribution</Label>
          <Input
            value={act.quoteAttribution}
            onChange={(e) => onChange({ ...act, quoteAttribution: e.target.value })}
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Accent from</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={act.accentFrom.startsWith("#") ? act.accentFrom : "#8b5cf6"}
              onChange={(e) => onChange({ ...act, accentFrom: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={act.accentFrom}
              onChange={(e) => onChange({ ...act, accentFrom: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Accent to</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={act.accentTo.startsWith("#") ? act.accentTo : "#a78bfa"}
              onChange={(e) => onChange({ ...act, accentTo: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={act.accentTo}
              onChange={(e) => onChange({ ...act, accentTo: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Border accent</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={act.borderAccent.startsWith("#") ? act.borderAccent : "#8b5cf6"}
              onChange={(e) => onChange({ ...act, borderAccent: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={act.borderAccent}
              onChange={(e) => onChange({ ...act, borderAccent: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <ImageUploadField
          label="Image"
          value={act.imageUrl}
          fallbackSrc={imgFallback}
          onChange={(url) => onChange({ ...act, imageUrl: url })}
        />
        <ImageUploadField
          label="Second image"
          value={act.imageUrl2}
          fallbackSrc={img2Fallback}
          onChange={(url) => onChange({ ...act, imageUrl2: url })}
        />
      </div>
    </div>
  );
}

/* ─── Value Form ─── */

function ValueForm({
  value,
  index,
  onChange,
  onRemove,
}: {
  value: LegacyValueItem;
  index: number;
  onChange: (v: LegacyValueItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-border/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Value {index + 1}
        </span>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Icon</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={value.iconName}
            onChange={(e) => onChange({ ...value, iconName: e.target.value })}
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input
            value={value.description}
            onChange={(e) => onChange({ ...value, description: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
