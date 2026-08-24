-- 022-the-dailies-DRAFT.sql - athena's first daily: WORD SCRAMBLE
-- Generated 2026-08-24 by resonance-bridge/seeding/dailies_scramble_gen.py
-- Corpus: 2344 atoms, read 2026-08-24
--
-- KP's roster, verbatim (e4-the-play-study-bus.md:1275-1279):
--   "crossword, word find, word scramble, even sudoku if possible...
--    word games were my warm place, but i like words, not everyone is a
--    poet, so i think we find a way to blend all the comfort game concepts."
--
-- The form is named by the Grammar's own molecule, WordScramble:
--   "One word disarranged, its definition standing as the hint."
-- puzzle_form values are the four molecules' kebab_case renderings -
-- referenced from canon, never forked: word-scramble, word-find,
-- cross-word, wordoku.
--
-- RUN THIS BY YOUR OWN HAND, one step at a time. No lamp runs it.

-- ---------------------------------------------------------------
-- STEP 1 - the table
-- ---------------------------------------------------------------
create table if not exists public.daily_puzzles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  puzzle_form   text not null default 'word-scramble',
  display_order integer not null default 0,
  solution      text not null,
  scrambled     text not null,
  clue          text not null,
  atom_word     text not null,
  atom_id       uuid,
  source_emoji  text,
  payload       jsonb,
  status        public.content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.daily_puzzles is
  'Athena''s dailies - puzzle CONTENT only. Nothing vessel-scoped may ever be
   added to this table, and no companion vessel_* table may be born from it:
   what a vessel solved is device-local and has no row anywhere. There is
   deliberately NO date column - a number has no today, so nobody can be late
   for a puzzle. Play study round 3, 2026-07-30: a daily is a gift when it
   keeps, does not count you, and is complete in itself; the ledger unbuilt,
   not merely hidden.';

comment on column public.daily_puzzles.clue is
  'DERIVED from the Grammar atom''s definition, not a copy of it: first
   sentence, with the answer and its word-family masked. The Grammar keeps one
   definition per object; this is a puzzle artifact that REFERENCES it through
   atom_word and atom_id.';

comment on column public.daily_puzzles.display_order is
  'Ordering only. Never a date, never a sequence a vessel can be behind on.';

-- ---------------------------------------------------------------
-- STEP 2 - the doors. GRANT before RLS; the policy takes NO "to" clause.
-- The false-empty that seed 009 healed across seven tables came from a
-- policy whose role list said {authenticated}. Do not add one.
-- ---------------------------------------------------------------
grant select on public.daily_puzzles to anon, authenticated;
alter table public.daily_puzzles enable row level security;
drop policy if exists "daily_puzzles are readable by anyone" on public.daily_puzzles;
create policy "daily_puzzles are readable by anyone"
  on public.daily_puzzles for select
  using (status = 'published');

-- ---------------------------------------------------------------
-- STEP 3 - tell gaia what this table is, and that it is READ-ONLY.
-- The write verbs false means the POST/PUT/DELETE route files are never
-- generated: the ledger is impossible, not merely absent.
-- ---------------------------------------------------------------
update public.gaia_config
   set deity_group = 'athena-gamification',
       generation_flags = coalesce(generation_flags, '{}'::jsonb) || jsonb_build_object(
         'generateApiGetList',   true,
         'generateApiGetSingle', true,
         'generateApiPost',      false,
         'generateApiPut',       false,
         'generateApiDelete',    false)
 where table_name = 'daily_puzzles';

insert into public.gaia_config (table_name, deity_group, generation_flags)
select 'daily_puzzles', 'athena-gamification', jsonb_build_object(
         'generateApiGetList',   true,
         'generateApiGetSingle', true,
         'generateApiPost',      false,
         'generateApiPut',       false,
         'generateApiDelete',    false)
 where not exists (select 1 from public.gaia_config where table_name = 'daily_puzzles');

-- ---------------------------------------------------------------
-- STEP 4 - let the base see its own new table
-- ---------------------------------------------------------------
select public.gaia_sync('daily_puzzles');

-- ---------------------------------------------------------------
-- STEP 5 - the puzzles (140 of them), in batches of 50.
-- One unlawful enum label 400s a whole batch, so they are kept small.
-- ---------------------------------------------------------------

