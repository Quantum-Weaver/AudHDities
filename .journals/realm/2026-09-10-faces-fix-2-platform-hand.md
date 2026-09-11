# the faces, the shut door said once — 2026-09-10

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5, round 2:
the verifier's defects on `2026-09-10-faces-platform-hand.md`.

## what the work did

- `src/lib/nexus/gateway-read.ts` — `readRegister`: when the second, unflagged
  select is also refused, the return carries the base's message alone and
  `tracksNote` null. One sentence, never two, and the flag sentence no longer
  prints over a read that held no row.
- `src/lib/nexus/gateway-contract.ts` — `TESTING_FLAG_CLICK`, and
  `TESTING_FLAG_UNREAD` naming it: `beacons.testing_public is not in the
  register · every row reads false · next ·
  resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain`.
- `.journals/proofs/aethelred-the-testing-tracks/prove-tracks.tsx`,
  `PROOF.md`, `results.json` — two checks added: the sentence names the column
  and the click; a refused second read carries the base message alone and no
  second sentence. 40 checks.

## what stands

```
npx tsx .journals/proofs/aethelred-the-testing-tracks/prove-tracks.tsx   40 of 40
npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts          43 of 43
npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts               28 of 28
npm run type-check                                                      exit 0
npx eslint src/lib/nexus/gateway-read.ts src/lib/nexus/gateway-contract.ts  exit 0
npm run build                                            Compiled successfully in 4.6s · 305/305
```

## what is short

Two defects were named as scope, not code, and are left as they stand: the
apps contract, the apps read and the two render components sit outside the
sending's MAY TOUCH list, and the proof sits in a third folder,
`.journals/proofs/aethelred-the-testing-tracks/`, beside the Gateway's and the
apps'. Both are for the conductor.

`public.beacons.testing_public` is still not in the live register:
`resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted, not run.
The read that meets no such column is proved by an injected answer, not by the
base.
