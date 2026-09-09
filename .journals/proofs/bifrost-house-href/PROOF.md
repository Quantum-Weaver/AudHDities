# PROOF — the house href

One proof, run from the repo root. Every input is a fixture: a path string and
a host string. Nothing is fetched, no server stands, no header is read.

| file | proves | run |
|---|---|---|
| `prove-house-href.ts` | the table, the apex, the realm's own prefix, the leaving link, what is not an app path | `npx tsx .journals/proofs/bifrost-house-href/prove-house-href.ts` |
| `results.json` | the last run's checks | |

## what stands under test

`src/lib/site/house-href.ts` — `REALM_HOSTS`, `CANONICAL_ORIGIN`,
`realmPrefixOf(host)` and `houseHref(path, host)`.

The hosts under test: `audhdities.com`, `www.audhdities.com`,
`grammar.audhdities.com`, `kp.audhdities.com`, `artifacts.audhdities.com`,
`localhost:3000`, and no host at all.

| check | result |
|---|---|
| the table names the grammar host | `grammar.audhdities.com → /grammar` |
| the canonical origin is the apex | `https://audhdities.com` |
| the grammar host reads its prefix | `/grammar` |
| the apex reads no prefix | `null` |
| no host reads no prefix | `null` |
| the host is read without its port and in any case | `/grammar` |
| the apex leaves an app path alone | `audhdities.com · /about → /about` |
| the apex leaves a grammar path alone | `audhdities.com · /grammar/explore → /grammar/explore` |
| www leaves an app path alone | `www.audhdities.com · /about → /about` |
| no host leaves an app path alone | `null · /about → /about` |
| an absent host leaves an app path alone | `undefined · /about → /about` |
| the realm's own door stays relative | `grammar.audhdities.com · /grammar → /grammar` |
| a room under the realm's prefix stays relative | `grammar.audhdities.com · /grammar/explore → /grammar/explore` |
| an anchor on the realm's own door stays relative | `grammar.audhdities.com · /grammar#house-words → /grammar#house-words` |
| about leaves the realm for the canonical host | `grammar.audhdities.com · /about → https://audhdities.com/about` |
| library leaves the realm for the canonical host | `grammar.audhdities.com · /library → https://audhdities.com/library` |
| terms leaves the realm for the canonical host | `grammar.audhdities.com · /terms → https://audhdities.com/terms` |
| the house door leaves the realm for the canonical host | `grammar.audhdities.com · / → https://audhdities.com/` |
| a path that only begins with the prefix letters leaves the realm | `grammar.audhdities.com · /grammarian → https://audhdities.com/grammarian` |
| a mailto address is left as written | `grammar.audhdities.com · mailto:audhdities@proton.me → mailto:audhdities@proton.me` |
| a tel address is left as written | `grammar.audhdities.com · tel:+15550000000 → tel:+15550000000` |
| an external https address is left as written | `grammar.audhdities.com · https://github.com/quantum-weaver → https://github.com/quantum-weaver` |
| an external http address is left as written | `grammar.audhdities.com · http://example.com/x → http://example.com/x` |
| a bare anchor is left as written | `grammar.audhdities.com · #house-words → #house-words` |
| a protocol-relative address is left as written | `grammar.audhdities.com · //example.com/x → //example.com/x` |
| an unknown subdomain leaves an app path alone | `kp.audhdities.com · /about → /about` |
| the artifacts host leaves an app path alone | `artifacts.audhdities.com · /about → /about` |
| localhost leaves an app path alone | `localhost:3000 · /about → /about` |

28 of 28 checks passed.