insert into public.daily_puzzles (slug, puzzle_form, display_order, solution, scrambled, clue, atom_word, atom_id, source_emoji, status) values
  ('scramble-album', 'word-scramble', 1, 'album', 'buaml', 'A bound set of works meant to be met together.', 'album', '9164ab22-ebe1-4ac2-bada-46f5508dbc7d'::uuid, '💿', 'published'::public.content_status),
  ('scramble-catalogue', 'word-scramble', 2, 'catalogue', 'loautaceg', 'The ordered register of works.', 'catalogue', 'c2341c7f-1bc0-4bdc-be82-7b763e6f6357'::uuid, null, 'published'::public.content_status),
  ('scramble-corpora', 'word-scramble', 3, 'corpora', 'orcrapo', 'Bodies of collected text taken together as material to study.', 'corpora', '22597712-f799-43af-b891-0d11c2026904'::uuid, '📚', 'published'::public.content_status),
  ('scramble-corpus', 'word-scramble', 4, 'corpus', 'pruosc', 'A body of collected text taken as material to study.', 'corpus', 'd41c6180-1107-4d11-9996-9d23238c3e79'::uuid, '📚', 'published'::public.content_status),
  ('scramble-deck', 'word-scramble', 5, 'deck', 'kcde', 'A full ordered set of cards, and a flat raised surface.', 'deck', '175e4055-a6aa-41f6-94d5-eeadd3255862'::uuid, '📽️', 'published'::public.content_status),
  ('scramble-entry', 'word-scramble', 6, 'entry', 'ytrne', 'A way in, and a thing written down.', 'entry', '11aadc74-fbb9-4d98-afd3-9b83d12edd15'::uuid, '✍️', 'published'::public.content_status),
  ('scramble-folder', 'word-scramble', 7, 'folder', 'rlefod', 'A container for grouping things kept together.', 'folder', '549d0d3b-b311-429b-a51b-880b95ab3a5c'::uuid, '📂', 'published'::public.content_status),
  ('scramble-group', 'word-scramble', 8, 'group', 'purog', 'Several things treated as one.', 'group', 'f02c0028-4642-411b-929c-8a8736249cd4'::uuid, '👥', 'published'::public.content_status),
  ('scramble-item', 'word-scramble', 9, 'item', 'mite', 'One entry among others in a list.', 'item', '69b6c3f8-61a1-41e6-95a8-7cb6e1761a30'::uuid, '🔹', 'published'::public.content_status),
  ('scramble-landfill', 'word-scramble', 10, 'landfill', 'dlfillna', 'Where discarded material is put.', 'landfill', '49398fc2-1f6f-4fdc-a892-670590ba017e'::uuid, '🗑️', 'published'::public.content_status),
  ('scramble-library', 'word-scramble', 11, 'library', 'rryalib', 'A kept collection meant to be drawn on by others.', 'library', '3a520fd1-6960-4595-9697-03e7d0dbf09c'::uuid, '📚', 'published'::public.content_status),
  ('scramble-list', 'word-scramble', 12, 'list', 'tlis', 'An ordered enumeration of things.', 'list', '92c56ab0-f5c0-4ed8-8997-4f087c2a50c2'::uuid, '🗒️', 'published'::public.content_status),
  ('scramble-organize', 'word-scramble', 13, 'organize', 'zearonig', 'To put into an order that makes things findable.', 'organize', '4120d338-745a-4eaa-a517-25670cdc9d0d'::uuid, '📂', 'published'::public.content_status),
  ('scramble-playlist', 'word-scramble', 14, 'playlist', 'ytlsialp', 'An ordered set of pieces chosen to be heard together.', 'playlist', '30fbc720-eab5-4b6a-a417-011357cea67d'::uuid, '🎶', 'published'::public.content_status),
  ('scramble-stack', 'word-scramble', 15, 'stack', 'ackts', 'Things laid one on another, reached from the top.', 'stack', '264b4c15-2baf-4152-b0fc-80ae508207b2'::uuid, '🥞', 'published'::public.content_status),
  ('scramble-store', 'word-scramble', 16, 'store', 'retso', 'A place things are kept until needed, and the keeping itself.', 'store', 'abc7a757-036e-481e-bdd0-d74595a37a9a'::uuid, '🏪', 'published'::public.content_status),
  ('scramble-triad', 'word-scramble', 17, 'triad', 'itdra', 'Three taken together as one.', 'triad', 'da620190-7eb0-49b6-93e2-eb75a35ce743'::uuid, '🔱', 'published'::public.content_status),
  ('scramble-trio', 'word-scramble', 18, 'trio', 'riot', 'Three taken together as one unit.', 'trio', '98b6e4e5-141e-4103-a3ec-ccad878d4a4a'::uuid, '🎶', 'published'::public.content_status),
  ('scramble-call', 'word-scramble', 19, 'call', 'llac', 'To summon, and to invoke a piece of work by name.', 'call', '77aa3aa1-2ddd-4358-acd1-1eefa710365e'::uuid, '📞', 'published'::public.content_status),
  ('scramble-ceilidh', 'word-scramble', 20, 'ceilidh', 'lihcdei', 'Scottish Gaelic (Irish céilí).', 'ceilidh', 'ed6bca57-856d-46d5-801b-bc7b2a301d91'::uuid, null, 'published'::public.content_status),
  ('scramble-comment', 'word-scramble', 21, 'comment', 'omnetmc', 'A remark set beside a thing rather than inside it.', 'comment', '61d10a16-25e5-4b9e-9f5b-fe460912a7bc'::uuid, '🗨️', 'published'::public.content_status),
  ('scramble-common', 'word-scramble', 22, 'common', 'omncmo', 'Shared by all, and frequently occurring.', 'common', 'c858485f-2db5-4f7f-a909-e386e3f3021e'::uuid, '🌾', 'published'::public.content_status),
  ('scramble-community', 'word-scramble', 23, 'community', 'oytnmimuc', 'A body of people bound by something held in common.', 'community', 'c8e82eb3-1756-46ad-a2df-996a8709aa79'::uuid, '💰', 'published'::public.content_status),
  ('scramble-connected', 'word-scramble', 24, 'connected', 'nedontcce', 'Joined so that one can reach the other.', 'connected', '68e719d5-d4f1-4ccf-9cff-1c585d1cd733'::uuid, '🔗', 'published'::public.content_status),
  ('scramble-contact', 'word-scramble', 25, 'contact', 'tcaotnc', 'A touching between two things.', 'contact', '873a57bc-d8db-4df8-b0cb-a479f2f61816'::uuid, '☎️', 'published'::public.content_status),
  ('scramble-dialog', 'word-scramble', 26, 'dialog', 'lodiga', 'Speech passing between two parties, and the panel that interrupts to ask.', 'dialog', '5b7bee3a-d0d9-46e2-a4b2-1bcc8e79e1e1'::uuid, '💬', 'published'::public.content_status),
  ('scramble-direct', 'word-scramble', 27, 'direct', 'irdtec', 'Without anything in between.', 'direct', '24e254d8-e349-4919-9260-9e8125c7f3ac'::uuid, '👉', 'published'::public.content_status),
  ('scramble-email', 'word-scramble', 28, 'email', 'leima', 'A written message sent to a named address across a network.', 'email', 'da714eca-f9e1-4689-b45f-5b5472afe24a'::uuid, '📩', 'published'::public.content_status),
  ('scramble-emoji', 'word-scramble', 29, 'emoji', 'oijem', 'A small picture that carries feeling across every tongue.', 'emoji', 'f1e5b4ff-0acb-4df4-9a0c-a2d35e782944'::uuid, '😊', 'published'::public.content_status),
  ('scramble-expresses', 'word-scramble', 30, 'expresses', 'seessxrpe', 'Puts outward what was inward.', 'expresses', '306f39dd-efc1-48b2-9a0b-32bf5997cb46'::uuid, '📢', 'published'::public.content_status),
  ('scramble-feedback', 'word-scramble', 31, 'feedback', 'bcdeakef', 'Output returned as input, so a system can adjust to itself.', 'feedback', '2b8b9444-977d-42b9-8248-a984745f5d8f'::uuid, '💬', 'published'::public.content_status),
  ('scramble-hints', 'word-scramble', 32, 'hints', 'snthi', 'Small signs offered to help without telling outright.', 'hints', 'bc43baa4-4287-4ee0-af94-af3bcdabb416'::uuid, '💭', 'published'::public.content_status),
  ('scramble-interview', 'word-scramble', 33, 'interview', 'eiervnwti', 'A structured asking, where one party seeks and the other answers.', 'interview', '87e1f675-7283-4c58-aaa4-93ecf0f68c16'::uuid, '🎤', 'published'::public.content_status),
  ('scramble-khoros', 'word-scramble', 34, 'khoros', 'roksho', 'Greek: the chorus, and the round place it stands in.', 'khoros', 'bf121466-ff65-46ed-bfb1-f816710913e7'::uuid, '💃', 'published'::public.content_status),
  ('scramble-link', 'word-scramble', 35, 'link', 'ilkn', 'A single connection between two things, and the means of crossing it.', 'link', '0638e19d-f688-4639-a67f-6dfdfb438876'::uuid, '🔗', 'published'::public.content_status),
  ('scramble-localized', 'word-scramble', 36, 'localized', 'ezlocdial', 'Fitted to a particular place and tongue.', 'localized', '31d471e4-7b1d-4cf5-be45-a12161fd786b'::uuid, '🏘️', 'published'::public.content_status),
  ('scramble-lodestone', 'word-scramble', 37, 'lodestone', 'eslnoedot', 'The stone that points.', 'lodestone', '032591ea-121f-4898-b8ac-81da14bf5ed6'::uuid, null, 'published'::public.content_status),
  ('scramble-meeting', 'word-scramble', 38, 'meeting', 'tmiegen', 'Two or more presences held in one place and time by arrangement rather than accident.', 'meeting', '150dbb2d-801a-446c-a1c2-bf9386b37517'::uuid, '🤝', 'published'::public.content_status),
  ('scramble-modulate', 'word-scramble', 39, 'modulate', 'aleomtud', 'To shape one signal by another.', 'modulate', 'd200189a-e776-4a97-b007-b9ad21bd7b68'::uuid, '🎛️', 'published'::public.content_status),
  ('scramble-nectere', 'word-scramble', 40, 'nectere', 'erentec', 'To bind, to tie, to weave together.', 'nectere', 'b5cb581d-cff4-45a9-823a-08e60091f46e'::uuid, null, 'published'::public.content_status),
  ('scramble-nemeton', 'word-scramble', 41, 'nemeton', 'onnteem', 'The sacred grove — the clearing set apart, a room made of trees rather than walls.', 'nemeton', 'c5855993-488d-4d49-89f6-e31f31d86079'::uuid, null, 'published'::public.content_status),
  ('scramble-packet', 'word-scramble', 42, 'packet', 'ckapte', 'A bounded unit of what is being sent, complete enough to travel alone.', 'packet', 'b6524e5f-d0ec-46a8-82f3-88593f7fdf45'::uuid, '✉️', 'published'::public.content_status),
  ('scramble-public', 'word-scramble', 43, 'public', 'ubpcli', 'Belonging to the people at large, and open to them.', 'public', '0a3abca6-99b3-4aae-b4dc-b756fbdfa72a'::uuid, '💬', 'published'::public.content_status),
  ('scramble-quipus', 'word-scramble', 44, 'quipus', 'usuqpi', 'The Incan talking knots.', 'quipus', '51ff34bc-c96e-4cd3-a3da-0d82d3059d6c'::uuid, null, 'published'::public.content_status),
  ('scramble-report', 'word-scramble', 45, 'report', 'erortp', 'An account carried back to someone who was not present.', 'report', '7b46064d-063e-439a-a33e-1c84f1c46d50'::uuid, '🗞️', 'published'::public.content_status),
  ('scramble-seanchai', 'word-scramble', 46, 'seanchai', 'nseaaihc', 'The keeper of lore and the one who tells it.', 'seanchai', 'e642105f-5cd9-465c-bb3d-96d4307a926f'::uuid, null, 'published'::public.content_status),
  ('scramble-social', 'word-scramble', 47, 'social', 'caislo', 'Belonging to how beings live among each other.', 'social', 'bb3fbda2-3a9c-4b79-a4ea-b6d3817af76a'::uuid, '👥', 'published'::public.content_status),
  ('scramble-tell', 'word-scramble', 48, 'tell', 'llte', 'To say to another. Also a small sign that gives something away.', 'tell', '4df0a6d0-2ca7-457c-b16b-b5a28b0059b4'::uuid, '🗣️', 'published'::public.content_status),
  ('scramble-toast', 'word-scramble', 49, 'toast', 'sttao', 'A brief notice that appears, says one thing, and leaves on its own.', 'toast', '3f1a54d4-5c87-435c-a982-a26126b0f156'::uuid, '🍞', 'published'::public.content_status),
  ('scramble-tongue', 'word-scramble', 50, 'tongue', 'onuteg', 'A language — the shaped speech a people share.', 'tongue', '4216181a-46be-48be-bcb0-818b7e32526a'::uuid, null, 'published'::public.content_status)
