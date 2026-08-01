-- ============================================================================
-- 009 — LIBRARY DOORS FOR ANYONE: the policies say "Anyone"; make it true
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane athena-realm) for KP's dashboard hand,
-- minutes after 008 landed (all 63 rows verified in via the server key:
-- 5 collections · 30 bubbles · 10 sigils · 6 quests · 1 path · 6 lessons ·
-- 6 path_lessons).
--
-- THE DIAGNOSIS (measured via the management API, not guessed):
--   Every content-table SELECT policy in the Library is NAMED "Anyone can
--   view published <x>" but SCOPED to roles {authenticated} — so the
--   signed-out door (role `anon`) has NO policy, and the anon read returns
--   the false-empty ([] + 200) even with full shelves. Meanwhile
--   `mythology` (policy created per the ritual, roles {public}) reads
--   perfectly at the same door — the working proof of the intended
--   pattern, one table to the left.
--
-- THE INTENT, from the audience's own law (L1-07, the Hearth-Keeper +
-- the Executioner): "Galleries are safe spaces for browsing … no
-- pressure to interact" · "Showing the collection is safe." Browsing the
-- Library is the Sanctuary's front porch — it should not require an
-- account. (KP's eye rules: if any shelf SHOULD be members-only, skip
-- its line below.)
--
-- WHY ALTER, not new policies: the policies are right in every way but
-- their role list — same gate (published-only), same name. One clause
-- changes; nothing else moves. `TO public` = all roles, matching the
-- proven mythology policy exactly. Writes remain untouched: no anon
-- write policy exists anywhere and none is created.
-- ============================================================================

ALTER POLICY "Anyone can view published bubbles"        ON public.bubbles        TO public;
ALTER POLICY "Anyone can view published collections"    ON public.collection_sets TO public;
ALTER POLICY "Anyone can view published sigils"         ON public.sigils         TO public;
ALTER POLICY "Anyone can view published quests"         ON public.quests         TO public;
ALTER POLICY "Anyone can view published learning paths" ON public.learning_paths TO public;
ALTER POLICY "Anyone can view published lessons"        ON public.lessons        TO public;
ALTER POLICY "Anyone can view path lessons"             ON public.path_lessons   TO public;

-- ----------------------------------------------------------------------------
-- VERIFY — expect roles = {public} on all seven (mythology included as the
-- eighth, already there):
-- ----------------------------------------------------------------------------

SELECT tablename, policyname, roles::text
  FROM pg_policies
 WHERE schemaname = 'public' AND cmd = 'SELECT'
   AND tablename IN ('bubbles','collection_sets','sigils','quests',
                     'learning_paths','lessons','path_lessons','mythology')
   AND policyname LIKE 'Anyone%' OR policyname LIKE 'Public read%'
 ORDER BY tablename;

-- (Fable re-verifies all seven shelves through the anon door after the run
--  — this time expecting the full census, not the false-empty.)
-- ============================================================================
