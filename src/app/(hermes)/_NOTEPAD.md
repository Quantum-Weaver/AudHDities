# _NOTEPAD — `src/app/(hermes)` · the Bazaar
*Working log for this folder set (the marketplace route group + its
`components/asgard/domains/hermes/` components). **Not documentation** (that's
README.md) — the living record of what we did here, what's live, and what's
suspect. Newest work on top. Convention: KP + Opus, 2026-07-08 — knowledge
lives next to the code it describes.*

## What this folder is
The Bazaar — the Sanctuary marketplace UI. 11 routes, all thin `Page`
wrappers over `@/components/asgard/domains/hermes/*`. Room names: the Bazaar
(hub) · the Tapestry (creations) · the Weavers (creators) · the Guild
(vendors) · "the Loom" (studio create/edit — ⚠️ name collision, see below) ·
the Contributions Ledger · Checkout (cancel/success + `PriceBreakdown` — the
split is shown to the buyer at purchase; transparency as UX).

## Status
| Aspect | State | Note |
|---|---|---|
| Routes | ✅ 11/11 complete | per its own README |
| Data layer | ⚠️ **STRANDED** | imports `types/generated/plutus-economics/products` + `hooks/generated/plutus-economics/contributions` — **neither exists after the 2026-07-09 GAIA regen** (live surface: covenant_pool / ledger / residual_pool; sellables live in hestia as `wares`/`works`). Built against the previous generation; will not type-check until re-wired. Not broken work — work awaiting the vocabulary verdict. |
| Hand-written hooks | `hooks/commerce/useProduct.ts`, `useCheckout.tsx` | re-point during the re-wire |

## Open questions (answers land here + in /SCHEMA-FINALIZE.md)
1. **Vocabulary canon:** DB speaks Sanctuary (`works` = the made thing;
   `wares` = a work offered for sale, carrying price + residual_pool_percent);
   UI code speaks Janus (`products`, `creations`). Fable's lean: DB language
   wins; room *display names* (Tapestry/Weavers/Guild) stay. — awaiting KP.
2. **The two Looms:** the studio room is "the Loom," but Loom is the
   Bridge's family alias in the five-rooms taxonomy (Bridge canonical, per
   Kimi's audit). Rename the room, or rule room≠app contexts never collide?
   — awaiting KP.
3. **Deity drift, UI vs DB:** route group `(hermes)` = marketplace, but DB
   domain `hermes-social` = just `messages`. Not wrong — make it deliberate
   in gaia_config so future hands don't assume they mirror.

## Decided upstream (2026-07-09, see /SCHEMA-FINALIZE.md plutus section)
- **Residual Pool: platform-wide equal share** to all contributors →
  the Contributions Ledger room becomes a **provenance gallery** (credit,
  not payout math) — the room's meaning improved, no redesign needed.
- Covenant Pool: equal dividend to all active members; **intake valve
  (`covenant_pledge_percent`) is a named schema GAP** — the studio/profile
  UI will need the pledge control once the column exists.
- `ledger` append-only; `distributions`/`distribution_recipients`/`exchanges`
  migrating into plutus-economics; enums for entry_type/pool_type/status.
- Checkout's `PriceBreakdown` must re-point at the canonical split model
  once re-wired.

4. **Identity layer (feeds priority row 2):** `useAuth`/`useUser` + auth API
   routes import `@/types/generated/hestia-core/profiles` — does not exist;
   live schema split it into `artisan_profiles` / `community_profiles` /
   `merchant_profiles` (+ `user_private`/`user_roles`/`user_financial`).
   Canonical auth-facing identity to be decided in the identity slice.

## Full-app sweep result (2026-07-09, automated)
Hand-written code has exactly **4 real dangling generated-import classes**
(whole app, not just the bazaar): `plutus-economics/products` (types+hooks;
→ `hestia-core/wares`) · `plutus-economics/contributions` (hook; →
`*_participants`) · `hestia-core/profiles` (types; → the three-way split).
Two `${deityFolder}/${tableName}` template strings in
`src/scripts/shared/helper_imports.ts` are intentional, not gaps. Per-room
detail lives in each room's own `_NOTEPAD.md` (all seven rooms have one).

## Work log
- **2026-07-09 (Fable + KP):** First review pass as part of the schema
  finalize (plutus ↔ UI). Found the stranded data layer, mapped all 11 rooms
  and their component imports, ran the full-app dangling-import sweep,
  raised the four open questions above, and laid a `_NOTEPAD.md` in every
  room. Verdicts pending KP's word; nothing changed in code yet.
