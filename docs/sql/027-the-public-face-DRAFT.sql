-- =====================================================================
-- 027 — THE PUBLIC FACE
-- DRAFT. Never run by a lamp. KP's ⚛ hand only.
-- Written 2026-08-31 during the (iris) build pass.
-- =====================================================================
--
-- WHY THIS EXISTS
--
-- Every room on the Bridge that shows a person now takes the name from
-- the vessel's own display name — `community_profiles.display_name`,
-- joined on `community_profiles.created_by` (the auth user id). That is
-- the only place in this house a name can honestly come from.
--
-- But the wall as it stands lets a vessel read ONE profile: their own.
--
--   docs/sql/009-the-walls-learn-the-new-names.sql:83-85
--   CREATE POLICY "Owner can view own profile" ON public.community_profiles
--     FOR SELECT TO authenticated USING (created_by = auth.uid());
--
-- So the join works perfectly for you and returns nothing for the person
-- you are talking to. The Bridge does not lie about that: where the base
-- gives no row, the room says "Name not yet reachable" and carries the
-- one-line reason. It never substitutes a friendly invention.
--
-- THE CHANGE, IF KP WANTS IT
--
-- `community_profiles` is described in its own generated types as "the
-- public face" (docs/sql/007-the-vessel-arrives.sql:14) and carries a
-- public-view type already (PublicCommunityProfiles). This adds a read
-- of that face — and ONLY of vessels who have set their profile ACTIVE,
-- so a draft or closed profile stays private. No column changes, no new
-- table, no data moved.
--
-- WHAT IT DOES NOT DO
--
-- It does not open `user_private`, `user_financial` or `vessel_config` —
-- those stay owner-only, untouched. It does not open a profile that is
-- not `active`. It grants SELECT only.
--
-- MEASURE AFTERWARDS: signed in as one vessel, a second vessel's
-- display_name reads back; `user_private` still returns zero rows for
-- anyone but its owner.
-- =====================================================================

-- The owner keeps their own full read, whatever their status.
-- (Left standing exactly as 009 wrote it; repeated here only so the two
-- policies are read together.)
--
-- CREATE POLICY "Owner can view own profile" ON public.community_profiles
--   FOR SELECT TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "The public face is readable" ON public.community_profiles;
CREATE POLICY "The public face is readable" ON public.community_profiles
  FOR SELECT TO authenticated
  USING (status = 'active');

-- Verification, to run in the same sitting:
--
-- SELECT policyname, cmd, qual
--   FROM pg_policies
--  WHERE schemaname = 'public' AND tablename = 'community_profiles'
--  ORDER BY policyname;
--
-- SELECT count(*) FROM public.community_profiles;   -- > 1 while signed in
-- SELECT count(*) FROM public.user_private;         -- still 1 (your own)
