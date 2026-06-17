import { describe, it, expect } from "vitest";
import { ventureSlug } from "@/lib/navigation";

describe("ventureSlug", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(ventureSlug("Small Heaven School")).toBe("small-heaven-school");
  });

  it("removes special characters", () => {
    expect(ventureSlug("B.R.P. Ventures!")).toBe("b-r-p-ventures");
  });

  it("handles single word", () => {
    expect(ventureSlug("Reddot")).toBe("reddot");
  });

  it("trims leading/trailing hyphens", () => {
    expect(ventureSlug("--hello--")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(ventureSlug("")).toBe("");
  });

  it("handles multiple consecutive separators", () => {
    expect(ventureSlug("UB   Ventures")).toBe("ub-ventures");
  });
});
