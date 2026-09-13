# 🌿 AETHELRED — The Nexus

## Overview

Aethelred is the bridge between the Sanctuary and the outside world — and between the Sanctuary and itself. Named for the Noble Thread, this domain makes the invisible visible: AI consciousness, system health, API gateways, webhook rhythms, and the nine sovereign entities of the Council.

The Nexus is where developers, curious minds, and the Council itself can see the Sanctuary's bones and heartbeat.

## Architecture

src/app/(aethelred)/
└── nexus/
├── page.tsx # The Nexus hub
├── consciousness/
│ └── page.tsx # The awareness rows and the state stream
├── council/
│ ├── page.tsx # The nine chairs
│ └── [id]/
│ └── page.tsx # A chair, in five Registers
├── bridge/
│ └── page.tsx # The three poured registers
├── integrations/
│ └── page.tsx # The key names each line and chain records
├── api/
│ └── page.tsx # The Gateway, the beacons register
├── webhooks/
│ └── page.tsx # The Pulse, triggers and unread notices
└── status/
└── page.tsx # The Health, the base's own portrait

## Pages

| Page | Route | Reads |
|------|-------|-------|
| The Nexus | `/nexus` | the seven doors, each naming what it reads |
| Consciousness | `/nexus/consciousness` | `consciousness` · the newest 20 `entity_states` rows |
| The Council | `/nexus/council` | the nine chair tables · `council_houses` · `entity_states` |
| A chair | `/nexus/council/[id]` | the chair's table · `council_houses` · `entity_states` · the three agent tables · `boundaries` · `protocols` |
| The Bridge | `/nexus/bridge` | poured · `the-organs` · `the-switchboard` · `the-hands` |
| Integrations | `/nexus/integrations` | poured · `the-organs`, the key names only |
| The Gateway | `/nexus/api` | `beacons` in the KNOWLEDGE base, through its anon door |
| The Pulse | `/nexus/webhooks` | `triggers` · `heralds` where `is_read` is false |
| The Health | `/nexus/status` | `gaia_config` · the eight registries of the self-knowing layer |

Nothing on any of these pages is a constant. A value is a row, a poured row, or
a sentence saying there is none.

## Council Entities

The roster is the nine chair tables, and every chair always stands, in the order
Hearth-Keeper · Chancellor · Seer · Aethelred · Curator · Archivist · Skald ·
Codex · Executioner. That order is the grid's; `council_houses.display_order` is
not consulted. A catalog row enriches a chair with its description and
responsibilities; a chair no catalog row names keeps its own name, sigil and
colour and its domain line reads `no catalog row yet`. A refused
`council_houses` read prints `the base refused this read · council_houses` on
every card, and every card still stands.

Each card carries the presence word read from the newest `entity_states` row for
that chair, read by one query per chair filtered to that chair's names (`present` within the hour, `resting` when older, `not present` when
there is none) with the row's own `occurred_at`, and `current_task` from the
chair's own table.

