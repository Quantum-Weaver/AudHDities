# the faces, read — 2026-09-10, round 2

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5, read against
its sending, §3 and the round-1 reading. Nothing changed, nothing committed.

## the two defects of round 1

| defect | verdict | address |
|---|---|---|
| a second refused read carried both a fault and the flag sentence | closed | `src/lib/nexus/gateway-read.ts:84-92` returns the base's message, `rows: []`, `tracksNote: null` |
| the flag sentence named the column, not the click | closed | `src/lib/nexus/gateway-contract.ts:347-349`; the click reads `resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain`, the paper's own header at `resonance-grammar/docs/sql/150-the-testing-public.sql:1` |

`fault` non-null and `tracksNote` non-null cannot stand together: all four
returns of `readRegister` set one or the other. The sentence prints at
`RepoConstellation.tsx:368`, inside the `doorNamed` block, and nowhere else;
`apps-read.ts` carries the field and the public apps page never reads it.

## the sending, line by line

| line | verdict | address |
|---|---|---|
| the contract gains the four channels' columns and a typed row | done | `gateway-contract.ts:29-51`, `:99-105`, `:169-187` |
| gateway-read selects them | done | `gateway-read.ts:104-114` |
| the Gateway row gains a tracks strip, one cell per store | done | `RepoConstellation.tsx:73-108` |
| the status word from 043 in plain words | done | `gateway-contract.ts:24-26`, `:131-143` |
| the testing and published versions where present | done | `RepoConstellation.tsx:84-95` |
| the testing link as a link where present | done | `RepoConstellation.tsx:96-106` |
| an empty column reads none, never blank | done | `gateway-contract.ts:136` |
| door-not-named and door-refused keep their honest empties | done | `gateway-read.ts:75-82`, `:105-107`; `RepoConstellation.tsx:372-380` |
| the strip is admin tier | done | `src/app/(aethelred)/nexus/api/page.tsx:35`; one caller |
| the apps page reads the same columns | done differently | `src/lib/apps/apps-contract.ts:56-63`, `apps-read.ts:22-33` |
| a Test it line only where testing_public is true and a link stands | done | `AppCard.tsx:66-88`, `gateway-contract.ts:146-151` |
| no red, no badge, no count | done | `AppCard.tsx:69-86`; `neurospark` is `#22D3EE` |
| proved the way the Gateway is proved | done differently | `.journals/proofs/aethelred-the-testing-tracks/`, a third folder beside the Gateway's |
| the build green, the check named | done | `npm run build` exit 0 · 305/305 |

## what was run

```
npx tsx .journals/proofs/aethelred-the-testing-tracks/prove-tracks.tsx   40 of 40
npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts          43 of 43
npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts               28 of 28
npm run type-check                                                      exit 0
npx eslint <the seven changed files>                                    exit 0
npm run build                                          exit 0 · 305/305 · 4.7s
npm run lint                                           exit 1 · 729 errors
```

Every line of the return's verification reproduces. The three `results.json`
files are byte-identical before and after the runs. `npm run lint` is `eslint .`
over the whole repo: it is red on `src/scripts/**`, generated config and
`tailwind*.mjs`, and names none of the changed files. That redness stands at
HEAD and is not this hand's.

## what stands

No write verb in any changed file — `select` only, one string reading
`an insert policy on contact_submissions`, which is a refusal sentence. The two
knowledge variables are read as booleans at `gateway-read.ts:39-43` and never
carried into a row, a fault or a return. No `console` line outside the proof's
own tally. No comment states why, when, who or whose word.

## what is short

Unchanged from round 1, both named to the conductor and left:

- Four files outside the sending's MAY TOUCH list carry the render and the apps
  read: `src/lib/apps/apps-contract.ts`, `apps-read.ts`,
  `RepoConstellation.tsx`, `AppCard.tsx`. The named `src/app/apps/**` does not
  exist; the route is `src/app/(hephaestus)/apps`.
- The proof sits at `.journals/proofs/aethelred-the-testing-tracks/`, not at
  `src/lib/nexus/__proofs__/` nor in the Gateway's own proof folder; the two
  existing proof folders were edited to hold the widened row.
- The two-pass read at `gateway-read.ts:60-101` was not asked for.
- `showsTracks` at `gateway-contract.ts:190-193` prints a strip for any beacon
  standing in a store, not only for an app or a game; `STORE_STANDINGS` is gone
  from the contract and the Gateway's old standings line with it.

`public.beacons.testing_public` is not in the live register: `150` is drafted,
unrun. The read that meets no such column is proved by an injected answer.
