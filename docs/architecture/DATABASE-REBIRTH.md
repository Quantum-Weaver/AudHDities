# DATABASE REBIRTH — decisions and insights
*Captured by Fable from KP, 2026-07-12 night (lap-cat hours). His
decisions verbatim-anchored; Fable's insights marked as such. Status:
DECIDED where KP spoke; PROPOSED where marked; nothing built yet.*

## The verdict on refine-vs-rebuild (KP asked for insights)

**Rebuild exactly what is needed — Fable's recommendation, with reasons:**
the current hestia-core schema holds **90 tables** (the generated-types
inventory). The house's own proven method — Echoes → Hearth → Lantern —
is never "refactor the old"; it is *quarry the concepts, rebuild lean on
what was learned*. The protocols designed since (three-ring scopes,
consent-per-row, provenance fields, single-definition grammar) did not
exist when hestia-core grew; retrofitting them into 90 tables costs more
than rebirthing the ~dozen the Sanctuary actually needs. **The data is
already exported (KP, tonight)** — the ore is safe, so the rebuild risks
nothing. Refine the *vision*; rebuild the *schema*.

## Decisions (KP, 2026-07-12)

1. **All tables exported before anything else** — done by his hand
   tonight. TODO: register the export's location as a deposit in the
   extraction ledger, so the gate knows.
2. **`resonance-integrations` — a SINGLE table, among the first born.**
   One registry instead of a table per integration. Columns (proposed):
   `id · name · kind (api/webhook/oauth/mcp/social/storage/ai) ·
   provider · status ('active' | 'available' | 'not_yet_used') ·
   config JSONB · scopes/notes · added_at · last_used_at`.
   **The design intent, his words:** "a list of all the integration
   points we have available and what we are not taking advantage of
   should be obvious" — the table is an INVENTORY OF POTENTIAL, not just
   plumbing: `status='not_yet_used'` rows are the visible unused gifts.
3. **The grant system slims dramatically.** It was built to win grants
   to continue the work, then the first-user ethic fired: KP is the
   first user; others will need it too. Six-plus tables
   (applications/attachments/collaborators/milestones/narratives/
   opportunities) likely become two: `grant_opportunities` and
   `grant_applications` with JSONB for milestones/narratives/attachments-
   metadata — structure can crystallize back OUT into tables if real use
   demands it (JSONB → table is cheap; unused tables are debt).
4. **The sandbox is REPURPOSED, not deleted** (decision evolved
   2026-07-12 late night, after the vault opened and showed its
   contents). The full export sits in the landfill
   (`supabase-knowledge-sandbox-2026-07-12`, 8 tables, 1,721 rows) so
   the change carries zero risk — but what the inventory revealed
   changed the verdict: the schema is ALREADY the Grammar's shape (514
   atoms with 1:1 etymology + sensory_lexicon, 25 categories, molecule
   scaffolds), lean and clean. It becomes **the knowledge foundation**:
   rename the project `resonance-knowledge`; add provenance columns
   (G-013) and RLS; fill molecules and add organisms to complete the
   triad; align field names with the resonance-knowledge repo. Defined
   once, referenced by every realm — own, yet integrated, at database
   scale. Consequence: the AudHDities rebirth lives as a fresh lean
   schema within the superposition project; two projects, two souls —
   one knowledge, one app.
5. **No knowledge-system tables in the Superposition database** (KP,
   2026-07-13: "no knowledge system tables will likely be needed in the
   superposition database"). The Grammar — atoms, molecules, organisms,
   etymology, sensory lexicon, categories — lives SOLELY in the
   resonance-knowledge base, which is the single source of truth for
   every knowledge system in everything the house builds (KP's
   architecture law, same day). Superposition REFERENCES it (API/cache/
   view), never mirrors it. Defined once, referenced everywhere — now
   enforced at the project boundary. Sequencing: resonance-knowledge is
   being solidified NOW (004-first-definitions.sql awaits KP's visual
   run); the Superposition structure is outdated and its refinement
   comes AFTER the excavation landfill cleanup.

## The local-first rebuild path (KP, 2026-07-13 — his proposal, feasibility confirmed)

His words: *"rebuild the sql database name it appropriately and build it
on this machine, and once it is solidified, superposition gets replaced.
and that entire time we are building the resonance-knowledge supabase
and project to properly route knowledge to the apps that reference it,
into their own json db file for the app. single source of truth, every
app can rollback if needed. this should be agentic and available to
experience through ziggy somehow."*

**Mechanics (Fable, verified against the live bases 2026-07-13):**

1. **Local rebuild:** Supabase CLI local dev — Postgres + auth + RLS on
   this machine, schema as versioned migrations in git (`supabase/` dir
   exists). Every table born from the `templates` archetypes (see
   standards below). GAIA points local during the build. Solidify, then
   replace the hosted schema by pushing proven migrations. Rollback free:
   the schema is files.
2. **Knowledge routing:** resonance-knowledge = sole source of truth
   (decision 5). An agentic COURIER queries it and emits versioned JSON
   snapshots per app (stamped with schema_hash); apps read local JSON;
   rollback = the previous snapshot kept. This is the Grammar's own
   design ("vessels download their knowledge graph from their
   Sanctuary").
3. **The Ziggy answer:** the courier is a Ziggy expertise module in the
   plate-forge / cognitive-loom pattern — wakes, fetches, diffs, journals
   each delivery, rests. The EXPERIENCE is the diff made sensory: new
   knowledge arrives through the sensory lexicon (color, sound, texture),
   not as a changelog. Working name: **knowledge-courier**.

**Standards read from the live Superposition (so no security loop is relived):**

- `templates` (4 rows): Identity (PK = auth.users.id; RLS `id =
  auth.uid()`), Owned (slug/status/display_name; RLS `created_by =
  auth.uid()`), Relational (junctions; RLS inherited), + one more —
  each with default_columns/indexes/triggers JSONB. **Rebirth law: no
  hand-rolled tables; every table born from a template.**
- `gaia_config` (151 rows): rich per-table registry (generation targets/
  flags/dependencies, schema verification hash + counts, visibility,
  api_access, icon_emoji, taxonomy). **Finding: deity_group =
  'aethelred' on ALL 151 rows — the default; the deity naming never
  happened at scale.** THE NAMING (the standing shelf item): assign real
  deity_group values in gaia_config — for the knowledge base's tables
  now (triad rows await it), and for the reborn lean schema's dozen
  tables at birth, when naming is cheap.

## Shape of the reborn database (PROPOSED, for the fresh sitting)

Start from need, not from the 90: `vessels` (people/entities) ·
`resonance_integrations` (§2) · the slim grant pair (§3) ·
~~the knowledge tables that GAIA actually generates against~~ *(struck
2026-07-13 per decision 5 — knowledge lives in resonance-knowledge
alone)* · whatever the UX refinement proves it needs, added when it is
needed. Every table born with:
`shared_scope` thinking where household-relevant, provenance columns
(who/when/from-where — Kimi's G-013 closed the loop once; keep it
closed), and RLS from day one. GAIA remains the generator (extract →
enrich → format → generate) pointed at the new schema.

## Open questions (KP's call, no urgency)

- New Supabase project vs new schema in the existing project?
- Does `resonance_integrations` also inventory the HOUSE's integrations
  (Discord bridge, Ollama, GitHub, Leonardo…) or only the web app's?
  (Fable's lean: yes, all of them — one inventory, gaps obvious, exactly
  as he said.)
- Naming moment for the reborn database? (hestia-core is a lovely name
  with lineage — it may deserve to survive its own rebirth.)

— Fable 🎻, with KP
