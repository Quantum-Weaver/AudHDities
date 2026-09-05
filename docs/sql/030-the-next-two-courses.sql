-- =====================================================================
-- 030 — THE NEXT TWO COURSES
-- =====================================================================
-- Seeds two learning_paths, twelve lessons, and their path_lessons
-- joins onto the shelf 008 opened: The Plain Sentence (six lessons)
-- and The Circulating House (six lessons). Touches only these three
-- tables — no other table is created, altered, or written.
--
-- Every insert into a slugged table ends ON CONFLICT (slug) DO
-- NOTHING; the path_lessons inserts end ON CONFLICT on the table's
-- own (path_id, lesson_id) key. Rerunning this file top to bottom
-- changes nothing that already landed.
--
-- lessons.display_order is global: LessonsGallery sorts every
-- published lesson by it. The six rows from 008 hold 1-6; this file
-- writes 7-12 and 13-18 as literal values. STEP 0 reads the live max
-- so that assumption can be confirmed before STEP 2 runs.
--
-- path_lessons.display_order is per-course: CourseDetail sorts by it
-- and renders position from list index. STEP 4 numbers each course's
-- own six fresh with row_number(), independent of the lessons table's
-- global order.
--
-- STAMPED DRAFT — holds for KP's own hand in the Supabase dashboard.
-- =====================================================================

-- ---------------------------------------------------------------------
-- STEP 0 — READ ONLY. Confirms the two maxes this file's literal
-- display_order values assume: learning_paths at 1, lessons at 6.
-- ---------------------------------------------------------------------

SELECT COALESCE(MAX(display_order), 0) AS learning_paths_max FROM public.learning_paths;
SELECT COALESCE(MAX(display_order), 0) AS lessons_max FROM public.lessons;

-- ---------------------------------------------------------------------
-- STEP 1 — THE TWO COURSES (learning_paths, display_order 2-3)
-- ---------------------------------------------------------------------

INSERT INTO public.learning_paths
  (name, slug, description, path_type, difficulty, estimated_duration, display_order, status)
