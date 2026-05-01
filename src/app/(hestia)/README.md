# 🔥 HESTIA — The Hearth

**Feeling:** Warm, welcoming, safe, reflective  
**Primary Environment:** `home`  
**Status:** 11 of 13 pages complete

---

## 📂 Directory Structure

```
src/app/(hestia)/
├── page.tsx                              ✅ The Hearth (/)
├── vessel/
│   ├── page.tsx                          ✅ The Vessel (/vessel)
│   ├── sanctum/
│   │   └── page.tsx                      ✅ Sanctum (/vessel/sanctum)
│   ├── energy/
│   │   ├── page.tsx                      ✅ Energy Log (/vessel/energy)
│   │   └── [id]/
│   │       └── page.tsx                  ✅ Energy Entry Detail (/vessel/energy/[id])
│   ├── constellation/
│   │   ├── page.tsx                      ⏳ Constellation (/vessel/constellation)
│   │   └── [id]/
│   │       └── page.tsx                  ⏳ Connection Detail (/vessel/constellation/[id])
│   ├── journal/
│   │   ├── page.tsx                      ✅ The Scroll (/vessel/journal)
│   │   └── [id]/
│   │       ├── page.tsx                  ✅ Journal Entry Detail (/vessel/journal/[id])
│   │       └── edit/
│   │           └── page.tsx              ✅ Edit Journal Entry (/vessel/journal/[id]/edit)
└── notifications/
    ├── page.tsx                          ✅ The Call (/notifications)
    └── [id]/
        └── page.tsx                      ✅ Notification Detail (/notifications/[id])
```

---

## 📊 Schema — Hestia Tables

| Table | PK | Purpose | RLS |
|-------|----|---------|:---:|
| `profiles` | `profiles_id` | Core user data extending Supabase auth.users | ✅ |
| `creator_profiles` | `creator_profiles_id` | Extended data for creators who sell products | ✅ |
| `vendor_profiles` | `vendor_profiles_id` | Extended data for vendors who provide services | ✅ |
| `community_profiles` | `community_profiles_id` | Extended data for community members | ✅ |
| `user_private` | `user_private_id` | Sensitive personal data (phone, address, emergency contacts) | ✅ |
| `user_financial` | `user_financial_id` | Stripe account, payout methods, crypto addresses | ✅ |
| `channels` | `channels_id` | User-owned content channels | ✅ |
| `user_page_views` | `user_page_views_id` | Page view tracking per user | ✅ |
| `journal_entries` | `journal_entries_id` | User journal entries with mood and tags | ✅ |
| `energy_logs` | `energy_logs_id` | Energy level tracking (1-10 scale) with activity and notes | ✅ |
| `life_cycles` | `life_cycles_id` | User journey phases (seedling → renewal) | ✅ |
| `timelines` | `timelines_id` | Sovereign journey milestones | ✅ |
| `user_bubble_limits` | `user_id` | Daily/hourly bubble pop limits | ✅ |
| `user_bubble_pops` | `user_bubble_pops_id` | Individual bubble pop records | ✅ |

---

## 🧩 Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `VesselContent` | `components/asgard/domains/hestia/vessel/` | Full profile display with badges, milestones, sovereignty |
| `SanctumContent` | `components/asgard/domains/hestia/sanctum/` | Settings form: avatar upload, identity, accessibility, environment |
| `EnvironmentSelector` | `components/asgard/domains/hestia/sanctum/` | Dropdown + variant radio buttons for realm selection |
| `EnergyLog` | `components/asgard/domains/hestia/energy/` | Energy input form, trend analysis, timeline |
| `EnergyEntryDetail` | `components/asgard/domains/hestia/energy/` | Single energy entry view with delete |
| `JournalList` | `components/asgard/domains/hestia/journal/` | Journal entries list with inline create form |
| `JournalDetail` | `components/asgard/domains/hestia/journal/` | Single journal entry view with delete |
| `JournalEdit` | `components/asgard/domains/hestia/journal/` | Edit journal entry with pre-filled form |
| `NotificationsList` | `components/asgard/domains/hestia/notifications/` | Notification list with mark-all-read |
| `NotificationDetail` | `components/asgard/domains/hestia/notifications/` | Single notification view with auto-mark-read |
| `NotificationBell` | `components/asgard/domains/hestia/notifications/` | Dropdown bell with real-time subscription |
| `AuthenticatedGreeting` | `components/asgard/domains/hestia/home/` | Personalized welcome card on the Hearth page |

---

## 🪝 Hooks Used

| Hook | Source | Purpose |
|------|--------|---------|
| `useAuth` | `hooks/useAuth` | Auth state, profile, sign in/out |
| `useUser` | `hooks/useUser` | User + profile with derived booleans |
| `useProfile` | `hooks/useProfile` | Full profile management with preferences |
| `useContinuityBeam` | `contexts/ContinuityBeamContext` | Environment switching and beam state |
| `useProfiles` | Generated | Single profile fetch |
| `useProfilesList` | Generated | Paginated profile list |
| `useUpdateProfiles` | Generated | Profile mutations |
| `useEnergyLogs` | Generated | Energy log CRUD |
| `useJournalEntries` | Generated | Journal CRUD |
| `useNotificationsList` | Generated | Notification queries |

---

## 🔐 RLS Policies — Key Rules

| Table | Policy | Access |
|-------|--------|--------|
| `profiles` | `authenticated_can_read_profiles` | All authenticated users can read |
| `profiles` | `update_any_profile_as_admin` | Admins can update any profile |
| `profiles` | `update_any_profile_as_weaver` | Quantum Weaver can update any profile |
| `journal_entries` | Users can view/create/update/delete own | Full CRUD for owner |
| `energy_logs` | Users can view/create/update/delete own | Full CRUD for owner |
| `notifications` | Users can view own | Read-only for recipient |
| `user_private` | Admins have full access | Admin-only for sensitive data |
| `user_financial` | Admins have full access | Admin-only for financial data |

---

## 🎨 Design Notes

- All pages use the `Page` component without hardcoded `environment`/`variant`/`animated` props
- Environment is set dynamically from user's `preferred_environment` profile field
- All text colors use COSMIC tokens (`text-star-dust`, not `text-white`)
- All interactive elements use `text-neurospark` for consistency
- Cards use domain CSS classes (`domain-quantum-card`, `domain-cosmic-card`) for visual variety
- Three states handled on every data page: loading (Skeleton), empty (icon + message), populated
- The Status Bar shows sovereignty score, energy level, and notification count from real profile data

---

## ⏳ Remaining

| Page | Blocker |
|------|---------|
| `/vessel/constellation` | Requires connections/friends system |
| `/vessel/constellation/[id]` | Requires connections/friends system |

The Constellation pages depend on a user connections system that hasn't been built yet. They will display the user's web of relationships — collaborators, house members, mutual quest participants. This requires the `connections` table and friend request flows.

---

*The Hearth is warm. Eleven pages welcome the sovereign home.* 🏛️✨
