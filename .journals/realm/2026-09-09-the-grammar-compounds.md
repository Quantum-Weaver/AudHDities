# 2026-09-09 — THE GRAMMAR: the molecule's room and the organism's room

*Two rooms added under `(mnemosyne)/grammar/`, three components beside the
atom's, helpers added at the end of the contract, sixteen checks added to the
proof. The reader was not touched; nothing committed.*

## What stands

| address | what changed |
|---|---|
| `src/app/(mnemosyne)/grammar/molecules/[name]/page.tsx` | new — the molecule's room |
| `src/app/(mnemosyne)/grammar/organisms/[name]/page.tsx` | new — the organism's room |
| `src/components/asgard/domains/mnemosyne/grammar/CompoundHead.tsx` | new — the face tile, the name, the cases, the badges, the definition |
| `src/components/asgard/domains/mnemosyne/grammar/BondChain.tsx` | new — an ordered chain of linked chips, role and bond type under each |
| `src/components/asgard/domains/mnemosyne/grammar/CompoundLattice.tsx` | new — the memberships and the typed edges of one compound |
| `src/lib/grammar/grammar-contract.ts` | appended: three panel headings, three sources, the compound house words, `tierCrumb`, `compoundCases`, `moleculeBadges`, `organismBadges`, `compoundFace`, `ChainLink`, `atomLinks`, `moleculeLinks`, `nameLinks`, `chainLinkLine` |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` | sixteen checks in a `compound` set, with a molecule row, an organism row, bond rows out of position order and a face map |
| `.journals/proofs/mnemosyne-the-grammar/results.json` | that proof's last run |

## The rooms

Both are server components with `export const revalidate = 3600`, no gate,
`generateMetadata` naming the row, `notFound()` on a name the base does not
hold, the three-part `GrammarFaultBlock` on a fault, and `GrammarFootnote` at
the foot. Both stand in `container mx-auto max-w-[1152px] px-6` inside
`<Page showForeground={false} showContinuityBeam={true}>`.

The molecule's room: `CompoundHead` · a full-width `Panel` *The atoms* over
`molecule_atoms` holding the bond chain · a two-column row of *Part of* over
`organism_molecules` and the lattice. The organism's room: `CompoundHead` · a
full-width `Panel` *The molecules* over `organism_molecules` · a two-column row
of *The atoms* over `organism_atoms` and the lattice.

Every link is an app path: `/grammar/atoms/<word>`, `/grammar/molecules/<name>`,
`/grammar/organisms/<name>`, `/grammar/schemes/<name>`.

## The honest empties, taken from the contract

`NO_ATOM_BOND` for a chain with no bond, `NOT_IN_AN_ORGANISM` for *Part of*,
`NO_MOLECULE_HELD` for an organism holding none, `NOT_IN_A_SCHEME` and
`NO_TYPED_EDGES` in the lattice, `EDGE_SIDE_UNNAMED` for an edge whose other
side the base does not name, `NO_DEFINITION` under the head. None is retyped.

## What was reused and what was cut fresh

`Panel`, `GrammarFaultBlock`, `GrammarFootnote` and the `Badge` dress of
`DressedCard` are reused as they stand. `CompoundLattice` is cut over the
contract's shared membership and edge types; `AtomPanels`' `LatticePanel` takes
the atom's own lattice type. The shared pieces between them are the contract's
own `SchemeMembershipView`, `NOT_IN_A_SCHEME`, `NO_TYPED_EDGES`,
`PRIMARY_LABEL`, `LATTICE_HEADING` and `ATOM_LATTICE_SOURCE`.

`schemeAddress` is imported from the contract; the duplicate added here was
removed.

## Verification

```
npx tsc --noEmit                                              no output
npx eslint <the seven files touched>                          exit 0
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts   72 of 72
```

Against the dev server already answering on port 3000:

```
/grammar/molecules/beam-resonance            200
/grammar/molecules/calculateResonance        200
/grammar/organisms/calculateBeamResonance    200
/grammar/molecules/notaname                  404
```

`/grammar/molecules/beam-resonance` carries `href="/grammar/atoms/beam"` and
`href="/grammar/atoms/resonance"`, the panel *Part of*, and
`href="/grammar/organisms/calculateBeamResonance"`.

## Not done

`molecules.sensory_override` is not rendered. The column is `Json | null` in
the generated knowledge types, and it is in neither `MoleculeDetail` nor
`MOLECULE_DETAIL_COLUMNS`, so `readMolecule` does not carry it back.
