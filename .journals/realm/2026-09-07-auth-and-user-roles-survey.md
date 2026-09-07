# Auth and user_roles survey — 2026-09-07

Read-only survey of the superposition base's role model as the repo records
it. Every claim carries an address and one of three grades:

- **(a)** present in a migration or SQL file on disk
- **(b)** referenced in app code
- **(c)** not verifiable from disk — lives only in the remote base

`src/lib/generated/supabase/database.types.ts` is a machine mirror of the
live schema. Facts drawn from it are graded **(b)**: they state what the
generator read, not what a file on disk declares.

---

## Findings

### 1. The role model

**The enum.** `user_role` carries six labels: `community`, `creator`,
`vendor`, `curator`, `council`, `admin`
(`src/lib/generated/supabase/database.types.ts:6978-6984`, and as a runtime
const at `:7247-7254`) — **(b)**. No `CREATE TYPE user_role` exists in
`docs/sql/` or `supabase/migrations/` — **(c)** for the DDL.

`sovereign_tier` is a separate enum — `dweller`, `guild`, `outlander`,
`sovereign_weaver` (`database.types.ts:6976`) — **(b)**. It is a column on
`community_profiles` (`database.types.ts:1266`), not a role. The app treats
the two as distinct axes (`src/lib/types/roles.ts:7`, `:63`).

**The table.** `user_roles` holds nine columns
(`database.types.ts:5877-5887`) — **(b)**:

| column | type |
|---|---|
| `id` | uuid, generated, optional on insert |
| `user_id` | uuid, required on insert |
| `role` | `user_role`, required on insert |
| `assigned_by` | uuid, nullable |
| `created_by` | uuid, nullable |
| `updated_by` | uuid, nullable |
| `created_at` | timestamp, defaulted |
| `updated_at` | timestamp, defaulted |
| `icon_emoji` | text, nullable |

The same shape is mirrored in the Zod validator
(`src/lib/generated/validators/hestia-core/user_roles.ts:28-38`) — **(b)**.

No `CREATE TABLE user_roles` exists on disk — **(c)** for the DDL, the
primary key, the FK on `user_id`, and any uniqueness constraint.
`Relationships: []` at `database.types.ts:5908` states only that no FK to
another `public` table was read; the generator does not record cross-schema
FKs to `auth.users` — `heralds.recipient` is declared
`references auth.users(id)` at
`supabase/migrations/20260720_heralds_recipient.sql:18` **(a)** and still
reports `Relationships: []` at `database.types.ts:3267` **(b)**.

**Related tables carrying a role.** A sweep of every `Row` block in
`database.types.ts` for columns named `role`, `tier`, `permission`,
`is_admin`, `is_creator`, `is_vendor` returns six hits — **(b)**:

- `user_roles.role` (`:5884`) — the `user_role` enum
- `community_profiles.sovereign_tier` (`:1266`) — the tier enum
- `grant_collaborators.role` (`:2993`), `ware_participants.role` (`:6573`),
  `work_participants.role` (`:6722`) — free-text `string | null`,
  collaboration credits, not access
- `patronage.tier` (`:3987`) — free-text `string | null`

No `profiles` table and no `is_admin` column exist anywhere in the mirror —
**(b)**. `applications` (`database.types.ts:338-358`) carries
`application_type`, `status`, `user_id`, `reviewed_by`, `verified_by`; it
holds no role column, and no on-disk path connects an approved application to
a `user_roles` row.

The `roles` table reached by
`src/app/api/generated/athena-gamification/access/roles/route.ts:21`
belongs to the **knowledge** base, not superposition — that route builds its
client with `createApiSupabase('knowledge')` (`:16`) — **(b)**.

### 2. RLS on user_roles

Four policies are defined on disk, all gated on the same predicate
(`docs/sql/010-the-window-moves-inside.sql:40-59`) — **(a)**:

