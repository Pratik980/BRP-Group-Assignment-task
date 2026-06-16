-- Seed hero visual cards (editable in admin)
insert into public.about_content (section_key, title, content, metadata)
values (
  'hero_visual_cards',
  'Hero visual cards',
  'The floating cards shown in the homepage hero section.',
  '{
    "cards": [
      {
        "title": "Small Heaven School",
        "image": "/site-assets/shs.webp",
        "baseRotateX": 8,
        "baseRotateY": 0,
        "floatDuration": 5.6,
        "floatDelay": 0.1,
        "positionClass": "left-[50%] top-[18%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
        "bgColor": "#28160f"
      },
      {
        "title": "Satin Leaf Investment",
        "image": "/site-assets/satin-leaf.webp",
        "baseRotateX": 0,
        "baseRotateY": -10,
        "floatDuration": 5.2,
        "floatDelay": 0.3,
        "positionClass": "left-[70%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
        "bgColor": "#141d0f"
      },
      {
        "title": "B.R.P. Ventures",
        "image": "/site-assets/logo-BRP.webp",
        "baseRotateX": -8,
        "baseRotateY": 0,
        "floatDuration": 5.8,
        "floatDelay": 0.7,
        "positionClass": "left-[50%] top-[72%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[1.8rem]",
        "bgColor": "#0b1424"
      },
      {
        "title": "Reddot",
        "image": "/site-assets/reddot.webp",
        "baseRotateX": 4,
        "baseRotateY": -4,
        "floatDuration": 4.8,
        "floatDelay": 0.2,
        "positionClass": "left-[78%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
        "bgColor": "#121212"
      },
      {
        "title": "BRP Tours & Travels",
        "image": "/site-assets/Brp-tours-and-travel.webp",
        "baseRotateX": -4,
        "baseRotateY": 4,
        "floatDuration": 6.4,
        "floatDelay": 0.6,
        "positionClass": "left-[22%] top-[68%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-[1.4rem]",
        "bgColor": "#101e14"
      }
    ]
  }'::jsonb
)
on conflict (section_key) do update set
  metadata = excluded.metadata;
