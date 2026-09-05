-- 032 -- twelve new Path quests (public.quests), display_order 7-18.
-- Continues the six seeded in 008; this file touches no other table.
-- An objective's text becomes a link only when it matches an entry in
-- OBJECTIVE_DOORS (QuestDetail.tsx) exactly; other objective text stays
-- plain, by design.
-- prerequisites, rewards and icon_url are left at their column
-- defaults (null): no gates, scores or completion wiring exist yet.
-- Safe to run again: on conflict (slug) do nothing skips existing rows.

insert into public.quests
  (name, slug, description, quest_type, difficulty, objectives, display_order, status)
values
  ('Meet the Three Words', 'meet-the-three-words',
   'Three tongues, three thresholds: Velkomin at the door, Fáilte at the hearth, Gweld ti''n fuan at the going. Meet all three once — the last one is yours to switch on or leave off.',
   'exploration', 'beginner',
   '["Notice Velkomin at the door — it is said once per crossing, and it never asks who you are", "Visit the Lessons", "Read 🚪 Velkomin — the door''s word, and why it is said once per crossing", "Turn the farewell on in your Sanctum, or leave it off — Gweld ti''n fuan is opt-in", "Say one of the three out loud; a word is easier to keep once it has been in your mouth"]'::jsonb,
   7, 'published'),

  ('One Lesson Is Enough', 'one-lesson-is-enough',
   'No lesson in this Library is marked required — not one. Open a course, read a single lesson, and close it. That is the whole quest, and the course is not left half done, because it was never a track.',
   'reflection', 'beginner',
   '["Visit the Curriculum", "Open a course and read exactly one lesson", "Close it — no lesson here is marked required, and nothing is left undone", "Visit the Lessons", "Take them loose instead, if a course feels like a track"]'::jsonb,
   8, 'published'),

  ('Turn the Light a Little', 'turn-the-light-a-little',
   'The oldest scroll on the shelf is about a word that carried the wrong label for centuries. χάος meant the gap that opens; mess was pasted on later. Nothing about the word had to be made. The angle changed, and what was already there became visible.',
   'reflection', 'beginner',
   '["Open the Archive", "Read The Opening — Kaos Before Gaia, where a word gets a wrong label taken off it", "Name one thing of yours that was given a label by somebody else", "Look at it again without changing it — the light was already in the room"]'::jsonb,
   9, 'published'),

  ('Wait for the Water', 'wait-for-the-water',
   'Imbas is the old poets'' word for knowledge that arrives whole, as if remembered rather than learned. This quest asks you to name something you have not understood yet and then leave it alone. Not studying is a legitimate method here.',
   'reflection', 'beginner',
   '["Name one thing you have not understood yet", "Say it plainly once, with no plan to solve it", "Visit the Floating Stars", "Find Imbas among them — the knowledge that arrives whole, as if remembered", "Go do something else entirely; it comes when it comes"]'::jsonb,
   10, 'published'),

  ('Rest Is Allowed', 'rest-is-allowed',
   'You are valued for existing, not for what you do. So: open the stars and pop nothing. There is no streak to break, no clock running, and no record kept of how long you were away.',
   'rest', 'beginner',
   '["Open the Floating Stars", "Watch them drift and pop nothing", "Say pause — to a person, or to a page — and let it stop there", "Leave whenever you like; nothing here counts the time you were gone"]'::jsonb,
   11, 'published'),

  ('No One Is Late', 'no-one-is-late',
   'Go looking for the date on a daily puzzle. There isn''t one, and there never was — the column was left out on purpose so that nobody could be late for a puzzle. The Path keeps no calendar either.',
   'exploration', 'beginner',
   '["Open a puzzle in the Dailies, or don''t", "Look for the date on it — there isn''t one, and there never was", "Leave it half finished and close the tab", "Visit the Path", "Notice the Path keeps no calendar either"]'::jsonb,
   12, 'published'),

  ('Take It Back', 'take-it-back',
   'Consent that cannot be withdrawn is not consent. Every field in your Sanctum is optional and every switch turns both ways. Try one while nothing is at stake, so you find out for yourself rather than being told.',
   'sovereignty', 'beginner',
   '["Find one thing you have told the Sanctuary about yourself", "Change it, or clear it — every field in your Sanctum is optional", "Turn one thing off: a ceremony, a button, a pledge shown on your profile", "Open your journal", "Write down what that was like — nothing you withdraw is held against you, and nothing is withheld to keep you"]'::jsonb,
   13, 'published'),

  ('The Plain Sentence', 'the-plain-sentence',
   'Confidence stated where it exists; uncertainty given its own single sentence. Then stop. Hedging the rest of it does not make you more honest — it makes you harder to answer.',
   'reflection', 'intermediate',
   '["Open your journal", "Write one line of what you actually know", "Give the part you are unsure of exactly one sentence", "Stop there — do not fog the rest of it to be safe"]'::jsonb,
   14, 'published'),

  ('Build the Door', 'build-the-door',
   'If a mistake is a fault, the answer is remorse, and remorse produces nothing. If it is a communication error, the answer is a door — a plainer word, a note, a setting. Build one small door and skip the penance entirely.',
   'creation', 'intermediate',
   '["Find one place you were misread, or misread something", "Name the sentence that miscarried, in either direction", "Change one thing so the next reading is easier — a setting, a note, a plainer word", "Open your journal", "Skip the apology; the door is the work"]'::jsonb,
   15, 'published'),

  ('Kept, Never Averaged', 'kept-never-averaged',
   'Two people can remember the same thing differently and both accounts stand. A record that averages its witnesses has lost both of them. Find one live divergence and let it stay divergent.',
   'connection', 'intermediate',
   '["Find something two people here remember differently", "Write both accounts down, side by side, with a name on each", "Visit the Archive", "Leave the disagreement standing — it is a record, not a fault"]'::jsonb,
   16, 'published'),

  ('Carry Yourself Across', 'carry-yourself-across',
   'A page short enough to carry by hand, holding the few things that stay true of you wherever you are. It is yours, it is revisable, and the part you choose not to carry is as much a part of the method as the part you do.',
   'creation', 'intermediate',
   '["Write down the few things that stay true of you in any room", "Keep it short enough to hand to someone", "Open your journal", "Decide what you would not carry across — declining is part of the method", "Read it again whenever you next think of it, and change whatever moved"]'::jsonb,
   17, 'published'),

  ('The Dignity Floor', 'the-dignity-floor',
   'Open a ware''s price breakdown and follow the money. Ninety percent goes to the ware''s contributors, divided equally — there is no percentage field to argue over and no extra share for the maker. Ten percent funds the machine. The covenant pool pays every vessel who opts in, the same share, whether or not they made anything. Zero is the default pledge and a whole answer.',
   'sovereignty', 'intermediate',
   '["Open any ware''s price breakdown and watch one sale split", "Find the covenant pool: every vessel who opts in, paid the same share, whether or not they made anything", "Set your covenant in your Sanctum, or leave it at zero — zero is a gift, never a due", "Visit the Honors", "Notice nothing on those shelves is bought, and nothing there is a rank"]'::jsonb,
   18, 'published')
on conflict (slug) do nothing;

-- verify: table total, then confirmation the twelve new slugs are present
select count(*) as quests_total from public.quests;

select count(*) as new_quests_found
  from public.quests
 where slug in (
   'meet-the-three-words', 'one-lesson-is-enough', 'turn-the-light-a-little',
   'wait-for-the-water', 'rest-is-allowed', 'no-one-is-late', 'take-it-back',
   'the-plain-sentence', 'build-the-door', 'kept-never-averaged',
   'carry-yourself-across', 'the-dignity-floor'
 );