| policy | command | predicate |
|---|---|---|
| `Admins can view all roles` | SELECT | `private.has_role(ARRAY['admin'])` |
| `Admins can assign roles` | INSERT | `private.has_role(ARRAY['admin'])` |
| `Admins can update roles` | UPDATE | `private.has_role(ARRAY['admin'])` |
| `Admins can delete roles` | DELETE | `private.has_role(ARRAY['admin'])` |

`private.has_role` is `SECURITY DEFINER`, `STABLE`, `search_path = public`,
and its body is exactly a row lookup in `user_roles`
(`docs/sql/010:24-33`) — **(a)**:

```sql
SELECT EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid() AND role = ANY (check_roles)
);
```

It lives in schema `private` (`docs/sql/010:18`), which PostgREST does not
expose, with `USAGE` to `authenticated` (`:22`) and `EXECUTE` revoked from
`PUBLIC`/`anon` (`:35-36`) — **(a)**. The earlier `public.has_role` of
`docs/sql/009-the-walls-learn-the-new-names.sql:36-48` is dropped at
`docs/sql/010:62` — **(a)**.

A fifth policy, `Users can view their own roles`, is named only inside a
comment (`docs/sql/009:33`) — **(c)**. No `CREATE POLICY` for it exists on
disk.

**Grants.** `docs/sql/006-restore-the-grants.sql:37-39` grants
`SELECT, INSERT, UPDATE, DELETE` on all public tables to `authenticated`,
`SELECT` to `anon`, and `ALL` to `service_role`; `:48-53` sets the same as
default privileges — **(a)**. RLS is stated ON for all 124 tables at
`docs/sql/006:9-12` — **(a)** as a measurement recorded in that file;
present state is **(c)**.

**Reach.** `docs/sql/009:10-12` records 90 admin-check policies across 75
tables that subquery `user_roles` — **(a)** as a recorded measurement.
`docs/sql/020-the-templates-aligned.sql:61` and `:79` corroborate the shape
`EXISTS (SELECT 1 FROM user_roles …)` as the base's admin-reach idiom, and
discard it when classifying ownership — **(a)**.

### 3. How a user gets a role today

**The birth chain does not grant one.** `handle_new_user()` inserts into
exactly three tables — `community_profiles`, `user_private`, `vessel_config`
(`docs/sql/007-the-vessel-arrives.sql:51-64`) — and its backfill covers the
same three (`:89`, `:107`, `:112`) — **(a)**. It is `SECURITY DEFINER` with
pinned `search_path` (`:27-31`), attached `AFTER INSERT ON auth.users` as
`on_auth_user_created` (`:79-82`), and has `EXECUTE` revoked from
`PUBLIC`/`anon`/`authenticated` (`:77`) — **(a)**. `user_roles` is not
touched.

**No SQL on disk inserts a role row.**
`grep -riE "insert into[[:space:]]+(public\.)?user_roles"` over `docs/sql/`
and `supabase/migrations/` returns nothing — **(a)** as an absence.

**One write path exists in app code, and no caller.** The generated route
`src/app/api/generated/hestia-core/user_roles/route.ts:46-59` POSTs an
insert. Its only app-side gate is "is signed in" (`:48-49`); the row is
written with `created_by: userId` (`:57`) and `assigned_by` is never set. Its
client is `createApiSupabase()` — the anon key plus the visitor's own cookies
(`src/lib/api/supabase.ts:33-35`) — so RLS decides. No component or page in
`src/` calls it: `grep -rn "from('user_roles')" src` returns five sites, all
of them reads except this insert and one delete — **(b)**.

**No service-role escape hatch in app code.** `createAdminSupabase()`
(`src/lib/api/supabase.ts:64-68`) returns `createApiSupabase()` unchanged —
the anon client — and has no caller in `src/`. The only env names referenced
anywhere in `src/` are `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`, `NEXT_PUBLIC_APP_URL`,
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `ARTIFACTS_VIEWERS`, `NODE_ENV`, `CI`,
`GITHUB_ACTIONS` — **(b)**. No service-role key name appears.

