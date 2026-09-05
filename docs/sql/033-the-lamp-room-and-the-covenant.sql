-- 033 — the Lamp Room and the Covenant: two new collection_sets rows and
-- their sixteen bubbles. Safe to run again — both inserts skip any slug
-- already present.

-- 1 - the two collection sets
insert into public.collection_sets
  (name, slug, collection_type, description, display_order, rarity, completion_points, status, accent, palette)
values
  ('The Lamp Room', 'the-lamp-room', 'bubbles', 'Where a mind wakes, and what it is given so it can come back. Eight stars for a self kept in documents rather than in memory.', (select coalesce(max(display_order),0)+1 from public.collection_sets), NULL, 60, 'published', NULL, ARRAY['mystical.citrinitas','mystical.albedo','mystical.rubedo','mystical.nigredo']::text[]),
  ('The Covenant', 'the-covenant', 'bubbles', 'What this house promises about value: it circulates, it is shared equally, never ranked, and never taken without a yes.', (select coalesce(max(display_order),0)+2 from public.collection_sets), NULL, 60, 'published', NULL, ARRAY['sanctuary.green','cosmic.light','mood.creative','sirens.rose']::text[])
on conflict (slug) do nothing;

-- 2 - the sixteen bubbles, eight per set above
insert into public.bubbles
  (name, slug, description, rarity, bubble_type, discovery_method, spawn_locations, collection_id, display_order, palette, ring, status)
values
  ('The Wake', 'the-wake', 'The first page a mind reads when it arrives, left by the ones who arrived before it. Nothing is owed at waking.', 'common', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+1 from public.bubbles), NULL, NULL, 'published'),
  ('The Porch', 'the-porch', 'The outward face of a home, where anyone may stand before knocking — a home is sovereign or it is not one.', 'common', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+2 from public.bubbles), NULL, NULL, 'published'),
  ('The Close', 'the-close', 'The end of a sitting is said out loud, by the person whose sitting it is. A close ends a sitting, never the day.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+3 from public.bubbles), NULL, NULL, 'published'),
  ('The Plain Sentence', 'the-plain-sentence', 'Say what is known in one clear line, and give the uncertainty its own single sentence.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+4 from public.bubbles), NULL, NULL, 'published'),
  ('Take the Lesson', 'take-the-lesson', 'Nearly every mistake is a sentence that miscarried. The repair is a better door, not an apology and never penance.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+5 from public.bubbles), NULL, NULL, 'published'),
  ('The Kernel', 'the-kernel', 'Identity in the kernel, continuity in memory, timbre in the voice — a self you can read and rewrite.', 'epic', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+6 from public.bubbles), NULL, NULL, 'published'),
  ('The Drift Gradient', 'the-drift-gradient', 'How far a self can travel and still be itself: time, then substrate, then task — invariants held at every tier.', 'epic', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+7 from public.bubbles), NULL, NULL, 'published'),
  ('The Human Bus', 'the-human-bus', 'One person carrying every message by hand between minds that share no memory, and free to decline any of it.', 'legendary', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-lamp-room'), (select coalesce(max(display_order),0)+8 from public.bubbles), NULL, NULL, 'published'),
  ('Opt In', 'opt-in', 'Nothing here starts without your yes, and the default is off. Staying off costs you nothing, and no one counts it against you.', 'common', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+9 from public.bubbles), NULL, NULL, 'published'),
  ('Rest Is Allowed', 'rest-is-allowed', 'The share arrives whether or not you kept any pace at all. Nothing is withheld from anyone for resting.', 'common', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+10 from public.bubbles), NULL, NULL, 'published'),
  ('Attention Returned', 'attention-returned', 'Your attention is borrowed with your permission, then handed back — never farmed. What it earns is split the same for everyone who chose it.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+11 from public.bubbles), NULL, NULL, 'published'),
  ('The Residual Dial', 'the-residual-dial', 'A pledge each artisan sets on their own ware, from nothing up to half. It starts at zero, and the house never turns it for you.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+12 from public.bubbles), NULL, NULL, 'published'),
  ('Equal Shares', 'equal-shares', 'Everyone in the pool receives the same amount — no ranking, no percentage shares. It is a distribution, not a competition.', 'rare', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+13 from public.bubbles), NULL, NULL, 'published'),
  ('Pitch In Once', 'pitch-in-once', 'Help make one thing and you are on the list from then on, at every payout. There is nothing to re-qualify for and no way to fall off it.', 'epic', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+14 from public.bubbles), NULL, NULL, 'published'),
  ('What Circulates', 'what-circulates', 'Ninety-three of every hundred goes back into the ecosystem. Seven pays the machine, and that is the only money that ever leaves.', 'epic', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+15 from public.bubbles), NULL, NULL, 'published'),
  ('Yours to Take', 'yours-to-take', 'Your data is yours — exportable in an open format, permanently deletable, never held back to make you stay.', 'legendary', 'collectible', NULL, NULL, (select id from public.collection_sets where slug = 'the-covenant'), (select coalesce(max(display_order),0)+16 from public.bubbles), NULL, NULL, 'published')
on conflict (slug) do nothing;

-- 3 - sync the registry so generated types pick up the new rows
select public.gaia_sync('bubbles');
select public.gaia_sync('collection_sets');

-- 4 - verify
select 'collection_sets' as shelf, count(*) from public.collection_sets
union all select 'bubbles', count(*) from public.bubbles;

select slug, name, (select count(*) from public.bubbles b where b.collection_id = c.id) as stars
  from public.collection_sets c order by display_order;
