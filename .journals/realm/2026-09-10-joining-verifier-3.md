# 2026-09-10 · joining · verifier-3

## What was read

No file of this repo was edited by the joining's round-3 hand. The site was read for
the one line of its sending that names it — `npm run build` green — and for the faces'
one open reading: `src/lib/nexus/gateway-read.ts:47`.

## What was verified

- `npm run build` -> `✓ Compiled successfully`, `Generating static pages (305/305)`,
  exit 0.
- `npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx` -> `40 of 40`, exit
  0. `prove-gateway.ts` -> `43 of 43`, exit 0.
  `.journals/proofs/hephaestus-the-apps/prove-apps.ts` -> `28 of 28`, exit 0.
- `columnAbsent(message, 'testing_public')` proved against the base itself, through the
  anon door with a GET: `select=slug,testing_public` answers `400
  {"code":"42703", …,"message":"column beacons.testing_public does not exist"}`, and
  `columnAbsent` answers true. The two-pass read at `:60-101` therefore falls to the
  unflagged select against the live register, and `beacons.testing_public` is not on
  the register: `150-the-testing-public.sql` has not been run.

## What this reading left

The three proof runs rewrote their own result files —
`.journals/proofs/aethelred-the-gateway/results.json`, `results-tracks.json` and
`.journals/proofs/hephaestus-the-apps/results.json`. Their content is deterministic and
carries no time; `git diff --stat` for the two tracked ones is what it was before the
runs. `npm run build` rewrote `.next/` and `tsconfig.tsbuildinfo`, both gitignored.
No source file was touched, nothing was staged and nothing was committed; HEAD
ed4b66fc1.

## What is short

- Plan §5 gives team D `src/app/apps/**`, which does not exist; the route is
  `src/app/(hephaestus)/apps/page.tsx` and the two renders live in `src/components/`
  and `src/lib/apps/`. The plan's line, not a hand's.
- No *Test it* line renders anywhere on the public site while `testing_public` is off
  the register.
