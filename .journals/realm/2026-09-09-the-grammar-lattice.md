# 2026-09-09 · the Grammar: the category's room and the lattice

Step 3 of THE-GRAMMAR-UX road, the category and the lattice halves.

## Rooms added

- `src/app/(mnemosyne)/grammar/categories/[name]/page.tsx` — the face at 64px, the
  name, the description, the count line, the atoms as dressed cards through
  `TierGroup`. `readCategory(name)`; `notFound()` on an unknown name;
  `GrammarFaultBlock` on a fault; `GrammarFootnote` at the foot.
- `src/app/(mnemosyne)/grammar/schemes/page.tsx` — the pill, the title, the quoted
  sentence with its address, then the four shelves rank · facet · axis · dimension,
  each a `Panel` with its counted header, each scheme a card carrying its member and
  edge counts. `readSchemes()` and `readSchemeCounts()`.
- `src/app/(mnemosyne)/grammar/schemes/[name]/page.tsx` — the head, the description,
  THE MEMBERS and THE EDGES as panels. `readScheme(name)`; `notFound()` on an
  unknown name.

Every page is a server component with `revalidate = 3600`, no gate, the container
`container mx-auto max-w-[1152px] px-6`, `<Page showForeground={false}
showContinuityBeam={true}>` and `generateMetadata` on the two named rooms.

## Components added

`src/components/asgard/domains/mnemosyne/grammar/`: `CategoryHead.tsx`,
`SchemeShelf.tsx`, `SchemeHead.tsx`, `SchemeMembers.tsx`, `SchemeEdges.tsx`.
They reuse `Panel`, `DressedCard` through `TierGroup`, `GrammarFault`,
`GrammarFootnote`.

## Components edited

- `SchemeShelves.tsx` — each chip is a link to `/grammar/schemes/<name>`.
- `DoorTiles.tsx` — a tile named in `TILE_ROOMS` is a link; categories opens
  `/grammar/explore`, schemes opens `/grammar/schemes`.
- `AtomHead.tsx` — the category badge is a link to `/grammar/categories/<name>`.
- `AtomPanels.tsx` — a membership's scheme name is a link to
  `/grammar/schemes/<name>`.

## Contract

Added at the end of `grammar-contract.ts`: `categoryRoomAddress`,
`categoryCountLine`, `categoryTier`, `schemeAddress`, `SchemeCard`,
`SchemeKindShelf`, `shelveSchemeCards`, `shelfLine`, `schemeCardLine`, `edgeArrow`,
`edgeSideWord`, `edgeSentence`, `TILE_ROOMS`, and the room's words
(`LATTICE_TITLE`, `LATTICE_SENTENCE`, `LATTICE_SENTENCE_ADDRESS`, `LATTICE_SOURCE`,
`MEMBERS_HEADING`, `MEMBERS_SOURCE`, `EDGES_HEADING`, `EDGES_SOURCE`,
`SCHEME_CRUMB`, `BACK_TO_LATTICE`, `PARENT_LABEL`, `CHILDREN_LABEL`,
`EDGE_SIDE_UNNAMED`, `CATEGORY_PILL`, `CATEGORY_SOURCE`, `CATEGORY_CRUMB`,
`NO_CATEGORY_DESCRIPTION`, `NO_SCHEME_DESCRIPTION`).

Three edits to standing declarations, two additive and one a reorder:

- `SCHEME_SHELVES` reordered to `rank · facet · axis · dimension`, the order
  THE-GRAMMAR-UX §5 names. One shelf order, read by both Explore and the lattice.
- `SchemeChip` and `SCHEME_COLUMNS` gained `description`.
- `SchemeDetail` and `SCHEME_DETAIL_COLUMNS` gained `deity_name`.

`grammar-read.ts` untouched.

## Proof

`.journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` gained the sets
`category` (5), `shelves` (8) and `scheme` (8), and the `SCHEMES` fixture gained the
description column. `npx tsx` run: 93 of 93 pass.

## Verification

- `npx tsc --noEmit` — no output, exit 0.
- `npx eslint` on the fourteen touched files — exit 0.
- `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` — 93 of 93.

## Not done

The lattice list prints each scheme's description only where the row carries one;
nothing else of the sending is outstanding. A dev server answered `/grammar` 200 at
the first probe and refused every connection after, so the five curls and the shelf
grep were not made.
