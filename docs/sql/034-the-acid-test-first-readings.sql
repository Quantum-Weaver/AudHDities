-- ============================================================================
-- 034 — THE ACID TEST'S FIRST READINGS (DRAFT — NOT APPLIED)
-- ============================================================================
-- public.assessment_readings does not exist in the base today (confirmed by
-- grep: zero hits for "assessment_readings" anywhere in C:/_superposition/
-- AudHDities). This file creates it, wards it, and seeds the twenty-one
-- category x band readings for THE ACID TEST (/questionaire): one row per
-- category — Executive Flow, Time & Structure, Cognitive Style, Social
-- Architecture, Sensory Experience, Connection & Purpose, Emotional
-- Landscape — crossed with band low/mid/high (7 x 3 = 21). The wording is
-- the concept hand's revised pass, copied here only: no row added, dropped,
-- or reworded.
--
-- Safe to run more than once: the table is CREATE TABLE IF NOT EXISTS, the
-- policy is dropped and recreated, and every insert ends ON CONFLICT
-- (category, band) DO NOTHING.
--
-- TABLE SHAPE is exactly as specified for this draft — id, category, band,
-- summary_text, recommendations, display_order, status, created_at, and a
-- UNIQUE (category, band) — narrower than an earlier proposal that also
-- carried slug and band_low/band_high. See the returned flags for what
-- that narrower shape leaves unresolved.
--
-- THE RITUAL (resonance-grammar/docs/sql/000-NEW-TABLE-RITUAL.md): a table
-- with RLS on and no policy is a locked door with no key — the anon key
-- reads zero rows with no error. All three pieces are below, the policy
-- narrowed to status = 'published' rows only.
--
-- ALL 21 ROWS SEED status = 'draft' ON PURPOSE. Nothing here is meant to be
-- publicly visible yet: submit_acid_test does not copy a reading into
-- assessment_results, no page consumes recommendations, and no consent
-- ward exists over what a person would be shown. A chamber may not operate
-- unwarded. Flipping rows to 'published' is a later, separate data change,
-- once that ward and a copy-at-submit rule exist.
--
-- FLAG, CARRIED FROM THE TASK ITSELF: submit_acid_test's function body
-- lives only in the base, not in this tree, and must be read at the
-- dashboard before anything is wired to this table. This file only creates
-- and seeds public.assessment_readings — it does not touch submit_acid_test,
-- get_acid_test_questions, or assessment_results, and adds no trigger.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — the table (does not exist today)
-- ----------------------------------------------------------------------------

create table if not exists public.assessment_readings (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  band text not null,
  summary_text text not null,
  recommendations jsonb,
  display_order smallint,
  status text default 'draft',
  created_at timestamptz default now(),
  unique (category, band)
);

-- ----------------------------------------------------------------------------
-- STEP 2 — the ritual's three things, narrowed to published rows only
-- ----------------------------------------------------------------------------

alter table public.assessment_readings enable row level security;

grant select on public.assessment_readings to anon, authenticated;

drop policy if exists "Public read assessment_readings" on public.assessment_readings;
create policy "Public read assessment_readings"
  on public.assessment_readings
  for select
  using (status = 'published');

-- ----------------------------------------------------------------------------
-- STEP 3 — the twenty-one readings (7 categories x low/mid/high)
-- ----------------------------------------------------------------------------

insert into public.assessment_readings
  (category, band, summary_text, recommendations, display_order, status)
values

