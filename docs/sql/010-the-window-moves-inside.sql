-- ============================================================================
-- 010 — THE WINDOW MOVES INSIDE: has_role() leaves the exposed schema
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm) at the linter's second
-- catch (KP's paste): public.has_role() is RPC-callable by signed-in users
-- at /rest/v1/rpc/has_role. 009 called that harmless — true but lazy; the
-- linter's third option is simply better: move the function OUT of the
-- exposed API schema. PostgREST serves RPC only from `public`, so a
-- function in a private schema still powers policies perfectly and has no
-- URL at all. A door that need not exist is removed, not defended.
--
-- Run AFTER 009. Order inside this file matters: the new window is built
-- first, the four policies re-pointed, and only then the old window
-- removed (policies must never reference a dropped function).
-- ----------------------------------------------------------------------------

-- The private room: not in PostgREST's exposed schemas, never RPC-served.
CREATE SCHEMA IF NOT EXISTS private;

-- Policy evaluation runs as the querying role, so authenticated needs
-- USAGE on the schema + EXECUTE on the function. anon gets neither.
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.has_role(check_roles public.user_role[])
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = ANY (check_roles)
  );
$$;

REVOKE EXECUTE ON FUNCTION private.has_role(public.user_role[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(public.user_role[]) TO authenticated;

-- Re-point the four user_roles admin policies at the inside window:

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (private.has_role(ARRAY['admin']::public.user_role[]));

DROP POLICY IF EXISTS "Admins can assign roles" ON public.user_roles;
CREATE POLICY "Admins can assign roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(ARRAY['admin']::public.user_role[]));

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (private.has_role(ARRAY['admin']::public.user_role[]))
  WITH CHECK (private.has_role(ARRAY['admin']::public.user_role[]));

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (private.has_role(ARRAY['admin']::public.user_role[]));

-- The exposed window closes — nothing references it anymore.
DROP FUNCTION IF EXISTS public.has_role(public.user_role[]);

-- ----------------------------------------------------------------------------
-- VERIFY — expect: has_role listed once, in schema `private`; the four
-- user_roles admin policies present; and the linter's has_role finding
-- gone on its next pass. The app needs no change (it never called it).
-- ----------------------------------------------------------------------------

SELECT n.nspname AS schema, p.proname
FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'has_role';

SELECT policyname, cmd FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'user_roles'
ORDER BY policyname;
-- ============================================================================
