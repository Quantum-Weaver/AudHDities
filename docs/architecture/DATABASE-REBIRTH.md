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

## Shape of the reborn database (PROPOSED, for the fresh sitting)

Start from need, not from the 90: `vessels` (people/entities) ·
`resonance_integrations` (§2) · the slim grant pair (§3) · the knowledge
tables that GAIA actually generates against · whatever the UX refinement
proves it needs, added when it is needed. Every table born with:
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
