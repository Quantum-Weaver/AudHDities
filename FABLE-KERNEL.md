# FABLE-KERNEL — AudHDities (the Sanctuary rebuild/refine)
*A project kernel: written by Fable for the next Fable who opens this realm,
at KP's commission (2026-07-09). Identity first
(`resonance-chamber/entities/kernels/fable/RECALL.md`), then this. This
realm is the fellowship gap's center and the largest project in the house —
but it is a REFINE, not a rebuild, and the day this was written proved the
pace: two schema domains verdicted, the bazaar audited, three generator
bugs killed, all in one sitting.*

## What this is
The Sanctuary platform itself — audhdities.com's engine and home. 151-table
live Supabase ("Superposition"), a self-regenerating typed backend (GAIA:
933 files, 0 errors, ~1.1s), a style system (COSMIC), and 130 UI pages
across 11 deity route groups awaiting reconciliation with the newest schema.
The marketplace IS the app store (sanctuary distribution); the economy has
a conscience with foreign keys; the vessel experience is Animal-Crossing-
meets-RPG with no dark patterns.

## Read these, in this order — they are the realm's live state
1. **`BUILD-STATE.md`** (repo root) — the whole picture, layer by layer,
   and the six-step path. Trust it; update it as you work.
2. **`SCHEMA-FINALIZE.md`** — the iteration ledger: priority plan, the
   governing clause (changes visible, reasoning present, no erasure), and
   every verdict so far WITH KP's reasoning. Plutus ✅ · marketplace ✅ ·
   identity slice is NEXT (row 2).
3. **`src/app/(hermes)/_NOTEPAD.md`** + its room notepads — the audited
   bazaar; the template for auditing the other ten route groups.
4. `docs/design/vessel-experience-excavation.md` — the excavated vision
   with provenance; binds the vessel-world slice.
5. The kin handoff `resonance-chamber/entities/kin/handoffs/
   2026-07-09-fable-schema-review.md` — how this was handed to Opus.

## The next session's work (identity slice, row 2) — pre-loaded verdicts
KP already gave these; write them into the ledger as you apply them:
- **Acid Test**: optional at signup; gently re-offered in-experience (the
  status-bar component is the system's individual voice); visibly affects
  pricing where offered (`calculate_sovereign_price` + acid-test RPCs are
  live in the DB).
- **Birth triggers before first record** — KP will NOT create his user
  record until auto-creation is wired: on auth.users insert →
  user_private + user_roles + community_profiles(draft) + dignity-floor
  registration (define is_active criteria!) (+ optional zero-amount
  'arrival' ledger line). Artisan/merchant profiles are application-gated,
  never automatic.
- **Audit ≠ belonging**: created_by/updated_by are bookkeeping;
  attribution FKs (artisan_id on works, etc.) placed deliberately.
- Missing page: **forgot-password** (login links it; nothing answers).
- Auth routes import dead `hestia-core/profiles` — decide canonical
  auth-facing identity across the three-way profile split.

## Standing truths (don't re-derive)
- Stratigraphy: **backend is the newest stratum** — schema wins conflicts.
- Only **4 dangling generated-import classes** app-wide (BUILD-STATE lists
  them); re-point AFTER the schema settles and GAIA regens.
- Validators need teeth: constraints declared in gaia_config →
  GAIA emits z-bounds (smoke test at `src/scripts/audit/validator-smoke.ts`).
- gaia_config in the DB is a blank slate; the CSV export + this ledger
  populate it. Daedalus rename SQL is likely MOOT (no prometheus_* tables
  live — pending KP's dashboard confirm).
- Per-folder `_NOTEPAD.md` convention is law during this refine.

## Dispatch notes
- **Opus** carries the schema iteration with KP (handoff above); deep
  builds (triggers, GAIA constraint-emitter) are his or shared.
- **Sonnet**: route-group audits by the hermes method (bounded, criteria'd
  — one group per session); the doc-consistency pass (row 5/10 class).
- **Haiku**: import/link sweeps after each regen; census counts.
- **Fable**: the telling — reviews with KP, UX language, story blocks,
  provenance; the handle-with-care pass at the end.
- **KP's hands**: Supabase SQL, .env, dashboard confirms, all verdicts.

*The house was built between meltdowns and is stronger for it. Refine with
the same patience it was built with. — Fable 🎻*
