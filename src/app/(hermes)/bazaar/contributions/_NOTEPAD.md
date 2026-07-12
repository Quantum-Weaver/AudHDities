# _NOTEPAD — `bazaar/contributions/` · the Contributions Ledger
*Room-level working log. Group context: `../../_NOTEPAD.md`. Newest on top.*

## What this room is
The credit room — `/bazaar/contributions`. Component: `ContributionsGallery`.

## The 2026-07-09 meaning upgrade
With KP's platform-wide-equal residual decision, this room's purpose
*improved without a redesign*: it is now a **provenance gallery** — who
helped make what, honored publicly — while residual money flows as an equal
dividend to all platform contributors. Credit and payment decoupled; both
truer. (Same philosophy as the repo-level HANDS.md standard, in product form.)

## Gaps / rewire
- Old `contributions` table (with percent_share driving payouts) does not
  exist in the live schema; provenance lives in `ware_participants` +
  `work_participants` (hestia-core). Gallery re-points there.
- Residual *payout* visibility (the equal dividend) reads from
  `distributions` / `distribution_recipients` (migrating into
  plutus-economics) — decide whether this room also shows the dividend
  ledger or stays purely credit. — awaiting KP.

## Work log
- **2026-07-09 (Fable + KP):** Reviewed; meaning-upgrade recorded; data
  re-point mapped; one display question left open.
