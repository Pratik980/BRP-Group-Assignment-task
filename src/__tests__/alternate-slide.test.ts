import { describe, it, expect } from "vitest";
import { slideEase, alternateSlideIn, splitSlideIn } from "@/lib/alternate-slide";

describe("slideEase", () => {
  it("is a tuple of 4 numbers", () => {
    expect(slideEase).toHaveLength(4);
    expect(slideEase.every((n) => typeof n === "number")).toBe(true);
  });
});

describe("alternateSlideIn", () => {
  it("returns different x direction for even vs odd indices", () => {
    const even = alternateSlideIn(0);
    const odd = alternateSlideIn(1);
    expect(even.initial.x).toBeLessThan(0);
    expect(odd.initial.x).toBeGreaterThan(0);
  });

  it("uses reduced motion when enabled", () => {
    const result = alternateSlideIn(0, { reduceMotion: true });
    expect(result.initial).toEqual({ opacity: 0 });
    expect(result.initial).not.toHaveProperty("x");
  });

  it("uses custom margin", () => {
    const result = alternateSlideIn(0, { margin: "-100px" });
    expect(result.viewport.margin).toBe("-100px");
  });

  it("uses custom duration", () => {
    const result = alternateSlideIn(0, { duration: 1.5 });
    expect(result.transition.duration).toBe(1.5);
  });

  it("viewport is observed once", () => {
    const result = alternateSlideIn(0);
    expect(result.viewport.once).toBe(true);
  });
});

describe("splitSlideIn", () => {
  it("visual enters from left on even index", () => {
    const visual = splitSlideIn(0, "visual");
    expect(visual.initial.x).toBeLessThan(0);
  });

  it("content enters from right on even index", () => {
    const content = splitSlideIn(0, "content");
    expect(content.initial.x).toBeGreaterThan(0);
  });

  it("visual enters from right on odd index (alternating)", () => {
    const visual = splitSlideIn(1, "visual");
    expect(visual.initial.x).toBeGreaterThan(0);
  });

  it("respects reduced motion", () => {
    const result = splitSlideIn(0, "visual", { reduceMotion: true });
    expect(result.initial).toEqual({ opacity: 0 });
    expect(result.initial).not.toHaveProperty("x");
  });
});
