-- ============================================================================
-- 003 — THE GARDEN CATALOGS: plant_stages + seed_types (the first soil)
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm) for KP's dashboard hand —
-- the two-hand rhythm. Run ONCE; base verified ZERO rows by KP's eye,
-- 2026-07-30 (DATA-SEEDS, the Hearth slice).
--
-- Provenance (the seeding law: content with provenance, never filler):
--   L1-13 (realm-audiences leg1, nodes 3051-3052): the Garden is "not a game
--     to win ... a practice to return to ... plants go dormant but don't
--     die ... No punishment. Only patience." Collections carry wonder:
--     "You have discovered 37 wonders. The cosmos still holds mysteries."
--   L3-01 (leg3, nodes 787-788), Brigid: "Let them plant seeds ... Creativity
--     should feel like a garden, not a factory."
--   HES-3 (realm-proposals/hestia.md): dormancy-not-death is the state
--     machine; patience is the feature.
--   KP's founding words (L1-13, verbatim): "grow and nurture colorful things
--     that would exist if seeds were found as a reward."
--
-- Laws worn by these rows:
--   * GATE 3 — image-era columns (icon_url, animation_url) stay NULL; no
--     image shapes in fresh rows. Color arrives when a surface asks for it.
--   * ANTI-SCARCITY — rarity serves wonder, never chase: no limited-time,
--     no drop rates, no status hierarchy. Spread kept gentle on purpose.
--   * 🚩 VITAL-REVISIT — every duration below is FIRST-GUESS MATH, expected
--     to be tuned against real gardens once vessels live here.
--   * harvest_rewards stays NULL — no surface consumes it yet; its shape
--     belongs to the planting-gesture crossing (nothing seeds ahead of its
--     surface).
--   * growth_duration stays NULL on every seed — the schema has ONE global
--     stage ladder (no per-seed ladders), so a per-seed duration would lie
--     to the reader. If seeds ever grow at their own pace, the schema grows
--     first.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- THE STAGE LADDER (one global arc — every plant walks these, in order).
-- All stages are TIMED so the arc completes and the plant "rests in bloom"
-- (readGrowth: fullyGrown when every timed stage has elapsed; nothing decays).
-- Total arc: 264 hours = 11 days. 🚩 VITAL-REVISIT.
-- ----------------------------------------------------------------------------

INSERT INTO public.plant_stages
  (name, slug, stage_order, duration_hours, description, status)
VALUES
  ('Tucked in',  'tucked-in',  1,  24,
   'Whole already, resting in the dark it needs.', 'published'),
  ('Sprout',     'sprout',     2,  48,
   'The first green — small, certain, unhurried.', 'published'),
  ('Unfurling',  'unfurling',  3,  72,
   'Leaves opening at their own pace. Nothing here can be rushed.', 'published'),
  ('Budding',    'budding',    4,  96,
   'Gathering itself. The longest wait, and the quietest.', 'published'),
  ('Bloom',      'bloom',      5,  24,
   'Open. It stays — nothing wilts, and nothing is taken back.', 'published');

-- ----------------------------------------------------------------------------
-- THE FIRST SEED PACKET (eight seeds; 4 common / 2 uncommon / 2 rare —
-- wonder without chase). Each row's provenance rides in its comment.
-- ----------------------------------------------------------------------------

INSERT INTO public.seed_types
  (name, slug, description, display_order, rarity, status)
VALUES
  -- The realm's own flower; the hearth-warmth Hestia keeps.
  ('Hearthflower', 'hearthflower',
   'Warm-petaled and glad of company. Blooms toward whoever tends it.',
   1, 'common', 'published'),

  -- The Seer, L1-13: "No punishment. Only patience."
  ('Patience Fern', 'patience-fern',
   'Grows whether or not you watch. Especially when you don''t.',
   2, 'common', 'published'),

  -- The Ancient Ones, L1-13: "the joy is in the slow morning walk."
  ('Morning Walk', 'morning-walk',
   'A trailing bloom that opens a little further each time you return.',
   3, 'common', 'published'),

  -- The door's word (the Three Words lexicon): Velkomin, once per crossing.
  ('Velkomin Bell', 'velkomin-bell',
   'Bell-shaped blossoms that nod when someone comes home.',
   4, 'common', 'published'),

  -- Brigid, L3-01: "Creativity should feel like a garden, not a factory."
  ('Brigid''s Blessing', 'brigids-blessing',
   'Thrives beside work happening gently. Likes being glanced at, not stared at.',
   5, 'uncommon', 'published'),

  -- Mnemosyne's nod; the shelf of treasures, "each one carrying a memory."
  ('Memory Moss', 'memory-moss',
   'Soft ground-cover that keeps whatever falls into it. Nothing is lost here.',
   6, 'uncommon', 'published'),

  -- KP, the Quantum Weaver — the thread that connects without binding.
  ('Weaver''s Thread', 'weavers-thread',
   'A slow vine that reaches toward neighboring plots and ties gentle knots.',
   7, 'rare', 'published'),

  -- The lantern's kindness: light that asks nothing back.
  ('Quiet Lantern', 'quiet-lantern',
   'Blooms that hold a soft glow after dark. They ask nothing for it.',
   8, 'rare', 'published');

-- ----------------------------------------------------------------------------
-- VERIFY (expect 5 and 8):
-- ----------------------------------------------------------------------------
SELECT 'plant_stages' AS catalog, count(*) FROM public.plant_stages
UNION ALL
SELECT 'seed_types', count(*) FROM public.seed_types;
