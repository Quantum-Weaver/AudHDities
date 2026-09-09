# PROOF — the Gateway

One proof, run from the repo root. Every row is a fixture: nothing here reaches
a base or the network.

| file | proves | run |
|---|---|---|
| `prove-gateway.ts` | the grouping, the addresses, the GitHub degrade, the faces, the request contract, the slug admission, the select | `npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts` |
| `results.json` | the last run's checks | |

## the fixtures

Seven beacon rows: two public with a `repo_url`, one private with a `repo_url`,
one private with `repo_url` null, one public with `repo_url` null, and the two
pinned faces (`quantum-weaver`, `aethelred-cello`). The GitHub reads take an
injected fetcher; the default fetcher is never called.

## the checks

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
| columns | story and home are not selected | name, slug, beacon_type, status, definition, repo_url, is_public, version, icon_emoji, available_on, audhdities_status, galaxy_status, microsoft_status, play_status |

**43 of 43.**

## what the proof does not reach

The knowledge door (`beacons` through the anon door) and the insert policy on
`contact_submissions` are a live base's answer; neither is exercised here.
