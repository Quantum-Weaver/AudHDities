# the faces, the proof at the Gateway's address — 2026-09-10

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5, round 3: the
verifier's defects on `2026-09-10-faces-verifier-2.md`.

## what the work did

- `.journals/proofs/aethelred-the-gateway/prove-tracks.tsx` — the tracks proof
  moved here from `.journals/proofs/aethelred-the-testing-tracks/`, one of the
  two addresses the sending names. Its header carries the new run line and it
  writes `results-tracks.json` beside itself; the Gateway proof's `results.json`
  is untouched. The pattern is `.journals/proofs/aethelred-the-register/`: two
  proofs, two results files, one paper.
- `.journals/proofs/aethelred-the-gateway/PROOF.md` — holds both proofs: the
  file table names `prove-gateway.ts`, `prove-tracks.tsx` and the two results
  files; the Gateway's fixtures and checks, then the tracks fixtures and checks;
  one closing section for what neither proof reaches.
- `.journals/proofs/aethelred-the-testing-tracks/` — removed, its script and its
  paper carried whole into the Gateway's folder.

No file under `src/` changed this round.

## what stands

```
npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx    40 of 40 · exit 0
npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts    43 of 43 · exit 0
npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts         28 of 28 · exit 0
npm run type-check                                                 exit 0
npx eslint <the seven changed src files and the three proofs>      exit 0
npm run build                    exit 0 · Compiled successfully in 4.8s · 305/305
npm run lint                     exit 1 · 1200 problems (729 errors, 471 warnings)
```

`npm run lint` is `eslint .` over the whole repo. It exits 1 and names 908
files across `src/lib`, `src/app`, `src/components`, `src/scripts`,
`src/config`, `src/contexts` and the two `tailwind*.mjs`. It names none of the
files this team changed and none of the three proofs; those ten are green under
`eslint` run against them directly.

## what is short

The apps half of the sending sits at four addresses outside its MAY TOUCH list:
`src/lib/apps/apps-contract.ts`, `src/lib/apps/apps-read.ts`,
`src/components/asgard/domains/hephaestus/apps/AppCard.tsx` and
`src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx`. The named
`src/app/apps/**` does not exist: the route is `src/app/(hephaestus)/apps/`, and
its `page.tsx` renders `AppsRegister` → `AppCard`, so the per-app line has no
address inside the route folder. Unmoved in three rounds; it is the conductor's
or KP's word, not a code change.

`public.beacons.testing_public` is not in the live register:
`resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted, not run
through the seed chain. The read that meets no such column is proved by an
injected answer, not by the base.