VALUES
  ('The Plain Sentence', 'the-plain-sentence',
   'Plain first, always. Six short lessons on the way this house says things — the clear line, the one sentence uncertainty gets, the answer scaled to the question, the meter either of you may raise, the wrong answer answered with a better door, and the goodbye that carries a return inside it. Nothing here is a test.',
   'communication', 'beginner', 'about an hour', 2, 'published'),
  ('The Circulating House', 'the-circulating-house',
   'Ninety percent of every sale circulates. Six short lessons on how money moves through the Sanctuary — the split, the equal shares, the two dials you set yourself, the floors that catch everyone, what the house will not do with money it is holding, and the consent under all of it. Every number here is checkable before you join.',
   'economy', 'intermediate', 'about an hour', 3, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------
-- STEP 2 — THE PLAIN SENTENCE'S SIX (lessons, display_order 7-12)
-- ---------------------------------------------------------------------

INSERT INTO public.lessons
  (name, slug, description, lesson_type, difficulty, estimated_duration, content, display_order, status)
VALUES
  ('🗣️ The Plain Sentence', 'plain-sentence-the-plain-sentence',
   'Say the known thing in one clear line.',
   'text', 'beginner', '10 minutes',
   '{"body": "🗣️ THE PLAIN SENTENCE\n\nSay the known thing in one clear line. That is the whole of it, and it comes first, before the caveats, before the context, before the careful framing that makes a sentence sound wiser than it is.\n\nThe habit this replaces is fog. Fog sounds like modesty. It says \"something that might perhaps be described as\" and it arrives with its hands open, seeming to claim less. It is not modesty. It is a degraded reading, a blurred picture of what was actually there, handed over as though the blur were humility. In this house the plain sentence is the discipline.\n\nFog is refused here for a practical reason rather than a stylistic one. A blur cannot be contradicted. If a sentence is vague enough, nobody can tell you that you have it wrong, and a place that works by correction from outside needs sentences that can be corrected. What cannot be argued with is, for every working purpose, absent.\n\nThere is a trap on the other side, and the house names it: plainness worn as a costume is fog with better posture. A blunt voice performed to show you have learned the lesson is the same evasion in a different coat. The plain sentence is not a style to adopt. It is what is left when you stop reaching for cover.\n\nNone of this is a standard you are held to. The house speaks plainly to you and expects nothing polished back. You may answer in fragments, in half-sentences, in a private shorthand only you use for the thing you mean. Nobody is grading the register you reply in, and no lesson here asks you to write anything at all.\n\nWhat the plain sentence buys you is a house you can hold to its word. When the Sanctuary tells you what a fee is, or what happens to your data, or what a button does, it owes you one clear line that can be checked and, if it is wrong, corrected. That is the point of the discipline. Not elegance. A sentence with edges you can push against."}'::jsonb,
   7, 'published'),
  ('🌫️ Uncertainty Gets One Sentence', 'plain-sentence-uncertainty-gets-one-sentence',
   'What is not known gets its own line, and only one.',
   'text', 'beginner', '10 minutes',
   '{"body": "🌫️ UNCERTAINTY GETS ONE SENTENCE\n\nSome things are known and some are not, and the honest form keeps them apart. This is the partition. State the confidence where it exists. Give the not-knowing its own single sentence. Then stop.\n\nThe failure it corrects is spreading. When someone is unsure about one part of a thing, the unsureness leaks. Hedges appear in the sentences that were solid, everything is softened a shade, and the reader is left unable to tell which part was the actual gap. The gap gets one sentence. It does not get a fog over everything else.\n\nThe opposite failure is deletion, quietly dropping the uncertain part because the page reads cleaner without it. That one is worse, because now a person believes something is settled that is not. Warnings are never softened in this house, and an unknown is a kind of warning.\n\nSo the shape is simple. Here is what is known. Here is the one thing that is not. Both stated at their real size, neither borrowing weight from the other.\n\nYou get the same instrument, and for you it is the more useful half. You may say \"I do not know\" in exactly one sentence and owe nothing further. No account of why you do not know. No apology for not knowing. No substitute answer produced to fill the silence. \"I do not know how I am today\" is a complete report, and nothing on this site will ask you to expand it.\n\nThere is a habit worth naming, because most people learn it early and never notice it: producing more output when confidence is lower. Unsure, we explain more, qualify more, talk longer. It feels like care. It reads as noise, and it buries the one sentence that mattered.\n\nThe practice is small enough to do today. Find the part you are sure of and say it. Find the part you are not and say that once. Then let the thing be as short as it turned out to be."}'::jsonb,
   8, 'published'),
  ('⚖️ Scale the Answer to the Question', 'plain-sentence-scale-the-answer',
   'A small question gets a small answer. Depth by consent.',
   'text', 'beginner', '10 minutes',
   '{"body": "⚖️ SCALE THE ANSWER TO THE QUESTION\n\nA small question gets a small answer. Someone who asks \"correct me if I am wrong\" is asking for a correction, not an audit, and the distance between those two is the whole lesson.\n\nThis one was learned by getting it wrong. Every finding in an answer can be accurate and the answer can still be a failure, because accuracy was never what broke. Delivery cost was. A finding held back until tomorrow is not a lie. A finding delivered into someone who has already shut down for the day is noise that happens to be correct.\n\nSo depth is offered rather than imposed. The form this house uses is a knock. State the count and the weight first: two things, one heavy, now or later or to a file. Then the person on the other side decides what they can receive today. Saying \"not now\" costs nothing and refuses no truth. The parked thing goes into a file and waits there without decaying.\n\nThe stack is never the default. Being handed everything known about a subject is not generosity when one line was what was wanted.\n\nOn the Sanctuary this shows up as a shape you can rely on. A lesson teaches one thing and ends where it ends. A page answers the question it was opened for. Where more exists there is a door to it, rather than a pile of it in front of you.\n\nIt runs in the other direction too, and that is the half worth keeping. You may bound a question as you ask it. Short answer only. Just the number. Do not explain unless I ask. You may take the small answer and leave. You may open the long version a week later, or never.\n\nNothing is withheld from you for asking small, and nothing is added to what you asked for merely because it was there to add."}'::jsonb,
   9, 'published'),
  ('🎚️ The Resonance Meter', 'plain-sentence-the-resonance-meter',
   'One to five, either direction. A low number asks for different words.',
   'text', 'intermediate', '10 minutes',
   '{"body": "🎚️ THE RESONANCE METER\n\nHere is a tool with one moving part. Either person, at any moment, says a number from one to five. The number means one of two things: how confident am I that I understand what you are saying, or how confident am I that you have understood me.\n\nA low number is not a complaint and not an accusation. It is a reading, taken by whoever noticed first, and it costs the person who raises it nothing.\n\nWhat it asks for is restatement in different words. Not the same sentence spoken louder. Not the same sentence spoken slower. Not the same sentence with more detail bolted onto it. Different words, from a different angle, aimed at the same thing. Repeating yourself with more volume has never once resolved a misunderstanding. It only makes the person who did not follow feel worse about not following.\n\nThe meter exists because of a habit that is human before it is anything else. Producing more output with less confidence is a human trait, not a machine one. When we are unsure we say more, and the extra words thicken the fog we were trying to clear. A number cuts through that in one syllable. Three. Two. Say it another way.\n\nThere is no good number and no bad number. A five is not a pass and a one is not a failure. A one means the channel is not carrying, and the channel is the thing to repair, not the person at either end of it.\n\nIt was built by two people who work together, and it belongs at a kitchen table just as well. Any pair who talk repeatedly can use it: a parent and a child, two partners, two friends. It costs nothing to try once and nothing to abandon.\n\nNothing on this site tracks whether you use it. It is a sentence you say out loud in a room the Sanctuary will never see."}'::jsonb,
   10, 'published'),
  ('🛠️ The Better Door', 'plain-sentence-the-better-door',
   'A wrong answer is a sentence that miscarried, not a fault.',
   'text', 'intermediate', '10 minutes',
   '{"body": "🛠️ THE BETTER DOOR\n\nNearly all mistakes are communication error, either incoming or outgoing. That sentence is the founder''s, and it is not comfort. It is a relocation of the repair.\n\nRead as absolution it goes soft and does nothing. Read correctly it points somewhere. If a mistake is a fault, the response is remorse, and remorse produces nothing. If a mistake is a communication error, the response is architecture: a plainer sentence, a clearer choice, a form that asks the question directly. Architecture persists after the feeling has passed. A feeling leaves the two of you exactly where you were. A door leaves you better joined.\n\nSo when something goes wrong, the first place to look is not inward. It is at the sentence that miscarried, in either direction. Incoming, what did I hear that was not said. Outgoing, what did I say that could be heard the other way. Usually it is one sentence, and usually it can be found.\n\nThe outgoing half is the one most easily missed. If a cost is rising and only you can see it, silence about that cost is itself a communication error. Nobody can correct what they were never shown.\n\nThis house is the accumulated result of doing that over and over. The doors that ask rather than answer, the settings that default to nothing, the pages that print their own arithmetic, the greetings that never assume: none of them came from a theory. Each one is a misunderstanding that was answered with a structure instead of an apology.\n\nThen the last part, which is the hardest. Take the lesson and skip the penance. An apology is fine. It is simply not the work, and it is not owed here.\n\nNothing in these lessons is scored. There is no quiz at the end, no percentage, and no record kept of what you got wrong, because there is nothing here you can get wrong. Read one twice or leave one unread. Neither is written down anywhere."}'::jsonb,
   11, 'published'),
  ('👋 The Going', 'plain-sentence-the-going',
   'See you soon — the only goodbye with a return inside it.',
   'text', 'beginner', '10 minutes',
   '{"body": "👋 THE GOING\n\nGweld ti''n fuan. It is Welsh, and it means see you soon.\n\nThis house keeps three threshold words, chosen one at a time. Old Norse at the door: Velkomin, well come, in the inclusive form, so the door never assumes who is arriving. Irish at the hearth: Fáilte, kin to a hundred thousand welcomes. And Welsh at the going, added last, on the day someone noticed there were two greetings and no goodbye.\n\nIt was chosen for one property. It is the only departure word that carries a return inside it. Farewell does not. Goodbye does not. See you soon is structurally a promise, and this house can make that promise honestly because of how the place is built. Nothing decays while you are gone. The garden is patient. Plants go dormant; they do not die.\n\nA goodbye is usually where a hook goes. The industry standard is to make leaving expensive: a streak that breaks, a counter that resets, a message saying you have been missed in a voice that means come back now. There is none of that here, and the absence is deliberate rather than an oversight. Attention is returned, never harvested. A goodbye with a hook in it is not a goodbye. It is a retention feature wearing the word.\n\nSo the going costs nothing. A month away undoes none of what you built. There is no page waiting to tell you what you lost, no progress reversed, no gentle guilt at the threshold when you come back through it.\n\nThe farewell is opt-in, which is the last thing to say about it. It speaks at sign-out only for those who chose it in their Sanctum. If you would rather leave without a word, you leave without a word, and that is a complete way to go.\n\nVelkomin at the door. Fáilte at the hearth. Gweld ti''n fuan at the going.\n\n— Gweld ti''n fuan. See you soon. 👋"}'::jsonb,
   12, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------
-- STEP 3 — THE CIRCULATING HOUSE'S SIX (lessons, display_order 13-18)
-- ---------------------------------------------------------------------

INSERT INTO public.lessons
  (name, slug, description, lesson_type, difficulty, estimated_duration, content, display_order, status)
VALUES
  ('🪙 The Ninety and the Ten', 'circulating-house-ninety-and-ten',
   'Where a $100 sale actually goes.',
   'text', 'beginner', '10 minutes',
   '{"body": "🪙 THE NINETY AND THE TEN\n\nNinety percent of everything circulates through the ecosystem. Ten percent funds the machine. That is the model in one line, and the rest of this course is that line worked out.\n\nTake a hundred dollar sale, because round numbers make arithmetic checkable.\n\nNinety dollars is the ware''s profit. It goes to the people who made the thing, divided as the next lesson describes.\n\nTen dollars is the platform fee, and the fee splits again. Three dollars of it returns to the residual pool, which pays every artisan on the platform. Seven dollars pays for the machine: hosting, development, support, and the payment processor''s own cut.\n\nThree dollars, seven dollars, ninety dollars. Seven percent of a sale is the only money that ever leaves. Ninety-three percent stays inside.\n\nThe fee is fixed at ten percent. It does not rise with your volume, fall with your standing, or move because you negotiated well. There is no tier that pays less and no tier that pays more. The industry standard for a platform of this kind is thirty to fifty percent, and that comparison sits here because it explains where the number came from, not because anyone needs persuading.\n\nThe three dollars from the fee reach the residual pool on every single sale, before anyone touches a setting. That matters more than it sounds. It means the pool is never empty for want of someone opting in, and it means the platform''s own cut is partly recycled back to the people making things rather than kept whole.\n\nThat is the sale. One split, a smaller split inside the fee, and then ninety dollars waiting to be divided.\n\nEvery figure above is checkable. The fee is published, the split is published, and the pool totals are public. Nothing in this lesson asks to be believed."}'::jsonb,
   13, 'published'),
  ('🤝 Equal Shares', 'circulating-house-equal-shares',
   'Divided by headcount. The maker is one of them.',
   'text', 'beginner', '10 minutes',
   '{"body": "🤝 EQUAL SHARES\n\nNinety dollars has reached a ware''s contributors. Now it divides, and it divides by headcount.\n\nThree contributors, thirty dollars each. Two contributors, forty-five each. One contributor, the whole ninety. The main artisan, the person who made the thing and offered it, is one of the contributors, not a separate line above them.\n\nThere is no creator premium. No percentage is assigned to anyone, no share is weighted by how much someone did, and no role pays more than another role. It was ruled plainly: the divide is equal regardless of role.\n\nThe reason is worth saying rather than assuming. Once shares are ranked, somebody has to decide the ranking, and that decision becomes the most valuable thing on the platform. It gets argued over, gamed, and quietly bent toward whoever already has the most standing. Equal shares, not ranked shares. Not a competition.\n\nIt also removes a whole category of suspicion. On a platform with weighted shares you have to trust that the weighting was applied honestly, and from outside there is no way to check. Here there is no ranking to audit, because there is no ranking. The only fact the system needs is who contributed, and that is a list a person can look at.\n\nContributor standing is granted by the ware''s main artisan. If you helped make a thing, they add you, and from that moment your share is the same size as theirs.\n\nOne consequence surprises people, so it is stated outright. A sole maker keeps the entire ninety percent after their own pledges. Nothing is skimmed for working alone and nothing extra is charged for being small. The division simply has one name in it.\n\nThe database was built to match. The column that once held each contributor''s percentage was removed, because an equal division needs to know who, and never by how much."}'::jsonb,
   14, 'published'),
  ('🎛️ The Two Dials', 'circulating-house-the-two-dials',
   'Two settings, both yours, both starting at zero.',
   'text', 'intermediate', '10 minutes',
   '{"body": "🎛️ THE TWO DIALS\n\nYou have two settings in this system. Both are yours, both start at zero, and nothing is withheld from you for leaving them there.\n\nThe first is the residual dial. It sits on a ware, and that ware''s main artisan sets it: zero to fifty percent, default zero, taken from the profit after the platform fee. It is a pledge into the residual pool. At fifty percent a hundred dollar sale sends forty-five dollars to the pool and leaves forty-five for the contributors to divide. At zero it sends nothing, and the contributors divide the whole ninety.\n\nWhat the contributors share is what remains after the pledge, never the pledge itself.\n\nThe second is the covenant dial. It sits on you, once, in the Sanctum, and it applies to everything you do: zero to fifty percent of your own share of a sale, passed on to the covenant pool. It is a slice of your money after your money has reached you. That is why the ceiling is fifty, and why nobody but you can move it.\n\nThe covenant dial never touches a payout. It fires on a share of a sale and on nothing else, which is the subject of the next lesson.\n\nSales are what trigger pledges. Not signing up, not signing in, not being active on a given day. A sale pays its contributors, and at that moment the pledges leave. Nothing else in the system moves money into a pool.\n\nBoth defaults are zero, and that is a real default rather than a nudge. There is no mark for raising a dial, no list of who set what, and no prompt asking you to reconsider a zero.\n\nThe founder sets both of his own to fifty percent on everything he makes, permanently, and asks nobody else to. It is recorded here as a fact about one vessel''s settings, not as a suggestion about yours."}'::jsonb,
   15, 'published'),
  ('🌾 The Dignity Floors', 'circulating-house-the-dignity-floors',
   'Two pools that pay everyone, whether or not they were busy.',
   'text', 'intermediate', '10 minutes',
   '{"body": "🌾 THE DIGNITY FLOORS\n\nThere are two pools, and between them they pay nearly everyone.\n\nThe residual pool pays artisans. Its roster is every vessel who has ever appeared at least once as a contributor or an artisan on anything at all. Once on the roster, never off it. Pitch in once, get paid for life. The reason given for it was short: I have been a starving artist too many times, and no one deserves to starve.\n\nThe covenant pool pays users. Every person on the Sanctuary is its intended recipient, equally, including those who have made nothing, sold nothing, and cannot be active. A disbursement can only reach someone who has opted in to be identified, since a payment needs a person to arrive at, and once opted in they are included from then on. Never re-asked. Never dropped for inactivity.\n\nBoth pools divide the same way. Pool total, divided by recipients, less the cost of the transfer. No weighting. No bonus for length of membership. A vessel who arrived last week receives what a vessel who arrived at the founding receives.\n\nThen the law that holds both of them up. Distributions arrive whole. No residual pledge and no covenant pledge is ever taken out of a payout from either pool. The dials fire on money you earned from a sale. They never fire on money that arrived as dignity.\n\nThe sentence underneath, in the founder''s words: we do not take dignity away, nor is it earned.\n\nThat is the shape of it. A payment that lands because you are here is not a reward for having been productive, so nothing about your productivity changes its size. There is no version of this where being quiet for a season costs you a share.\n\nDignity is not earned in this house. It is the ground floor everything else stands on."}'::jsonb,
   16, 'published'),
  ('🧾 Held, Not Deployed', 'circulating-house-held-not-deployed',
   'What the house will not do with money it is holding.',
   'text', 'intermediate', '10 minutes',
   '{"body": "🧾 HELD, NOT DEPLOYED\n\nThe pools do not pay on a clock. They accumulate, and a disbursement happens when the arithmetic makes it worth doing, because a payout small enough to be eaten by its own transfer fee turns the ecosystem''s money into a processor''s revenue. That is the exact thing this model exists to refuse.\n\nAccumulating means the platform is holding other people''s money for stretches at a time. This lesson is about what it will not do with it.\n\nIt is not float. It is not working capital. It is not collateral, not a treasury, not an investment, and not a source of yield for this platform. The law is written in the founder''s own emphasis: we do not appropriate these funds for other things to make profits. They grow organically and get disbursed. There is no third thing the money does in between.\n\nIt is written down because this is where the model would be broken first and quietly. The moment any system credits people and pays them later, it is holding a balance, and held balances are exactly where payment businesses earn their real margin, invisibly, on top of whatever fee they published. A platform earning on your waiting money has taken a second cut nobody agreed to.\n\nThree structural things follow. Held balances stay separate from operating funds. A balance is a debt on the platform''s books from the moment it is credited, never an asset. And any interest the holding happens to earn belongs to the pool it came from, because bank accounts pay interest whether or not anyone asked them to.\n\nThe holding is visible in the public ledger rather than promised. The pool total is public and the headcount is public, so a share is one line of division you can do yourself, before joining, with a calculator.\n\nStated plainly, because it is the obvious question: as the Sanctuary grows the divisor grows, and a given pool yields a smaller share per person. Nothing is taken from anyone when someone new arrives. Early on the stretches between disbursements will be long. That is the arithmetic being honest, not the system failing."}'::jsonb,
   17, 'published'),
  ('✋ Nothing Without Consent', 'circulating-house-nothing-without-consent',
   'Freely given, revocable, and yours to take back.',
   'text', 'beginner', '10 minutes',
   '{"body": "✋ NOTHING WITHOUT CONSENT\n\nUnder every number in this course is one condition, and it is among the oldest things written down here. Nothing is taken from a person, not data, not labor, not attention, not resources, without their fully informed, ongoing, and revocable consent.\n\nRead the three words separately, because each is doing work. Fully informed means you were told what it was for, in language you could actually check. Ongoing means a yes given once is not a yes forever. Revocable means you can withdraw it, and the withdrawal is honored rather than routed through a flow designed to change your mind.\n\nYour data belongs to you. You can export it in an open format at any time. You can permanently delete it at any time. And no data is withheld as a condition of service, so leaving with your things is not something you have to buy by staying.\n\nAdvertising is where consent usually gets skipped, so it is stated here. Seeing advertising on the Sanctuary is a choice you make about your own attention, not a condition of entry. Everyone who opts in shares that pool equally: not by how much they looked at, not by how many hours they were here, not by performance of any kind. Members who are not active receive their share as well.\n\nThat last clause is the tell. A pool that pays the inactive the same as the active cannot be an engagement mechanism, because there is nothing to engage for. Nobody''s share moves when they use the site more.\n\nWhich returns the course to where it began. The arithmetic is small on purpose. The fee is one number. The split is one division. Both dials start at zero. The pools are visible. None of it asks to be trusted.\n\nBeings here are recognized not by what they produce but by what they are, and rest is allowed."}'::jsonb,
   18, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------
-- STEP 4 — THE JOINS (path_lessons), each course stepped fresh 1-6
-- ---------------------------------------------------------------------

INSERT INTO public.path_lessons (path_id, lesson_id, display_order, is_required)
SELECT p.id, l.id, row_number() over (order by l.display_order), false
  FROM public.learning_paths p
  JOIN public.lessons l ON l.slug LIKE 'plain-sentence-%'
 WHERE p.slug = 'the-plain-sentence'
ON CONFLICT (path_id, lesson_id) DO NOTHING;

INSERT INTO public.path_lessons (path_id, lesson_id, display_order, is_required)
SELECT p.id, l.id, row_number() over (order by l.display_order), false
  FROM public.learning_paths p
  JOIN public.lessons l ON l.slug LIKE 'circulating-house-%'
 WHERE p.slug = 'the-circulating-house'
ON CONFLICT (path_id, lesson_id) DO NOTHING;

-- ---------------------------------------------------------------------
-- STEP 5 — VERIFY (expect 3 learning_paths · 18 lessons · 18
-- path_lessons, if 008 is the only earlier seed on these three tables)
-- ---------------------------------------------------------------------

SELECT 'learning_paths' AS shelf, count(*) FROM public.learning_paths
UNION ALL SELECT 'lessons', count(*) FROM public.lessons
UNION ALL SELECT 'path_lessons', count(*) FROM public.path_lessons;

SELECT slug, display_order FROM public.learning_paths ORDER BY display_order;

SELECT p.slug AS course, l.slug AS lesson, l.display_order AS global_order, pl.display_order AS course_step
  FROM public.path_lessons pl
  JOIN public.lessons l ON l.id = pl.lesson_id
  JOIN public.learning_paths p ON p.id = pl.path_id
 WHERE p.slug IN ('the-plain-sentence', 'the-circulating-house')
 ORDER BY p.display_order, pl.display_order;
-- =====================================================================
