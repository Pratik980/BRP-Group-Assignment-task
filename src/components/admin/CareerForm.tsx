import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMPLOYMENT_TYPES,
  VACANCY_STATUSES,
  type VacancyFormValues,
} from "@/lib/admin/careers.client";

type Props = {
  initialValues: VacancyFormValues;
  submitLabel: string;
  onSubmit: (values: VacancyFormValues) => Promise<void>;
  onCancel: () => void;
};

export function CareerForm({ initialValues, submitLabel, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<VacancyFormValues>(initialValues);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof VacancyFormValues>(field: K, value: VacancyFormValues[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const addRequirement = () => setForm((f) => ({ ...f, requirements: [...f.requirements, ""] }));

  const removeRequirement = (i: number) =>
    setForm((f) => ({
      ...f,
      requirements: f.requirements.filter((_, idx) => idx !== i),
    }));

  const updateRequirement = (i: number, val: string) =>
    setForm((f) => {
      const r = [...f.requirements];
      r[i] = val;
      return { ...f, requirements: r };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.department.trim()) return;
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Job title *</Label>
          <Input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label>Department *</Label>
          <Input
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            placeholder="e.g. Technology"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Kathmandu, Nepal"
          />
        </div>
        <div className="space-y-2">
          <Label>Employment type</Label>
          <Select value={form.employment_type} onValueChange={(v) => update("employment_type", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Experience required</Label>
          <Input
            value={form.experience_required}
            onChange={(e) => update("experience_required", e.target.value)}
            placeholder="e.g. 3+ years"
          />
        </div>
        <div className="space-y-2">
          <Label>Salary range</Label>
          <Input
            value={form.salary_range}
            onChange={(e) => update("salary_range", e.target.value)}
            placeholder="e.g. NPR 80,000 - 120,000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={5}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Requirements</Label>
          <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        {form.requirements.map((req, i) => (
          <div key={i} className="flex items-start gap-2">
            <Input
              value={req}
              onChange={(e) => updateRequirement(i, e.target.value)}
              placeholder="Requirement"
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeRequirement(i)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Application deadline</Label>
          <Input
            type="date"
            value={form.application_deadline ? form.application_deadline.slice(0, 10) : ""}
            onChange={(e) => update("application_deadline", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => update("status", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VACANCY_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Apply email</Label>
          <Input
            value={form.apply_email}
            onChange={(e) => update("apply_email", e.target.value)}
            placeholder="hr@brpgroup.com.np"
          />
        </div>
        <div className="space-y-2">
          <Label>Apply URL</Label>
          <Input
            value={form.apply_url}
            onChange={(e) => update("apply_url", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border px-4 py-3">
        <Label>Active</Label>
        <Switch checked={form.is_active} onCheckedChange={(c) => update("is_active", c)} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
