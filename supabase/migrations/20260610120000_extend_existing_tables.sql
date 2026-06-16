-- Extend tables that already exist in the BRP Supabase project

-- ─── Contact submissions (maps to SRS "contacts") ──────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  organization text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.contact_submissions
  add column if not exists phone text,
  add column if not exists subject text,
  add column if not exists is_read boolean not null default false,
  add column if not exists is_starred boolean not null default false,
  add column if not exists admin_note text;

create index if not exists contact_submissions_is_read_idx on public.contact_submissions (is_read);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);

-- ─── Job vacancies (maps to SRS "job_postings") ───────────────────────────────
create table if not exists public.job_vacancies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  employment_type text not null,
  experience_required text not null,
  description text not null,
  requirements text[] not null default '{}',
  salary_range text not null default '',
  is_active boolean not null default true,
  application_deadline timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.job_vacancies
  add column if not exists apply_email text,
  add column if not exists apply_url text,
  add column if not exists status text not null default 'open';

create index if not exists job_vacancies_is_active_idx on public.job_vacancies (is_active);
create index if not exists job_vacancies_application_deadline_idx on public.job_vacancies (application_deadline);

drop trigger if exists job_vacancies_set_updated_at on public.job_vacancies;
create trigger job_vacancies_set_updated_at
  before update on public.job_vacancies
  for each row execute function public.set_updated_at();

-- ─── Job applications ────────────────────────────────────────────────────────
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  vacancy_id uuid references public.job_vacancies (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  position text not null,
  experience text not null,
  portfolio_url text,
  cover_letter text,
  resume_path text not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists job_applications_vacancy_id_idx on public.job_applications (vacancy_id);
create index if not exists job_applications_created_at_idx on public.job_applications (created_at desc);
