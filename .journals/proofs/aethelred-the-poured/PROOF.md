# PROOF — the poured reader, the Bridge's shapes, the keys

One proof, run from the repo root. Every row in it comes from an artifact file
on disk; no network, no base, no proxy.

| file | proves | run |
|---|---|---|
| `prove-poured.ts` | the reader lifts and parses a poured block, the three Bridge shapes map every row, a refused read stands as three parts, and Integrations lists names only | `npx tsx .journals/proofs/aethelred-the-poured/prove-poured.ts` |
| `results.json` | the last run's checks | |

## the reader

`src/lib/nexus/poured-read.ts` fetches `/artifacts-proxy/<slug>` with the
visitor's own cookies and lifts the `progenatrix-data` block out of the page.
`liftBlock` and `parseBlock` are pure and are what this proof exercises against
`resonance-progenatrix/artifacts/the-organs.html`, `the-switchboard.html` and
`the-hands.html`.

A page carrying no block, a block that is not JSON, and a block carrying no rows
each answer a fault. A fault becomes one section carrying what happened, why,
and the next step — never an empty.

## the Bridge

`src/lib/nexus/bridge-contract.ts` maps three blocks into the long format:

- **the-organs** — already long format; 90 rows in 10 sections, one row out per
  row in.
- **the-switchboard** — 52 rows grouped into `the lamps · <line>`; the session
  id is read by nothing and appears nowhere on the page.
- **the-hands** — 32 rows grouped into `the hands · <kind>`.

Every mapped row stands in a section that has a section card, carries a key, and
holds an ord distinct inside its section.

## the keys

`src/lib/nexus/integrations-contract.ts` reads the key names out of the Organs
register's own `note` column, behind the mark `keys:`. 36 of 90 entries name a
key; all 10 lines of the register get a section, and the 8 that name none print
their own sentence. No value reaches the page: the proof asserts no listed value
carries an assignment.
