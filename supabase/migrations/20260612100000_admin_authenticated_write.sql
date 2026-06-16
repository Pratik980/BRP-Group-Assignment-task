-- Allow logged-in admin to manage CMS content (Phase 3 CRUD)

create policy "Admin insert ventures"
  on public.ventures for insert to authenticated with check (true);

create policy "Admin update ventures"
  on public.ventures for update to authenticated using (true) with check (true);

create policy "Admin delete ventures"
  on public.ventures for delete to authenticated using (true);

create policy "Admin insert team_members"
  on public.team_members for insert to authenticated with check (true);

create policy "Admin update team_members"
  on public.team_members for update to authenticated using (true) with check (true);

create policy "Admin delete team_members"
  on public.team_members for delete to authenticated using (true);
