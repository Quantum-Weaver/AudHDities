# 2026-09-13 · (athena) · platform-hand

## What is now

**Lesson completion.** No table in the 118 public tables of the superposition base
holds a lesson mark. `quest_progress.quest_id` and `vessel_quests.quest_id` are
foreign keys to `quests` (`src/lib/generated/supabase/database.types.ts:3979,5747`),
so neither can carry one. `docs/sql/046-the-lesson-marks.sql` creates
`public.vessel_lessons` (`user_id`, `lesson_id`, `status`, `completed_at`, unique on
`user_id, lesson_id`), its four RLS policies, its `gaia_config` row under
`hestia-core`, and the `gaia_sync` call.

`src/app/api/auth/vessel/lessons/route.ts` answers GET with
`{ success, data: LessonMark[], ready }` and POST `{ lesson_id, action }` where
action is `mark` or `unmark`. It verifies the lesson is published, writes through
`src/lib/lessons/store.ts`, fires the sigil evaluator on a mark, and returns
`{ success, data, sigils }`. `store.ts` reads and upserts `vessel_lessons` through a
narrow surface, because the generated types do not carry the table; a missing
relation answers `ready: false` and the route returns 503 on a write.
`src/lib/lessons/marks.ts` is the client road.

`LessonDetail.tsx` carries a "read" badge, a "Mark it read" button, a "Lift the mark"
button, a line when a sigil lands, and a "Try again" when the read is refused.
`LessonsGallery.tsx` shows a "read" badge on every card whose lesson is marked.

**Sigils awarded.** `src/lib/sigils/award.ts` reads published `sigil_unlocks` rows
and writes the `vessel_sigils` rows they earn. It understands four `trigger_type`
values: `quest_completed`, `bubble_popped`, `lesson_completed`, `path_completed`.
`trigger_entity` names one entity by slug or id; left null, `trigger_value` is the
count of that kind, defaulting to one. `path_completed` is satisfied when every
`path_lessons` row with `is_required` is marked. It reads the sigils the vessel
already holds first and inserts only what is missing.

`src/app/api/auth/vessel/sigils/route.ts` answers GET with the vessel's sigils and
POST by running the evaluator. It fires from `QuestDetail.tsx` when a walk turns
completed, from `BubblePopGame.tsx` after a pop is recorded, and inside the lessons
route on a mark. `src/lib/sigils/earned.ts` is the client road.

`docs/sql/047-the-unlock-rules.sql` grants the read door on `sigil_unlocks`, adds the
unique index `vessel_sigils_user_sigil_key` on `(user_id, sigil_id)`, and writes one
rule: Star Catcher at one row in `vessel_bubbles`. Of the thirty sigils on the shelf
(`008-the-library-first-seeds.sql`, `031-the-sigils-widen.sql`) that is the only one
whose own description names an act these four triggers count. The other twenty-nine
are listed by STEP 5 with two insert templates, to be named by hand.

**Course completion.** `CourseDetail.tsx` counts the `path_lessons` rows with
`is_required` against the vessel's marks: the header reads "N of M required read" and
carries a "walked" badge when all are read, and each lesson in the procession shows a
check when marked.

**The boundaries.** `src/app/(athena)/loading.tsx`, `error.tsx` and `not-found.tsx`
stand. The group had none and fell through to `src/app/error.tsx`.

**The Daily Number.** `src/app/(athena)/library/dailies/sudoku/page.tsx` renders
`SudokuGame` inside the `Page` wrapper; the component is whole at 538 lines and
`@/lib/sudoku` exports `generateDailyPuzzle`, `todayKey`, `findConflicts` and the
`Difficulty` and `DailyPuzzle` types. The street row stands at
`src/lib/constants/systems/the-street.ts:88`. Nothing was changed.

## Gates

- `npm run type-check` -> exit 0, no diagnostics.
- `npx eslint "src/lib/lessons" "src/lib/sigils" "src/app/api/auth/vessel/lessons"
  "src/app/api/auth/vessel/sigils" "src/app/(athena)" "src/components/asgard/domains/athena"`
  -> 8 problems (8 errors, 0 warnings), the same 8 as before the work, all in
  `BubblePopGame.tsx`, `BubblesGallery.tsx` and `SudokuGame.tsx` on lines this hand did
  not edit. Zero in the new files.
- `npm run lint` -> 1115 problems (703 errors, 412 warnings), from 1200 problems
  (729 errors, 471 warnings) before the work. Other hands held this tree through the
  sitting; the scoped run above is this hand's delta.

## Files

- `docs/sql/046-the-lesson-marks.sql` (new)
- `docs/sql/047-the-unlock-rules.sql` (new)
- `src/lib/lessons/marks.ts` (new)
- `src/lib/lessons/store.ts` (new)
- `src/lib/sigils/earned.ts` (new)
- `src/lib/sigils/award.ts` (new)
- `src/app/api/auth/vessel/lessons/route.ts` (new)
- `src/app/api/auth/vessel/sigils/route.ts` (new)
- `src/app/(athena)/loading.tsx` (new)
- `src/app/(athena)/error.tsx` (new)
- `src/app/(athena)/not-found.tsx` (new)
- `src/components/asgard/domains/athena/lessons/LessonDetail.tsx`
- `src/components/asgard/domains/athena/lessons/LessonsGallery.tsx`
- `src/components/asgard/domains/athena/courses/CourseDetail.tsx`
- `src/components/asgard/domains/athena/quests/QuestDetail.tsx`
- `src/components/asgard/domains/athena/bubbles/BubblePopGame.tsx`

`src/app/api/auth/vessel/quests/route.ts` was read and not edited. Nothing was staged,
committed or deployed. No write reached the base and no migration was run.
