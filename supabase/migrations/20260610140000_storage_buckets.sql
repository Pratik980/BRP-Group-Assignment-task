-- BRP Group CMS — Supabase Storage buckets (SRS §4.8, §4.11)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'media',
    'media',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  ),
  (
    'resumes',
    'resumes',
    false,
    10485760,
    array[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public media bucket: anyone can read, only authenticated admin uploads via service role
create policy "Public read media bucket"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "Authenticated users upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "Authenticated users update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "Authenticated users delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');

-- Resumes bucket: no public read; uploads via server (service role) or authenticated
create policy "Authenticated upload resumes"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes');
