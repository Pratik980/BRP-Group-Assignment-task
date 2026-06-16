# BRP Group — Backend & Database Setup

This guide covers **Phase 1** of the CMS SRS: Supabase schema, RLS, storage, and env configuration.

## Prerequisites

1. A [Supabase](https://supabase.com) project (project ref: `tjlfsknqrhyyafjlpxud`)
2. [Supabase CLI](https://supabase.com/docs/guides/cli) (optional but recommended)
3. Node.js 20+

## 1. Environment variables

Copy the example file and fill in your keys from **Supabase → Project Settings → API**:

```bash
cp .env.example .env
```

| Variable                        | Where to find it                | Used by                 |
| ------------------------------- | ------------------------------- | ----------------------- |
| `VITE_SUPABASE_URL`             | Project URL                     | Browser + server        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `anon` / publishable key        | Browser (public)        |
| `SUPABASE_SERVICE_ROLE_KEY`     | `service_role` key (**secret**) | Server only — admin CMS |

> **Never** put `SUPABASE_SERVICE_ROLE_KEY` in a `VITE_` variable or commit it to git.

Also add the same server vars in **Vercel → Settings → Environment Variables** for production.

## 2. Apply database migrations

### Option A — Supabase CLI (recommended)

```bash
npx supabase login
npx supabase link --project-ref tjlfsknqrhyyafjlpxud
npx supabase db push
```

### Option B — Supabase SQL Editor

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Run each file in `supabase/migrations/` **in order**:
   - `20260610100000_extensions_and_helpers.sql`
   - `20260610110000_cms_tables.sql`
   - `20260610120000_extend_existing_tables.sql`
   - `20260610130000_rls_policies.sql`
   - `20260610140000_storage_buckets.sql`
   - `20260611100000_admin_authenticated_read.sql`
   - `20260612100000_admin_authenticated_write.sql` _(required for Phase 3 CMS CRUD)_
3. Optionally run `supabase/seed.sql` for default SEO + site settings

### Option C — From this project terminal (recommended after first setup)

1. Create a **personal access token** at [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
2. Add to `.env`:
   ```
   SUPABASE_ACCESS_TOKEN=your_token_here
   ```
3. Run any migration file:
   ```powershell
   npm run db:sql -- supabase/migrations/20260612100000_admin_authenticated_write.sql
   ```

> The service role key in `.env` is **not** enough for running SQL — it only powers the app API. Migrations need either a personal access token or a `DATABASE_URL` (Postgres password from **Settings → Database**).

## 3. Create the admin user

In Supabase Dashboard → **Authentication → Users → Add user**:

- Email: your admin email
- Password: strong password
- Disable public signups: **Authentication → Providers → Email → Disable sign ups**

There is only **one** admin account (per SRS).

## 4. Storage buckets

Migrations create:

| Bucket    | Public | Purpose                              |
| --------- | ------ | ------------------------------------ |
| `media`   | Yes    | Website images (hero, team, gallery) |
| `resumes` | No     | Career application CV uploads        |

## 5. Regenerate TypeScript types (after schema changes)

```bash
npx supabase gen types typescript --project-id tjlfsknqrhyyafjlpxud > src/integrations/supabase/types.ts
```

Or from a linked project:

```bash
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

## 6. Database tables overview

| Table                 | Purpose                                       |
| --------------------- | --------------------------------------------- |
| `hero_slides`         | Homepage banner slides                        |
| `about_content`       | About Us text blocks (keyed by `section_key`) |
| `impact_stats`        | Counter widgets                               |
| `ventures`            | CMS venture portfolio                         |
| `team_members`        | Team / leadership profiles                    |
| `blog_categories`     | Blog categories                               |
| `blog_posts`          | News & blog articles                          |
| `gallery_albums`      | Photo albums                                  |
| `gallery_images`      | Photos within albums                          |
| `media_files`         | Media library metadata                        |
| `seo_settings`        | Per-page SEO                                  |
| `site_settings`       | Global config (key-value)                     |
| `footer_link_groups`  | Footer navigation                             |
| `contact_submissions` | Contact form inbox                            |
| `job_vacancies`       | Career postings                               |
| `job_applications`    | Career applications                           |

## 7. Security model

- **Public site** → `VITE_SUPABASE_PUBLISHABLE_KEY` + RLS (read published content, insert forms)
- **Admin CMS** → `SUPABASE_SERVICE_ROLE_KEY` in **server functions only** (`client.server.ts`)
- All tables have RLS enabled

## 8. Verify setup

```bash
npm run dev
```

Submit the contact form — a row should appear in `contact_submissions` in Supabase Table Editor.

## Next steps (Phase 2)

- `/admin/login` route
- Auth guard middleware for `/admin/*`
- Admin dashboard shell
