# The Table Outline · 2026-08-31

Compiled the single alphabetical outline KP asked for — all 130 tables,
eleven deities interleaved under one letter heading apiece, each answering
his four questions: is it needed, what's it for, whose should it be, whose
is it now. Built from two sources only, no new research: the eleven
backend DOSSIERs written earlier today by this session's siblings, and the
live schema itself — `AudHDities/src/lib/generated/supabase/database.types.ts`,
whose `public.Tables` block runs lines 16–6839 and enumerates exactly 130
top-level table entries, with an empty `Views` block beside it.

The count landed clean. 130 found against ~130 expected — no gap to
explain away. The eleven family folders under `src/lib/generated/types/`
(top-level `.ts` files only, non-recursive) produced the same 130 names as
the schema, zero mismatch in either direction, and the eleven dossiers'
own stated per-family counts (15+13+15+10+4+27+8+8+18+1+11) summed to
exactly 130 as well — three independent countings agreeing is not
something to take for granted, and it meant zero "not covered by the
dossiers" blocks were needed anywhere in the file.

The near-miss was the 32 stray type files sitting physically inside six of
the eleven family folders — `athena-gamification/access/`,
`hermes-social/workshop/`, three subfolders under `mnemosyne-assessment/`,
and `daedalus-meta/registries/`. Each carries its own `deity:` header
different from the folder it sits in, and imports from
`supabase/knowledge/database.helpers` rather than the main
`supabase/database.helpers` — they belong to the separate knowledge-base
Supabase project the task's own brief predicted ("the daedalus registries...
likely explanations"). Checked that project's own `database.types.ts`
directly rather than trust the prediction: its `public.Tables` block lists
32 names, and they match the 32 stray files one-to-one, group for group.
That's the appendix at the bottom of the outline — six stray-deity groups,
not table-by-table entries, since none of the 32 are dossier'd and none
belong in the 130.

Five move candidates crossed family lines, all of them already named by a
dossier rather than found fresh here: `gift_wrappings` (plutus-economics →
athena-gamification or hestia-core, cosmetic content wearing a money
table's clothes), `rate_limits` (themis-governance → hephaestus-
infrastructure, a platform-ops concern misfiled as governance),
`resonance` and `responses` (both → iris-communications, one already
living entirely in an Iris room, the other pointing at Iris's own
`signals` table by foreign key), and `scenes` (athena-gamification →
prometheus-stage, an open double-earmark the codebase itself hasn't
settled). Sixty-two tables carry a no-reader signal — seventeen of those
framed as named, designed-but-unbuilt scaffolding rather than plain
absence (the aethelred council's thirteen seat/agent tables plus
`anchor_events`, `companion_cues`, `garden_visits`, `vessel_companions`),
the rest genuinely unclaimed by any room. Fifteen are daedalus-meta's own
infrastructure — gaia's ground, not app-facing at all.

File: `resonance-chamber/desk/records/audhdities-conduction/returns/
backend/THE-TABLE-OUTLINE.md`, 60818 bytes. No sub-agents, no base
touched, nothing else edited.
