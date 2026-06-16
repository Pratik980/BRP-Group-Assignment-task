-- Create job_vacancies table
CREATE TABLE public.job_vacancies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL, -- "Full-time", "Part-time", "Contract", "Internship"
  experience_required TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  salary_range TEXT NOT NULL DEFAULT 'Negotiable',
  is_active BOOLEAN NOT NULL DEFAULT true,
  application_deadline TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vacancy_id UUID REFERENCES public.job_vacancies(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  position TEXT NOT NULL,
  experience TEXT NOT NULL,
  portfolio_url TEXT,
  cover_letter TEXT,
  resume_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- "pending", "reviewed", "shortlisted", "rejected"
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grant privileges
GRANT SELECT ON public.job_vacancies TO anon, authenticated;
GRANT ALL ON public.job_vacancies TO service_role;

GRANT SELECT ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

-- Enable RLS
ALTER TABLE public.job_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Vacancies RLS Policies: Everyone can read active vacancies
CREATE POLICY "Allow public read-only access to active vacancies"
  ON public.job_vacancies
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Applications RLS Policies: No public access directly, inserts/reads go through service_role server functions
CREATE POLICY "no_public_access"
  ON public.job_applications
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Create resumes storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  false,
  10485760, -- 10MB limit
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Seed job vacancies with future deadlines
INSERT INTO public.job_vacancies (
  title,
  department,
  location,
  employment_type,
  experience_required,
  description,
  requirements,
  salary_range,
  is_active,
  application_deadline
) VALUES
(
  'Senior React/TypeScript Developer',
  'Technology',
  'Lalitpur, Nepal (Hybrid)',
  'Full-time',
  '4+ years',
  'We are seeking a highly skilled Senior React/TypeScript Developer to join our growing engineering team. In this role, you will lead the development of our modern web applications, collaborate with designers to create intuitive user experiences, and mentor junior developers. The ideal candidate has deep expertise in React, TypeScript, state management (e.g. TanStack Query), and writing clean, scalable code.',
  ARRAY[
    'Strong proficiency in React, TypeScript, and modern CSS/styling frameworks.',
    'Experience with single-page applications, server-side rendering, and performance optimization.',
    'Demonstrated experience with state management libraries and REST/GraphQL APIs.',
    'Familiarity with version control (Git) and agile development methodologies.',
    'Excellent communication and collaboration skills.'
  ],
  'Rs. 150,000 - 220,000 / month',
  true,
  NOW() + INTERVAL '30 days'
),
(
  'Digital Marketing Executive',
  'Marketing',
  'Kathmandu, Nepal (On-site)',
  'Full-time',
  '2+ years',
  'BRP Group is looking for a creative and data-driven Digital Marketing Executive. You will be responsible for planning, executing, and optimizing our online marketing campaigns across various channels including social media, SEO/SEM, and email marketing. You should be able to analyze campaign performance metrics and make data-backed recommendations to increase brand awareness and user engagement.',
  ARRAY[
    'Proven experience in managing digital marketing campaigns and social media accounts.',
    'Solid understanding of SEO, SEM, Google Analytics, and Facebook Ads Manager.',
    'Creative mind with strong copy-writing and content creation skills.',
    'Ability to multitask and work effectively under tight deadlines.',
    'Degree in Marketing, Communications, or a related field.'
  ],
  'Negotiable',
  true,
  NOW() + INTERVAL '20 days'
),
(
  'HR Specialist & Recruiter',
  'Human Resources',
  'Kathmandu, Nepal (On-site)',
  'Full-time',
  '3+ years',
  'We are looking for an HR Specialist & Recruiter to manage our full-cycle recruiting processes and oversee employee relations. You will be responsible for sourcing, screening, and onboarding candidates, as well as developing employee engagement initiatives, maintaining HR records, and ensuring compliance with local labor laws.',
  ARRAY[
    'Experience as an HR Generalist or Recruiter, preferably in a corporate or tech environment.',
    'Familiarity with Applicant Tracking Systems (ATS) and professional networks like LinkedIn.',
    'Strong interpersonal and communication skills.',
    'Deep understanding of HR practices and Nepal labor regulations.',
    'High level of integrity, confidentiality, and professional ethics.'
  ],
  'Rs. 60,000 - 90,000 / month',
  true,
  NOW() + INTERVAL '25 days'
),
(
  'UI/UX Design Intern',
  'Technology',
  'Lalitpur, Nepal (Hybrid)',
  'Internship',
  'Entry level (Portfolio required)',
  'Join us as a UI/UX Design Intern and jumpstart your career! You will work closely with our product designers and front-end developers to create beautiful, user-centered layouts, wireframes, and prototypes. This is a hands-on learning experience where you will contribute to real products and build a stellar portfolio.',
  ARRAY[
    'Basic proficiency in Figma, Adobe XD, or other design tools.',
    'A strong eye for visual design, typography, layout, and color theory.',
    'Understanding of user-centered design principles and responsive layouts.',
    'Eagerness to learn, accept feedback, and iterate on designs.',
    'A portfolio of personal or academic projects demonstrating design thinking.'
  ],
  'Rs. 15,000 / month (Paid Internship)',
  true,
  NOW() + INTERVAL '15 days'
)
ON CONFLICT DO NOTHING;
