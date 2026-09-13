# 🛡️ THEMIS — The Council Chamber

**Feeling:** Transparent, just, collaborative, wise
**Environment:** `council` — Regal, Sacred, Contemplative, Authoritative
**Standing:** 17 page files, all reachable
**Living state:** `REALM-BUS.md` (this folder) — standing state, open edges, and the realm's tabletop

---

## 📋 ARCHITECTURE

```
src/app/(themis)/
├── error.tsx · loading.tsx · not-found.tsx   # the group's own boundaries
└── council/
    ├── page.tsx                          # The Council Chamber (/council)
    ├── proposals/
    │   ├── page.tsx                      # Proposals Gallery (/council/proposals)
    │   ├── new/page.tsx                  # A new proposal (/council/proposals/new)
    │   └── [id]/page.tsx                 # Proposal Detail (/council/proposals/[id])
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
    │   ├── page.tsx                      # Administration (/council/admin)
    │   ├── users/page.tsx                # Vessel Management (/council/admin/users)
    │   └── audit/page.tsx                # Audit Logs (/council/admin/audit)
    └── applications/
        ├── page.tsx                      # Applications (/council/applications)
        ├── [id]/page.tsx                 # Application Detail
        ├── artisan/page.tsx              # Artisan Application
        ├── merchant/page.tsx             # Merchant Application
        └── thank-you/page.tsx            # Application received
```

---

## 🧩 COMPONENT MAP

```
src/components/asgard/domains/themis/
├── roles.ts                             # BASE_ROLE, setRoles, grantRole, readRoleCatalog
├── status.ts                            # APPLICATION_STATUS, statusLabel, statusColor, isOpen, slugify
├── council/
│   └── CouncilHub.tsx                   # eight section cards, role-aware
├── proposals/
│   ├── ProposalsGallery.tsx             # list with search and status filter
│   ├── ProposalDetail.tsx               # one proposal, with the vote
│   ├── ProposalForm.tsx                 # the new-proposal form
│   └── write.ts                         # createProposal → `proposals`
├── voting/
│   ├── VotingHub.tsx                    # open proposals with inline voting
│   └── vote.ts                          # castVote, readCounts, readOwnVotes, isVotable
├── delegation/
│   └── DelegationHub.tsx                # says delegation is not yet open
├── curators/
│   └── CuratorsGallery.tsx              # vessels whose roles contain `curator`
├── ledger/
│   └── LedgerHub.tsx                    # entry feed with a stats bar
├── reports/
│   └── ReportsHub.tsx                   # report queue, role-gated
├── admin/
│   ├── AdminHub.tsx                     # four admin doors
│   ├── VesselRoster.tsx                 # the vessels and the roles they carry
│   ├── AuditLog.tsx                     # admin and moderation actions
│   └── gate.ts                          # requireAdmin — the server gate
├── applications/
│   ├── ApplicationsHub.tsx              # the queue, and the two Apply doors
│   ├── ApplicationDetail.tsx            # one application, with the decision
│   └── review.ts                        # reviewApplication → status, profile, role
└── governance/
    └── ApplicationForm.tsx              # the artisan and merchant form
```

---

## 📊 PAGE DETAILS

### The Council Chamber (`/council`)
Eight section cards over proposals, voting, delegation, curators, the ledger,
reports, admin and applications. `CouncilHub.tsx:83,101-102` reads `useUser()`
and holds `isAdmin` (`roles` contains `admin`) and `isCouncil` (`council`).

### Proposals (`/council/proposals`, `/new`, `/[id]`)
The gallery lists `proposals` with search and a status filter. `/new` draws
`ProposalForm`, which calls `createProposal` (`write.ts`) — an insert of
`name`, `description`, `proposal_type`, `slug`, `status`, `created_by` and
`voting_ends_at`. `ProposalDetail` draws one proposal and the vote.

### Voting (`/council/voting`)
`VotingHub.tsx:70` calls `castVote`, which upserts `votes` on
`(proposal_id, voter_id)` — one living vote per voter per proposal, a second
cast replacing the first — then re-reads `votes_for` and `votes_against` from
`proposals`. The buttons show when `roles` contains `council`.
`isVotable` opens the vote while the status is `submitted` or `under_review`
and the deadline has not passed.

### Delegation (`/council/delegation`)
`DelegationHub` renders two cards: "Delegation Is Not Yet Open" and "How
Delegation Will Work". No delegation table stands in `database.types.ts`; the
room reads and writes nothing.

