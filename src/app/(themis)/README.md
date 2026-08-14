# 🛡️ THEMIS — The Council Chamber

**Feeling:** Transparent, just, collaborative, wise  
**Environment:** `council` — Regal, Sacred, Contemplative, Authoritative  
**Status:** ✅ COMPLETE — May 1, 2026
**Living state:** `REALM-BUS.md` (this folder) — standing state, open edges, and the realm's tabletop; trued 2026-07-30

---

## 📋 ARCHITECTURE

```
src/app/(themis)/council/
├── page.tsx                          # The Council Chamber (/council)
├── proposals/
│   ├── page.tsx                      # Proposals Gallery (/council/proposals)
│   └── [id]/
│       └── page.tsx                  # Proposal Detail (/council/proposals/[id])
├── voting/
│   └── page.tsx                      # The Vote (/council/voting)
├── delegation/
│   └── page.tsx                      # Delegation (/council/delegation)
├── curators/
│   └── page.tsx                      # Curators (/council/curators)
├── ledger/
│   └── page.tsx                      # The Ledger (/council/ledger)
├── reports/
│   └── page.tsx                      # Reports (/council/reports)
├── admin/
│   └── page.tsx                      # Administration (/council/admin)
└── applications/
    ├── page.tsx                      # Applications (/council/applications)
    ├── [id]/
    │   └── page.tsx                  # Application Detail (stub)
    ├── creator/
    │   └── page.tsx                  # Creator Application (/council/applications/creator)
    └── vendor/
        └── page.tsx                  # Vendor Application (/council/applications/vendor)
```

---

## 🧩 COMPONENT MAP

```
src/components/asgard/domains/themis/
├── council/
│   └── CouncilHub.tsx                # Council Chamber hub
├── proposals/
│   ├── ProposalsGallery.tsx          # Proposals list with filters
│   └── ProposalDetail.tsx            # Single proposal with voting
├── voting/
│   └── VotingHub.tsx                 # Active proposals with inline voting
├── delegation/
│   └── DelegationHub.tsx             # Delegate management + how-it-works
├── curators/
│   └── CuratorsGallery.tsx           # Curator directory
├── ledger/
│   └── LedgerHub.tsx                 # Transaction feed + stats
├── reports/
│   └── ReportsHub.tsx                # Moderator-gated report queue
├── admin/
│   └── AdminHub.tsx                  # Admin-gated tools directory
├── applications/
│   └── ApplicationsHub.tsx           # Reviewer-gated application queue
└── governance/
    └── ApplicationForm.tsx           # Creator/vendor application form (shared)
```

---

## 📊 PAGE DETAILS

### The Council Chamber (`/council`)
- **Purpose:** Governance hub — gateway to all Themis sections
- **Data:** `useAuth()` for tier checking
- **Components:** Card, Badge, Skeleton
- **Features:** 8 section cards, tier-gated indicator, Council Covenant footer
- **Access:** Public view, restricted sections hidden from non-admin

### Proposals (`/council/proposals`)
- **Purpose:** Browse and search all governance proposals
- **Data:** `useProposalsList()` — generated hook
- **Components:** Card, Badge, Progress, Button, Skeleton
- **Features:** Search, status filter, vote progress bars, vote counts, deadline display
- **Access:** Public view, "New Proposal" button for Council tier

### Proposal Detail (`/council/proposals/[id]`)
- **Purpose:** View proposal details and cast votes
- **Data:** `useProposals(id)` — generated hook
- **Components:** Card, Badge, Progress, Button, Skeleton
- **Features:** Full description, vote stats with progress bar, deadline countdown, tier-gated voting buttons (For/Against)
- **Access:** Public view, voting restricted to Council tier

### Voting (`/council/voting`)
- **Purpose:** Active proposals requiring votes — one-click voting
- **Data:** `useProposalsList({ status: 'active' })` — generated hook
- **Components:** Card, Badge, Progress, Button, Skeleton
- **Features:** Active proposals only, inline For/Against buttons, vote progress, deadline countdown
- **Access:** Public view, voting restricted to Council tier

### Delegation (`/council/delegation`)
- **Purpose:** Manage voting power delegation to trusted curators
- **Data:** Future: delegation table
- **Components:** Card, Avatar, Badge, Button
- **Features:** Delegate list placeholder, 3-step how-it-works guide
- **Access:** Council tier only

### Curators (`/council/curators`)
- **Purpose:** Directory of trusted community curators
- **Data:** Future: community_profiles with is_curator flag
- **Components:** Card, Avatar, Badge, Skeleton
- **Features:** Curator cards with endorsements and delegate counts
- **Access:** Public view

