# PROOF — the Register and the Council contract

Two proofs, run from the repo root. Every row in both is a shape: no row here
comes from a base.

| file | proves | run |
|---|---|---|
| `prove-register.tsx` | the Register against two differently-shaped row sets, rendered to static markup and read back | `npx tsx .journals/proofs/aethelred-the-register/prove-register.tsx` |
| `prove-council.ts` | the contract: the roster, the catalog's enrichment, the presence, the refusals, the addresses | `npx tsx .journals/proofs/aethelred-the-register/prove-council.ts` |
| `results.json` | the last Register run's checks | |
| `results-council.json` | the last contract run's checks | |

## the Register

`src/components/asgard/domains/aethelred/nexus/Register.tsx` renders the long
format `section · ord · key · value · note · ref`, tolerating
`mark · seat · at · closed`: a heading per section, a count tile counted from the
rows under it, a source line per section, `ref` as an address, an honest empty
when a section holds no row, and the base's own refusal in three parts when a
read was refused.

The two sets:

- **chair** — four sections, stamps on three rows, a section holding no row, and
  a section whose table refused the read.
- **board** — two sections wearing `mark · seat · ref · closed`, an internal
  address and an external one, a row with no stamp, and an empty section.
- **keys** — one row whose `key`, `seat`, `mark` and `closed` each carry the
  house word.

| set | check | result |
|---|---|---|
| chair | every section heading rendered | pass |
| chair | the seat count tile counts its rows | tile 3 of 3 rows |
| chair | the record count tile counts its rows | tile 2 of 2 rows |
| chair | the agent section prints its honest empty | pass |
| chair | the refused section prints three parts | what happened · why · next step |
| chair | the refused section never prints its empty | unreadable, never empty |
| chair | rows render in ord order | duty before responsibilities |
| chair | each stamp is the row's own, YYYY-MM-DD · HH:MM | 2026-09-09 · 08:12 · 2026-09-08 · 23:40 · 2026-08-10 · 09:15 |
| chair | the tally counts the rows it stands under | 2 rows |
| chair | the house word carries its footnote | KP → /about |
| chair | no percentage anywhere | pass |
| board | both section headings rendered | pass |
| board | the organs count tile counts its rows | tile 3 of 3 rows |
| board | the empty section prints its honest empty | no lamp row yet |
| board | the empty section counts zero | tile 0 |
| board | an internal ref renders as an address | `href="/nexus/bridge"` |
| board | an external ref renders as an address | `href="https://audhdities.com/nexus/bridge"` |
| board | mark renders as a pill | poured |
| board | seat renders beside the key | aethelred |
| board | closed renders beside the value | closed 2026-09-01 |
| board | the row's own stamp renders | 2026-09-08 · 19:02 |
| board | a row without a stamp shows none | no invented stamp |
| board | no percentage anywhere | pass |
| keys | key · seat · mark · closed each carry the footnote | 4 of 4 strings |

24 of 24 checks passed.

## the contract

`src/lib/nexus/council-contract.ts`: the nine chair tables are the roster in
their own order, `council_houses` enriches a chair when a row matches, and the
newest `entity_states` row is the presence. The catalog fixtures carry
`display_order` 1 · 9 · 2 · 12, disagreeing with the roster.

| check | result |
|---|---|
| the roster holds nine chairs | 9 chairs |
| the roster stands in the named order | Hearth-Keeper · Chancellor · Seer · Aethelred · Curator · Archivist · Skald · Codex · Executioner |
| every chair carries a sigil and a colour | pass |
| a chair with no catalog row keeps its own name | Codex |
| a chair with no catalog row reads the honest line | no catalog row yet |
| a chair with no chair row holds none | row · null |
| a chair with no presence row reads 'not present' | not present |
| a chair with no presence row has no stamp | at · null |
| the catalog row is found for a chair | h-seer |
| the catalog row supplies the domain words | patterns, prophecy, vision |
| a catalog row no chair claims is left unclaimed | Gatekeeper claimed by no chair |
| every chair stands in the grid | 9 chairs |
| the grid stands in the roster order against disagreeing display_order | Hearth-Keeper · Chancellor · Seer · Aethelred · Curator · Archivist · Skald · Codex · Executioner |
| chairOrder returns the roster index whatever display_order says | display_order 1 · 9 · 2 · 12 · order 0…8 |
| a row within the hour reads 'present' | present |
| the presence carries the row's own occurred_at | 2026-09-09T08:45:00.000Z |
| an older row reads 'resting' | resting |
| the matcher is case-blind and punctuation-blind | 'Hearth Keeper' matched hearth-keeper |
| a refused chair table holds no row | permission denied for table skald |
| a refused entity_states carries its message | permission denied for table entity_states |
| a refused chair still stands | Skald |
| the chair row supplies current_task | reading the drift between shape and intent |
| a chair row that names no chair is not the chair's row | no match · null |
| a dark chair colour lifts the tile fill | #2E0B1C66 · #636E7233 |
| a light chair colour keeps the base fill | #00CEC920 |
| a slug names its chair | hearth-keeper |
| a table name names its chair | hearth_keeper |
| a chair name names its chair | Aethelred |
| a name outside the roster names none | gatekeeper · null |

29 of 29 checks passed.
