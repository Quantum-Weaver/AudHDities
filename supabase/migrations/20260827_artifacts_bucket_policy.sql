-- 20260827_artifacts_bucket_policy.sql
-- ============================================================================
-- THE ARTIFACTS BUCKET — Sending 4, second amendment (2026-08-27)
-- KP's word, verbatim: "auth required to view" — the `artifacts` Storage
-- bucket was flipped from public to PRIVATE this sitting (public reads now
-- answer 400). src/app/artifacts-proxy/[[...path]]/route.ts reads it back
-- out through a Supabase client bound to the visitor's own session cookies
-- (never a service-role key), so Storage RLS on storage.objects is the real
-- gate — this policy IS that gate.
-- ============================================================================
-- RUN, by KP's hand, in the Supabase dashboard SQL editor (this project has
-- no linked CLI/migration history — this file IS the record of what was run).
-- The head once read "DRAFTED, NOT RUN"; KP, 2026-08-27, verbatim: "DRAFTED,
-- NOT RUN.-untrue". Signed-in readers open the artifacts today; that is the
-- policy standing.
--
-- Signed-in accounts may read the artifacts bucket; nobody anonymous may.
-- Writes stay the courier's (service key, outside RLS entirely — no policy
-- here grants insert/update/delete, and none should until the courier's own
-- design calls for it).

create policy "artifacts: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'artifacts');