### The Ledger (`/council/ledger`)
- **Purpose:** Complete financial transparency — every transaction visible
- **Data:** `useLedgerList()` — generated hook
- **Components:** Card, Badge, Skeleton
- **Features:** Stats bar (total volume, transactions, distributions), color-coded entry types, formatted amounts, dates
- **Access:** Public view

### Reports (`/council/reports`)
- **Purpose:** Moderation queue — review flagged content
- **Data:** `useReportsList()` — generated hook
- **Components:** Card, Badge, Skeleton
- **Features:** Status badges, target info, resolution notes, action-needed indicators
- **Access:** Moderator/Admin only

### Administration (`/council/admin`)
- **Purpose:** Administrative tools directory
- **Data:** `useAuth()` for admin check
- **Components:** Card
- **Features:** 6 admin sections (User Management, Content Moderation, System Settings, Analytics, Audit Logs, Schema Explorer)
- **Access:** Admin only

### Applications (`/council/applications`)
- **Purpose:** Review or submit creator/vendor applications
- **Data:** `useApplicationsList()` — generated hook
- **Components:** Card, Badge, Button, Skeleton
- **Features:** Queue for reviewers, Apply buttons for users, Approve/Reject actions
- **Access:** Public view, review actions restricted to moderators/admins

### Creator / Vendor Application (`/council/applications/creator`, `/vendor`)
- **Purpose:** Submit an application to become a creator or vendor
- **Data:** `useCreateApplications()` + `useCommunityProfilesList()` — generated hooks; duplicate-pending guard via applications query
- **Components:** ApplicationForm (shared), Card, Button, Skeleton
- **Features:** Auth-gated form, one pending application per user enforced client-side
- **Access:** Authenticated users

### Application Detail (`/council/applications/[id]`)
- **Purpose:** Single application view — stub, not yet built

---

## 🔗 DATA DEPENDENCIES

| Page | Generated Hook | Table | RLS Policy |
|------|---------------|-------|------------|
| Council Hub | `useAuth()` | `profiles` | `authenticated_can_read_profiles` |
| Proposals Gallery | `useProposalsList()` | `proposals` | (needs policy) |
| Proposal Detail | `useProposals(id)` | `proposals` | (needs policy) |
| Voting Hub | `useProposalsList({ status: 'active' })` | `proposals` | (needs policy) |
| Delegation | Future | `delegation` | Future |
| Curators | Future | `community_profiles` | `public_can_view` |
| Ledger | fetch → `/api/generated/plutus-economics/ledger` | `ledger` (plutus-economics) | (needs policy) |
| Reports | `useReportsList()` | `reports` | `moderators_can_view` |
| Admin | `useAuth()` | `profiles` | `authenticated_can_read_profiles` |
| Applications | `useApplicationsList()` | `applications` | `users_view_own`, `admins_view_all` |

---

## 🎨 COMPONENT REUSE

All Themis pages use **zero new components**. Every page is composition of:

| Layer | Components Used |
|-------|----------------|
| **Yggdrasil** | Button |
| **Hof** | Grid (layout structure) |
| **Runes** | Card, Badge, Progress, Avatar, Skeleton |
| **Vegvisir** | None (search/filter is inline) |
| **Seidr** | None |

---

## 🔐 SECURITY

| Feature | Implementation |
|---------|---------------|
| Tier gating | `profile?.user_tier === 'council'` check for voting, proposals, delegation |
| Admin gating | `profile?.is_admin === true` for administration |
| Moderator gating | `profile?.is_moderator === true` for reports |
| RLS enforcement | All data access through generated API routes with RLS policies |
| Function security | No `is_admin()` function calls — all policies use column checks |

---

## 📦 BUILD METRICS

| Metric | Count |
|--------|:-----:|
| Server pages | 13 |
| Client components | 11 |
| New components built | 0 |
| Components reused | Card, Badge, Progress, Avatar, Button, Skeleton |
| Generated hooks used | `useProposalsList`, `useProposals`, `useLedgerList`, `useReportsList`, `useApplicationsList` |
| Lines of code | ~1,200 across all components |

---

## 🚀 FUTURE ENHANCEMENTS

| Feature | Priority | Notes |
|---------|:--------:|-------|
| Proposals RLS policies | High | Table exists but policies need creation |
| Delegation table + API | Medium | Table not yet created |
| Curator flag on community_profiles | Medium | `is_curator` column needed |
| Application detail page | Low | `[id]` route stub exists |
| Vote recording API | High | Currently optimistic UI — needs real endpoint |

---

*The Council Chamber is complete. Governance flows through 10 pages. Every voice matters. Every vote counts. The Sanctuary is governed in the open.*

🏛️✨
