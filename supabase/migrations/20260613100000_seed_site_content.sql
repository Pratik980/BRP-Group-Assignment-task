-- Seed existing website content into CMS tables (safe to re-run)
-- Ventures: upsert by slug so admin edits are preserved

insert into public.ventures (name, slug, tagline, description, category, display_order, is_active) values
  ('Reddot', 'reddot', 'Quality educational resources evolving into a digital learning platform.', 'An established resource provider evolving into a digital learning platform to make quality education available online. Red Dot combines technology and education to make it simple to find various educational resources.', 'Education', 1, true),
  ('Small Heaven School', 'small-heaven-school', 'Academic excellence and holistic development since 2062 B.S.', 'Established in 2062 B.S., committed to maintaining high standards of academic excellence and holistic development. Integrating innovative teaching methodologies with creative exploration.', 'Education', 2, true),
  ('Satin Leaf Investment', 'satin-leaf-investment', 'We invest in ideas and help them maximize their potential.', 'Supporting and investing in companies across education, finance, healthcare, agriculture, energy, and technology. Bridging Nepalese startups with international VC capital.', 'Other', 3, true),
  ('B.R.P. Ventures', 'brp-ventures', 'Property investment, market analysis, and fund management.', 'Specializing in property investment and fund management. Utilizing deep local real estate insight and strategic partnerships for long-term capital success.', 'Real Estate', 4, true),
  ('U.B. Ventures', 'ub-ventures', 'Commercial leasing and structures for institutional growth.', 'An established real estate holding company active for almost a decade. Locating resources, constructing, and providing structures to various businesses and services.', 'Real Estate', 5, true),
  ('BRP Tours & Travels', 'brp-tours-travels', 'Local and international travel management services.', 'Widest coverage of local and international destinations at affordable prices. Delivering excellent services with the aim of becoming your preferred travel agency.', 'Tours & Travel', 6, true)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  category = excluded.category,
  display_order = excluded.display_order,
  is_active = excluded.is_active;

-- Hero slide
insert into public.hero_slides (headline, subheadline, cta_text, cta_url, display_order, is_active)
select
  'Building Nepal''s Future Through Diversified Ventures',
  'Founded in 2019, BRP Group is a business enterprise focused on tech, real estate, education, and healthcare. From more resource-efficient education sectors, smarter buildings, and grids to advanced healthcare, we have been incorporating technology to add customer value.',
  'Explore Ecosystem',
  '#ecosystem',
  0,
  true
where not exists (select 1 from public.hero_slides limit 1);

-- Impact stats (refresh defaults)
delete from public.impact_stats where label in ('Years of legacy', 'Active businesses', 'Networks built');
insert into public.impact_stats (label, value, display_order, is_active) values
  ('Years of legacy', '45+', 1, true),
  ('Active businesses', '10+', 2, true),
  ('Networks built', '1000+', 3, true);

-- Executive team (refresh defaults)
delete from public.team_members where full_name in (
  'Dr. Babu Ram Pokharel', 'Dr. Ubin Pokharel', 'Ms. Bidushi Pandey Pokharel'
);
insert into public.team_members (full_name, role, department, bio, display_order, is_active) values
  ('Dr. Babu Ram Pokharel', 'Chairman Emeritus', 'Executive', 'Founder of the BRP Group legacy. His principles in education, public service, and enterprise continue to shape our corporate culture and long-term direction.', 1, true),
  ('Dr. Ubin Pokharel', 'Chairman', 'Executive', 'Steering BRP Group''s diversified investments across technology, healthcare, education, and real estate — expanding the ecosystem through innovation and strategic US collaborations.', 2, true),
  ('Ms. Bidushi Pandey Pokharel', 'Executive Director', 'Executive', 'Driving operations, organizational excellence, and strategic growth across all business verticals with a focus on sustainable, tech-enabled solutions.', 3, true);