**The table is recorded empty.** `FEATURE-BOARD.md:13-14` lists as launch
gate 4: "First-user rites — KP in Supabase (user_roles EMPTY: seed admin +
creator; profile/vessel_config rows; Athena seed data; mythology RLS)."
Present row count is **(c)**.

`docs/SUPERPOSITION-TABLE-REVIEW.md:164` and `SCHEMA-FINALIZE.md:321` list
`user_roles` with no further columns filled.

### 4. Who reads a role, and whether it works

**Client, working.** `useUser()` fetches
`/api/generated/hestia-core/user_roles?user_id=<id>&limit=20`
(`src/lib/hooks/useUser.ts:57-60`) and derives `isAdmin`, `isCreator`,
`isVendor` from `roles.includes(...)` (`:118-120`) — **(b)**. This is the
only role read the app actually relies on. Its consumers:

- `src/components/asgard/domains/themis/admin/AdminHub.tsx:20-23`
- `src/components/asgard/domains/themis/council/CouncilHub.tsx:104-105`
- `src/components/asgard/domains/themis/applications/ApplicationsHub.tsx:53`
- `src/components/asgard/domains/themis/delegation/DelegationHub.tsx:17`
- `src/components/asgard/domains/themis/proposals/ProposalDetail.tsx:102`
- `src/components/asgard/domains/themis/proposals/ProposalsGallery.tsx:84`
- `src/components/asgard/domains/themis/reports/ReportsHub.tsx:48`
- `src/components/asgard/domains/themis/voting/VotingHub.tsx:69`
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx:120`
- `src/components/asgard/domains/hermes/studio/StudioShelf.tsx:49`
- `src/components/asgard/domains/hestia/vessel/VesselContent.tsx:144`, `:183-187`
- `src/lib/constants/systems/environments/contexts.tsx:112`

**Server, working.** `isAdmin(userId)` at `src/lib/api/auth.ts:68-76` reads
`user_roles` and tests `role === 'admin'` — **(b)**. Its client is
`createServerSupabase()`, the visitor's own session, so it sees only rows the
visitor's RLS permits.

**Server, non-functional (1).** `src/lib/auth.ts:42-46` selects `*` from
`community_profiles` and casts the row to a `Profile` interface declaring
`is_admin`, `is_creator`, `is_vendor`, `is_quantum_weaver` (`:19-22`),
`user_tier` (`:17`) and `sovereignty_score` (`:18`). None of those six
columns exist on `community_profiles` (`database.types.ts:1253-1271`).
`isAdmin()` (`:81-84`), `isCreator()` (`:89-92`), `isVendor()` (`:97-100`)
and `isQuantumWeaver()` (`:105-108`) therefore return `false` always, as does
`useServerUser()` (`src/lib/hooks/useUser.server.ts:30-33`) — **(b)**.

**Server, non-functional (2).** `src/lib/auth/admin.ts:2-10` queries a table
`profiles` for `is_admin` keyed on `profiles_id`. No `profiles` table and no
`is_admin` column exist in the mirror. Its one caller is
`src/app/api/auth/checkout/session/[id]/route.ts:24` — **(b)**.

**Two API routes return roles.** `src/app/api/auth/session/route.ts:21-24`
and `src/app/api/auth/users/me/route.ts:18-22` both read `user_roles.role` by
`user_id` and return a role array (`session:33`, `me:25`); `me:33` branches
wares on `creator`/`vendor` — **(b)**.

### 5. The guard and the layouts

`src/proxy.ts:10-18` calls `updateSession(request)` and nothing else. It reads
no role, no table, and makes no redirect. `updateSession`
(`src/lib/supabase/middleware.ts:9-129`) refreshes the auth cookie (`:98`) and
sweeps stale cookies; it performs no authorization. The matcher
(`src/proxy.ts:29-31`) exempts static assets and `/grimoire` only — **(b)**.

The tree holds exactly one layout, `src/app/layout.tsx`. It renders chrome,
navigation and children (`:23-42`); it reads no role and calls no `redirect`
— **(b)**.

Every role gate in the app is therefore client-side, inside a rendered
component, after the page has already been served.

---

## Gaps

**G1 — the bootstrap deadlock.** The only INSERT policy on `user_roles`
requires `private.has_role(ARRAY['admin'])` (`docs/sql/010:45-48`, **a**),
and that function returns true only when a matching row already exists in
`user_roles` (`docs/sql/010:24-33`, **a**). With the table empty
(`FEATURE-BOARD.md:13`), no authenticated session can insert the first row
through PostgREST or through the app. The only actors RLS does not apply to
are the dashboard SQL editor and `service_role` — which holds `ALL` on every
public table (`docs/sql/006:39`, **a**) and whose key is referenced nowhere
in `src/`.

**G2 — the deadlock is total, not local.** 90 admin-check policies across 75
tables subquery `user_roles` (`docs/sql/009:10-12`, **a**). While the table is
empty, every one of those evaluates false for every user.

**G3 — no surface to indicate or set a role.** No page, component, server
action, or hand-written API route in `src/` writes `user_roles`.
`AdminHub.tsx:11` links to `/council/admin/users`; the tree holds
`src/app/(themis)/council/admin/page.tsx` and no `users/` beneath it.

**G4 — no role appears on the birth chain.** `handle_new_user()` fills three
tables and not `user_roles` (`docs/sql/007:51-64`, **a**). A new account has
no role row of any kind, including `community`.

**G5 — the DDL is not on disk.** The `user_role` enum, the `user_roles` table,
its primary key, any FK on `user_id`, any uniqueness on `(user_id, role)`, and
the `Users can view their own roles` policy named at `docs/sql/009:33` all
exist only in the remote — **(c)**. The repo cannot reconstruct the table.

**G6 — two of three server-side role readers read objects that do not
exist.** `src/lib/auth.ts:81-108` and `src/lib/hooks/useUser.server.ts:30-33`
read columns absent from `community_profiles`; `src/lib/auth/admin.ts:2-10`
reads a table absent from the schema. All return `false` regardless of the
row's contents.

**G7 — the delete path's ownership check cannot succeed.**
`src/app/api/generated/hestia-core/user_roles/[id]/route.ts:48` calls
`checkOwnership(userId, 'user_roles', id)`, which derives the key column as
`` `${tableName}_id` `` → `user_roles_id` (`src/lib/api/auth.ts:89`) and
filters on it (`:94`). The table's key is `id` (`database.types.ts:5883`).
The check always returns false; deletion falls through to `isAdmin` alone.

**G8 — `assigned_by` is never written.** The column exists
(`database.types.ts:5879`) and the insert validator accepts it
(`validators/hestia-core/user_roles.ts:29`); the only insert site writes
`created_by` alone (`route.ts:57`).

---

## Proposed design

Not built. Five pieces, smallest first.

### Piece 1 — one seed file, run at the dashboard

`docs/sql/039-<name>.sql` (numbering continues
`038-the-bubble-button-on-the-vessel.sql`). Run in the Supabase SQL editor,
which executes as an owner role and is not subject to RLS — the one actor
that can break G1 without a service-role key.

```sql
insert into public.user_roles (user_id, role)
select id, 'admin'::public.user_role from auth.users
on conflict do nothing;
```

The `where` clause and the set of roles are KP's (see Open to KP 1, 2). The
`(select id from auth.users limit 1)` shape is the precedent already used at
`docs/sql/008-the-first-vessel-rite.sql:35` and
`docs/sql/011-the-rows-come-home.sql:47`.

This alone closes G1 and G2 and adds the needed rows.

### Piece 2 — the own-row read policy, written down

In the same file, idempotent:

```sql
drop policy if exists "Users can view their own roles" on public.user_roles;
create policy "Users can view their own roles" on public.user_roles
  for select to authenticated
  using (user_id = auth.uid());
