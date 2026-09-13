# The Nexus, room by room

## What each room is now

| room | address | state | reads |
|---|---|---|---|
| The Nexus | `src/app/(aethelred)/nexus/page.tsx` | stands, trued | the seven doors; each door card names the register it reads |
| The Council | `src/app/(aethelred)/nexus/council/page.tsx` | stands | the nine chair tables · `council_houses` · `entity_states` |
| A chair | `src/app/(aethelred)/nexus/council/[id]/page.tsx` | stands, + Call's sentence | the chair's table · `council_houses` · `entity_states` · `agent_activities` · `agent_conversations` · `agent_messages` · `boundaries` · `protocols` |
| The Gateway | `src/app/(aethelred)/nexus/api/page.tsx` | stands | `beacons` (KNOWLEDGE base, anon door) |
| The Health | `src/app/(aethelred)/nexus/status/page.tsx` | built | `gaia_config` · `columns` · `policies` · `functions` · `indexes` · `enums` · `triggers` · `views` · `composite_types` |
| The Bridge | `src/app/(aethelred)/nexus/bridge/page.tsx` | built | poured `the-organs` · `the-switchboard` · `the-hands` |
| The Pulse | `src/app/(aethelred)/nexus/webhooks/page.tsx` | built | `triggers` · `heralds` where `is_read` is false |
| Integrations | `src/app/(aethelred)/nexus/integrations/page.tsx` | built | poured `the-organs`, key names only |
| Consciousness | `src/app/(aethelred)/nexus/consciousness/page.tsx` | built | `consciousness` · the newest 20 `entity_states` rows |
| Call | not built | honest sentence in the chair's room | no sleeper runs to answer a wake |

## The reads and contracts added

| file | holds |
|---|---|
| `src/lib/nexus/read.ts` | `ReadResult`, `refused`, `answered`, `REFUSED`, `refusalNext` |
| `src/lib/nexus/poured-read.ts` | the fetch of `/artifacts-proxy/<slug>` under the visitor's cookies, `liftBlock`, `parseBlock` |
| `src/lib/nexus/poured-contract.ts` | `pouredView`, `sectionNames`, `cell`, `ordOf` |
| `src/lib/nexus/bridge-contract.ts` | the three poured shapes |
| `src/lib/nexus/integrations-contract.ts` | `keyNames`, `standing`, the keys shape |
| `src/lib/nexus/health-read.ts` | `readGaiaConfig`, `readRegistryCounts` |
| `src/lib/nexus/health-contract.ts` | `portraitFrom`, `drifts`, `driftWords`, `lastDrawn`, `schemaCounts` |
| `src/lib/nexus/pulse-read.ts` | `readTriggers`, `readUnreadHeralds` |
| `src/lib/nexus/consciousness-read.ts` | `readConsciousness`, `readStateStream`, `presentNames` |

`ReadResult` and the refusal's words moved out of `council-read.ts` and
`council-contract.ts` into `read.ts`; both re-export them.

## Components added

`NexusRoom.tsx` — the shell every wired room stands in.
`NexusTile.tsx` — the one breathing tile.
`PouredMark.tsx` — a poured section's heading with its published stamp.
`Register.tsx` — gained optional `faultWhat` and `faultNext`, so a poured
fault prints its own three parts.

## Gates

`npm run type-check` — no error in this group.
`npx eslint "src/app/(aethelred)" "src/lib/nexus" "src/components/asgard/domains/aethelred"` —
0 errors, 4 warnings, all four pre-existing in `EntityCardRenderer.tsx`.
`npx tsx .journals/proofs/aethelred-the-poured/prove-poured.ts` — 42 of 42.

## Records trued

`src/app/(aethelred)/README.md` — the pages table, the components table, the
data dependencies, the access table, the proofs, and Call.
`src/app/(aethelred)/REALM-BUS.md` — the standing state; edges 1, 2, 4 and 5
are closed, edge 3 stands.

## Not built

`/nexus` does not count rows per door. No tier gate exists in this group's
code; the door is a signed-in vessel and the base's own read policy is the
gate. No sleeper exists, so Call has no button.

## Second pass — the three defects

`src/lib/nexus/consciousness-read.ts` exports `newestAwareness(rows)`, which
returns the awareness row carrying the greatest `updated_at`, or null.
`readConsciousness` still orders by name, so the register lists by name.

`src/app/(aethelred)/nexus/consciousness/page.tsx` — the `newest level` tile
line reads `newestAwareness(awareness.rows)?.awareness_level`, falling back to
`NOT_RECORDED`.

`src/app/(aethelred)/nexus/integrations/page.tsx` — the `lines` tile line
reads a local `lines`, which is `0` when `block.fault` stands and
`view.sections.length` otherwise.

`src/components/asgard/domains/aethelred/nexus/NexusHub.tsx` renders
`<HouseWordsFooter className="mt-12" />` below the section grid, the same
footer `NexusRoom` renders; the hub now carries the `/about` link. The double
blank line above `export function NexusHub` is one line.

## Gates

`npx tsc --noEmit` — exit 0, no output.
`npx eslint` over `consciousness-read.ts`, both pages and `NexusHub.tsx` —
exit 0, 0 errors, 0 warnings.
