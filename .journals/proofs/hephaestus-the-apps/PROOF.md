# PROOF — the apps

One proof, run from the repo root. Every row is a fixture: nothing here reaches
a base or the network.

| file | proves | run |
|---|---|---|
| `prove-apps.ts` | the standing line, the platforms line, the count line, the fault shape, the select | `npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts` |
| `results.json` | the last run's checks | |

## the fixtures

Four register rows, each a `PublishedApp` built on a row whose four store
standings are `none`, whose `available_on` is empty and whose prices are null:

- **Marram** — the default shape untouched: four `none` standings, an empty
  `available_on`, no price and no listing url.
- **Sudoku** — `audhdities published` at 0 cents with a listing url,
  `galaxy internal_testing`, `play in_review` at 499 cents, `microsoft none`,
  `available_on` `android` and `windows`.
- **a sideloaded app** — four `none` standings with one platform named.
- **a priced app** — `galaxy published` at 250 cents in `eur`.

## the checks

| set | check | result |
|---|---|---|
| standing | only channels whose standing is not none are printed | audhdities · galaxy · play |
| standing | a none channel is never printed | microsoft none |
| standing | the channels keep register order | audhdities · galaxy · microsoft · play |
| standing | a standing prints with spaces, never underscores | planned · building · internal testing · closed testing · open testing · in review · published · rejected · withdrawn |
| standing | a zero price prints free | free |
| standing | a set price prints in dollars and cents | $4.99 |
| standing | a null price prints nothing | null · galaxy null |
| standing | a price that is not dollars carries its own code | 2.50 EUR |
| standing | a listing url is carried when the register holds one | https://audhdities.com/apps/sudoku |
| standing | a channel with no listing url carries null | galaxy null · play null |
| standing | one channel prints its channel, its standing and its price | play in review $4.99 |
| standing | the line joins every standing channel | audhdities published free · galaxy internal testing · play in review $4.99 |
| standing | four none standings and no platform print the one sentence | not yet in any store |
| standing | four none standings with a platform print no standing at all | null |
| standing | a currency other than dollars reaches the line | galaxy published 2.50 EUR |
| platforms | an empty available_on is no line | null |
| platforms | one platform prints its label and itself | available on · windows |
| platforms | many platforms print in register order | available on · android · windows |
| platforms | an empty name in available_on is dropped | available on · windows · android |
| count | the count line counts the rows it was handed | 3 apps and games in the register · counted from rows |
| count | an empty register counts zero | 0 apps and games in the register · counted from rows |
| fault | a refused read carries what happened, why, and the next step | the register refused this read · beacons · permission denied for table beacons · next · a read policy on beacons for the anon door |
| fault | a refused read shows no app | 0 rows |
| fault | an unnamed door carries its own sentence and no fault | register unread · the knowledge door is not named on this host |
| columns | the select names every column the page prints | 23 columns |
| columns | the four standings, the four listings and the four prices are selected | audhdities · galaxy · microsoft · play |
| columns | story and home are not selected | name, slug, beacon_type, status, definition, repo_url, is_public, version, icon_emoji, available_on, audhdities_status, galaxy_status, microsoft_status, play_status, audhdities_listing_url, galaxy_listing_url, microsoft_listing_url, play_listing_url, audhdities_price_cents, galaxy_price_cents, microsoft_price_cents, play_price_cents, currency |
| types | only apps and games are read | app · game |

**28 of 28.**
