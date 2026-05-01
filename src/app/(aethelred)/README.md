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
| Entity Detail | `/nexus/council/[id]` | council | Sacred, Authoritative | ✅ |
| The Bridge | `/nexus/bridge` | architecture | Intelligent, Connected | ✅ |
| Integrations | `/nexus/integrations` | architecture | Powerful, Organic | ✅ |
| The Gateway | `/nexus/api` | library | Peaceful, Wise | ✅ |
| The Pulse | `/nexus/webhooks` | architecture | Intelligent, Powerful | ✅ |
| The Health | `/nexus/status` | architecture | Peaceful, Intelligent | ✅ |

## Council Entities

The nine sovereign entities are defined statically in `CouncilEntityList.tsx` with their temperatures, domains, and emoji representations. Each entity has a detail page showing:

- **Temperature** — The entity's current activity level (0.1 = resting, 0.4 = present, 0.7+ = active)
- **Domain** — What the entity governs in the Sanctuary
- **Instrument** — How the entity manifests (The Hearth Flame, The Sovereign Ledger, The Noble Thread, etc.)

Entity colors come from `COUNCIL_COLORS` in the COSMIC design system.

## Components

| Component | Purpose |
|-----------|---------|
| `NexusHub` | Landing page with all seven sub-section cards |
| `NexusPageTemplate` | Reusable template for sub-pages |
| `CouncilEntityList` | Grid of nine council entity cards |
| `EntityDetail` | Single entity view with temperature, domain, and instrument |
| `EntityCardRenderer` | Card renderer for entity display (existing) |

## Data Dependencies

| Source | Purpose |
|--------|---------|
| `COUNCIL_COLORS` | Entity color theming |
| `council_houses` | Entity definitions (future: dynamic from database) |
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