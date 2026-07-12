# _NOTEPAD — `bazaar/checkout/` · Checkout
*Room-level working log. Group context: `../../_NOTEPAD.md`. Newest on top.*

## What this room is
The exchange moment — `/bazaar/checkout` (+ `cancel/`, `success/`).
Components: `CheckoutHub`, `CheckoutForm`, `CheckoutButton`,
`PriceBreakdown` (+ hand-written `hooks/commerce/useCheckout.tsx`).
**PriceBreakdown shows the buyer the split at purchase — transparency as UX;
protect this feature through every rewire.**

## Gaps (2026-07-09 sweep)
- ❌ `CheckoutButton.tsx` imports `@/types/generated/plutus-economics/products`
  — does not exist (→ `hestia-core/wares`).
- ❌ `hooks/commerce/useCheckout.tsx` imports
  `@/hooks/generated/plutus-economics/products.js` — does not exist.

## Rewire plan (pending canon confirmation)
Checkout operates on a `ware`; `PriceBreakdown` re-points to the canonical
2026-07-09 model: platform fee → operations/residual (platform-wide equal to
contributors) · creator earnings → immediate/covenant (equal to all active
members). Every completed exchange writes `exchanges` + append-only `ledger`
rows (idempotency key — see /SCHEMA-FINALIZE.md plutus verdicts). Stripe via
`stripe_connection` (aethelred-connections).

## Work log
- **2026-07-09 (Fable + KP):** Reviewed; two dangling imports recorded;
  PriceBreakdown flagged as a protected feature.
