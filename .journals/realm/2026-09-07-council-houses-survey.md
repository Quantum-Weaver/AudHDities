# Council houses — read-only survey

Subject: what a council house is in this realm, how membership is modelled,
what surface lets a vessel choose one, and what is missing to let the first
account choose.

Grades used on every fact:
- **(a)** present in a migration or SQL file on disk
- **(b)** referenced in app code, including the GAIA-generated layer
- **(c)** not verifiable from disk; lives only in the remote base

No file in this repo was changed except this journal. Nothing was run against
the base.

---

## Findings

### 1. What a council house is

**The table.** `council_houses` belongs to the `themis-governance` deity group
(`src/config/deity_groups.ts:142-162`, `docs/sql/002-deity-backfill.sql:50-51`).
Its columns are known only through the generated layer — **(b)**:

| column | type | address in `src/lib/generated/supabase/database.types.ts` |
|---|---|---|
| `id` | uuid | `:1516` |
| `name` | text | `:1518` |
| `slug` | text | `:1522` |
| `description` | text null | `:1512` |
| `deity_alignment` | text null | `:1511` |
| `house_type` | text null | `:1514` |
| `icon_url` | text null | `:1515` |
| `display_order` | int | `:1513` |
| `member_count` | int | `:1517` |
| `seat_limit` | int null | `:1521` |
| `related_protocols` | text[] null | `:1519` |
| `responsibilities` | json null | `:1520` |
| `status` | `content_status` | `:1523` |
| `created_at`, `created_by`, `updated_at`, `updated_by` | | `:1509-1510`, `:1524-1525` |

Full block: `src/lib/generated/supabase/database.types.ts:1507-1566`; Row list
`:1508-1526`. `content_status` is `draft | published | archived` (`:6920`).
Mirror type file:
`src/lib/generated/types/themis-governance/council_houses.ts:18-47`.

**No definition on disk.** There is no `CREATE TABLE public.council_houses`,
no `ALTER TABLE`, no index, no constraint and no policy for it in
`supabase/migrations/` (four files) or `docs/sql/` (48 files). The only SQL
mention is a registry backfill list, `docs/sql/002-deity-backfill.sql:51`.
The table's existence, constraints, defaults, unique indexes and RLS are
therefore **(c)**.

**No enum for houses.** The Enums block
(`src/lib/generated/supabase/database.types.ts:6903-6994`) holds no house
enum. The token `council` appears in three unrelated enums and means three
different things: `user_role` (`:6978-6984`), `application_type` (`:6919`),
`subscription_tier` (`:6977`). None of them names a house.

**Handling level.** The generated header records `handling: system`
(`src/lib/generated/types/themis-governance/council_houses.ts:4`,
`src/app/api/generated/themis-governance/council_houses/route.ts:4`). In this
realm `system` denotes a published-read catalog
(`docs/sql/019-the-handling-levels-trued.sql:46-48`) — **(a)**.

**What the realm's own documents say it is.** Six route-group documents
describe it as the definitions of the Nine seats:

- `src/app/(prometheus)/README.md:213` — "Nine sovereign entity definitions"
- `src/app/(aethelred)/README.md:72` — "Entity definitions (future: dynamic from database)"
- `src/app/(cosmic)/README.md:58`, `:86`, `:118`
- `src/app/(mnemosyne)/README.md:92`, `:110`
- `src/app/(themis)/REALM-BUS.md:37`, `:196-206`
- `src/app/(aethelred)/REALM-BUS.md:71-77`, `:133-134`, `:192-196`

`docs/SUPERPOSITION-TABLE-REVIEW.md:257` and `SCHEMA-FINALIZE.md:91` both list
the table as active with no verdict and no column count recorded.

**The nine names live in code, not in SQL on disk.** Four separate hardcoded
lists — **(b)**:

- `src/components/asgard/domains/cosmic/theater/Theater.tsx:21-93` — `THE_TELLING`: name, domain, colour, description
- `src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx:12-22` — id, name, emoji, temperature, domain
- `src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx:94-104` — `HOUSE_COLORS`, nine slugs
- `src/lib/constants/cosmic/consciousness.ts:166-174` — nine `house_*` beam variants

The nine slugs are `hearth_keeper`, `chancellor`, `seer`, `aethelred`,
`curator`, `archivist`, `skald`, `codex`, `executioner`.

