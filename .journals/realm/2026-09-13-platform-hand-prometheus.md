# (prometheus) — the Stage's write path, the group boundaries, the Loom's rooms, the types

## What stands now

**The Stage's write path.** `src/app/(prometheus)/stage/studio/page.tsx` renders
`src/components/asgard/domains/prometheus/stage/StreamSetup.tsx`. The component
gates in three steps, the same shape the bazaar's Loom uses
(`src/components/asgard/domains/hermes/studio/StudioShelf.tsx`): `useUser()` loading
→ skeleton; no user → sign in at `/login?redirect=/stage/studio`; `roles` holding
neither `artisan` nor `merchant` → apply at `/council/applications`. The form writes
`title`, `slug`, `description`, `event_type`, `genre`, `scheduled_for`, `is_live`,
`started_at`, `status` as `TablesInsert<'events'>` by POST to
`/api/generated/prometheus-stage/events`, which stamps `created_by` from the session.
A live write lands on `/stage/live/<id>`; a scheduled one on `/stage/schedule/<id>`.
`performer_id` is left null: the column carries no foreign key in
`src/lib/generated/supabase/database.types.ts` and nothing in the realm reads it.

**Group boundaries.** `src/app/(prometheus)/loading.tsx`, `error.tsx` and
`not-found.tsx` stand. Before them the group fell to `src/app/error.tsx` and had no
loading or not-found file of its own.

**The Loom's nine rooms.** `/studio/music` already rendered
`StudioPageTemplate`. The other eight —
`src/app/(prometheus)/studio/{art,animation,audio,video,writing,graphics,effects,export}/page.tsx`
— rendered an empty `<div>`. Each now renders `StudioPageTemplate` with the title,
icon and colour `StudioHub.tsx` gives it, one sentence of what the room will be, the
standing line "Nothing is built in this room yet.", and the "Return to the Loom" link
to `/studio`. `StudioPageTemplate.tsx` carries a `standing` prop for that line.

**The types.** The ten components under
`src/components/asgard/domains/prometheus/stage/` declared their own `events` shapes.
Each is now `Pick<Tables<'events'>, ...>` off
`src/lib/generated/supabase/database.helpers.js`. The drift closed was nullability:
`event_type` and `performer_id` were typed `string` where the column is
`string | null`. `EventDetail.tsx`, `LiveDetail.tsx` and `RecordingDetail.tsx` guard
the `event_type` badge against null. No `events_id`, no `user_id` standing for
`created_by`, and no column the table lacks was found in the group.

## Gates

`npm run type-check` — exit 0, before and after.
`npm run lint` — exit 1 before and after; 729 errors at the start, 720 at the end.
No file under `src/app/(prometheus)/` or
`src/components/asgard/domains/prometheus/` carries a new error or warning; the one
entry for the group is the `MapPin` unused-import warning in `EventDetail.tsx`, which
stood before this work.

## Second hand — the six defects

**The status filter.** Five galleries read `events` with no status filter and stood
drafts in public rooms. Each query now carries `status=published`:
`ScheduleGallery.tsx:45`, `ComedyGallery.tsx:29`, `MusicGallery.tsx:29`,
`LiveGallery.tsx:23`, `RecordingsGallery.tsx:42`. The detail components fetch by id
and carry no status filter.

**The draft copy.** `StreamSetup.tsx:226` states a draft is kept off the Stage's
rooms until it is published. The header at `StreamSetup.tsx:161` states nothing goes
up until it is put up. Neither claims a draft is unreadable: the only select policy
on `events` is public read (`docs/sql/003-the-stage-ground.sql:46`).

**The write policies.** `docs/sql/052-the-stage-opens-for-writing.sql` holds the
INSERT policy "Vessel puts up own event" (`with check (created_by = auth.uid())`) and
the UPDATE policy "Vessel tends own event", both `to authenticated`, plus the grants
and a policy/grant check. Unrun. `docs/sql/` held no INSERT policy for `events`
before it.

**The title gate.** `validateEvent` at `StreamSetup.tsx:36` is passed to `Form` as
`validate` at `StreamSetup.tsx:167`; it refuses an empty title and a title that
slugs to nothing. `slugify` at `StreamSetup.tsx:29` derives the slug from the title
alone — no timestamp suffix.

**The failure message.** `StreamSetup.tsx:87` shows `WRITE_CLOSED` on HTTP 401 or
403 and `WRITE_FAILED` otherwise; `result.error` is not read. An RLS rejection
returns 500 from `src/app/api/generated/prometheus-stage/events/route.ts:68` and so
shows `WRITE_FAILED`.

**Live and scheduled.** `StreamSetup.tsx:64-74` couples them: `goesLive` is
`isLive && !startsLater`; a live write sets `scheduled_for` and `started_at` to now;
a `scheduled_for` still to come sets `is_live` false and `started_at` null. The
redirect at `StreamSetup.tsx:97` follows `goesLive`. The copy at
`StreamSetup.tsx:206` carries the rule.

**The boundary comment.** `src/app/(prometheus)/error.tsx:43` reads "Refetches the
route, then clears the error boundary."

## Gates

`npx tsc --noEmit -p tsconfig.json` — exit 0, no output.
`npx eslint "src/app/(prometheus)/**" "src/components/asgard/domains/prometheus/**"`
— exit 0: 1 problem, 0 errors, 1 warning (the standing `MapPin` unused import in
`EventDetail.tsx`).
