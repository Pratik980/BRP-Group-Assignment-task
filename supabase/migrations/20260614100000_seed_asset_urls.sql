-- Link ventures and executives to public /site-assets/ URLs (editable in admin)

update public.ventures set logo_url = '/site-assets/reddot.webp' where slug = 'reddot';
update public.ventures set logo_url = '/site-assets/shs.webp' where slug = 'small-heaven-school';
update public.ventures set logo_url = '/site-assets/satin-leaf.webp' where slug = 'satin-leaf-investment';
update public.ventures set logo_url = '/site-assets/logo-BRP.webp' where slug = 'brp-ventures';
update public.ventures set logo_url = '/site-assets/uv-ventures.webp' where slug = 'ub-ventures';
update public.ventures set logo_url = '/site-assets/Brp-tours-and-travel.webp' where slug = 'brp-tours-travels';

update public.team_members set
  department = 'Executive',
  photo_url = '/site-assets/Brp-sir-image.webp'
where full_name = 'Dr. Babu Ram Pokharel';

update public.team_members set
  department = 'Executive',
  photo_url = '/site-assets/Ubin-Pokherel-1200.webp'
where full_name = 'Dr. Ubin Pokharel';

update public.team_members set
  department = 'Executive',
  photo_url = '/site-assets/Bidushi-Pandey-Pokherel-1200.webp'
where full_name = 'Ms. Bidushi Pandey Pokharel';
