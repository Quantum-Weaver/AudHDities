# the faces, read — 2026-09-10, round 1

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5, read against
its sending and §3. Nothing changed, nothing committed.

## the sending, line by line

| line | verdict | address |
|---|---|---|
| the contract gains the four channels' columns and a typed row | done | `src/lib/nexus/gateway-contract.ts:36-120` |
| gateway-read selects them | done | `src/lib/nexus/gateway-read.ts:58-108` |
| the Gateway row gains a tracks strip, one cell per store | done | `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx:74-108` |
| the status word from 043 in plain words | done | `gateway-contract.ts:28-30`, `:150-163` |
| the testing and published versions where present | done | `RepoConstellation.tsx:85-96` |
| the testing link as a link where present | done | `RepoConstellation.tsx:97-107` |
| an empty column reads none, never blank | done | `gateway-contract.ts:154` |
| door-not-named and door-refused keep their honest empties | done | `gateway-read.ts:60-81`, `:97-99` |
| the strip is admin tier | done | `src/app/(aethelred)/nexus/api/page.tsx:35` gates; the component has one caller |
| the apps page reads the same columns | done differently | `src/lib/apps/apps-contract.ts:38-63`, `apps-read.ts:19-31` |
| a Test it line only where testing_public is true and a link stands | done | `src/components/asgard/domains/hephaestus/apps/AppCard.tsx:67-86`, `gateway-contract.ts:180-185` |
| no red, no badge, no count | done | `AppCard.tsx:70-85` |
| proved the way the Gateway is proved | done | `.journals/proofs/aethelred-the-testing-tracks/` |
| npm run build green, the check named | done | `npm run build`, exit 0 |

## what was run

```
npx tsc --noEmit -p tsconfig.json                                exit 0
npx eslint <the seven changed files>                             exit 0
npm run build                                                    exit 0 · 305/305
npx tsx .journals/proofs/aethelred-the-testing-tracks/…tsx       38 of 38
npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts  43 of 43
npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts       28 of 28
npx tsc -p <scratchpad>/tsconfig.verify-proofs.json              exit 0
```

Every line matches the hand's return. The proof re-runs left `results.json`
byte-identical; the working tree is as the hand left it.

The build prerenders `/apps` and reads the live knowledge register through the
anon door. It came back green with no fault line, no `Test it` line and ten
`closed testing` standings in `.next/server/app/apps.html`: the read that meets
no `testing_public` column stands against the live base, and no testing link
reaches the public page while `150` is unrun.

## what stands

No write verb in any changed file — `select` only. No key value reaches a log,
an error, a seed or a return; the two knowledge variables are read as booleans
at `gateway-read.ts:40-43` and never carried. No `--deliver`, no socket opened
for writing. No comment states why, when, who or whose word.

## what is short

Four files outside the sending's MAY TOUCH list were changed: `src/lib/apps/apps-contract.ts`,
`apps-read.ts`, `RepoConstellation.tsx`, `AppCard.tsx`. None is on the MAY NOT
TOUCH list, and the apps route stands at `src/app/(hephaestus)/apps`, not
`src/app/apps`; the rendering the sending asked for lives in the components.
The widening is named, not blessed.

The two-pass read at `gateway-read.ts:58-92` was not asked for. When the second
read also fails it carries both a `fault` and `tracksNote`, so the Gateway would
print two sentences where §3 asks for one. `TESTING_FLAG_UNREAD` at
`gateway-contract.ts:346` names the column but not the click that earns it.
