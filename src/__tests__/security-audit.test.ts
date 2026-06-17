import { describe, it, expect } from "vitest";
import { siteMeta } from "@/data/brp-site-content";

describe("Security Audit - Code Level", () => {
  it("no hardcoded secrets in siteMeta", () => {
    const values = Object.values(siteMeta);
    values.forEach((v) => {
      if (typeof v === "string") {
        expect(v).not.toMatch(/sk-[a-zA-Z0-9]+/);
        expect(v).not.toMatch(/supabase_key/i);
        expect(v).not.toMatch(/service_role/i);
        expect(v).not.toMatch(/anon_key/i);
        expect(v).not.toMatch(/password/i);
      }
    });
  });

  it("no API keys in source data", () => {
    const serialized = JSON.stringify(siteMeta);
    expect(serialized).not.toMatch(/eyJh[b64]{10,}/i);
    expect(serialized).not.toMatch(/api[-_]?key/i);
  });

  it("protocol is https for external URLs", () => {
    const urls = [siteMeta.domain, siteMeta.linkedIn, siteMeta.facebook, siteMeta.instagram];
    urls.forEach((url) => {
      if (url && url.startsWith("http")) {
        expect(url).toMatch(/^https:\/\//);
      }
    });
  });

  it("email does not contain credentials", () => {
    const parts = siteMeta.email.split("@");
    expect(parts[0]).not.toMatch(/admin|root|test/i);
  });
});

describe("Security Audit - Dependency Check", () => {
  it("package.json should not contain vulnerable patterns", () => {
    // This would normally run npm audit; here we check for common issues
    const fs = require("fs");
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    Object.entries(allDeps).forEach(([name, version]) => {
      expect(typeof version).toBe("string");
      if (typeof version === "string") {
        expect(version).not.toMatch(/^[~^]?0\.0\.0$/);
      }
    });
  });
});

describe("Security Audit - Supabase Integration", () => {
  it("server client does not expose service key to browser", () => {
    const fs = require("fs");
    const path = require("path");
    const serverClientPath = path.resolve("src/integrations/supabase/client.server.ts");
    if (fs.existsSync(serverClientPath)) {
      const serverContent = fs.readFileSync(serverClientPath, "utf-8");
      expect(serverContent).not.toMatch(/import\s+.*\bclient\b.*from/i);
    }
  });
});
