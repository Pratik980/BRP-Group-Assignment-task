/** Public URLs under /site-assets/ (copied from src/assets/optimized at build/setup). */

export type SiteAsset = {
  id: string;
  label: string;
  url: string;
  category: "ventures" | "executive" | "about" | "gallery" | "brand";
};

const base = (file: string) => `/site-assets/${file}`;

export const VENTURE_LOGO_ASSETS: SiteAsset[] = [
  { id: "reddot", label: "Reddot", url: base("reddot.webp"), category: "ventures" },
  {
    id: "small-heaven-school",
    label: "Small Heaven School",
    url: base("shs.webp"),
    category: "ventures",
  },
  {
    id: "satin-leaf-investment",
    label: "Satin Leaf Investment",
    url: base("satin-leaf.webp"),
    category: "ventures",
  },
  {
    id: "brp-ventures",
    label: "B.R.P. Ventures",
    url: base("logo-BRP.webp"),
    category: "ventures",
  },
  {
    id: "ub-ventures",
    label: "U.B. Ventures",
    url: base("uv-ventures.webp"),
    category: "ventures",
  },
  {
    id: "brp-tours-travels",
    label: "BRP Tours & Travels",
    url: base("Brp-tours-and-travel.webp"),
    category: "ventures",
  },
];

export const EXECUTIVE_PHOTO_ASSETS: SiteAsset[] = [
  {
    id: "babu-ram",
    label: "Dr. Babu Ram Pokharel",
    url: base("Brp-sir-image.webp"),
    category: "executive",
  },
  {
    id: "ubin",
    label: "Dr. Ubin Pokharel",
    url: base("Ubin-Pokherel-1200.webp"),
    category: "executive",
  },
  {
    id: "bidushi",
    label: "Ms. Bidushi Pandey Pokharel",
    url: base("Bidushi-Pandey-Pokherel-1200.webp"),
    category: "executive",
  },
];

export const BRAND_ASSETS: SiteAsset[] = [
  { id: "brp-group", label: "BRP Group", url: base("Brp-Group-1200.webp"), category: "brand" },
  { id: "brp-logo", label: "BRP Logo", url: base("BRPGrouplogo.png"), category: "brand" },
];

export const GALLERY_ASSETS: SiteAsset[] = [
  { id: "gallery-1", label: "Corporate gallery 1", url: base("image-1.webp"), category: "gallery" },
  { id: "gallery-2", label: "Corporate gallery 2", url: base("image-2.webp"), category: "gallery" },
  { id: "gallery-3", label: "Corporate gallery 3", url: base("image-3.webp"), category: "gallery" },
  { id: "gallery-4", label: "Corporate gallery 4", url: base("image-4.webp"), category: "gallery" },
  { id: "gallery-5", label: "Corporate gallery 5", url: base("image-5.webp"), category: "gallery" },
  { id: "gallery-6", label: "Corporate gallery 6", url: base("image-6.webp"), category: "gallery" },
  { id: "legacy", label: "Legacy", url: base("legacy-image-1200.webp"), category: "gallery" },
  { id: "community", label: "Community", url: base("childrents-1200.webp"), category: "gallery" },
  {
    id: "hall-of-frame",
    label: "Hall of frame",
    url: base("hall-of-frame.webp"),
    category: "gallery",
  },
];

export const ALL_SITE_ASSETS: SiteAsset[] = [
  ...VENTURE_LOGO_ASSETS,
  ...EXECUTIVE_PHOTO_ASSETS,
  ...BRAND_ASSETS,
  ...GALLERY_ASSETS,
];

export const VENTURE_LOGO_BY_SLUG = Object.fromEntries(
  VENTURE_LOGO_ASSETS.map((a) => [a.id, a.url]),
) as Record<string, string>;

export const EXECUTIVE_PHOTO_BY_NAME: Record<string, string> = {
  "Dr. Babu Ram Pokharel": base("Brp-sir-image.webp"),
  "Dr. Ubin Pokharel": base("Ubin-Pokherel-1200.webp"),
  "Ms. Bidushi Pandey Pokharel": base("Bidushi-Pandey-Pokherel-1200.webp"),
};
