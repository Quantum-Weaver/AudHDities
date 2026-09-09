# 2026-09-09 — THE GRAMMAR: the senses trued

*The verifier's findings on step four answered: the paged lexicon read proven at
its boundaries, `truncated` shown on the wall, the folksonomy's empty printed
once, and two journals brought to what stands.*

## What changed

| address | what changed |
|---|---|
| `src/lib/grammar/grammar-contract.ts` | added `SENSES_TRUNCATED`, the wall's sentence built from `SENSES_READ_LIMIT` |
| `src/components/asgard/domains/mnemosyne/grammar/SenseWall.tsx` | prints `SENSES_TRUNCATED` beneath the wall line when `wall.truncated` is true |
| `src/components/asgard/domains/mnemosyne/grammar/DressingBeside.tsx` | the count line moved inside the non-empty branch; a folksonomy holding no dressing now prints `NO_FOLKSONOMY_DRESSING` once |
| `.journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` | added `lexiconRows`, `lexiconBase` and `rangesOf`; the one-pass check replaced by five checks across three lexicon sizes |
| `.journals/proofs/mnemosyne-the-grammar/PROOF.md` | line 9 states the paged read; the paged fixtures named; the five checks in the reader's table; the reader's tally 58 → 62 |
| `.journals/proofs/mnemosyne-the-grammar/results-read.json` | this run |
| `.journals/realm/2026-09-09-the-grammar-senses.md` | the opening said `Nothing committed.`; the work is in `98a98cfc` |
| `.journals/realm/2026-09-09-the-links-leave-the-realm.md` | a House words section added, naming the contract block and the door's section |

## The paged read, proven

`readSenses` reads `sensory_lexicon` by `range`, `SENSES_PAGE` = 1,000 rows a
page, up to `SENSES_READ_LIMIT` = 3,000, breaking on the first short page and
setting `truncated` when the rows read meet the ceiling. Three fixtures now
stand against it:

| lexicon | ranges asked | rowsRead | truncated |
|---|---|---|---|
| 6 rows | `0-999` | 6 | false |
| 1,250 rows | `0-999` · `1000-1999` | 1,250 | false |
| 3,000 rows | `0-999` · `1000-1999` · `2000-2999` | 3,000 | true |

The 1,250-row lexicon carries a mark on every even row and a second on every
fourth, so the marks split 500 / 125 and 250 / 63 across the two pages; the wall
counts 💭 625 and ♒︎ 313, summed across both, with 938 of 1,250 rows wearing a
mark and 125 carrying `#00CED1`.

## The folksonomy key

`readFolksonomy` finds the row with `.ilike('name', …)`, case-blind, then reads
its dressings with `.eq('folksonomy_type', row.name)` — the name as the base
holds it, not as it was typed. `folksonomyCards` reads its count from
`tally[row.name]`, and `tallyByFolksonomy` keys on `thesaurus.folksonomy_type`.
Both the read and the tally key on the same stored name. Nothing changed.

## Verification

```
npx tsc --noEmit                                                       no output, exit 0
npx eslint (the four touched source and proof files)                   no output, exit 0
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts         118 of 118
npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts    62 of 62
```

No build was run and no server was started.

## Left standing

Eight result cells in PROOF.md's contract table differ from the strings
`prove-grammar.ts` prints: six are shortened or reworded (`what · why · next`,
`atoms … senses`, `4 chips · and 13 more`, two chip lists cut with an ellipsis,
one refusal with its tail dropped) and two differ typographically (a curly
apostrophe, a pipe escaped for the table). `results.json` holds what the run
printed; the table's tally, 118, matches. The reader's table matches its run
cell for cell.