-- About content sections
insert into public.about_content (section_key, title, content, metadata) values
  ('home_history', 'Our History', 'Founded in 2019, BRP Group is a business enterprise focused on tech, real estate, education, and healthcare. From more resource-efficient education sectors, smarter buildings, and grids to advanced healthcare, we have been incorporating technology to add customer value. By combining the real and the digital worlds, we seek to revolutionize the industries and markets and transform every day for billions of people for the better.', '{}'),
  ('about_vision', 'Our Vision', 'Investing and partnering with people to create a better tomorrow.', '{}'),
  ('about_mission', 'Our Mission', 'Promoting great ideas and fueling the growth of various sectors anchored on the principle of economic development.', '{}'),
  ('home_legacy', 'Our Legacy', null, '{"paragraphs":["BRP Group, such as its name is the legacy passed down by late Dr. Babu Ram Pokharel to the BRP Group family. His principles and teachings continue to influence our corporate culture and the direction we are taking.","The foundation of this organization are our Chairman Dr. Ubin Pokharel and Executive Director Ms. Bidushi Pandey Pokharel. They carry on the 45-year history of BRP Group with their continuous effort to keep us aligned to the vision."]}'),
  ('home_community', 'Our Community', null, '{"paragraphs":["The BRP Group understands its responsibility not just to its members but to the society. Our ambition to make an impact in society is not possible without being able to support and empower it.","We continue to assist efforts that improve lives, and we firmly believe that the health and education sectors are crucial to achieving this goal. We have been providing financial or in-kind support to hospitals and schools that serve the community, particularly those where such services are in low supply."]}'),
  ('heritage_strip', 'Heritage & Impact', 'Heritage & Impact', '{}'),
  ('ventures_hero', 'Ventures page intro', 'Operating across critical nodes of education, technology, finance, and logistics — BRP Group combines physical strength with digital adaptability to lead the Himalayan region.', '{}')
on conflict (section_key) do update set
  title = excluded.title,
  content = excluded.content,
  metadata = excluded.metadata;

-- Expand public read for contact-related site settings
drop policy if exists "Public read public site settings" on public.site_settings;
create policy "Public read public site settings"
  on public.site_settings for select to anon, authenticated
  using (key in (
    'announcement_banner', 'announcement_visible', 'maintenance_mode',
    'company_address', 'company_phone', 'company_email', 'google_maps_url',
    'linkedin_url', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url'
  ));

-- Admin write policies for remaining CMS tables
create policy "Admin insert hero_slides" on public.hero_slides for insert to authenticated with check (true);
create policy "Admin update hero_slides" on public.hero_slides for update to authenticated using (true) with check (true);
create policy "Admin delete hero_slides" on public.hero_slides for delete to authenticated using (true);

create policy "Admin insert impact_stats" on public.impact_stats for insert to authenticated with check (true);
create policy "Admin update impact_stats" on public.impact_stats for update to authenticated using (true) with check (true);
create policy "Admin delete impact_stats" on public.impact_stats for delete to authenticated using (true);

create policy "Admin insert about_content" on public.about_content for insert to authenticated with check (true);
create policy "Admin update about_content" on public.about_content for update to authenticated using (true) with check (true);
create policy "Admin delete about_content" on public.about_content for delete to authenticated using (true);

create policy "Admin insert site_settings" on public.site_settings for insert to authenticated with check (true);
create policy "Admin update site_settings" on public.site_settings for update to authenticated using (true) with check (true);

create policy "Admin insert seo_settings" on public.seo_settings for insert to authenticated with check (true);
create policy "Admin update seo_settings" on public.seo_settings for update to authenticated using (true) with check (true);

create policy "Admin insert footer_link_groups" on public.footer_link_groups for insert to authenticated with check (true);
create policy "Admin update footer_link_groups" on public.footer_link_groups for update to authenticated using (true) with check (true);
create policy "Admin delete footer_link_groups" on public.footer_link_groups for delete to authenticated using (true);
