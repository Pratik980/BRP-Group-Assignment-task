-- Seed default content for the history page and legacy section

insert into public.about_content (section_key, title, content, metadata) values
  ('history_page', 'History page', null, '{
    "heroBadge": "Our Timeline",
    "heroTitle": "Chronicle of Trust",
    "heroDescription": "A 45-year narrative of corporate responsibility, educational transformation, and compound value creation across Nepal.",
    "overviewBadge": "Overview",
    "overviewTitle": "Complete timeline",
    "milestones": [
      {
        "period": "2040-50 BS",
        "title": "The Educational Genesis",
        "iconName": "GraduationCap",
        "description": "Dr. Babu Ram Pokharel started his long and impactful journey in the education sector with the establishment of V.S. Niketan School in 2037 B.S. A school that was initiated with 7 teachers and 147 students is now one of the biggest educational institutions in the country.\nHe was also the founding member of Private and Boarding Schools\u2019 Organization Nepal (PABSON), established in B.S. 2047.",
        "imageUrl": "",
        "extraImages": [],
        "glowColor": "oklch(0.65 0.18 15 / 0.15)"
      },
      {
        "period": "2050-60 BS",
        "title": "National Recognition & Honors",
        "iconName": "Award",
        "description": "Recognizing the efforts of Dr. Babu Ram Pokharel and his initiatives in the social sector of the country, he was awarded with the Gorkha Dakshina Bahu in B.S. 2054, highest of awards from the then kingship of Nepal. He also received the Trishakti Patta, and the Birendra-Aishwarya medal in the years B.S. 2056 and B.S 2059 respectively.",
        "imageUrl": "",
        "extraImages": [],
        "glowColor": "oklch(0.6 0.15 240 / 0.15)"
      },
      {
        "period": "2060-70 BS",
        "title": "Institutional Scaling & Public Service",
        "iconName": "Landmark",
        "description": "V.S. Niketan has been able to accomplish excellent outcomes in education since the 37 years of its establishment. Having won the Best School of the Nation award in B.S. 2065, it is now a family for 300+ teachers and about 5000 students.\nHis influence in bringing reforms doesn\u2019t only limit to the education sector, an equally active member of the society Dr. Babu Ram Pokharel was the member of parliament from B.S. 2070.",
        "imageUrl": "",
        "extraImages": ["", "", ""],
        "glowColor": "oklch(0.65 0.16 180 / 0.15)"
      },
      {
        "period": "2070-80 BS",
        "title": "Legacy Transition & Ecosystem Building",
        "iconName": "Compass",
        "description": "A visionary and an influential figure for thousands of people, Dr. Babu Ram Pokharel was also actively involved in more than a dozen social groups, such as the Rotary Club, Lions Clubs, Community Development and Guidance Center (CDGC), SAARC Relations Council, and others.\nHis involvements, deeds, and beliefs have now paved a way and given younger generations direction. The legacy of Dr. Babu Ram Pokharel is carried on by Dr. Ubin Pokharel and Ms. Bidushi Pandey Pokharel, who embody the same values and ethics but are motivated by fresher concepts.",
        "imageUrl": "",
        "extraImages": [],
        "glowColor": "oklch(0.55 0.15 280 / 0.15)"
      }
    ]
  }'::jsonb),

  ('history_legacy', 'History legacy section', null, '{
    "introBadge": "Carrying the Torch",
    "introTitle": "Our Legacy",
    "introDescription": "BRP Group is more than a name \u2014 it is the living legacy of late Dr. Babu Ram Pokharel, carried forward by a new generation driven by the same values, renewed purpose, and a vision for Nepal\u2019s tomorrow.",
    "torchBadge": "Passing the Torch",
    "torchTitle": "From One Generation to the Next",
    "founder": {
      "title": "The Man Behind the Vision",
      "paragraphs": [
        "Dr. Babu Ram Pokharel\u2019s journey began with a single school \u2014 V.S. Niketan \u2014 founded in 2037 B.S. with 7 teachers and 147 students. What started as a humble educational initiative grew into a lifelong mission of public service, enterprise, and community upliftment that would span over four decades.",
        "Recognized nationally with the Gorkha Dakshina Bahu, Trishakti Patta, and the Birendra-Aishwarya medals, Dr. Pokharel\u2019s influence extended far beyond education. He served as a member of parliament, was a founding member of PABSON, and actively contributed to Rotary Clubs, Lions Clubs, CDGC, and the SAARC Relations Council.",
        "His life was a testament to the belief that true leadership is measured not by what you accumulate, but by what you pass on. He planted seeds of education, nurtured institutions of care, and built bridges of opportunity \u2014 a legacy that now finds its next caretakers."
      ],
      "imageUrl": "",
      "name": "Dr. Babu Ram Pokharel",
      "subtitle": "Chairman Emeritus \u00b7 1947\u20132022"
    },
    "torchActs": [
      {
        "id": "foundation",
        "label": "1947 \u2013 2022",
        "title": "The Foundation",
        "subtitle": "Dr. Babu Ram Pokharel",
        "description": "A lifetime dedicated to education, public service, and nation-building. From a single school to a legacy that would span generations.",
        "quote": "",
        "quoteAttribution": "",
        "accentFrom": "#d97706",
        "accentTo": "#ea580c",
        "borderAccent": "#d97706",
        "iconColor": "text-amber-500"
      },
      {
        "id": "transition",
        "label": "The Bridge",
        "title": "Passing the Torch",
        "subtitle": "Values that transcend time",
        "description": "Principles of integrity, service, and visionary leadership \u2014 carefully instilled and now carried forward with renewed purpose.",
        "quote": "\u201cThe foundation of a great nation is built not in years, but in the values we pass to the next generation.\u201d",
        "quoteAttribution": "\u2014 Dr. Babu Ram Pokharel",
        "accentFrom": "#8b5cf6",
        "accentTo": "#a78bfa",
        "borderAccent": "#8b5cf6",
        "iconColor": "text-primary"
      },
      {
        "id": "future",
        "label": "Present \u2013 Future",
        "title": "The Next Chapter",
        "subtitle": "Dr. Ubin Pokharel & Bidushi Pandey Pokharel",
        "description": "Building on 45+ years of foundation with modern vision, global perspective, and an unwavering commitment to Nepal\u2019s tomorrow.",
        "quote": "",
        "quoteAttribution": "",
        "accentFrom": "#0284c7",
        "accentTo": "#4f46e5",
        "borderAccent": "#0284c7",
        "iconColor": "text-sky-500"
      }
    ],
    "valuesTitle": "Principles That Endure",
    "valuesDescription": "The core values that Dr. Pokharel instilled continue to guide every decision, every venture, and every partnership.",
    "values": [
      { "iconName": "Trees", "title": "Rooted in Service", "description": "Founded on the principle that enterprise exists to serve community \u2014 not the other way around." },
      { "iconName": "Heart", "title": "Compassionate Leadership", "description": "Leading with empathy, integrity, and a deep sense of responsibility toward every stakeholder." },
      { "iconName": "Lightbulb", "title": "Visionary Foresight", "description": "Building across generations with a long-term view that transcends quarterly outcomes." },
      { "iconName": "Globe", "title": "Nepal First", "description": "Every venture, every investment, every partnership \u2014 grounded in the mission to elevate Nepal." }
    ]
  }'::jsonb)
on conflict (section_key) do update set
  title = excluded.title,
  content = excluded.content,
  metadata = excluded.metadata;