**A second sense of "house" exists on disk and is vessel-facing — (a).** The
sigil catalog seeds `House Aligned`, slug `house-aligned`, category `becoming`,
rarity `rare`, display_order 5, described as a council house chosen
(`docs/sql/008-the-library-first-seeds.sql:137`), and `Vessel Manifest`, which
names the claiming arc as light, name, face, ground, house
(`docs/sql/008-the-library-first-seeds.sql:142`). Award triggers for these
sigils are unwired (`docs/sql/008-the-library-first-seeds.sql:126-127`);
`sigil_unlocks` has no writer in app code — the only occurrences are registry
entries at `src/config/deity_groups.ts:111`, `src/config/enum_mapping.ts:90`,
`src/config/object_categories.ts:281`.

`FEATURE-BOARD.md:77` lists "council-house affiliation" among parked design
decisions.

### 2. How membership is modelled

**It is not.** No column, table, enum, foreign key or function on disk or in
the generated types links a vessel to a house.

- `community_profiles` — `src/lib/generated/supabase/database.types.ts:1252-1309`. No house column.
- `vessel_config` — `:6098-6199`. No house column.
- `user_private` — `:5820-5875`. No house column.
- `user_roles` — `:5877-5911`. Carries `role` of type `user_role`; not a house.
- `applications` — `:338-400`. Carries `application_type`, whose values include `council`; no house column.
- `quests` — `:4506-4523`. No house column.
- `resonance` — `:4842-4888`. No house column.

**No foreign key in either direction.** `council_houses` declares
`Relationships: []` (`:1565`), and no other table's `Relationships` block names
`council_houses` as a `referencedRelation` — the string occurs once in the
file, at `:1507`.

**Two columns imply membership and have no writer.** `member_count` (`:1517`,
not null with a default per the Insert block) and `seat_limit` (`:1521`).
Neither appears anywhere in app code outside the generated layer. Whether a
trigger maintains `member_count` in the remote is **(c)**.

**The birth chain assigns no house — (a).** `handle_new_user()`
(`docs/sql/007-the-vessel-arrives.sql:27-68`) inserts exactly three rows:
`community_profiles` (`:52-54`), `user_private` (`:57-59`), `vessel_config`
(`:62-64`). Each is keyed by `created_by = auth.uid()`; `id` is a fresh uuid.

**A field for it exists in the style mirror and is never supplied — (b).**
`SessionState.primaryHouse`
(`src/lib/constants/cosmic/consciousness.ts:103-104`) selects a beam variant
(`:130-133`). The identifier appears three times in the repo, all inside that
one mirror file.

**A badge helper exists and has no caller — (b).** `getHouseBadgeColor`
(`src/lib/utils/components/runes/card.utils.ts:229-232`) returns the same class
for every input; the only occurrence of the name in the tree is its own
declaration. Its class is at
`src/lib/constants/components/runes/card.constants.ts:217`.

**A prior journal records the same absence.**
`.journals/realm/2026-08-24-hestia-opus-build.md:34` — "The council house is
not a star because nothing in the schema says which house a vessel is in".

**RLS and constraints on `council_houses` — (c).** No policy for the table
exists in any file on disk. `docs/sql/009-library-doors-for-anyone.sql:32-38`
widens seven published-read catalogs to `TO public`; `council_houses` is not
among the seven, nor the eighth named at `:48-49`. Whether the table has RLS
enabled, and with which policies, cannot be read from disk.

**The generated API doors are wide — (b).**
`src/app/api/generated/themis-governance/council_houses/route.ts`:
- `GET` (`:14-44`) performs no auth check and no `status` filter; it selects `*`.
- `POST` (`:46-69`) requires only an authenticated user (`:48-49`); no role check.

`src/app/api/generated/themis-governance/council_houses/[id]/route.ts`:
- `GET` (`:14`), `PUT` (`:40`), `DELETE` (`:79`). Writes are authenticated-only,
  with no role gate in the route.

Whatever restricts writes is RLS in the remote — **(c)**.

### 3. Any page, form, action or route that chooses a house

**None exists.** Two surfaces read the catalog; neither writes it, and no
surface writes a membership.

