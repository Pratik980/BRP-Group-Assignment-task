CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No public SELECT/INSERT policies: writes go through a server function
-- using the service role; reads are admin-only via service_role.
CREATE POLICY "no_public_access"
  ON public.contact_submissions
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);