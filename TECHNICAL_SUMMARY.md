# BRP Group Homepage — Technical Summary

**Candidate project:** Web Developer Intern technical assessment  
**Live site:** [https://brpgroup.vercel.app/](https://brpgroup.vercel.app/)  
**Repository:** [https://github.com/Pratik980/BRP-Group-Assignment-task](https://github.com/Pratik980/BRP-Group-Assignment-task)

---

## Technology stack used

| Layer                     | Technologies                                                                 |
| ------------------------- | ---------------------------------------------------------------------------- |
| **UI**                    | React 19, TypeScript                                                         |
| **Build & dev**           | Vite 7                                                                       |
| **Routing**               | TanStack Router (file-based routes)                                          |
| **Styling**               | Tailwind CSS 4, custom CSS (glass effects, heritage/hero utilities)          |
| **Animation**             | Framer Motion                                                                |
| **3D (hero)**             | Three.js, React Three Fiber, Drei — lazy-loaded on capable devices           |
| **Forms & data**          | Client-side validation; Supabase REST API (optional) for contact submissions |
| **Icons & UI primitives** | Lucide React, Radix UI (shared components)                                   |
| **Assets**                | Optimized WebP images                                                        |
| **Deployment**            | Vercel (static SPA from `dist`)                                              |

**Pages delivered:** Homepage (`/`), Ventures (`/ventures`), About (`/about`), History (`/history`).

---

## Why this stack was selected

1. **React + TypeScript + Vite** — Fast local development, strong typing for maintainable components, and a large ecosystem. Vite keeps build times short compared to older bundlers, which matters when iterating on layout and animation.

2. **TanStack Router** — Type-safe, file-based routing scales cleanly beyond a single homepage. The assignment focused on the homepage, but separate routes for ventures, about, and history mirror how a real corporate site is structured without a heavy framework like Next.js for this scope.

3. **Tailwind CSS 4** — Utility-first styling speeds up responsive work (mobile-first breakpoints) and keeps design tokens (brand colors, spacing) consistent across sections.

4. **Framer Motion** — Declarative scroll and entrance animations suit marketing pages. It integrates well with React and supports `prefers-reduced-motion` for accessibility.

5. **Three.js (hero only)** — A lightweight 3D layer differentiates the hero while staying optional: the scene is code-split, deferred until idle time, and falls back to a gradient if WebGL context is lost or motion is reduced.

6. **Vercel** — Zero-config deployment for Vite SPAs, preview URLs, and HTTPS — meeting the requirement for a public live link with minimal DevOps overhead.

7. **Supabase (optional)** — Serverless Postgres-backed API for contact form storage without building a custom backend, appropriate for an intern-scale deliverable.

---

## Design approach

**Content first** — Copy, venture list, and contact details were taken from [brpgroup.com.np](https://www.brpgroup.com.np) and centralized in `src/data/` so content stays consistent across homepage and inner pages.

**Visual language** — Professional corporate aesthetic: BRP navy/indigo palette, glassmorphism cards, Instrument Serif for headlines, soft aurora gradients and grid textures. The goal was “modern holding company,” not a generic template.

**Homepage narrative (top to bottom)**  
Hero (positioning + CTAs + stats) → value statements → heritage/impact strip → **ventures ecosystem** (primary evaluation section) → legacy & community story panels → corporate gallery → core values → contact/CTA → footer.

**Ventures (weighted section)** — Instead of a static list, an “ecosystem” layout: BRP Group as the hub, a venture navigator with all seven operating companies, and an auto-rotating detail panel (pause on hover/touch) with logos, tags, and long descriptions. A dedicated `/ventures` page expands the portfolio for depth.

**Responsive & inclusive** — Mobile navigation drawer, touch-friendly targets, stacked layouts on small screens, and reduced-motion / low-power handling for the 3D hero. Images use WebP and lazy loading where appropriate.

**Performance** — Manual chunk splitting (React, Framer, Three.js vendors), lazy `Scene3D` import, intersection-based visibility for the canvas, and quality reduction on smaller or constrained devices.

---

## Future improvements

1. **CMS integration** — Connect ventures, leadership bios, and news to a headless CMS (e.g. Sanity or Strapi) so non-developers can update content without redeploying.

2. **Contact & newsletter backend** — Ensure Supabase (or similar) is configured in production; add email notifications on new submissions and wire the footer newsletter to a real provider (e.g. Mailchimp, Resend).

3. **Accessibility audit** — Full WCAG pass: keyboard traps in mobile menu, focus states, aria-live regions for carousel changes, and contrast checks on gradient text.

4. **Performance** — Lighthouse-driven optimizations: further image `srcset`, route-level prefetch, and optional removal or user-toggle for 3D on mobile to maximize Core Web Vitals.

5. **Analytics & SEO** — Google Analytics / Plausible, structured data (Organization, LocalBusiness), sitemap, and Open Graph images per route.

6. **Internationalization** — Nepali/English toggle if BRP Group expands bilingual content on the official site.

7. **Venture detail pages** — Per-slug pages (`/ventures/reddot`) with case studies, team quotes, and external links to each operating company.

8. **Testing** — Playwright E2E for critical flows (navigation, contact form, venture carousel) and visual regression on key breakpoints.

---

_Submitted as part of the BRP Group Homepage Redesign assignment._
