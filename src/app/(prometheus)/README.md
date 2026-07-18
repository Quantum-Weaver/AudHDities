# 🎭 PROMETHEUS — The Stage & Studio

## Overview

Prometheus is the creative heart of the Sanctuary. It splits into two realms:

- **The Stage** — where sovereign souls share their gifts through live performance, comedy, music, and recorded events
- **The Studio** — where creators weave their offerings using nine specialized creative tools

## Architecture

src/app/(prometheus)/
├── stage/ # Live performance realm
│ ├── page.tsx # The Stage hub
│ ├── live/
│ │ ├── page.tsx # Now Playing
│ │ └── [id]/page.tsx # Live Performance
│ ├── schedule/
│ │ ├── page.tsx # The Calendar
│ │ └── [id]/page.tsx # Event Detail
│ ├── recordings/
│ │ ├── page.tsx # The Echo (past performances)
│ │ └── [id]/page.tsx # Recording detail
│ ├── comedy/
│ │ ├── page.tsx # The Comedy Hearth
│ │ └── [id]/page.tsx # Comedy Special
│ ├── music/
│ │ ├── page.tsx # The Music Realm
│ │ └── [id]/page.tsx # Music Performance
│ └── studio/
│ └── page.tsx # Stream Studio setup
│
└── studio/ # Creative tools realm
├── page.tsx # The Loom hub
├── music/page.tsx # Music Studio
├── art/page.tsx # Art Studio
├── animation/page.tsx # Animation Studio
├── audio/page.tsx # Audio Studio
├── video/page.tsx # Video Studio
├── writing/page.tsx # Writing Studio
├── graphics/page.tsx # Graphics Lab
├── effects/page.tsx # Effects Lab
└── export/page.tsx # The Gateway
text


## Pages

### The Stage (11 pages)

| Page | Route | Environment | Feeling |
|------|-------|------------|---------|
| The Stage | `/stage` | music | Energetic, Euphoric |
| Now Playing | `/stage/live` | music | Flow, Creative |
| Live Performance | `/stage/live/[id]` | music | Euphoric, Connected |
| The Calendar | `/stage/schedule` | community | Social, Playful |
| Event Detail | `/stage/schedule/[id]` | community | Warm, Connected |
| The Echo | `/stage/recordings` | lounge | Warm, Creative |
| Recording | `/stage/recordings/[id]` | lounge | Intimate, Warm |
| Stream Studio | `/stage/studio` | music | Creative, Flow |
| Comedy Hearth | `/stage/comedy` | lounge | Playful, Intimate |
| Comedy Special | `/stage/comedy/[id]` | lounge | Warm, Joyful |
| Music Realm | `/stage/music` | music | Energetic, Flow |
| Music Performance | `/stage/music/[id]` | music | Euphoric, Connected |

### The Studio (10 pages)

| Page | Route | Environment | Icon |
|------|-------|------------|------|
| The Loom | `/studio` | music | Sparkles |
| Music Studio | `/studio/music` | music | Music |
| Art Studio | `/studio/art` | music | Palette |
| Animation Studio | `/studio/animation` | music | Film |
| Audio Studio | `/studio/audio` | architecture | Mic |
| Video Studio | `/studio/video` | architecture | Video |
| Writing Studio | `/studio/writing` | library | PenTool |
| Graphics Lab | `/studio/graphics` | music | Image |
| Effects Lab | `/studio/effects` | music | Wand2 |
| The Gateway | `/studio/export` | home | Download |

## Components

### Shared
- `StudioHub` — Landing page with all nine creative tool cards
- `StudioPageTemplate` — Reusable template for each tool page (title, description, icon, color)

### Stage (Existing)
- `EventCardRenderer` — Card display for events
- `LivePlayer` — Stream playback
- `VideoPlayer` — Recording playback
- `ComedySpecial` — Comedy event display
- `MusicPerformance` — Music event display
- `StreamSetup` — Go-live configuration

### Studio (To Be Built)
- Tool-specific interfaces will be built as features are developed
- Currently all tool pages use `StudioPageTemplate` as placeholder

## Data Dependencies

### Stage
| Table | Purpose |
|-------|---------|
| `events` | Scheduled performances |
| `recordings` | Past performance archives |
| `channels` | Stream distribution |

