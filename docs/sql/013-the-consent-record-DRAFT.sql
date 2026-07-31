-- ============================================================================
-- 013 — THE CONSENT RECORD (DRAFT — NOT APPLIED. This is a proposal for the
-- row-3 schema walk (themis-governance, SCHEMA-FINALIZE); nothing here runs
-- until KP's ⚛ verdict at the dashboard. Drafted 2026-07-30 by Fable
-- (lane themis-realm) at KP's word "let us continue".)
-- ============================================================================
-- The gap this closes (REALM-BUS edge 1): the Council's voting rooms update
-- the screen and write nothing; `proposals` holds only aggregate counters
-- (votes_for / votes_against), so one-member-one-vote is unenforceable and
-- no voice is actually kept. The page's own vow — "Every vote is recorded on
-- the public ledger. Your voice is permanent." — needs a table to be true.
--
-- The consent laws welded into the columns (the realm's native law: nothing
-- performs consent it does not record; plus the reimaginer's rider,
-- countersigned on the REALM-BUS):
--   * `choice` is NOT NULL with NO DEFAULT — a vote row is impossible to
--     create without an explicit choice; the base itself refuses the
--     pre-checked box.
--   * UNIQUE (proposal_id, voter_id) — one member, one living vote,
--     enforced by the schema, not by hope.
--   * 'abstain' is a recordable choice — a chosen abstention is a voice;
--     silence is not.
--
-- OPEN QUESTIONS FOR THE SITTING (KP's ⚛ rulings, none pre-decided):
--   Q1  Who may a vote reference — auth.users(id) (drafted) or profiles?
--   Q2  Changeable until voting_ends_at? Drafted YES (UPDATE own vote until
--       the deadline; updated_at keeps the history honest). The alternative
--       is append-only supersession — say the word and the draft reshapes.
--   Q3  Visibility: is WHO voted public (radical transparency), or does the
--       voter see their own vote while the house sees aggregates? Drafted
--       the gentler wall: authenticated members read all votes; anonymous
--       visitors see only the counters on `proposals`. Loosen or tighten at
--       your word — this is the realm's deepest privacy/transparency seam.
--   Q4  The council-tier gate lives in RLS via a profiles subquery below —
--       the house's no-security-definer-functions rule is kept, but the
--       subquery form wants your eye.
--   Q5  Do votes_for / votes_against stay on proposals as derived counters
--       (trigger below keeps them true from the record), or retire?
-- ============================================================================

CREATE TABLE public.votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  voter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  choice text NOT NULL CHECK (choice IN ('for', 'against', 'abstain')),
  cast_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_id, voter_id)
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Q3 as drafted: members see every voice; the street sees the counters.
CREATE POLICY "Members read the consent record" ON public.votes
  FOR SELECT TO authenticated
  USING (true);

-- Only a council-tier member casts, and only as themselves (Q4).
CREATE POLICY "Council members cast their own vote" ON public.votes
  FOR INSERT TO authenticated
  WITH CHECK (
    voter_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.user_tier = 'council'
    )
  );

-- Q2 as drafted: a vote may change its mind until the deadline closes.
CREATE POLICY "Voter amends own vote before the deadline" ON public.votes
  FOR UPDATE TO authenticated
  USING (voter_id = auth.uid())
  WITH CHECK (
    voter_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.proposals pr
      WHERE pr.id = proposal_id
        AND (pr.voting_ends_at IS NULL OR pr.voting_ends_at > now())
    )
  );

-- No DELETE policy on purpose: the purge law is KP's to design; until then
-- a cast voice is not silently removable, even by its owner.

-- Q5 as drafted: the counters on proposals become derived truth, kept by
-- trigger from the record — the record is the source, the counters the echo.
CREATE OR REPLACE FUNCTION public.sync_proposal_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
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

CREATE TRIGGER votes_sync_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION public.sync_proposal_vote_counts();

-- After the verdict lands and this runs: gaia_config gains the votes row
-- (deity_group = themis-governance), GAIA regenerates the doors, and lane
-- themis-realm wires the ceremony to the record (REALM-BUS edges 1 & 3).
