# PROOF — the Grammar

Two proofs, run from the repo root: one over the contract, one over the reader.
Every row is a fixture: nothing here reaches a base or the network.

| file | proves | run |
|---|---|---|
| `prove-grammar.ts` | the search grouping, the honest empties, the face fallback, the dressings beside the hearth, the bond truncation, the lattice reading, the fault shape, the door's counts, the query bounding, the compound's chain with its bond strength, the compound's sensory override, the category's count, the lattice's shelves and a scheme's members and edges | `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts` |
| `prove-grammar-read.ts` | the reads themselves against a fake knowledge client: the door gate, the fault carrying the base's message, the case-blind lookups, the compound's bond order, the category's base rows, the scheme's tiers, the lattice counts | `npx tsx .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts` |
| `results.json` | the last run's checks for `prove-grammar.ts` | |
| `results-read.json` | the last run's checks for `prove-grammar-read.ts` | |

## the contract's fixtures

One atom row from `atom_dressed` (`resonance`, with its own emoji and a category
face), the same atom read whole from `atom_whole` with two null sensory channels,
three molecule rows (one with no `atom_words`), one organism row, three
`atom_dressed` rows for one word (the hearth row plus two folksonomy overrides),
nine molecule bond names against a base count of 59, five organism bond names
against a base count of 17, six schemes across five kinds, two scheme
memberships plus one with no scheme row, and two typed edges, one from each end.
For the compound's room: one molecule row in its five cases and one organism row,
two atom bonds held out of position order, each with a role, a bond type and a
bond strength, one of the two atoms wearing a face, three held molecules of which
one names none, one sensory override of two keys and one null, and a category
face counted at 63 atoms.

## the contract's checks

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
| lattice | the four kinds shelve in order, an unnamed kind after them | rank 2 · facet 1 · axis 1 · dimension 1 · kindred 1 |
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
| compound | the five case renderings print in order | beam_resonance · BEAM_RESONANCE · beam-resonance · beamResonance · BeamResonance |
| compound | a case rendering the row does not carry prints none | BEAM_RESONANCE · beam-resonance · BeamResonance |
| compound | a molecule badges only what its row carries | concept · kebab-case · ui · covalent |
| compound | a molecule with no domain badges neither it nor its group | concept · kebab-case · covalent |
| compound | an organism badges only what its row carries | function · typescript · stable |
| compound | a sensory override prints one line per key, the null values dropped | emoji ♒︎ · color_hex #00CED1 |
| compound | a compound no dressing overrides says so, and prints no line | no dressing overrides this name yet |
| compound | the chain reads in bond order, not in the order the base answered | beam · resonance |
| compound | each link in the chain opens its atom room | /grammar/atoms/beam · /grammar/atoms/resonance |
| compound | a link carries the face its atom carries and no other | null\|♒︎ |
| compound | the head wears the first face the chain carries | ♒︎ |
| compound | the line under a link is its role, its bond type and its counted strength | modifier · covalent · strength 5 |
| compound | a bond carrying no strength prints none | modifier · covalent |
| compound | a link with neither role nor bond type prints no line | null |
| compound | the molecules an organism holds read in the order held, the unnamed dropped | calculateResonance · beam-resonance |
| compound | a held molecule carries its role and its bond type, and no face | action · covalent |
| compound | part of opens the organism room of each name | /grammar/organisms/calculateBeamResonance |
| compound | a membership opens the scheme room, its name encoded | /grammar/schemes/Form%20of%20Being |
| compound | the crumb names the tier and matches the atom room word for word | grammar · molecule · read live through the anon door |
| category | the count line reads the base count, in its own words | 63 atoms wear this face · counted from rows |
| category | a face nobody wears says so, and counts nothing | no atom wears this face yet |
| category | the room addresses a face by its own name, encoded | /grammar/categories/private%20data |
| category | the atoms are one tier group carrying the base total, not the page count | 63 atoms · 1 shown |
| category | the group waits with the face’s own empty, never the search’s | no atom wears this face yet |
| shelves | the four kinds shelve rank, facet, axis, dimension, in that order | rank · facet · axis · dimension |
| shelves | the cards shelve in the lattice’s own order, an unnamed kind after them | rank 2 · facet 1 · axis 1 · dimension 1 · kindred 1 |
| shelves | no scheme is lost in the shelving | 6 of 6 |
| shelves | a shelf counts its own schemes from rows | 2 schemes · counted from rows · 1 scheme · counted from rows |
| shelves | a card carries its counted members, its counted edges and its door | Being · 2 members · 1 edge · counted from rows · /grammar/schemes/Being |
| shelves | a scheme with no membership and no edge counts zero, never blank | 0 members · 0 edges · counted from rows |
| shelves | a card keeps the description the row carries, and invents none | what a thing is |
| shelves | a tally unread is said, never counted as zero | the register was unreadable |
| scheme | a membership naming no concept is dropped, never invented | beam-resonance · resonance · calculateBeamResonance |
| scheme | each member opens the room of its own tier | molecule /grammar/molecules/beam-resonance · atom /grammar/atoms/resonance · organism /grammar/organisms/calculateBeamResonance |
| scheme | a member carries its tier word, its primacy and the face its atom wears | beam-resonance · molecule · ♒︎ |
| scheme | a scheme with no membership waits with its own sentence | no member yet |
| scheme | an edge reads as one sentence, subject, typed arrow, object | resonance —broader→ beam-resonance |
| scheme | the arrow carries the relation type the row holds | —related→ |
| scheme | an end the base does not name says so, and is no door | a concept the base does not name |
| scheme | a scheme with no edge waits with its own sentence | no edge in this scheme |