-- EXECUTIVE FLOW
  ('Executive Flow', 'low',
   'On these six questions you marked few of the traits in the direction the test tracks. Starting, switching, sequencing, and finishing are mostly not where your day gets hard. That is a description of your answers and not a rank; a low band here is not a healthier result than a high one. Two different lives produce it. Execution may genuinely cost you little, or you may have built scaffolding around it so early that the cost is paid before you notice paying it. This reading knows only what you told it today, and it knows nothing about a diagnosis. A question worth keeping: when something has stalled, what actually got it moving again?',
   '["Notice which supports you run without thinking about them, since those are the ones easiest to lose without noticing.","If something did stall recently, the more useful question is what was different that day, not what is wrong with you.","Nothing follows from a low band. It asks nothing of you.","If you want a second look another day, answer again; the answers you gave today stay as they are, and a new reading stands beside the old one."]'::jsonb,
   1, 'draft'),
  ('Executive Flow', 'mid',
   'Roughly half of these landed in the direction the test tracks, and the honest reading is that it depends. Some days a task starts clean and finishes; other days the same task will not begin, and nothing about the task changed. Both descriptions are true, and this reading keeps them side by side rather than averaging them into one milder claim. Mid is not the middle rung of a ladder. It is a category where your own answers disagreed with each other, which is a real finding and not a failure to answer well. What the test cannot tell you is which conditions produce which day. That pattern is not in a score; it is in what your starting days had in common.',
   '["Keep a plain note of what a starting day had in it, for as long as it stays interesting: sleep, food, noise, who was around.","When a task will not begin, treating it as a mismatch between you and the task usually works better than treating it as a fault in you.","Scaffolding built on an easy day is often what carries a hard one.","You do not have to reconcile the two halves. Both were true when you answered."]'::jsonb,
   2, 'draft'),
  ('Executive Flow', 'high',
   'You marked most of these six in the direction the test tracks. Starting is expensive, switching costs more than it looks like it should, and the distance between intending and beginning can be wide. That is a plain description of what you reported. It is not a severity, not a diagnosis, and not a worse result than a low band. Naming it has one practical use: a cost that is named can be designed around, while a cost that stays invisible gets paid as guilt instead. The test cannot tell you why the cost is there, only that you reported it consistently across the category. What would change first if starting were free?',
   '["Put the sequence outside your head: a written order for a task you already know how to do removes the part that actually costs.","A started task left visibly open is often cheaper to return to than one that was tidied away.","If something has not begun in weeks, it may be asking to be smaller, later, or dropped, and dropping is a real option.","Take what is useful and leave the rest. None of this is a plan you owe anyone."]'::jsonb,
   3, 'draft'),

-- TIME & STRUCTURE
  ('Time & Structure', 'low',
   'Few of these landed in the direction the test tracks. Clock time, deadlines, and routine mostly behave for you, or at least they are not where your day frays. Read that as a description of answers rather than a rank. Time being reliable for you does not make this result healthier than one where it is not. It is worth knowing that the questions cannot see the difference between a natural fit and a hard-won system: a calendar you never think about is doing work that would be very visible if it vanished. This reading holds the answers you gave today, not your history. If a structure is carrying this for you, it is worth being able to name it.',
   '["Name the one structure you would miss most if it disappeared: a calendar, an alarm, another person''s rhythm.","If you plan things for other people, a low band here is not a reason to assume they experience time the way you do.","Dates in this house are bookmarks rather than pressure. Nothing here expires, and there is no schedule you are behind on.","You can stop at this reading. Nothing further is asked."]'::jsonb,
   4, 'draft'),
  ('Time & Structure', 'mid',
   'About half of these landed in the direction the test tracks. Time is dependable in some parts of your life and not in others, and both halves are kept here rather than blended into one moderate sentence. The split often follows the setting rather than the person. An appointment someone else is waiting at behaves differently from an evening with nothing in it, and an hour vanishes inside one task and drags inside another. The test cannot say which of these is yours; it recorded only that your answers pulled two ways. The useful question is not how to be consistent. It is which parts of your life already hold time well, and what those parts have in common.',
   '["Notice where time behaves and where it does not, and describe the setting rather than yourself.","An external marker, like someone expecting you or a timer left running, often does the work willpower is being asked to do.","A gap costs nothing here. Nothing counts consecutive days, and nothing decays while you are away.","If you want a sharper picture, answer again after a different kind of week and keep both readings."]'::jsonb,
   5, 'draft'),
  ('Time & Structure', 'high',
   'You marked most of these six in the direction the test tracks. Time passes unevenly for you, an hour is hard to feel from the inside, and structure that holds for other people slides. That is a description of your answers and nothing more. It is not a severity scale, it is not a diagnosis, and a high band here is not a worse outcome than a low one. What it does say plainly is that clock time works for you as an external instrument rather than an internal sense. That is a design fact, and externalising time costs less than fighting it. The test cannot tell you whether this has always been true or arrived with a particular season.',
   '["Put time where you can see it: a visible clock, an alarm set before the thing rather than at it, a timer you can watch run down.","Anchor an appointment to something you already do rather than to a number on the clock.","If lateness has cost you socially, saying plainly how you experience time usually costs less than apologising repeatedly.","None of this is a rule. Keep what fits and leave the rest."]'::jsonb,
   6, 'draft'),

