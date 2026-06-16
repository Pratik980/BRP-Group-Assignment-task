import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SiteAssetPicker } from "@/components/admin/SiteAssetPicker";
import { VENTURE_LOGO_ASSETS } from "@/lib/cms/site-assets";
import { uploadVentureImage } from "@/lib/admin/ventures.client";
import {
  VENTURE_CATEGORIES,
  slugifyVenture,
  type VentureFormValues,
} from "@/lib/admin/venture-utils";

type VentureFormProps = {
  initialValues: VentureFormValues;
  submitLabel: string;
  onSubmit: (values: VentureFormValues) => Promise<void>;
  onCancel: () => void;
};

type ImageField = "logo_url" | "cover_image_url";

export function VentureForm({ initialValues, submitLabel, onSubmit, onCancel }: VentureFormProps) {
  const [values, setValues] = useState(initialValues);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues.slug));
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<ImageField | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof VentureFormValues>(key: K, value: VentureFormValues[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !slugTouched) {
        next.slug = slugifyVenture(String(value));
      }
      return next;
    });
  }

  async function handleImageUpload(field: ImageField, file: File | undefined) {
    if (!file) return;
    setUploadingField(field);
    try {
      const url = await uploadVentureImage(file);
      updateField(field, url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!values.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Reddot"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", e.target.value);
            }}
            placeholder="reddot"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={values.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
            placeholder="Short one-line description"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Full venture description"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={values.category}
            onValueChange={(value) =>
              updateField("category", value as VentureFormValues["category"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {VENTURE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="external_url">External URL</Label>
          <Input
            id="external_url"
            type="url"
            value={values.external_url}
            onChange={(e) => updateField("external_url", e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_order">Display order</Label>
          <Input
            id="display_order"
            type="number"
            min={0}
            value={values.display_order}
            onChange={(e) => updateField("display_order", Number(e.target.value) || 0)}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
          <div>
            <Label htmlFor="is_active">Active</Label>
            <p className="text-xs text-muted-foreground">Show on the public website</p>
          </div>
          <Switch
            id="is_active"
            checked={values.is_active}
            onCheckedChange={(checked) => updateField("is_active", checked)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <SiteAssetPicker
          assets={VENTURE_LOGO_ASSETS}
          value={values.logo_url}
          onSelect={(url) => updateField("logo_url", url)}
          label="Venture logos from site library"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <ImageUploadField
          label="Logo"
          value={values.logo_url}
          uploading={uploadingField === "logo_url"}
          inputRef={logoInputRef}
          onUrlChange={(url) => updateField("logo_url", url)}
          onFileSelect={(file) => handleImageUpload("logo_url", file)}
        />
        <ImageUploadField
          label="Cover image"
          value={values.cover_image_url}
          uploading={uploadingField === "cover_image_url"}
          inputRef={coverInputRef}
          onUrlChange={(url) => updateField("cover_image_url", url)}
          onFileSelect={(file) => handleImageUpload("cover_image_url", file)}
        />
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving || uploadingField !== null}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

type ImageUploadFieldProps = {
  label: string;
  value: string;
  uploading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUrlChange: (url: string) => void;
  onFileSelect: (file: File | undefined) => void;
};

function ImageUploadField({
  label,
  value,
  uploading,
  inputRef,
  onUrlChange,
  onFileSelect,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border/60 p-4">
      <Label>{label}</Label>
      {value ? (
        <img src={value} alt="" className="h-24 w-auto max-w-full rounded-md object-contain" />
      ) : (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
          No image
        </div>
      )}
      <Input
        value={value}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Image URL or upload below"
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files?.[0])}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Upload image
      </Button>
    </div>
  );
}
