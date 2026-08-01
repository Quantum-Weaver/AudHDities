-- ============================================================================
-- 014 — THE ECHO MOVES INSIDE: sync_proposal_vote_counts() leaves the
-- exposed schema
-- ============================================================================
-- Drafted 2026-07-31 by Fable (lane themis-realm) at the linter's catch on
-- KP's ⚛ run of 013: public.sync_proposal_vote_counts() is SECURITY DEFINER
-- and RPC-visible to signed-in users at /rest/v1/rpc/. Same lesson as 010
-- (has_role, the window that moved inside), same cure: a trigger function
-- needs no URL at all — PostgREST serves RPC only from `public`, so the
-- echo lives in `private` and fires exactly as before. A door that need
-- not exist is removed, not defended.
--
-- Run AFTER 013. Order matters (010's law): the inside window is built
-- first, the trigger re-pointed, and only then the exposed one removed.
-- ----------------------------------------------------------------------------

-- The private room already stands (010); harmless if re-stated.
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.sync_proposal_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.proposals SET
    votes_for = (SELECT count(*) FROM public.votes v
                 WHERE v.proposal_id = COALESCE(NEW.proposal_id, OLD.proposal_id)
                   AND v.choice = 'for'),
    votes_against = (SELECT count(*) FROM public.votes v
                     WHERE v.proposal_id = COALESCE(NEW.proposal_id, OLD.proposal_id)
                       AND v.choice = 'against')
  WHERE id = COALESCE(NEW.proposal_id, OLD.proposal_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Nobody calls the echo; it only fires. Trigger firing needs no EXECUTE
-- grant from the invoking user, so revoking everything costs nothing.
REVOKE EXECUTE ON FUNCTION private.sync_proposal_vote_counts() FROM PUBLIC, anon, authenticated;

-- Re-point the trigger at the inside window.
DROP TRIGGER IF EXISTS votes_sync_counts ON public.votes;
CREATE TRIGGER votes_sync_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION private.sync_proposal_vote_counts();

-- The exposed window closes — nothing references it anymore.
DROP FUNCTION IF EXISTS public.sync_proposal_vote_counts();

-- ----------------------------------------------------------------------------
-- VERIFY — expect: the function listed once, in schema `private`; the
-- trigger present on votes; and the linter's finding gone on its next pass.
-- ----------------------------------------------------------------------------

SELECT n.nspname AS schema, p.proname
FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'sync_proposal_vote_counts';

SELECT tgname FROM pg_trigger
WHERE tgrelid = 'public.votes'::regclass AND NOT tgisinternal;
-- ============================================================================
