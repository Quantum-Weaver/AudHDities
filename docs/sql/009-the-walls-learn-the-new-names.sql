-- ============================================================================
-- 009 — THE WALLS LEARN THE NEW NAMES: recursion healed, ownership trued
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm), tracing KP's live error
-- ("Failed to fetch community_profiles" while signed in). Two findings,
-- both measured against all 390 policies:
--
-- FINDING 1 — RLS INFINITE RECURSION (the 500's cause): user_roles' four
-- admin policies check admin-ness by querying user_roles INSIDE their own
-- policy. Postgres detects the cycle and errors the whole query — and the
-- poison spreads: 90 admin-check policies across 75 tables subquery
-- user_roles, so ANY of them evaluating hits the recursive policy. This
-- never fired before 006 because the grant wound killed queries at 42501
-- first; healed doors let the policies finally speak, and this one
-- stuttered.
--
-- FINDING 2 — STALE OWNERSHIP PREDICATE: 4 identity tables
-- (community_profiles, user_private, vessel_config, user_financial) guard
-- ownership by `id = auth.uid()` — the OLD schema's pattern, where the
-- profile row's id WAS the auth id. The evolved schema keys ownership on
-- `created_by` (203 policies across the rest of the house already do; the
-- app queries by created_by everywhere; 007's trigger writes created_by).
-- Result: your own rows are invisible to you. (The other 5 tables my first
-- sweep flagged — gifts, messages, exchanges, patronage, garden_visits —
-- turned out CORRECT on full read: they use their true ownership columns.)
--
-- ----------------------------------------------------------------------------
-- PART 1 — has_role(): one honest window into user_roles, no recursion.
-- SECURITY DEFINER so the check bypasses user_roles' own RLS; STABLE; path
-- pinned. authenticated must hold EXECUTE (policies evaluate as the
-- querying role). The linter will note it is RPC-callable by signed-in
-- users: intentional and harmless — it only answers whether YOU hold a
-- role, which "Users can view their own roles" already reveals.
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.has_role(check_roles user_role[])
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = ANY (check_roles)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(user_role[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(user_role[]) TO authenticated;

-- Rebuild user_roles' four admin policies on the new window:

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(ARRAY['admin']::user_role[]));

DROP POLICY IF EXISTS "Admins can assign roles" ON public.user_roles;
CREATE POLICY "Admins can assign roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(ARRAY['admin']::user_role[]));

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(ARRAY['admin']::user_role[]))
  WITH CHECK (public.has_role(ARRAY['admin']::user_role[]));

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(ARRAY['admin']::user_role[]));

-- (The 90 admin-check policies on other tables need no rewrite: their
-- EXISTS subqueries now pass through user_roles' non-recursive policies —
-- each vessel sees their own roles, which is exactly what EXISTS asks.)

-- ----------------------------------------------------------------------------
-- PART 2 — the four identity tables learn created_by. Names kept; only the
-- predicate changes. Nothing else about any wall moves.
-- ----------------------------------------------------------------------------

-- community_profiles
DROP POLICY IF EXISTS "Owner can view own profile" ON public.community_profiles;
CREATE POLICY "Owner can view own profile" ON public.community_profiles
  FOR SELECT TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Owner can insert own profile" ON public.community_profiles;
CREATE POLICY "Owner can insert own profile" ON public.community_profiles
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Owner can update own profile" ON public.community_profiles;
CREATE POLICY "Owner can update own profile" ON public.community_profiles
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Owner can delete own profile" ON public.community_profiles;
CREATE POLICY "Owner can delete own profile" ON public.community_profiles
  FOR DELETE TO authenticated USING (created_by = auth.uid());

-- user_private
DROP POLICY IF EXISTS "Users can view their own private data" ON public.user_private;
CREATE POLICY "Users can view their own private data" ON public.user_private
  FOR SELECT TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own private data" ON public.user_private;
CREATE POLICY "Users can insert their own private data" ON public.user_private
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can update their own private data" ON public.user_private;
CREATE POLICY "Users can update their own private data" ON public.user_private
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can delete their own private data" ON public.user_private;
CREATE POLICY "Users can delete their own private data" ON public.user_private
  FOR DELETE TO authenticated USING (created_by = auth.uid());

-- vessel_config
DROP POLICY IF EXISTS "Sovereign can view own vessel config" ON public.vessel_config;
CREATE POLICY "Sovereign can view own vessel config" ON public.vessel_config
  FOR SELECT TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Sovereign can insert own vessel config" ON public.vessel_config;
CREATE POLICY "Sovereign can insert own vessel config" ON public.vessel_config
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Sovereign can update own vessel config" ON public.vessel_config;
CREATE POLICY "Sovereign can update own vessel config" ON public.vessel_config
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Sovereign can delete own vessel config" ON public.vessel_config;
CREATE POLICY "Sovereign can delete own vessel config" ON public.vessel_config
  FOR DELETE TO authenticated USING (created_by = auth.uid());

-- user_financial
DROP POLICY IF EXISTS "Users can view their own financial data" ON public.user_financial;
CREATE POLICY "Users can view their own financial data" ON public.user_financial
  FOR SELECT TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own financial data" ON public.user_financial;
CREATE POLICY "Users can insert their own financial data" ON public.user_financial
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can update their own financial data" ON public.user_financial;
CREATE POLICY "Users can update their own financial data" ON public.user_financial
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

-- ----------------------------------------------------------------------------
-- VERIFY — expect: no policy on user_roles referencing user_roles in its own
-- clause; the four tables showing created_by predicates; and then the real
-- test: reload the app — your profile appears.
-- ----------------------------------------------------------------------------

SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'user_roles'
ORDER BY policyname;

SELECT tablename, policyname,
       (qual LIKE '%created_by%' OR with_check LIKE '%created_by%') AS uses_created_by
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('community_profiles','user_private','vessel_config','user_financial')
  AND policyname NOT LIKE 'Admins%' AND policyname NOT LIKE 'Anyone%'
ORDER BY tablename, policyname;
-- ============================================================================