1. **The Theater** —
   `src/components/asgard/domains/cosmic/theater/Theater.tsx:14` imports
   `useCouncilHousesList`; `:134` calls it; `:145-149` matches a row to a
   hardcoded telling entry by name, slug or `deity_alignment`; `:156-160` reads
   `responsibilities`. Reads only (`src/app/(cosmic)/README.md:118`).

2. **The Ancestors** —
   `src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx:39`
   fetches the generated route directly. This reader does not match the current
   schema — **(b)**:
   - Its local interface (`:12-20`) names `council_houses_id`, `display_name`,
     `emoji`, `color`, `primary_domain`. The table carries `id`, `name`,
     `icon_url`, `deity_alignment`, and no `emoji`, `color` or `primary_domain`.
   - Its query sends `is_active=true`. `getFilters`
     (`src/lib/api/auth.ts:153-164`) excludes only `page`, `limit`, `sort`,
     `order`, so this becomes `.eq('is_active', 'true')` at
     `src/app/api/generated/themis-governance/council_houses/route.ts:23-25`,
     against a column the table does not have.
   - Its query sends `order=order_index.asc`. `getSortParams`
     (`src/lib/api/auth.ts:169-176`) reads `sort` — absent, so `created_at` —
     and compares `order` against the literal `asc`, so the sort is
     `created_at` descending.
   - The fetch failure path is silent (`:40`).

3. **The Nexus council list** — `src/app/(aethelred)/nexus/council/page.tsx`
   renders `CouncilEntityList`, a static nine-entry array
   (`src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx:12-22`).
   No fetch.

4. **The Constellation** colours quest stars by house
   (`src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx:195`)
   from a field its own fetch hardcodes to the empty string (`:312`, `:316`);
   `quests` has no house column.

**The council route tree today.** `src/app/(themis)/council/` holds `page.tsx`
plus `admin`, `applications` (with `[id]`, `creator`, `vendor`), `curators`,
`delegation`, `ledger`, `proposals` (with `[id]`), `reports`, `voting`. No
`houses` segment. `src/app/(aethelred)/nexus/council/` holds `page.tsx` and
`[id]/page.tsx`. `src/app/(auth)/` holds `login`, `signup`, `forgot-password`,
`reset-password`, `logout`, `callback` — no onboarding route.

**Where a chooser belongs per the realm's own architecture documents.**

- The catalog is themis's to keep: `src/app/(aethelred)/REALM-BUS.md:71-77`
  names `council_houses` as living in themis-governance and files the
  three-rooms-one-contract seam — the Nexus council pages, cosmic's Theater and
  themis's table read one contract; `src/app/(themis)/REALM-BUS.md:196-206`
  records the Theater's read dialect.
- The vessel's own choices live in the Sanctum, `/vessel/sanctum`:
  `src/app/(hestia)/README.md:32-35` (route), `:69-73` (identity,
  accessibility, the ceremony switchboard), `:136` (Shape in the Sanctum).
- The existing writer for vessel choices is
  `src/app/api/auth/update-profile/route.ts` — `configUpdateSchema` at
  `:22-43`, the `vessel_config` update at `:88-100`, keyed on `created_by`
  (`:95`).

**Stale document.** `docs/architecture/database-schema.md:1-30` describes a
`profiles` table with `is_creator`, `is_vendor`, `is_admin` booleans. That
table was dissolved (`docs/sql/007-the-vessel-arrives.sql:6-8`). The document
has zero matches for `council` or `house`, as does
`docs/business/business-plan.md`.

---

## Gaps

**G1 — No membership object.** Nothing on disk or in the generated types
records which house a vessel is in — no column, join table, role or foreign
key. Addresses: `src/lib/generated/supabase/database.types.ts:1252-1309`,
`:6098-6199`, `:5877-5911`, `:1565`.

**G2 — No chooser.** No page, form, server action or API route in the tree
writes a house choice. The only writable doors touching `council_houses` edit
the catalog, not a membership
(`src/app/api/generated/themis-governance/council_houses/route.ts:46-69`,
`src/app/api/generated/themis-governance/council_houses/[id]/route.ts:40-98`).

**G3 — Catalog rows unverifiable.** Whether the nine rows exist in the remote,
and whether their `slug` values match the nine slugs hardcoded in four code
files, cannot be determined from disk — **(c)**. No seed file for
`council_houses` exists in `docs/sql/` or `supabase/migrations/`.

