import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SiteAssetPicker } from "@/components/admin/SiteAssetPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TEAM_DEPARTMENT_EXECUTIVE,
  TEAM_DEPARTMENT_OUR_TEAM,
  TEAM_DEPARTMENTS,
} from "@/lib/admin/team-constants";
import { uploadTeamPhoto, type TeamFormValues } from "@/lib/admin/team.client";
import { EXECUTIVE_PHOTO_ASSETS } from "@/lib/cms/site-assets";

type TeamFormProps = {
  initialValues: TeamFormValues;
  submitLabel: string;
  onSubmit: (values: TeamFormValues) => Promise<void>;
  onCancel: () => void;
  lockDepartment?: boolean;
};

export function TeamForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  lockDepartment,
}: TeamFormProps) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof TeamFormValues>(key: K, value: TeamFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.full_name.trim() || !values.role.trim()) {
      toast.error("Name and role are required");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            value={values.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Section</Label>
          {lockDepartment ? (
            <Input value={values.department} readOnly className="bg-muted/50" />
          ) : (
            <Select value={values.department} onValueChange={(v) => update("department", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEAM_DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d === TEAM_DEPARTMENT_EXECUTIVE ? "Executive team (max 3)" : "Our Team"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <p className="text-xs text-muted-foreground">
            {values.department === TEAM_DEPARTMENT_EXECUTIVE
              ? "Shown in Our Executive Team — limited to 3 people."
              : "Shown in Our Team below the executives on About Us."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Display order</Label>
          <Input
            id="display_order"
            type="number"
            min={0}
            value={values.display_order}
            onChange={(e) => update("display_order", Number(e.target.value) || 0)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={values.bio}
            onChange={(e) => update("bio", e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input
            id="linkedin_url"
            type="url"
            value={values.linkedin_url}
            onChange={(e) => update("linkedin_url", e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
          <Label htmlFor="is_active">Active on website</Label>
          <Switch
            id="is_active"
            checked={values.is_active}
            onCheckedChange={(c) => update("is_active", c)}
          />
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-border/60 p-4">
        <Label>Photo</Label>
        {values.photo_url ? (
          <img src={values.photo_url} alt="" className="h-32 w-32 rounded-lg object-cover" />
        ) : null}
        {values.department === TEAM_DEPARTMENT_EXECUTIVE && (
          <SiteAssetPicker
            assets={EXECUTIVE_PHOTO_ASSETS}
            value={values.photo_url}
            onSelect={(url) => update("photo_url", url)}
            label="Executive photos from site library"
          />
        )}
        <Input
          value={values.photo_url}
          onChange={(e) => update("photo_url", e.target.value)}
          placeholder="Photo URL"
        />
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
              update("photo_url", await uploadTeamPhoto(file));
              toast.success("Photo uploaded");
            } catch {
              toast.error("Upload failed");
            } finally {
              setUploading(false);
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
          Upload photo
        </Button>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading}>
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
