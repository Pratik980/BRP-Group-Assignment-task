-- Remove the seeded career data that was inserted by 20260609144000_careers.sql
-- so the admin panel starts with a clean slate.

delete from public.job_vacancies
where title in (
  'Senior React/TypeScript Developer',
  'Digital Marketing Executive',
  'HR Specialist & Recruiter',
  'UI/UX Design Intern'
);
