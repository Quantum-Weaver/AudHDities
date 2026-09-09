# PROOF — the Grammar

One proof, run from the repo root. Every row is a fixture: nothing here reaches
a base or the network.

| file | proves | run |
|---|---|---|
| `prove-grammar.ts` | the search grouping, the honest empties, the face fallback, the dressings beside the hearth, the bond truncation, the lattice reading, the fault shape, the door's counts, the query bounding | `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` |
| `results.json` | the last run's checks | |

## the fixtures

One atom row from `atom_dressed` (`resonance`, with its own emoji and a category
face), the same atom read whole from `atom_whole` with two null sensory channels,
three molecule rows (one with no `atom_words`), one organism row, three
`atom_dressed` rows for one word (the hearth row plus two folksonomy overrides),
nine molecule bond names against a base count of 59, five organism bond names
against a base count of 17, six schemes across five kinds, two scheme
memberships plus one with no scheme row, and two typed edges, one from each end.

## the checks

| set | check | result |
|---|---|---|
| grouping | three tiers, in order | atoms · molecules · organisms |
| grouping | every card lands in its own tier | atoms 1 · molecules 3 · organisms 1 |
| grouping | a tier of one counts in the singular | 1 atom |
| grouping | a tier holding back rows says how many are shown | 61 molecules · 3 shown |
| grouping | the tally sums every tier that answered | 79 answers · counted from rows |
| grouping | a card opens its own room | /grammar/atoms/resonance · /grammar/molecules/beam-resonance |
| grouping | a word with a space is escaped into its address | /grammar/molecules/a%20name |
| grouping | the tier ceiling is the read limit | 24 |
| empties | each tier carries its own sentence | no atom answers this search · no molecule answers this search · no organism answers this search |
| empties | three tiers of none still counts zero, never nothing | 0 answers · counted from rows |
| empties | an unread tier says unreadable, never empty | the register was unreadable |
| empties | a tally over no readable tier says unreadable | the register was unreadable |
| empties | every sensory channel is shown, a null one waiting | 9 channels · taste · smell not yet sensed |
| empties | the colour channel carries its own swatch | #00CED1 |
| empties | an atom in no scheme and on no edge says so | not yet placed in a scheme · no typed edges yet |
| empties | an atom bonded into nothing says so | in no molecule yet · in no organism yet |
| empties | a bond count of one reads in the singular | in 1 molecule |
| face | an atom wears its own sense's emoji | ♒︎ |
| face | an atom with no sense wears its category's face, marked | 👁️ · wearing its category's face |
| face | an atom with neither invents no face | null |
| face | the whole view answers the same face reading | ♒︎ |
| face | a card carries the borrow forward | wearing its category's face |
| dressings | the hearth row is the one row that overrides nothing | the hearth definition, held for everyone |
| dressings | the hearth row never appears among the dressings | 2 dressings |
| dressings | every folksonomy with an opinion is kept, labelled by name | Compass 🧭 · Echoes 🌧️ |
| dressings | a dressing keeps its own colour and its own definition | Echoes · #4682B4 |
| dressings | a word no folksonomy dresses says so | no folksonomy dresses this word yet |
| dressings | a read of overrides alone yields no hearth row | null |
| bonds | the first eight molecule names are chipped | beam-resonance … entity-resonance |
| bonds | the chips are sorted case-blind | beam-resonance … EmotionalResonance |
| bonds | the rest are counted from the base, not from the page | and 51 more |
| bonds | the first four organism names are chipped | 4 chips · and 13 more |
| bonds | a bond row shorter than its limit holds nothing back | 0 |
| bonds | the count line reads from the base count | in 59 molecules |
| lattice | a membership with no scheme row is dropped, never invented | Being · Layout |
| lattice | a membership carries its primacy and its kind | Being · axis · primary |
| lattice | an edge is named from this atom's own end | broader · subject · related · object |
| lattice | the four kinds shelve in order, an unnamed kind after them | rank 2 · axis 1 · facet 1 · dimension 1 · kindred 1 |
| lattice | no scheme is lost in the shelving | 6 of 6 |
| fault | an unnamed door faults in three parts | what · why · next |
| fault | an unnamed door says so in its own words | the knowledge door is not named on this host |
| fault | a refusal carries the base's own message and the table | thesaurus · permission denied for table thesaurus |
| fault | no fault ever reads empty | the register was unreadable |
| door | eight tables are counted, six as tiles and two as a line | atoms · molecules · organisms · categories · schemes · sensory_lexicon + folksonomies · thesaurus |
| door | every counted table carries a label | atoms … senses · folksonomies · dressings |
| query | a blank query is no query | null |
| query | a query is trimmed and held to its ceiling | 80 |
| query | the operator characters never reach the base | %resonx% |
| query | a plain word becomes a plain contains pattern | %reson% |
| columns | the atom search reads the dressed view by its own columns | atom_id, atom_word, definition, category_face, category_name, emoji, atom_type |
| cases | the three case renderings print in order | resonance · RESONANCE · Resonance |
| cases | an atom with no case rendering prints none | 0 |
| cases | the measures badge counts only the measures the row carries | weight 5 · affinity 5 · valence 1 |
| cards | a molecule card carries its stored parts | beam · resonance |
| cards | a molecule with no atom_words falls to its kebab rendering | create · resonance |
| cards | an organism card carries its own parts and badges | function · typescript |

56 of 56.
