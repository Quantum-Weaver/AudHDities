# the faces, read — 2026-09-10, round 3

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5, read against
its sending, §3 and the round-2 reading. Nothing changed, nothing committed.

## the three defects of round 2

| defect | verdict | address |
|---|---|---|
| the apps half at four addresses outside MAY TOUCH | open, named a third time | `src/lib/apps/apps-contract.ts`, `apps-read.ts`, `src/components/asgard/domains/hephaestus/apps/AppCard.tsx`, `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx` |
| the proof at a third folder | closed | `.journals/proofs/aethelred-the-gateway/prove-tracks.tsx`, `results-tracks.json`, one `PROOF.md` for both; `.journals/proofs/aethelred-the-testing-tracks/` is gone |
| the lint claim unmeasured | closed | measured and reported by exit code; my run reproduces it line for line |

`src/app/apps/**` does not exist: the route is `src/app/(hephaestus)/apps/page.tsx`
and it renders `AppsRegister` → `AppCard`, holding no per-app markup. The address
is the sending's and the plan's (`THE-TESTING-TRACKS-PLAN.md:141`), not the hand's
to move.

## the sending, line by line

| line | verdict | address |
|---|---|---|
| the contract gains the four channels' columns and a typed row | done | `gateway-contract.ts:29-51`, `:99-105`, `:153-187` |
| gateway-read selects them | done | `gateway-read.ts:60-101`, `gateway-contract.ts:184-187` |
| the Gateway row gains a tracks strip, one cell per store | done | `RepoConstellation.tsx:73-108`, `:189` |
| the status word from 043 in plain words | done | `gateway-contract.ts:24-26`, `:131-143`; `043-the-beacons.sql:92-103` |
| the testing and published versions where present | done | `RepoConstellation.tsx:84-95` |
| the testing link as a link where present | done | `RepoConstellation.tsx:96-106` |
| an empty column reads none, never blank | done | `gateway-contract.ts:136` |
| door-not-named and door-refused keep their honest empties | done | `gateway-read.ts:106`, `:75-92`; `RepoConstellation.tsx:372-380` |
| the strip is admin tier | done | `src/app/(aethelred)/nexus/api/page.tsx:35`; one caller |
| the apps page reads the same columns | done differently | `apps-contract.ts:33-63`, `apps-read.ts:16-32`; addresses the sending did not name |
| a Test it line only where testing_public is true and a link stands | done | `AppCard.tsx:66-88`, `gateway-contract.ts:146-151` |
| no red, no badge, no count | done | `AppCard.tsx:69-86`; `neurospark` is `#22D3EE` |
| proved the way the Gateway is proved | done | `.journals/proofs/aethelred-the-gateway/`, the pattern of `aethelred-the-register/` |
| the build green, the check named | done | `npm run build` exit 0 · 305/305 |

## what was run

```
npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx   40 of 40 · exit 0
npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts   43 of 43 · exit 0
npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts        28 of 28 · exit 0
npm run type-check                                               exit 0
npx eslint <the seven changed src files and the three proofs>    exit 0, no output
npm run build                        exit 0 · Compiled successfully in 4.7s · 305/305
npm run lint                         exit 1 · 1200 problems (729 errors, 471 warnings)
```

Every line of the return's verification reproduces, `npm run lint` included:
1200 problems over 908 named files, none of them a file this team changed and
none of them a proof. All 908 stand at HEAD unchanged, so the redness is not
this work's. The three results files are byte-identical before and after my
runs; `git status --short` is what the return printed.

## what stands

No write verb in any changed file: `select` only. The two knowledge variables
are read as booleans at `gateway-read.ts:39-43` and reach no row, no fault and
no return. No `console` line outside a proof's own tally. No comment states why,
when, who or whose word. `.journals/proofs/aethelred-the-testing-tracks/` is
gone and nothing references it.

## what is short

- The apps half's four addresses, above. The conductor's or KP's word.
- `readRegister` decides a column is absent by matching the base's message text
  (`gateway-read.ts:47-49`). That match is proved by an injected answer only.
  Until `150` runs, both the Gateway and the public `/apps` page depend on the
  second, unflagged read; if the base's wording differs from
  `column beacons.testing_public does not exist`, both pages read a fault where
  they now read rows. Settling it needs `150` run, or a live read of the
  knowledge door, which this reading did not open.
- `showsTracks` (`gateway-contract.ts:190-193`) prints a strip for any beacon
  standing in a store, not only for a row per app. It carries forward what the
  deleted `STORE_STANDINGS` line showed.
- `public.beacons.testing_public` is not in the live register:
  `resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted, unrun
  (plan §6 step 5, KP's hand). No `Test it` line renders anywhere until it runs.
