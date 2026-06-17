-- Allow logged-in admin to manage job vacancies (CRUD)
-- RLS was enabled on job_vacancies but no insert/update/delete policies existed for authenticated users.

grant insert, update, delete on public.job_vacancies to authenticated;

create policy "Admin insert job vacancies"
  on public.job_vacancies for insert to authenticated with check (true);

create policy "Admin update job vacancies"
  on public.job_vacancies for update to authenticated using (true) with check (true);

create policy "Admin delete job vacancies"
  on public.job_vacancies for delete to authenticated using (true);
