import { describe, it, expect } from "vitest";
import { categoryIcon, dbCategoryToFilter, mapVentureRow } from "@/lib/cms/venture-display";
import { GraduationCap, Cpu, Building2, Compass, Sparkles, TrendingUp } from "lucide-react";
import type { VentureRow } from "@/lib/cms/venture-display";

describe("categoryIcon", () => {
  it("returns GraduationCap for Education", () => {
    expect(categoryIcon("Education")).toBe(GraduationCap);
  });

  it("returns Cpu for Technology", () => {
    expect(categoryIcon("Technology")).toBe(Cpu);
  });

  it("returns Building2 for Real Estate", () => {
    expect(categoryIcon("Real Estate")).toBe(Building2);
  });

  it("returns Compass for Tours & Travel", () => {
    expect(categoryIcon("Tours & Travel")).toBe(Compass);
  });

  it("returns Sparkles for Healthcare", () => {
    expect(categoryIcon("Healthcare")).toBe(Sparkles);
  });

  it("returns TrendingUp for unknown", () => {
    expect(categoryIcon("Unknown")).toBe(TrendingUp);
  });
});

describe("dbCategoryToFilter", () => {
  it("maps Real Estate to Investments & Real Estate", () => {
    expect(dbCategoryToFilter("Real Estate")).toBe("Investments & Real Estate");
  });

  it("maps Tours & Travel to Travel & Hospitality", () => {
    expect(dbCategoryToFilter("Tours & Travel")).toBe("Travel & Hospitality");
  });

  it("passes Education through unchanged", () => {
    expect(dbCategoryToFilter("Education")).toBe("Education");
  });

  it("passes Technology through unchanged", () => {
    expect(dbCategoryToFilter("Technology")).toBe("Technology");
  });

  it("maps Other to Other", () => {
    expect(dbCategoryToFilter("Other")).toBe("Other");
  });
});

describe("mapVentureRow", () => {
  const baseRow: VentureRow = {
    id: "test-1",
    name: "Reddot",
    slug: "reddot",
    category: "Education",
    description: "Quality educational resources.",
    tagline: "EdTech platform",
    logo_url: null,
    cover_image_url: null,
    external_url: null,
    display_order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  };

  it("maps a row to a PublicVenture", () => {
    const result = mapVentureRow(baseRow);
    expect(result.id).toBe("test-1");
    expect(result.name).toBe("Reddot");
    expect(result.slug).toBe("reddot");
    expect(result.category).toBe("Education");
    expect(result.filterCategory).toBe("Education");
    expect(result.code).toBe("REDDOT");
    expect(result.focus).toBe("Digital Learning & Supply of Resources");
  });

  it("sets correct tags from style preset", () => {
    const result = mapVentureRow(baseRow);
    expect(result.tags).toContain("EdTech");
    expect(result.tags).toContain("Digital Learning");
  });

  it("generates desc from tagline when available", () => {
    const row = { ...baseRow, tagline: "Custom tagline" };
    const result = mapVentureRow(row);
    expect(result.desc).toBe("Custom tagline");
  });

  it("falls back to truncated description", () => {
    const row = { ...baseRow, tagline: null, description: "A longer description here" };
    const result = mapVentureRow(row as unknown as VentureRow);
    expect(result.desc).toBe("A longer description here");
  });

  it("maps Real Estate category through dbCategoryToFilter", () => {
    const row = {
      ...baseRow,
      slug: "unknown-slug",
      category: "Real Estate" as const,
    };
    const result = mapVentureRow(row as unknown as VentureRow);
    expect(result.filterCategory).toBe("Investments & Real Estate");
  });

  it("uses default style for unknown slug", () => {
    const row = { ...baseRow, slug: "unknown-venture" };
    const result = mapVentureRow(row as unknown as VentureRow);
    expect(result.code).toBe("VENTURE");
    expect(result.focus).toBe("Operating company");
  });
});
