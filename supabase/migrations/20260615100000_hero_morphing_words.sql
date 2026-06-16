-- Hero headline rotating words (editable in admin → Hero)
insert into public.about_content (section_key, title, content, metadata)
values (
  'hero_morphing_words',
  'Hero rotating words',
  'Words that cycle in the homepage hero headline after "Through Diversified".',
  '{"words": ["Ventures", "Innovation", "Growth", "Legacy"]}'::jsonb
)
on conflict (section_key) do nothing;
