# Tracking access

`email_tracking` is server-only: browser roles have no table privileges and RLS remains enabled. Clerk-verified administrators read it through the server API. URL passwords and caller-supplied user IDs are not authentication.

The existing-installation migration restricts only `email_tracking` and does not modify any data. The analytics creation migration is also hardened for fresh installations; existing analytics policies are intentionally preserved.

Run `node --test tests/tracking-access.test.mjs`. CI checks the endpoint authorization boundaries and the fresh-install policy definitions. After applying the SQL migration, verify `has_table_privilege` is false for anon/authenticated SELECT/INSERT/UPDATE/DELETE and true for service_role. Keep service-role credentials server-side.

Apply the migration and release the application fix together: RLS does not constrain a service-role-backed API, so the endpoint session checks are necessary too.
