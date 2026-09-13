# 🎭 PROMETHEUS — The Stage & Studio

## Overview

Prometheus splits into two realms:

- **The Stage** — live performance, comedy, music and recordings, all rows of
  one table, `events`
- **The Loom** — nine creative-tool rooms, each a single card today

## Architecture

```
src/app/(prometheus)/
├── error.tsx · loading.tsx · not-found.tsx   # the group's own boundaries
├── stage/
│   ├── page.tsx                              # The Stage hub
│   ├── live/
│   │   ├── page.tsx                          # Now Playing
│   │   └── [id]/page.tsx                     # Live Performance
│   ├── schedule/
│   │   ├── page.tsx                          # The Calendar
│   │   └── [id]/page.tsx                     # Event Detail
│   ├── recordings/
│   │   ├── page.tsx                          # The Echo
│   │   └── [id]/page.tsx                     # Recording detail
│   ├── comedy/
│   │   ├── page.tsx                          # The Comedy Hearth
│   │   └── [id]/page.tsx                     # Comedy Special
│   ├── music/
│   │   ├── page.tsx                          # The Music Realm
│   │   └── [id]/page.tsx                     # Music Performance
│   └── studio/
│       └── page.tsx                          # Stream Studio — the go-live form
└── studio/
    ├── page.tsx                              # The Loom hub
    ├── music/page.tsx
    ├── art/page.tsx
    ├── animation/page.tsx
    ├── audio/page.tsx
    ├── video/page.tsx
    ├── writing/page.tsx
    ├── graphics/page.tsx
    ├── effects/page.tsx
    └── export/page.tsx
```

22 page files, all reachable.

## Pages

### The Stage (12 pages)

| Page | Route | Component | Environment | Feeling |
|------|-------|-----------|------------|---------|
| The Stage | `/stage` | `StageHub` | music | Energetic, Euphoric |
| Now Playing | `/stage/live` | `LiveGallery` | music | Flow, Creative |
| Live Performance | `/stage/live/[id]` | `LiveDetail` | music | Euphoric, Connected |
| The Calendar | `/stage/schedule` | `ScheduleGallery` | community | Social, Playful |
| Event Detail | `/stage/schedule/[id]` | `EventDetail` | community | Warm, Connected |
| The Echo | `/stage/recordings` | `RecordingsGallery` | lounge | Warm, Creative |
| Recording | `/stage/recordings/[id]` | `RecordingDetail` | lounge | Intimate, Warm |
| Stream Studio | `/stage/studio` | `StreamSetup` | music | Creative, Flow |
| Comedy Hearth | `/stage/comedy` | `ComedyGallery` | lounge | Playful, Intimate |
| Comedy Special | `/stage/comedy/[id]` | `ComedyDetail` | lounge | Warm, Joyful |
| Music Realm | `/stage/music` | `MusicGallery` | music | Energetic, Flow |
| Music Performance | `/stage/music/[id]` | `MusicDetail` | music | Euphoric, Connected |

### The Loom (10 pages)

| Page | Route | Component | Icon | What it renders |
|------|-------|-----------|------|------|
| The Loom | `/studio` | `StudioHub` | Sparkles | nine cards, one per room |
| Music Studio | `/studio/music` | `StudioPageTemplate` | Music | one card; the template's default sentence |
| Art Studio | `/studio/art` | `StudioPageTemplate` | Palette | one card; *"Nothing is built in this room yet."* |
| Animation Studio | `/studio/animation` | `StudioPageTemplate` | Film | one card; *"Nothing is built in this room yet."* |
| Audio Studio | `/studio/audio` | `StudioPageTemplate` | Mic | one card; *"Nothing is built in this room yet."* |
| Video Studio | `/studio/video` | `StudioPageTemplate` | Video | one card; *"Nothing is built in this room yet."* |
| Writing Studio | `/studio/writing` | `StudioPageTemplate` | PenTool | one card; *"Nothing is built in this room yet."* |
| Graphics Lab | `/studio/graphics` | `StudioPageTemplate` | Image | one card; *"Nothing is built in this room yet."* |
| Effects Lab | `/studio/effects` | `StudioPageTemplate` | Wand2 | one card; *"Nothing is built in this room yet."* |
| The Gateway | `/studio/export` | `StudioPageTemplate` | Download | one card; *"Nothing is built in this room yet."* |

## Components

`src/components/asgard/domains/prometheus/`

### Stage
`StageHub` · `LiveGallery` · `LiveDetail` · `ScheduleGallery` · `EventDetail` ·
`RecordingsGallery` · `RecordingDetail` · `ComedyGallery` · `ComedyDetail` ·
`MusicGallery` · `MusicDetail` · `StreamSetup`, with `EventCard.tsx` beside
them.

### Studio
`StudioHub` (the nine cards) · `StudioPageTemplate` (title, description, icon,
colour, a back link, and an optional `standing` sentence). No tool interface
stands.

## Data Dependencies

### Stage
| Table | How it is read |
|-------|---------|
| `events` (prometheus-stage) | every Stage room reads it, through `/api/generated/prometheus-stage/events`; live, schedule, recordings, comedy and music are filters over the one table |

`StreamSetup.tsx:66-67` POSTs to the same route — the Stage's write path.
There is no `recordings` table and no `media_uploads` table in
`database.types.ts`; `channels` stands there and no Stage room reads it.

### Studio
No room reads or writes anything.

## Environment Integration

- **Stage pages** use `music` for energy and flow, `lounge` for intimate
  performances, `community` for social scheduling
- **Studio pages** use `music` for creative flow, `architecture` for precision
  tools, `library` for focused writing, `home` for the export gateway
- All pages pass `<Page showForeground={false} showContinuityBeam={true}>` and
  set no `environment` prop, so the vessel's own preference stands

## Access Control

| Area | What the code does |
|------|--------|
| Stage — viewing | no gate; no page in this group redirects a signed-out visitor |
| Stage — going live | `StreamSetup.tsx:36,43` reads `useUser()` and shows the form only when `roles` includes `artisan` or `merchant` |
| Studio — the nine rooms | no gate; there is nothing behind them to gate |

The group carries its own `error.tsx`, `loading.tsx` and `not-found.tsx`.

---

*Woven with sovereignty. The Stage is lit. The Loom awaits.* 🎭✨
