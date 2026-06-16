-- Allow logged-in admin (authenticated role) to read all CMS tables for the dashboard.
-- Writes still go through service role in server functions during CMS CRUD phases.

create policy "Admin read all hero_slides"
  on public.hero_slides for select to authenticated using (true);

create policy "Admin read all about_content"
  on public.about_content for select to authenticated using (true);

create policy "Admin read all impact_stats"
  on public.impact_stats for select to authenticated using (true);

create policy "Admin read all ventures"
  on public.ventures for select to authenticated using (true);

create policy "Admin read all team_members"
  on public.team_members for select to authenticated using (true);

create policy "Admin read all blog_categories"
  on public.blog_categories for select to authenticated using (true);

create policy "Admin read all blog_posts"
  on public.blog_posts for select to authenticated using (true);

create policy "Admin read all gallery_albums"
  on public.gallery_albums for select to authenticated using (true);

create policy "Admin read all gallery_images"
  on public.gallery_images for select to authenticated using (true);

create policy "Admin read all media_files"
  on public.media_files for select to authenticated using (true);

create policy "Admin read all seo_settings"
  on public.seo_settings for select to authenticated using (true);

create policy "Admin read all site_settings"
  on public.site_settings for select to authenticated using (true);

create policy "Admin read all footer_link_groups"
  on public.footer_link_groups for select to authenticated using (true);

create policy "Admin read all contact_submissions"
  on public.contact_submissions for select to authenticated using (true);

create policy "Admin read all job_vacancies"
  on public.job_vacancies for select to authenticated using (true);

create policy "Admin read all job_applications"
  on public.job_applications for select to authenticated using (true);