**G4 — Catalog read policy unverifiable.** `council_houses` is absent from the
list of catalogs opened to `TO public`
(`docs/sql/009-library-doors-for-anyone.sql:32-38`). Whether an anonymous or
authenticated read succeeds is **(c)**.

**G5 — The Ancestors reader cannot render a house.** Its column names, filter
and sort parameter all miss the current schema
(`src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx:12-20`,
`:39`, `:55`, `:57-64`), and its error path is silent (`:40`). Any chooser
built beside it inherits a listing surface that shows nothing.

**G6 — `member_count` has no maintainer on disk.**
`src/lib/generated/supabase/database.types.ts:1517`. No trigger, no code
writer. If a membership is added, this column is silently wrong unless it is
maintained or dropped.

**G7 — The claiming arc names a step that has no mechanism.** `House Aligned`
is seeded (`docs/sql/008-the-library-first-seeds.sql:137`) and `Vessel
Manifest` counts "house" as one of five (`:142`), while award triggers are
unwired (`:126-127`) and no house can be chosen.

**G8 — The catalog write door has no role gate in the route.** POST, PUT and
DELETE accept any authenticated user at the route layer
(`src/app/api/generated/themis-governance/council_houses/route.ts:48-49`,
`src/app/api/generated/themis-governance/council_houses/[id]/route.ts:40-98`).
Whatever stops a non-admin write is RLS in the remote — **(c)**.

**The gap, stated precisely:** a vessel cannot choose a council house because
no object in the schema can hold the choice, no policy governs writing it, and
no surface offers it. The catalog side may already stand in the remote; the
membership side does not exist anywhere on disk.

---

## Proposed design

Not built. Smallest correct closure, in run order.

### Step 1 — Confirm the catalog before adding anything to it

Read the remote for: existence of `public.council_houses`, its RLS state, its
policies, whether `slug` carries a unique index, and its row count with slugs.
This turns G3, G4 and G8 into facts. Nothing below is safe to run before this
read.

### Step 2 — The catalog's read door, if absent

Following the shape at `docs/sql/009-library-doors-for-anyone.sql:32-38`:

```sql
create policy "Anyone can view published council houses"
  on public.council_houses
  for select to public
  using (status = 'published');
```

Skip if an equivalent policy already stands.

### Step 3 — The nine rows, if absent

Insert nine rows carrying `name`, `slug`, `description`, `deity_alignment`,
`display_order`, `status = 'published'`, keyed on the slugs already fixed in
code: `hearth_keeper`, `chancellor`, `seer`, `aethelred`, `curator`,
`archivist`, `skald`, `codex`, `executioner`. Source text for name, domain and
description exists at
`src/components/asgard/domains/cosmic/theater/Theater.tsx:21-93` and
`src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx:12-22`.
Make it re-runnable with `on conflict (slug) do nothing` if the unique index
confirmed in step 1 exists.

### Step 4 — One column, not a table

The vessel's preferences already live on one own-only row. Following the
current idiom at `docs/sql/038-the-bubble-button-on-the-vessel.sql:9-10`:

```sql
alter table public.vessel_config
  add column if not exists council_house_id uuid
  references public.council_houses(id) on delete set null;
```

Nullable with no default: absence of choice means unchosen, matching the
opt-in shape at `supabase/migrations/20260729_ceremony_choices.sql:16-20`.

**No new policy is required for the membership.** `vessel_config` already
carries the four own-row policies
(`docs/sql/009-the-walls-learn-the-new-names.sql:118-134`); a new column on
that table is governed by them. That is the reason the column beats a table for
the one-house case.

A `council_house_members` table is the alternative, correct only if a vessel
may hold more than one house or the record must keep history. Its shape would
be `(id, created_by, council_house_id, joined_at)` with
`unique(created_by, council_house_id)` and the four own-row policies copied
from `docs/sql/009-the-walls-learn-the-new-names.sql:82-98`. It is strictly
more machinery and adds a second place a house can be recorded.

### Step 5 — Regenerate the typed layer

`npm run gaia` against the live schema, so `council_house_id` reaches
`src/lib/generated/supabase/database.types.ts` and the `vessel_config` types.
No hand edit of `src/lib/generated/`.

### Step 6 — One field on the existing writer

Add to `configUpdateSchema` at `src/app/api/auth/update-profile/route.ts:22-43`:

