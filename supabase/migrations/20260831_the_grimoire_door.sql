-- 20260831_the_grimoire_door.sql
-- ============================================================================
-- THE GRIMOIRE DOOR (2026-08-31)
-- KP's word: kp.audhdities.com/grimoire is the home of the grimoire. The
-- grimoire is one self-contained `grimoire.html`, carried by the courier into
-- the PRIVATE `artifacts` Storage bucket beside the signed-in-only artifacts.
-- src/app/grimoire/route.ts reads it back out through a bare anon client —
-- no session, no cookies, no service-role key — so Storage RLS on
-- storage.objects is the real gate, and this policy IS that gate: it opens
-- exactly ONE object to the world and leaves the rest of the bucket behind
-- "artifacts: authenticated read" (20260827_artifacts_bucket_policy.sql).
-- ============================================================================
-- RUN, by KP's hand, in the Supabase dashboard SQL editor (this project has
-- no linked CLI/migration history — this file IS the record of what was run).
-- Safe to run again.

drop policy if exists "artifacts: the grimoire is public" on storage.objects;
create policy "artifacts: the grimoire is public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'artifacts' and name = 'grimoire.html');

-- Look: exactly one row, once the courier has carried it.
-- select name, updated_at from storage.objects
--   where bucket_id = 'artifacts' and name = 'grimoire.html';
