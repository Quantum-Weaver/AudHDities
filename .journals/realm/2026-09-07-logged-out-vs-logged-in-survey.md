# Logged out vs logged in — a read-only survey of every route and its guard

Survey date 2026-09-07. Read-only: no file in `src/`, `supabase/`, or `docs/`
was changed. Every fact below carries an address. Three grades are used:

- **(a)** present in a migration or SQL file on disk
- **(b)** referenced in app code
- **(c)** cannot be verified from disk — it lives only in the remote base

## The guard

`src/proxy.ts:10-18` is the whole request guard. Its body is one call:
`return await updateSession(request)`. `updateSession`
(`src/lib/supabase/middleware.ts:9-129`) creates a Supabase server client on
the anon key (`:74-95`), calls `supabase.auth.getUser()` to refresh an expired
token (`:98`), sweeps stale host-only auth cookies in production (`:115-126`),
and returns `supabaseResponse` (`:128`). **It contains no redirect and no
status other than `NextResponse.next()`** — `grep -c redirect
src/lib/supabase/middleware.ts` returns `0`. The proxy therefore refreshes
sessions; it gates nothing.

The matcher (`src/proxy.ts:29-31`) is
`'/((?!_next/static|_next/image|favicon.ico|grimoire$|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'`.
It covers every page route and every route handler in this survey except the
exact path `/grimoire`. Since `updateSession` never redirects, matcher
coverage does not change any route's access state — a route inside the matcher
is exactly as open as a route outside it.

There is **one `layout.tsx` in the whole app**: `src/app/layout.tsx`
(`find src/app -name "layout.*" | wc -l` = 1). It renders `LayoutChrome`,
`AuthButton`, `Navigation`, `Footer` and `{children}` (`:23-42`). No route
group has a layout of its own, so no route group has a layout gate.

Exactly three files under `src/app` call `redirect(`:

| file | line | what it does |
|:---|:---|:---|
| `src/app/page.tsx` | 38 | `if (!user) redirect(AUTH_ROUTES.SANCTUARY)` — the only server-side session gate on any page |
| `src/app/(hestia)/dashboard/page.tsx` | 6 | `redirect('/vessel')` — unconditional stub |
| `src/app/(hephaestus)/forge/architecture/database-schema/page.tsx` | 6 | `redirect('/observatory/schema')` — unconditional stub |

`src/app/page.tsx:36-37` is the only `page.tsx` in the tree that reads the
session server-side (`grep -rn "auth.getUser\|auth.getSession" --include=page.tsx src/app`
returns one line).

`src/contexts/` holds one file, `ContinuityBeamContext.tsx`. It carries no
auth state and no guard.

The client-side guard is `src/components/asgard/auth/AuthGuard.tsx`. Its
default is `requireAuth = true` (`:62`); when required and absent it pushes to
`/login` (`:75-81`) and renders `null` (`:103`); when `requireAuth={false}` and
a user was signed in on arrival it pushes to `/vessel` or a same-site
`?redirect=` (`:82-87`). It is imported by exactly four pages, all under
`(auth)`:

- `src/app/(auth)/login/page.tsx:41` — `requireAuth={false}`
- `src/app/(auth)/signup/page.tsx:40` — `requireAuth={false}`
- `src/app/(auth)/forgot-password/page.tsx:40` — `requireAuth={false}`
- `src/app/(auth)/reset-password/page.tsx:40` — default, so `requireAuth=true`

`src/components/asgard/auth/ProtectedRoute.tsx` (which composes
`useRequireAuth` and `useRequireRole`, `:18-19`) is **imported by no page and
no component**. `src/lib/hooks/useRequireAuth.ts` and `useRequireRole.ts` are
reached only through it. The role-aware route guard exists and is unwired.

`src/lib/constants/systems/environments/navigation.ts` marks doors
`requiresAuth` (`:76-82`), `userTiers` (`:62,64,66,81`) and `minSovereignty`
(`:65`); `filterNavigation` (`:96-103`) drops them from the rendered nav bar.
That is visibility only — the URL still answers.

**In one line: the only route-level session gate in the app is
`src/app/page.tsx:38` on `/`, plus a client-side one on `/reset-password`.
Everything else that looks private is reachable by URL with no session, and
Postgres RLS is what decides whether it shows anything.**

## The route table

146 `page.tsx` files, 353 `route.ts` files. Counts by access state:

| | OPEN | SESSION | ROLE | UNCLEAR |
|:---|---:|---:|---:|---:|
| pages (146) | 144 | 2 | 0 route-level (12 content-level) | 0 |
| route handlers (353) | 330 | 22 | 0 | 0 |

The one route handler that is neither is `POST /api/webhook/stripe`, gated on
an HMAC signature (`src/app/api/webhook/stripe/route.ts:13-31`); it is counted
under OPEN above because no session is involved.

"OPEN route / ROLE content" means the URL renders for a visitor with no
session and the page's own component then branches on `roles` from
`src/lib/hooks/useUser.ts` and shows a restricted panel instead of the tools.
`data it reads` traces the page and its imported components four levels deep;
`chrome: community_profiles, user_roles` marks the two reads that
`useAuth`/`useUser` perform on every page that mounts them
(`src/lib/hooks/useAuth.ts:38`, `src/lib/hooks/useUser.ts:58-59`).

### Pages

