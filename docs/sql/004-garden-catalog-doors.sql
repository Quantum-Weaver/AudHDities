-- ============================================================================
-- 004 — THE GARDEN CATALOG DOORS: can anyone read what we just planted?
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm), same sitting as 003.
-- Finding: REST reads of plant_stages/seed_types as role `anon` fail with
-- 42501 "permission denied for table" (GRANT-level, not RLS-level). The app's
-- generated routes run on the ANON KEY + the vessel's cookie session:
--   signed-out  -> role `anon`
--   signed-in   -> role `authenticated`
-- If `authenticated` also lacks SELECT, the garden renders empty for every
-- vessel even though the rows exist. Catalogs are published-read by design
-- (the scene code's own comment: "Catalogs (published-read)").
--
-- STEP 1 — DIAGNOSE (run this first; no changes made):
-- ----------------------------------------------------------------------------

SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name IN ('plant_stages', 'seed_types')
  AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee, privilege_type;

SELECT tablename, policyname, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('plant_stages', 'seed_types')
ORDER BY tablename, policyname;

SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('plant_stages', 'seed_types');

-- ----------------------------------------------------------------------------
-- STEP 2 — THE FIX (only if step 1 showed missing SELECT grants / no read
-- policy; plain SQL per the new-table ritual, no DO blocks).
-- Grants open the door; RLS decides which rows walk through it —
-- the policy below shows only published rows to the world.
-- ----------------------------------------------------------------------------

GRANT SELECT ON public.plant_stages TO anon, authenticated;
GRANT SELECT ON public.seed_types  TO anon, authenticated;

ALTER TABLE public.plant_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seed_types  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published plant_stages"
  ON public.plant_stages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public read published seed_types"
  ON public.seed_types FOR SELECT
  USING (status = 'published');

-- If step 1 showed a read policy already standing, skip the CREATE POLICY
-- lines (a duplicate name errors harmlessly; a second overlapping policy is
-- just noise).

-- ----------------------------------------------------------------------------
-- STEP 3 — VERIFY (expect 5 and 8 again, now through the same door the
-- app uses; Fable re-checks the REST door from the workspace after).
-- ----------------------------------------------------------------------------

SELECT 'plant_stages' AS catalog, count(*) FROM public.plant_stages
UNION ALL
SELECT 'seed_types', count(*) FROM public.seed_types;

-- ----------------------------------------------------------------------------
-- STANDING NOTE (no action today): the 42501 pattern appears on OTHER
-- hestia-core tables at the anon door too (vessel_*, garden_plots, heralds).
-- For per-vessel tables that is the right refusal shape only if
-- `authenticated` HAS its grants (RLS then narrows rows to their owners).
-- Worth one diagnostic pass across the 117 when a quiet sitting wants it —
-- the query in step 1 generalizes by swapping the table list.
-- ============================================================================
