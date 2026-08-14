-- =====================================================================
-- 017 — THE MAKER'S FIRST ROWS
-- Knowledge Alchemy enters `works`; the wares gap named beside it.
-- =====================================================================
--
-- Drafted 2026-08-11 by Cistern (Opus 🕯️) at KP's ⚛ word this sitting,
-- verbatim: "resoance-excavator, would not be a ware but Knowledge
-- Alchemy would be a works" · "draft for now".
--
-- THE CLEAVE THIS ROW TEACHES (KP's ⚛ example, read off the schema):
--   A WARE is STOCKED   — merchant_profile_id · requires_shipping ·
--                          quantity_available · quantity_sold ·
--                          shipping_info. It exists in copies and is
--                          RECEIVED.
--   A WORK is MADE      — artisan_profile_id only, plus streaming_url.
--                          It is PERFORMED or AUTHORED, offered from
--                          the maker's own room. It may still carry a
--                          price; it is simply not merchandise.
--   MACHINERY is NEITHER — resonance-excavator is the loom. The loom is
--                          not the cloth, and it is not sold.
--   (hermes-realm's own gift, landing: `works` IS the loom mid-weave.)
--
-- VERIFIED LIVE BEFORE DRAFTING (the guide's lesson 8 — no photographs):
--   · wares  = 4 rows, anon and secret agree (no false-empty)
--   · works  = 0 rows, confirmed through the SECRET key — a TRUE empty,
--              not RLS hiding anything
--   · works_slug_key is a UNIQUE index on slug  → the insert below is
--              guarded and safe to re-run
--   · enums, read from the live registry:
--       work_type      = music · writing · vision · performance · code · other
--       pricing_model  = free · fixed · pay_what_you_want · patronage_only
--       content_status = draft · published · archived
--   · column default for pricing_model is 'fixed' on BOTH tables — the
--     Loom's `free` default is a FORM default, not the column's.
--
-- =====================================================================
-- MOVEMENT 1 — KNOWLEDGE ALCHEMY, the first work
-- =====================================================================
--
-- ⚛ THREE STROKES ARE YOURS. Each is ONE line to change; the row is
--   drafted with my best read and marked so nothing is smuggled past you.
--
--   ① work_type — drafted 'other'.
--        The alternative is 'performance', and your own charter argues
--        for it: "Not a product they install; a transmutation PERFORMED."
--        I could not tell whether `performance` is reserved for music
--        and stage in this house. Swap the word if it is not.
--
--   ② pricing_model — drafted 'pay_what_you_want' with price NULL.
--        Your word: "this might be the only thing worth charging
--        businesses and organizations for" — which rules out 'free',
--        but a custom engagement has no shelf price, and 'fixed' with
--        a null price is incoherent. 'pay_what_you_want' is also the
--        closest to this house's solidarity-pricing ethic.
--        If you want a from-price instead: set pricing_model='fixed'
--        and give price a number.
--
--   ③ status — drafted 'draft'.
--        The four standing wares are 'published', but the site is not
--        live and this is a new offering. Flip to 'published' when you
--        want it visible.
--
insert into public.works (
  name, slug, description, work_type, pricing_model, price, currency,
  residual_pool_percent, icon_emoji, status,
  artisan_profile_id, created_by, metadata
) values (
  'Knowledge Alchemy',
  'knowledge-alchemy',
  'Landfill to lighthouse. Chaos to clarity. A custom experience provided '
  || 'to others: purpose-built agents, shaped to a client''s own forms of '
  || 'unstructured data, that transmute it into an organized knowledge '
  || 'system — a library of single-definition entries, a grammar of atoms, '
  || 'molecules and organisms with real junctions, and lexicons derived '
  || 'from where every word lives and what it lives beside. Not a product '
  || 'they install; a transmutation performed.',
  'other',                                   -- ① stroke
  'pay_what_you_want',                       -- ② stroke
  null,                                      -- ② price rides the model
  'USD',
  50,                                        -- matches all four wares
  '⚗️',                                       -- ⚛ yours to name
  'draft',                                   -- ③ stroke
  '86d18a0b-a0d5-4d84-b42a-4db4a0c777f8',    -- the artisan the wares use
  'ce06404e-900e-4744-9284-66e260566678',    -- created_by, same hand
  jsonb_build_object(
    'charter', 'resonance-excavator/KNOWLEDGE-ALCHEMY.md',
    'spec',    'resonance-excavator/THE-ALCHEMY-SPEC.md',
    'privacy', 'resonance-excavator/PRIVACY.md',
    'named_by', 'KP',
    'named_on', '2026-08-06'
  )
)
on conflict (slug) do nothing;

-- =====================================================================
-- MOVEMENT 2 — THE WARES GAP (named, NOT drafted — prices are yours)
-- =====================================================================
--
-- Three beacons stand `app` · flowing with no ware row:
--     Resonance Hearth · Resonance Skapa · Resonance Meetings
--
-- The standing ladder is deliberate and I will not guess at its next
-- rung: Echoes free · Lantern free (price 1.11 set) · Bubbles 2.22 ·
-- Compass 3.33. Say the word and the three rows land in one movement,
-- copying the proven shape: ware_type 'digital', residual 50,
-- requires_shipping false, quantity_available null,
-- metadata {"formats":["android","pc"]}.
--
-- ⚛ ONE OBSERVATION FOR YOUR EYE, not a fault: Resonance Lantern is
--   pricing_model='free' WITH price=1.11 set. Either a suggested amount
--   kept on purpose, or a leftover from before it went free. Worth
--   ruling before siblings copy the pattern.
--
-- =====================================================================
-- MOVEMENT 3 — THE DOWNLOADABLES (your word this sitting, recorded)
-- =====================================================================
--
-- KP ⚛, verbatim: "i know there has got to be courses and lessons we can
-- derive from our work here to create downloadables that have single one
-- time costs to fuel the economy system."
--
-- GROUND, verified live this sitting so the design starts true:
--   · There is NO `courses` table. The learning structure is
--       learning_paths → path_lessons → lessons   (all deity 'athena')
--   · `lessons` holds 6 rows and carries NO pricing columns at all —
--     content · difficulty · display_order · estimated_duration ·
--     lesson_type · resources · status. The halls are free BY SCHEMA.
--
-- THE CONSEQUENCE, offered: a paid downloadable is a WARE
--   (ware_type='digital', pricing_model='fixed'), never a lesson row.
--   The library teaches and takes nothing; the bazaar sells the
--   artifact you carry home. That keeps E4's refusal intact — no points
--   on lessons, no XP, no level on the vessel — while the one-time cost
--   lands where costs belong.
--
-- Nothing drafted here: WHICH downloadables is yours to name.
--
-- =====================================================================
-- VERIFY (run after; the anon door, the same sitting — ritual step 3)
-- =====================================================================
-- select name, slug, work_type, pricing_model, price, status,
--        residual_pool_percent, icon_emoji
--   from public.works
--  order by created_at;
--
-- Expect exactly 1 row. Then confirm through the ANON door that a
-- 'draft' row is correctly INVISIBLE to a stranger — a published-gated
-- read returning [] on a draft row is CORRECT, not a false-empty.
-- =====================================================================
