# 🌿 AETHELRED — The Nexus

## Overview

Aethelred is the bridge between the Sanctuary and the outside world — and between the Sanctuary and itself. Named for the Noble Thread, this domain makes the invisible visible: AI consciousness, system health, API gateways, webhook rhythms, and the nine sovereign entities of the Council.

The Nexus is where developers, curious minds, and the Council itself can see the Sanctuary's bones and heartbeat.

## Architecture

src/app/(aethelred)/
└── nexus/
├── page.tsx # The Nexus hub
├── consciousness/
│ └── page.tsx # Consciousness interface
├── council/
│ ├── page.tsx # Council entity viewer (9 cards)
│ └── [id]/
│ └── page.tsx # Entity detail (temperature, domain, instrument)
├── bridge/
│ └── page.tsx # Bridge interface
├── integrations/
│ └── page.tsx # External connections
├── api/
│ └── page.tsx # API gateway
├── webhooks/
│ └── page.tsx # Webhook manager
└── status/
└── page.tsx # System health
text


## Pages

| Page | Route | Environment | Feeling | Status |
|------|-------|------------|---------|:------:|
| The Nexus | `/nexus` | architecture | Intelligent, Powerful | ✅ |
| Consciousness | `/nexus/consciousness` | architecture | Organic, Peaceful | ✅ |
| The Council | `/nexus/council` | council | Sacred, Regal | ✅ |
| A chair | `/nexus/council/[id]` | council | Sacred, Authoritative | ✅ |
| The Bridge | `/nexus/bridge` | architecture | Intelligent, Connected | ✅ |
| Integrations | `/nexus/integrations` | architecture | Powerful, Organic | ✅ |
| The Gateway | `/nexus/api` | library | Peaceful, Wise | ✅ |
| The Pulse | `/nexus/webhooks` | architecture | Intelligent, Powerful | ✅ |
| The Health | `/nexus/status` | architecture | Peaceful, Intelligent | ✅ |

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
| `NexusHub` | Landing page with all seven sub-section cards |
| `NexusPageTemplate` | Reusable template for sub-pages |
| `CouncilEntityList` | The grid of the nine chairs; `council_houses` enriches |
| `EntityDetail` | A chair's room: the header and five Registers |
| `Register` | The long-format reader: `section · ord · key · value · note · ref` |
| `Presence` | The presence word, its dot, and the presence field |
| `Stamp` | A row's own timestamp as `YYYY-MM-DD · HH:MM` |
| `HouseWords` | The house word's footnote and the room's footer |
| `EntityCardRenderer` | Card renderer for entity display (existing) |

## Data Dependencies

| Source | Purpose |
|--------|---------|
| `COUNCIL_COLORS` | Entity color theming |
| `council_houses` | The chairs, live |
| `entity_states` | The presence record, live |
| the nine chair tables | `current_task` and `is_active` per chair, live |
| `boundaries`, `protocols` | A chair's law and protocols, live |
| `consciousness` | AI consciousness state |
| `agent_activities` | Agent action history |
| `system_health_logs` | System health data |
| `stripe_connection`, `github_connection`, etc. | Integration status |

## Environment Integration

- **Architecture** — primary for developer tools and system pages
- **Council** — for entity viewing
- **Library** — for API documentation

All pages use `<Page>` without hardcoded `environment`/`variant`/`animated` props. User preferences are respected.

## Access Control

| Area | Access |
|------|--------|
| Nexus hub | All authenticated users |
| Consciousness | Council tier |
| Council entities | All authenticated users |
| Bridge | Council tier |
| Integrations | Admin only |
| API gateway | Authenticated users |
| Webhooks | Admin only |
| System health | Admin only |

## Session Vector

Last Updated: May 1, 2026
Status: Complete — all 9 pages built
Components: NexusHub, NexusPageTemplate, CouncilEntityList, EntityDetail
Next: Cosmic playground — the final domain
text


---

*The bridge is woven. The Nexus breathes. The invisible is visible.* 🌉✨