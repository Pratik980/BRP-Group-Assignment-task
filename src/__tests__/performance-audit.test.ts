import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Performance Audit - Build Assets", () => {
  const distPath = path.resolve("dist");

  it("build output exists", () => {
    expect(fs.existsSync(distPath)).toBe(true);
  });

  it("JS bundles are reasonably sized", () => {
    const assets = findFiles(distPath, ".js");
    assets.forEach((file) => {
      const stat = fs.statSync(file);
      expect(stat.size).toBeLessThan(1024 * 1024);
    });
  });

  it("CSS bundle is reasonably sized", () => {
    const cssFiles = findFiles(distPath, ".css");
    cssFiles.forEach((file) => {
      const stat = fs.statSync(file);
      expect(stat.size).toBeLessThan(300 * 1024);
    });
  });

  it("total JS payload is within budget", () => {
    const jsFiles = findFiles(distPath, ".js");
    const totalSize = jsFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);
    expect(totalSize).toBeLessThan(3 * 1024 * 1024);
  });
});

describe("Performance Audit - Image Optimization", () => {
  it("uses WebP format for optimized images", () => {
    const assetsPath = path.resolve("dist/assets");
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);
      const webpFiles = files.filter((f) => f.endsWith(".webp"));
      expect(webpFiles.length).toBeGreaterThan(0);
    }
  });
});

describe("Performance Audit - Code Splitting", () => {
  it("vendor chunks are separated from app code", () => {
    const assetsPath = path.resolve("dist/assets");
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);
      const hasVendor = files.some((f) => f.startsWith("vendor"));
      const hasReact = files.some((f) => f.startsWith("react-core"));
      expect(hasVendor).toBe(true);
      expect(hasReact).toBe(true);
    }
  });
});

function findFiles(dir: string, ext: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(full, ext));
    } else if (entry.name.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}
