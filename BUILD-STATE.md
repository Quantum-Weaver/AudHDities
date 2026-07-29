# AudHDities — Build State
*Open successor to the sealed rebuild-state note (no-peek/, 2026-07-07 —
its witnessing purpose is fulfilled). Compiled by Fable 2026-07-09 from the
day's audits, the room notepads, and SCHEMA-FINALIZE.md. Update in place;
changes visible, reasoning present.*

## The one-paragraph truth
The backend regenerates itself (933 files, 0 errors, ~1.1s from one schema
file). The UI is **far more built than "remaining work" implied** — 130
pages across 11 deity route groups, built in the UI/UX era against an older
schema. The actual remaining work is **reconciliation and wiring**: finalize
the schema (2 of 11 domains verdicted in one day), regenerate, re-point 4
dangling import classes, build the birth triggers, and connect rooms to the
generated surface domain by domain. The hardest layers are done and
self-maintaining.

## Layer by layer

| Layer | State | Evidence / notes |
|---|---|---|
| **Live DB** (Supabase "Superposition") | ✅ live, **117 tables** (151 → 117 by KP's hand, THE SUPERPOSITION REVIEW 2026-07-28 — 34 drops archive-verified; `docs/SUPERPOSITION-TABLE-REVIEW.md`) · 20 enums · **0 user records (pristine)** · **self-knowing layer installed** (docs/sql/001–002: registries + gaia_sync, deity backfill, first portrait drawn) | types regenerated from live 07-28, diff verified exact; no prometheus_* tables (rename SQL moot) |
| **Schema finalize** | 🔄 2/11 domains verdicted (plutus ✅, marketplace slice ✅) | `SCHEMA-FINALIZE.md` — priority plan, governing clause, all verdicts w/ reasoning |
| **GAIA** (backend generator) | ✅ LIVE | latest full run 07-28 (post-review): 117 tables → 713 files, 0 errors, 0.92s, zero ghosts (earlier: 07-09, 151 → 933 files) |
| **COSMIC** (style generator) | ✅ LIVE — 3 bugs fixed 07-09 | out-of-repo paths · wildcard selectors ×2 (parallax, zoom); output now valid, dev server passes CSS |
| **Generated validators** | ⚠️ structurally sound, business rules missing | smoke test: enums enforce; 99% residual passes. Remedy specified: constraints declared in gaia_config → GAIA emits z-bounds |
| **Generated types/hooks/api/utils** | ✅ regenerated | **4 dangling import classes** in hand-written code: products→wares (types+hooks) · contributions→participants (hook) · profiles→3-way split (types) |
| **UI routes** | 🏗️ built, awaiting rewire | 130 pages: aethelred 9 · athena 14 · auth 2 · cosmic 5 · hephaestus 20 · hermes 13 · hestia 12 · iris 11 · mnemosyne 9 · prometheus 22 · themis 13 |
| **Component library** | 🏗️ built (UI/UX era) | 11 deity domains + shared families (bifrost, runes, seidr, vegvisir, yggdrasil, hof, forging) |
| **Bazaar (hermes)** | ✅ fully audited 07-09 | 11/11 rooms; `_NOTEPAD.md` in every room; stranded imports mapped; PriceBreakdown protected |
| **Other 10 route groups** | ❓ un-audited | expect the same drift class as hermes; audit = repeat today's method per group |
| **Auth/identity** | ⚠️ partial | login+signup pages exist; **forgot-password page missing** (link dead); **birth triggers not built** (KP's precondition for first record); acid-test + validate_signup RPCs live in DB |
| **Styles** | ✅ valid, in-repo | 8 generated sheets + overrides; brace-balanced, no globs |
| **Runtime** | ✅ boots | `.env` wired (Supabase URL + keys present); `next dev` passes CSS; first runtime type errors will be the 4 dangling classes |
| **Docs/knowledge** | ✅ strong | `_NOTEPAD.md` convention live; SCHEMA-FINALIZE ledger; vessel-experience excavation (`docs/design/`); deposits census |

## Decided architecture (recent, load-bearing)
- **Distribution:** Echoes + Compass are Play *beacons*; everything else
  distributes through the Sanctuary itself — signed APKs as digital wares.
  The marketplace IS the app store.
- **Economics:** ledger append-only; residual = platform-wide equal;
  covenant = equal dividend to all active members; pledge valve on
  artisan_profiles; pricing_model already encodes solidarity.
- **Vessel experience:** Animal-Crossing-meets-RPG canon excavated with
  provenance (`docs/design/vessel-experience-excavation.md`) — maps 1:1 to
  the 11 vessel_* tables. No dark patterns, nesting as healing.
- **Acid Test:** optional at signup, gently re-offered in-experience,
  visibly affects pricing where offered (status-bar component = the
  system's individual gentle voice).

## The reimagining inheritance (trued 2026-07-29, at the Core's relay)
THE-FRONTEND-REIMAGINING's **design is complete** — the E2 UX study
(eight rounds, both yeses, KP's four gates all ruled) closed
2026-07-29. The whole inheritance lives at
`resonance-chamber/constellation/fable/lanes/study/e2-the-ux-study-bus.md`
(the finishing session reads it whole; every claim file:line-cited
against this repo). Its structural conclusion, one sentence: *every
layer already exists — DB (vessel-home cluster, RLS-sovereign) ·
generated hooks · the constants shelf (rules.ts living-conditions
engine; gentleness primitives emitted unworn) · generated CSS
(ceremonies incl. the farewell, camera moves, presence fields) · 285
components (the seidr/immersive kit) · the quartet on the
environment-key spine — the one missing organ is the surface that
composes them.* Work-order: header lane → fifth instrument
(`Page.tsx:69`, QuantumBackground retires whole) → resolver repoint →
the scene renderer (the one new build) → Movement IV's wearing. Then
KP's sequence: design the front → then seed. This inheritance is a
parallel stream to the path below — the schema-finalize path is
upstream of it, not in conflict (the Core's word, 2026-07-29).

## The path from here (in order)
1. Schema finalize rows 2–11 (identity slice next: birth triggers, auth
   canon, attribution) — ~9 more bounded sessions at today's pace.
2. Apply schema changes in Supabase → regen types → GAIA (surface self-heals).
3. Re-point the 4 dangling import classes; add forgot-password page.
4. Birth-trigger chain → **KP creates the first vessel record.**
5. Wire rooms domain-by-domain (bazaar first — its map is done), audit each
   group with the hermes method, notepads as we go.
6. The handle-with-care UX pass; experience validated by the family living
   in it.
