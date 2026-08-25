-- 025 -- the Floating Stars' collections and stars. RAN 2026-08-25 at KP's hand.
-- It met a base that already held the 13 collections and 123 stars under longer slugs,
-- so its inserts skipped and five empty duplicate collections were made; 026 mends that.
-- Safe to run again: every statement skips what already exists.
-- Source: resonance-bubbles/src/lib/data/bubbles-set.json (13 collections, 123 stars).
-- Decisions are recorded in the conductor's return, not here.

-- 1 - the four colour columns
alter table public.bubbles add column if not exists palette text[];
alter table public.bubbles add column if not exists ring text;
alter table public.collection_sets add column if not exists accent text;
alter table public.collection_sets add column if not exists palette text[];

-- 2 - the eight collections the app carries and the base does not
insert into public.collection_sets
  (name, slug, collection_type, description, display_order, rarity, completion_points, status, accent, palette)
values
  ('The Sky Wheel', 'sky-wheel', 'bubbles', 'Eight spokes of the turning year — the sky''s own calendar, drifting past. (An addition, offered to the online set.)', 6, NULL, NULL, 'published', 'mystical.sun', NULL),
  ('The Sensory Set', 'sensory', 'bubbles', 'What the body already knew. Small wonders that arrive through skin, ear, and weight rather than words.', 7, NULL, NULL, 'published', 'mood.peaceful', NULL),
  ('The Long Night', 'long-night', 'bubbles', 'Rest, and the dark that was never the thing to fear. Off duty, and allowed to be.', 8, NULL, NULL, 'published', 'mystical.moon', NULL),
  ('The Workshop', 'workshop', 'bubbles', 'Making, and the tools that make making possible. Sharp so they can be gentle.', 9, NULL, NULL, 'published', 'fire.base', NULL),
  ('The Companions', 'companions', 'bubbles', 'The ones with fur and feathers, who counted as family from the start. The word just caught up.', 10, NULL, NULL, 'published', 'sanctuary.green', NULL),
  ('The Threshold', 'threshold', 'bubbles', 'Doors, edges, and the crossing itself. Ready is sometimes the whole of it.', 11, NULL, NULL, 'published', 'cosmic.blue', NULL),
  ('The Given', 'the-given', 'bubbles', 'What this house refuses to charge for. The rarest waters: the laws underneath every other star here.', 12, NULL, NULL, 'published', 'sanctuary.emerald', NULL),
  ('Inclusive Pride', 'inclusive-pride', 'bubbles', 'Colours held up on purpose — one flag that carries the others inside it. Every flag here drifts at the same rarity, because no one''s is rarer than anyone else''s.', 13, NULL, NULL, 'published', NULL, ARRAY['pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']::text[])
on conflict (slug) do nothing;

-- 3 - the ninety-three stars the app carries and the base does not
-- batch 1: display_order 31-80 (50 rows)
insert into public.bubbles
  (name, slug, description, rarity, bubble_type, collection_id, display_order, status, palette, ring)
