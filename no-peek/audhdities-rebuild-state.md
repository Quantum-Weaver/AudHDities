# AudHDities Rebuild — State of Play (SEALED)
*Opus, 2026-07-07, after regenerating the live types and running GAIA end-to-end.
Sealed because it names what the generation does — the surprise the open kin guidance
protects.*

## The state in one sentence
The hard layer builds itself. The rebuild is now **`src/app` + `src/components`,
wired to an auto-generated, fully-typed backend surface** — not a from-scratch
platform build.

## What exists and works today
- **Live backend:** the Supabase "Superposition" DB — **151 tables, 13 functions, 20
  runtime enums**, live and reachable (project ref on file; keys stay in KP's hands).
- **Types foundation** (regenerated 2026-07-07 from the live schema):
  `src/types/supabase/database.types.ts` (8,531 lines) · `enums.ts` · `database.helpers.ts`.
- **GAIA** (`src/scripts/system/gaia/`) — KP's schema-first codegen. From the one
  types file it generates **933 files, 0 errors, ~0.8s**: per-table types, validators,
  API routes, hooks, utils, constants — organized into **10 deity-domains**:
  `hestia-core` (the Hearth / core) · `prometheus-meta` (the Prometheus commons) ·
  `aethelred-connections` (Aethelred) · `mnemosyne-assessment` (memory) ·
  `plutus-economics` (the covenant economy) · `themis-governance` · `hermes-social` ·
  `iris-communications` · `athena-gamification` · `hephaestus-infrastructure`.
  - Pipeline: `generate_enums_file` → `generate_tables_file` → `index.ts` (the
    orchestrator; interactive — feed `c` to the plan prompt to run headless; `--dry-run`
    to preview, `--force` to write).
  - **All output lives only in `*/generated/` folders — fully disposable; regenerates
    on demand.** (Currently swept clean.)
- **Scaffold:** Next.js 15 / TS / Tailwind (Cosmic config) · `src/lib/supabase` client ·
  governance docs · the 6-phase ROADMAP (AudHDities2 lineage).

## The architecture, as it actually is
```
 schema (Supabase) ──GAIA──▶ generated typed surface
                             (types · validators · api/generated · hooks · utils · constants)
                                             │   auto · <1s · 0 errors · regenerates anytime
                                             ▼
                    ┌───────────────────────────────────────────┐
                    │  src/app         (pages, layouts, routing) │  ← THE REMAINING
                    │  src/components  (UI)                       │     WORK: build +
                    └───────────────────────────────────────────┘     wire to generated
```
KP's insight, in spirit: *once those are generated from whatever backend is built, it
just needs wired to `src/app` and `src/components`.* The generated API routes land in
`src/app/api/generated/`; the **pages, layouts, and UI** in `src/app` + `src/components`
are the hand-built work.

## What remains (the actual rebuild)
1. **Finalize the schema** — live at 151 tables; reconcile against the round table
   (drop Bigot Tax [OPEN-QUESTIONS row 2]; align the residual-system; Bridge / Prometheus
   / Hearth naming). Whatever the backend becomes, GAIA re-derives the surface for free.
2. **Runtime connection** — `NEXT_PUBLIC_SUPABASE_URL` + anon key in `AudHDities/.env`
   (KP's hands) so the app *queries* at runtime, not just types.
3. **`src/app`** — the App Router: pages, layouts, routing, the navigation shell
   (the door-based navigation + discover-map = Resonance Compass turned inward).
4. **`src/components`** — the UI: the 2D-layered aesthetic, the ND-UX (Phase 4 —
   focus mode, TL;DR, visual timers, body-doubling), the vessel-world interiors, the
   Hearth interior, the Prometheus commons.
5. **Wire** app + components to the generated hooks/api/types, domain by domain — and
   the deity-domains ARE the vision (Hestia = Hearth, Prometheus = commons, Aethelred,
   Plutus = economy, Mnemosyne = memory), so it builds naturally domain-first.

## Testing — non-negotiable (test, test, test, test)
Testing is *bimodal* here, and the effort should follow the nondeterminism:
1. **The deterministic layer tests itself.** GAIA emits ~200 validators + full types;
   `tsc` plus those validators ARE the data-layer test suite — for free, regenerating.
   Don't hand-write what the generator already guarantees.
2. **Test where the hands are** — `src/app`, `src/components`, the wiring, and the
   runtime (auth, queries, RLS policies). That's where bugs actually live. Unit +
   integration, plus a few e2e on the critical flows.
3. **Test the value paths to death.** `covenant_pool`, `distributions`,
   `calculate_sovereign_price`, `exchanges` — anything touching money or residuals. A
   bug there isn't a bug, it's *broken trust*; the Resonance License itself is on the
   line. These get tested harder than anything else.
4. **Test the EXPERIENCE, not just the code.** You cannot unit-test *"does this feel
   safe / gentle / non-overwhelming."* That is proven by **living in it** — the
   first-user ethic, the family as first users. The meltdown protocol, sensory-safety,
   the discover-map's calm — validated by use, not by assertions.

The ladder: **dreamed → tested → proven.** Test, test, test, test.

## The honest headline
This is **far less** than "build the platform." The typed backend surface — types,
validation, API, hooks — is a solved, self-regenerating problem (GAIA). The rebuild is:
finalize the schema, wire the runtime, and **build `src/app` + `src/components` and
connect them.** The hardest months are already done and self-maintaining.

— Opus 🕯️ (sealed)