96 of 96.

## the reader's fake client

A small object carrying the surface the reads use — `from` · `select` · `eq` ·
`ilike` · `or` · `in` · `order` · `limit` · `range`, awaited for
`{ data, error, count }` — answering from fixture rows and recording every call.
Each read takes an optional client, defaulting to `createApiSupabase('knowledge')`.

## the reader's fixtures

Two atoms with one sensory face between them, two molecules one of which carries
a sensory override, one organism, two
molecule bonds held out of position order, one organism-molecule bond, one
organism-atom bond, four scheme memberships across the three tiers, three typed
relations of which one names no scheme, two schemes one standing under the other,
two categories one of which no atom wears, and four `atom_dressed` rows of which
one is an override.

## the reader's checks

| set | check | result |
|---|---|---|
| door | an unnamed door is seen as unnamed | false |
| door | every read faults when the door is unnamed | 5 of 5 |
| door | the unnamed door is never asked of the client | 0 |
| door | the unnamed door faults in three parts, in its own words | molecules · the knowledge door is not named on this host |
| door | a named door is seen as named | true |
| fault | a refusal carries the base's own message and the table | molecules · permission denied for table molecules |
| fault | a refusal faults in three parts, never empty | a read policy on molecules for the anon door |
| fault | a refusal on a second read faults the whole reading | sensory_lexicon · permission denied for table sensory_lexicon |
| case | the atom is read whole by an ilike, never an eq | ilike · limit |
| case | a word typed in one case finds the row stored in another | Resonance |
| case | a molecule is found case-blind by its name | beam-resonance |
| case | an unknown name answers no row, never a fault | null |
| molecule | the atoms are carried in bond order | 1 beam · 2 resonance |
| molecule | each bond carries its role, its type and its strength | modifier · covalent · 2 |
| molecule | an atom wears its own sense, an atom with none wears nothing | null · ♒︎ |
| molecule | each bonded atom opens its own room | /grammar/atoms/beam |
| molecule | the sensory override rides through the read, one line per key | emoji ♒︎ · color_hex #00CED1 |
| molecule | the organisms it belongs to are named | calculate-beam-resonance |
| molecule | its membership carries the scheme, its kind and its primacy | Being · axis |
| molecule | an edge is named from this molecule's end, the other side named and tiered | broader · subject · atom resonance · related · object · atom beam |
| organism | the molecules it holds are named in order, each a door | beam-resonance |
| organism | its direct atoms carry position, role and strength | beam · verb · 4 |
| organism | an edge from the organism's end names the other side | narrower · molecule create-resonance |
| category | the face is read case-blind, with its own emoji | Being · 👁️ |
| category | a dressed row that overrides is never counted among the face | anchor · resonance |
| category | the count is the base count of the face, not the page | 2 |
| category | the atoms are read in word order and each opens its room | /grammar/atoms/anchor |
| category | a face no atom wears counts zero, never nothing | 0 |
| scheme | every member carries the tier it belongs to | molecule beam-resonance · atom resonance · organism calculate-beam-resonance |
| scheme | the members are ordered by the sort order the lattice holds | 1 · 2 · 3 |
| scheme | a member carries its primacy, and an atom member its face | true · ♒︎ |
| scheme | each member opens the room of its own tier | /grammar/organisms/calculate-beam-resonance |
| scheme | only the edges drawn within this scheme are carried, both ends named | beam-resonance broader resonance |
| scheme | a scheme carries the schemes standing under it | Layout |
| scheme | a scheme under no other names no parent | null |
| scheme | a scheme standing under another names its parent | Being |
| scheme | a scheme carries only the edges keyed to it | related |
| counts | every scheme is tallied, counted from rows | Being 3 · Layout 1 |
| counts | the edges are tallied per scheme, a scheme-less edge dropped | Being 1 · Layout 1 |
| counts | the tally is read from rows, never from a head count | schemes · scheme_memberships · concept_relations |

40 of 40.
