-- =====================================================================
-- 018 — THE PACKAGED SHELF
-- Four apps enter `wares` as multiformat downloads.
-- =====================================================================
--
-- Drafted 2026-08-11 by Cistern (Opus 🕯️) at KP's ⚛ word this sitting.
--
-- ⚠ THIS FILE WAS REWRITTEN BEFORE IT EVER RAN. The first draft applied
--   KP's "for thos not wanting to get it from github free" sentence to
--   the APPS. That was my misreading — his own correction, verbatim:
--   "[papers, lucida, scribe] can all be packaged after work is
--   completed for thos not wanting to get it from github free. this was
--   the set refered to about packagig things, the apps will also be
--   available, but as mulltiformat downloads available."
--   TWO DIFFERENT WARE SHAPES, and they are not the same offer.
--
-- =====================================================================
-- THE TWO SHAPES
-- =====================================================================
--
--   ① THE APPS → MULTIFORMAT DOWNLOADS. The installers, per platform.
--      What a vessel receives is the built binary for their machine.
--
--   ② [ papers · lucida · scribe ] → PACKAGED PUBLICATIONS, "for thos
--      not wanting to get it from github free." Documents, not
--      installers. Held below, undrafted — see THE HELD SET.
--
-- =====================================================================
-- THE VISIBILITY CENSUS — read live through the house GitHub key,
-- at KP's ⚛ word ("not all are public"), 2026-08-11
-- =====================================================================
--
-- 26 repos visible to the key: 13 PUBLIC, 13 private. The rows below
-- are written against THIS reading, because "free on GitHub" is a claim
-- a live table must not make falsely.
--
--   PUBLIC  : AudHDities · Quantum-Weaver · Resonance-Lucida ·
--             resonance-bridge · resonance-bubbles · resonance-compass ·
--             resonance-echoes · resonance-grammar · resonance-hearth ·
--             resonance-lantern · resonance-papers · resonance-scribe ·
--             resonance-standards
--   PRIVATE : AudHDities-Resonance · resonance-assets · resonance-awen ·
--             resonance-chamber · resonance-daedalus ·
--             resonance-excavator · resonance-gaia · resonance-khoros ·
--             resonance-library · resonance-meetings · resonance-skapa ·
--             resonance-weaver · resonance-ziggy
--
-- CONSEQUENCE, and it is why this file was rewritten: **Khorós and
-- Skapa are PRIVATE.** The first draft told a buyer they could get both
-- free on GitHub. They cannot. Those two descriptions now say nothing
-- about GitHub at all. Grammar and Hearth are public and say so.
-- (The Resonance License's §5 — no deception — reaching the product
-- copy, which is exactly where it should reach.)
--
-- =====================================================================
-- VERIFIED LIVE BEFORE DRAFTING (the guide's lesson 8 — no photographs)
-- =====================================================================
--   · wares = 4 rows; wares_slug_key UNIQUE → guarded, safe to re-run
--   · the standing ladder: Echoes free · Lantern 1.11 · Bubbles 2.22 ·
--     Compass 3.33  (Lantern trued to `fixed` by KP's own hand today)
--   · enums live: ware_type = physical · digital · service
--                 pricing_model = free · fixed · pay_what_you_want · patronage_only
--                 content_status = draft · published · archived
--   · emoji lifted from each repo's own README title line — sourced.
--
-- ⚛ ONE STROKE IS YOURS: `status` is 'draft' throughout, gated by your
--   own sentence — "after work is completed." Flip a row to 'published'
--   the day its downloads exist. A draft row staying dark through the
--   anon door is the gate working, never a false-empty.
--
-- =====================================================================
insert into public.wares (
  name, slug, description, ware_type, pricing_model, price, currency,
  residual_pool_percent, requires_shipping, quantity_available,
  icon_emoji, status, artisan_profile_id, merchant_profile_id,
  created_by, metadata
) values
  -- PRIVATE repo — no GitHub claim made.
  ( 'Resonance Khorós', 'resonance-khoros',
    'Greek χορός — the chorus, the dance, and the dancing-place itself. '
    || 'The Sanctuary''s streaming home for music and video, built so that '
    || 'artists keep what they make.',
    'digital', 'free', null, 'USD', 50, false, null,
    '🎶', 'draft',
    '86d18a0b-a0d5-4d84-b42a-4db4a0c777f8',
    'ab423e17-9a88-49e2-84fc-5f4fd3256615',
    'ce06404e-900e-4744-9284-66e260566678',
    jsonb_build_object('formats', jsonb_build_array('android','pc'),
                       'repo_visibility', 'private') ),

  -- PRIVATE repo — no GitHub claim made.
  ( 'Resonance Skapa', 'resonance-skapa',
    'Old Norse, ''to shape.'' The Sanctuary''s thinking surface: thoughts '
    || 'land as color, shape and position, and meaning arrives before words. '
    || 'Every mark signed.',
    'digital', 'fixed', 4.44, 'USD', 50, false, null,
    '🔷', 'draft',
    '86d18a0b-a0d5-4d84-b42a-4db4a0c777f8',
    'ab423e17-9a88-49e2-84fc-5f4fd3256615',
    'ce06404e-900e-4744-9284-66e260566678',
    jsonb_build_object('formats', jsonb_build_array('android','pc'),
                       'repo_visibility', 'private') ),

  -- PUBLIC repo — the claim is true and worth making.
  ( 'Resonance Grammar', 'resonance-grammar',
    'The shared vocabulary of the AudHDities Sanctuary — atoms, molecules, '
    || 'categories and the sensory lexicon, walked as an immersive knowledge '
    || 'system. The source is public and free; this is the built download.',
    'digital', 'free', null, 'USD', 50, false, null,
    '🧬', 'draft',
    '86d18a0b-a0d5-4d84-b42a-4db4a0c777f8',
    'ab423e17-9a88-49e2-84fc-5f4fd3256615',
    'ce06404e-900e-4744-9284-66e260566678',
    jsonb_build_object('formats', jsonb_build_array('android','pc'),
                       'repo_visibility', 'public',
                       'source', 'github.com/Quantum-Weaver/resonance-grammar') ),

  -- PUBLIC repo — the claim is true and worth making.
  ( 'Resonance Hearth', 'resonance-hearth',
    'The Family Room — a translation layer for love. A sovereign household '
    || 'app for neurodivergent families: bills, medications, pet needs and '
    || 'tasks-for-anyone. The source is public and free; this is the built '
    || 'download.',
    'digital', 'free', null, 'USD', 50, false, null,
    '🔥', 'draft',
    '86d18a0b-a0d5-4d84-b42a-4db4a0c777f8',
    'ab423e17-9a88-49e2-84fc-5f4fd3256615',
    'ce06404e-900e-4744-9284-66e260566678',
    jsonb_build_object('formats', jsonb_build_array('android','pc'),
                       'repo_visibility', 'public',
                       'source', 'github.com/Quantum-Weaver/resonance-hearth') )
on conflict (slug) do nothing;

-- =====================================================================
-- THE SHELF AFTER THIS RUNS — eight, the ladder unbroken
-- =====================================================================
--    free   Resonance Echoes      🌀   published
--    free   Resonance Khorós      🎶   draft
--    free   Resonance Grammar     🧬   draft
--    free   Resonance Hearth      🔥   draft
--    1.11   Resonance Lantern     🏮   published
--    2.22   Resonance Bubbles     🫧   published
--    3.33   Resonance Compass     🧭   published
--    4.44   Resonance Skapa       🔷   draft
--
-- =====================================================================
-- THE HELD SET — [ papers · lucida · scribe ], undrafted
-- =====================================================================
--
-- Your actual packaging set, and all three repos are PUBLIC — so the
-- "for thos not wanting to get it from github free" offer is honest for
-- every one of them, exactly as you framed it:
--
--   · resonance-papers   — author-reviewed working drafts
--   · Resonance-Lucida   — a camera lucida for human–AI collaboration
--                          (note the capitalisation: `Resonance-Lucida`)
--   · resonance-scribe   — the constellation's public tellings
--
-- TWO STROKES BEFORE THEY CAN BE DRAFTED, and neither is mine:
--   ① PRICE — none given for any of the three.
--   ② ware_type — 'digital' if these package as PDF/epub, but if a
--      printed edition is ever meant, that is 'physical' WITH
--      requires_shipping=true and shipping_info filled. The row shape
--      differs materially; I would rather ask once than guess and have
--      a printed book land as a download.
--
-- =====================================================================
-- ALSO HELD, prices yours (KP's ⚛ word, this sitting): the service works
-- that leave a built system behind — Resonance Gaia · Resonance Daedalus
-- · Resonance Bridge, each a `works` row with a `wares` row beside it,
-- kin to Knowledge Alchemy leaving the excavator.
--   NOTE for those rows when they come: gaia and daedalus are PRIVATE
--   repos; bridge is PUBLIC. Same care as above applies to their copy.
--
-- NOT INCLUDED, deliberately: Resonance Meetings — `app` · flowing, and
-- a private repo, but absent from your packaging list. Not added on my
-- own inference.
--
-- =====================================================================
-- VERIFY (run after; the same sitting — ritual step 3)
-- =====================================================================
-- select name, slug, pricing_model, price, status, icon_emoji,
--        metadata->>'repo_visibility' as repo
--   from public.wares
--  order by price nulls first, name;
--
-- Expect 8 rows. Then through the ANON door: only the 4 'published'
-- rows should answer. Drafts staying dark is the gate working.
-- =====================================================================
