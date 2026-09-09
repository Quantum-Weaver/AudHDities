# 2026-09-09 — THE GRAMMAR: the reads for the compound, the category and the lattice

*Five named reads added to the one reader, their shapes added to the contract,
one proof added over the reader itself. No page and no component touched,
nothing committed.*

## What stands

| address | what changed |
|---|---|
| `src/lib/grammar/grammar-contract.ts` | the relation sides and their edges, the compound shapes, the category shape, the scheme shapes and tallies, six honest empties, the tier word, the new column lists and two ceilings |
| `src/lib/grammar/grammar-read.ts` | the injectable knowledge client surface, an optional client on every read, and five new reads |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` | the reader proved against a fake knowledge client |
| `.journals/proofs/mnemosyne-the-grammar/results-read.json` | that proof's last run |
| `.journals/proofs/mnemosyne-the-grammar/PROOF.md` | both proofs, their fixtures and their checks |

## The reads

```
readMolecule(name: string, client?: KnowledgeClient): Promise<Reading<MoleculeWhole | null>>
readOrganism(name: string, client?: KnowledgeClient): Promise<Reading<OrganismWhole | null>>
readCategory(name: string, client?: KnowledgeClient): Promise<Reading<CategoryWhole | null>>
readScheme(name: string, client?: KnowledgeClient): Promise<Reading<SchemeWhole | null>>
readSchemeCounts(client?: KnowledgeClient): Promise<Reading<SchemeTallies>>
```

Each is gated on `knowledgeDoorNamed()` and returns rows or the three-part fault
carrying the base's own message and the table it came from. An unknown name
answers `{ ok: true, value: null }`, so a room renders `notFound()` rather than
a fault.

`readMolecule` reads `molecules` by an exact `ilike` on `name`, then
`molecule_atoms` ordered by `position` joined to `atoms(atom_word,
category_name)`, then `sensory_lexicon` by the bonded atom ids for each face,
then `organism_molecules` joined to `organisms(name)`, then `scheme_memberships`
joined to `schemes(name, scheme_type)` by `molecule_id`, then `concept_relations`
where the molecule stands at either end, with each other side's id resolved to a
name by a read of its own table.

`readOrganism` reads `organisms` the same way, then `organism_molecules` ordered
by `position` joined to `molecules(name)`, then `organism_atoms` ordered by
`position` joined to `atoms`, then the faces, the memberships by `organism_id`
and the relations from the organism's end.

`readCategory` reads `categories` by `ilike`, then `atom_dressed` where
`is_override = false` and `category_name` is the category's own name, ordered by
`atom_word`, capped at 200 rows with the exact count taken from the base.

`readScheme` reads `schemes` by `ilike`, then `scheme_memberships` by
`scheme_id` ordered by `sort_order` joined to `atoms(atom_word)`,
`molecules(name)` and `organisms(name)`, the atom members' faces from
`sensory_lexicon`, then `concept_relations` where `scheme_id` is the scheme with
both ends named, then the schemes whose `parent_scheme_id` is this one, then the
parent's name when it has one.

`readSchemeCounts` reads `schemes(id, name)`, `scheme_memberships(scheme_id)` and
`concept_relations(scheme_id)` and counts the rows per scheme, keyed by scheme
name. No head count is used; a row naming no scheme is dropped.

## The injectable client

`grammar-read.ts` declares `KnowledgeClient` · `KnowledgeTable` ·
`KnowledgeQuery` · `KnowledgeAnswer`: the chainable surface the reads use —
`from` · `select` · `eq` · `ilike` · `or` · `in` · `order` · `limit` · `range`,
awaited for `{ data, error, count }`. Every read takes that client as an optional
last parameter and falls back to `createApiSupabase('knowledge')`, the way
`src/lib/nexus/gateway-github.ts` takes a `GatewayFetch`. Existing callers pass
no client and are unchanged.

## The empties and the shapes

`no atom bonds recorded` · `part of no organism` · `holds no molecule` ·
`no member yet` · `no edge in this scheme` · `no atom wears this face yet`, and
`tierWord(tier)` for the one word a tier is named by.

`MoleculeWhole` · `OrganismWhole` · `CategoryWhole` · `SchemeWhole` ·
`SchemeTallies`, with `CompoundAtom` · `CompoundMolecule` · `SchemeMember` ·
`ConceptEdge` · `SchemeEdge` · `EdgeSide` beneath them. Every name in them
carries the address of its own room.

## Verified

- `npx tsc --noEmit` — no output.
- `npx eslint src/lib/grammar .journals/proofs/mnemosyne-the-grammar` — exit 0.
- `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` — 56 of 56.
- `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` — 39 of 39.
- A dev server was already answering on port 3000:
  `curl -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/grammar/atoms/resonance`
  — `200`.

## What stands open

- No page or component was touched. `/grammar/molecules/[name]`,
  `/grammar/organisms/[name]`, `/grammar/categories/[name]`, `/grammar/schemes`
  and `/grammar/schemes/[name]` do not exist yet; the reads wait for them.
- Relation ends are resolved to names by a second read per tier.
- `readSchemeCounts` reads at most 5,000 membership rows and 5,000 relation
  rows; the base holds 41 schemes and the lattice is smaller than that ceiling
  today.
- `npm run build` was not run.