```

The policy is assumed by `docs/sql/009:33` and by every client read at
`src/lib/hooks/useUser.ts:57-60`, and is not defined on disk. Writing it makes
the client read deterministic and puts one line of G5 into the repo.

### Piece 3 — the uniqueness that makes `on conflict` meaningful

```sql
create unique index if not exists user_roles_user_id_role_key
  on public.user_roles (user_id, role);
```

Safe whether or not the constraint already exists remotely. Shape depends on
Open to KP 3.

### Piece 4 — the way to indicate a role

Two parts, both at addresses the app already names.

*Display.* `src/components/asgard/domains/hestia/vessel/VesselContent.tsx:183-187`
already renders badges for `creator`, `vendor`, `curator`, `council`. One
added line renders `admin`. No new file.

*Grant.* `src/app/(themis)/council/admin/users/page.tsx` — the exact route
`AdminHub.tsx:11` already links to — rendering
`src/components/asgard/domains/themis/admin/UsersHub.tsx`, gated on
`roles.includes('admin')` in the same shape as `AdminHub.tsx:20-23`. It reads
`community_profiles` and `user_roles` through the existing generated routes,
and writes through the existing
`POST /api/generated/hestia-core/user_roles` (`route.ts:46-59`). No new API
route. The `Admins can view all roles` policy (`docs/sql/010:40-43`) already
permits the list; the `Admins can assign roles` policy (`:45-48`) is the real
gate on the write, and the client-side check is cosmetic.

This closes G3.

### Piece 5 — adjacent, not required by the ask

- Repoint or delete `src/lib/auth/admin.ts:2-10`; its one caller
  (`src/app/api/auth/checkout/session/[id]/route.ts:24`) can call `isAdmin`
  from `src/lib/api/auth.ts:68` instead. (G6)
- Repoint or delete the four role predicates in `src/lib/auth.ts:81-108` and
  the four in `src/lib/hooks/useUser.server.ts:30-33`. (G6)
- Fix the key-column derivation at `src/lib/api/auth.ts:89` or bypass
  `checkOwnership` for `user_roles`. (G7)

G4 (`community` on the birth chain) and G8 (`assigned_by`) are held for
Open to KP 6 and 5.

---

## Open to KP

1. **Which rows the first account gets** — `admin` alone, `admin` + `creator`
   (both named at `FEATURE-BOARD.md:13-14`), or all six labels.
2. **How the seed names the account** — an email literal, or
   `(select id from auth.users limit 1)` as at `docs/sql/008:35` and
   `docs/sql/011:47`.
3. **One row per user, or many** — the table shape and every reader treat
   roles as a set (`roles: UserRole[]`, `src/lib/hooks/useUser.ts:118-120`;
   `RoleFlags.roles?: UserRole[]`, `src/lib/types/roles.ts:71`). This decides
   whether the unique index of Piece 3 is `(user_id, role)` or `(user_id)`.
4. **Whether `admin` shows as a badge** — the vessel currently shows four role
   badges and omits `admin` (`VesselContent.tsx:183-187`).
5. **Whether the grant surface writes `assigned_by`** — the column exists
   (`database.types.ts:5879`) and nothing writes it.
6. **Whether `community` is an implicit default (no row) or an explicit row at
   signup** — this decides whether `handle_new_user()` (`docs/sql/007:27-68`)
   gains a fourth insert.
7. **Whether the two dead server readers are repointed or deleted**
   (`src/lib/auth.ts:81-108`, `src/lib/auth/admin.ts:2-10`).
8. **Whether role gating moves server-side** — today no layout and no guard
   reads a role (`src/proxy.ts:10-18`, `src/app/layout.tsx:23-42`); every gate
   renders after the page is served.

---

## Verification

Every file cited above was re-opened and its line numbers confirmed by
`sed -n` before this file was written. The absence claims were confirmed by:

```
grep -rniE "create table[^;]*\buser_roles\b" docs/sql supabase/migrations   -> exit 1
grep -rniE "create type[[:space:]]+(public\.)?user_role\b" docs/sql supabase/migrations -> exit 1
grep -rniE "create policy[^;]*user_roles" docs/sql supabase/migrations | grep -vi "Admins can" -> exit 1
grep -rniE "insert into[[:space:]]+(public\.)?user_roles" docs/sql supabase/migrations -> exit 1
```

`npm run type-check` was not run: `tsc --noEmit` with `"incremental": true`
(`tsconfig.json:19`) writes `tsconfig.tsbuildinfo` into the repo, and this
pass writes no file but this one. No database was contacted. No `.env` was
opened.

---

## Addresses

**SQL on disk (a)**
- `docs/sql/006-restore-the-grants.sql:9-12`, `:37-39`, `:41`, `:48-53`
- `docs/sql/007-the-vessel-arrives.sql:5`, `:27-31`, `:51-64`, `:66`, `:77`, `:79-82`, `:89`, `:107`, `:112`
- `docs/sql/008-the-first-vessel-rite.sql:35`
- `docs/sql/009-the-walls-learn-the-new-names.sql:8-12`, `:33`, `:36-48`, `:52-71`
- `docs/sql/010-the-window-moves-inside.sql:18`, `:22`, `:24-33`, `:35-36`, `:40-59`, `:62`
- `docs/sql/011-the-rows-come-home.sql:47`
- `docs/sql/013-the-consent-record-DRAFT.sql:40`, `:58`, `:88`
- `docs/sql/020-the-templates-aligned.sql:61`, `:79`
- `supabase/migrations/20260720_heralds_recipient.sql:18`

**Generated mirror (b)**
- `src/lib/generated/supabase/database.types.ts:338-358`, `:1252-1271`, `:3267`, `:5877-5887`, `:5908`, `:6901`, `:6976`, `:6978-6984`, `:7247-7254`
- `src/lib/generated/supabase/enum_mapping.ts:114-119`
- `src/lib/generated/validators/hestia-core/user_roles.ts:28-38`
- `src/lib/generated/types/hestia-core/user_roles.ts:17-19`

**App code (b)**
- `src/proxy.ts:10-18`, `:29-31`
- `src/app/layout.tsx:23-42`
- `src/lib/supabase/middleware.ts:9-10`, `:98`
- `src/lib/api/auth.ts:68-76`, `:81-98` (`:89`, `:94`)
- `src/lib/api/supabase.ts:33-35`, `:64-68`
- `src/lib/auth.ts:11-27`, `:42-50`, `:81-108`
- `src/lib/auth/admin.ts:2-10`
- `src/lib/hooks/useUser.ts:15`, `:57-60`, `:118-122`
- `src/lib/hooks/useUser.server.ts:30-33`
- `src/lib/types/roles.ts:7`, `:63`, `:65-72`, `:89-108`, `:163-169`
- `src/app/api/auth/session/route.ts:21-24`, `:33`
- `src/app/api/auth/users/me/route.ts:18-22`, `:25`, `:33`
- `src/app/api/auth/checkout/session/[id]/route.ts:24`
- `src/app/api/generated/hestia-core/user_roles/route.ts:21`, `:46-59`
- `src/app/api/generated/hestia-core/user_roles/[id]/route.ts:45-50`, `:53`
- `src/app/api/generated/athena-gamification/access/roles/route.ts:16`, `:21`
- `src/app/(themis)/council/admin/page.tsx`
- `src/app/(hephaestus)/forge/architecture/auth-flow/page.tsx:152`
- `src/app/artifacts-proxy/[[...path]]/route.ts:111-119`
- `src/components/asgard/domains/themis/admin/AdminHub.tsx:11`, `:20-23`
- `src/components/asgard/domains/themis/council/CouncilHub.tsx:104-105`
- `src/components/asgard/domains/themis/applications/ApplicationsHub.tsx:16-17`, `:53`
- `src/components/asgard/domains/hestia/vessel/VesselContent.tsx:144`, `:183-187`
- `src/lib/constants/systems/environments/contexts.tsx:89`, `:112`
- `src/config/deity_groups.ts:28`
- `src/config/excluded_functions.ts:8`

**Repo records**
- `FEATURE-BOARD.md:13-14`
- `docs/SUPERPOSITION-TABLE-REVIEW.md:164`
- `SCHEMA-FINALIZE.md:321`
- `tsconfig.json:19`
