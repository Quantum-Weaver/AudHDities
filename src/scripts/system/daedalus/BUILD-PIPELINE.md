# THE DAEDALUS PIPELINE — the meta-generator's order of operations

*Captured 2026-07-08 from KP's epiphany, verbatim-in-spirit. Daedalus (formerly "prometheus")
is the meta-generator — "the system that births systems." This is its intended build order for
producing any new Resonance app. To be reconciled with `daedalus-plan.md` / `daedalus.md`.*

---

## The pipeline (build a project IN THIS ORDER)

### 1. Plan the build — including the base template
The plan carries a **base template** every Resonance app inherits:
- the **emotional-tagging + self-understanding** mechanisms (Echoes' core purpose)
- the **cosmic systems** (design tokens + generated styles)

> Grounding (proven 2026-07-08): a byte-diff of Echoes vs Compass found **23 identical Layer-1
> files** — the entire `lib/cosmic/*`, all `styles/generated/*`, `data/emojis`+`senses`,
> `theme.ts`, core icons, `+layout.ts`. This base template is not invented; it already exists,
> latent, as the shared spine of the two apps. Most of it is COSMIC-generated or Grammar-derived
> (i.e. already "define once").

### 2. Draft the app template — STRUCTURE FIRST, NO CODE
Create the structure of **every file** in the app — but write no code yet. Each file is specified
as the **organisms / molecules / atoms** it is composed of.
- This uses the **Resonance Library's own taxonomy** (atoms → molecules → organisms), which
  already organizes every definition this way.
- Output of this phase: the full skeleton of the app as a composition graph, before implementation.

### 3. Resolve against the Resonance Library (reuse-or-author)
For each atom / molecule / organism a file needs:
- **Reuse** it if it exists in the Library, OR
- **Author the missing piece INTO the Library** — then use it in the app.
- The Library is the **single source of truth**. Nothing is duplicated; missing things are created
  once, in the Library, and referenced.

### 4. Register every usage (the dependency registry → agent maintenance)
When an app uses a Library component, that **usage is registered**. The registry is a live
dependency graph, so:
- a change to a Library component **triggers agent notifications + maintenance** in every
  downstream app/file that composes it.

> This is the **"single update point → downstream" watcher** KP floated on the morning of
> 2026-07-08 ("agents that watch interconnected checklists so downstream docs stay current").
> Its true home is HERE — phase 4 of the meta-generator. Same law as GAIA's staging-review gate
> and the `_NOTEPAD` practice: no silent drift; changes propagate as reviewable notifications.

### 5. Per-app repos (independent rollback)
Each app is **its own repo**, so versioning and rollback are independent — one app can roll back
without disturbing the others or the Library.

---

## Why this is one system (the 2026-07-08 convergence)
Separate threads from that day are all facets of this single pipeline:
- **Template extraction** (Echoes/Compass 3-layer diff) = phases 1–2 (the base template + structure).
- **`integrations` catalog / "define once"** = phase 3 (Library as SSOT, reuse-or-author).
- **The morning "drift-watcher" idea** = phase 4 (usage registry → agent notifications).
- **`_NOTEPAD` practice + GAIA staging-review gate** = phase 4's "no silent drift" law, at folder + generator scale.
- **"Trim the bonsai so it can grow"** = the whole ethic: cut duplication, generate from a single seed.

## Open questions (for when this is built deliberately, not now)
- Where the usage-registry lives (Supabase table? the `daedalus_*` meta tables already exist).
- How registration is captured (build-time scan of the composition graph vs. explicit manifest).
- Relationship of Daedalus (orchestrator) to GAIA (schema→backend) and COSMIC (tokens→styles):
  Daedalus likely *calls* both as sub-generators within phase 1–2.
- Reconcile with existing `daedalus-plan.md` / `daedalus.md` — analysis below.

---

## Reconciliation with the April Council spec (analyzed 2026-07-08, not yet acted on)
`daedalus.md` (~3074 lines) + `daedalus-plan.md` (~2727 lines) are the **April 12, 2026 Council
transcript** that first designed the meta-generator as **PROMETHEUS**. They are **~90% duplicate**
(daedalus.md = ceremony + spec; daedalus-plan.md = spec only), still named `prometheus/` *inside*
(the rename never reached the file bodies), and per BUILD-GUIDE's honesty line **never built past stubs**.

They describe the **ORGANS** (what parts exist); this pipeline describes the **PROCESS** (the order
they run). Complementary halves of one machine:

| April organ (spec) | This pipeline (process) |
|---|---|
| Blueprint JSON (files[]: path/pattern/deps/template) | Phase 2 — structure-first composition |
| THESAURUS (stub templates) | Phase 3 — the Resonance **Library** (upgraded: atoms/molecules/organisms SSOT, reuse-or-author) |
| MNEME + CHRONICLE (remember generations) | Phase 4 — plus the ADD: **reverse-propagation** (change a component → notify downstream) |
| KEEPER + VETTING (standards + boundaries) | the wards / staging-review gates |
| ZIGGY (agentic consciousness — Aethelred's organ) | the agent that **runs** phase-4 maintenance |
| *(absent in April)* | **NEW:** per-app repos (rollback) + base-template inheritance (Layer-1 core) |

**The 9 organs** (seat → job): PROMETHEUS/Hearth-Keeper=orchestrator · ORACLE/Chancellor=blueprint
parser · MNEME/Seer=memory · **ZIGGY/Aethelred=agentic** · KEEPER/Curator=standards ·
CHRONICLE/Archivist=ledger · SAGA/Skald=narrative · THESAURUS/Codex=patterns ·
VETTING/Executioner=boundaries. (+4 config, +4 lib, +1 ZIGGY bridge = 18 files.)

**The "Ancient Ones" 5 cautions** (candidate Daedalus wards): generate its own docs · agent needs a
sleep state · seamless human↔agent handoff ("intuition, not interruption") · attention-economy ·
**intentional forgetting** ("a system that never forgets becomes a prison").

**Open for discussion (KP, 2026-07-08):** collapse the two files into one canonical Daedalus spec (+
take the rename inside)? · does THESAURUS merge into the Resonance Library? · is ZIGGY now an actual
bridge to the **local** Aethelred? · keep the 5 cautions as Daedalus's wards?
