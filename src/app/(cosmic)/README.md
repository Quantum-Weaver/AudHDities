# 🎭 COSMIC — The Design Playground

**Domain:** Cosmic  
**Feeling:** Immersive, beautiful, responsive, alive  
**Status:** ✅ COMPLETE (5 pages) — Realms-as-travel landed 2026-07-30 · the Theater's truth season landed 2026-07-31  
**Completed:** May 1, 2026 · Redrawn: July 30–31, 2026 (REALMS-AS-TRAVEL + the Theater's truth season, both at KP's ⚛ word)

---

## 🏛️ Purpose

COSMIC is the final domain of the Sanctuary — the place where the design system becomes a playground. Here, users cross to the immersive environments through the Crossing Hall, test UI components with live controls, witness the Council entities in the Theater, and browse the Effects Grimoire for animation and styling inspiration.

Every page in COSMIC is powered by systems built throughout the Sanctuary: the COSMIC design token generator (the gaia lineage), the environment place-souls and affect bundles, the ContinuityBeam context, and the component library spanning seven pagan layers.

---

## 📂 Pages

| Page | Route | Purpose |
|------|-------|---------|
| **The Crossing Hall** | `/environments` | Eleven places as doorways in a fixed geometry — step through and the sky changes |
| **Being There** | `/environments/[id]` | The room is the place: the sky grounds on arrival, the place-soul reads as its own story |
| **The Sandbox** | `/playground` | Component playground — test buttons, cards, badges, inputs, and feedback states |
| **The Theater** | `/theater` | Witness the nine Council entities — their domains, temperatures, and presence |
| **The Grimoire** | `/effects` | Browse glows, text effects, card styles, and animations with copyable code |

---

## 🏗️ Architecture

```
src/app/(cosmic)/
├── environments/
│   ├── page.tsx                       # The Crossing Hall — doorways, fixed geometry
│   └── [id]/
│       └── page.tsx                   # Being There — arrival is the crossing
├── playground/
│   └── page.tsx                       # The Sandbox — component testing
├── theater/
│   └── page.tsx                       # The Theater — council visualization
└── effects/
    └── page.tsx                       # The Grimoire — effects gallery
```

Components live at `src/components/asgard/domains/cosmic/*`
(`CrossingHall`, `BeingThere`, `Playground`, `Theater`, `EffectsGrimoire`).

---

## 🔗 System Dependencies

| Page | Depends On |
|------|-----------|
| Crossing Hall | `getEnvironmentAffect` + `HALL_ORDER`/`PLACE_DISPLAY` (`lib/constants/systems/environments/places.ts`) — doorways wear each place's beam gradient |
| Being There | `ContinuityBeamContext.setEnvironment` (arrival IS the crossing), `getEnvironmentAffect` (the place-soul), `Card`, `Badge`, `Button`, `motion` |
| Playground | `Card`, `Badge`, `Button`, `Input`, `Select`, `Switch`, `Progress`, `Tabs` — all from component library |
| Theater | `Card`, `motion`, generated hooks (`council_houses` via themis-governance, `entity_states` via aethelred-connections) — reads only, writes nothing |
| Effects Grimoire | `Card`, `Badge` — effect data referencing COSMIC tokens |

---

## 🎨 Design System Integration

### The Crossing Hall (REALMS-AS-TRAVEL move 1)
- Eleven place-souls as doorways in the hall's **fixed geometry** (`HALL_ORDER`) — derived from the realm map's order (RealmMapFurniture), the same map at two scales
- Each doorway: still threshold-light in the place's own beam gradient, icon + name, feeling line from the soul's moods
- **No search, no filters** — a hall you learn by heart needs no search; the order never shuffles
- Keyboard-walkable, still by default, instant under reduced motion

### Being There (REALMS-AS-TRAVEL moves 2–3)
- **Arrival is the crossing:** entering the room sets the beam's session environment — the page's own `EnvironmentLayer` sky becomes the place (one dress, never doubled)
- The place-soul's description reads as the place's own story; mood/colors/themes as word-registers
- "Deepen the Crossing" — the four variant registers (Warm · Mystical · Sacred · Ethereal), live on the beam, clamped 1–4
- Content breathes in after the sky grounds (~400ms); instant under reduced motion
- "Set as My Realm" links to the Sanctum (hestia) — wiring unchanged

### Playground
- Five tabs: Buttons, Cards, Badges, Inputs, Feedback
- Each tab has controls to change variant, size, and state
- Live preview updates as controls change; copy button on every code snippet
- Demonstrates loading, empty, error, and success states

### Theater (the truth season, 2026-07-31)
- Grid of 9 Council entities with color-coded avatars — **the telling**, the myth's own canon, framed as story
- Beneath each seat, **the record**: `council_houses` (alignment, description, responsibilities) and the newest `entity_states` row ("last recorded presence")
- Absent rows are honest absences — "the seat waits" — never fallbacks to the telling
- No invented temperatures, no fake statuses; reduced motion honored on every gesture

### Effects Grimoire
- 12 effects across 4 categories: Glow, Text, Card, Animation
- Category filter tabs, live preview area, copy button per snippet
- All effects reference COSMIC-generated classes (`npm run generate`, the gaia lineage)

---

## 🧬 Components Used

| Component | Layer | Used In |
|-----------|-------|---------|
| `Card` | Runes | Being There, Playground, Theater, Grimoire |
| `Badge` | Runes | All pages except the Hall |
| `Button` | Yggdrasil | Being There, Playground |
| `Input` | Forging | Playground |
| `Select` | Forging | Playground |
| `Switch` | Forging | Playground |
| `Progress` | Runes | Playground, Theater |
| `Tabs` | Vegvisir | Playground |
| `motion` | Framer Motion | Being There (grounding beat), Theater |

The Hall's doorways are the realm's own, wearing the SceneDoorway register
(hestia's organ untouched — same register, this realm's idiom).

---

## 🔐 Security (law 7 of the realm bus: the playground harvests nothing)

- The Theater reads two tables openly (`council_houses`, `entity_states`) and writes nothing; every other page is static or client-side only
- No personal data read, no database writes, no play-telemetry — ever
- Environment crossing is local to the beam's session
- The realm's standing law lives at `(cosmic)/REALM-BUS.md`

---

## 🚀 Future Enhancements

- **Playground:** more component tabs (Modal, Toast, Tooltip, Accordion)
- **Effects:** live parameter sliders for glow intensity, animation speed, and color
- **Depictive placehood:** drawn scene elements over the sky — the holodeck's second life, a later season (noted in the ruled design; does not gate anything)

---

*The Grimoire is open. The Theater is alive. The Hall stands, and every doorway stays where you left it.*

🏛️✨
