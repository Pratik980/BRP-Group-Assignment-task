BRP Ecosystem — Project Structure

This repo is organized for a Vite + React + TypeScript project.

Top-level

- package.json, vite.config.ts, tsconfig.json, index.html

src/

- assets/ — images, icons, media
- components/
  - brp/ — brand-specific components (Hero, Scene3D, Values, etc.)
  - ui/ — shared UI primitives (buttons, inputs, dialogs)
- hooks/ — custom React hooks
- integrations/ — external service clients (supabase)
- lib/ — utilities and server helpers
- routes/ — route modules for the app
- shims/ — environment shims
- main.tsx, router.tsx, styles.css

Quick start

```bash
npm install
npm run dev
# build
npm run build
```

Reorganization helpers

- `tools/move-root-assets.ps1` — PowerShell script to move common root-level images into `src/assets/brp` (run locally to apply).

If you want me to automatically move files and update imports I can run a scripted refactor, but that may require manual review for any path changes. Tell me whether to proceed automatically or generate a safe script you run locally.