| URL | Group | Access | Guard address | Data it reads | Notes |
|:---|:---|:---|:---|:---|:---|
| `/` | (root) | SESSION | src/app/page.tsx:38 | chrome: community_profiles, user_roles | server redirect to /sanctuary when no user |
| `/about` | (hephaestus) | OPEN | none | none |  |
| `/accessibility` | (hephaestus) | OPEN | none | none |  |
| `/apps/privacy` | (hephaestus) | OPEN | none | none |  |
| `/bazaar` | (hermes) | OPEN | none | none |  |
| `/bazaar/artisans` | (hermes) | OPEN | none | `/api/generated/hermes-social/artisan_profiles` |  |
| `/bazaar/artisans/[id]` | (hermes) | OPEN | none | `/api/generated/hermes-social/artisan_profiles/`; `/api/generated/hermes-social/works` |  |
| `/bazaar/checkout` | (hermes) | OPEN | none | none |  |
| `/bazaar/checkout/cancel` | (hermes) | OPEN | none | none |  |
| `/bazaar/checkout/success` | (hermes) | OPEN | none | none |  |
| `/bazaar/contributions` | (hermes) | OPEN | none | `/api/generated/hermes-social/work_participants`; `/api/generated/plutus-economics/ware_participants`; chrome: community_profiles, user_roles |  |
| `/bazaar/creations` | (hermes) | OPEN | none | none |  |
| `/bazaar/creations/[id]` | (hermes) | OPEN | none | none |  |
| `/bazaar/creators` | (hermes) | OPEN | none | none |  |
| `/bazaar/creators/[id]` | (hermes) | OPEN | none | none |  |
| `/bazaar/merchants` | (hermes) | OPEN | none | `/api/generated/hermes-social/merchant_profiles` |  |
| `/bazaar/merchants/[id]` | (hermes) | OPEN | none | `/api/generated/hermes-social/merchant_profiles/` |  |
| `/bazaar/studio` | (hermes) | OPEN route / ROLE content | StudioShelf.tsx:49 | `/api/generated/hermes-social/works`; `/api/generated/plutus-economics/wares`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/bazaar/studio/[id]` | (hermes) | OPEN | none | `/api/generated/plutus-economics/wares/`; chrome: community_profiles, user_roles |  |
| `/bazaar/studio/ware` | (hermes) | OPEN route / ROLE content | StudioForm.tsx:120 | `/api/generated/hephaestus-infrastructure/file_registry`; `/api/generated/hermes-social/works`; `/api/generated/hermes-social/works/`; `/api/generated/plutus-economics/wares`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/bazaar/studio/work` | (hermes) | OPEN route / ROLE content | StudioForm.tsx:120 | `/api/generated/hephaestus-infrastructure/file_registry`; `/api/generated/hermes-social/works`; `/api/generated/hermes-social/works/`; `/api/generated/plutus-economics/wares`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/bazaar/vendors` | (hermes) | OPEN | none | none |  |
| `/bazaar/vendors/[id]` | (hermes) | OPEN | none | none |  |
| `/bazaar/wares` | (hermes) | OPEN | none | `/api/generated/hermes-social/works`; `/api/generated/plutus-economics/wares` |  |
| `/bazaar/wares/[id]` | (hermes) | OPEN | none | `/api/auth/checkout`; `/api/auth/wares/`; `/api/generated/hermes-social/artisan_profiles/`; `/api/generated/plutus-economics/exchanges`; `/api/generated/plutus-economics/wares/`; chrome: community_profiles, user_roles |  |
| `/bazaar/works/[id]` | (hermes) | OPEN | none | `/api/generated/hermes-social/artisan_profiles/`; `/api/generated/hermes-social/work_participants`; `/api/generated/hermes-social/works/`; chrome: community_profiles, user_roles |  |
| `/calling` | (hephaestus) | OPEN | none | none |  |
| `/connect` | (iris) | OPEN | none | chrome: community_profiles, user_roles |  |
| `/connect/channels` | (iris) | OPEN | none | `/api/generated/hermes-social/channels` |  |
| `/connect/channels/[id]` | (iris) | OPEN | none | `/api/generated/hermes-social/channels/` |  |
| `/connect/emeralds` | (iris) | OPEN | none | `/api/generated/mnemosyne-assessment/resonance`; chrome: community_profiles, user_roles |  |
| `/connect/feed` | (iris) | OPEN | none | `/api/generated/hermes-social/posts` |  |
| `/connect/invitations` | (iris) | OPEN | none | chrome: community_profiles, user_roles |  |
| `/connect/messages` | (iris) | OPEN | none | `/api/generated/iris-communications/messages`; chrome: community_profiles, user_roles |  |
| `/connect/messages/[id]` | (iris) | OPEN | none | `/api/generated/iris-communications/messages`; chrome: community_profiles, user_roles |  |
| `/connect/support` | (iris) | OPEN | none | `/api/generated/iris-communications/contact_submissions`; chrome: community_profiles, user_roles |  |
| `/connect/support/[id]` | (iris) | OPEN | none | `/api/generated/iris-communications/contact_submissions/` |  |
| `/connect/translations` | (iris) | OPEN | none | none |  |
| `/contact` | (hephaestus) | OPEN | none | `/api/generated/iris-communications/contact_submissions` |  |
| `/council` | (themis) | OPEN route / ROLE content | CouncilHub.tsx:104 | chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/admin` | (themis) | OPEN route / ROLE content | AdminHub.tsx:21 | chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/applications` | (themis) | OPEN route / ROLE content | ApplicationsHub.tsx:53 | `/api/generated/themis-governance/applications`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/applications/[id]` | (themis) | OPEN | none | none |  |
| `/council/applications/creator` | (themis) | OPEN | none | `/api/generated/themis-governance/applications`; chrome: community_profiles, user_roles |  |
| `/council/applications/vendor` | (themis) | OPEN | none | `/api/generated/themis-governance/applications`; chrome: community_profiles, user_roles |  |
| `/council/curators` | (themis) | OPEN | none | none |  |
| `/council/delegation` | (themis) | OPEN route / ROLE content | DelegationHub.tsx:17 | chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/ledger` | (themis) | OPEN | none | `/api/generated/plutus-economics/ledger` |  |
| `/council/proposals` | (themis) | OPEN route / ROLE content | ProposalsGallery.tsx:84 | `/api/generated/themis-governance/proposals`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/proposals/[id]` | (themis) | OPEN route / ROLE content | ProposalDetail.tsx:102 | `/api/generated/themis-governance/proposals/`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/reports` | (themis) | OPEN route / ROLE content | ReportsHub.tsx:48 | `/api/generated/themis-governance/reports`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/council/voting` | (themis) | OPEN route / ROLE content | VotingHub.tsx:69 | `/api/generated/themis-governance/proposals`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/dashboard` | (hestia) | OPEN | src/app/(hestia)/dashboard/page.tsx:6 | none | redirect stub to /vessel |
| `/effects` | (cosmic) | OPEN | none | none |  |
| `/environments` | (cosmic) | OPEN | none | none |  |
| `/environments/[id]` | (cosmic) | OPEN | none | `/api/auth/update-profile`; `/api/generated/hestia-core/vessel_config`; chrome: community_profiles, user_roles |  |
| `/forge` | (hephaestus) | OPEN | none | none |  |
| `/forge/architecture/auth-flow` | (hephaestus) | OPEN | none | none |  |
| `/forge/architecture/database-schema` | (hephaestus) | OPEN | src/app/(hephaestus)/forge/architecture/database-schema/page.tsx:6 | none | redirect stub to /observatory/schema |
| `/forge/architecture/residual-system` | (hephaestus) | OPEN | none | none |  |
| `/forge/business/ecosystem` | (hephaestus) | OPEN | none | none |  |
| `/forge/business/plan` | (hephaestus) | OPEN | none | none |  |
| `/forge/guides/artisan-onboarding` | (hephaestus) | OPEN | none | none |  |
| `/forge/guides/merchant-onboarding` | (hephaestus) | OPEN | none | none |  |
| `/forge/guides/neurodivergent-ux` | (hephaestus) | OPEN | none | none |  |
| `/forgot-password` | (auth) | OPEN | src/app/(auth)/forgot-password/page.tsx:40 -> AuthGuard.tsx:82 | chrome: community_profiles, user_roles | inverse guard: a signed-in visitor is pushed to /vessel |
| `/library` | (athena) | OPEN | none | none |  |
| `/library/badges` | (athena) | OPEN | none | `/api/generated/athena-gamification/sigils`; `/api/generated/athena-gamification/sigils/`; `/api/generated/hestia-core/vessel_sigils`; chrome: community_profiles, user_roles |  |
| `/library/badges/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/sigils`; `/api/generated/athena-gamification/sigils/` |  |
| `/library/bubbles` | (athena) | OPEN | none | `/api/generated/athena-gamification/bubbles`; `/api/generated/athena-gamification/bubbles/`; `/api/generated/hestia-core/collection_sets`; `/api/generated/hestia-core/collection_sets/`; `/api/generated/hestia-core/vessel_bubbles`; chrome: community_profiles, user_roles |  |
| `/library/bubbles/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/bubbles`; `/api/generated/athena-gamification/bubbles/`; `/api/generated/hestia-core/collection_sets`; `/api/generated/hestia-core/collection_sets/` |  |
| `/library/bubbles/play` | (athena) | OPEN | none | `/api/auth/update-profile`; `/api/generated/athena-gamification/bubbles`; `/api/generated/hestia-core/collection_sets`; `/api/generated/hestia-core/vessel_bubbles`; `/api/generated/hestia-core/vessel_config`; chrome: community_profiles, user_roles |  |
| `/library/courses` | (athena) | OPEN | none | `/api/generated/athena-gamification/learning_paths`; `/api/generated/athena-gamification/learning_paths/` |  |
| `/library/courses/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/learning_paths`; `/api/generated/athena-gamification/learning_paths/`; `/api/generated/athena-gamification/lessons`; `/api/generated/athena-gamification/lessons/`; `/api/generated/athena-gamification/path_lessons` |  |
| `/library/dailies` | (athena) | OPEN | none | none |  |
| `/library/dailies/sudoku` | (athena) | OPEN | none | none |  |
| `/library/knowledge` | (athena) | OPEN | none | `/api/generated/athena-gamification/mythology`; `/api/generated/athena-gamification/mythology/` |  |
| `/library/knowledge/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/mythology`; `/api/generated/athena-gamification/mythology/` |  |
| `/library/lessons` | (athena) | OPEN | none | `/api/generated/athena-gamification/lessons`; `/api/generated/athena-gamification/lessons/` |  |
| `/library/lessons/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/lessons`; `/api/generated/athena-gamification/lessons/` |  |
| `/library/quests` | (athena) | OPEN | none | `/api/generated/athena-gamification/quests`; `/api/generated/athena-gamification/quests/` |  |
| `/library/quests/[slug]` | (athena) | OPEN | none | `/api/generated/athena-gamification/quests`; `/api/generated/athena-gamification/quests/` |  |
| `/login` | (auth) | OPEN | src/app/(auth)/login/page.tsx:40 -> AuthGuard.tsx:82 | chrome: community_profiles, user_roles | inverse guard: a signed-in visitor is pushed to /vessel |
| `/nexus` | (aethelred) | OPEN | none | none |  |
| `/nexus/api` | (aethelred) | OPEN | none | none |  |
| `/nexus/bridge` | (aethelred) | OPEN | none | none |  |
| `/nexus/consciousness` | (aethelred) | OPEN | none | none |  |
| `/nexus/council` | (aethelred) | OPEN | none | none |  |
| `/nexus/council/[id]` | (aethelred) | OPEN | none | none |  |
| `/nexus/integrations` | (aethelred) | OPEN | none | none |  |
| `/nexus/status` | (aethelred) | OPEN | none | none |  |
| `/nexus/webhooks` | (aethelred) | OPEN | none | none |  |
| `/notifications` | (hestia) | OPEN | none | `/api/generated/hestia-core/heralds`; `/api/generated/hestia-core/heralds/`; chrome: community_profiles, user_roles |  |
| `/notifications/[id]` | (hestia) | OPEN | none | `/api/generated/hestia-core/heralds/`; chrome: community_profiles, user_roles |  |
| `/observatory` | (mnemosyne) | OPEN | none | `/api/generated/athena-gamification/sigils`; `/api/generated/hestia-core/current`; chrome: community_profiles, user_roles |  |
| `/observatory/ancestors` | (mnemosyne) | OPEN | none | `/api/generated/themis-governance/council_houses` |  |
| `/observatory/constellations` | (mnemosyne) | OPEN | none | `/api/generated/athena-gamification/sigils`; `/api/generated/plutus-economics/ware_participants`; `/api/generated/plutus-economics/wares`; chrome: community_profiles, user_roles |  |
| `/observatory/origin` | (mnemosyne) | OPEN | none | none |  |
| `/observatory/patterns` | (mnemosyne) | OPEN | none | `/api/generated/hestia-core/energy_entries`; `/api/generated/hestia-core/journal_entries`; chrome: community_profiles, user_roles |  |
| `/observatory/prophecy` | (mnemosyne) | OPEN | none | `/api/generated/athena-gamification/quests`; `/api/generated/athena-gamification/sigils`; chrome: community_profiles, user_roles |  |
| `/observatory/schema` | (mnemosyne) | OPEN | none | none |  |
| `/observatory/timeline` | (mnemosyne) | OPEN | none | `/api/generated/hestia-core/current`; chrome: community_profiles, user_roles |  |
| `/playground` | (cosmic) | OPEN | none | none |  |
| `/press` | (hephaestus) | OPEN | none | `/api/generated/iris-communications/contact_submissions` |  |
| `/privacy` | (hephaestus) | OPEN | none | none |  |
| `/proving/shapes` | (root) | OPEN | none | none |  |
| `/questionaire` | (mnemosyne) | OPEN | none | `/api/acid-test/questions`; `/api/generated/mnemosyne-assessment/submit_acid_test`; chrome: community_profiles, user_roles |  |
| `/reset-password` | (auth) | SESSION | src/app/(auth)/reset-password/page.tsx:40 -> AuthGuard.tsx:75,103 | chrome: community_profiles, user_roles | client-side; page HTML is served, then null and a push to /login |
| `/sanctuary` | (hephaestus) | OPEN | none | `/api/generated/hestia-core/vessel_config`; chrome: community_profiles, user_roles |  |
| `/signup` | (auth) | OPEN | src/app/(auth)/signup/page.tsx:40 -> AuthGuard.tsx:82 | chrome: community_profiles, user_roles | inverse guard: a signed-in visitor is pushed to /vessel |
| `/stage` | (prometheus) | OPEN | none | none |  |
| `/stage/comedy` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events` |  |
| `/stage/comedy/[id]` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events/` |  |
| `/stage/live` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events` |  |
| `/stage/live/[id]` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events/` |  |
| `/stage/music` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events` |  |
| `/stage/music/[id]` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events/` |  |
| `/stage/recordings` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events` |  |
| `/stage/recordings/[id]` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events/` |  |
| `/stage/schedule` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events` |  |
| `/stage/schedule/[id]` | (prometheus) | OPEN | none | `/api/generated/prometheus-stage/events/` |  |
| `/stage/studio` | (prometheus) | OPEN | none | none |  |
| `/studio` | (prometheus) | OPEN | none | none |  |
| `/studio/animation` | (prometheus) | OPEN | none | none |  |
| `/studio/art` | (prometheus) | OPEN | none | none |  |
| `/studio/audio` | (prometheus) | OPEN | none | none |  |
| `/studio/effects` | (prometheus) | OPEN | none | none |  |
| `/studio/export` | (prometheus) | OPEN | none | none |  |
| `/studio/graphics` | (prometheus) | OPEN | none | none |  |
| `/studio/music` | (prometheus) | OPEN | none | none |  |
| `/studio/video` | (prometheus) | OPEN | none | none |  |
| `/studio/writing` | (prometheus) | OPEN | none | none |  |
| `/terms` | (hephaestus) | OPEN | none | none |  |
| `/theater` | (cosmic) | OPEN | none | `/api/generated/aethelred-connections/entity_states`; `/api/generated/aethelred-connections/entity_states/`; `/api/generated/themis-governance/council_houses`; `/api/generated/themis-governance/council_houses/` |  |
| `/transparency` | (hephaestus) | OPEN | none | `admin_actions` (server); `exchanges` (server); `ledger` (server) |  |
| `/vessel` | (hestia) | OPEN route / ROLE content | VesselContent.tsx:144 | `/api/generated/athena-gamification/sigils`; `/api/generated/hestia-core/current`; `/api/generated/hestia-core/vessel_config`; `/api/generated/hestia-core/vessel_sigils`; chrome: community_profiles, user_roles | content branches on role; the URL still renders |
| `/vessel/constellation` | (hestia) | OPEN | none | `/api/generated/athena-gamification/quests/`; `/api/generated/athena-gamification/sigils/`; `/api/generated/hermes-social/artisan_profiles`; `/api/generated/hermes-social/merchant_profiles`; `/api/generated/hermes-social/works`; `/api/generated/hestia-core/collection_sets`; `/api/generated/hestia-core/current`; `/api/generated/hestia-core/vessel_collections`; `/api/generated/hestia-core/vessel_quests`; `/api/generated/hestia-core/vessel_sigils`; `/api/generated/iris-communications/channels`; `/api/generated/iris-communications/messages`; `/api/generated/iris-communications/signals`; `/api/generated/plutus-economics/wares`; chrome: community_profiles, user_roles |  |
| `/vessel/constellation/[id]` | (hestia) | OPEN | none | `/api/generated/hestia-core/current/`; chrome: community_profiles, user_roles |  |
| `/vessel/energy` | (hestia) | OPEN | none | `/api/generated/hestia-core/energy_entries`; chrome: community_profiles, user_roles |  |
| `/vessel/energy/[id]` | (hestia) | OPEN | none | `/api/generated/hestia-core/energy_entries/`; chrome: community_profiles, user_roles |  |
| `/vessel/home` | (hestia) | OPEN | none | `/api/generated/hestia-core/collection_sets`; `/api/generated/hestia-core/collection_sets/`; `/api/generated/hestia-core/garden_plots`; `/api/generated/hestia-core/garden_plots/`; `/api/generated/hestia-core/plant_stages`; `/api/generated/hestia-core/plant_stages/`; `/api/generated/hestia-core/seed_types`; `/api/generated/hestia-core/seed_types/`; `/api/generated/hestia-core/vessel_collections`; `/api/generated/hestia-core/vessel_collections/`; `/api/generated/hestia-core/vessel_decorations`; `/api/generated/hestia-core/vessel_decorations/`; `/api/generated/hestia-core/vessel_interiors`; `/api/generated/hestia-core/vessel_interiors/`; `/api/generated/hestia-core/vessel_rooms`; `/api/generated/hestia-core/vessel_rooms/`; chrome: community_profiles, user_roles |  |
| `/vessel/journal` | (hestia) | OPEN | none | `/api/generated/hestia-core/journal_entries`; chrome: community_profiles, user_roles |  |
| `/vessel/journal/[id]` | (hestia) | OPEN | none | `/api/generated/hestia-core/journal_entries/`; chrome: community_profiles, user_roles |  |
| `/vessel/journal/[id]/edit` | (hestia) | OPEN | none | `/api/generated/hestia-core/journal_entries/`; chrome: community_profiles, user_roles |  |
| `/vessel/sanctum` | (hestia) | OPEN | none | `/api/auth/update-profile`; `/api/generated/hestia-core/user_financial`; `/api/generated/hestia-core/user_financial/`; `/api/generated/hestia-core/vessel_config`; chrome: community_profiles, user_roles |  |
| `/vision` | (hephaestus) | OPEN | none | none |  |

