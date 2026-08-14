# 🔥 HESTIA — THE HEARTH

**Domain:** Core Identity & Personal Space
**Feeling:** Warm, welcoming, safe, reflective
**Primary Environment:** `home`

*Refreshed 2026-07-31 at KP's ⚛ word ("we are ready to finish hestia"),
by the finishing session — the previous README was a 2026-07-06
photograph (pre-rename tables, no Vessel Home, no ceremonies). This
one is trued to the tree and the living base (117 tables, hestia-core).
The realm's standing tabletop is `REALM-BUS.md` beside this file —
trust the bus's state section over any README, always.*

---

## 🗺️ PAGE MAP (as on disk)

```
src/app/(hestia)/
├── REALM-BUS.md                      # the realm's standing tabletop
├── dashboard/  → redirect            # /dashboard → /vessel (the root
│                                     #   Hearth page is retired)
├── vessel/
│   ├── page.tsx                      # The Vessel (/vessel) — identity,
│   │                                 #   sigils, milestones, quick links;
│   │                                 #   VELKOMIN fires here once per
│   │                                 #   session (the door's word)
│   ├── home/
│   │   └── page.tsx                  # THE VESSEL HOME (/vessel/home) —
│   │                                 #   the scene renderer: rooms, garden,
│   │                                 #   keepsakes, the realm map
│   ├── sanctum/
│   │   └── page.tsx                  # The Sanctum (/vessel/sanctum) —
│   │                                 #   identity, accessibility, THE
│   │                                 #   CEREMONY SWITCHBOARD (opt-in)
│   ├── energy/
│   │   └── page.tsx                  # Energy Log (/vessel/energy)
│   ├── constellation/
│   │   └── page.tsx                  # Constellation (/vessel/constellation)
│   │                                 #   — built; weaves hestia + athena +
│   │                                 #   plutus + iris reads
│   └── journal/                      # The Scroll (+ [id], [id]/edit)
└── notifications/                    # THE CALL (/notifications, + [id])
                                      #   — heralds, recipient-scoped
```

## 📋 THE ROOMS, PLAINLY

- **The Vessel** — the sovereign self: profile, tier journey
  (dweller → guild → outlander → sovereign_weaver), earned sigils,
  milestones from the `current` event stream. `Velkomin,
  {vessel_name}.` fires once per session at the crossing
  (`VelkominGreeting`); `Fáilte` is the Hearth card's permanent quiet
  header (`AuthenticatedGreeting`). The Two Greetings never share a
  glance.
- **The Vessel Home** (`/vessel/home`, born 2026-07-29, hands grown
  2026-07-31) — the scene renderer over the generated hestia-core
  hooks, own-only RLS: rooms in the dweller's kept order (found a
  room · move it — deliberate taps, no drag) · the garden on its own
  clock (ready a plot · plant from the live seed catalog · water;
  growth = planted_at × plant_stages, dormancy never death, no delete
  verbs anywhere) · the keepsakes shelf (vessel_collections ×
  collection_sets — found, earned, gifted, or grown, never bought) ·
  the realm map as furniture (✍ gate ②: table or wall, the vessel's
  own decoration row, expand-to-screen ~80vw/80vh solid module) ·
  hearth music worn opt-in AT THE TAP (never autoplay, stops on
  leaving) · sight-line doorways (the Studio is the shortest edge —
  ✍ the adjacency law).
- **The Sanctum** — identity (display name, handle, bio, avatar →
  the walled avatars bucket), accessibility (dyslexia-friendly mode),
  and THE CEREMONY SWITCHBOARD: richer arrival and the farewell
  (Gweld ti'n fuan at sign-out's release beat), both default OFF —
  absence of choice means OFF, always.
- **The Scroll** — journal CRUD over `journal_entries`, own-only.
- **The Energy Log** — `energy_entries`, gentle trends, no judgment.
- **The Constellation** — the vessel's web, weaving reads across
  hestia + athena-gamification + plutus-economics +
  iris-communications.
- **The Call** — `heralds`, recipient-scoped, mark-read; no red
  badges anywhere (a softer mailbox).

## 🔗 DATA (the living names)

hestia-core, via `/api/generated/hestia-core/*` (generated hooks;
ownership set server-side; RLS own-only on every dweller table):
`community_profiles` · `user_private` · `user_financial` ·
`user_roles` · `vessel_config` (incl. `ceremony_arrival` /
`ceremony_farewell`) · `current` · `journal_entries` ·
`energy_entries` · `heralds` · the vessel-home cluster
(`vessel_interiors` · `vessel_rooms` · `vessel_decorations` ·
`vessel_exteriors` · `vessel_anchors` · `vessel_quests` ·
`vessel_sigils` · `vessel_bubbles` · `vessel_collections` ·
`collection_sets` · `collection_items` · `companion_cues` ·
`vessel_companions`) · the garden (`garden_plots` · `garden_visits` ·
`plant_stages` · `seed_types` — catalogs seeded live 2026-07-30,
5 stages · 8 seeds). Identity edits ride `/api/auth/update-profile`
(community_profiles + vessel_config, zod-walled).

## 🛡️ THE LAWS THIS REALM WEARS

THE OPT-IN LAW (any pre-checked box is a defect) · anti-scarcity
(seeds regrow; the garden is patient; rarity is shimmer, never
status) · dignified empty states (the unfurnished home is the first
vessel's true first sight) · recognition is a privilege of kept
state (no warmth that surveils) · the metric test above all —
attention returned, never harvested · dormancy-not-death (🚩
VITAL-REVISIT: the rest window — `DORMANCY_REST_DAYS` +
`REST_DAYS_BY_RARITY`, rarity lengthening it per KP's ⚛ 2026-08-12
ruling, rarer blooms asking less frequent care; and the unbuilt
despair-guard math of the gift cooling-off. Nothing deteriorates,
ever — first-guess numbers, tuned only against real vessels).

## 🧵 VERIFIED, AND ONE KNOWN SEAM

*Verified corner to corner against the tree and the living base,
2026-07-31, by lane hestia-realm (the keeper): the gesture hands exist
(create/update hooks for rooms, plots, decorations), the keepsakes and
music organs match their words, the map module and catalogs (5 stages ·
8 seeds) are live, Fáilte renders where named. The base-side healing
ledger from the night the walls were trued is `docs/sql/003–012` — each
file carries its own diagnosis and verification.*

**The seam:** this app is Tailwind v4 and the design tokens live as
`:root` vars outside any `@theme`, so named color utilities
(`bg-surface`, `bg-deep-space`, …) mint **nothing**. Surfaces here use
the v4 var syntax `bg-(--color-*)` against
`src/styles/generated/variables.css`. Do not mend a surface by inventing
a token — the app-wide `@theme` bridge is a deliberate future pass
(filed on the repo REALM-BUS).

## 💫 THE HEARTH EXPERIENCE

1. **Arrive** — Velkomin at the crossing, Fáilte at the fire
2. **Reflect** in the Vessel — see your sovereign self
3. **Dwell** in the Home — rooms, garden, keepsakes, the map
4. **Shape** in the Sanctum — identity, comfort, ceremonies (yours
   to invite, easy to decline)
5. **Write** in the Scroll · **Listen** in the Energy Log
6. **See** in the Constellation · **Attend** to the Call
7. **Leave freely** — Gweld ti'n fuan, if you chose it; nothing here
   decays while you are gone

*The Hearth is the room where the house's kindness is domestic.
Everything stays as the dweller left it.* 🔥
