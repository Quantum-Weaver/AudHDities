-- ============================================================================
-- 006 — RESTORE THE GRANTS: the whole base, one wound, one healing
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm) at KP's word ("check the
-- rls policies while we are in here, and fix the ones needing fixed"),
-- after a full read of all 124 public tables via the management API.
--
-- THE DIAGNOSIS (measured, not guessed):
--   * RLS: ON for all 124 tables. Policies: 390, thoughtfully shaped —
--     387 serve `authenticated`, 3 serve `public` (the two garden catalogs
--     + broadcast heralds, each self-narrowing). ZERO policies allow anon
--     writes. THE POLICY LAYER IS HEALTHY AND IS NOT TOUCHED BY THIS FILE.
--   * GRANTS: 122 of 124 tables hold NO read/write privilege for `anon` OR
--     `authenticated` (only REFERENCES,TRIGGER,TRUNCATE survive — the
--     fingerprint of a broad REVOKE of DML). `service_role` is stripped on
--     all 124. The two exceptions are plant_stages/seed_types, healed by
--     KP's 004 run.
--   * Postgres checks grants BEFORE RLS — so today every app request fails
--     with 42501 before a single policy gets to speak. The walls are fine;
--     the doors have no keys.
--   * Functions: EXECUTE intact except `validate_signup` (anon+auth both
--     false) — and that one runs DURING SIGNUP, pre-auth: new vessels are
--     blocked at the door until it is restored. (`gaia_sync` locked is
--     correct — machinery, not an app door.)
--   * Sequences: none in public (all-uuid) — nothing to grant there.
--
-- WHY THIS IS SAFE: restoring grants exposes exactly what the 390 policies
-- already ruled and nothing more. user_private, user_financial, and every
-- own-only table still show anon NOTHING (no anon policy = no rows) and
-- show each vessel only their own rows. This file changes WHO HOLDS KEYS,
-- never WHAT THE WALLS ALLOW.
--
-- ----------------------------------------------------------------------------
-- STEP 1 — THE RESTORE (the standard Supabase posture, RLS doing the work)
-- ----------------------------------------------------------------------------

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT EXECUTE ON FUNCTION public.validate_signup TO anon, authenticated;

-- ----------------------------------------------------------------------------
-- STEP 2 — KEEP IT HEALED (future tables inherit the posture, so the next
-- GAIA regeneration or migration does not relapse into 42501)
-- ----------------------------------------------------------------------------

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;

-- ----------------------------------------------------------------------------
-- STEP 3 — VERIFY
-- (a) grants restored: expect 124 rows for authenticated, 124 for anon
-- ----------------------------------------------------------------------------

SELECT grantee, count(DISTINCT table_name) AS tables_with_select
FROM information_schema.role_table_grants
WHERE table_schema = 'public' AND privilege_type = 'SELECT'
  AND grantee IN ('anon', 'authenticated', 'service_role')
GROUP BY grantee;

-- (b) the walls still stand: this must return ZERO rows changed — it is a
--     read of the policy count, which this file never touches (expect 390):

SELECT count(*) AS policies FROM pg_policies WHERE schemaname = 'public';

-- (Fable re-verifies from the workspace after: anon door sees ONLY the two
-- published catalogs + broadcast heralds; own-only tables stay dark.)
-- ============================================================================
