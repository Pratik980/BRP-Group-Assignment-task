-- Community page content (editable in admin → Community)
insert into public.about_content (section_key, title, content, metadata)
values (
  'community_page',
  'Our Community',
  'The BRP Group understands its responsibility not just to its members but to the society. Our ambition to make an impact in society is not possible without being able to support and empower it. We continue to assist efforts that improve lives, and we firmly believe that the health and education sectors are crucial to achieving this goal. We have been providing financial or in-kind support to hospitals and schools that serve the community, particularly those where such services are in low supply.',
  '{
    "heroHeadline": "Empowering through health & education",
    "heroLocation": "Chhoprak · Siranchok Rural Municipality, Gorkha",
    "highlights": [
      { "value": "50+", "label": "Scholarships" },
      { "value": "1000+", "label": "Happy Faces" }
    ],
    "sections": [
      {
        "headline": "Education",
        "paragraphs": [
          "Established by the late Dr. Babu Ram Pokharel, Shree Mandali, a higher secondary school and Shree Janakalyan, a primary level school in Siranchok Rural Municipality, Gorkha has been serving to educate hundreds of children from Chhoprak and the nearby villages.",
          "BRP Group has been continuously improving the infrastructure and facilities at these schools. We have also introduced a library room and computer lab in Shree Mandali to help students find more resources for their interests."
        ]
      },
      {
        "headline": "Healthcare",
        "paragraphs": [
          "Similarly, we are also supporting the local healthcare center in Chhoprak village through means of infrastructure and resources. Working closely with the local community we supported the construction of the healthcare center and have been helping to expand their services.",
          "The health center is equipped with a maternity ward for pregnancy and post-natal care that has been providing health care services to ensure a safe and healthy environment for women and children."
        ]
      },
      {
        "headline": "Community Centre",
        "paragraphs": [
          "Our activities show that we are proud of our heritage and have started a number of projects to advance Chhoprak. Local support has been essential to what we have accomplished in the region. We intended to inspire the neighborhood to get together and generate ideas for the common good after realizing the potential of local efforts.",
          "The construction of a community center in the village was one of these methods. The center created by the late Dr. Babu Ram Pokharel acts as a focal point for locals to share ideas, get help, work together, and foster inclusivity and solidarity."
        ]
      }
    ],
    "initiativesBadge": "Our initiatives",
    "initiativesTitle": "Impact in Chhoprak",
    "initiativesDescription": "Continuing the legacy of Dr. Babu Ram Pokharel through education, healthcare, and community infrastructure.",
    "galleryBadge": "Gallery",
    "galleryTitle": "Community in action",
    "galleryImages": [
      { "src": "childrents-1200.webp", "label": "Supporting the next generation" },
      { "src": "education-1-1200.webp", "label": "School infrastructure & resources" },
      { "src": "education-2-1200.webp", "label": "Learning environments in Gorkha" },
      { "src": "image-3-1200.webp", "label": "Community outreach programs" },
      { "src": "image-4-1200.webp", "label": "Local partnerships" },
      { "src": "image-5-1200.webp", "label": "Regional initiatives" },
      { "src": "image-6-1200.webp", "label": "Village community programs" }
    ],
    "ctaTitle": "Explore our legacy",
    "ctaDescription": "Learn how BRP Group&apos;s history and leadership shape our commitment to Nepal&apos;s communities.",
    "ctaButtons": [
      { "label": "Our history", "href": "/history" },
      { "label": "About BRP Group", "href": "/about" }
    ]
  }'::jsonb
)
on conflict (section_key) do nothing;