values
  ('Pocket Stone', 'pocket-stone', 'Smooth from being kept. Some comforts are carried, not spoken.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 31, 'published', NULL, NULL),
  ('Roof Rain', 'roof-rain', 'The safest sound there is, heard from inside.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 32, 'published', NULL, NULL),
  ('Clean Page', 'clean-page', 'Nothing owed on it yet. It can wait all day.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 33, 'published', NULL, NULL),
  ('Found Penny', 'found-penny', 'Worth almost nothing, kept anyway. Value was never the point.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 34, 'published', NULL, NULL),
  ('Slow Cloud', 'slow-cloud', 'It gets there when it gets there. It always gets there.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 35, 'published', NULL, NULL),
  ('Second Cup', 'second-cup', 'The first one was for waking. This one is for being awake.', 'common', 'collectible', (select id from public.collection_sets where slug = 'star-dust'), 36, 'published', NULL, NULL),
  ('Porch Light', 'porch-light', 'Left on for someone. Maybe you.', 'common', 'collectible', (select id from public.collection_sets where slug = 'the-hearth-collection'), 37, 'published', NULL, NULL),
  ('Folded Blanket', 'folded-blanket', 'Ready is a kind of love.', 'common', 'collectible', (select id from public.collection_sets where slug = 'the-hearth-collection'), 38, 'published', NULL, NULL),
  ('Gweld ti''n fuan', 'gweld-tin-fuan', 'See you soon, in the door''s own tongue. A goodbye that promises.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'the-hearth-collection'), 39, 'published', NULL, NULL),
  ('Quiet Room', 'quiet-room', 'A room that asks nothing. Every home needs one; every mind does too.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'the-hearth-collection'), 40, 'published', NULL, NULL),
  ('First Frost', 'first-frost', 'It changes everything it touches, gently, overnight.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'the-elemental-set'), 41, 'published', NULL, NULL),
  ('River Stone', 'river-stone', 'Shaped entirely by staying put while everything moved past.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'the-elemental-set'), 42, 'published', NULL, NULL),
  ('Aurora', 'aurora', 'The sky remembering it can dance.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'the-elemental-set'), 43, 'published', NULL, NULL),
  ('Bedrock', 'bedrock', 'What holds does not need to be seen holding.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'the-elemental-set'), 44, 'published', NULL, NULL),
  ('Imbolc', 'imbolc', 'The year''s first candle, lit while it is still winter. On purpose.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 45, 'published', NULL, NULL),
  ('Ostara', 'ostara', 'Balance, briefly. The light and the dark agree for one whole day.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 46, 'published', NULL, NULL),
  ('Beltane', 'beltane', 'The fires of growing. Everything says yes at once.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 47, 'published', NULL, NULL),
  ('Litha', 'litha', 'The longest light. Even it turns, and that is not a loss.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 48, 'published', NULL, NULL),
  ('Lughnasadh', 'lughnasadh', 'First fruits. You harvest what you planted, and it is enough.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 49, 'published', NULL, NULL),
  ('Mabon', 'mabon', 'The second balance. Gratitude has a date.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 50, 'published', NULL, NULL),
  ('Samhain', 'samhain', 'The veil thin, the ancestors near — the year''s own quiet night.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 51, 'published', NULL, NULL),
  ('Yule', 'yule', 'The dark''s deepest point is exactly where the light turns around.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'sky-wheel'), 52, 'published', NULL, NULL),
  ('The Lattice', 'the-lattice', 'Not a hierarchy. Everything touches everything, on purpose.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'quantum-weave'), 53, 'published', NULL, NULL),
  ('The Well', 'the-well', 'Shared water, poured by hand. What is true for one is true for all.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'quantum-weave'), 54, 'published', NULL, NULL),
  ('Superposition', 'superposition', 'All the possibilities, held gently, before any one becomes real.', 'mythic', 'collectible', (select id from public.collection_sets where slug = 'quantum-weave'), 55, 'published', NULL, NULL),
  ('Warm Weight', 'warm-weight', 'The blanket that presses back. Some calm only ever arrives through the skin.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 56, 'published', NULL, NULL),
  ('Hum Under Everything', 'hum-under-everything', 'The fridge, the fan, the far-off road. Not silence — company.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 57, 'published', NULL, NULL),
  ('Cold Side', 'cold-side', 'You turn the pillow over. It works every single time.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 58, 'published', NULL, NULL),
  ('Bare Feet', 'bare-feet', 'The floor tells you exactly where you are. It has never once lied.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 59, 'published', NULL, NULL),
  ('Deep Pressure', 'deep-pressure', 'A hug that means it, or a wall to lean on. The body believes both equally.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 60, 'published', NULL, NULL),
  ('Perfect Texture', 'perfect-texture', 'The one your hand keeps going back to. It was always allowed to be a reason.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 61, 'published', NULL, NULL),
  ('Rain Smell', 'rain-smell', 'Petrichor, if you want the word for it. The ground breathing out is the better one.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 62, 'published', NULL, NULL),
  ('Sun Patch', 'sun-patch', 'Warm floor, no reason to move. Cats have always understood this.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 63, 'published', NULL, NULL),
  ('Same Song Again', 'same-song-again', 'The eleventh time is not too many. It is doing something.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 64, 'published', NULL, NULL),
  ('Fidget Ring', 'fidget-ring', 'The hands need somewhere to go. Giving them one is not a lapse in attention.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 65, 'published', NULL, NULL),
  ('Fresh Sheets', 'fresh-sheets', 'Nothing changed, and everything did.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 66, 'published', NULL, NULL),
  ('Soft Volume', 'soft-volume', 'The world set to the level you can actually hear it at.', 'common', 'collectible', (select id from public.collection_sets where slug = 'sensory'), 67, 'published', NULL, NULL),
  ('First Yawn', 'first-yawn', 'The body''s own permission slip. It rarely asks twice.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 68, 'published', NULL, NULL),
  ('Night Window', 'night-window', 'Everything out there is handling itself. You are off duty.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 69, 'published', NULL, NULL),
  ('Low Lamp', 'low-lamp', 'Enough light to be found by. Not enough to be examined.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 70, 'published', NULL, NULL),
  ('Put It Down', 'put-it-down', 'The task is still there tomorrow. So are you, and that was the harder one.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 71, 'published', NULL, NULL),
  ('Small Hours', 'small-hours', 'Nobody wants anything from you. That is the entire gift.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 72, 'published', NULL, NULL),
  ('Turning Over', 'turning-over', 'A new position, a new chance. The night keeps several.', 'common', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 73, 'published', NULL, NULL),
  ('Kind Dark', 'kind-dark', 'It was never the thing to be afraid of. It was the thing that let you stop.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 74, 'published', NULL, NULL),
  ('Dreamless', 'dreamless', 'Nothing to interpret. Just gone, and back, and better.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 75, 'published', NULL, NULL),
  ('Long Sleep', 'long-sleep', 'The kind you wake from having actually been somewhere. Never scheduled, only granted.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 76, 'published', NULL, NULL),
  ('Found By Morning', 'found-by-morning', 'You did not have to do anything at all. It came and got you.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'long-night'), 77, 'published', NULL, NULL),
  ('First Cut', 'first-cut', 'The material decides nothing until you do. Then it agrees.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 78, 'published', NULL, NULL),
  ('Sharp Edge', 'sharp-edge', 'Kept sharp so it can be gentle. It is the dull tool that tears.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 79, 'published', NULL, NULL),
  ('Measured Twice', 'measured-twice', 'Not caution. Respect for the thing you are about to change.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 80, 'published', NULL, NULL)
on conflict (slug) do nothing;

-- batch 2: display_order 81-123 (43 rows)
insert into public.bubbles
  (name, slug, description, rarity, bubble_type, collection_id, display_order, status, palette, ring)
values
  ('Sawdust', 'sawdust', 'Proof of the shape you took away. Every making leaves some.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 81, 'published', NULL, NULL),
  ('Worn Handle', 'worn-handle', 'It fits your hand because of every hour you already gave it.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 82, 'published', NULL, NULL),
  ('Right Tool', 'right-tool', 'The whole job becomes possible at once. Nothing was ever wrong with you.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 83, 'published', NULL, NULL),
  ('The Jig', 'the-jig', 'Built once, so the hard part is never hard again.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 84, 'published', NULL, NULL),
  ('True Square', 'true-square', 'Everything after it depends on it. Which is why it gets checked.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 85, 'published', NULL, NULL),
  ('Annealing', 'annealing', 'Heated, then allowed to cool slowly. That is how brittleness leaves a thing.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 86, 'published', NULL, NULL),
  ('Finished Joint', 'finished-joint', 'It holds without glue, and without being understood.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'workshop'), 87, 'published', NULL, NULL),
  ('Tail Thunder', 'tail-thunder', 'The whole body agrees that you came back.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'companions'), 88, 'published', NULL, NULL),
  ('Lap Claim', 'lap-claim', 'You have been designated furniture. It is an honour.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'companions'), 89, 'published', NULL, NULL),
  ('Old Friend', 'old-friend', 'Slower now, and no less pleased to see you. Nothing was subtracted.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'companions'), 90, 'published', NULL, NULL),
  ('Night Purr', 'night-purr', 'A small engine idling on your chest, keeping the dark company.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'companions'), 91, 'published', NULL, NULL),
  ('The One Who Knows', 'the-one-who-knows', 'Arrives before you knew you needed it. Nobody taught it that.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'companions'), 92, 'published', NULL, NULL),
  ('Chosen Person', 'chosen-person', 'Out of everyone in the house, it picked you. There was no interview.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'companions'), 93, 'published', NULL, NULL),
  ('First Pet', 'first-pet', 'The one who taught you that love could be uncomplicated.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'companions'), 94, 'published', NULL, NULL),
  ('Still Waiting', 'still-waiting', 'Some love keeps its post long after the door stops opening. That is not a mistake.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'companions'), 95, 'published', NULL, NULL),
  ('The Whole Family', 'the-whole-family', 'The ones with fur and feathers counted from the very start. The word just took a while.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'companions'), 96, 'published', NULL, NULL),
  ('Doorstep', 'doorstep', 'Neither in nor out. A place allowed to be both.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 97, 'published', NULL, NULL),
  ('First Step', 'first-step', 'It is the only one that is hard. The rest are just steps.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 98, 'published', NULL, NULL),
  ('Packed Bag', 'packed-bag', 'Ready is not the same as leaving. Some days ready is the whole of it.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 99, 'published', NULL, NULL),
  ('New Key', 'new-key', 'It does not know the door yet. It will.', 'rare', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 100, 'published', NULL, NULL),
  ('The Crossing', 'the-crossing', 'You are not who you were on the other side. Nothing was lost in the change.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 101, 'published', NULL, NULL),
  ('Bridge Half Built', 'bridge-half-built', 'It reaches. That is already most of what a bridge does.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 102, 'published', NULL, NULL),
  ('The Far End', 'the-far-end', 'Not visible from here. Still there.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 103, 'published', NULL, NULL),
  ('One Way Door', 'one-way-door', 'It closed behind you, and that turned out to be a mercy.', 'epic', 'collectible', (select id from public.collection_sets where slug = 'threshold'), 104, 'published', NULL, NULL),
  ('First User', 'first-user', 'Built for one need, then handed to everyone. The order is the whole ethic.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 105, 'published', NULL, NULL),
  ('The Pause', 'the-pause', 'Stop, count three, let the space hold it. Nothing true is lost by waiting.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 106, 'published', NULL, NULL),
  ('Lose Nothing', 'lose-nothing', 'Not one record pruned. What happened, happened, and it stays.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 107, 'published', NULL, NULL),
  ('Dignity', 'dignity', 'Not earned, not awarded, and not withdrawable. The ground floor everything else stands on.', 'mythic', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 108, 'published', NULL, NULL),
  ('Consent', 'consent', 'Every door opened by the hand that owns it. There is no other kind of open.', 'mythic', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 109, 'published', NULL, NULL),
  ('Provenance', 'provenance', 'Every claim carries where it came from. That is how trust survives being checked.', 'mythic', 'collectible', (select id from public.collection_sets where slug = 'the-given'), 110, 'published', NULL, NULL),
  ('Rainbow', 'rainbow', 'Six stripes, and the first was sewn by hand. Every flag starts as somebody''s fabric.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 111, 'published', ARRAY['pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']::text[], NULL),
  ('Progress', 'progress', 'The chevron that moves, pointing in. A flag that cannot grow is a flag that stopped meaning it.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 112, 'published', ARRAY['pride.transBlue', 'pride.transPink', 'pride.white', 'pride.brown', 'pride.black', 'pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']::text[], NULL),
  ('Trans Banner', 'trans-banner', 'Pink, blue, and white in the middle for everyone still arriving. Designed to read correctly upside down — there is no wrong way to fly it.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 113, 'published', ARRAY['pride.transBlue', 'pride.transPink', 'pride.transWhite', 'pride.transPink', 'pride.transBlue']::text[], NULL),
  ('Non-Binary', 'non-binary', 'Yellow for outside it, white for all of it, purple for both, black for none. Four answers where two were offered.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 114, 'published', ARRAY['pride.nonBinary', 'pride.white', '#9C59D1', 'void.dark']::text[], NULL),
  ('Genderfluid', 'genderfluid', 'It moves. Moving was never the same as being unsure.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 115, 'published', ARRAY['pride.genderfluid', 'pride.white', '#BE18D6', 'void.dark', '#333EBD']::text[], NULL),
  ('Agender', 'agender', 'Complete, and not a gap where something should be. Absence is an answer too.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 116, 'published', ARRAY['pride.black', 'void.light', 'pride.white', '#B7F684', 'pride.white', 'void.light', 'pride.black']::text[], NULL),
  ('Pansexual', 'pansexual', 'Three stripes with nobody left standing outside them.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 117, 'published', ARRAY['pride.pansexual', 'mystical.sun', '#21B1FF']::text[], NULL),
  ('Bisexual', 'bisexual', 'Two colors and the overlap between. The middle is not indecision — it is its own colour.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 118, 'published', ARRAY['pride.bisexual', 'pride.bisexual', '#9B4F96', '#0038A8', '#0038A8']::text[], NULL),
  ('Asexual', 'asexual', 'Grey between the black and the white, where most true things actually live.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 119, 'published', ARRAY['pride.black', '#A3A3A3', 'pride.white', 'pride.purple']::text[], NULL),
  ('Lesbian', 'lesbian', 'Sunset stripes. Orange for the ones who came first, pink for the ones who came after.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 120, 'published', ARRAY['pride.lesbian', '#EF7627', '#FF9A56', 'pride.white', '#D162A4', '#B55690', '#A30262']::text[], NULL),
  ('Intersex', 'intersex', 'A purple circle on yellow, unbroken on purpose. Whole exactly as it arrived — nothing about it was ever waiting to be corrected.', 'common', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 121, 'published', ARRAY['mystical.sun']::text[], '#7902AA'),
  ('Found Family', 'found-family', 'The people who chose you back. Not a replacement for anything — an addition nobody can take.', 'legendary', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 122, 'published', NULL, NULL),
  ('Still Here', 'still-here', 'Against a fair amount of evidence. That is the whole achievement, and it is enormous.', 'mythic', 'collectible', (select id from public.collection_sets where slug = 'inclusive-pride'), 123, 'published', NULL, NULL)
on conflict (slug) do nothing;

-- 4 · the five collections already in the base take the app's accents
update public.collection_sets set accent = coalesce(accent, 'starDust') where slug = 'star-dust';
update public.collection_sets set accent = coalesce(accent, 'hearth.gold') where slug = 'the-hearth-collection';
update public.collection_sets set palette = coalesce(palette, array['pagan.earth', 'pagan.air', 'pagan.fire', 'pagan.water']) where slug = 'the-elemental-set';
update public.collection_sets set accent = coalesce(accent, 'entity.chancellor') where slug = 'the-council-collection';
update public.collection_sets set accent = coalesce(accent, 'quantum.purple') where slug = 'quantum-weave';

-- 5 - let the base see the new columns
select public.gaia_sync('bubbles');
select public.gaia_sync('collection_sets');

-- 6 - a look
select slug, name, (select count(*) from public.bubbles b where b.collection_id = c.id)
  from public.collection_sets c order by display_order;
