# 2026-09-09 — THE GRAMMAR: step three trued

*The verifier's findings on the Grammar's step three carried out: the frozen
count dropped for a counted one, the compound's face tile guarded, the category
room's pill and source wired, the bond strength and the compound dressings
rendered, the chosen face given its door on Explore, the proof brought to its
run and three journals trued. Nothing committed.*

## What stands

| address | what changed |
|---|---|
| `src/app/(mnemosyne)/grammar/schemes/page.tsx` | `metadata` replaced by `generateMetadata`; the description's count is `readSchemes().length`, and carries no number when the read faults |
| `src/components/asgard/domains/mnemosyne/grammar/CompoundHead.tsx` | the 64px face tile renders only when the chain carries a face |
| `src/components/asgard/domains/mnemosyne/grammar/CategoryHead.tsx` | `CATEGORY_PILL` as the room's pill |
| `src/components/asgard/domains/mnemosyne/grammar/TierGroup.tsx` | an optional `source` beside the tier's count |
| `src/app/(mnemosyne)/grammar/categories/[name]/page.tsx` | `CATEGORY_SOURCE` passed to the tier group |
| `src/components/asgard/domains/mnemosyne/grammar/CompoundDressings.tsx` | new — the hearth row, then one line per key of the compound's sensory override, or the honest empty |
| `src/app/(mnemosyne)/grammar/molecules/[name]/page.tsx` | the dressings panel, source `molecules.sensory_override` |
| `src/app/(mnemosyne)/grammar/organisms/[name]/page.tsx` | the dressings panel, source `organisms.sensory_override` |
| `src/app/(mnemosyne)/grammar/explore/page.tsx` | one line above the results opening the chosen face's own room, drawn only when the categories name it |
| `src/lib/grammar/grammar-contract.ts` | `MoleculeDetail`, `OrganismDetail`, `MOLECULE_DETAIL_COLUMNS` and `ORGANISM_DETAIL_COLUMNS` gained `sensory_override`; `ChainLink` gained `strength`, carried by `atomLinks` and printed by `chainLinkLine`; added `STRENGTH_LABEL`, `NO_COMPOUND_DRESSING`, `MOLECULE_DRESSING_SOURCE`, `ORGANISM_DRESSING_SOURCE`, `OverrideLine`, `overrideLines`, `categoryRoomLine`, `latticeDescription` |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` | three checks added to the `compound` set, one check trued to the strength in the line |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` | the molecule fixture carries a sensory override; one check that it rides through `readMolecule` |
| `.journals/proofs/mnemosyne-the-grammar/PROOF.md` | the `compound`, `category`, `shelves` and `scheme` rows added, the shelving result and both tallies brought to this run |
| `.journals/proofs/mnemosyne-the-grammar/results.json` · `results-read.json` | this run |
| `.journals/realm/2026-09-09-the-grammar-lattice.md` | the block names three edits, one of them a reorder; the shelves set counts 8 |
| `.journals/realm/2026-09-09-the-grammar-compounds.md` | one sentence of what stands in place of the passage; the who-and-when line and the untouchable line struck |
| `.journals/realm/2026-09-09-the-grammar-reads.md` | the relation resolution stated as what is |

## The reads

`MOLECULE_DETAIL_COLUMNS` and `ORGANISM_DETAIL_COLUMNS` are the column lists
`readMolecule` and `readOrganism` select by, so `sensory_override` rides back
with the row and `grammar-read.ts` itself needed no edit.

`molecules.sensory_override` is `Json | null` and `organisms.sensory_override`
is `string | null`. `overrideLines` takes either: a JSON text is parsed, an
object prints one line per key, an array one line per item, any other value one
line whole, and a null value inside is dropped. No molecule and no organism in
the base carries an override today, counted through the anon door
2026-09-09, so both rooms print `no dressing overrides this name yet`.

## Verification

```
npx tsc --noEmit                                                    no output
npx eslint <the twelve touched code and proof files>                exit 0
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts      96 of 96
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts 40 of 40
```

No server answered on port 3000; no build was run.

## Left standing

`DoorTiles`' categories tile links to `/grammar/explore` and the linked tiles
wear `variant="interactive"`, as they stand.
