# (hestia) — the seams, the reading room, the vessel's own line

## The heralds

`heralds` carries `created_by` (the author) and `recipient` (the vessel addressed,
a uuid against `auth.users`). Both readers now filter on `recipient` with the auth
user id.

- `src/components/seidr/immersive/StatusBar.tsx` — `MetricsDisplay` reads
  `useUser().user`; the bell filters `recipient = user.id, is_read = false`; the
  energy metric filters `energy_entries.created_by = user.id`.
- `src/components/asgard/domains/hestia/notifications/NotificationsList.tsx:33` —
  `/api/generated/hestia-core/heralds?recipient=<user.id>&sort=created_at&order=desc&limit=50`;
  the row shape is `Pick<HeraldsRow, …>`.

## The Council House card

`src/components/asgard/domains/hestia/vessel/VesselContent.tsx` reads
`/api/generated/themis-governance/council_houses?sort=display_order&order=asc&limit=20`.
The card names the vessel's house when `community_profiles.council_house_id` is
set, and names the houses that stand when it is not, with a link to `/nexus/council`.
The column is written as `docs/sql/051-the-house-on-the-vessel.sql`; the card reads
it defensively and compiles without it.

## The vessel's applications

`VesselContent.tsx` reads `/api/generated/themis-governance/applications?user_id=<user.id>`
and adds a "Your Applications" quick link to `/council/applications`, badged with
the newest application's status, when the vessel holds one.

## The Acid Test reading room

`VesselContent.tsx` posts to
`/api/generated/mnemosyne-assessment/get_acid_test_results` and renders the kept
result through `ResultView`. `ResultView` and `isEmptyResult` are exported from
`src/components/asgard/domains/mnemosyne/assessment/AcidTestForm.tsx`;
`ResultView` takes `onContinue` and `onKeep` as optional and renders no buttons
when neither is given. The Acid Test still stores only on Keep.

## The generated-types truing, (hestia)

- `journal_entries` carries `created_by`, `body` and `id`; it has no `user_id`,
  `content`, `slug` or `journal_entries_id`.
  - `journal/JournalList.tsx` — list filters `created_by`, sorts `sort=created_at&order=desc`;
    create posts `created_by`, `title`, `body`, `mood`, `tags`.
  - `journal/JournalDetail.tsx`, `journal/JournalEdit.tsx` — read `entry.id` and
    `entry.body`; the edit writes `body`.
  - All three type their row as `Pick<JournalEntriesRow, …>`.
- `constellation/ConstellationContent.tsx` — the unused `MessageItem` and
  `ProductItem` interfaces are gone.
- `applications_id`, `journal_entries_id`, `channels_id`, `messages_id`: zero
  occurrences under `src/app/(hestia)/`, `src/components/asgard/domains/hestia/`,
  `StatusBar.tsx` and `AcidTestForm.tsx`.
- `vessel_sigils.user_id`, `vessel_quests.user_id`, `vessel_collections.user_id`,
  `vessel_interiors.user_id`, `current.sovereign_id`, `energy_entries.created_by`,
  `vessel_config.created_by`, `user_financial.created_by`: all present in
  `src/lib/generated/supabase/database.types.ts`; those readers stand.

## The status line

`vessel_config` holds no column for a status line.
`docs/sql/050-the-vessels-own-line.sql` adds `status_line text` with an 80-character
check. Built against it today:

- `src/app/api/auth/update-profile/route.ts` — `configUpdateSchema` gains
  `status_line: z.string().max(80).optional().nullable()`.
- `src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx` — a
  `SanctumSection` with id `your-line`, reading `status_line` from the config row
  and writing it through `updateConfigField`.
- `StatusBar.tsx` — `useVesselLine(userId)` reads `vessel_config` through
  `useVesselConfigList` and `CenterVoice` shows the line between the realm name
  and the voice line. Empty or absent, nothing is shown.

## Not done

The sky beside the voice line (plan 4.1). `src/lib/sky/` arrived in this tree
from another hand during this sitting; nothing in `StatusBar.tsx` reads it.

## Gates

`npm run type-check`: zero errors from this work. The full run reports one syntax
error in `src/components/asgard/domains/cosmic/playground/registry.tsx`, an
untracked file being written by another hand in the same tree; a run excluding
only that file is clean.

`npm run lint`: baseline 729 errors / 471 warnings. On the files touched here:
zero new errors, three fewer warnings.
