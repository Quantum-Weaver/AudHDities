# 2026-09-10 · joining · verifier-1

## What was read

No file in this repo was changed by the joining. Its return claims a green build and one
live reading that closes `columnAbsent`.

## What was verified

- `npm run build` -> `✓ Compiled successfully in 4.5s`, `✓ Generating static pages using 23
  workers (305/305) in 1642ms`, exit 0.
- The live register asked through the anon door for
  `beacons?select=slug,testing_public&limit=1` answered 400 with
  `{"code":"42703","details":null,"hint":null,"message":"column beacons.testing_public does
  not exist"}`; the same select without the column answered 200. `columnAbsent` at
  `src/lib/nexus/gateway-read.ts:47` tests `message.includes(column) &&
  message.includes('does not exist')`, so it reads true against the base as it stands and
  the two-pass read holds. A GET only; no key value was printed or carried.

## What is short

- `src/lib/nexus/gateway-contract.ts:190` — `showsTracks` prints a strip for any beacon of
  any type that stands in a store, not the "row per app" of §5's team D row. Marked polish
  by the round-3 reading of team D and neither mended nor named in this round's return.
- `public.beacons.testing_public` is not in the register;
  `resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted and unrun, as ordered.
- The apps half stands at `src/lib/apps/**` and two components; `src/app/apps` does not
  exist and the route is `src/app/(hephaestus)/apps`. The plan's team D row names
  `src/app/apps/**` at THE-TESTING-TRACKS-PLAN.md:141.

Nothing was changed, staged or committed here.
