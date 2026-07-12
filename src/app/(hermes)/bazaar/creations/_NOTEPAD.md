# _NOTEPAD — `bazaar/creations/` · the Tapestry
*Room-level working log. Group context: `../../_NOTEPAD.md`. Newest on top.*

## What this room is
The gallery of made things — `/bazaar/creations` (+ `[id]` detail).
Components: `CreationsGallery`, `CreationDetail`, `ProductCard`.

## Gaps (2026-07-09 sweep)
- ❌ `ProductCard.tsx` imports `@/types/generated/plutus-economics/products`
  — **does not exist** (live: `hestia-core/wares` + `works`).
- ❌ `ProductCard.tsx` imports `@/hooks/generated/plutus-economics/contributions.js`
  — **does not exist**; provenance now lives in `ware_participants` /
  `work_participants` (hestia-core), and per the 2026-07-09 decision
  contribution records are credit, not payout weights.

## Rewire plan (pending vocabulary confirmation in /SCHEMA-FINALIZE.md)
`ProductCard` → `WareCard` over `wares` (listing: price,
residual_pool_percent) joined to its `work`; participants shown as credit.
Display name "the Tapestry" stays.

## Work log
- **2026-07-09 (Fable + KP):** Reviewed; two dangling imports recorded.
  No code changed yet — awaiting wares/works canon confirmation.
