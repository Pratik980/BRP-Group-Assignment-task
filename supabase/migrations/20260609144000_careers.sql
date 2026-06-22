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
GRANT INSERT ON public.job_applications TO anon;
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
