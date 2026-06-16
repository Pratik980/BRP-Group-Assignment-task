-- Default site settings (safe to re-run)
insert into public.site_settings (key, value) values
  ('notification_email', 'info@brpgroup.com.np'),
  ('ga_id', ''),
  ('announcement_banner', ''),
  ('announcement_visible', 'false'),
  ('maintenance_mode', 'false'),
  ('company_address', 'Baluwatar, Kathmandu, Nepal 44600'),
  ('company_phone', ''),
  ('company_email', 'info@brpgroup.com.np'),
  ('google_maps_url', ''),
  ('linkedin_url', 'https://www.linkedin.com/company/brpgroupnepal'),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('twitter_url', ''),
  ('youtube_url', '')
on conflict (key) do nothing;

insert into public.seo_settings (page_slug, meta_title, meta_description) values
  ('home', 'BRP Group — Building Nepal''s Future Through Diversified Ventures', 'Founded in 2019, BRP Group is focused on tech, real estate, education, and healthcare across Nepal.'),
  ('about', 'About BRP Group — Vision, Mission & Leadership', 'Learn about BRP Group''s vision, mission, and executive team.'),
  ('ventures', 'BRP Group — Diversified Corporate Ventures Portfolio', 'Explore BRP Group''s interconnected venture ecosystem.'),
  ('history', 'BRP Group — Corporate History & Timeline', 'Explore the 45-year history of BRP Group.'),
  ('community', 'BRP Group — Our Community', 'BRP Group community initiatives in Chhoprak, Gorkha.'),
  ('careers', 'BRP Group — Careers', 'Join BRP Group''s growing ecosystem of ventures in Nepal.'),
  ('contact', 'Contact BRP Group', 'Get in touch with BRP Group headquarters in Kathmandu.')
on conflict (page_slug) do nothing;



