# 2026-09-09 — THE GRAMMAR: the door, Explore and the atom's room (mnemosyne)

*Three pages under `(mnemosyne)/grammar`, one reader, thirteen components, one
proof. Nothing committed, no SQL run, no generated file touched.*

## What stands

| address | what it is |
|---|---|
| `src/lib/grammar/grammar-contract.ts` | the row types picked from the knowledge types, the two view types, the search shape, the honest empties, the three-part fault, the door counts shape, the column lists |
| `src/lib/grammar/grammar-read.ts` | eight named server-side reads over `createApiSupabase('knowledge')` |
| `src/app/(mnemosyne)/grammar/page.tsx` | the Grammar door: six counted tiles, the folksonomies line, four door cards |
| `src/app/(mnemosyne)/grammar/explore/page.tsx` | Explore: the search, the three tiers grouped, the 25 faces, the 41 schemes on four shelves |
| `src/app/(mnemosyne)/grammar/atoms/[word]/page.tsx` | the atom's room: the head, four panels, the dressings |
| `src/components/asgard/domains/mnemosyne/grammar/*.tsx` | thirteen components: `GrammarFault` · `GrammarFootnote` · `DoorTiles` · `DoorCards` · `SearchForm` · `DressedCard` · `TierGroup` · `CategoryFaces` · `SchemeShelves` · `Panel` · `AtomHead` · `AtomPanels` · `AtomDressings` |
| `.journals/proofs/mnemosyne-the-grammar/` | `prove-grammar.ts` · `PROOF.md` · `results.json` |

All three pages are server components with `export const revalidate = 3600`,
wrapped in `Page showForeground={false} showContinuityBeam={true}`, inside
`<main className="min-h-screen py-12">` and
`container mx-auto max-w-[1152px] px-6`. No sign-in gate on any of them.

## The reader

`grammar-read.ts` reads through `createApiSupabase('knowledge')`
(`src/lib/api/supabase.ts:20`): no cookie store, no session, the knowledge
project's own RLS deciding what an anon read gets. `knowledgeDoorNamed()` tests
`NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE` and `NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`;
when either is absent every read returns the fault
`the register was unreadable · <table> · the knowledge door is not named on this host ·
next · NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE and NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE named on this host`.
A refused read returns the same three parts carrying the base's own message and
`next · a read policy on <table> for the anon door`. No read ever answers
"empty".

The eight reads: `readDoorCounts()` (one `{ count: 'exact', head: true }` per
table across `atoms · molecules · organisms · categories · schemes ·
sensory_lexicon · folksonomies · thesaurus`), `searchGrammar(q, category?)`,
`readCategories()`, `readSchemes()`, `readAtomWhole(word)`,
`readAtomDressings(atomId)`, `readAtomBonds(atomId)`, `readAtomLattice(atomId)`.

Search is one read per tier, each with its own exact count and `limit(24)`:
atoms through `atom_dressed` where `is_override = false` with `ilike` on
`atom_word` and `definition`, molecules and organisms through their own tables
with `ilike` on `name` and `definition`. A query is trimmed to 80 characters
and stripped of the characters that would break a PostgREST `or()` filter
(`% _ \ " ( ) , *`) before the pattern is built.

`readAtomBonds` reads `molecule_atoms` and `organism_atoms` joined to their
names, ordered by `position`, capped at 200 rows each, with the exact count
taken from the base. `readAtomLattice` reads `scheme_memberships` joined to
`schemes(name, scheme_type)` with `is_primary`, and `concept_relations` where
the atom stands as subject or object, with `relation_type`.

## The law of the face, as built

The hearth is shown whole and no dressing is merged into it. The atom's room
prints the base definition from `atom_whole` at the head; the dressings panel
prints one hearth line, then one line per `is_override` row labelled by
`folksonomy_type` with its own emoji, colour and definition, beside the hearth
and never in place of it. `splitDressings` in the contract is the one place the
separation is expressed and the pages pass every dressing read through it.

Every count on every page comes from a row: the six tiles from
`{ count: 'exact', head: true }`, the tier counts from each tier's own exact
count, the bond counts from `molecule_atoms` and `organism_atoms`, the category
and scheme counts from the rows read.

Every absence has a sentence: `not yet sensed` per null sensory channel,
`no root recorded yet` · `no historical meaning recorded yet` ·
`no sanctuary meaning recorded yet`, `in no molecule yet` · `in no organism yet`,
`not yet placed in a scheme` · `no typed edges yet`,
`no folksonomy dresses this word yet`, and one per tier for a search that
answers none.

An atom with no `sensory_emoji` wears its category's face and the room says
`wearing its category's face`. An atom with neither wears no face at all.

## Verified

- `npx tsc --noEmit` — no output.
- `npx eslint` on `src/lib/grammar`, `src/app/(mnemosyne)/grammar`,
  `src/components/asgard/domains/mnemosyne/grammar` and the proof — exit 0.
- `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` — 56 of 56.
- `npm run build` — compiled successfully; the manifest carries
  `/(mnemosyne)/grammar/page → /grammar`,
  `/(mnemosyne)/grammar/explore/page → /grammar/explore`,
  `/(mnemosyne)/grammar/atoms/[word]/page → /grammar/atoms/[word]`.
- The knowledge names are set in `.env`, so the three rooms were read live
  against the running dev server: `/grammar` 200, `/grammar/explore?q=reson`
  200, `/grammar/atoms/resonance` 200, `/grammar/atoms/notaword` 404.
  `/grammar` counted 2,366 atoms · 6,731 molecules · 2,541 organisms · 25
  categories · 41 schemes · 2,366 senses · 8 folksonomies · 45 dressings.
  `/grammar/atoms/resonance` rendered every line of the artboard including
  `taste not yet sensed` · `smell not yet sensed` · `in 59 molecules` with eight
  chips and `and 51 more` · `not yet placed in a scheme` · `no typed edges yet`.
  `/grammar/atoms/sad` rendered the hearth row and two dressings, Compass and
  Echoes, each labelled. `/grammar/atoms/ffynnon` rendered
  `wearing its category's face`.

## What stands open

- The gallery engine at `src/lib/gallery` and its dress at
  `src/components/shapes/Gallery.tsx` were read and not used. `Gallery` is a
  client component carrying its own in-page filter input; Explore's results are
  a server-rendered GET search grouped into three tiers, each with its own exact
  count from the base. Routing the tiers through it would have added a second
  filter box per group and made the counts page-side rather than row-side. The
  tier cards are rendered directly by `TierGroup` and `DressedCardFace`.
- A category chip links to `/grammar/explore?category=<name>` and marks itself
  chosen; the search box carries the category forward as a hidden field, so the
  filter narrows the atoms tier of the next search. A category with no query
  shows the faces and the lattice and no results section. The category filters
  the atoms tier only, so a search carrying both a query and a category has one
  narrowed tier and two unnarrowed ones; each tier prints its own exact count
  and the tally is their sum.
- The result cards for molecules and organisms and the bond chips in the atom's
  room link to `/grammar/molecules/<name>` and `/grammar/organisms/<name>`,
  which are not built; those addresses answer 404 until the compound rooms land.
- The Explore and door pages carry the Grammar's own house-words line and the
  Nexus `HouseWordsFooter` beneath it; the footer's glossary names Nexus terms.
- `/grammar/senses`, `/grammar/folksonomies` and `/grammar/carry` render as
  cards reading `not yet wired` with no link.
- Not touched, and owned elsewhere: `next.config.ts`, `page_mapping.ts`,
  `LibraryHub.tsx`, `src/lib/nexus`, `src/lib/api/supabase.ts`, the generated
  folders.
