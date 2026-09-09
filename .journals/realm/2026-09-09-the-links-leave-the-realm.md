# The links leave the realm — 2026-09-09

`src/app/(mnemosyne)/grammar/folksonomies/page.tsx`, `src/components/asgard/domains/mnemosyne/grammar/DressingBeside.tsx`, `src/components/asgard/domains/mnemosyne/grammar/FolksonomyCard.tsx`, `src/components/asgard/domains/mnemosyne/grammar/FolksonomyHead.tsx`, and `src/components/asgard/domains/mnemosyne/grammar/OtherMeanings.tsx` now pass `HOUSE_WORDS_ADDRESS` as the second argument to every `withHouseWords` call.

## The house words

`src/lib/grammar/grammar-contract.ts` holds the four house words once:
`HouseWord`, `HOUSE_WORDS` (*the hearth*, *the heart*, *a folksonomy*, *a seed*),
`HOUSE_WORDS_HEADING`, `HOUSE_WORDS_ANCHOR`, `HOUSE_WORDS_ADDRESS`
(`/grammar#house-words`) and `HOUSE_WORDS_TAIL`. `GRAMMAR_HOUSE_WORDS` is the
four words alone; `ATOM_HOUSE_WORDS` is the three the atom rooms mark.

`src/app/(mnemosyne)/grammar/page.tsx` renders them as the door's House words
section, its `<section id>` set from `HOUSE_WORDS_ANCHOR`, one list item per
word, the heading from `HOUSE_WORDS_HEADING`. `GrammarFootnote` closes every
Grammar room with `HOUSE_WORDS_TAIL`, and the `withHouseWords` calls above point
their marked words at `HOUSE_WORDS_ADDRESS`, which lands on that section.