-- COGNITIVE STYLE
  ('Cognitive Style', 'low',
   'Few of these landed in the direction the test tracks. The questions about tangents, pattern-chasing, depth, and how thought moves did not mostly describe you. That is a description of answers, not a rank, and thinking in a more linear or single-threaded way is neither a lesser nor a better result. This category is the hardest one to self-report accurately, for a plain reason: your own thinking is the single instrument you cannot step outside of, and normal from the inside is just whatever yours does. The test does not correct for that. If this band surprises you, that is information too. What did the questions seem to be asking about that you have never had a word for?',
   '["Ask someone who works alongside you what they notice about how you think; the outside view is the part self-report cannot reach.","If a question felt unanswerable rather than untrue, the question was probably built badly, and that is ours to fix.","There is nothing to do with this reading unless you want to.","You can answer again another day. The earlier reading is kept, not overwritten."]'::jsonb,
   7, 'draft'),
  ('Cognitive Style', 'mid',
   'About half of these landed in the direction the test tracks. Your thinking runs one way under some conditions and another way under others, and that split is kept here rather than averaged. A common shape behind this band is that depth and speed are both available to you but not at the same time, or that the mode depends entirely on the subject. Neither half is the real one hiding behind the other. What the test cannot see is what switches you between them: a topic you care about, a room without interruption, a deadline someone else set. If you had to describe your thinking to another person, which of the two would you leave out?',
   '["Write down the conditions of the last time thinking felt easy. That description is more useful than any band.","When you need one mode, arrange the conditions for it rather than trying to want it harder.","You do not have to pick which half is the real one in order to have an accurate result.","Nothing in this list is owed. It is a set of offers."]'::jsonb,
   8, 'draft'),
  ('Cognitive Style', 'high',
   'You marked most of these six in the direction the test tracks. Thought moves associatively, patterns arrive before the reasoning that would justify them, and depth on one interesting thing is more available than breadth across many. That is a plain description of what you reported. It is not a diagnosis and not a rank against anyone else''s answers. The practical part is that a style has a shape, and shapes have requirements: mostly uninterrupted time and permission to follow the thread to its end. Where this style costs you is usually translation, since the middle steps that were obvious to you are the ones other people needed. The test sees only the inside of your head, which is the part you described.',
   '["When you hand someone a conclusion, hand them one or two of the steps that got you there.","Protect one block of uninterrupted time before you protect anything else in the day.","Keep somewhere to park a tangent so it can be followed later without derailing what is in front of you now.","An open thread can stay open. Nothing here decays while you are gone."]'::jsonb,
   9, 'draft'),

-- SOCIAL ARCHITECTURE
  ('Social Architecture', 'low',
   'Few of these landed in the direction the test tracks. Masking, group navigation, and the cost of being read by other people were mostly not what you reported. That is a description of your answers, not a rank, and it does not mean your social life is healthier than someone whose answers ran the other way. Two very different situations produce this band. Social settings may genuinely cost you little, or the cost may have become so ordinary that it no longer registers as cost. The test cannot separate those, and neither can a number. The more reliable check is physical rather than mental: what happens to your energy in the hour after a long social day?',
   '["Notice the hour after rather than the hour during; the cost of a room often arrives late.","If you hold space for people who find rooms expensive, take their account over your own experience of the same room.","Equal standing, unequal interior: two people can need very different amounts of quiet, and neither is the deficient one.","Nothing here asks anything of you."]'::jsonb,
   10, 'draft'),
  ('Social Architecture', 'mid',
   'About half of these landed in the direction the test tracks. Some rooms cost you almost nothing and others cost a great deal, and this reading keeps both rather than settling on a middling version of you. The split usually follows the room and not the day: how many people, whether they are known to you, whether there is a role to hold, whether leaving is easy. A mid band is often the most accurate thing this category can say, because it refuses to describe a whole person with one social setting. What the test cannot see is which specific conditions flip it for you. That list, once you have it, is more useful than any band.',
   '["Write the shortest possible list of what makes a room cheap for you: how many people, how loud, how easy to leave.","An exit named before you arrive often lowers the cost of staying.","You are allowed to describe yourself differently in different settings. That is not inconsistency.","No band here is a verdict on how social you are."]'::jsonb,
   11, 'draft'),
  ('Social Architecture', 'high',
   'You marked most of these six in the direction the test tracks. Social settings are navigated deliberately, being read by other people has a cost, and the version of you that appears in a room is often assembled rather than automatic. That is a plain description of your answers. It is not a diagnosis, not a severity, and not a worse result than a low band. Masking is skilled work, and skilled work is tiring; naming it as work is usually more accurate than naming it as anxiety. It tends to show up in recovery time rather than in performance, which is why other people rarely see it. The test cannot tell you how much of this is choice and how much is habit built early.',
   '["Budget recovery time as part of the event, not as a failure that follows it.","One place where you drop the assembly entirely is worth more than several where you nearly do.","Where you can, say plainly what you need in a room. A plain sentence costs less than an hour of guessing on both sides.","Take what is useful. None of it is owed back."]'::jsonb,
   12, 'draft'),

