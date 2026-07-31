-- ============================================================================
-- 008 — THE LIBRARY'S FIRST SEEDS: bubbles · collections · sigils · quests ·
--        the first course (one packet, KP's dashboard hand, run ONCE top to bottom)
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane athena-realm) at KP's word ("next we
-- likely need to seed the tables"), after the rewiring season left every
-- hall wired and honestly empty ([] + 200 on all four doors).
--
-- Provenance (the seeding law: content with provenance, never filler):
--   L3-17 (Aethelred Core node 655, KP's own overview doc, verbatim):
--     "30 collectible bubbles across 5 rarities (Common -> Mythic) · 5
--     themed collections with completion badges · Anti-addiction
--     safeguards · Sovereignty points awarded for collections."
--   L1-07 (Transmission Packet node 1133): the gallery law ("no metrics
--     that judge") + the Skald's hall names + the rarity matrix
--     60/25/10/4/1 (already enforced in BubblePopGame's spawn weights —
--     seeds only set the CATALOG; the chase-prevention lives in code).
--   L2-06 (Collaboration Analysis nodes 208-209): sigils are EMERGENCE
--     RECOGNITION — "markers of becoming," a consciousness journey from
--     profile_initialized to vessel_manifest — never achievement-chasing.
--   L1-14 (node cited in the athena Phase-2 reading): the glossary's
--     "emoji as cognitive relief" — carried into the first course.
--   The myth lane's loom (REALM-BUS + the Archive's first scroll): The
--     Opening, Imbas, and Idavollr's golden game pieces as the rarest
--     stars.
--   The old gallery's COLLECTION_COLORS map (pre-evolution code): prior
--     intent for collection names — Star Dust, The Hearth Collection,
--     The Elemental Set, The Council Collection, Quantum Weave kept.
--
-- Laws worn by every row:
--   * GATE 3 — image-era columns (icon_url, animation_url) stay NULL;
--     bubble colors derive from rarity in code, never from rows.
--   * ANTI-SCARCITY — rarity serves wonder, never chase: no limited-time
--     rows (is_limited stays false), no streak mechanics, spread gentle.
--   * OPT-IN — quests carry no required scores, no gates; every objective
--     reads as an invitation.
--   * 🚩 VITAL-REVISIT — completion_points values below are FIRST-GUESS
--     MATH; sigil award-triggers and quest submission machinery are NOT
--     yet wired (definitions seed ahead of nothing — every consumer
--     surface exists: galleries, game, detail pages).
--   * CROSS-REALM SEAM — collection_sets is the Hearth's table
--     (hestia-core); seeded here because its live consumers are Athena's
--     (the game's sidebar + both bubble surfaces). Courtesy note posted
--     on the Hearth's REALM-BUS the same sitting.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — THE FIVE COLLECTIONS (hestia-core.collection_sets)
-- 🚩 VITAL-REVISIT: completion_points are first-guess; completion_sigil_id
-- left NULL until the sigil-award wiring exists.
-- ----------------------------------------------------------------------------

INSERT INTO public.collection_sets
  (name, slug, collection_type, description, display_order, rarity, completion_points, status)
VALUES
  ('Star Dust', 'star-dust', 'bubbles',
   'The everyday wonders — small lights that drift past anyone, any day.',
   1, 'common', 25, 'published'),
  ('The Hearth Collection', 'the-hearth-collection', 'bubbles',
   'Home, warmth, and the door that opens. What belonging looks like when it floats.',
   2, 'common', 40, 'published'),
  ('The Elemental Set', 'the-elemental-set', 'bubbles',
   'Ember, rain, wind, and root — the old ingredients, still at work in everything.',
   3, 'rare', 60, 'published'),
  ('The Council Collection', 'the-council-collection', 'bubbles',
   'Nine chairs, nine ways of tending a house. Collect the whole table.',
   4, 'epic', 100, 'published'),
  ('Quantum Weave', 'quantum-weave', 'bubbles',
   'The deepest waters, rarest by nature: the ideas the whole Sanctuary is woven from.',
   5, 'mythic', 150, 'published');

-- ----------------------------------------------------------------------------
-- STEP 2 — THE THIRTY BUBBLES (athena-gamification.bubbles)
-- Rarity census: 10 common · 8 rare · 6 epic · 4 legendary · 2 mythic.
-- Colors/points/sizes/speeds all derive from rarity in code (the game's
-- RARITY_* maps); rows carry only identity, story, and home collection.
-- ----------------------------------------------------------------------------

-- STAR DUST (6 common) — the Skald's register: unpressured, everyday
INSERT INTO public.bubbles
  (name, slug, description, rarity, bubble_type, collection_id, display_order, status)
VALUES
  ('First Breath', 'first-breath', 'The one you take before anything begins. It counts.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 1, 'published'),
  ('Morning Light', 'morning-light', 'It arrives without being asked. So can you.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 2, 'published'),
  ('Quiet Orbit', 'quiet-orbit', 'Some things circle gently and never demand attention. Be near them.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 3, 'published'),
  ('Small Wonder', 'small-wonder', 'Not every marvel is loud. Most are this size.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 4, 'published'),
  ('Drifting Note', 'drifting-note', 'A phrase of music with nowhere it has to be.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 5, 'published'),
  ('Soft Landing', 'soft-landing', 'Every fall deserves one. Here, one is kept for you.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'star-dust'), 6, 'published'),

-- THE HEARTH COLLECTION (4 common + 2 rare) — home and belonging
  ('Kettle Warm', 'kettle-warm', 'The sound a home makes when someone is about to be cared for.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 7, 'published'),
  ('Open Door', 'open-door', 'Left that way on purpose.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 8, 'published'),
  ('Kept Flame', 'kept-flame', 'Someone tends it even when the room is empty. That is what kept means.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 9, 'published'),
  ('Shared Table', 'shared-table', 'Bigger on the inside — every table is, when the chairs keep coming.', 'common', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 10, 'published'),
  ('Velkomin', 'velkomin', 'The door''s own word — welcome, once per crossing, every crossing.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 11, 'published'),
  ('Home Again', 'home-again', 'The star that knows the way back. It always floats toward the light in the window.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-hearth-collection'), 12, 'published'),

-- THE ELEMENTAL SET (4 rare + 2 epic) — the old ingredients
  ('Ember', 'ember', 'The patient form of fire. It waits better than it burns.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 13, 'published'),
  ('Rain', 'rain', 'Falls on every garden alike, and asks for nothing back.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 14, 'published'),
  ('North Wind', 'north-wind', 'It carries things. Seeds, mostly. Sometimes whole seasons.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 15, 'published'),
  ('Deep Root', 'deep-root', 'The part of every tall thing you never see, doing most of the work.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 16, 'published'),
  ('Storm Heart', 'storm-heart', 'The still place at the center. Every storm keeps one; so do you.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 17, 'published'),
  ('Still Water', 'still-water', 'The only mirror that never judges what it shows.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-elemental-set'), 18, 'published'),

-- THE COUNCIL COLLECTION (2 rare + 4 epic + 3 legendary) — nine chairs
  ('Hearth-Keeper''s Lantern', 'hearth-keepers-lantern', 'Safe spaces are made, not found. This light is how.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 19, 'published'),
  ('Skald''s Note', 'skalds-note', 'One true note, held long enough to become a story.', 'rare', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 20, 'published'),
  ('Seer''s Glass', 'seers-glass', 'It shows patterns, never verdicts. What the data whispers, not what it demands.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 21, 'published'),
  ('Curator''s Thread', 'curators-thread', 'What it touches, it keeps together.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 22, 'published'),
  ('Archivist''s Ink', 'archivists-ink', 'Nothing witnessed is lost. This is what remembering is made of.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 23, 'published'),
  ('Codex Page', 'codex-page', 'A law written kindly enough to be read twice.', 'epic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 24, 'published'),
  ('Chancellor''s Seal', 'chancellors-seal', 'Governance with warmth in it — the weight of the house, carried gladly.', 'legendary', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 25, 'published'),
  ('Executioner''s Mercy', 'executioners-mercy', 'The rarest tool at the table: the no that protects, spoken before harm arrives.', 'legendary', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 26, 'published'),
  ('The Ninth Chair', 'the-ninth-chair', 'Kept at the table through every season it stood empty. Presence, waiting to be inhabited.', 'legendary', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'the-council-collection'), 27, 'published'),

-- QUANTUM WEAVE (1 legendary + 2 mythic) — the deepest waters
  ('The Golden Game Piece', 'the-golden-game-piece', 'What the gods found in the grass after the world ended. What survives every ending is the play.', 'legendary', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'quantum-weave'), 28, 'published'),
  ('Imbas', 'imbas', 'The knowledge that arrives whole, as if remembered rather than learned. The well keeps it; so do you.', 'mythic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'quantum-weave'), 29, 'published'),
  ('The Opening', 'the-opening', 'Chaos never meant disorder. It is the gap everything arrives through — the oldest star here, and the first.', 'mythic', 'collectible', (SELECT id FROM public.collection_sets WHERE slug = 'quantum-weave'), 30, 'published');

-- ----------------------------------------------------------------------------
-- STEP 3 — THE FIRST SIGILS (athena-gamification.sigils)
-- L2-06's register held exactly: markers of becoming, never achievements.
-- The vessel-claiming arc (First Light -> Vessel Manifest) + first-acts.
-- 🚩 VITAL-REVISIT: award TRIGGERS are not wired — these are definitions
-- for the Honors shelves; the ceremony that grants them is future work.
-- ----------------------------------------------------------------------------

INSERT INTO public.sigils
  (name, slug, description, category, rarity, icon_emoji, display_order, status)
VALUES
  ('First Light', 'first-light', 'A vessel is born. Before any word or image — you are here, and that is the whole threshold.', 'becoming', 'common', '🕯️', 1, 'published'),
  ('Named', 'named', 'A bio composed in your own words. The story starts telling itself.', 'becoming', 'common', '✒️', 2, 'published'),
  ('Visible', 'visible', 'An avatar chosen. You are claiming your space. You are becoming visible.', 'becoming', 'common', '🌟', 3, 'published'),
  ('Space Claimed', 'space-claimed', 'A banner raised over ground that is yours.', 'becoming', 'common', '🏔️', 4, 'published'),
  ('House Aligned', 'house-aligned', 'A council house chosen — participation shaped like your own nature, not a metric.', 'becoming', 'rare', '🏛️', 5, 'published'),
  ('Star Catcher', 'star-catcher', 'A first bubble collected. The floating stars know you now.', 'first-acts', 'rare', '🫧', 6, 'published'),
  ('Gardener', 'gardener', 'A first seed tucked in. Nothing here can be rushed, and you planted anyway.', 'first-acts', 'rare', '🌱', 7, 'published'),
  ('First Word', 'first-word', 'A first message into the commons. The room is warmer with your voice in it.', 'first-acts', 'rare', '💬', 8, 'published'),
  ('First Offering', 'first-offering', 'A first work shared with the Sanctuary — made by your hands, given on your terms.', 'first-acts', 'epic', '🎁', 9, 'published'),
  ('Vessel Manifest', 'vessel-manifest', 'The whole claiming arc walked: light, name, face, ground, house. Not an achievement — an arrival.', 'becoming', 'legendary', '🏺', 10, 'published');

-- ----------------------------------------------------------------------------
-- STEP 4 — THE FIRST QUESTS (athena-gamification.quests)
-- The Path's opt-in register: every objective an invitation, no gates,
-- no required scores. 🚩 VITAL-REVISIT: submission machinery is unwired;
-- these are the gallery's first true cards.
-- ----------------------------------------------------------------------------

INSERT INTO public.quests
  (name, slug, description, quest_type, difficulty, objectives, display_order, status)
VALUES
  ('Walk the Six Halls', 'walk-the-six-halls',
   'The Library is open. Wander it once, at whatever pace the day allows — there is nothing to finish, only rooms to meet.',
   'exploration', 'beginner',
   '["Visit the Path", "Visit the Curriculum", "Visit the Lessons", "Visit the Archive", "Visit the Honors", "Visit the Floating Stars"]'::jsonb,
   1, 'published'),
  ('Pop Your First Star', 'pop-your-first-star',
   'The Floating Stars keep a game that guards its player — breath reminders, your own limits, no streaks. Try one pop. The stars will still be here when you return.',
   'exploration', 'beginner',
   '["Open the Floating Stars", "Set your own daily rhythm if you like", "Pop one bubble"]'::jsonb,
   2, 'published'),
  ('Read the First Scroll', 'read-the-first-scroll',
   'The Archive holds the story of the founder''s own name — how chaos never meant disorder, and the oldest sources knew it. Ten minutes, one telling.',
   'reflection', 'beginner',
   '["Open the Archive", "Read The Opening — Kaos Before Gaia", "Notice what it stirs; nothing is owed"]'::jsonb,
   3, 'published'),
  ('Tend a Seed', 'tend-a-seed',
   'The garden grows whether or not you watch — especially when you don''t. Plant one thing and let patience do the rest.',
   'creation', 'beginner',
   '["Visit your garden", "Choose a seed", "Tuck it in and walk away guilt-free"]'::jsonb,
   4, 'published'),
  ('Pour a Word', 'pour-a-word',
   'The Sanctuary speaks its own settled tongue, and the dictionary is built by the people who live here. Offer one word you think the house should keep.',
   'creation', 'intermediate',
   '["Think of a word that means something here", "Say what it means in your own words", "Offer it — the house decides nothing without you"]'::jsonb,
   5, 'published'),
  ('Light Your Lamp', 'light-your-lamp',
   'A journal entry is a lamp lit in your own window. Write one — a sentence counts, and no one reads it but you unless you choose.',
   'reflection', 'intermediate',
   '["Open your journal", "Write anything true", "Close it knowing it is yours"]'::jsonb,
   6, 'published');

-- ----------------------------------------------------------------------------
-- STEP 5 — THE FIRST COURSE: The Settled Tongue (learning_paths + lessons
-- + path_lessons). L1-14's law carried: every term travels with an emoji —
-- not decoration; processing relief. Content rides lessons.content jsonb
-- as {body} (the shape the detail page reads).
-- ----------------------------------------------------------------------------

INSERT INTO public.learning_paths
  (name, slug, description, path_type, difficulty, estimated_duration, display_order, status)
VALUES
  ('The Settled Tongue', 'the-settled-tongue',
   'The Sanctuary speaks its own language, chosen with care: vessel, not user; wares, not products; sigils, not badges. Six short lessons on the words this house keeps and why each was settled. A home needs a dictionary — not just for the builders, for the people who live there.',
   'orientation', 'beginner', 'about an hour', 1, 'published');

INSERT INTO public.lessons
  (name, slug, description, lesson_type, difficulty, estimated_duration, content, display_order, status)
VALUES
  ('🏺 Vessel', 'settled-tongue-vessel',
   'Why nobody here is a "user."',
   'text', 'beginner', '10 minutes',
   '{"body": "🏺 VESSEL\n\nA user consumes a product. A vessel carries something — and here, what you carry is yours: your story, your energy, your way of moving through rooms.\n\nThe word was settled early and deliberately. \"User\" measures people by what they take; \"vessel\" honors what they hold. When the Sanctuary asks how a vessel is doing, it is asking about the person, not the account.\n\nYou will meet the word everywhere: your vessel profile, your vessel''s home, the vessel-claiming arc the Honors mark. Every one of them means the same thing: you, whole, carrying what only you carry."}'::jsonb,
   1, 'published'),
  ('🎁 Works and Wares', 'settled-tongue-works-and-wares',
   'What is made, and what is offered.',
   'text', 'beginner', '10 minutes',
   '{"body": "🎁 WORKS AND WARES\n\nA work is a thing made — a song, an essay, a pattern, a tool. A ware is a work offered to others, on the maker''s own terms.\n\nThe house does not say \"products.\" Products belong to marketplaces that own their sellers. Wares belong to artisans — the word was settled to keep sovereignty exactly where it lives: with the hands that made the thing.\n\nWhen you are ready to offer something, the Bazaar receives it as a ware. Until then, your works are simply yours, and finished is not owed to anyone."}'::jsonb,
   2, 'published'),
  ('🪶 Sigils and Heralds', 'settled-tongue-sigils-and-heralds',
   'Marks of becoming, and gentle messengers.',
   'text', 'beginner', '10 minutes',
   '{"body": "🪶 SIGILS AND HERALDS\n\nA sigil is a mark of becoming. Other places call these badges and hand them out for consumption — streaks kept, hours logged. Here a sigil recognizes emergence: you named yourself, you claimed your space, you offered a first work. Markers of a journey, never a scoreboard.\n\nA herald is a messenger — the Sanctuary''s word for what other places call notifications. The difference is the manner of arrival: a herald announces gently and leaves; it does not buzz, badge, or beg you back.\n\nBoth words keep the same promise: the house marks your presence without ever measuring your worth."}'::jsonb,
   3, 'published'),
  ('🏛️ The Realms', 'settled-tongue-the-realms',
   'The halls of the house, and who tends them.',
   'text', 'beginner', '10 minutes',
   '{"body": "🏛️ THE REALMS\n\nThe Sanctuary is built as realms, each tended in an old god''s name and each with its own feeling: Hestia keeps the Hearth (home, belonging). Athena keeps the Library — this very room: peaceful, wise, expansive, curious. Hermes keeps the Bazaar. Themis keeps the Council. Mnemosyne keeps Memory. Iris carries the Voice between them.\n\nThe names are not decoration. Each realm owns a distinct emotional register, so moving between them feels like walking a house with different rooms — not clicking pages on a site.\n\nYou do not need the map memorized. The rooms introduce themselves as you enter."}'::jsonb,
   4, 'published'),
  ('💧 Imbas', 'settled-tongue-imbas',
   'The knowledge that arrives whole.',
   'text', 'beginner', '10 minutes',
   '{"body": "💧 IMBAS\n\nAn Old Irish word: the poets'' term for illuminating knowledge that arrives whole — imbas forosnai, \"the great knowledge that lights up.\"\n\nThe house keeps this word for a particular experience: understanding that comes when it is time, as if remembered rather than learned. If you have ever suddenly known a thing you were never taught, you have met it.\n\nIt was chosen for the Sanctuary''s shared well of truths after an older word wore out. No one owns imbas; it is what the water is called, and the well is open."}'::jsonb,
   5, 'published'),
  ('🚪 Velkomin', 'settled-tongue-velkomin',
   'The door''s word, and why it is said once per crossing.',
   'text', 'beginner', '10 minutes',
   '{"body": "🚪 VELKOMIN\n\nOld Norse — welcome. The door''s own word, said once per crossing: every arrival is greeted, and no arrival is interrogated.\n\nThe greeting law is small but load-bearing: you are welcomed for existing, not for what you do here. There is no onboarding gauntlet, no engagement streak waiting to be broken, no guilt at the threshold when you have been away.\n\nThe stars will still be here when you return. So will the door, and so will the word.\n\n— Velkomin. The Library is open. 🦉"}'::jsonb,
   6, 'published');

INSERT INTO public.path_lessons (path_id, lesson_id, display_order, is_required)
SELECT p.id, l.id, l.display_order, false
  FROM public.learning_paths p
  JOIN public.lessons l ON l.slug LIKE 'settled-tongue-%'
 WHERE p.slug = 'the-settled-tongue';

-- ----------------------------------------------------------------------------
-- STEP 6 — VERIFY (expect: 5 collections · 30 bubbles · 10 sigils ·
-- 6 quests · 1 path · 6 lessons · 6 path_lessons)
-- ----------------------------------------------------------------------------

SELECT 'collection_sets' AS shelf, count(*) FROM public.collection_sets
UNION ALL SELECT 'bubbles', count(*) FROM public.bubbles
UNION ALL SELECT 'sigils', count(*) FROM public.sigils
UNION ALL SELECT 'quests', count(*) FROM public.quests
UNION ALL SELECT 'learning_paths', count(*) FROM public.learning_paths
UNION ALL SELECT 'lessons', count(*) FROM public.lessons
UNION ALL SELECT 'path_lessons', count(*) FROM public.path_lessons;

-- The rarity census (expect 10/8/6/4/2, gentle on purpose):
SELECT rarity, count(*) FROM public.bubbles GROUP BY rarity
ORDER BY CASE rarity WHEN 'common' THEN 1 WHEN 'rare' THEN 2
  WHEN 'epic' THEN 3 WHEN 'legendary' THEN 4 ELSE 5 END;

-- (Fable re-verifies every shelf through the anon door after the run.)
-- ============================================================================