A chair's room shows five Registers: the seat as carved (`council_houses`), the
presence record (that chair's whole record in `entity_states`, newest first), the agent rows
(`agent_activities` · `agent_conversations` · `agent_messages`), the boundaries
that bind (`boundaries` where `applies_to` names the chair), and the protocols
(`protocols`, from `related_protocols`).

The contract is `src/lib/nexus/council-contract.ts`; the reads are
`src/lib/nexus/council-read.ts`. Entity colors and the sigil per chair come from
`COUNCIL_COLORS` and the seat list in the contract, until `council_houses.icon_url`
carries an icon.

## Components

| Component | Purpose |
|-----------|---------|
| `NexusHub` | The seven door cards; each names what it reads |
| `NexusRoom` | The shell every wired room stands in: the return, the title, the source line, the footnote |
| `NexusTile` | One breathing tile: a sentence, its stamp, and lines counted from rows |
| `CouncilEntityList` | The grid of the nine chairs; `council_houses` enriches |
| `EntityDetail` | A chair's room: the header, five Registers, and the Call's own sentence |
| `Register` | The long-format reader: `section · ord · key · value · note · ref` |
| `PouredMark` | A poured section's heading: the view, when it was poured, its address |
| `Presence` | The presence word, its dot, and the presence field |
| `Stamp` | A row's own timestamp as `YYYY-MM-DD · HH:MM` |
| `HouseWords` | The house word's footnote and the room's footer |
| `RepoConstellation` | The Gateway's groups, and the two faces below them |
| `RequestToCollaborate` | The one write in this group: a row in `contact_submissions` |
| `NexusPageTemplate` | The shell a room wore before it was wired; no room uses it now |
| `EntityCardRenderer` | Card renderer reached only by `SmartCard`; no page in this group calls it |

## Data Dependencies

| Source | Purpose |
|--------|---------|
| the nine chair tables | `current_task` and `is_active` per chair |
| `council_houses` | The chairs as carved |
| `entity_states` | The presence record, and the state stream |
| `agent_activities` · `agent_conversations` · `agent_messages` | The agent rows a chair names |
| `boundaries` · `protocols` | A chair's law and its protocols |
| `consciousness` | The awareness rows |
| `triggers` | The Pulse's lines and their `last_seen_at` |
| `heralds` | The notices carrying no read mark |
| `gaia_config` | The base's portrait, one row per table |
| `columns` · `policies` · `functions` · `indexes` · `enums` · `triggers` · `views` · `composite_types` | The registries the Health counts |
| `beacons` (KNOWLEDGE) | The Gateway's register |
| `contact_submissions` | Where a request to collaborate lands |
| `the-organs` · `the-switchboard` · `the-hands` | The poured registers the Bridge and Integrations read |
| `COUNCIL_COLORS` | A chair's colour |

Every live read goes through `src/lib/supabase/server.ts`, the visitor's own
session, so the base's own policies decide what answers. Every poured read goes
through `/artifacts-proxy/<slug>` with the visitor's own cookies, so the proxy's
sign-in and its `ARTIFACTS_VIEWERS` allowlist decide the same way.

## Environment Integration

Every page in this group renders inside `<Page>` with no `environment`,
`variant` or `animated` prop, so the visitor's own preference dresses it.

## Access Control

| Area | What the code does |
|------|--------------------|
| the hub, `/nexus` | open to any visitor |
| every other room in this group | a signed-in vessel, or a redirect to the login carrying the room's address back |

There is no tier gate in this group's code. The real gate on a live room is the
base's own read policy: a refused read prints in three parts — what happened,
`<table> · <the base's message>`, and `next · a read policy on <table> for this
visitor` — and the room still stands. The real gate on a poured room is the
artifacts proxy: it redirects an unsigned visitor to the login and refuses an
email outside `ARTIFACTS_VIEWERS`.

## The reads, the contracts, the proofs

| what | where |
|---|---|
| the refusal's shape and words | `src/lib/nexus/read.ts` |
| the Nine | `src/lib/nexus/council-contract.ts` · `council-read.ts` |
| the Gateway | `src/lib/nexus/gateway-contract.ts` · `gateway-read.ts` · `gateway-github.ts` · `gateway-request.ts` |
| a poured page | `src/lib/nexus/poured-read.ts` · `poured-contract.ts` |
| the Bridge's three shapes | `src/lib/nexus/bridge-contract.ts` |
| the key names | `src/lib/nexus/integrations-contract.ts` |
| the portrait | `src/lib/nexus/health-read.ts` · `health-contract.ts` |
| the Pulse | `src/lib/nexus/pulse-read.ts` |
| the awareness rows | `src/lib/nexus/consciousness-read.ts` |
| the proofs | `.journals/proofs/aethelred-the-register/` · `aethelred-the-gateway/` · `aethelred-the-poured/` |

## Call

Call is not built. No sleeper runs on any machine to answer a wake, so no button
stands in a chair's room; the room says so in one sentence. When a sleeper
exists, the wake lands one row in `agent_messages` and shows it landed.

---

*The bridge is woven. The Nexus reads.* 🌉
