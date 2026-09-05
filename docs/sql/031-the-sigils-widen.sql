-- =====================================================================
-- 031 — THE SIGILS WIDEN: twenty more rows on the Honors shelves, stamped
-- DRAFT. Never run by a lamp. KP's ⚛ hand only, in the Supabase dashboard.
--
-- One table: public.sigils. Nothing else is created, altered or written —
-- no sigil_unlocks, no vessel_sigils, no collections, no lessons.
-- Safe to run again: the insert skips every slug already in the shelf.
--
-- display_order 11-30, beneath the live ten at 1-10.
-- Two new categories beside 'becoming' and 'first-acts': 'own-pace' and
-- 'tending'. Both render through the gallery's existing capitalize chip.
-- Category census: becoming 4 · first-acts 5 · own-pace 5 · tending 6.
-- Rarity census:   common 10 · rare 6 · epic 3 · legendary 1 (mythic unused).
-- icon_url stays NULL — the image era sets it, not a seed.
--
-- The ceremony that grants these is not wired. sigil_unlocks (the rule
-- table) holds no rows and nothing writes vessel_sigils (the holding
-- table). These are definitions ahead of the granting, the same standing
-- as the first ten under 008.
-- =====================================================================

-- ---------------------------------------------------------------------
-- STEP 1 — SEE first (two reads, no writes).
-- ---------------------------------------------------------------------

-- 1a · the unique index that `on conflict (slug)` needs. One row expected;
-- if this returns nothing, STEP 2 will error and must not be forced.
select i.indexname, i.indexdef
  from pg_indexes i
 where i.schemaname = 'public'
   and i.tablename = 'sigils'
   and i.indexdef ilike '%(slug)%';

-- 1b · the shelf as it stands. Expect 10 rows, top display_order 10.
select count(*) as sigils_now,
       coalesce(max(display_order), 0) as top_order
  from public.sigils;

-- ---------------------------------------------------------------------
-- STEP 2 — the twenty rows.
-- ---------------------------------------------------------------------

insert into public.sigils
  (name, slug, description, category, rarity, icon_emoji, display_order, status)
values
-- BECOMING (2 common + 1 rare + 1 epic)
  ('Honest Reading', 'honest-reading', 'One reading of your own weather, in your own numbers and your own words. It is a reading, not a verdict — there was never a number it was supposed to be.', 'becoming', 'common', '🌡️', 11, 'published'),
  ('Shaped to You', 'shaped-to-you', 'You set the house to your own senses — text, motion, whatever your reading needs. Nothing here is calibrated to a normal; the house moves to your shape.', 'becoming', 'common', '🎚️', 12, 'published'),
  ('The Going Word', 'the-going-word', 'You chose the farewell — Gweld ti''n fuan, see you soon. The one departure word with a return already inside it, and it speaks only because you asked for it.', 'becoming', 'rare', '🕊️', 13, 'published'),
  ('Your Own Terms', 'your-own-terms', 'You set what is shown of you and what is not — and not-shown was already the default. Any of it can be taken back tomorrow; this mark stays either way.', 'becoming', 'epic', '🤝', 14, 'published'),

-- FIRST-ACTS (3 common + 1 rare + 1 epic)
  ('Lamplight', 'lamplight', 'A first journal entry — a lamp lit in your own window. A sentence counts, and no one reads it but you unless you choose.', 'first-acts', 'common', '🪔', 15, 'published'),
  ('Scroll Read', 'scroll-read', 'A first scroll read in the Archive, where the oldest word here is that chaos never meant disorder. Nothing is owed for reading it.', 'first-acts', 'common', '📜', 16, 'published'),
  ('The Play Itself', 'the-play-itself', 'One daily played for no reason but the playing. Here the play is the destination, never the reward for something else.', 'first-acts', 'common', '🎲', 17, 'published'),
  ('First Set', 'first-set', 'A first thing carried onto the Stage — a song, a set, a reading. The room was warmer for it, and no one counted the audience.', 'first-acts', 'rare', '🎙️', 18, 'published'),
  ('Work Kept', 'work-kept', 'A work made and kept — not offered, on purpose. A ware is a work offered; finished is not owed to anyone.', 'first-acts', 'epic', '🗝️', 19, 'published'),

