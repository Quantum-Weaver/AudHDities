# 2026-09-10 · joining · fix-2 · platform-hand

## What the work did

Two files changed in this repo, and one written by its own run.

**The tracks strip is the row per app.** `src/lib/nexus/gateway-contract.ts:190`
`showsTracks` read `types.includes(beacon.beacon_type) || trackCells(beacon).some((cell)
=> cell.stands)`. It is now `types.includes(beacon.beacon_type)` — the plan's row per
app, `STORE_TYPES` being `app` and `game`. A beacon of another type prints no strip
whatever its store columns hold.

**The proof says the new word.** `.journals/proofs/aethelred-the-gateway/prove-tracks.tsx`
carries the two flipped checks — `a beacon of another type standing in one store prints
none` at the contract and `…prints no strip` at the render, the render check also
asserting the card itself still prints. `PROOF.md`'s two table rows follow, and
`results-tracks.json` is what the run wrote.

## What was verified

- `npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx` -> `40 of 40`,
  exit 0, `results-tracks.json` recording `passed 40 · total 40`.
- `npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts` -> `43 of 43`, exit 0.
- `npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts` -> `28 of 28`, exit 0.
- `npm run type-check` -> `tsc --noEmit`, exit 0.
- `npm run build` -> `✓ Compiled successfully in 4.6s`, `✓ Generating static pages using
  23 workers (305/305)`, exit 0.
- The prerendered `/apps` page: `Test it` 0, `refused this read` 0, `is not in the
  register` 0, `closed testing` 10 — the public face shows the standings and no testing
  link while the flag column is absent.
- The live register through the anon door, read for this: 40 beacons; six stand in a
  store (`resonance-bubbles` game, `resonance-compass`, `resonance-cruthu`,
  `resonance-echoes`, `resonance-lantern`, `resonance-sirens`, all `app`); beacons of
  another type standing in a store: 0. The narrowed rule drops no standing the register
  holds today.
- `gateway-read.ts:47` `columnAbsent` proved against the base rather than an injected
  answer: a select carrying `testing_public` answers `400 {"code":"42703", …
  "message":"column beacons.testing_public does not exist"}`, which the matcher's
  `testing_public` and `does not exist` both meet, and the unflagged select answers 40
  rows.

## What is short

- `public.beacons.testing_public` does not stand in the register;
  `resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted and unrun, so every
  row reads the flag false and no `Test it` line renders anywhere.
- The apps half stands at `src/lib/apps/**` and two components, not at `src/app/apps/**`:
  that route does not exist — the route is `src/app/(hephaestus)/apps/page.tsx` and it
  renders `AppsRegister -> AppCard` with no per-app markup.
