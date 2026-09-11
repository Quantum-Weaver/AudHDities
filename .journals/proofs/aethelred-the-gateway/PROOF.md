# PROOF — the Gateway and the testing tracks

Two proofs, run from the repo root. Every row in both is a fixture: nothing
here reaches a base or the network.

| file | proves | run |
|---|---|---|
| `prove-gateway.ts` | the grouping, the addresses, the GitHub degrade, the faces, the request contract, the slug admission, the select | `npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts` |
| `prove-tracks.tsx` | the cells, the flag, the two selects, the read that meets no `testing_public` column, the Gateway's strip, the apps page's Test it line | `npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx` |
| `results.json` | the last Gateway run's checks | |
| `results-tracks.json` | the last tracks run's checks | |

## the Gateway's fixtures

Seven beacon rows: two public with a `repo_url`, one private with a `repo_url`,
one private with `repo_url` null, one public with `repo_url` null, and the two
pinned faces (`quantum-weaver`, `aethelred-cello`). The GitHub reads take an
injected fetcher; the default fetcher is never called.

## the Gateway's checks

| set | check | result |
|---|---|---|
| grouping | three groups, in order | open · private · no-repo |
| grouping | open counts its rows | 2 of 2 |
| grouping | private counts its rows | 1 of 1 |
| grouping | no repo counts its rows | 2 of 2 |
| grouping | every row but the two faces lands in exactly one group | 5 of 5 |
| grouping | a private beacon with no repo is never dropped | mimirs-well · no repo |
| grouping | an empty group carries its own sentence | no beacon in the register is private |
| faces | the two faces are named as faces | quantum-weaver · aethelred-cello |
| faces | neither face lands in any group | open · private · no-repo hold none |
| faces | neither face counts in a tally | open 2 of 2, the faces uncounted |
| faces | a face finds its own register row | Quantum-Weaver · aethelred-cello |
| faces | a face with no register row is null, never invented | null |
| address | owner and repo parsed from a github url | {"owner":"Quantum-Weaver","repo":"AudHDities"} |
| address | a .git suffix is cut | resonance-bridge |
| address | a non-github address is no address | null |
| address | null is no address | null |
| github | a 200 carries every fact the card shows | TypeScript · 12 stars · 3 open · 2026-09-08T21:14:00Z · not archived |
| github | a 403 prints one calm line | GitHub did not answer · 403 |
| github | a 429 prints one calm line | GitHub did not answer · 429 |
| github | a thrown fetch prints one calm line | GitHub did not answer · no answer |
| github | a shapeless body degrades to nulls, never to invention | description null · stars null · archived false |
| github | a private repo is never called | 0 calls |
| github | a beacon with no repo is never called | 0 calls |
| github | an open repo is called once | 1 call |
| github | readableOnGitHub agrees with the group | open true · private false · no repo false |
| faces | a profile carries name, bio, repos, followers | KP · Consciousness architect · 41 · 9 |
| faces | a profile degrades the same way | GitHub did not answer · 429 |
| request | the status is a legal content_status | draft ∈ draft \| published \| archived |
| request | the category column takes free text, not an enum | contact_submissions.category · text · collaboration |
| request | application_type admits no collaboration value | artisan \| merchant \| curator \| council |
| request | the subject carries the beacon slug | collaborate · resonance-progenatrix |
| request | the message carries the beacon and the note | request to collaborate on resonance-progenatrix (resonance-progenatrix) |
| request | a message with no note carries the beacon alone | request to collaborate on mimirs-well (mimirs-well) |
| admission | a private slug is admitted, its name taken from the register | resonance-progenatrix · resonance-progenatrix |
| admission | a private slug with no repo is admitted | mimirs-well |
| admission | a public slug is refused | audhdities is public in beacons |
| admission | an unknown slug is refused | beacons holds no beacon under no-such-beacon |
| admission | a face slug is refused | aethelred-cello is a pinned face |
| admission | an over-long slug is refused before any lookup | 81 characters · a slug is lowercase letters, digits and hyphens, at most 80 |
| admission | a punctuated slug is refused before any lookup | a slug is lowercase letters, digits and hyphens, at most 80 |
| admission | an empty slug is refused | null |
| admission | a slug is matched lowercased | resonance-progenatrix |
| columns | story and home are not selected | name, slug, beacon_type, status, definition, repo_url, is_public, version, icon_emoji, available_on, play_status, play_testing_version, play_published_version, play_testing_url, play_listing_url, galaxy_status, galaxy_testing_version, galaxy_published_version, galaxy_testing_url, galaxy_listing_url, microsoft_status, microsoft_testing_version, microsoft_published_version, microsoft_testing_url, microsoft_listing_url, audhdities_status, audhdities_testing_version, audhdities_published_version, audhdities_testing_url, audhdities_listing_url, testing_public |

