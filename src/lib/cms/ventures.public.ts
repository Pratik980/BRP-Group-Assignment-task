import { supabase } from "@/integrations/supabase/client";
import { ventures as staticVentures } from "@/data/ventures";
import { mapVentureRow, type PublicVenture } from "@/lib/cms/venture-display";

export const PUBLIC_VENTURES_QUERY_KEY = ["public-ventures"] as const;

const VENTURE_SELECT =
  "id, name, slug, tagline, description, logo_url, cover_image_url, category, external_url, display_order, is_active, created_at, updated_at";

function mapStaticVenture(v: (typeof staticVentures)[number]): PublicVenture {
  const row = {
    id: v.slug,
    name: v.name,
    slug: v.slug,
    tagline: v.desc,
    description: v.longDesc,
    logo_url: v.logo,
    cover_image_url: null,
    category:
      v.category === "Travel"
        ? "Tours & Travel"
        : v.category === "Investments"
          ? "Other"
          : v.category === "Real Estate"
            ? "Real Estate"
            : v.category,
    external_url: null,
    display_order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  };
  return mapVentureRow(row);
}

/** Instant portfolio for first paint while CMS data loads in the background. */
export function getStaticPublicVentures(): PublicVenture[] {
  return staticVentures.map(mapStaticVenture);
}

export async function fetchPublicVentures(): Promise<PublicVenture[]> {
  const { data, error } = await supabase
    .from("ventures")
    .select(VENTURE_SELECT)
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.warn("[cms] ventures fetch failed, using static fallback", error.message);
    return staticVentures.map(mapStaticVenture);
  }

  if (!data?.length) {
    return staticVentures.map(mapStaticVenture);
  }

  return data.map(mapVentureRow);
}
