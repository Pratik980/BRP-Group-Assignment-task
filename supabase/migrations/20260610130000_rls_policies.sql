-- BRP Group CMS — Row Level Security (SRS §5.2)
-- Public site uses anon key + these policies.
-- Admin panel uses service role key server-side (bypasses RLS).

alter table public.hero_slides enable row level security;
alter table public.about_content enable row level security;
alter table public.impact_stats enable row level security;
alter table public.ventures enable row level security;
alter table public.team_members enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_albums enable row level security;
alter table public.gallery_images enable row level security;
alter table public.media_files enable row level security;
alter table public.seo_settings enable row level security;
alter table public.site_settings enable row level security;
alter table public.footer_link_groups enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.job_vacancies enable row level security;
alter table public.job_applications enable row level security;

-- ─── Public read: published / active content ─────────────────────────────────

create policy "Public read active hero slides"
  on public.hero_slides for select to anon, authenticated
  using (is_active = true);

create policy "Public read about content"
  on public.about_content for select to anon, authenticated
  using (true);

create policy "Public read active impact stats"
  on public.impact_stats for select to anon, authenticated
  using (is_active = true);

create policy "Public read active ventures"
  on public.ventures for select to anon, authenticated
  using (is_active = true);

create policy "Public read active team members"
  on public.team_members for select to anon, authenticated
  using (is_active = true);

create policy "Public read blog categories"
  on public.blog_categories for select to anon, authenticated
  using (true);

create policy "Public read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (
    status = 'published'
    and (published_at is null or published_at <= timezone('utc', now()))
  );

create policy "Public read active gallery albums"
  on public.gallery_albums for select to anon, authenticated
  using (is_active = true);

create policy "Public read gallery images"
  on public.gallery_images for select to anon, authenticated
  using (
    exists (
      select 1 from public.gallery_albums a
      where a.id = gallery_images.album_id and a.is_active = true
    )
  );

create policy "Public read media files"
  on public.media_files for select to anon, authenticated
  using (true);

create policy "Public read seo settings"
  on public.seo_settings for select to anon, authenticated
  using (true);

create policy "Public read public site settings"
  on public.site_settings for select to anon, authenticated
  using (key in ('announcement_banner', 'announcement_visible', 'maintenance_mode'));

create policy "Public read footer link groups"
  on public.footer_link_groups for select to anon, authenticated
  using (true);

create policy "Public read open job vacancies"
  on public.job_vacancies for select to anon, authenticated
  using (
    is_active = true
    and status = 'open'
    and application_deadline >= timezone('utc', now())
  );

-- ─── Public write: forms only ────────────────────────────────────────────────

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert to anon, authenticated
  with check (true);

create policy "Anyone can submit job application"
  on public.job_applications for insert to anon, authenticated
  with check (true);
