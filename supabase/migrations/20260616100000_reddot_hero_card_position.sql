-- Nudge Reddot hero card slightly left
update public.about_sections
set metadata = jsonb_set(
  metadata,
  '{cards}',
  (
    select jsonb_agg(
      case
        when card->>'title' = 'Reddot' then
          jsonb_set(
            card,
            '{positionClass}',
            '"left-[78%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]"'::jsonb
          )
        else card
      end
    )
    from jsonb_array_elements(metadata->'cards') as card
  )
)
where section_key = 'hero_visual_cards'
  and metadata->'cards' is not null;
