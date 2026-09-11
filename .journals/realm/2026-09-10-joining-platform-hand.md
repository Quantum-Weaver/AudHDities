# 2026-09-10 · joining · platform-hand

## What the work did

No file in this repo was changed. The build was run and one open reading was closed
against the live register.

## What was verified

- `npm run build` -> `Compiled successfully in 4.7s`, `Generating static pages using 23
  workers (305/305) in 2.1s`, exit 0.
- `columnAbsent` at `src/lib/nexus/gateway-read.ts:47` had been proved only against an
  injected answer. The live register was asked through the anon door for
  `beacons?select=slug,testing_public&limit=1` and answered 400 with
  `{"code":"42703","details":null,"hint":null,"message":"column beacons.testing_public does
  not exist"}`; the same select without the column answered 200. `columnAbsent(message,
  "testing_public")` reads true on that message, so the two-pass read holds against the base
  as it stands and `/apps` reads rows rather than a fault. A read only; no key value was
  printed or carried.

## What is short

- `public.beacons.testing_public` is not in the register.
  `resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted and unrun; every row
  reads the flag false and no `Test it` line renders on the public site until it runs.
- The apps half stands at `src/lib/apps/**` and two components rather than the
  `src/app/apps/**` of the plan's team D row; `src/app/apps` does not exist and the route
  is `src/app/(hephaestus)/apps`. The plan's team D row names `src/app/apps/**` at
  THE-TESTING-TRACKS-PLAN.md:141.
