-- Existing deployments: remove the unsafe email-tracking read policy.
-- No stored rows are modified. Analytics policies are intentionally left unchanged.
ALTER TABLE public.email_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated read access" ON public.email_tracking;
DROP POLICY IF EXISTS "Allow service role full access" ON public.email_tracking;
REVOKE ALL ON TABLE public.email_tracking FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.email_tracking TO service_role;
