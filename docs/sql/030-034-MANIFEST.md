# The Five Seed Drafts — Manifest

## 1. What each file seeds

| File | What it seeds | Rows |
|---|---|---|
| `030-the-next-two-courses-DRAFT.sql` | `learning_paths`, `lessons`, `path_lessons` — two courses, six lessons each | 26 (2 + 12 + 12) |
| `031-the-sigils-widen-DRAFT.sql` | `sigils` — twenty marks, display_order 11–30 | 20 |
| `032-the-path-widens-DRAFT.sql` | `quests` — twelve Path quests, display_order 7–18 | 12 |
| `033-the-lamp-room-and-the-covenant-DRAFT.sql` | `collection_sets`, `bubbles` — two sets of eight | 18 (2 + 16) |
| `034-the-acid-test-first-readings-DRAFT.sql` | creates + seeds `assessment_readings` — 7 categories × 3 bands | 21 |

## 2. Three rows from each, as they read

**030** — *The Circulating House*: "Ninety percent of every sale circulates. Six short lessons on how money moves through the Sanctuary…" · *The Plain Sentence* (lesson): "Say the known thing in one clear line. That is the whole of it, and it comes first, before the caveats…" · *Uncertainty Gets One Sentence*: "Some things are known and some are not, and the honest form keeps them apart."

**031** — *The Going Word*: "You chose the farewell — Gweld ti'n fuan, see you soon. The one departure word with a return already inside it…" · *Uncounted*: "You came back after time away and the door said its same word. No one counted the days." · *An Equal Share*: "A share from the pools arrived whole — the same as everyone else's, garnished by nothing."

**032** — *No One Is Late*: "Go looking for the date on a daily puzzle. There isn't one, and there never was." · *Rest Is Allowed*: "You are valued for existing, not for what you do. So: open the stars and pop nothing." · *Take It Back*: "Consent that cannot be withdrawn is not consent."

**033** — *The Human Bus*: "One person carrying every message by hand between minds that share no memory, and free to decline any of it." · *Equal Shares*: "Everyone in the pool receives the same amount — no ranking, no percentage shares." · *Yours to Take*: "Your data is yours — exportable in an open format, permanently deletable, never held back to make you stay."

**034** — Executive Flow · low: "On these six questions you marked few of the traits in the direction the test tracks." · mid: "Roughly half of these landed in the direction the test tracks, and the honest reading is that it depends." · high: "You marked most of these six in the direction the test tracks."

## 3. Every flag

**030**
- Literal display_order (paths 2–3, lessons 7–18) assumes live maxes of 1 and 6. Run STEP 0; if higher, shift the literals or ask for a computed `MAX()` version.
- `path_lessons` inserts carry `ON CONFLICT (path_id, lesson_id)`, verified against the live constraint; 008 has no such clause. Drop it to match 008 literally.
- Four founder sentences are paraphrased, unquoted, matching 008's unnamed attribution. Can become direct quotes.
- No Acid Test lesson in The Circulating House, though terms-of-service 4.1 ties the Community Tier to it. A bridge would be a seventh lesson later.
- Filename title and header framing are a hand's choice; rename freely.

**031**
- `ON CONFLICT (slug)` is unverified — no `CREATE TABLE` for `public.sigils` exists in the tree. STEP 1a reads for the unique index; if it returns nothing, do not force — create the guard or rewrite as `NOT EXISTS`.
- `sigil_unlocks` is the rule table, `vessel_sigils` the holding table; both exist with routes, and BadgesGallery already reads earned vs unearned. Missing: unlock rows and the code that evaluates them. A future file is a rules file needing a name and `trigger_type` per unlock.
- Three silent marks — Uncounted, The Bookmark, The Pause — become re-engagement, missed-deadline and stopping notifications if the granting announces itself. Award code, not description.
- Three marks need a human judge — Knocked First, Kept Whole, The Door Built. Self-claim, or leave as definitions. Decide before any unlock row.
- Rarity is a ranking vocabulary; legendary paints a gold glow. Thirty rows make the ladder visible. Decide whether the field keeps weight.
- The Welsh apostrophe drifts: typographic in SanctumContent.tsx:308, ASCII here. Pick one form.
- display_order 11–30 is literal, assuming a live top of 10. STEP 1b reads it; STEP 3's duplicate count must return 0.
- `own-pace` and `tending` are free text — nothing validates them; a typo makes a silent third category.
- Measured: descriptions 102–161 chars, slugs and emoji distinct from the live ten, four apostrophes doubled, 30 rows inside the gallery's limit of 100.

**032**
- `the-dignity-floor`'s description is 372 chars, over double the longest live row, and risks the card's 3-line clamp. One clause could be cut to ~296.
- Pre-existing: quest "Walk the Six Halls" lists six doors; LibraryHub now renders seven tiles.
- `OBJECTIVE_DOORS` has no Dailies entry, so "No One Is Late" names the Dailies as plain text on purpose.
- `quests.slug`'s unique constraint is unconfirmed in the tree; it mirrors every sibling seed. Worth a live schema check.

**033**
- `attention-returned`'s description is 140 chars, 2 over the live ceiling. Two named 2-char cuts close it.
- `completion_points` 60 on both sets is a guess; 025's later seven sets left it NULL.
- Notes-only: a stray 125 in the supplied length list; all 18 remeasured, every other figure reproduces.

**034**
- Numbering gap: 029 is the highest file that exists; 030–033 exist nowhere in the tree. Confirm nothing else claims them.
- The `status` column defaults `'published'` while all 21 rows seed `'draft'`. A future insert omitting status lands public. Decide whether the default should read `'draft'`.
- Narrower table shape than proposed — no slug, no band_low/high, no created_by/updated_at. Band thresholds (0–0.33 / 0.34–0.66 / 0.67–1) live only in code, and there is no short stable name for a reading.
- No CHECK on band, category or status; a mistyped band silently creates a wrong row.
- `submit_acid_test`'s body lives only in the base and must be read at the dashboard before wiring. This file adds no copy-at-submit trigger.
- A text-only category has no scorable average; the selection logic should omit it, not default it to mid.
- 006 already granted SELECT to anon and authenticated house-wide, so the explicit grant is likely redundant. Harmless.
- Unverified against the live base; also undecided whether `status` should reuse the `content_status` enum.

## 4. Order, and rerunning

Run the read-only steps first — 030's STEP 0, 031's STEP 1a and 1b — and stop if a max or the slug index disagrees. Then numeric order: 030 → 031 → 032 → 033 → 034. No file depends on another; 034 goes last because it creates a table. 033 ends with a registry sync; 031's STEP 3 verify must run through the anon key, not the dashboard, or a false-empty hides.

Each file is safe to rerun. Every insert ends `ON CONFLICT … DO NOTHING`, 034's table is `CREATE TABLE IF NOT EXISTS` with its policy dropped and recreated. A rerun after a full or partial run adds zero rows.

## 5. What remains code work

- **Sigil award wiring.** `sigil_unlocks` holds no rows and nothing writes `vessel_sigils`. All thirty marks stay definitions until rules and evaluation code exist — with three granted silently and three resolved on the judging question.
- **Quest completion.** No prerequisites, rewards or completion wiring; objectives link only through `OBJECTIVE_DOORS`, which has no Dailies entry.
- **Readings and `submit_acid_test`.** The RPC does not look up or copy a reading into `assessment_results`, no page consumes `recommendations`, the band thresholds sit in code, and no consent ward covers what a person is shown. Rows stay draft until that exists.
- **The sanctuary page says no registration while the Acid Test is login-gated.** A code fix; no seed here touches it.
