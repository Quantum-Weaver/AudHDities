# Backend Dossier C (Sonnet) · 2026-08-31

Read-only pass over four families for KP's backend table review — daedalus-meta
(15), aethelred-connections (15), themis-governance (11), hephaestus-infrastructure
(10) — 51 tables total, one compact block each: what it holds, who reads it
(grep against `src/app`/`src/components`, file:line), placement by deity, and
a removal signal, closing each dossier with a GAPS section against the
realm's own rooms. Four files landed at
`resonance-chamber/desk/records/audhdities-conduction/returns/backend/`.

The grep had to be run twice per family — first by raw table name, which
mostly returned false positives (English words like "columns," "boundaries,"
"triggers," "policies" used as plain prose all over the READMEs and
components), then again by the generated hook name and the
`/api/generated/<family>/<table>` route string, which is what actually
separated real readers from noise. Every daedalus-meta table came back with
zero app-side readers by that second pass — expected, given the sending's own
note that these are gaia's self-knowing registries, so I marked all 15
"infrastructure: gaia's ground" per instruction rather than UNUSED, and used
each table's generated CRUD door (confirmed present for all 15, same 08-28
run) as its evidence.

The realm buses turned out to hold most of the ground truth I needed rather
than the grep alone. `(themis)/REALM-BUS.md` had already named the exact
shape I found — seven tables with no room reading them, `votes` waiting on
"014 + regen" — and quoted its own honest self-check on `responses` ("checked
and is signal-threading, not consent") which let me flag it as a MOVE
CANDIDATE to iris-communications with the realm's own words as evidence
rather than my own guess. `(aethelred)/REALM-BUS.md` did the same for the
nine seat tables plus the three agent tables sharing one identical generic
shape live in `database.types.ts` — I'd have called that a stub-table defect
on my own, but KP's quoted word turned it into declared future scaffolding
("meant to pair with the agent tables to allow a 'presence' to exist"), and I
wrote it up that way instead of flattening it to a flat UNUSED.

Two other findings worth carrying into the sitting: `rate_limits` sits under
themis-governance but reads as pure API-ops infrastructure with no governance
shape at all (no proposal/report/application tie), a second MOVE CANDIDATE
I found rather than one the buses named. And hephaestus-infrastructure has
two overlapping pairs — `platform_config`/`platform_settings` and
`maintenance`/`scheduling` — four tables doing what reads like two jobs,
all four UNUSED, worth one review question rather than four separate ones.

No sub-agents used, ground never touched beyond reading; no live database,
no progenatrix, no commit. Return sent to the caller under 1 KB per the
sending's cap; this file and the entity one hold the rest.