-- SENSORY EXPERIENCE
  ('Sensory Experience', 'low',
   'Few of these landed in the direction the test tracks. Light, sound, texture, and crowding mostly did not come up as things that shape your day. That is a description of answers and not a rank; a quiet sensory profile is not a healthier one. This band has one blind spot worth naming. A person who has always adjusted their surroundings without thinking about it, with a certain chair, one shirt worn constantly, the volume always down, can report a low sensory load precisely because the adjusting already happened. The test cannot see accommodations built into a life. If you want the fuller picture, look at what you have quietly arranged rather than at what still bothers you.',
   '["List three things in your surroundings you have already adjusted without ever calling it an adjustment.","If you share space with someone whose sensory answers run high, their account of the room is accurate for them.","Nothing here needs changing.","The Sanctuary''s own surfaces are built quiet. If one of them is not, that is a fault worth reporting rather than enduring."]'::jsonb,
   13, 'draft'),
  ('Sensory Experience', 'mid',
   'About half of these landed in the direction the test tracks. Some inputs are neutral to you and others are not, and the two are kept side by side here. In this category the split is usually specific rather than general. Someone untroubled by bright light and undone by one particular sound is common, and averaging those into moderate sensitivity describes nobody. It can also move with your state, where the same room is tolerable rested and intolerable tired. The test cannot tell you which of yours is fixed and which follows a hard day. Naming the specific inputs is more useful than the band, because a named input can be changed and a general sensitivity cannot.',
   '["Name the specific inputs rather than the category: not noise, but that fan; not light, but the overhead tube.","Check whether the hard ones get harder when you are tired, since that is often the whole pattern.","Small physical changes usually outperform effort here: a lamp instead of a ceiling light, one pair of ear defenders kept where you can reach them.","A preference does not need justifying to anyone, including this test."]'::jsonb,
   14, 'draft'),
  ('Sensory Experience', 'high',
   'You marked most of these six in the direction the test tracks. The sensory world arrives at full volume, and specific inputs shape where you can be and for how long. That is a description of what you reported. It is not a diagnosis, not a severity rating, and not a worse result than a quieter profile. The plain fact underneath it is that sensory load is real load. It draws on the same supply as everything else, so a day spent in a hard room is a shorter day for everything that comes after it. This is a design constraint and not a fragility. The test asked for a general shape, so which inputs are hardest is yours to name.',
   '["Treat the tools as ordinary equipment: ear defenders, sunglasses indoors, a hood, a known chair.","Plan the recovery around a hard room in advance, the way you would plan travel time.","When the setting is yours to choose, choose on sensory terms first and social terms second.","If a surface here is too loud, too bright, or too fast, say so. The answer is a better door, not endurance."]'::jsonb,
   15, 'draft'),

