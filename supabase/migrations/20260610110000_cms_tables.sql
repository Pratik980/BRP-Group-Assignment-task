-- BRP Group CMS — core content tables (SRS §6)

-- ─── Hero / Banner ───────────────────────────────────────────────────────────
create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  subheadline text,
  cta_text text,
  cta_url text,
  background_image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists hero_slides_display_order_idx on public.hero_slides (display_order);
create index if not exists hero_slides_is_active_idx on public.hero_slides (is_active);

drop trigger if exists hero_slides_set_updated_at on public.hero_slides;
create trigger hero_slides_set_updated_at
  before update on public.hero_slides
  for each row execute function public.set_updated_at();

-- ─── About Us (flexible section blocks) ──────────────────────────────────────
create table if not exists public.about_content (
  section_key text primary key,
  title text,
  content text,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

-- ─── Impact statistics ───────────────────────────────────────────────────────
create table if not exists public.impact_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists impact_stats_display_order_idx on public.impact_stats (display_order);

drop trigger if exists impact_stats_set_updated_at on public.impact_stats;
create trigger impact_stats_set_updated_at
  before update on public.impact_stats
  for each row execute function public.set_updated_at();

-- ─── Ventures (CMS-managed portfolio) ────────────────────────────────────────
create table if not exists public.ventures (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text,
  description text,
  logo_url text,
  cover_image_url text,
  category text not null default 'Other',
  external_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint ventures_category_check check (
    category in (
      'Technology',
      'Real Estate',
      'Education',
      'Healthcare',
      'Tours & Travel',
      'Other'
    )
  )
);

create index if not exists ventures_display_order_idx on public.ventures (display_order);
create index if not exists ventures_is_active_idx on public.ventures (is_active);
create index if not exists ventures_category_idx on public.ventures (category);

drop trigger if exists ventures_set_updated_at on public.ventures;
create trigger ventures_set_updated_at
  before update on public.ventures
  for each row execute function public.set_updated_at();

-- ─── Team members ────────────────────────────────────────────────────────────
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  department text not null default 'General',
  bio text,
  photo_url text,
  linkedin_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists team_members_display_order_idx on public.team_members (display_order);
create index if not exists team_members_department_idx on public.team_members (department);
create index if not exists team_members_is_active_idx on public.team_members (is_active);

drop trigger if exists team_members_set_updated_at on public.team_members;
create trigger team_members_set_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

-- ─── Blog ────────────────────────────────────────────────────────────────────
create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  featured_image_url text,
  category_id uuid references public.blog_categories (id) on delete set null,
  tags text[] not null default '{}',
  status text not null default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint blog_posts_status_check check (status in ('draft', 'published', 'scheduled'))
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ─── Gallery ─────────────────────────────────────────────────────────────────
create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums (id) on delete cascade,
  image_url text not null,
  caption text,
  alt_text text,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists gallery_images_album_id_idx on public.gallery_images (album_id);
create index if not exists gallery_images_display_order_idx on public.gallery_images (display_order);

drop trigger if exists gallery_albums_set_updated_at on public.gallery_albums;
create trigger gallery_albums_set_updated_at
  before update on public.gallery_albums
  for each row execute function public.set_updated_at();

-- ─── Media library metadata ──────────────────────────────────────────────────
create table if not exists public.media_files (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  public_url text not null,
  mime_type text,
  file_size_bytes bigint,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists media_files_created_at_idx on public.media_files (created_at desc);

-- ─── SEO & site settings ─────────────────────────────────────────────────────
create table if not exists public.seo_settings (
  page_slug text primary key,
  meta_title text,
  meta_description text,
  og_image_url text,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default timezone('utc', now())
);

-- ─── Footer navigation groups ────────────────────────────────────────────────
create table if not exists public.footer_link_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  links jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists footer_link_groups_display_order_idx on public.footer_link_groups (display_order);

drop trigger if exists footer_link_groups_set_updated_at on public.footer_link_groups;
create trigger footer_link_groups_set_updated_at
  before update on public.footer_link_groups
  for each row execute function public.set_updated_at();
