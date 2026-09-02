-- 20260902_the_seal_on_every_ware.sql
-- ============================================================================
-- THE SEAL ON EVERY WARE (2026-09-02)
-- Hermes's wares become the-sphragis's second consumer — named as such in the
-- tool's own README before a line of this file was written: "one water, two
-- realms, the spring's law standing on schedule." Khorós's releases are the
-- first; this is the second, unforked, the same licence grammar.
--
-- ADDITIVE ONLY. One column: `public.wares.sphragis`, holding a drawn
-- `Sphragis` document — the licence as DATA, never as prose to re-argue. The
-- licence text a maker sees on the stall is a RENDERING of this column,
-- produced by `render()` in src/lib/sphragis/ (a byte-faithful mirror of
-- resonance-awen/tools/the-sphragis/src/index.ts), and THE LAWYER GATE rides
-- inside that rendering structurally — this migration grants no exemption
-- from it, and could not if it tried.
--
-- THE 90/10 STAYS SCHEMA, NOT PROMISE — the-sphragis's law 4, held here
-- exactly as the tool holds it: this column stores whatever split a maker
-- declared (the house default is 90 artist / 10 platform, KP's own ⚛ ruling
-- on the hall walk), and nothing in this migration computes, enforces, or
-- promises a number from it. `calculate_sovereign_price` (grep supabase/ for
-- its call sites — it is a server-side RPC function, not tracked as a
-- migration in this repo) remains the one true price arithmetic; this column
-- is licence terms sitting beside a price, never a second pricing engine.
--
-- A ware with no `sphragis` is a ware exactly as it was before this file ran
-- — the column defaults to NULL, and the rendering added in
-- src/lib/wares/sphragis.ts reads it defensively and returns null for
-- anything that is not a well-formed Sphragis. Nothing on the ware page
-- changes for a ware that carries none.
-- ============================================================================
-- RUN, by KP's hand, in the Supabase dashboard SQL editor — this project has
-- no linked CLI/migration history, so this file IS the record of what was
-- run. Safe to run again: `if not exists` skips what already exists.

alter table public.wares
  add column if not exists sphragis jsonb;

comment on column public.wares.sphragis is
  'A drawn the-sphragis licence document (Declaration -> draw() -> Sphragis), '
  'or NULL when no licence has been drawn for this ware. Three grants, always '
  '(artist-to-platform, revocable; platform-to-listener; artist-to-buyer); the '
  'copyright never moves; the seal is evidence, never a lock. THE 90/10 STAYS '
  'SCHEMA, NOT PROMISE (law 4) -- this column holds the split as data and '
  'promises nothing from it. The licence text a buyer reads is a RENDERING of '
  'this column, produced by render() in src/lib/sphragis/, and the LAWYER '
  'GATE rides inside every rendering structurally. See '
  'resonance-awen/tools/the-sphragis for the whole grammar.';

-- ============================================================================
-- RLS — UNTOUCHED, AND SAID SO PLAINLY
-- ============================================================================
-- public.wares already carries RLS (enabled at table creation) and an
-- existing public-read policy from docs/sql/024-the-bazaar-refined-DRAFT.sql:
--
--   create policy "wares on the stall are readable by anyone"
--     on public.wares for select using (status = 'published');
--
-- A new column on an existing table rides under that same row-level policy —
-- there is no column-level grant to add, and this file adds none. A
-- published ware's sphragis (or its NULL) is exactly as public as the rest
-- of the row already was; a draft ware's sphragis stays as dark as the row
-- around it, behind the same door. Nothing here widens or narrows who reads
-- what. The maker-reads-their-own-wares-at-any-status policy in the same
-- file covers the maker's own unpublished wares the same way.

-- ============================================================================
-- LOOK
-- ============================================================================
-- select slug, name, status, sphragis is not null as sealed
--   from public.wares
--   order by slug;