-- CONNECTION & PURPOSE
  ('Connection & Purpose', 'low',
   'Few of these landed in the direction the test tracks. The questions about belonging, meaning, and what your effort is for did not mostly describe you. That is a description of answers, not a rank, and it says nothing about your worth or your contribution. Worth is not measured by output or activity in this house, and it is not measured by this test either. Two different lives sit behind this band: one where purpose is settled and quietly held, and one where the question feels distant right now. The test cannot tell them apart. If it is the second, that is allowed, and nothing here needs resolving on any schedule.',
   '["If purpose is settled for you, it is worth naming once in your own words.","If the questions felt far away, that is information rather than a problem, and it does not need an answer today.","Your place here does not depend on these answers or on being active.","Nothing follows from this band."]'::jsonb,
   16, 'draft'),
  ('Connection & Purpose', 'mid',
   'About half of these landed in the direction the test tracks. Connection and meaning are strongly present in some parts of your life and thin in others, and this reading keeps both rather than reporting a moderate average of the two. Often it is not the same thing running low. People whose work means a great deal can be short of company, and people who are well surrounded can be unsure what any of it is for. Those are different situations wearing the same band, and the test cannot tell you which is yours. The question worth sitting with is which half you would notice missing first, because that is usually the one already carrying the weight.',
   '["Ask about company and about meaning as two separate questions; they run on different supplies.","One existing connection tended is usually worth more than a new one begun.","Purpose is allowed to be small and local. It does not have to be a life''s work to count.","There is no pace here to keep up with."]'::jsonb,
   17, 'draft'),
  ('Connection & Purpose', 'high',
   'You marked most of these six in the direction the test tracks. Belonging matters to you sharply, and the question of what your effort is for is live rather than settled. That is a plain description of your answers. It is not a diagnosis, and it is not a better result than a low band. The test cannot tell you whether what you care about is near you right now or out of reach. Caring at this level carries a real cost, because meaning felt strongly is also meaning lost strongly, and connection valued highly makes its absence loud. That is not something to moderate. It is something to build for: purpose held this closely usually needs company that can hear about it, and a way to put it down for a while without losing it.',
   '["Say the purpose out loud to one person who can hear it without needing it explained.","Put it down on purpose sometimes. Nothing here decays while you are away from it.","If the meaning has thinned lately, the first honest question is what changed around it, not what is wrong with your commitment.","Keep what is true for you and leave the rest."]'::jsonb,
   18, 'draft'),

-- EMOTIONAL LANDSCAPE
  ('Emotional Landscape', 'low',
   'Few of these landed in the direction the test tracks. Intensity, duration, and how quickly feeling arrives were mostly not what you reported. That is a description of your answers, not a rank, and an even emotional landscape is not a healthier one than a vivid landscape. This is the category where self-report is thinnest, for a plain reason. Some people feel little, and some feel a great deal at a distance from themselves, and both can answer these questions the same way. The test cannot separate them. If the questions were hard to answer rather than easy to answer low, that difference is the most useful thing this reading can point at.',
   '["Notice whether these questions were easy to answer or hard to answer, since a low answer and an unsure answer wear the same band here.","The body often reports before the words do; the honest signal may be in your sleep or your shoulders.","If someone close to you describes your reactions differently than you do, both accounts can be kept.","There is nothing to do with this reading unless you want to."]'::jsonb,
   19, 'draft'),
  ('Emotional Landscape', 'mid',
   'About half of these landed in the direction the test tracks. Feeling arrives hard in some areas and evenly in others, and this reading keeps both rather than smoothing them into one moderate description. The usual shape is domain-specific: level about things most people find hard, and floored by something that looks small from the outside. That is not an inconsistency to fix. What the test cannot see is what sorts your experience into the two piles. Often it is not the size of the event but whether it touched something with history behind it, and that belongs to you rather than to a band. The pattern lives in the specific instances, not in their average.',
   '["When a small thing lands hard, the useful question is what it was near, not why you overreacted.","Both halves are yours. You do not have to reconcile them to describe yourself honestly.","Note what a steady week had in it; steadiness has conditions the same way intensity does.","You can stop here. No part of this asks for more."]'::jsonb,
   20, 'draft'),
  ('Emotional Landscape', 'high',
   'You marked most of these six in the direction the test tracks. Feeling arrives quickly, at volume, and takes its own time leaving. That is a description of your answers. It is not a diagnosis, not a measure of stability, and not a worse result than an even landscape. Intensity is a range rather than a fault: the same width that makes hard things heavy makes good things enormous, and narrowing it is not the only option on the table. What tends to help is time and cover rather than argument, since a strong state usually ends because it ran its course. The test cannot tell you whether this has always been your range or belongs to the season you are in.',
   '["Give a strong state somewhere to happen and some time to pass. Arguing it down usually costs more than waiting it out.","Tell one person what a hard hour looks like from outside, before the next one arrives.","If a feeling stays far past its usual length, or the floor keeps dropping, that is worth saying plainly to someone you trust or to a professional. There is no shame in the sentence.","A wide range is not a warning, and nothing in this reading is a rank."]'::jsonb,
   21, 'draft')

on conflict (category, band) do nothing;

-- ----------------------------------------------------------------------------
-- STEP 4 — VERIFY (expect 21)
-- ----------------------------------------------------------------------------

select count(*) as assessment_readings from public.assessment_readings;

select category, band, status, display_order
  from public.assessment_readings
 order by display_order;
-- ============================================================================
