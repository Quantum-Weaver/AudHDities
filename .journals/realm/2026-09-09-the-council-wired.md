# the council wired

`/nexus/council` and `/nexus/council/[id]` read superposition live. The rest of
the Nexus is untouched: the hub, the Health, the Bridge, the Pulse, the Gateway,
Integrations. Call is not built.

## the road for reads

Server components. Each page builds a Supabase client from the visitor's own
cookies through `src/lib/supabase/server.ts` — the client `src/app/artifacts-proxy/[[...path]]/route.ts`
uses — so RLS decides per visitor and the app holds no key. Gaia's generated
layer supplies the row types (`src/lib/generated/types/**`); its hooks and
`/api/generated` routes are not on this road.

Tables read: `council_houses` · `entity_states` · the nine chair tables
(`aethelred_house archivist chancellor codex curator executioner hearth_keeper
seer skald`) · `agent_activities` `agent_conversations` `agent_messages` ·
`boundaries` · `protocols`.

## what is

| file | what it is |
|---|---|
| `src/lib/nexus/council-contract.ts` | the contract: `COUNCIL_SEATS` (the roster of nine, in the house's order, each with its table, sigil and `COUNCIL_COLORS` colour), `CouncilChair`, `CouncilPresence`, `matchesEntity` (lifted from `src/components/asgard/domains/cosmic/theater/Theater.tsx:98`), `matchesNames`, `chairNames`, `houseFor`, `seatForSlug`, `presenceFrom`, `chairFrom`, `chairOrder`, and the honest-empty words |
| `src/lib/nexus/council-read.ts` | one read per table through the visitor's session, and one presence read per chair; each returns `{ table, rows, fault }`, a fault being the base's own message |
| `src/components/asgard/domains/aethelred/nexus/Register.tsx` | the reader: `section · ord · key · value · note · ref`, tolerating `mark · seat · at · closed` |
| `src/components/asgard/domains/aethelred/nexus/Stamp.tsx` | a row's own timestamp as `YYYY-MM-DD · HH:MM`, UTC on the server and the visitor's own zone in the browser |
| `src/components/asgard/domains/aethelred/nexus/Presence.tsx` | the presence word, its dot, and the presence field worn only by a present chair |
| `src/components/asgard/domains/aethelred/nexus/HouseWords.tsx` | the superscript footnote on the first house word, and the room's footer line and glossary, both to `/about` |
| `src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx` | the grid: nine cards in three columns at 1152 max width, sigil tile, name, the catalog's own domain words, the presence word with its dot and stamp, `current_task` |
| `src/components/asgard/domains/aethelred/nexus/EntityDetail.tsx` | the chair's room: the header with the presence field, then five Registers; and `ChairNotFound` for an address outside the roster |
| `src/app/(aethelred)/nexus/council/page.tsx` | reads `council_houses`, the nine chair tables, and `entity_states` once per chair; builds one chair per seat on the roster and stands them in the roster's order |
| `src/app/(aethelred)/nexus/council/[id]/page.tsx` | resolves any of the nine slugs to its seat, then reads the catalog, the chair's table, the three agent tables, `boundaries`, `protocols`; shapes five row sets |

Retired: `COUNCIL_ENTITIES`, `ENTITY_TEMPERATURES`, `ENTITY_DOMAINS`,
`ENTITY_INSTRUMENTS`, `ENTITY_ICONS`, and the 400 ms timer in `EntityDetail`.
No percentage, no temperature, no progress bar and no `Skeleton` stands on
either page.

## the words the pages print

- the roster is the nine chair tables: every chair always stands, in the order
  Hearth-Keeper · Chancellor · Seer · Aethelred · Curator · Archivist · Skald ·
  Codex · Executioner. That order is the grid's; `display_order` is not
  consulted. `council_houses` enriches a chair; a chair no catalog row
  names keeps its own name, sigil and colour and reads `no catalog row yet`.
  The grid is never empty and no chair is ever filtered out.
- presence: `present` when the newest `entity_states` row is within the hour,
  `resting` when older, `not present` when there is none; the row's own
  `occurred_at` beside the word, or `no row yet`.
- a value that has no row: `not yet recorded` · `no row yet` ·
  `no catalog row yet` · `no agent row names this chair` ·
  `no boundary names this chair` · `no protocol row names this chair` ·
  `no presence row yet` · `no task recorded`. A chair table that answers zero
  rows prints `no task recorded`.
- a read the base refused, in a Register section, in three parts:
  `the base refused this read` · `<table> · <the base's message>` ·
  `next · a read policy on <table> for this visitor`. A section that was refused
  never prints its empty. On a card the refusal is one line,
  `the base refused this read · <table>`, and the card still stands.
- a table that answers zero rows without an error is indistinguishable from a
  table with no read policy from the app's side; that case prints the honest
  empty with the source line naming the table.

## verified

| check | result |
|---|---|
| `npx tsc --noEmit` | exit 0, no output |
| `npm run build` | `✓ Compiled successfully`, `ƒ /nexus/council`, `ƒ /nexus/council/[id]` |
| `npx eslint` on the files of this pass | exit 0 |
| `.journals/proofs/aethelred-the-register/prove-register.tsx` | 24 of 24 checks passed |
| `.journals/proofs/aethelred-the-register/prove-council.ts` | 29 of 29 checks passed |
| `grep -rn "COUNCIL_ENTITIES\|ENTITY_TEMPERATURES\|ENTITY_DOMAINS\|ENTITY_INSTRUMENTS\|ENTITY_ICONS" src/` | no match |
| `grep -rn "setTimeout" src/components/asgard/domains/aethelred/nexus/ "src/app/(aethelred)/"` | no match |
| `grep -rn "%\|[Tt]emperature\|runes/Progress"` on the nexus components, the council routes and `src/lib/nexus/` | one file only, `EntityCardRenderer.tsx` |
| `grep -rn "SERVICE_ROLE\|SUPABASE_SECRET\|createServiceSupabase\|\.env"` on the same paths | no match |

The live rows are unverified here: no session signed in.

## standing

`src/components/asgard/domains/aethelred/nexus/EntityCardRenderer.tsx` still
holds `Progress`, `temperature` and a percentage. It is a rune renderer reached
only by `SmartCard` in `src/components/runes/Card.tsx`, which nothing in the tree
calls; neither council page renders it.

`Badge`'s `pill` prop emits `9999px` as a class name
(`src/lib/constants/components/runes/badge.constants.ts:27`, `BORDER_RADII.full`).
The Register asks for `rounded-full` in `className` instead.

## trued

- `src/app/(aethelred)/nexus/council/page.tsx:69` — `houses.fault` reaches the
  grid as `catalogFault`; `CouncilEntityList.tsx:48` prints
  `the base refused this read · council_houses` in the domain line of every card,
  and each card still stands.
- `src/lib/nexus/council-contract.ts:190` — `chairOrder` returns the roster index
  unconditionally; `council_houses.display_order` is not read for the grid.
  `.journals/proofs/aethelred-the-register/prove-council.ts:140` carries catalog
  fixtures with `display_order` 1 · 9 · 2 · 12 and asserts the named order.
- `src/lib/nexus/council-read.ts:64` — `readEntityStates` is replaced by
  `readChairStates(names, limit)`: one query per chair, filtered with `or` over
  `entity_name.ilike` patterns built from the chair's names and their head words,
  ordered `occurred_at` descending, `PRESENCE_ROWS_CARD` 20 for a card and
  `PRESENCE_ROWS_ROOM` 1000 for a chair's room. The in-memory matcher still
  decides the final match. All nine reads run through
  `src/lib/supabase/server.ts`.
- `src/components/asgard/domains/aethelred/nexus/Register.tsx:102` — `row.key`,
  `row.seat`, `row.mark`, `row.closed` and the section heading render through
  `withHouseWords`; `CouncilEntityList.tsx:130` and `EntityDetail.tsx:76` render
  `chairName` through it, and `ChairNotFound`'s title at `EntityDetail.tsx:141`.
- `src/lib/nexus/council-contract.ts:149` — `seatRowFor` returns null when no row
  names the chair; the `rows[0]` fallback is gone.
- `src/lib/nexus/council-contract.ts:235` — `sigilFill(color)` computes the tile
  fill from the chair's colour, its alpha lifted as the colour darkens:
  `66` under lightness 0.2, `33` under 0.5, else `20`. Aethelred reads
  `#2E0B1C66`, Archivist `#636E7233`. `CouncilEntityList.tsx:35` and
  `EntityDetail.tsx:63` wear it.
- `src/app/(aethelred)/README.md:49` and `:80` — the Council Entities paragraph
  and the `CouncilEntityList` row state the roster's order and the catalog's
  enrichment.
- The two back-links, `CouncilEntityList.tsx:96` and `EntityDetail.tsx:34`, carry
  `motion-reduce:transition-none`.