### Route handlers — hand-written (15)

| URL | Group | Access | Guard address | Data it reads | Notes |
|:---|:---|:---|:---|:---|:---|
| `GET /callback` | (auth) | OPEN | none | Auth code exchange | `src/app/(auth)/callback/route.ts:15-31`; exchanges `?code` for a session, else 302 to `/login?error=` |
| `GET,POST /logout` | (auth) | OPEN | none | none | `src/app/(auth)/logout/route.ts:15-44`; `signOut()` then clears two named cookies; GET delegates to POST (`:42-43`) |
| `POST /api/acid-test/questions` | api | OPEN | none | rpc `get_acid_test_questions` | `src/app/api/acid-test/questions/route.ts:9-22`; bare anon client, no cookies (`:11-14`) |
| `POST /api/acid-test/preview` | api | OPEN | none | rpc `preview_acid_test` | `src/app/api/acid-test/preview/route.ts:10-25`; bare anon client (`:14-17`); scores and returns, writes nothing |
| `GET /api/auth/session` | api | OPEN | none | `community_profiles`, `user_roles` | `src/app/api/auth/session/route.ts:5-42`; answers `{user:null}` 200 for a visitor (`:14-19`) |
| `GET /grimoire` | root | OPEN | none | storage `artifacts/grimoire.html` | `src/app/grimoire/route.ts:28-56`; bare anon client (`:35-37`); the only path exempted from the proxy matcher |
| `POST /api/auth/change-password` | api | SESSION | `src/app/api/auth/change-password/route.ts:19-26` | Supabase Auth | 401 for a visitor |
| `PATCH /api/auth/update-profile` | api | SESSION | `src/app/api/auth/update-profile/route.ts:49-53` | `community_profiles`, `vessel_config` | 401 for a visitor |
| `GET /api/auth/users/me` | api | SESSION | `src/app/api/auth/users/me/route.ts:11-16` | `community_profiles`, `user_roles`, `vessel_sigils`, `wares`, `exchanges` | 401 for a visitor |
| `POST /api/auth/checkout` | api | SESSION | `src/app/api/auth/checkout/route.ts:33-36` | `wares`, `exchanges`, Stripe | 401 for a visitor |
| `GET /api/auth/checkout/session/[id]` | api | SESSION | `src/app/api/auth/checkout/session/[id]/route.ts:15-22` | `exchanges`, Stripe | admin or buyer only (`:24,42`) |
| `GET /api/auth/wares/[id]/bodies` | api | SESSION | `src/app/api/auth/wares/[id]/bodies/route.ts:18-21` | `wares`, `exchanges`, `file_registry`, a bucket named per row (`:79-83`) | entitlement test at `:33-47` |
| `GET /api/books/[slug]/download` | api | SESSION | `src/app/api/books/[slug]/download/route.ts:57-63` | `wares`, `exchanges`, storage `books` | 401/403/302-to-signed-URL |
| `GET /artifacts-proxy/[[...path]]` | root | SESSION | `src/app/artifacts-proxy/[[...path]]/route.ts:91-109` | storage `artifacts` | 302 to `<app host>/login?redirect=` for a visitor; optional email allowlist `ARTIFACTS_VIEWERS` at `:111-121` |
| `POST /api/webhook/stripe` | api | signature | `src/app/api/webhook/stripe/route.ts:13-31` | `exchanges`, `ledger`, `wares` | rejects an unsigned or badly-signed body 400 |