```ts
council_house_id: z.string().uuid().nullable().optional(),
```

The existing `vessel_config` update at `:88-100` then carries it. No new API
route, no server action, no second write path.

### Step 7 — One surface, in the Sanctum

A picker at `/vessel/sanctum`
(`src/app/(hestia)/vessel/sanctum/page.tsx`,
`src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx`), beside the
identity and ceremony controls the room already holds
(`src/app/(hestia)/README.md:69-73`). It lists published houses through the
generated hook `useCouncilHousesList`
(`src/lib/generated/hooks/themis-governance/council_houses.ts`, already used by
the Theater at
`src/components/asgard/domains/cosmic/theater/Theater.tsx:14`, `:134`) and
writes through the existing `PATCH /api/auth/update-profile`, the call shape
already used at
`src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx:118-140`.

### Step 8 — Mend the Ancestors reader in the same pass

`src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx:12-20`,
`:39`, `:55`, `:57-64` — read `id`, `name`, `description`, `icon_url`,
`deity_alignment`; filter `status=published`; sort with
`sort=display_order&order=asc`; surface the failure instead of swallowing it at
`:40`. Without this, the only other house-listing page in the tree stays blank.

### What this design does not do

It does not touch `user_role`, `application_type` or `subscription_tier` — the
`council` value in each is a separate axis. It does not maintain
`member_count`. It does not grant a sigil. It does not add a role gate to the
catalog's write routes. It does not open `user_private`, `user_financial`, or
any other vessel's `vessel_config`.

---

## Open to KP

1. **Changeable or once.** Whether a chosen house may be changed later, and if
   so whether a change overwrites or is recorded. The column overwrites; a
   members table can keep history.
2. **One house or several.** This is the choice between step 4's column and
   step 4's alternative table. Everything else in the design is identical.
3. **Do the nine rows exist in the remote, and do their slugs match the nine in
   code.** No seed exists on disk; step 3 is either needed or must be skipped.
   **(c)** until read.
4. **Is `member_count` kept.** Maintain by trigger, or drop as derivable.
   `src/lib/generated/supabase/database.types.ts:1517`.
5. **Is `House Aligned` granted at the choice.**
   `docs/sql/008-the-library-first-seeds.sql:137`. Sigil award machinery is
   unwired in general (`:126-127`); wiring one sigil is a larger decision than
   the chooser.
6. **Sanctum only, or also at arrival.** No onboarding route exists; adding one
   is a larger change than adding a control to the Sanctum.
7. **What a house does.** Whether affiliation is display only, or carries any
   capability, ordering, or visibility elsewhere.
8. **Whether the catalog's write routes carry a role gate.**
   `src/app/api/generated/themis-governance/council_houses/route.ts:46-69` and
   `src/app/api/generated/themis-governance/council_houses/[id]/route.ts:40-98`
   are generated files; a gate comes from RLS or from GAIA's template, not a
   hand edit.
9. **What `house_type` means.**
   `src/lib/generated/supabase/database.types.ts:1514`. No writer, no reader,
   no known value set. **(c)**.

---

## Addresses

### Schema — (b) unless marked

- `src/lib/generated/supabase/database.types.ts:1507-1566` — `council_houses` block
- `src/lib/generated/supabase/database.types.ts:1508-1526` — Row columns
- `src/lib/generated/supabase/database.types.ts:1565` — `Relationships: []`
- `src/lib/generated/supabase/database.types.ts:6920` — `content_status`
- `src/lib/generated/supabase/database.types.ts:6918` — `application_type`
- `src/lib/generated/supabase/database.types.ts:6975` — `subscription_tier`
- `src/lib/generated/supabase/database.types.ts:6976-6983` — `user_role`
- `src/lib/generated/supabase/database.types.ts:1252-1309` — `community_profiles`
- `src/lib/generated/supabase/database.types.ts:6098-6199` — `vessel_config`
- `src/lib/generated/supabase/database.types.ts:5820-5875` — `user_private`
- `src/lib/generated/supabase/database.types.ts:5877-5911` — `user_roles`
- `src/lib/generated/supabase/database.types.ts:338-400` — `applications`
- `src/lib/generated/supabase/database.types.ts:4506-4523` — `quests`
- `src/lib/generated/supabase/database.types.ts:4842-4888` — `resonance`
- `src/lib/generated/types/themis-governance/council_houses.ts:4` — handling level
- `src/lib/generated/types/themis-governance/council_houses.ts:18-47` — row and public types