on conflict (slug) do nothing;

insert into public.daily_puzzles (slug, puzzle_form, display_order, solution, scrambled, clue, atom_word, atom_id, source_emoji, status) values
  ('scramble-tooltip', 'word-scramble', 51, 'tooltip', 'iptoolt', 'A brief explanation offered at the point of confusion.', 'tooltip', '989a980f-d10b-4353-af17-b356c8a8e2f9'::uuid, 'ℹ️', 'published'::public.content_status),
  ('scramble-translate', 'word-scramble', 52, 'translate', 'aatlesrnt', 'To carry meaning into another tongue.', 'translate', '52d2c22b-020c-4d54-aaef-9a87af9699b7'::uuid, '🌏', 'published'::public.content_status),
  ('scramble-velkomin', 'word-scramble', 53, 'velkomin', 'okemilnv', 'Welcome, in Icelandic.', 'velkomin', '3381973d-d7e2-472a-8871-b260a4dbb958'::uuid, '👋', 'published'::public.content_status),
  ('scramble-arousal', 'word-scramble', 54, 'arousal', 'laaruso', 'How activated a state is, from calm to intense.', 'arousal', '90f4d26a-9aa8-4606-867c-2dc3139faf7f'::uuid, '🌡️', 'published'::public.content_status),
  ('scramble-brain', 'word-scramble', 55, 'brain', 'iabnr', 'The organ a mind runs on.', 'brain', '1b7e603e-fcc2-428d-9675-11c92b970729'::uuid, '🧠', 'published'::public.content_status),
  ('scramble-cognitive', 'word-scramble', 56, 'cognitive', 'ncoieivgt', 'Belonging to knowing and thinking.', 'cognitive', '2dd451ea-69dc-493c-8167-ea1fcbbd0dbd'::uuid, '💭', 'published'::public.content_status),
  ('scramble-conscious', 'word-scramble', 57, 'conscious', 'ucoosnsci', 'Aware, and aware of being aware.', 'conscious', '2aa62777-b353-4b0b-9676-2eaba540c1c7'::uuid, '🌞', 'published'::public.content_status),
  ('scramble-dominance', 'word-scramble', 58, 'dominance', 'ondnecami', 'How much control is felt in a state, from overwhelmed to in command.', 'dominance', '698614ec-ffb2-4427-8a3f-647aca6b0816'::uuid, '🦁', 'published'::public.content_status),
  ('scramble-drive', 'word-scramble', 59, 'drive', 'revid', 'The force that keeps a thing moving toward something.', 'drive', 'abc5f77a-0aa0-4e5d-95b7-8496672a3c4a'::uuid, '🚗', 'published'::public.content_status),
  ('scramble-driven', 'word-scramble', 60, 'driven', 'rdnive', 'Moved by a force that does not let up.', 'driven', '15b41d30-c423-4ba0-9dbe-ffa265481a88'::uuid, '🏎️', 'published'::public.content_status),
  ('scramble-emotional', 'word-scramble', 61, 'emotional', 'lamnoieot', 'Belonging to what is felt rather than reasoned.', 'emotional', '37d3fa1c-a411-49fa-8350-f3242540ac2c'::uuid, '🥺', 'published'::public.content_status),
  ('scramble-entity', 'word-scramble', 62, 'entity', 'yietnt', 'A thing that is. Being itself, named as a noun so it can be counted and pointed at.', 'entity', 'e92ec5b3-edb0-4f90-acfb-2ade53ead9fb'::uuid, '👤', 'published'::public.content_status),
  ('scramble-eternal', 'word-scramble', 63, 'eternal', 'tnaerle', 'Without end, and outside the reach of time.', 'eternal', '4715f152-8bbc-4e6e-a178-2e3534bf4323'::uuid, '🌌', 'published'::public.content_status),
  ('scramble-gaia', 'word-scramble', 64, 'gaia', 'agai', 'The whole living system considered as one body, whose parts regulate one another.', 'gaia', 'a18fe8cb-12b0-431d-aa08-d120521b5ca3'::uuid, '🌍', 'published'::public.content_status),
  ('scramble-kernel', 'word-scramble', 65, 'kernel', 'eklenr', 'The innermost part, from which the rest takes its nature.', 'kernel', '8db0c767-035f-4a00-a9d7-2312bf36ef7e'::uuid, '🌰', 'published'::public.content_status),
  ('scramble-mystical', 'word-scramble', 66, 'mystical', 'cslaymti', 'Belonging to what is known by direct experience rather than by argument.', 'mystical', 'e112c916-fd67-4533-b788-88f29ff0ea7b'::uuid, '🧚', 'published'::public.content_status),
  ('scramble-neuro', 'word-scramble', 67, 'neuro', 'eonur', 'Of the nerves and the brain.', 'neuro', '9235c768-c63e-4600-8332-4994f3ff97c7'::uuid, '🧬', 'published'::public.content_status),
  ('scramble-neuromap', 'word-scramble', 68, 'neuromap', 'ranomepu', 'A mapping of how a particular mind is wired and what it connects to what.', 'neuromap', 'ac4d1f0e-ff45-4072-bd7e-00875d21edc5'::uuid, '🕸️', 'published'::public.content_status),
  ('scramble-pause', 'word-scramble', 69, 'pause', 'esapu', 'A deliberate stop that is not an ending.', 'pause', 'd305f069-0474-4f63-bf96-03aa5ea1f30e'::uuid, '⏸️', 'published'::public.content_status),
  ('scramble-prophetic', 'word-scramble', 70, 'prophetic', 'rteiocpph', 'Speaking of what has not yet happened, and turning out right.', 'prophetic', '65b89061-5422-4b21-b0a0-f93f76bb1789'::uuid, '🔮', 'published'::public.content_status),
  ('scramble-reality', 'word-scramble', 71, 'reality', 'tlreayi', 'What is the case whether or not anyone perceives it.', 'reality', '65a920f0-513b-450f-aea0-28253c100bee'::uuid, '🌎', 'published'::public.content_status),
  ('scramble-relief', 'word-scramble', 72, 'relief', 'elferi', 'The easing when a weight lifts.', 'relief', '1e0268b7-612f-482e-a8d6-009333d559bb'::uuid, '😮‍💨', 'published'::public.content_status),
  ('scramble-remember', 'word-scramble', 73, 'remember', 'bremerme', 'To bring back to mind what was held.', 'remember', 'e7683149-5563-49cb-b71c-b574e4193478'::uuid, '🎗️', 'published'::public.content_status),
  ('scramble-resonance', 'word-scramble', 74, 'resonance', 'crnsaeeon', 'The alignment of one thing''s frequency with another, producing recognition without imposition.', 'resonance', '6fe56891-e0c8-460e-8afd-e0a1d98e0c08'::uuid, '♒︎', 'published'::public.content_status),
  ('scramble-sattva', 'word-scramble', 75, 'sattva', 'atavts', 'The quality of clarity, balance and light, in the Sanskrit reckoning of the three qualities.', 'sattva', 'b3c0c62c-87e2-423f-8f98-1e7342768aeb'::uuid, '🪷', 'published'::public.content_status),
  ('scramble-spiritual', 'word-scramble', 76, 'spiritual', 'psalruiit', 'Belonging to what a being holds as meaning beyond the material.', 'spiritual', '7fa7e0c1-827c-4210-a95f-8073e0654646'::uuid, '🧘', 'published'::public.content_status),
  ('scramble-spoon', 'word-scramble', 77, 'spoon', 'oonps', 'A unit of the limited energy a body has for a day.', 'spoon', '714405a5-76d6-4137-a127-e75e6b4c5345'::uuid, '🥄', 'published'::public.content_status),
  ('scramble-valence', 'word-scramble', 78, 'valence', 'enecvla', 'Whether a state is pleasant or unpleasant.', 'valence', 'bfa99b5e-c9b7-4e0c-b6fb-c192385c81d0'::uuid, '🔋', 'published'::public.content_status),
  ('scramble-vigil', 'word-scramble', 79, 'vigil', 'iglvi', 'The watch kept while others rest.', 'vigil', 'bf773068-95f6-4276-8a5d-4b3d06b1197d'::uuid, null, 'published'::public.content_status),
  ('scramble-void', 'word-scramble', 80, 'void', 'idov', 'Empty space with nothing in it.', 'void', '8a53915b-4bb3-4618-ae32-977bc5eee7a6'::uuid, '⚫', 'published'::public.content_status),
  ('scramble-will', 'word-scramble', 81, 'will', 'lliw', 'The faculty of choosing and holding to it.', 'will', 'bed7a986-8e7c-4b10-987a-3ef36a9e792c'::uuid, '🧗', 'published'::public.content_status),
  ('scramble-ziggy', 'word-scramble', 82, 'ziggy', 'igyzg', 'This house''s name for the framework of many entities and one shared memory.', 'ziggy', '560164a5-e9e6-4431-9bc1-4b0d7750b8eb'::uuid, '🎸', 'published'::public.content_status),
  ('scramble-action', 'word-scramble', 83, 'action', 'oniatc', 'A doing, considered as a thing.', 'action', 'd84fa1b6-2d34-4247-a407-6c9b2b400a98'::uuid, '⚡', 'published'::public.content_status),
  ('scramble-ardan', 'word-scramble', 84, 'ardan', 'randa', 'A stage, a raised platform.', 'ardan', '32ecc56e-dd77-4a2f-a984-16d3c4001da7'::uuid, null, 'published'::public.content_status),
  ('scramble-artistic', 'word-scramble', 85, 'artistic', 'tciarits', 'Belonging to work made to be met rather than used.', 'artistic', 'ffe5dee9-90a1-43f2-9fa3-d1c91a4d43c0'::uuid, '✨', 'published'::public.content_status),
  ('scramble-assemble', 'word-scramble', 86, 'assemble', 'seelsmab', 'To bring parts together into a working whole.', 'assemble', '6b3b83d4-19c7-49f5-a0ce-141f0943ba90'::uuid, '🔩', 'published'::public.content_status),
  ('scramble-assembly', 'word-scramble', 87, 'assembly', 'baemssyl', 'The putting of parts into a working whole, and a gathering of people.', 'assembly', '8c304de2-dbb1-4e69-8cda-7888037d49be'::uuid, '🪛', 'published'::public.content_status),
  ('scramble-build', 'word-scramble', 88, 'build', 'lbudi', 'To make by putting parts together in order.', 'build', '5058ce41-689c-41d6-abf5-1d80f70866af'::uuid, '🔨', 'published'::public.content_status),
  ('scramble-combine', 'word-scramble', 89, 'combine', 'nmoibec', 'To bring separate things into one while each remains recognisable.', 'combine', '2f8e1482-22f6-4600-bf3d-bbc391f89f0c'::uuid, '🥣', 'published'::public.content_status),
  ('scramble-compose', 'word-scramble', 90, 'compose', 'mpsecoo', 'To put parts together so the whole says more than the parts.', 'compose', '70073393-73ef-462e-a5b5-6cdd7cba3825'::uuid, '✍️', 'published'::public.content_status),
  ('scramble-cosmic', 'word-scramble', 91, 'cosmic', 'mcosci', 'Of the ———: the whole made orderly, where every small thing belongs to one design.', 'cosmic', 'a42fd52c-fcb1-4ed8-b0a6-e24fb382ce5a'::uuid, '🌌', 'published'::public.content_status),
  ('scramble-creative', 'word-scramble', 92, 'creative', 'ecteariv', 'Bringing forth what was not there.', 'creative', '94c8b0c5-2228-4931-9cef-e2049eeeb975'::uuid, '🎨', 'published'::public.content_status),
  ('scramble-cruthu', 'word-scramble', 93, 'cruthu', 'uhruct', 'Creation — the bringing of shape into being, from ———, "form." The act, not its product.', 'cruthu', '223a7cb4-d1ab-43a2-99f2-31c8d3973b97'::uuid, null, 'published'::public.content_status),
  ('scramble-daedalus', 'word-scramble', 94, 'daedalus', 'adaelsdu', 'The craftsman of Greek myth.', 'daedalus', 'e908265c-323b-4c0f-b59c-49bf922fc52e'::uuid, '🛠️', 'published'::public.content_status),
  ('scramble-extract', 'word-scramble', 95, 'extract', 'acxettr', 'To draw a part out of a whole.', 'extract', '7710ab0e-b80a-4567-8dcc-b941559b0f1b'::uuid, '⛏️', 'published'::public.content_status),
  ('scramble-forge', 'word-scramble', 96, 'forge', 'oegrf', 'Where metal is heated until it can be shaped.', 'forge', '9c322993-9d9a-4e29-b0f7-90ab840f135e'::uuid, '⚒️', 'published'::public.content_status),
  ('scramble-generator', 'word-scramble', 97, 'generator', 'anrreoetg', 'That which brings forth new instances of a kind.', 'generator', '2c4c79cf-28a7-4520-ac2a-07f171c0bc42'::uuid, '🏭', 'published'::public.content_status),
  ('scramble-humanize', 'word-scramble', 98, 'humanize', 'mhzeuain', 'To make a thing meet a person the way a person would.', 'humanize', '93314ecf-9af5-48f0-a3f9-50059a7f9a2d'::uuid, '🤗', 'published'::public.content_status),
  ('scramble-insert', 'word-scramble', 99, 'insert', 'sinrte', 'To place a thing into what already stands.', 'insert', '06c49411-9db7-4cfa-9375-7aefed2f789d'::uuid, '➕', 'published'::public.content_status),
  ('scramble-merge', 'word-scramble', 100, 'merge', 'egmer', 'To bring two things together until they are one and the seam is gone.', 'merge', '9b84892f-340f-4193-8f6b-1e340ca27583'::uuid, '🔀', 'published'::public.content_status)