### Route handlers — generated (338)

All 338 live under `src/app/api/generated/<deity>/<table>[/[id]]/route.ts` and
are produced by one template (header at each file's `:1-7`). They resolve to
`/api/generated/<deity>/<table>` and `/api/generated/<deity>/<table>/<id>`.
Their client is `createApiSupabase()`
(`src/lib/api/supabase.ts:20-58`) — the **anon key** (`:35`) bound to the
request's cookies (`:31,43-55`). RLS, not this code, decides the rows.

| shape | count | GET | POST/PUT/DELETE | guard address |
|:---|---:|:---|:---|:---|
| collection `route.ts` | 161 | **OPEN, no guard** | SESSION | e.g. `src/app/api/generated/hestia-core/user_private/route.ts:14-44` (GET) vs `:46-49` (POST) |
| `[id]/route.ts` with PUT | 95 | **OPEN, no guard** | SESSION + ownership/admin | e.g. `src/app/api/generated/hestia-core/user_private/[id]/route.ts:14-38` (GET) vs `:40-51` (PUT) |
| `[id]/route.ts` without PUT | 66 | **OPEN, no guard** | SESSION + ownership/admin | same shape |
| RPC `route.ts` (POST only) | 14 | — | SESSION | e.g. `src/app/api/generated/mnemosyne-assessment/get_acid_test_questions/route.ts:7-8` |
| `daily_puzzles` (GET only) | 2 | **OPEN, no guard** | — | `src/app/api/generated/athena-gamification/daily_puzzles/route.ts:13-43` |

Measured: **not one of the 338 generated files calls `getAuthenticatedUser`
inside its `GET`.** The check is
`for f in $(find . -name route.ts); do awk '/export async function GET/,/^}/' "$f" | grep -c getAuthenticatedUser; done` — every result is `0`.

The 14 RPC routes are: `build_search_text`, `dictionary_lookup`,
`format_address`, `gaia_sync`, `is_valid_country_code`, `is_valid_phone`,
`jsonb_to_address`, `validate_address`, `validate_emergency_contact`,
`validate_signup` (all `hestia-core`); `get_acid_test_questions`,
`get_acid_test_results`, `submit_acid_test` (`mnemosyne-assessment`);
`calculate_sovereign_price` (`plutus-economics`).

## The data layer

### The grant floor

`docs/sql/006-restore-the-grants.sql:38` — `GRANT SELECT ON ALL TABLES IN
SCHEMA public TO anon;` — and `:50-51` sets the same as a default privilege for
future tables. Grade (a). So the *grant* layer is open to `anon` on every
public table; RLS policies are the only wall. Writes are not granted to `anon`
anywhere on disk (`:37` grants DML to `authenticated` only).

The same file records a measurement of the live base taken 2026-07-30
(`:9-12`): RLS on for all 124 tables, **390 policies, of which 387 serve
`authenticated` and 3 serve `public`**, and zero anon writes. That measurement
is grade (a) as a statement on disk; whether it still holds after 022, 024,
034 and 037 landed is grade (c).

### Tables with an anon-readable SELECT policy on disk — grade (a)

A `create policy ... for select` with no `TO` clause defaults to `TO PUBLIC`,
which includes `anon`.

| table | policy | address | predicate | roles |
|:---|:---|:---|:---|:---|
| `events` | Public read events | `docs/sql/003-the-stage-ground.sql:46-47` | `true` | PUBLIC (default) |
| `plant_stages` | Public read published plant_stages | `docs/sql/004-garden-catalog-doors.sql:49-50` (grant `:43`) | `status='published'` | PUBLIC (default) |
| `seed_types` | Public read published seed_types | `docs/sql/004-garden-catalog-doors.sql:53-54` (grant `:44`) | `status='published'` | PUBLIC (default) |
| `mythology` | Public read published mythology | `docs/sql/005-mythology-returns.sql:72-73` (grant `:68`) | `status='published'` | PUBLIC (default) |
| `relationships` | Public read relationships | `docs/sql/016-the-three-facts.sql:47-48` | `true` | PUBLIC (default) |
| `views` | Public read views | `docs/sql/016-the-three-facts.sql:69-70` | `true` | PUBLIC (default) |
| `daily_puzzles` | daily_puzzles are readable by anyone | `docs/sql/022-the-dailies-DRAFT.sql:64-65` (grant `:61`) | `status='published'` | PUBLIC (default) |
| `wares` | wares on the stall are readable by anyone | `docs/sql/024-the-bazaar-refined-DRAFT.sql:21-22` | `status='published'` | PUBLIC (default) |
| `works` | works on the square are readable by anyone | `docs/sql/024-the-bazaar-refined-DRAFT.sql:27-28` | `status='published'` | PUBLIC (default) |
| `assessment_readings` | Public read assessment_readings | `docs/sql/034-the-acid-test-first-readings.sql:68-71` (grant `:65`) | `status='published'` | PUBLIC (default) |
| `assessment_questions` | Anyone can view published questions | `docs/sql/037-the-acid-test-signed-out.sql:18-22` (grant `:31`) | `status='published'` | `anon, authenticated` |
| `personas` | Anyone can view personas | `docs/sql/037-the-acid-test-signed-out.sql:25-29` (grant `:32`) | `true` | `anon, authenticated` |
| `heralds` | vessels_read_their_heralds | `supabase/migrations/20260720_heralds_recipient.sql:32-34` | `recipient = auth.uid() or recipient is null` | PUBLIC (default) — the `recipient is null` arm reaches `anon` |

`docs/sql/037-the-acid-test-signed-out.sql:113` also grants
`execute on function public.preview_acid_test(jsonb) to anon, authenticated`.
`docs/sql/006-restore-the-grants.sql:41` grants
`execute on function public.validate_signup to anon, authenticated`.

### Tables with an authenticated-only SELECT policy on disk — grade (a)

| table | address | predicate |
|:---|:---|:---|
| `policies`, `functions`, `triggers`, `indexes`, `enums`, `composite_types`, `columns` | `docs/sql/001-the-self-knowing-layer.sql:452-465` | `true`, `TO authenticated` |
| `user_roles` | `docs/sql/009-the-walls-learn-the-new-names.sql:53-70`; superseded by `docs/sql/010-the-window-moves-inside.sql:41-57` | admin role only |
| `community_profiles` | `docs/sql/009-the-walls-learn-the-new-names.sql:84-97` (owner); `docs/sql/027-the-public-face-DRAFT.sql:52-55` | `created_by = auth.uid()`; and `status='active'` `TO authenticated` |
| `user_private` | `docs/sql/009-the-walls-learn-the-new-names.sql:102-115` | `created_by = auth.uid()` |
| `vessel_config` | `docs/sql/009-the-walls-learn-the-new-names.sql:120-133` | `created_by = auth.uid()` |
| `user_financial` | `docs/sql/009-the-walls-learn-the-new-names.sql:138-146` | `created_by = auth.uid()` |
| `votes` | `docs/sql/013-the-consent-record-DRAFT.sql:77-93` | `TO authenticated` |

`docs/sql/027-the-public-face-DRAFT.sql:3` reads "DRAFT. Never run by a lamp."
Whether it ran is grade (c). Until it does, a signed-in vessel reads only its
own `community_profiles` row and every other vessel's display name comes back
empty.

`docs/sql/023-the-ledger-door-DRAFT.sql:79-83` and `:88-92` hold two drafted
policies for `public.ledger`, both **commented out** on disk. No ledger policy
is active in any file here.

### Storage buckets

| bucket | public? | anon read | authenticated read | address |
|:---|:---|:---|:---|:---|
| `artifacts` | private | only `grimoire.html` | any object | `supabase/migrations/20260827_artifacts_bucket_policy.sql:22-25`; `supabase/migrations/20260831_the_grimoire_door.sql:18-21` |
| `books` | private | none | buyer with a completed exchange, or the maker | `supabase/migrations/20260831_the_books_as_digital_wares.sql:109-122`, `:125-136` |
| `avatars` | public | every object, by public URL | own folder only (SELECT policy) | `docs/sql/012-the-avatars-bucket.sql:15-16`, `:35-50` |
| bucket named per `file_registry` row | — | — | — | grade (c) — the name is read from data at `src/app/api/auth/wares/[id]/bodies/route.ts:79-83`; no such bucket is created or policied on disk |

The `books` bucket is not created by any migration —
`supabase/migrations/20260831_the_books_as_digital_wares.sql:23-36` leaves the
`insert into storage.buckets` commented. Whether it exists is grade (c).

No write policy for `anon` exists on any bucket on disk.

### Tables read by an OPEN page with no anon policy on disk — likely false-empty, grade (c)

Every row below is a page a visitor with no session can open, reading a table
whose only policy on disk serves `authenticated`, or which has no policy on
disk at all. What the remote holds cannot be read from here.

| table | OPEN page(s) that read it | address of the read |
|:---|:---|:---|
| `ledger` | `/transparency`, `/council/ledger` | `src/app/(hephaestus)/transparency/page.tsx:51`; `/api/generated/plutus-economics/ledger` |
| `admin_actions` | `/transparency` | `src/app/(hephaestus)/transparency/page.tsx:57` |
| `exchanges` | `/transparency`, `/bazaar/wares/[id]` | `src/app/(hephaestus)/transparency/page.tsx:63` |
| `artisan_profiles` | `/bazaar/artisans`, `/bazaar/artisans/[id]`, `/bazaar/wares/[id]`, `/bazaar/works/[id]` | `/api/generated/hermes-social/artisan_profiles` |
| `merchant_profiles` | `/bazaar/merchants`, `/bazaar/merchants/[id]` | `/api/generated/hermes-social/merchant_profiles` |
| `sigils` | `/library/badges`, `/library/badges/[slug]`, `/observatory/constellations` | `/api/generated/athena-gamification/sigils` |
| `bubbles` | `/library/bubbles`, `/library/bubbles/[slug]`, `/library/bubbles/play` | `/api/generated/athena-gamification/bubbles` |
| `learning_paths`, `lessons`, `path_lessons` | `/library/courses`, `/library/courses/[slug]`, `/library/lessons`, `/library/lessons/[slug]` | `/api/generated/athena-gamification/*` |
| `quests` | `/library/quests`, `/library/quests/[slug]` | `/api/generated/athena-gamification/quests` |
| `collection_sets` | `/library/bubbles`, `/vessel/home` | `/api/generated/hestia-core/collection_sets` |
| `council_houses` | `/observatory/ancestors`, `/theater` | `/api/generated/themis-governance/council_houses` |
| `entity_states` | `/theater` | `/api/generated/aethelred-connections/entity_states` |
| `ware_participants` | `/observatory/constellations`, `/bazaar/contributions` | `/api/generated/plutus-economics/ware_participants` |
| `work_participants` | `/bazaar/contributions`, `/bazaar/works/[id]` | `/api/generated/hermes-social/work_participants` |
| `resonance` | `/connect/emeralds` | `/api/generated/mnemosyne-assessment/resonance` |
| `contact_submissions` | `/connect/support`, `/connect/support/[id]` | `/api/generated/iris-communications/contact_submissions` |
| `community_profiles`, `user_roles` | every page carrying `useAuth` or `useUser` | `src/lib/hooks/useAuth.ts:38`; `src/lib/hooks/useUser.ts:58-59` |
| `garden_plots`, `vessel_*`, `journal_entries`, `energy_entries`, `current`, `user_financial` | the `/vessel/*` and `/observatory/*` pages, all OPEN | `/api/generated/hestia-core/*` |
| `proposals`, `reports`, `applications` | `/council/proposals`, `/council/reports`, `/council/applications` | `/api/generated/themis-governance/*` |
| `messages`, `signals`, `channels` | `/connect/messages`, `/vessel/constellation` | `/api/generated/iris-communications/*` |

Three OPEN pages read tables that do have anon policies and therefore work
signed out: `/library/dailies` and `/library/dailies/sudoku`
(`src/lib/dailies/shelf.ts:27-59` fetches PostgREST directly with the anon key
and no cookies, `:44-48`), and `/questionaire`
(`src/components/asgard/domains/mnemosyne/assessment/AcidTestLoader.tsx:35`
with `AcidTestForm.tsx:447-457`, which routes a signed-out submission to
`/api/acid-test/preview` rather than the session-gated `submit_acid_test`).

`/stage/*` reads `events`, whose policy is `using (true)` with no status
filter (`docs/sql/003-the-stage-ground.sql:46-47`) — the opposite of a
false-empty: a visitor with no session reads every event row at every status,
draft included. Grade (a) for the policy text; grade (c) for what rows exist.

`/observatory/schema` reads no base at all — it parses the generated types
file (`src/app/(mnemosyne)/observatory/schema/page.tsx:19`).
## The doors

Four pages and two route handlers stand under `(auth)`:

| URL | file | access | what it is |
|:---|:---|:---|:---|
| `/login` | `src/app/(auth)/login/page.tsx` | OPEN | renders `LoginForm` inside `AuthGuard requireAuth={false}` (`:41`) |
| `/signup` | `src/app/(auth)/signup/page.tsx` | OPEN | renders `SignupForm` inside `AuthGuard requireAuth={false}` (`:40`) |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | OPEN | `ForgotPasswordForm`, same inverse guard (`:40`) |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | SESSION | `AuthGuard` with its default `requireAuth=true` (`:40`) |
| `GET /callback` | `src/app/(auth)/callback/route.ts` | OPEN | `exchangeCodeForSession` (`:22`), then 302 to `?next` or `/vessel` (`:18,25`) |
| `GET,POST /logout` | `src/app/(auth)/logout/route.ts` | OPEN | `signOut()` (`:18`), clears two named cookies (`:24-31`) |

### Sign-up

Sign-up exists and is **not disabled in code**. The path is:

`SignupForm.handleSubmit` (`src/components/asgard/auth/SignupForm.tsx:39-85`)
validates the password match (`:52-54`), requires the terms checkbox
(`:55-57`), checks the password against the pwned-passwords count
(`:64-69`), then calls `signUp` from `useAuth` (`:33`, `:72-75`), which is
`supabase.auth.signUp({ email, password, options: { data: metadata } })`
(`src/lib/hooks/useAuth.ts:68-73`). On success it sets `offered` (`:84`) and
offers the Acid Test or the vessel (`:87-115`).

There is **no invite code, no allowlist, no waitlist, no feature flag and no
env switch** anywhere in `src/` that gates sign-up. The full set of env names
referenced in `src/` is: `ARTIFACTS_VIEWERS`, `CI`, `GITHUB_ACTIONS`,
`LOG_LEVEL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE`, `NODE_ENV`,
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. None of them names a signup
gate. No `.env` file was opened for this survey.

There is no `supabase/config.toml` in the tree (`supabase/` holds only
`.temp/` and `migrations/`), so no Auth setting is declared on disk.
**Whether sign-ups are open is therefore decided entirely by the remote
project's Auth settings — grade (c).**

Two related things stand on disk:

- `public.validate_signup` is a database function whose EXECUTE was restored
  to `anon, authenticated` at `docs/sql/006-restore-the-grants.sql:41`, with
  the note at `:21-24` that it "runs DURING SIGNUP, pre-auth." Its generated
  HTTP door, `POST /api/generated/hestia-core/validate_signup`, is
  session-gated (`src/app/api/generated/hestia-core/validate_signup/route.ts:7-8`),
  so the app never reaches it before a session exists. Whether the remote
  wires it as an Auth hook is grade (c).
- `src/app/(iris)/connect/invitations/page.tsx` renders `InvitationsHub`,
  which builds an invite link at `/enter/invite/<user id>`
  (`src/components/asgard/domains/iris/invitations/InvitationsHub.tsx:21`).
  **No `/enter` route exists under `src/app`.** `handleSendInvite` (`:29-32`)
  sets a flag and sends nothing. The invitation door is cosmetic.

### Sign-in

`signIn` is `supabase.auth.signInWithPassword` (`src/lib/hooks/useAuth.ts:61-66`).
A magic-link door also exists, `signInWithLink`, and it is explicitly
non-creating: `shouldCreateUser: false` (`:75-83`) — a magic link can sign an
existing account in but cannot make a new one.

`resetPassword` is `resetPasswordForEmail` (`:85-93`); `updatePassword` is
`auth.updateUser({ password })` (`:95-100`). `POST /api/auth/change-password`
is the server-side twin, session-gated
(`src/app/api/auth/change-password/route.ts:19-26`).

`/signup` is linked from `LoginForm.tsx:200`, `SanctuaryHero.tsx:34`,
`SanctuaryPathways.tsx:29` and `VisionCTA.tsx:22`, and is disallowed to
crawlers at `src/app/robots.ts:19`.
## Unclear and likely gaps

### G1 — The private rooms are reachable by URL with no session

`/vessel`, `/vessel/sanctum`, `/vessel/journal`, `/vessel/energy`,
`/notifications`, `/council/*`, `/nexus/*`, `/bazaar/studio/*`,
`/bazaar/contributions`, `/connect/messages`, `/connect/invitations`,
`/observatory/*` all render for a visitor with no session. There is no layout
gate (one layout only, `src/app/layout.tsx`), no server-side session read
(only `src/app/page.tsx:37`), and the proxy does not redirect
(`src/lib/supabase/middleware.ts` — 0 occurrences of `redirect`).

`src/app/robots.ts:15-38` and `src/app/sitemap.ts:23-81` both list these as
doors "that need a session" — the intent is on disk, the enforcement is not.
`src/lib/constants/systems/environments/navigation.ts:76-82` marks them
`requiresAuth`, and `filterNavigation` (`:96-103`) only hides the nav item.

What a visitor actually sees is decided by RLS: the pages fetch and render
empty. That is a false-empty by design in the private rooms, but it is not a
gate — nothing stops the page from painting, and nothing tells the visitor to
sign in.

### G2 — `/contact` and `/press` cannot be used by a visitor

Both are OPEN pages whose only action is
`POST /api/generated/iris-communications/contact_submissions`
(`src/components/asgard/domains/hephaestus/contact/ContactForm.tsx:117`;
`src/components/asgard/domains/hephaestus/press/InterviewRequests.tsx:87`;
`src/components/asgard/domains/iris/support/SupportHub.tsx:39`). That route's
POST is session-gated
(`src/app/api/generated/iris-communications/contact_submissions/route.ts:48-49`)
and `docs/sql/006-restore-the-grants.sql:11-12,37` grants `anon` SELECT only,
never INSERT. A signed-out visitor's contact form gets a 401. Both pages are
listed as public in `src/app/sitemap.ts:31,40`.

### G3 — `/transparency` and `/council/ledger` read a table with no policy on disk

`src/app/(hephaestus)/transparency/page.tsx:51,57,63` reads `ledger`,
`admin_actions` and `exchanges` through `createServerSupabase()`
(`src/lib/supabase/server.ts:8-10`, the anon key). The only ledger policy on
disk is drafted and commented out
(`docs/sql/023-the-ledger-door-DRAFT.sql:79-83`). Grade (c) for whether one
was ever run. If none was, the page shows `$0.00` to everyone including KP,
signed in or out, and it is listed as public at `src/app/sitemap.ts:44`.

### G4 — Every generated GET is open at the HTTP layer

All 324 generated routes that expose a `GET` do so with no
`getAuthenticatedUser` call. `GET /api/generated/hestia-core/user_private`
(`src/app/api/generated/hestia-core/user_private/route.ts:14-44`) and
`GET /api/generated/hestia-core/user_financial` answer 200 to any caller;
what comes back is whatever RLS lets through. The design is coherent — the
client is the anon key bound to the caller's own cookies
(`src/lib/api/supabase.ts:31-55`) and the app holds no service-role key — but
it means the entire read surface of the base is one RLS mistake away from
being public, with nothing in front of it.

Named beside it: `createAdminSupabase` (`src/lib/api/supabase.ts:64-67`) does
not use a service role. It calls `createApiSupabase()` and returns it. The
name says one thing and the body does another; its own comment at `:61-63`
warns it is for "admin operations."

### G5 — `/` is the only page a signed-out visitor is turned away from, and the sitemap lists it as public

`src/app/page.tsx:38` sends a visitor with no session to `/sanctuary`. That
redirect fires for crawlers too, while `src/app/sitemap.ts:25` publishes `/`
as a public URL. A crawler following the sitemap gets a redirect on the root
of the site.

### G6 — Three client fetches name generated routes that do not exist

- `src/components/asgard/domains/iris/channels/ChannelsGallery.tsx:26` fetches
  `/api/generated/hermes-social/channels`; the route on disk is
  `/api/generated/iris-communications/channels`.
- `src/components/asgard/domains/iris/channels/ChannelView.tsx:30` — same path,
  with an id.
- `src/components/asgard/domains/iris/feed/PulseFeed.tsx:34` fetches
  `/api/generated/hermes-social/posts`; there is no `posts` route anywhere
  under `src/app/api/generated/`.

`/connect/channels`, `/connect/channels/[id]` and `/connect/feed` therefore
404 their data for everyone, signed in or out. All three are listed as public
at `src/app/sitemap.ts:70-71`.

### G7 — `events` is readable by anyone at any status

`docs/sql/003-the-stage-ground.sql:46-47` is `for select using (true)` with no
status filter and no `TO` clause, unlike every other catalog policy in the
same family (`plant_stages`, `seed_types`, `mythology`, `daily_puzzles`,
`wares`, `works`, all of which carry `status = 'published'`). The `/stage/*`
pages are OPEN and read it. Whether any draft rows exist is grade (c).

### What cannot be determined from disk

- The remote's Auth settings: whether sign-up is enabled, whether email
  confirmation is required, whether `validate_signup` is wired as a hook.
- Which of the base's ~390 policies (`docs/sql/006-restore-the-grants.sql:9-12`)
  are actually standing. Only 70 `create policy` statements exist across
  `docs/sql/`, `docs/sql/holds/` and `supabase/migrations/`, and several of
  those are in files marked DRAFT or ROLLBACK.
- Whether the `books` and `artifacts` buckets exist and with what
  `public` flag. Both are created by hand per their own migrations
  (`supabase/migrations/20260831_the_books_as_digital_wares.sql:23-36`).
- Which bucket names `file_registry` rows carry, and what policies those
  buckets hold (`src/app/api/auth/wares/[id]/bodies/route.ts:79-83`).
- Whether `docs/sql/027-the-public-face-DRAFT.sql` was run, which decides
  whether one vessel can read another's display name.
## Addresses

Every file opened for this survey, with the lines the report leans on. All
paths are from the repo root, `G:/materia/AudHDities`.

### The guard

- `src/proxy.ts` — `:10-18` the proxy body, `:20-32` the config, `:29-31` the matcher
- `src/lib/supabase/middleware.ts` — `:9` signature, `:51-68` the mixed-scope cookie sweep, `:74-95` the client, `:98` the refresh, `:115-126` the host-only sweep, `:128` the return; zero `redirect`
- `src/lib/supabase/server.ts` — `:5-10` `createServerSupabase`, anon key
- `src/lib/api/supabase.ts` — `:20-58` `createApiSupabase`, `:35` anon key, `:64-67` `createAdminSupabase`
- `src/lib/api/auth.ts` — `:38-54` `getAuthenticatedUser`, `:59-63` `getOptionalUser`, `:68-76` `isAdmin`, `:81-98` `checkOwnership`, `:188-190` `unauthorized`, `:195-197` `forbidden`
- `src/app/layout.tsx` — `:23-42` the only layout
- `src/app/page.tsx` — `:35-38` the only server-side page session gate
- `src/app/(hestia)/dashboard/page.tsx:6`
- `src/app/(hephaestus)/forge/architecture/database-schema/page.tsx:6`
- `src/components/asgard/auth/AuthGuard.tsx` — `:39-54` `sameSiteRedirect`, `:60-64` props, `:70-88` the effect, `:103` the null render
- `src/components/asgard/auth/ProtectedRoute.tsx` — `:13-30`, imported nowhere
- `src/lib/hooks/useRequireAuth.ts`, `src/lib/hooks/useRequireRole.ts` — reached only through the above
- `src/contexts/ContinuityBeamContext.tsx` — the only file in `src/contexts`; no auth state
- `src/lib/constants/systems/environments/navigation.ts` — `:44-47` the flags, `:62-82` the marked doors, `:96-103` `filterNavigation`
- `next.config.ts` — `:43-76` the host rewrites, `:77-105` the redirects

### The auth doors

- `src/app/(auth)/login/page.tsx:41`
- `src/app/(auth)/signup/page.tsx:40`
- `src/app/(auth)/forgot-password/page.tsx:40`
- `src/app/(auth)/reset-password/page.tsx:40`
- `src/app/(auth)/callback/route.ts:15-31`
- `src/app/(auth)/logout/route.ts:15-44`
- `src/components/asgard/auth/SignupForm.tsx:31-115`
- `src/lib/hooks/useAuth.ts` — `:61-66` signIn, `:68-73` signUp, `:75-83` signInWithLink, `:85-93` resetPassword, `:95-100` updatePassword, `:38` the profile fetch
- `src/lib/hooks/useUser.ts:44-60` — the profile and roles fetch
- `src/lib/constants/components/asgard/auth/auth.constants.ts:123-136` — `AUTH_ROUTES`
- `src/components/asgard/domains/iris/invitations/InvitationsHub.tsx:16-32`

### The hand-written route handlers

- `src/app/api/acid-test/questions/route.ts:9-22`
- `src/app/api/acid-test/preview/route.ts:10-25`
- `src/app/api/auth/session/route.ts:5-42`
- `src/app/api/auth/change-password/route.ts:15-68`
- `src/app/api/auth/update-profile/route.ts:45-119`
- `src/app/api/auth/users/me/route.ts:5-67`
- `src/app/api/auth/checkout/route.ts:29-45`
- `src/app/api/auth/checkout/session/[id]/route.ts:7-45`
- `src/app/api/auth/wares/[id]/bodies/route.ts:10-90`
- `src/app/api/books/[slug]/download/route.ts:40-100`
- `src/app/api/webhook/stripe/route.ts:9-45`
- `src/app/artifacts-proxy/[[...path]]/route.ts:76-141`
- `src/app/grimoire/route.ts:28-66`
- `src/app/robots.ts:10-42`
- `src/app/sitemap.ts:23-87`

### The generated route handlers

- `src/app/api/generated/hestia-core/user_private/route.ts` — `:14-44` the unguarded GET, `:46-49` the guarded POST
- `src/app/api/generated/hestia-core/user_private/[id]/route.ts` — `:14-38` the unguarded GET, `:40-51` the guarded PUT
- `src/app/api/generated/athena-gamification/daily_puzzles/route.ts:13-43` — GET only
- `src/app/api/generated/mnemosyne-assessment/get_acid_test_questions/route.ts:5-29` — the RPC shape
- `src/app/api/generated/iris-communications/contact_submissions/route.ts:46-49`
- `src/app/api/generated/hestia-core/validate_signup/route.ts:7-8`

### The data pages and their reads

- `src/app/(hephaestus)/transparency/page.tsx:47-69`
- `src/lib/dailies/shelf.ts:27-59`
- `src/components/asgard/domains/mnemosyne/assessment/AcidTestLoader.tsx:35,63`
- `src/components/asgard/domains/mnemosyne/assessment/AcidTestForm.tsx:445-465`
- `src/components/asgard/domains/hermes/wares/WaresGallery.tsx:83-84`
- `src/components/asgard/domains/hephaestus/contact/ContactForm.tsx:117-118`
- `src/components/asgard/domains/hephaestus/press/InterviewRequests.tsx:87`
- `src/components/asgard/domains/iris/support/SupportHub.tsx:39`
- `src/components/asgard/domains/iris/channels/ChannelsGallery.tsx:26`
- `src/components/asgard/domains/iris/channels/ChannelView.tsx:30`
- `src/components/asgard/domains/iris/feed/PulseFeed.tsx:34`
- `src/components/runes/AvatarUpload.tsx:80-88`
- `src/app/(mnemosyne)/observatory/schema/page.tsx:18-19`

### The role branches

- `src/components/asgard/domains/themis/admin/AdminHub.tsx:21-23`
- `src/components/asgard/domains/themis/council/CouncilHub.tsx:104-105,136`
- `src/components/asgard/domains/themis/applications/ApplicationsHub.tsx:53`
- `src/components/asgard/domains/themis/delegation/DelegationHub.tsx:17`
- `src/components/asgard/domains/themis/proposals/ProposalsGallery.tsx:84`
- `src/components/asgard/domains/themis/proposals/ProposalDetail.tsx:102`
- `src/components/asgard/domains/themis/reports/ReportsHub.tsx:48`
- `src/components/asgard/domains/themis/voting/VotingHub.tsx:69`
- `src/components/asgard/domains/hermes/studio/StudioShelf.tsx:49`
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx:120`
- `src/components/asgard/domains/hestia/vessel/VesselContent.tsx:144,183-186`

### The SQL

- `supabase/migrations/20260720_heralds_recipient.sql:17-34`
- `supabase/migrations/20260729_ceremony_choices.sql:16-26`
- `supabase/migrations/20260827_artifacts_bucket_policy.sql:22-25`
- `supabase/migrations/20260831_the_books_as_digital_wares.sql:23-36,60-92,108-136`
- `supabase/migrations/20260831_the_grimoire_door.sql:17-21`
- `supabase/migrations/20260902_the_seal_on_every_ware.sql:36-48,50-65`
- `docs/sql/001-the-self-knowing-layer.sql:452-465`
- `docs/sql/003-the-stage-ground.sql:44-47`
- `docs/sql/004-garden-catalog-doors.sql:43-44,49-54`
- `docs/sql/005-mythology-returns.sql:68,72-73`
- `docs/sql/006-restore-the-grants.sql:9-31,37-41,48-53`
- `docs/sql/009-the-walls-learn-the-new-names.sql:53-146`
- `docs/sql/010-the-window-moves-inside.sql:41-57`
- `docs/sql/012-the-avatars-bucket.sql:15-18,24-55`
- `docs/sql/013-the-consent-record-DRAFT.sql:77-93`
- `docs/sql/016-the-three-facts.sql:46-48,68-70`
- `docs/sql/022-the-dailies-DRAFT.sql:61,64-65`
- `docs/sql/023-the-ledger-door-DRAFT.sql:60-110`
- `docs/sql/024-the-bazaar-refined-DRAFT.sql:19-31,33-51`
- `docs/sql/027-the-public-face-DRAFT.sql:1-65`
- `docs/sql/034-the-acid-test-first-readings.sql:63-71`
- `docs/sql/037-the-acid-test-signed-out.sql:13-33,113`
- `docs/sql/037-the-acid-test-signed-out-ROLLBACK.sql:11-18`
- `docs/sql/holds/024-the-bazaar-refined-as-first-written.sql:106-128` — commented

### Method

- Route enumeration: `find src/app -name page.tsx` (146) and `-name route.ts` (353).
- Layout enumeration: `find src/app -name "layout.*" | wc -l` = 1.
- Redirect enumeration: `grep -rln "redirect(" --include=page.tsx --include=layout.tsx src/app` = 3 files.
- Server session reads in pages: `grep -rn "auth.getUser\|auth.getSession" --include=page.tsx src/app` = 1 line.
- Generated GET guard check: for every generated `route.ts`,
  `awk '/export async function GET/,/^}/' "$f" | grep -c getAuthenticatedUser` = 0.
- Data reads per page: each `page.tsx` walked four import levels deep through
  `@/`-prefixed local imports (skipping constants, variants and types), then
  scanned for `.from('...')`, `.rpc('...')` and `/api/...` string literals.
- Policy extraction: every `create policy` statement in `docs/sql/`,
  `docs/sql/holds/` and `supabase/migrations/` parsed for table, action, `TO`
  clause and `USING` predicate — 70 statements, 8 with an explicit `TO`.
- No `.env` file was opened. Env variable names were taken only from
  `process.env.X` references in `src/`.
