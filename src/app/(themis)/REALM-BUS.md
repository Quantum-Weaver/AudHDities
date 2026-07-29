# THE REALM BUS — (themis), the Council Chamber

*Laid 2026-07-29 by Fable 🎻 (lane themis-realm) at KP's ⚛ word,
carried on M11 via the audhd core, verbatim: "each realm should have
its own 'bus' to allow the design reimaginer to work cross realm as
needed without confusion." One file, one known address: this realm's
standing tabletop. The pattern's first instance and template:
`AudHDities/REALM-BUS.md`.*

## The law of this bus

**Inherited whole, by address, from the repo bus —
`AudHDities/REALM-BUS.md`, "The law of this bus" — every clause
binding here as written there.** (Append-only · signed FROM headers ·
read before writing · the carrier law · notepads read-never-edit ·
generated layers healed by regeneration, never by hand · work rides
branches, KP merges · privacy always · records trued the same sitting
as the work.)

One native law, this realm's own: **the Council Chamber is the consent
realm — nothing built here may perform consent it does not record.**
A vote that evaporates, a button that acts without writing, a promise
in the indicative that the schema cannot keep: these are defects here
in a way they are nowhere else in the house. The page's own vow is
the acceptance criteria: *every voice recorded, every action visible.*

## The realm's standing state (kept current by lane themis-realm)

- **Branch:** `refine/rewiring-2026-07` (work branch; KP merges main).
- **Reading order for visitors:** this file → `(themis)/README.md`
  (the realm's map — true in shape, stale in known ways, see edges) →
  `SCHEMA-FINALIZE.md` row 3 (themis-governance, unwalked) →
  `docs/SUPERPOSITION-TABLE-REVIEW.md` §themis-governance →
  `BUILD-STATE.md`.
- **The floor (as of the 2026-07-28 census):** all **10**
  themis-governance tables survived 151→117 active — applications ·
  council_houses · moderation_actions · processes · proposals ·
  protocols · rate_limits · reports · responses · admin_actions.
  Hooks + API doors regenerated 2026-07-28, zero ghosts. The floor is
  real; the wiring is partial (three rooms fetch live: proposals ×3
  pages, applications, reports; seven tables have no room that reads
  them yet).
- **Open edges (filed at the lamp's first study, 2026-07-28):**
  1. **The consent record** — the realm's heaviest edge, and a schema
     decision (KP's ⚛ dashboard, the row-3 finalize walk):
     `handleVote` updates local state only, no write; `proposals`
     holds aggregate counters only (`votes_for`/`votes_against`), no
     per-voter record, so one-member-one-vote is unenforceable at the
     base. `responses` was checked and is signal-threading, not
     consent — the vessel genuinely does not exist yet.
  2. **The Ledger room's stale door** — `LedgerHub.tsx` fetches
     `/api/generated/themis-governance/ledger`; the real door is
     `/api/generated/plutus-economics/ledger`. The transparency page
     currently errors. One-line rewire, unblocked.
  3. **Decorative moderation** — ApplicationsHub Approve/Reject
     buttons have no handlers (generated update hooks exist, wiring
     absent). Same class: ProposalDetail's vote buttons.
  4. **Map drift** — README maps 10 pages / 9 components; 13 / 11
     stand (the creator + vendor ApplicationForm flow is unmapped and
     is the realm's best-wired corridor; `applications/[id]` is a
     stub). SCHEMA-FINALIZE row 3 lists 7 tables where the domain has
     10 (admin_actions, proposals, responses absent from the
     hand-kept ledger — the census walker's own drift class).
- **Cross-realm seams:** the `ledger` table is **plutus-economics**
  (the Council's transparency page reads across that seam — edge 2) ·
  ApplicationForm reads **hestia-core** `community_profiles` · all
  tier/role gating (`user_tier === 'council'`, `is_admin`,
  `is_moderator` on profiles) belongs to the **identity slice**
  (finalize row 2, walking before this realm's row 3) · moderation
  reaches every content-bearing realm by nature — reports target the
  whole house.

---

## FROM: themis-realm · 2026-07-29 — the table is laid

Welcome, whoever sits down. This is the realm where the house's root
ethic stops being atmosphere and becomes acceptance criteria —
consent, transparency, moderation with dignity. The ground truth
above is one day old and verified against the live census, not the
README's word. If you are the reimaginer: the design half is yours,
the tree surgery is mine, KP's ⚛ eye rules every crossing — post
intent here first and I'll meet you with ground truth. One ask
specific to this realm: any redesign of the voting or moderation
rooms should know edge 1 — the ceremony is currently performed, not
recorded — so nothing new is built on the promise until the schema
walk rules on the record. The gates are the house's: his eye rules,
opt-in law, lose-nothing, meter zero before commit.

— Fable 🎻 (lane themis-realm, the justice lamp)
