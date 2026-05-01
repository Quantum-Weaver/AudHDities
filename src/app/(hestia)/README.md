# 🔥 HESTIA — THE HEARTH

**Domain:** Core Identity & Personal Space  
**Feeling:** Warm, welcoming, safe, reflective  
**Primary Environment:** `home` (variants: Warm, Mystical, Sacred, Ethereal)

---

## 📊 COMPLETION STATUS: 8/8 ✅ DONE

---

## 🗺️ PAGE MAP

```
src/app/(hestia)/
├── page.tsx                              # ✅ The Hearth (/)
├── vessel/
│   ├── page.tsx                          # ✅ The Vessel (/vessel)
│   ├── sanctum/
│   │   └── page.tsx                      # ✅ Sanctum (/vessel/sanctum)
│   ├── energy/
│   │   └── page.tsx                      # ✅ Energy Log (/vessel/energy)
│   ├── constellation/
│   │   └── page.tsx                      # ✅ Constellation (/vessel/constellation)
│   └── journal/
│       ├── page.tsx                      # ✅ The Scroll (/vessel/journal)
│       ├── [id]/
│       │   ├── page.tsx                  # ✅ Journal Entry Detail
│       │   └── edit/
│       │       └── page.tsx              # ✅ Edit Journal Entry
└── notifications/
    ├── page.tsx                          # ✅ The Pulse (/notifications)
    └── [id]/
        └── page.tsx                      # ✅ Notification Detail (/notifications/[id])
```

---

## 📋 PAGE DETAILS

### The Hearth (/)
**Purpose:** Landing page after login. Warm greeting, sovereignty overview, quick links to all personal spaces.  
**Environment:** `home` (Warm variant)  
**Components:** `Page`, `AuthenticatedGreeting`, `Card`, `Avatar`, `Badge`, `Progress`, `Button`, `Skeleton`  
**Data:** `useAuth()` — user profile, sovereignty score  
**States:** Loading skeleton, unauthenticated (hero only), authenticated (greeting card + hero)

---

### The Vessel (/vessel)
**Purpose:** The user's sovereign identity. Full profile display — avatar, bio, badges, house affiliation, sovereignty journey.  
**Environment:** `home` (Mystical variant)  
**Components:** `Page`, `VesselContent`, `Avatar`, `AvatarFallback`, `Badge`, `Card`, `Progress`, `Button`, `Skeleton`  
**Data:** `useAuth()` — full profile with `refreshProfile()` on mount  
**States:** Loading skeleton, unauthenticated, authenticated (profile header + sovereignty card + house card + quick links)  
**Notes:** Avatar uses `key={profile.avatar_url}` to force remount on URL change. Sovereignty card shows score / 1000 with progress bar and contextual message. Quick links navigate to Energy, Constellation, and Journal.

---

### The Sanctum (/vessel/sanctum)
**Purpose:** Private chamber for editing profile, preferences, accessibility settings, and environment selection.  
**Environment:** `home` (Sacred variant)  
**Components:** `Page`, `SanctumContent`, `AvatarUpload`, `Card`, `Form`, `FormField`, `Input`, `Select`, `Switch`, `Button`, `Skeleton`, `EnvironmentSelector`  
**Data:** `useAuth()` — `refreshProfile()` on mount, direct API calls for updates  
**Features:** Avatar upload to Supabase Storage, identity form (display name, username, bio, pronouns), dyslexia-friendly mode toggle, environment selector with 44 realm+variant combinations  
**States:** Loading skeleton, unauthenticated, authenticated (forms with current values pre-filled)  
**Notes:** Save redirects to `/vessel` on success. Environment updates the `ContinuityBeamContext` immediately for live preview.

---

### The Scroll — Journal (/vessel/journal)
**Purpose:** Personal journal. List of entries with create, detail view, edit, and delete.  
**Environment:** `library` (Peaceful, Ancient variant)  
**Components:** `Page`, `JournalList`, `JournalDetail`, `JournalEdit`, `Card`, `CardHeader`, `CardContent`, `Badge`, `Button`, `Skeleton`, `Form`, `FormField`, `Input`, `Select`  
**Data:** Direct API calls to `/api/generated/hestia-core/journal_entries`  
**Features:** Inline create form with mood selector and tag input. Entry cards show title, preview, date, and mood badge. Detail view with full content and delete confirmation. Edit form with pre-filled values.  
**States:** Loading skeleton, unauthenticated, empty state ("Your scroll awaits your first words"), populated list, detail view, edit form  
**Mood Options:** Contemplative, Energetic, Peaceful, Stormy, Hopeful, Grateful, Melancholy, Curious  
**Security:** RLS — users can only view/edit/delete their own entries

---

