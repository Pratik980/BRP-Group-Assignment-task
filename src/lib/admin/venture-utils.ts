export const VENTURE_CATEGORIES = [
  "Technology",
  "Real Estate",
  "Education",
  "Healthcare",
  "Tours & Travel",
  "Other",
] as const;

export type VentureCategory = (typeof VENTURE_CATEGORIES)[number];

export function slugifyVenture(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type VentureFormValues = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: VentureCategory;
  external_url: string;
  logo_url: string;
  cover_image_url: string;
  display_order: number;
  is_active: boolean;
};

export const emptyVentureForm = (): VentureFormValues => ({
  name: "",
  slug: "",
  tagline: "",
  description: "",
  category: "Other",
  external_url: "",
  logo_url: "",
  cover_image_url: "",
  display_order: 0,
  is_active: true,
});
