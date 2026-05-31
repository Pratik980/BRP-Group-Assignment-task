import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const shouldAnalyze = process.env.ANALYZE === "true" || mode === "analyze";

  return {
    plugins: [
      TanStackRouterVite(),
      tailwind(),
      react(),
      shouldAnalyze && visualizer({ filename: "dist/bundle-stats.html", open: false }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        // Provide a browser-friendly shim for node:async_hooks used by some libs
        "node:async_hooks": path.resolve(__dirname, "src/shims/async_hooks.ts"),
      },
    },
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id) return null;
            if (id.includes("node_modules")) {
              // Keep React core isolated, but avoid catching packages like @tanstack/react-*
              // which can introduce circular chunk dependencies with generic vendor code.
              if (
                id.includes("/node_modules/react/") ||
                id.includes("/node_modules/react-dom/") ||
                id.includes("/node_modules/scheduler/")
              ) {
                return "react-core";
              }
              if (id.includes("three") || id.includes("@react-three")) return "three-vendor";
              if (id.includes("framer-motion")) return "framer";
              return "vendor";
            }
          },
        },
      },
    },
  };
});