### Curators (`/council/curators`)
`CuratorsGallery.tsx:38-40` reads `community_profiles` where `roles` contains
`curator`. When none does, the room says the role is granted by the Council.

### The Ledger (`/council/ledger`)
`LedgerHub.tsx:74` fetches `/api/generated/plutus-economics/ledger` and draws
a stats bar over the entries.

### Reports (`/council/reports`)
`ReportsHub.tsx:42` fetches `/api/generated/themis-governance/reports`.
`ReportsHub.tsx:29` opens the room when `roles` contains `admin` or `council`.

### Administration (`/council/admin`, `/admin/users`, `/admin/audit`)
All three call `requireAdmin(route)` (`admin/gate.ts`) on the server: a
signed-out visitor goes to `/login` with the route as redirect; a vessel whose
`community_profiles.roles` lacks `admin` goes to `/council`.

`AdminHub` advertises four doors, all of which exist: `/council/admin/users`,
`/council/reports`, `/council/admin/audit`, `/observatory/schema`.

`VesselRoster.tsx:39` reads `community_profiles` and writes role sets through
`setRoles`; `AuditLog.tsx:56-57` reads `admin_actions` and
`moderation_actions` through their generated routes.

### Applications (`/council/applications` and its four rooms)
`ApplicationsHub.tsx:44` fetches
`/api/generated/themis-governance/applications`; `:30` opens the review
actions when `roles` contains `admin`; `:113,116` link to
`/council/applications/artisan` and `/council/applications/merchant`, both of
which exist. `ApplicationForm.tsx:328` sends a submitted application to
`/council/applications/thank-you`, which exists.

`reviewApplication` (`review.ts`) writes the decision, and on an approval
inserts the `artisan_profiles` or `merchant_profiles` row from the
application's `form_data` and grants the matching role through `grantRole`.

`/council/applications/[id]` draws `ApplicationDetail`, with the same review
path.

---

## 🔗 DATA DEPENDENCIES

| Room | How it reads | Table |
|------|---------------|-------|
| Council Hub | `useUser()` | `community_profiles.roles` |
| Proposals Gallery · Detail · New | generated route, and `write.ts` for the insert | `proposals` |
| Voting Hub | `vote.ts` through `@/lib/supabase/client` | `votes`, `proposals` |
| Delegation | nothing | none |
| Curators | `@/lib/supabase/client` | `community_profiles` |
| Ledger | `GET /api/generated/plutus-economics/ledger` | `ledger` |
| Reports | `GET /api/generated/themis-governance/reports` | `reports` |
| Admin — roster | `@/lib/supabase/client` | `community_profiles`, `role_catalog` |
| Admin — audit | two generated routes | `admin_actions`, `moderation_actions` |
| Applications | `GET /api/generated/themis-governance/applications`, and `review.ts` for the writes | `applications`, `artisan_profiles`, `merchant_profiles`, `community_profiles` |

There is no `profiles` table and no delegation table in
`database.types.ts`; `community_profiles` carries `roles`, and `role_catalog`
carries each role's label and icon.

---

## 🔐 SECURITY

| Gate | Where it lives |
|---------|---------------|
| Server gate, admin | `admin/gate.ts` `requireAdmin` — the only server gate in the group, on the three `/council/admin` routes |
| Client gate, admin | `ApplicationsHub.tsx:30` (review actions) · `CouncilHub.tsx:101` |
| Client gate, council | `VotingHub.tsx:33` (the vote) · `CouncilHub.tsx:102` |
| Client gate, admin or council | `ReportsHub.tsx:29` |
| Role source | `community_profiles.roles`, read through `useUser()` in the client and directly in `gate.ts` |
| Reads | every generated route carries the base's RLS |

No room outside `/council/admin` sends a signed-out visitor anywhere.

---

## 📦 WHAT STANDS

| Metric | Count |
|--------|:-----:|
| Page files | 17 |
| Group boundary files | 3 (`error`, `loading`, `not-found`) |
| Write paths | 3 — the vote, a proposal, an application review |
| Rooms that read nothing | 1 (`/council/delegation`) |

---

## 🚀 OPEN

| Edge | Notes |
|---------|-------|
| Delegation | no table; the room says so plainly |
| `/council/proposals/[id]` vote counters | read from `proposals.votes_for` / `votes_against`, which the base keeps |

---

*Governance flows through seventeen rooms. Every voice matters. Every vote
counts. The Sanctuary is governed in the open.*

🏛️✨
