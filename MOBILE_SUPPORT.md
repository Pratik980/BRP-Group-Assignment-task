Mobile support checklist and quick fixes

Summary
- Disabled heavy 3D rendering on small devices by adding a mobile-aware placeholder in `src/components/brp/Hero.tsx`.

Manual testing steps
1. Open the site in Chrome and toggle device toolbar (Ctrl+Shift+M).
2. Test these viewports: 360x800 (small), 412x915 (normal phone), 375x812 (iPhone X), 768x1024 (tablet).
3. Confirm:
   - Navigation is accessible and menu opens/closes on touch.
   - Buttons have comfortable touch targets (~44x44 px).
   - No horizontal scroll (overflow-x hidden on body/main pages).
   - Hero loads lightweight placeholder on small widths (no heavy 3D canvas).
   - Performance: FPS near 60 and CPU/GPU usage reasonable.

Developer notes
- File changed: `src/components/brp/Hero.tsx` — added `MobileScene3DPlaceholder` which uses the existing `useIsMobile` hook to skip rendering `Scene3D` for small screens.
- The 3D scene (`Scene3D`) remains lazy-loaded and will render on larger screens.

Recommended follow-ups
- Audit images in `src/assets` and convert large PNGs to WebP/KTX2.
- Ensure server/hosting sets Brotli/GZIP and caching headers for static assets.
- Run Lighthouse (Mobile) and address top recommendations.
- Consider adding an opt-in "Enable 3D" toggle for power users on mobile.

How I tested locally
- Static code inspection and added the mobile-aware placeholder; runtime verification on a local dev server is recommended.

If you want, I can:
- Run Lighthouse and produce a prioritized fix list.
- Convert large images in `src/assets` and adjust imports.
- Add an "Enable 3D" toggle that persists to localStorage.
