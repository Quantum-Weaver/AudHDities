-- ============================================================================
-- 023 — THE LEDGER DOOR: a question in SQL, for KP's hand
-- ============================================================================
-- DRAFTED 2026-08-24 by an Opus hand on refine/hephaestus-2026-08-24, during
-- the Forge's second movement (board ④, .journals/proofs/11-hephaestus/).
-- NEVER RUN BY A LAMP. KP runs this at his own dashboard, or does not.
--
-- ----------------------------------------------------------------------------
-- WHAT WAS MEASURED, 2026-08-24, before any UI work (SPEC.md ④C1)
-- ----------------------------------------------------------------------------
--   * Signed-out GET of `public.ledger` through the anon key:
--       200 · body []  · Content-Range */0  (exact count: 0)
--   * The control read, same minute — `public.bubbles`, healed by 009:
--       206 · one row · Content-Range 0-0/123
--     So the GRANTS are live (006 restored SELECT to `anon` on every table
--     in public) and this is not a 42501. The door answers; it answers with
--     nothing.
--   * NO SELECT POLICY FOR `ledger` EXISTS ANYWHERE IN docs/sql/*. The only
--     mentions are a backfill list (002-deity-backfill.sql:47) and three
--     comments.
--   * 006's own measured diagnosis records that of the base's 390 policies,
--     387 serve `authenticated` and exactly 3 serve `public` (the two garden
--     catalogs and broadcast heralds). `ledger` is not among the three.
--
--   CONCLUSION: at the signed-out door, an empty ledger and a walled ledger
--   are INDISTINGUISHABLE — the false-empty the house met once already and
--   wrote down (009-library-doors-for-anyone.sql:10-17). The base's own row
--   count could not be read this sitting, so which one it is remains
--   UNKNOWN FROM THE RECORD.
--
--   Until it is known, /council/ledger prints "The ledger is not yet
--   readable from this room" on a zero-row read, and never "no entries".
--   The drawn empty state is live one constant away
--   (LedgerHub.tsx: LEDGER_DOOR_CONFIRMED).
--
-- ----------------------------------------------------------------------------
-- THE QUESTION THIS FILE ASKS — and does not answer
-- ----------------------------------------------------------------------------
-- WHOSE EYE IS THE LEDGER FOR? Unwritten — KP's to rule.
--
--   The house's own prose leans public: /transparency already tells anyone
--   the lifetime totals, and the Terms speak of a public ledger. But a
--   per-entry ledger carries `from_sovereign_id` and `to_sovereign_id` —
--   WHO paid and WHO was paid — which the aggregates do not. Opening the
--   whole row to `anon` opens those two columns too.
--
--   So there are three honest shapes, and choosing between them is his:
--     A · anyone may read every entry     — run STEP A below.
--     B · signed-in vessels may read      — run STEP B below.
--     C · a public VIEW that drops the two sovereign ids, and only that
--         view is opened                  — sketched at STEP C, unwritten.
--
--   Nothing below runs itself. Uncomment exactly one step.
--
-- ----------------------------------------------------------------------------
-- STEP 0 — READ FIRST, always. Does a policy exist at all?
-- ----------------------------------------------------------------------------

select schemaname, tablename, policyname, roles, cmd, qual
from   pg_policies
where  schemaname = 'public' and tablename = 'ledger';

select relrowsecurity as rls_on
from   pg_class
where  oid = 'public.ledger'::regclass;

select count(*) as rows_in_the_ledger from public.ledger;

-- If STEP 0 returns rows_in_the_ledger = 0 AND no policy, then the ledger is
-- BOTH walled and empty, and nothing below is urgent. If it returns rows and
-- no policy, the room is walled and the page is telling the truth about it.

-- ----------------------------------------------------------------------------
-- STEP A — anyone may read every entry (the 009 shape: plain SQL, TO public)
-- ----------------------------------------------------------------------------
-- Uncomment to run. `TO public` = all roles, matching the proven pattern.
-- No write policy is created here and none exists; writes stay closed.
--
-- create policy "Anyone can view the ledger"
--   on public.ledger
--   for select
--   to public
--   using (true);

-- ----------------------------------------------------------------------------
-- STEP B — signed-in vessels may read every entry
-- ----------------------------------------------------------------------------
-- create policy "Vessels can view the ledger"
--   on public.ledger
--   for select
--   to authenticated
--   using (true);

-- ----------------------------------------------------------------------------
-- STEP C — a public view without the two sovereign ids (UNWRITTEN)
-- ----------------------------------------------------------------------------
-- Not drafted, because the shape of what a reader should see is a design
-- question this pass was not asked. Named so it is not forgotten.

-- ----------------------------------------------------------------------------
-- VERIFY — run after whichever step was chosen
-- ----------------------------------------------------------------------------

select policyname, roles, cmd
from   pg_policies
where  schemaname = 'public' and tablename = 'ledger';

-- Then, at the app's own door, signed out:
--   GET <supabase-url>/rest/v1/ledger?select=id&limit=1   with Prefer: count=exact
-- A 206 with a real Content-Range means the door is open. A 200 with */0 and
-- rows_in_the_ledger > 0 means it is still walled.
--
-- WHEN THE DOOR IS CONFIRMED OPEN, flip LEDGER_DOOR_CONFIRMED to true in
-- src/components/asgard/domains/themis/ledger/LedgerHub.tsx — that is the
-- one word that lets the page say "the ledger has not been written in yet"
-- and mean it.
-- ============================================================================