### SQL on disk — (a)

- `docs/sql/002-deity-backfill.sql:50-51` — registry group assignment
- `docs/sql/007-the-vessel-arrives.sql:6-8` — the dissolved `profiles` table
- `docs/sql/007-the-vessel-arrives.sql:27-68` — `handle_new_user()`, three rows
- `docs/sql/008-the-library-first-seeds.sql:126-127` — award triggers unwired
- `docs/sql/008-the-library-first-seeds.sql:137` — `House Aligned` sigil
- `docs/sql/008-the-library-first-seeds.sql:142` — `Vessel Manifest` sigil
- `docs/sql/009-the-walls-learn-the-new-names.sql:82-98` — own-row policy shape
- `docs/sql/009-the-walls-learn-the-new-names.sql:118-134` — `vessel_config` policies
- `docs/sql/009-library-doors-for-anyone.sql:32-38`, `:48-49` — published-read catalogs opened to `public`
- `docs/sql/019-the-handling-levels-trued.sql:46-48` — `system` is a published-read catalog
- `docs/sql/027-the-public-face-DRAFT.sql:52-55` — read-policy idiom
- `docs/sql/038-the-bubble-button-on-the-vessel.sql:9-10` — current `vessel_config` column idiom
- `supabase/migrations/20260729_ceremony_choices.sql:16-20` — opt-in column idiom

### App code — (b)

- `src/components/asgard/domains/cosmic/theater/Theater.tsx:14`, `:21-93`, `:134`, `:145-149`, `:156-160`
- `src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx:12-20`, `:39`, `:40`, `:55`, `:57-64`
- `src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx:12-22`
- `src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx:38`, `:94-104`, `:195`, `:312`, `:316`
- `src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx:118-140`
- `src/app/api/generated/themis-governance/council_houses/route.ts:4`, `:14-44`, `:23-25`, `:46-69`
- `src/app/api/generated/themis-governance/council_houses/[id]/route.ts:14`, `:40`, `:79`
- `src/app/api/auth/update-profile/route.ts:22-43`, `:88-100`
- `src/lib/api/auth.ts:153-164`, `:169-176`
- `src/lib/constants/cosmic/consciousness.ts:103-104`, `:130-133`, `:166-174`
- `src/lib/utils/components/runes/card.utils.ts:229-232`
- `src/lib/constants/components/runes/card.constants.ts:217`
- `src/config/deity_groups.ts:111`, `:139-158`
- `src/config/enum_mapping.ts:58`, `:90`
- `src/config/object_categories.ts:281`

### Documents

- `docs/SUPERPOSITION-TABLE-REVIEW.md:257`
- `SCHEMA-FINALIZE.md:91`
- `FEATURE-BOARD.md:77`
- `src/app/(themis)/REALM-BUS.md:37`, `:196-206`
- `src/app/(aethelred)/REALM-BUS.md:71-77`, `:133-134`, `:192-196`
- `src/app/(cosmic)/README.md:58`, `:86`, `:118`
- `src/app/(mnemosyne)/README.md:92`, `:110`
- `src/app/(prometheus)/README.md:213`
- `src/app/(aethelred)/README.md:72`
- `src/app/(hestia)/README.md:32-35`, `:69-73`, `:136`
- `docs/architecture/database-schema.md:1-30` — stale; describes the dissolved `profiles` table
- `.journals/realm/2026-08-24-hestia-opus-build.md:34`
- `.journals/realm/2026-08-31-first-pass-opus.md:27`

### Not verifiable from disk — (c)

- Existence, columns, constraints, defaults and indexes of `public.council_houses` as they actually stand
- RLS enabled state and every policy on `council_houses`
- Row count and slug values in `council_houses`
- Whether any trigger maintains `council_houses.member_count`
- The meaning and value set of `council_houses.house_type`
- Whether `council_houses.slug` carries a unique index

---

## Verification run

Every address above was re-opened and its line number confirmed by
`sed -n "<line>p"` after the report was drafted. `npm run type-check` was not
run: it writes `tsconfig.tsbuildinfo`, and this survey changed no file except
this journal.
