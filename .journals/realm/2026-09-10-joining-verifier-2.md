# 2026-09-10 · joining · verifier-2

## What was read

`src/lib/nexus/gateway-contract.ts` and
`.journals/proofs/aethelred-the-gateway/prove-tracks.tsx` and its `PROOF.md` — the files
this round changed here — beside `src/lib/nexus/gateway-read.ts`, `src/lib/apps/*` and
the two components that render the strip and the Test it line.

## What was verified

- `showsTracks` at `gateway-contract.ts:190-193` is `return
  types.includes(beacon.beacon_type);` over `STORE_TYPES`. Its one caller is
  `RepoConstellation.tsx:75`. The doc comment states what the function answers.
- `prove-tracks.tsx:201-206` reads *a beacon of another type standing in one store prints
  none*; `:470-476` reads *…prints no strip* and also asserts `gatewayHtml([GRAMMAR])`
  still carries the slug, so the card stands and only the strip is gone. `PROOF.md:99-100`
  and `:123-124` follow. `results-tracks.json` records `passed 40 · total 40`.
- `npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx` -> `40 of 40`, exit 0.
  `prove-gateway.ts` -> `43 of 43`, exit 0. `prove-apps.ts` -> `28 of 28`, exit 0.
- `npm run type-check` -> `tsc --noEmit`, exit 0. `npm run build` -> compiled, 305 static
  pages, exit 0.
- The register, read once through the anon door: `select=slug,testing_public` answers
  `400 {"code":"42703", … "message":"column beacons.testing_public does not exist"}`. Both
  words `columnAbsent` at `gateway-read.ts:47` matches are in that message, and the
  unflagged select answers 40 rows — the fallback the public `/apps` page rides holds
  against the base, not a fixture.
- The same read: six beacons stand in a store — resonance-bubbles (game), resonance-compass,
  resonance-cruthu, resonance-echoes, resonance-lantern, resonance-sirens (apps).
  Beacons of another type standing in a store: 0, so the narrowing hides no standing the
  register holds.
- The three proof scripts write their own results files and are byte-stable: two runs of
  each leave sha256 bc3d6543… , 80b03883… and 400311a7… unchanged.

## What is short

- `public.beacons.testing_public` is not in the register, in the base's own words above.
  `resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted and unrun; every row
  reads the flag false and no `Test it` line renders on the public site.
- The apps half stands at `src/lib/apps/*` and the two components; the plan's team D row
  names `src/app/apps/**`, which is not this repo's route.

I changed nothing here but this journal. My three proof runs rewrote the three
`results*.json` files with the bytes that already stood in them.