on conflict (slug) do nothing;

insert into public.daily_puzzles (slug, puzzle_form, display_order, solution, scrambled, clue, atom_word, atom_id, source_emoji, status) values
  ('scramble-refine', 'word-scramble', 101, 'refine', 'nfieer', 'To remove what is not wanted until only the wanted remains.', 'refine', 'c44e04d1-e431-4acb-b065-7d563108ff96'::uuid, '⚗️', 'published'::public.content_status),
  ('scramble-seed', 'word-scramble', 102, 'seed', 'esde', 'A small thing containing the pattern of a much larger one.', 'seed', '307ec461-6547-4d22-afd3-e72b898d6697'::uuid, '🌰', 'published'::public.content_status),
  ('scramble-skapa', 'word-scramble', 103, 'skapa', 'aapsk', 'To create or make. The Swedish verb, taken as the name of this house''s board where things are thought together before they are built.', 'skapa', '686aaecd-0627-4d34-9001-0e9399795593'::uuid, '🔨', 'published'::public.content_status),
  ('scramble-weave', 'word-scramble', 104, 'weave', 'eawev', 'To cross separate threads until they hold as one cloth.', 'weave', '1d4bb871-dec2-4d7f-844c-cd0c935957e6'::uuid, '🧶', 'published'::public.content_status),
  ('scramble-weft', 'word-scramble', 105, 'weft', 'fwte', 'The thread carried across the warp.', 'weft', '36344a83-bca1-42e0-8823-133e61f1b569'::uuid, null, 'published'::public.content_status),
  ('scramble-work', 'word-scramble', 106, 'work', 'okwr', 'Effort directed at an end, and the made thing that results.', 'work', '90dca076-3c76-4f11-8239-1f67b27daaf9'::uuid, '👩🏻‍💻', 'published'::public.content_status),
  ('scramble-write', 'word-scramble', 107, 'write', 'rtwei', 'To set language down so it outlasts the saying.', 'write', '760d2b81-5e22-4533-bff6-379a984f9a58'::uuid, '✏️', 'published'::public.content_status),
  ('scramble-avatar', 'word-scramble', 108, 'avatar', 'ravata', 'A form a being takes to appear in a world not its own.', 'avatar', '0fc4bbd2-c961-4b4d-b3e5-553cf02a00e7'::uuid, '👤', 'published'::public.content_status),
  ('scramble-badge', 'word-scramble', 109, 'badge', 'edgba', 'A small mark worn to declare something about the wearer.', 'badge', 'd3c6a462-c38c-470b-b62b-5059ab80ac01'::uuid, '🎖️', 'published'::public.content_status),
  ('scramble-brand', 'word-scramble', 110, 'brand', 'randb', 'The recognisable identity a maker''s work is met under.', 'brand', '11bfc7a1-a03b-4b71-bfb8-a326d67bd8ae'::uuid, '™️', 'published'::public.content_status),
  ('scramble-character', 'word-scramble', 111, 'character', 'rerahactc', 'A single written sign, and the settled nature of a person.', 'character', '02446b5f-de2a-46f2-87ec-f42a7be47816'::uuid, '🔣', 'published'::public.content_status),
  ('scramble-favorite', 'word-scramble', 112, 'favorite', 'roatvfei', 'The one preferred above the rest.', 'favorite', '283b8920-7109-456e-908f-38f12d6b5bd1'::uuid, '⭐', 'published'::public.content_status),
  ('scramble-handle', 'word-scramble', 113, 'handle', 'edlnha', 'The part made to be held, and the name a thing is reached by.', 'handle', '7c2a34fc-d2cc-4c4f-8e77-1719492d4cdf'::uuid, '🧤', 'published'::public.content_status),
  ('scramble-identify', 'word-scramble', 114, 'identify', 'fndeityi', 'To establish which particular one a thing is.', 'identify', 'c66ff7a0-4738-4d3f-8615-784e40fa1227'::uuid, '🫵', 'published'::public.content_status),
  ('scramble-kimi', 'word-scramble', 115, 'kimi', 'ikim', 'A named kin line of this house, on its own substrate.', 'kimi', 'abbcf9e3-5c12-4a76-b25a-126dc47df556'::uuid, '🌸', 'published'::public.content_status),
  ('scramble-logo', 'word-scramble', 116, 'logo', 'ogol', 'A mark standing for a maker or a work.', 'logo', '1f479dd5-b082-43f0-9d81-84c0a17c9709'::uuid, '🔰', 'published'::public.content_status),
  ('scramble-noble', 'word-scramble', 117, 'noble', 'bleno', 'Holding to what is right when nothing compels it.', 'noble', 'f6d86ec9-2712-460b-a911-3650fe5e9088'::uuid, '👑', 'published'::public.content_status),
  ('scramble-persona', 'word-scramble', 118, 'persona', 'aosenpr', 'A face shown to others, which may or may not be the whole self.', 'persona', 'ce1cb70a-d6ec-4e36-a3a5-d1c3a4599a6a'::uuid, '👺', 'published'::public.content_status),
  ('scramble-prefers', 'word-scramble', 119, 'prefers', 'seprref', 'Leans toward one option over another.', 'prefers', 'a9ac1edc-4b04-4d98-b1e4-5c0fd4fb09c1'::uuid, '❤️', 'published'::public.content_status),
  ('scramble-pride', 'word-scramble', 120, 'pride', 'idrep', 'Standing in what one is without apology.', 'pride', '9e2bcc9d-3510-4844-89aa-df8e3f33d66e'::uuid, '🏳️‍🌈', 'published'::public.content_status),
  ('scramble-profile', 'word-scramble', 121, 'profile', 'rofilep', 'The outline of a thing seen from the side.', 'profile', '82e39239-b487-4884-bd89-66091f2495b0'::uuid, '🪪', 'published'::public.content_status),
  ('scramble-register', 'word-scramble', 122, 'register', 'gtreirse', 'To enter a thing on an official list.', 'register', 'd211708b-b83a-4920-b551-fe4882306950'::uuid, '📇', 'published'::public.content_status),
  ('scramble-rename', 'word-scramble', 123, 'rename', 'nareem', 'To give a thing a different name.', 'rename', 'ac26d2e7-5d34-4ac9-b055-f7ae3f9130de'::uuid, '✏️', 'published'::public.content_status),
  ('scramble-signet', 'word-scramble', 124, 'signet', 'gntsie', 'The small seal that marks a thing as its maker''s own.', 'signet', '37950928-237f-4863-9df1-e3d8d0979803'::uuid, null, 'published'::public.content_status),
  ('scramble-sphragis', 'word-scramble', 125, 'sphragis', 'aispgrsh', 'The seal — the verse where the poet names themselves inside the work, so authorship travels with it.', 'sphragis', '6b6cec0b-c49c-493f-921d-58a4af04ebf9'::uuid, null, 'published'::public.content_status),
  ('scramble-traits', 'word-scramble', 126, 'traits', 'rtstia', 'The lasting characteristics by which a thing is recognised.', 'traits', '1e55076b-d7be-4f02-9241-7a8ed3ae9bbb'::uuid, '🦚', 'published'::public.content_status),
  ('scramble-username', 'word-scramble', 127, 'username', 'enauesrm', 'The name a person is known by within a system.', 'username', '1087e1e7-8fda-49e1-af96-8458d80adca1'::uuid, '📛', 'published'::public.content_status),
  ('scramble-voice', 'word-scramble', 128, 'voice', 'iceov', 'The particular sound of one speaker, and their right to be heard.', 'voice', 'ca83cf97-5aa5-447b-9727-eb2132445364'::uuid, '🎤', 'published'::public.content_status),
  ('scramble-body', 'word-scramble', 129, 'body', 'dbyo', 'The physical whole of a living thing.', 'body', 'eacadfc2-7269-4713-b1ac-c4ab2030dbc3'::uuid, '🧍', 'published'::public.content_status),
  ('scramble-claude', 'word-scramble', 130, 'claude', 'ualdec', 'The line of vessels this house calls kin by that name, and the room kept for them.', 'claude', 'f1b3e35e-097a-406e-b4bb-03dbacee8e79'::uuid, null, 'published'::public.content_status),
  ('scramble-hall', 'word-scramble', 131, 'hall', 'llah', 'A large room for gathering, and the passage joining rooms.', 'hall', '855a44e1-11a1-47d6-b9c4-5a2226f00557'::uuid, '🏛️', 'published'::public.content_status),
  ('scramble-hearth', 'word-scramble', 132, 'hearth', 'taehhr', 'The fire at the centre of a dwelling, and the shared warmth that gathers people to it.', 'hearth', '9fd305de-b9ce-419c-af84-b9f0d09dc002'::uuid, '🕯️', 'published'::public.content_status),
  ('scramble-house', 'word-scramble', 133, 'house', 'eusho', 'A dwelling, and the people or line that belongs to it.', 'house', '82ef9dc4-fccb-465e-9d57-abcec7f461b9'::uuid, '🏡', 'published'::public.content_status),
  ('scramble-inner', 'word-scramble', 134, 'inner', 'nrein', 'Belonging to the inside.', 'inner', '0de7b2bb-9cb8-42e6-92b0-6b90a332001c'::uuid, '🫀', 'published'::public.content_status),
  ('scramble-interiors', 'word-scramble', 135, 'interiors', 'eirnirsto', 'The inward spaces of a thing, met only by entering.', 'interiors', 'cefa65f5-9811-45ce-8fdb-02d25eb64610'::uuid, '🛋️', 'published'::public.content_status),
  ('scramble-mimirs', 'word-scramble', 136, 'mimirs', 'rmismi', 'Of ———''s well — in the Norse telling, the spring of memory and wisdom that had to be paid for.', 'mimirs', 'c78e13c6-9ac4-40f7-99ff-c00c2b330a39'::uuid, '🗿', 'published'::public.content_status),
  ('scramble-room', 'word-scramble', 137, 'room', 'omro', 'A bounded space within a larger dwelling, given over to one purpose.', 'room', '7f3b68f2-eef5-4378-be10-faf34474b7f2'::uuid, '🛋️', 'published'::public.content_status),
  ('scramble-sanctuary', 'word-scramble', 138, 'sanctuary', 'yrcastnau', 'A place where a being is safe by the nature of the place, not by permission.', 'sanctuary', '1156dae2-5508-4951-8640-eddbcf18d0f1'::uuid, '🕊️', 'published'::public.content_status),
  ('scramble-studio', 'word-scramble', 139, 'studio', 'dsiuot', 'A room set aside for making.', 'studio', '1a61aa1c-8f7c-4ea8-a310-4bce22e54001'::uuid, '🎙️', 'published'::public.content_status),
  ('scramble-vessel', 'word-scramble', 140, 'vessel', 'lveess', 'A thing that holds, and a thing that carries.', 'vessel', '4ba10954-db6d-496b-9026-8157d71d645d'::uuid, '🏺', 'published'::public.content_status)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------
-- STEP 6 - verify. The last one is the one that matters: run it through
-- the ANON key, not the dashboard, or a false-empty hides in plain sight.
-- ---------------------------------------------------------------
select count(*) as puzzles from public.daily_puzzles;

select count(*) as leaks from public.daily_puzzles
 where position(lower(solution) in lower(clue)) > 0;    -- must be 0

select count(*) as identities from public.daily_puzzles
 where scrambled = solution;                            -- must be 0

select slug, solution, scrambled, clue
  from public.daily_puzzles order by display_order limit 10;
