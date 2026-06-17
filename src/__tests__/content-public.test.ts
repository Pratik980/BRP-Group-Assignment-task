import { describe, it, expect } from "vitest";
import { parseStatValue, mergeSiteMeta } from "@/lib/cms/content.public";
import { siteMeta } from "@/data/brp-site-content";

describe("parseStatValue", () => {
  it("parses number with suffix", () => {
    expect(parseStatValue("10+")).toEqual({ target: 10, suffix: "+" });
  });

  it("parses plain number", () => {
    expect(parseStatValue("45")).toEqual({ target: 45, suffix: "" });
  });

  it("handles commas", () => {
    expect(parseStatValue("1,000+")).toEqual({ target: 1000, suffix: "+" });
  });

  it("returns zeros for empty string", () => {
    expect(parseStatValue("")).toEqual({ target: 0, suffix: "" });
  });

  it("returns zeros for non-numeric", () => {
    expect(parseStatValue("abc")).toEqual({ target: 0, suffix: "" });
  });
});

describe("mergeSiteMeta", () => {
  it("merges with defaults when settings are empty", () => {
    const result = mergeSiteMeta({});
    expect(result.email).toBe(siteMeta.email);
    expect(result.phone).toBe(siteMeta.phone);
  });

  it("overrides with provided settings", () => {
    const result = mergeSiteMeta({
      company_email: "test@brpgroup.com.np",
      linkedin_url: "https://linkedin.com/test",
    });
    expect(result.email).toBe("test@brpgroup.com.np");
    expect(result.linkedIn).toBe("https://linkedin.com/test");
    expect(result.phone).toBe(siteMeta.phone);
  });

  it("preserves all required fields", () => {
    const result = mergeSiteMeta({});
    expect(result).toHaveProperty("foundedYear");
    expect(result).toHaveProperty("domain");
    expect(result).toHaveProperty("headquarters");
    expect(result).toHaveProperty("facebook");
    expect(result).toHaveProperty("instagram");
  });
});
