# sorts and ownership — generated API

## getSortParams

`src/lib/api/auth.ts:167-177` reads `sort` for the column and `order` for the
direction. A generated-route URL must carry `sort=<col>&order=<asc|desc>`.

Thirteen generated-route URLs rewritten from `order=<col>.<dir>`:

| address | column |
| --- | --- |
| `src/components/asgard/domains/hermes/artisans/ArtisanDetail.tsx:39` | `works.updated_at` |
| `src/components/asgard/domains/hermes/artisans/ArtisansGallery.tsx:27` | `artisan_profiles.artisan_name` |
| `src/components/asgard/domains/hermes/contributions/ContributionsGallery.tsx:48` | `ware_participants.created_at` |
| `src/components/asgard/domains/hermes/contributions/ContributionsGallery.tsx:49` | `work_participants.created_at` |
| `src/components/asgard/domains/hermes/merchants/MerchantsGallery.tsx:27` | `merchant_profiles.merchant_name` |
| `src/components/asgard/domains/hermes/studio/StudioShelf.tsx:77` | `wares.created_at`, `works.created_at` |
| `src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx:258` | `current.event_at` |
| `src/components/asgard/domains/iris/emeralds/EmeraldsHistory.tsx:29` | `resonance.created_at` |
| `src/components/asgard/domains/mnemosyne/observatory/ObservatoryHub.tsx:44` | `sigils.name` |
| `src/components/asgard/domains/mnemosyne/observatory/ObservatoryHub.tsx:46` | `current.event_at` |
| `src/components/asgard/domains/mnemosyne/prophecy/ProphecyVision.tsx:32` | `quests.name` |
| `src/components/asgard/domains/mnemosyne/prophecy/ProphecyVision.tsx:33` | `sigils.name` |
| `src/components/asgard/domains/mnemosyne/timeline/TimelineSpiral.tsx:38` | `current.event_at` |

Every column is present on its table in
`src/lib/generated/supabase/database.types.ts`.

`src/lib/dailies/shelf.ts:39` keeps `order=display_order.asc`. That URL is
`${SUPABASE_URL}/rest/v1/daily_puzzles`, PostgREST itself, not a generated
route.

No PostgREST-style sort remains in `src/app/(cosmic)`,
`src/app/(hephaestus)`, or `src/components/asgard/domains/cosmic`.

## checkOwnership

`src/lib/api/auth.ts:82-98` reads the row by `id`. All 118 tables in
`database.types.ts` carry a column `id`; none carries `<tableName>_id`.

The owner column stays the `ownerField` default `created_by`. All 249 call
sites pass three arguments, so `created_by` is the column every generated
`[id]` route asks for. 21 tables have no `created_by`; the select errors
there and the check returns false.

The return compares a string to a string, so a null or absent owner value
never matches.