**43 of 43.**

## the tracks fixtures

Five register rows, each a `GatewayBeacon` built on a row whose four channels
are `none`, whose versions and urls are null and whose `testing_public` is
false:

- **resonance-echoes** — `play closed_testing` at `1.4.1` with a testing url and
  a listing url, `audhdities published` at `1.4.0`, `testing_public` true.
- **resonance-sirens** — `play closed_testing` with no url, `testing_public` true.
- **resonance-lantern** — `galaxy internal_testing` with a testing url,
  `testing_public` false.
- **resonance-bridge** — beacon type `tool`, four `none` channels.
- **resonance-grammar** — beacon type `tool`, `microsoft in_review`.

The apps fixture is the same row with the four price columns and `currency`.

## the tracks checks

| set | check | result |
|---|---|---|
| cells | one cell per store, in strip order | Play · Galaxy · Microsoft · AudHDities |
| cells | a status prints in plain words | closed testing |
| cells | an empty column reads none, never blank | Galaxy none · Microsoft none |
| cells | a column holding only spaces reads none | none |
| cells | the testing version is carried where the register holds one | Play 1.4.1 · AudHDities null |
| cells | the published version is carried where the register holds one | AudHDities 1.4.0 · Play null |
| cells | the testing link is carried where the register holds one | Play https://play.google.com/apps/testing/com.audhdities.echoes · Galaxy null |
| cells | a store that stands is marked, a none store is not | Play true · AudHDities true · Galaxy false |
| strip | an app prints a strip | app |
| strip | a beacon of another type in no store prints none | tool · no store |
| strip | a beacon of another type standing in one store prints none | tool · microsoft in_review |
| flag | a link reaches a public face only when the flag is true | testing_public false · 0 links |
| flag | the flag alone shows nothing when no link stands | testing_public true · 0 links |
| flag | a flagged row names the store of every link it holds | Play · https://play.google.com/apps/testing/com.audhdities.echoes |
| flag | two links keep strip order | Play · Galaxy |
| columns | the Gateway selects every track column and the flag | 20 track columns · testing_public |
| columns | the apps page selects the same track columns and the flag | 20 track columns · testing_public |
| columns | no column is named twice in either select | 31 · 36 |
| columns | the unflagged selects name every track column and no flag | 30 · 35 |
| read | a register holding the flag is read once, the flag as it stands | 1 read · testing_public true |
| read | a register holding no flag column is read again without it | 2 reads · the second unflagged |
| read | every row of that read carries the flag false, and its tracks stand | 1 row · testing_public false · play testing 1.4.1 |
| read | that read says what is missing in one sentence | beacons.testing_public is not in the register · every row reads false · next · resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain |
| read | the sentence names the column and the click that earns it | beacons.testing_public is not in the register · every row reads false · next · resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain |
| read | a refused second read carries the base message alone, never two sentences | permission denied for table beacons · no second sentence |
| read | any other refusal is carried whole and read no second time | 1 read · permission denied for table beacons |
| read | an empty answer is no row, no fault and no sentence | 0 rows · no fault |
| gateway | the strip names all four stores | Play · Galaxy · Microsoft · AudHDities |
| gateway | the status prints in plain words, never with an underscore | closed testing |
| gateway | an empty store prints none | 2 none cells of 2 |
| gateway | the testing version and the published version print with their words | testing 1.4.1 · published 1.4.0 |
| gateway | the testing link is a link | testing link |
| gateway | the strip stands whatever the flag says | testing_public false · the link stands on the Gateway |
| gateway | a beacon of another type in no store prints no strip | resonance-bridge · no strip |
| gateway | a beacon of another type standing in one store prints no strip | resonance-grammar · no strip |
| gateway | the sentence for a register with no flag column prints once | beacons.testing_public is not in the register · every row reads false · next · resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain |
| apps | a flagged row with a link prints the line, the store and the link | Test it · Play · the link |
| apps | an unflagged row with a link prints nothing, not even a heading | testing_public false · nothing |
| apps | a flagged row with no link prints nothing, not even a heading | nothing |
| apps | nothing counted rides the line | the store named, nothing counted |

**40 of 40.**

## what the proofs do not reach

The knowledge door (`beacons` through the anon door) and the insert policy on
`contact_submissions` are a live base's answer; neither is exercised here. The
`testing_public` column, which `resonance-grammar/docs/sql/150-the-testing-public.sql`
adds, is not in the live register: the read that meets no such column is proved
by an injected answer, not by the base.
