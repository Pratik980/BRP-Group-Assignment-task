-- Composite partial indexes for common filtered + ordered public queries

CREATE INDEX IF NOT EXISTS hero_slides_active_order_idx
  ON public.hero_slides (display_order ASC)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS impact_stats_active_order_idx
  ON public.impact_stats (display_order ASC)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS ventures_active_order_idx
  ON public.ventures (display_order ASC)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS team_members_dept_active_order_idx
  ON public.team_members (department, display_order ASC)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS job_vacancies_active_deadline_idx
  ON public.job_vacancies (application_deadline ASC)
  WHERE is_active = true;
