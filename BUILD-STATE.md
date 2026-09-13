# AudHDities — Build State
*The repo's standing state. Update in place; every row states what the tree
holds, with the address that proves it.*

## The one-paragraph truth
The backend regenerates itself: 118 tables in one schema file produce 884
generated files — types, hooks, validators, utils and 326 API route handlers.
The UI is 166 page files across 11 deity route groups plus the hearth and one
proving room, and the four dangling import classes are gone. What remains is
not rewiring but the write side: the rooms that read the base outnumber the
rooms that write to it, and several surfaces still promise a door that has no
table behind it.

## Layer by layer

| Layer | State | Evidence |
|---|---|---|
| **Live DB** (Supabase "Superposition") | 118 tables · 19 functions · 20 enums · 0 views | counted in `src/lib/generated/supabase/database.types.ts` |
| **Schema finalize** | 2 of 11 domains verdicted (plutus-economics, the hestia marketplace slice) | `SCHEMA-FINALIZE.md` priority plan |
| **GAIA** (backend generator) | delivers the whole layer | 884 files: 156 types · 103 hooks · 156 validators · 102 utils · 326 route handlers under `src/app/api/generated/` |
| **COSMIC** (style generator) | 21 stylesheets, every one loaded | 14 imported in `src/app/globals.css:12-25`, 7 in `src/app/layout.tsx:6-12` |
| **Generated validators** | structurally sound; business bounds not emitted | enums enforce; constraints declared in `gaia_config` would have GAIA emit z-bounds |
| **Generated types/hooks/api/utils** | no dangling import class remains | nothing under `src/` imports `plutus-economics/products`, `plutus-economics/contributions` or `hestia-core/profiles` |
| **UI routes** | 166 page files | aethelred 9 · athena 16 · auth 4 · cosmic 7 · hephaestus 21 · hermes 23 · hestia 13 · iris 11 · mnemosyne 21 · prometheus 22 · themis 17, plus `src/app/page.tsx` and `src/app/proving/shapes/page.tsx` |
| **Component library** | 361 `.tsx` under `src/components/` | 11 deity domains under `asgard/domains/` plus the shared families bifrost · runes · seidr · vegvisir · yggdrasil · hof · forging · shapes |
| **Hand-written API** | 18 route handlers outside the generated tree | under `src/app/api/`, beside the 326 generated ones |
| **Auth/identity** | four doors stand | `(auth)`: `login`, `signup`, `forgot-password`, `reset-password` |
| **Server gates** | one group only | `(themis)` `admin/gate.ts` on the three `/council/admin` routes; `(aethelred)` `/nexus/council`, `/nexus/council/[id]` and `/nexus/api` redirect a signed-out visitor to `/login`. No middleware file stands. |
| **Group boundaries** | four groups carry their own `error.tsx`, `loading.tsx` and `not-found.tsx` — `(athena)`, `(mnemosyne)`, `(prometheus)`, `(themis)` | the other seven fall back to `src/app/error.tsx` |

## Decided architecture (load-bearing)
- **Distribution:** the marketplace IS the app store — everything not on a
  store distributes through the Sanctuary as a signed ware.
- **Economics:** `ledger` append-only; residual is platform-wide equal;
  covenant is an equal dividend to all active members; the pledge valve is
  `community_profiles.covenant_pledge_percent`, bounded 0–50 by
  `api/auth/update-profile/route.ts:18` and set in the Sanctum
  (`hestia/sanctum/CovenantSpace.tsx`); `pricing_model` encodes solidarity in
  four values.
- **Vessel experience:** the Animal-Crossing-meets-RPG canon at
  `docs/design/vessel-experience-excavation.md`, mapping to the `vessel_*`
  tables. No dark patterns.
- **Acid Test:** optional at signup, re-offered in-experience, and affecting
  price where a price is offered.

## What reads and what writes

**Components that touch the base, by domain:** themis 16 · hermes 15 ·
hestia 15 · athena 14 · prometheus 11 · iris 8 · mnemosyne 7 · cosmic 2 ·
hephaestus 1 · aethelred 0. The Nexus reads through `src/lib/nexus/*` from
its page files rather than its components; two of cosmic's two are the
orphaned `Theater.tsx` and the environment-preference write.

**Writes the base:** the checkout road (`api/auth/checkout` → `exchanges`,
completed by the Stripe webhook) · the contact form (`api/contact` →
`contact_submissions`) · the Loom's forms (`works`, `wares`, `file_registry`)
and `StudioEdit` · the vote (`votes`, upserted) · a proposal (`proposals`) ·
an application review (`applications`, then `artisan_profiles` or
`merchant_profiles`, then the role on `community_profiles`) · the vessel
roster's role writes · the Stage's go-live form (`events`) · the environment
preference (`api/auth/update-profile`).

**Reads nothing:** the nine Loom rooms under `/studio`, the five
`NexusPageTemplate` rooms, `/council/delegation`, and every room in
`(cosmic)`.

## The path from here (in order)
1. Schema finalize rows 2–11, beginning with the identity slice.
2. Apply schema changes in Supabase → regenerate types → GAIA.
3. The write side where a surface already promises one: heralds, lesson
   completion, sigil awards, delegation.
4. The gate question: a middleware that sends a visitor to `/login` with a
   redirect, or the soft door kept deliberately.
5. Group boundaries for the seven groups that fall back to the root.