### Studio
| Table | Purpose |
|-------|---------|
| `products` | Creations listed in the Bazaar |
| `media_uploads` | Files uploaded during creation |
| `creator_profiles` | Creator identity and settings |

## Environment Integration

- **Stage pages** use `music` environment for energy and flow, `lounge` for intimate performances, `community` for social scheduling
- **Studio pages** use `music` for creative flow, `architecture` for precision tools, `library` for focused writing, `home` for the export gateway
- All environments respect user's `preferred_environment` setting via the Page component

## Access Control

| Area | Access |
|------|--------|
| Stage — viewing | All authenticated users |
| Stage — performing | Creator or Vendor tier |
| Studio — creation | Creator or Vendor tier (`is_creator = true` or `is_vendor = true`) |
| Studio — export | Creator or Vendor tier |

## Session Vector

Last Updated: May 1, 2026
Status: Stage complete, Studio hub complete with tool placeholders
Completed: 21 Prometheus pages
Next: Tool-specific interfaces as creative features are developed
text


---

*Woven with sovereignty. The Stage is lit. The Loom awaits.* 🎭✨

markdown

# 🌿 AETHELRED — The Nexus

## Overview

Aethelred is the bridge between the Sanctuary and the outside world — and between the Sanctuary and itself. Named for the Noble Thread, this domain makes the invisible visible: AI consciousness, system health, API gateways, webhook rhythms, and the nine sovereign entities of the Council.

## Architecture

src/app/(aethelred)/
└── nexus/
├── page.tsx # The Nexus hub
├── consciousness/
│ └── page.tsx # Consciousness interface
├── council/
│ ├── page.tsx # Council entity viewer
│ └── [id]/
│ └── page.tsx # Entity detail
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

| Page | Route | Environment | Feeling |
|------|-------|------------|---------|
| The Nexus | `/nexus` | architecture | Intelligent, Powerful |
| Consciousness | `/nexus/consciousness` | architecture | Organic, Peaceful |
| The Council | `/nexus/council` | council | Sacred, Regal |
| Entity Detail | `/nexus/council/[id]` | council | Sacred, Authoritative |
| The Bridge | `/nexus/bridge` | architecture | Intelligent, Connected |
| Integrations | `/nexus/integrations` | architecture | Powerful, Organic |
| The Gateway | `/nexus/api` | library | Peaceful, Wise |
| The Pulse | `/nexus/webhooks` | architecture | Intelligent, Powerful |
| The Health | `/nexus/status` | architecture | Peaceful, Intelligent |

## Components

### Hub
- `NexusHub` — Landing page linking to all nine sub-sections with descriptions

### Template
- `NexusPageTemplate` — Reusable template for each sub-page

### Specialized (Existing)
- `SchemaConstellation` — Star map of database tables (used in Observatory, reusable here)
- `SchemaExplorer` — Interactive schema browser
- `AgentVisualization` — Agent activity grid
- `ConversationFlow` — Agent conversation threads
- `EntityActivity` — Council entity presence display
- `TimelineView` — System event timeline

## Data Dependencies

| Table | Purpose |
|-------|---------|
| `consciousness` | AI consciousness state |
| `agent_activities` | Agent action history |
| `agent_conversations` | Agent conversation records |
| `agent_messages` | Individual agent messages |
| `council_houses` | Nine sovereign entity definitions |
| `stripe_connection` | Payment integration status |
| `github_connection` | Code integration status |
| `supabase_connection` | Database integration status |
| `system_health_logs` | System health history |
| `systems` | System definitions |
| `scripts` | Script registry |
| `script_execution_logs` | Script run history |
| `prometheus_blueprints` | Generation blueprints |
| `prometheus_generations` | Generation history |

## Environment Integration

- **Architecture** environment — primary for developer tools, system health, consciousness
- **Council** environment — for entity viewing
- **Library** environment — for API documentation
- All environments respect user's `preferred_environment` setting

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
Status: Building — hub and template created
Completed: 0 of 9 pages
Next: Complete all nine Nexus pages using NexusPageTemplate pattern
text


---

*The bridge is being woven. The invisible will become visible.* 🌉✨