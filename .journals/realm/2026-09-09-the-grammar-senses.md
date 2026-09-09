# 2026-09-09 — THE GRAMMAR: the senses and the folksonomies

*The two remaining reading rooms built: the emoji wall with the colour shelf,
one mark's room with every atom wearing it and what else it means, the eight
umbrellas, and one umbrella's dressings each beside the hearth atom it dresses.
Four reads, seven components, four pages, two door cards wired. Committed in
98a98cfc, updated grammar hub.*

## What stands

| address | what changed |
|---|---|
| `src/lib/grammar/grammar-contract.ts` | added the senses' shapes and constants (`SenseRow`, `SenseMark`, `ColourChoice`, `SensesWall`, `SenseMeaning`, `SenseWhole`, `ThesaurusEntry`, `senseAddress`, `markTally`, `colourTally`, `sensesWall`, `wallLine`, `colourShelfLine`, `colourLine`, `markCountLine`, `senseMeanings`, `senseTier`), the folksonomies' shapes (`FolksonomyFace`, `FolksonomyKeyRow`, `FolksonomyCard`, `HearthBeside`, `DressingBeside`, `FolksonomyWhole`, `folksonomyAddress`, `tallyByFolksonomy`, `isStarter`, `folksonomyCards`, `dressingCountLine`, `hearthWords`, `hearthByWord`, `hearthBeside`, `dressingsBeside`), the honest empties `NO_MARK_WORN`, `NO_COLOUR_CHOSEN`, `NO_FOLKSONOMY_DRESSING`, `NO_HEARTH_WORD`, and the column lists and ceilings `SENSE_ROW_COLUMNS`, `FOLKSONOMY_COLUMNS`, `THESAURUS_COLUMNS`, `FOLKSONOMY_KEY_COLUMNS`, `SENSES_READ_LIMIT`, `SENSES_PAGE`, `SENSE_ATOM_LIMIT`, `THESAURUS_READ_LIMIT`; `GRAMMAR_DOORS` gave Senses and Folksonomies their hrefs and their own lines, Carry left at `NOT_YET_WIRED` |
| `src/lib/grammar/grammar-read.ts` | added `readSenses`, `readSense`, `readFolksonomies`, `readFolksonomy`, each taking the optional injectable client |
| `src/components/asgard/domains/mnemosyne/grammar/SenseWall.tsx` | new — every mark once as a chip with its count, each a door |
| `src/components/asgard/domains/mnemosyne/grammar/ColourShelf.tsx` | new — every colour as a swatch with its hex and its count |
| `src/components/asgard/domains/mnemosyne/grammar/SenseHead.tsx` | new — the mark large, its counted atoms, the law and its address |
| `src/components/asgard/domains/mnemosyne/grammar/OtherMeanings.tsx` | new — the thesaurus rows carrying the same mark, each linking to its folksonomy room |
| `src/components/asgard/domains/mnemosyne/grammar/FolksonomyCard.tsx` | new — name, status badge, counted dressings, purpose, the starter mark |
| `src/components/asgard/domains/mnemosyne/grammar/FolksonomyHead.tsx` | new — name, status, starter badge, purpose, notes and who keeps it, each drawn only when the row carries it |
| `src/components/asgard/domains/mnemosyne/grammar/DressingBeside.tsx` | new — one row per dressing, the dressing on the left and the hearth atom on the right, or the honest empty |
| `src/app/(mnemosyne)/grammar/senses/page.tsx` | new — the wall and the shelf, `revalidate = 3600` |
| `src/app/(mnemosyne)/grammar/senses/[emoji]/page.tsx` | new — one mark: the head, the atoms as a tier group, the other meanings |
| `src/app/(mnemosyne)/grammar/folksonomies/page.tsx` | new — the eight cards under KP's words with the footnote road |
| `src/app/(mnemosyne)/grammar/folksonomies/[name]/page.tsx` | new — the head and the dressings beside the hearth |
| `src/components/asgard/domains/mnemosyne/grammar/AtomDressings.tsx` | each dressing's folksonomy label is now a link to `folksonomyAddress(...)` |
| `src/lib/constants/systems/environments/page_mapping.ts` | `'/grammar/senses/*'` added — title `The mark`, subtitle `One mark, many meanings` |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` | 22 checks added across the `senses` and `folksonomy` sets |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` | the fake base gained four lexicon rows with marks and colours, two folksonomy rows and three thesaurus rows; 18 checks added across the `senses` and `folksonomy` sets |
| `.journals/proofs/mnemosyne-the-grammar/PROOF.md` | the new fixtures and the new rows, both tallies at this run |
| `.journals/proofs/mnemosyne-the-grammar/results.json` · `results-read.json` | this run |

