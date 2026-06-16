# BRP Group — Homepage Redesign

Modern, responsive marketing site for [BRP Group](https://www.brpgroup.com.np), built as a Web Developer Intern technical assessment project.

## Live site

**[https://brpgroup.vercel.app/](https://brpgroup.vercel.app/)**

## Repository

**[https://github.com/Pratik980/BRP-Group-Assignment-task](https://github.com/Pratik980/BRP-Group-Assignment-task)**

**Technical summary (assignment):** [TECHNICAL_SUMMARY.md](./TECHNICAL_SUMMARY.md)

## Overview

The homepage presents BRP Group’s diversified venture ecosystem with a polished hero, heritage highlights, an interactive ventures hub, leadership and community storytelling, values, contact, and footer. Additional routes extend the experience:

| Route       | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `/`         | Homepage — hero, about content, ventures ecosystem, gallery, values, contact |
| `/ventures` | Full portfolio of all business verticals                                     |
| `/about`    | Vision, mission, leadership, community                                       |
| `/history`  | Company history timeline                                                     |

Content is aligned with the official site at [brpgroup.com.np](https://www.brpgroup.com.np).

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** — dev server and production build
- **TanStack Router** — file-based routing
- **Tailwind CSS 4** — styling and responsive layout
- **Framer Motion** — scroll and UI animations
- **Three.js** + **React Three Fiber** — lazy-loaded 3D hero scene (desktop)
- **Supabase** (optional) — contact form submissions
- **Vercel** — deployment

## Features

- Fully responsive layout (mobile, tablet, desktop)
- Interactive **Ventures Ecosystem** — rotating detail panel, venture navigator, logos, tags
- Contact section with form, office details, and map
- Optimized WebP imagery, code-split vendor chunks
- SEO meta tags per route
- Reduced-motion and low-power fallbacks for the 3D hero

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

### Lint & format

```bash
npm run lint
npm run format
```

## Environment variables (optional)

Contact form persistence requires Supabase. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Without these variables, the form still validates and shows a success state for demo use; submissions are not stored.

## Project structure

```
src/
├── assets/          # Images (optimized WebP)
├── components/
│   ├── brp/         # Brand sections (Hero, VenturesEcosystem, CTA, Footer, …)
│   └── ui/          # Shared UI primitives
├── data/            # Site copy and ventures data
├── routes/          # Pages (index, about, ventures, history)
├── integrations/    # Supabase client
├── lib/             # Utilities
├── main.tsx
└── styles.css
```

## Deployment

The site is deployed on Vercel from the `main` branch. Configuration lives in `vercel.json` (Vite build → `dist`, SPA fallback).

To deploy your own fork:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set build command: `npm run build`, output directory: `dist`
4. Add `VITE_SUPABASE_*` env vars if using the contact backend

## Official reference

- Current BRP Group website: [www.brpgroup.com.np](https://www.brpgroup.com.np)

---

_Web Developer Intern — Technical Assessment · BRP Group / UB Ventures_
