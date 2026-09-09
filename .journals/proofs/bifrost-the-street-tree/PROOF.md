# PROOF — the street tree

One proof, run from the repo root. Every input here is a fixture: a path
string, a discovery list, and a shelf held in memory.

| file | proves | run |
|---|---|---|
| `prove-street-tree.ts` | the grouping, the open realm, the discovery mark, the addresses, the kept choice | `npx tsx .journals/proofs/bifrost-the-street-tree/prove-street-tree.ts` |
| `results.json` | the last run's checks | |

## what stands under test

- `src/components/bifrost/StreetTree.tsx` — `streetRows(pathname, discovered, ready)`,
  `openRealms(rows)`, and the component rendered to static markup.
- `src/components/seidr/immersive/Learscail.tsx` — `ASWORDS_SHELF`,
  `readAsWords(shelf)`, `writeAsWords(value, shelf)`.

The fixtures: the path `/library/quests`, the discovery list
`['The Library', 'The Bazaar']`, a shelf of a `Map`, and a shelf that throws on
every call.

| check | result |
|---|---|
| every realm of the street stands as a row | 10 realms |
| the rows stand in the street order | The Hearth · The Stage & Studio · The Library · The Bazaar · The Bridge · The Observatory · The Council · The Forge · The Nexus · The Realms |
| every room is grouped under its realm, none lost | 55 of 55 rooms |
| each room is grouped under the realm that holds it | 55 distinct pairs |
| the realm the path stands in is the one open | The Library |
| no other realm is open | 1 open |
| a path off the street opens nothing | 0 open |
| a deeper path opens the realm that holds the longer room | The Hearth |
| a walked realm carries the walked mark | The Library · walked |
| a second walked realm carries it too | The Bazaar · walked |
| an unwalked realm carries the not-yet mark | The Forge · not yet walked |
| the always-open realm is walked without discovery | The Hearth · walked |
| the mark follows the set exactly | 3 of 10 marked walked |
| no mark stands before the shelf is read | walked · null on every realm |
| every realm is named whether walked or not | 10 names |
| every rendered door is a room of the street | 8 doors |
| the open realm renders its own rooms | The Hearth · 8 rooms |
| a folded realm renders no door | The Library · 0 doors |
| every realm is named in the markup | 10 names |
| every door carries a 44px hit target | 18 rows at min-h-11 |
| no choice on an empty shelf reads as the drawing | false |
| the words choice round-trips | true |
| the choice is kept under its own key | audhdities.learscail.asWords.v1 = true |
| the drawing choice round-trips | false |
| a locked shelf reads as the drawing, never a throw | false |
| a locked shelf is written to without a throw | no throw |

26 of 26 checks passed.

## the render

`renderToStaticMarkup` is called outside a Next router, so `usePathname()`
answers null and the tree reads `/` — the Hearth is the realm the path stands
in. Its eight doors render; the Library's nine do not, because a folded realm's
content is never mounted. Every `href` in the markup is a room href of
`THE_STREET`.
