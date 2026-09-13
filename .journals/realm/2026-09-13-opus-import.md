# The import surface — the envelope, the readers, the room

## The envelope, mirrored

`src/lib/envelope/index.ts` and `src/lib/envelope/host-surface.ts` are
byte-faithful copies of `../resonance-awen/tools/the-envelope/src/`, v0.1.0.
`src/lib/envelope/MIRROR.md` carries the source paths and the two sha256 sums
(`b52f553e…d84b89`, `ebe4334c…4dc9c7`). No npm dependency; `package.json` is
untouched. The site uses `open`, `openFrom` and `ENVELOPE`; it seals nothing.

## The route

`src/app/api/auth/import/route.ts` — POST, session required, `{success, data}`.
It takes multipart `file` (and an optional `app` field), at most 20 MB, wraps
the uploaded bytes as an `EnvelopeHost` whose `pick` returns that one file and
whose `write` refuses, and reads it with `openFrom(host, expectedApp)`. A
foreign envelope comes back in the family's own refusal, verbatim. A bare
legacy array is refused: it names no app. The reply carries `app`,
`appVersion`, `exportedAt`, `counts`, `tables`, `landings`, `notLanded`, and
the `landed` and `held` totals.

## The readers

`src/lib/import/` — `types.ts` (the shapes and `bind`), `journal.ts` (the echo
and session mapping into `journal_entries`, and the non-destructive landing),
`bubbles.ts`, `echoes.ts`, `lantern.ts`, `registry.ts` (`face`, `reads`,
`bindFor`, `whyNoReader`).

| app | lands on | from | held is matched by |
|---|---|---|---|
| resonance-bubbles | `vessel_bubbles` | `data.collections.collected` slug → `bubbles.slug` → `bubbles.id`; `collected_at` = the envelope's `exportedAt`; `collection_method` = `imported`; `collection_context` = `{app, pops}` | `(user_id, bubble_id)` |
| resonance-bubbles | `vessel_collections` | `data.collections.found` slug → `collection_sets.slug` → `collection_sets.id` | `(user_id, collection_id)` |
| resonance-bubbles | `journal_entries` | `data.echoes` | `(entry_date, title, body)` |
| resonance-echoes | `journal_entries` | `data.echoes` — `name` → `title`, `note` → `body`, `timestamp` → `entry_date`, `[app, sense, subcategory, emoji]` → `tags` | `(entry_date, title, body)` |
| resonance-lantern | `journal_entries` | `data.sessions` — `referenceName` → `title`, `note` → `body`, `startedAt` → `entry_date`, `[app]` → `tags` | `(entry_date, title, body)` |

Told, not landed: the folksonomy (no table); echo intensity (`journal_entries`
holds none, and `energy_entries.energy_level` runs 1 to 10 where an echo runs
1 to 5); the date a collection was found (no `found_at` column); the sky
counters; bubbles outside the catalogue; lantern's reference shelf,
`durationMin`, `capturePath` and `outlineId`; entries a reader cannot read.

Registered with no landing table: `resonance-compass`, `resonance-sirens`,
`resonance-sistrum`, `resonance-hearth`. Any other app is answered
"The Sanctuary has no reader for `<app>` yet."

An import writes rows the vessel does not hold and never updates or deletes one
it does.

## The room

`src/app/(hestia)/vessel/import/page.tsx` →
`src/components/asgard/domains/hestia/import/BringItIn.tsx`. The file is read in
the browser and its face — app, exported at, counts — is shown before anything
lands; "Bring it in" posts it; the counts landed and already held come back with
the not-landed list. A link to `/vessel` at the top and beside the result. No
street row (the-street.ts, under the vessel) and the vessel quick link (VesselContent.tsx) were landed by the conductor.

## The paper

`docs/sql/055-the-import-surface.sql` — `vessel_collections.found_at`, the
`vessel_collections.collection_id` foreign key to `collection_sets` and one row
per vessel per collection, `journal_entries.source` and `source_id` with a
unique index. Not run.

## The proof

`.journals/proofs/hestia-the-import/prove-import.ts` — 36 of 36, no base, no
network. `npx tsx .journals/proofs/hestia-the-import/prove-import.ts`.