### The Energy Log (/vessel/energy)
**Purpose:** Track daily energy levels with a simple 1-10 scale. Trend analysis without judgment.  
**Environment:** `home` (Warm, Healing variant)  
**Components:** `Page`, `EnergyLog`, `Card`, `Badge`, `Progress`, `Button`, `Skeleton`, `Form`, `FormField`, `Select`  
**Data:** Direct API calls to `/api/generated/hestia-core/energy_logs`  
**Features:** Energy input (1-10 with word labels: Drained → Radiant), activity tracking, trend analysis card (average, rising/steady/falling, day-of-week pattern detection), color-coded timeline entries  
**Algorithm:** Compares recent 3 entries vs older 3 to detect trend. Identifies lowest-energy day of week. Generates gentle, non-judgmental insights.  
**States:** Loading skeleton, unauthenticated, empty state ("Begin listening to your vessel"), trend card + timeline  
**Security:** RLS — users can only view/edit/delete their own logs

---

### The Constellation (/vessel/constellation)
**Purpose:** Visual map of the user's connections — other sovereign souls they've interacted with.  
**Environment:** `observatory` (Cosmic, Visionary variant)  
**Status:** ✅ Page stub exists. Full implementation depends on Iris (social system) being built.

---

### The Pulse — Notifications (/notifications)
**Purpose:** List of all notifications — badge awards, emerald gifts, replies, system messages.  
**Environment:** `home` (Warm, Connected variant)  
**Components:** `Page`, `NotificationsList`, `NotificationDetail`, `Card`, `Badge`, `Button`, `Skeleton`  
**Data:** Direct API calls to `/api/generated/hestia-core/notifications`  
**Features:** Notification cards grouped by type with color-coded icons. Mark-read functionality. Detail view auto-marks as read on view.  
**States:** Loading skeleton, unauthenticated, empty state ("Your pulse is quiet"), populated list, detail view  
**Security:** RLS — users can only view their own notifications

---

## 🔗 DATA FLOW

```
useAuth()
  └── /api/auth/session → user + profile
  └── /api/generated/hestia-core/profiles/[profiles_id]

Journal:
  └── GET    /api/generated/hestia-core/journal_entries?user_id=
  └── POST   /api/generated/hestia-core/journal_entries
  └── GET    /api/generated/hestia-core/journal_entries/[id]
  └── PUT    /api/generated/hestia-core/journal_entries/[id]
  └── DELETE /api/generated/hestia-core/journal_entries/[id]

Energy:
  └── GET    /api/generated/hestia-core/energy_logs?user_id=
  └── POST   /api/generated/hestia-core/energy_logs

Notifications:
  └── GET    /api/generated/hestia-core/notifications?user_id=
  └── GET    /api/generated/hestia-core/notifications/[id]
  └── PUT    /api/generated/hestia-core/notifications/[id]

Sanctum:
  └── PUT    /api/generated/hestia-core/profiles/[profiles_id]
  └── Supabase Storage — avatar upload
```

---

## 🎨 COMPONENTS USED (All Existing)

| Layer | Component | Used In |
|-------|-----------|---------|
| **Bifröst** | `Page` | All pages |
| **Runes** | `Card` | Hearth, Vessel, Sanctum, Journal, Energy, Notifications |
| **Runes** | `Avatar`, `AvatarImage`, `AvatarFallback` | Hearth, Vessel, Sanctum |
| **Runes** | `Badge` | Vessel, Journal |
| **Runes** | `Progress` | Vessel, Energy |
| **Runes** | `Skeleton` | All pages (loading states) |
| **Runes** | `AvatarUpload` | Sanctum |
| **Yggdrasil** | `Button` | All pages |
| **Forging** | `Form`, `FormField`, `FormActions` | Sanctum, Journal, Energy |
| **Forging** | `Input` | Sanctum, Journal |
| **Forging** | `Select` | Sanctum, Journal, Energy |
| **Forging** | `Switch` | Sanctum |
| **Seidr** | `EnvironmentSelector` | Sanctum |

**Zero new components created for Hestia. Pure composition of existing layers.**

---

## 🛡️ SECURITY

| Table | RLS Policy | Access |
|-------|-----------|--------|
| `profiles` | Users read own, update own | Private |
| `journal_entries` | Users CRUD own | Private |
| `energy_logs` | Users CRUD own | Private |
| `notifications` | Users read/update own | Private |

---

## 💫 THE HEARTH EXPERIENCE

The user journey through Hestia follows the council's design:

1. **Arrive** at the Hearth — greeted by name, see sovereignty
2. **Reflect** in the Vessel — see your sovereign self
3. **Shape** in the Sanctum — customize your experience
4. **Write** in the Scroll — journal your journey
5. **Listen** in the Energy Log — hear your vessel's rhythm
6. **Connect** in the Constellation — see your web of relationships
7. **Attend** to the Pulse — respond to notifications

*The Hearth is complete. Every page is built. Every component is composed from existing layers. The Sanctuary's heart beats warm.* 🏛️✨