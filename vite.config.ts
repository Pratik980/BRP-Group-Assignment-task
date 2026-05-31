import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [TanStackRouterVite(), tailwind(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Provide a browser-friendly shim for node:async_hooks used by some libs
      "node:async_hooks": path.resolve(__dirname, "src/shims/async_hooks.ts"),
    },
  },
});
