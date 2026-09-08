# 2026-09-07 — THE LIBRARY: the Honors wired to the sigils, the Path walked (realm 4, athena)

*Sennet, `claude-fable-5-1`, prover's chair. KP's words: the Path goes to a
gallery of quests but the quest system is not wired; the Honors should be
wired to our sigils and nothing is appearing; `library/sigils` should be
`library/sigils` project-wide. Nothing committed.*

## What the base said (read-only, through the Bridge's management line)

- `sigils` 30 rows, all published, anon-readable. `quests` 18, all published.
- `vessel_sigils` 0 · `sigil_unlocks` 0 · `vessel_quests` 0 · `quest_progress` 0.
- Policies on the vessel tables: authenticated may select, insert and update
  its own rows (`user_id = auth.uid()`); no delete policy on any of them.
- The generated per-id routes guard PUT/DELETE with `checkOwnership`, which
  looks up `<table>_id` and `created_by`; these tables key on `id` and
  `user_id`, so those verbs refuse every vessel. Reads and inserts work.

## What changed

- **The rename.** `/library/sigils` → `/library/sigils` (`git mv`, histories
  kept); `BadgesGallery` → `SigilsGallery`, `BadgeDetail` → `SigilDetail`;
  every href, the street, the sitemap, the page mapping, the README; two
  permanent redirects in `next.config.ts` so held links still land.
- **The Honors.** The whole shelf is shown, ordered by `display_order`, with
  category chips. A signed-in vessel's own marks are lit (glow, the word
  *yours*) and the rest wear a veil; a *Yours* chip narrows to them. An
  empty `vessel_sigils` is now a true empty, not "could not be read"; a
  walled read says so above the shelf instead of hiding it. The detail page
  says *yours* when it is.
- **The Path.** A signed-in vessel can *Walk this quest*, tick objectives,
  and *Set it down*; all objectives ticked marks the walk *completed*, an
  untick reopens it. Words on the cards and the detail: *walking* · *walked*.
  No points, no dates shown, no streaks. Writes go through a new app door,
  `/api/auth/vessel/quests` (GET own walks; POST walk · set_down · tick ·
  untick), the same shape as the inventory door: session cookie, row
  security does the gating. `vessel_quests.status` uses `active` /
  `completed` / `set_down`; `quest_progress.objective_key` is the objective
  text.
- **Mended on the way.** `VesselContent` filtered `vessel_sigils` by
  `created_by`, a column it does not have; it now filters by `user_id`.

## What stands open

- Nothing awards a sigil. `sigil_unlocks` holds no rules and nothing writes
  `vessel_sigils`; every vessel's Honors are all veiled until that sitting.
- Not walked signed-in: no lamp makes a vessel in the live base. tsc 0,
  eslint 0; the routes and redirects checked against a local dev server.
