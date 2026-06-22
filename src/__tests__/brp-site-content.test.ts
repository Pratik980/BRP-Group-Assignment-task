import { describe, it, expect } from "vitest";
import {
  siteMeta,
  ourHistory,
  ourLegacy,
  ourCommunity,
  communityPage,
} from "@/data/brp-site-content";

describe("siteMeta", () => {
  it("has required fields", () => {
    expect(siteMeta.foundedYear).toBe(2019);
    expect(siteMeta.domain).toContain("brpgroup.com.np");
    expect(siteMeta.email).toContain("@");
    expect(siteMeta.phone).toBeTruthy();
    expect(siteMeta.headquarters).toContain("Kathmandu");
  });

  it("has all social links", () => {
    expect(siteMeta.linkedIn).toContain("linkedin.com");
    expect(siteMeta.facebook).toContain("facebook.com");
    expect(siteMeta.instagram).toContain("instagram.com");
  });

  it("is typed as const (immutable at type level)", () => {
    expect(siteMeta.foundedYear).toBe(2019);
  });
});

describe("ourHistory", () => {
  it("has label and body", () => {
    expect(ourHistory.label).toBe("Our History");
    expect(ourHistory.body.length).toBeGreaterThan(100);
  });
});

describe("ourLegacy", () => {
  it("has non-empty paragraphs", () => {
    expect(ourLegacy.paragraphs.length).toBeGreaterThan(0);
    ourLegacy.paragraphs.forEach((p) => {
      expect(p.length).toBeGreaterThan(20);
    });
  });
});

describe("ourCommunity", () => {
  it("has non-empty paragraphs", () => {
    expect(ourCommunity.paragraphs.length).toBeGreaterThan(0);
  });
});

describe("communityPage", () => {
  it("has all required sections", () => {
    expect(communityPage.heroTitle).toBeTruthy();
    expect(communityPage.heroHeadline).toBeTruthy();
    expect(communityPage.highlights.length).toBeGreaterThan(0);
    expect(communityPage.sections.length).toBeGreaterThan(0);
  });

  it("highlights have value and label", () => {
    communityPage.highlights.forEach((h) => {
      expect(h.value).toBeTruthy();
      expect(h.label).toBeTruthy();
    });
  });
});
