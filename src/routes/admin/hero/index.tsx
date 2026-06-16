import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Loader2, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_HERO_MORPHING_WORDS, parseHeroHeadline } from "@/lib/cms/hero-morphing";
import { invalidatePublicAbout } from "@/lib/admin/invalidate-public";
import {
  deleteHeroSlide,
  fetchHeroMorphingWords,
  fetchHeroSlides,
  saveHeroMorphingWords,
  fetchHeroVisualCards,
  saveHeroVisualCards,
  uploadHeroImage,
} from "@/lib/admin/hero.client";
import {
  fetchHeroTextColors,
  saveHeroTextColors,
  DEFAULT_HERO_TEXT_COLORS,
  type HeroTextColors,
} from "@/lib/admin/hero-colors.client";
import { requireAdminRoute } from "@/lib/admin/require-admin";

export const Route = createFileRoute("/admin/hero/")({
  beforeLoad: requireAdminRoute,
  component: AdminHeroPage,
});

function AdminHeroPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: fetchHeroSlides,
  });
  const { data: morphingWords = [...DEFAULT_HERO_MORPHING_WORDS], isLoading: morphingLoading } =
    useQuery({
      queryKey: ["admin-hero-morphing-words"],
      queryFn: fetchHeroMorphingWords,
    });
  const [wordDraft, setWordDraft] = useState<string[]>([...DEFAULT_HERO_MORPHING_WORDS]);

  useEffect(() => {
    setWordDraft(morphingWords);
  }, [morphingWords]);

  const { data: dbVisualCards, isLoading: visualCardsLoading } = useQuery({
    queryKey: ["admin-hero-visual-cards"],
    queryFn: fetchHeroVisualCards,
  });

  const [cardsDraft, setCardsDraft] = useState<any[]>([]);
  const cardsInitialized = useRef(false);

  const { data: dbTextColors, isLoading: textColorsLoading } = useQuery({
    queryKey: ["admin-hero-text-colors"],
    queryFn: fetchHeroTextColors,
  });
  const [textColors, setTextColors] = useState<HeroTextColors>({ ...DEFAULT_HERO_TEXT_COLORS });

  useEffect(() => {
    if (dbTextColors) setTextColors(dbTextColors);
  }, [dbTextColors]);

  const textColorsMutation = useMutation({
    mutationFn: () => saveHeroTextColors(textColors),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-text-colors"] });
      queryClient.invalidateQueries({ queryKey: ["public-about"] });
      toast.success("Text colors saved");
    },
    onError: () => toast.error("Could not save text colors"),
  });

  useEffect(() => {
    if (cardsInitialized.current) return;
    if (dbVisualCards === undefined) return;
    cardsInitialized.current = true;
    if (dbVisualCards) {
      setCardsDraft(dbVisualCards.filter((card) => card.title !== "Cloud Axis"));
    } else {
      setCardsDraft([
        { title: "Small Heaven School", image: "/site-assets/shs.webp" },
        { title: "Satin Leaf Investment", image: "/site-assets/satin-leaf.webp" },
        { title: "B.R.P. Ventures", image: "/site-assets/logo-BRP.webp" },
        { title: "Reddot", image: "/site-assets/reddot.webp" },
        { title: "BRP Tours & Travels", image: "/site-assets/Brp-tours-and-travel.webp" },
      ]);
    }
  }, [dbVisualCards]);

  const cardsMutation = useMutation({
    mutationFn: () => {
      const positionConfigs = [
        {
          baseRotateX: 8,
          baseRotateY: 0,
          floatDuration: 5.6,
          floatDelay: 0.1,
          positionClass:
            "left-[50%] top-[18%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
          bgColor: "#28160f",
        },
        {
          baseRotateX: 0,
          baseRotateY: 10,
          floatDuration: 6.2,
          floatDelay: 0.5,
          positionClass:
            "left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
          bgColor: "#190e29",
        },
        {
          baseRotateX: 0,
          baseRotateY: -10,
          floatDuration: 5.2,
          floatDelay: 0.3,
          positionClass:
            "left-[70%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
          bgColor: "#141d0f",
        },
        {
          baseRotateX: -8,
          baseRotateY: 0,
          floatDuration: 5.8,
          floatDelay: 0.7,
          positionClass:
            "left-[50%] top-[72%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
          bgColor: "#0b1424",
        },
        {
          baseRotateX: 4,
          baseRotateY: -4,
          floatDuration: 4.8,
          floatDelay: 0.2,
          positionClass:
            "left-[78%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
          bgColor: "#121212",
        },
        {
          baseRotateX: -4,
          baseRotateY: 4,
          floatDuration: 6.4,
          floatDelay: 0.6,
          positionClass:
            "left-[22%] top-[68%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
          bgColor: "#101e14",
        },
        {
          baseRotateX: -4,
          baseRotateY: -4,
          floatDuration: 5.5,
          floatDelay: 0.8,
          positionClass:
            "left-[80%] top-[68%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
          bgColor: "#161616",
        },
      ];

      const fullCards = cardsDraft.map((c, i) => {
        const config = positionConfigs[i] || {
          baseRotateX: 0,
          baseRotateY: 0,
          floatDuration: 5.0,
          floatDelay: 0.1,
          positionClass:
            "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
          bgColor: "#1c1c1e",
        };
        return {
          ...config,
          title: c.title,
          image: c.image,
          bgColor: c.bgColor || config.bgColor,
        };
      });

      return saveHeroVisualCards(fullCards);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-visual-cards"] });
      queryClient.invalidateQueries({ queryKey: ["public-about"] });
      toast.success("Hero visual cards saved");
    },
    onError: () => toast.error("Could not save visual cards"),
  });

  const morphingMutation = useMutation({
    mutationFn: () => saveHeroMorphingWords(wordDraft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-morphing-words"] });
      queryClient.invalidateQueries({ queryKey: ["public-hero-morphing-words"] });
      void invalidatePublicAbout(queryClient);
      toast.success("Rotating words saved");
    },
    onError: () => toast.error("Could not save rotating words"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      toast.success("Slide deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Could not delete slide"),
  });

  return (
    <AdminShell email={session.user.email}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Hero slides</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Homepage hero headline, subheadline, rotating words, and CTAs.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/hero/new">
              <Plus className="h-4 w-4" />
              Add slide
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rotating headline words</CardTitle>
            <CardDescription>
              These words cycle in the hero after &quot;Through Diversified&quot; — e.g. Ventures,
              Innovation, Growth, Legacy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {morphingLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {wordDraft.map((word, index) => (
                    <div key={index} className="flex items-end gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`morph-word-${index}`}>Word {index + 1}</Label>
                        <Input
                          id={`morph-word-${index}`}
                          value={word}
                          onChange={(e) => {
                            const next = [...wordDraft];
                            next[index] = e.target.value;
                            setWordDraft(next);
                          }}
                          placeholder="e.g. Ventures"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        disabled={wordDraft.length <= 1}
                        onClick={() => setWordDraft(wordDraft.filter((_, i) => i !== index))}
                        aria-label={`Remove word ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setWordDraft([...wordDraft, ""])}
                  >
                    <Plus className="h-4 w-4" />
                    Add word
                  </Button>
                  <Button
                    type="button"
                    onClick={() => morphingMutation.mutate()}
                    disabled={morphingMutation.isPending || wordDraft.every((w) => !w.trim())}
                  >
                    {morphingMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save words"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hero text colors</CardTitle>
            <CardDescription>
              Customize text colors for the hero section headline, subheadline, and CTA button.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {textColorsLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Headline color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textColors.headline_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, headline_color: e.target.value })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={textColors.headline_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, headline_color: e.target.value })
                        }
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subheadline color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textColors.subheadline_color
                          .replace("rgba(255,255,255,0.8)", "#ffffff")
                          .replace(/[^#\w]/g, "#ffffff")}
                        onChange={(e) =>
                          setTextColors({ ...textColors, subheadline_color: e.target.value })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={textColors.subheadline_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, subheadline_color: e.target.value })
                        }
                        placeholder="rgba(255,255,255,0.8)"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>CTA text color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textColors.cta_text_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, cta_text_color: e.target.value })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={textColors.cta_text_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, cta_text_color: e.target.value })
                        }
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>CTA background color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textColors.cta_bg_color.startsWith("rgba") ? "#e67e43" : textColors.cta_bg_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, cta_bg_color: e.target.value })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={textColors.cta_bg_color}
                        onChange={(e) =>
                          setTextColors({ ...textColors, cta_bg_color: e.target.value })
                        }
                        placeholder="#e67e43"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => textColorsMutation.mutate()}
                  disabled={textColorsMutation.isPending}
                >
                  {textColorsMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Save text colors
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hero visual cards (up to 8 floating frames)</CardTitle>
            <CardDescription>
              Configure the brand names, logo/image URLs, and custom card background colors for the
              floating frames surrounding the logo on the home page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {visualCardsLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {cardsDraft.map((card, index) => {
                    const slotLabels = [
                      "Slot 1 — Top Center Card",
                      "Slot 2 — Left Card",
                      "Slot 3 — Right Card",
                      "Slot 4 — Bottom Center Card",
                      "Slot 5 — Far Right Top Card",
                      "Slot 6 — Far Bottom Left Card",
                      "Slot 7 — Far Bottom Right Card",
                    ];
                    return (
                      <div key={index} className="space-y-3 rounded-lg border p-4 relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-7 w-7"
                          onClick={() => setCardsDraft(cardsDraft.filter((_, i) => i !== index))}
                          title="Remove slot"
                          aria-label="Remove slot"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Label className="font-semibold text-xs text-primary">
                          {slotLabels[index] || `Slot ${index + 1}`}
                        </Label>
                        <div className="space-y-2">
                          <Label htmlFor={`card-title-${index}`}>Title</Label>
                          <Input
                            id={`card-title-${index}`}
                            value={card.title || ""}
                            onChange={(e) => {
                              const next = [...cardsDraft];
                              next[index] = { ...next[index], title: e.target.value };
                              setCardsDraft(next);
                            }}
                            placeholder="e.g. Small Heaven School"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Image / Logo</Label>
                          <div className="flex items-end gap-3">
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
                              {card.image ? (
                                <img
                                  src={card.image}
                                  alt={card.title || "Card image"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                  No image
                                </div>
                              )}
                            </div>
                            <CardImageUpload
                              onUpload={(url) => {
                                const next = [...cardsDraft];
                                next[index] = { ...next[index], image: url };
                                setCardsDraft(next);
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`card-bg-${index}`}>
                            Background Color (optional HEX)
                          </Label>
                          <Input
                            id={`card-bg-${index}`}
                            value={card.bgColor || ""}
                            onChange={(e) => {
                              const next = [...cardsDraft];
                              next[index] = { ...next[index], bgColor: e.target.value };
                              setCardsDraft(next);
                            }}
                            placeholder="e.g. #28160f"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => cardsMutation.mutate()}
                    disabled={cardsMutation.isPending}
                  >
                    {cardsMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Save Hero Cards
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setCardsDraft([...cardsDraft, { title: "", image: "", bgColor: "" }])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add card slot
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Slides ({slides.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : slides.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No hero slides yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Headline</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {slide.background_image_url ? (
                            <img
                              src={slide.background_image_url}
                              alt=""
                              className="h-10 w-16 rounded object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                              <ImageIcon className="h-4 w-4" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium line-clamp-1">
                              {parseHeroHeadline(slide.headline).line1}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {parseHeroHeadline(slide.headline).line2}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {slide.subheadline}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{slide.display_order}</TableCell>
                      <TableCell>
                        <Badge variant={slide.is_active ? "default" : "secondary"}>
                          {slide.is_active ? "Active" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/admin/hero/$id" params={{ id: slide.id }}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setDeleteId(slide.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={Boolean(deleteId)} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete slide?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}

function CardImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadHeroImage(file);
      onUpload(url);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Upload className="h-3.5 w-3.5" />
        )}
        {uploading ? "Uploading..." : "Upload image"}
      </Button>
    </div>
  );
}