-- OWN-PACE (4 common + 1 rare) — new category
  ('Own Rhythm', 'own-rhythm', 'Your own daily limit, set by your hand at whatever number is yours. The boundary follows you now, and the game obeys it.', 'own-pace', 'common', '🌗', 20, 'published'),
  ('The Pause', 'the-pause', 'You stopped part-way and nothing was lost. The pause is a right here, and the work waits where you left it.', 'own-pace', 'common', '⏸️', 21, 'published'),
  ('The Bookmark', 'the-bookmark', 'A date you set, and let pass, and nothing was held against you. Dates are bookmarks here — a place to find your way back, never a deadline.', 'own-pace', 'common', '🔖', 22, 'published'),
  ('The Patient Garden', 'the-patient-garden', 'You came back to a garden you left alone, and it was still there. Nothing decays while you are gone — plants go dormant, never die.', 'own-pace', 'common', '🌾', 23, 'published'),
  ('Uncounted', 'uncounted', 'You came back after time away and the door said its same word. No one counted the days — there is no count kept here.', 'own-pace', 'rare', '🚪', 24, 'published'),

-- TENDING (1 common + 3 rare + 1 epic + 1 legendary) — new category
  ('Abstention Kept', 'abstention-kept', 'You chose to abstain, and it was recorded as a voice. A chosen abstention is an answer; silence is not.', 'tending', 'common', '🤍', 25, 'published'),
  ('Knocked First', 'knocked-first', 'You named the weight of a thing before handing it over, letting them choose when to take it. Truth delivered into a shutdown is noise that happens to be correct.', 'tending', 'rare', '✋', 26, 'published'),
  ('Kept Whole', 'kept-whole', 'You set your telling beside someone else''s and let both stand. Divergences are kept whole here, never averaged into one account that suits nobody.', 'tending', 'rare', '🪢', 27, 'published'),
  ('Once Counted', 'once-counted', 'You pitched in once, and the roster never drops you. Once in, never out — the artisans'' dignity floor.', 'tending', 'rare', '🧾', 28, 'published'),
  ('The Door Built', 'the-door-built', 'A misunderstanding answered with a change — a plainer sentence, a checkpoint, a better door. The repair is architecture, and no penance is owed.', 'tending', 'epic', '🛠️', 29, 'published'),
  ('An Equal Share', 'an-equal-share', 'A share from the pools arrived whole — the same as everyone else''s, garnished by nothing. It came because you are here, not because of anything you made.', 'tending', 'legendary', '🪙', 30, 'published')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- STEP 3 — verify. The last read is the one that matters: run it through
-- the ANON key, not the dashboard, or a false-empty hides in plain sight.
-- ---------------------------------------------------------------------

-- the shelf (expect 30)
select 'sigils' as shelf, count(*) from public.sigils;

-- the category census (expect becoming 10 · first-acts 9 · tending 6 · own-pace 5)
select category, count(*) from public.sigils
 group by category order by count(*) desc, category;

-- the rarity census (expect common 14 · rare 10 · epic 4 · legendary 2)
select rarity, count(*) from public.sigils group by rarity
 order by case rarity when 'common' then 1 when 'rare' then 2
   when 'epic' then 3 when 'legendary' then 4 else 5 end;

-- the twenty in the order the gallery reads them
select display_order, icon_emoji, name, category, rarity, status
  from public.sigils where display_order between 11 and 30
 order by display_order;

-- no duplicate order, no orphaned image column (both must be 0)
select count(*) as duplicate_orders from (
  select display_order from public.sigils
   group by display_order having count(*) > 1) d;
select count(*) as icon_urls_set from public.sigils where icon_url is not null;
-- =====================================================================