## The reads

`readSenses` groups the lexicon client-side: every distinct `emoji` with the
count of atoms wearing it, ordered by count then by mark, and every distinct
`color_hex` with its count. It reads `sensory_lexicon` in pages of
`SENSES_PAGE` = 1,000 up to `SENSES_READ_LIMIT` = 3,000, stopping at the first
short page. The sending asked for one read; the anon door caps a single answer
at 1,000 rows (`content-range: 0-999/2366`, read 2026-09-09), so one read would
have counted 1,000 of 2,366 rows and every number on the page would have been
short. The paged read carries all 2,366; `truncated` is `true` only if the
ceiling is met before the rows run out.

`readSense(emoji)` reads `atom_dressed` where `emoji` equals the mark and
`is_override` is false, ordered by `atom_word`, with the base's exact count, and
`thesaurus` where `emoji` equals the same mark. `readFolksonomies` reads the
folksonomy rows and tallies `thesaurus.folksonomy_type` from rows.
`readFolksonomy(name)` finds the row case-blind, reads its thesaurus entries,
then reads the hearth rows for those words in one `in` filter carrying each word
as stored and in lower case, and joins them case-blind.

The starter mark: no folksonomy row's `purpose` or `notes` carries the word
*starter*, so the rule used is `status = 'complete'` — `isStarter()`. Through
the anon door 2026-09-09 that marks Echoes and Compass, and no other.

## What the rooms show, counted from rows

Read live 2026-09-09: 755 marks over 2,003 of 2,366 atoms; 72 colours over 153
of 2,366. The aquarius mark is worn by one atom, `resonance`, and by no
thesaurus row, so its room prints `no folksonomy dresses this mark yet`. Echoes
and Compass hold 12 dressings each, Grammar 21, the other five none. In the
Echoes room four of the twelve words stand beside a hearth atom (`connected`,
`energy`, `relief`, `sad`); the other eight print `no hearth atom carries this
word`.

KP's words on the folksonomy are carried on `/grammar/folksonomies` in
`FOLKSONOMY_SENTENCE`, spelling kept as the sending gave them
(*demostrate*); `desk/THE-GRAMMAR-UX.md` §1 records the same words with
*demonstrate*.

## Verification

```
npx tsc --noEmit                                                     no output
npx eslint <the seventeen touched files>                             exit 0
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts       118 of 118
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts  58 of 58
npm run build                                                        Compiled successfully in 5.3s
```

The four routes stand in the manifest: `○ /grammar/senses`,
`ƒ /grammar/senses/[emoji]`, `○ /grammar/folksonomies`,
`ƒ /grammar/folksonomies/[name]`.

No dev server answered on port 3000, so one was started for the curls and
stopped after them: `/grammar/senses` 200,
`/grammar/senses/%E2%99%92%EF%B8%8E` 200, `/grammar/folksonomies` 200,
`/grammar/folksonomies/Echoes` 200, `/grammar` 200,
`/grammar/atoms/resonance` 200, `/grammar/folksonomies/nowhere` 404.

## Left standing

The Carry card on the door still says `not yet wired`; `/grammar/carry` and the
bundle route are not built. `THESAURUS_READ_LIMIT` is 500 against 45 rows in the
base today.
