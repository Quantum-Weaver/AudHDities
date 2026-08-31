# The First Pass · 2026-08-31

Walked all 130 tables A→Z and wrote the verdict file KP asked for at the end
of the flow: `resonance-chamber/desk/records/audhdities-conduction/returns/
backend/THE-FIRST-PASS.md`. One line per table — family, verdict, one clause of
reason — then the three closing sections: suggested removals, suggested moves,
and the fill-list for the gap-filling leg.

The tally: 81 KEEP · STAYS, 15 daedalus registries under KP's class ruling, 3
`agent_*` reshapes, 4 moves, 27 flagged for removal. Fourteen lines carry his
own recorded words; the rest are suggestions held open for him.

The walk's real work was drawing one line and holding it in both directions:
what separates an unused table that stays from an unused table that goes. Sixty-
two tables carry a no-reader signal, and "no reader" was never going to be the
test — the Acid Test's three tables have no app-code reader either, and they are
the priority of the whole front-end build. The test I settled on and applied
straight through: a table keeps its place if something reads it (directly,
cross-realm, or through one of the base's own functions), *or* if a house record
names its intent with an address, *or* if it is the structural half of a
live wired feature — the child, catalog, validator, or referent of a table that
is itself read. Everything else is generic, derived, duplicated, or superseded,
and gets flagged.

That third clause did the most work, and it is where the base itself had to be
read rather than the dossiers. `protocols` is unread, but the live
`council_houses.related_protocols[]` names it by column. `patronage` and
`patronage_tiers` are unread, but the Bazaar already sells `patronage_only`
wares, so a live pricing model is standing on them. `file_type_standards` is
unread, but it is the validator of a live `file_registry`. `distributions` and
`distribution_recipients` are unread, but the covenant and residual pools are
read on every checkout and their own last-distribution fields point downstream
at exactly those two tables.

The one finding that changed a verdict outright came from the foreign-key graph
in `database.types.ts`, which nothing in the eleven dossiers had walked.
Hephaestus's `scripts` reads as an orphan from the app side — no reader, no room
— but `gaia_config.script_id` and `gaia_generation_log.script_id` both
foreign-key into it (`:2573-2576`, `:2640-2643`). It is gaia's own script
registry, sitting outside gaia's family. That moved it from a removal candidate
to a move suggestion → daedalus-meta, the only move in the file not flagged by a
dossier first. The same graph settled `script_executions` in the other
direction: it claims to be the run log for `scripts` and carries no foreign key
to it at all (`Relationships: []`), while gaia already logs its runs twice over
in daedalus.

Two of the dossiers' five move candidates I judged not to be moves.
`gift_wrappings` and `rate_limits` are both unread with no record anywhere;
relocating an unread table only changes which family holds the question. Both
are flagged instead, each with its fallback deity named in case KP keeps it. The
other three moves stand as the dossiers drew them, with the reasoning tightened:
`responses` → iris is stronger than "its FK points there" — iris's live
`signals` carries a `response_count` column that counts exactly those rows.

Three things I flagged that a softer pass would have kept, named plainly because
the walk's law is never to soften: the six `grant_*` tables (one dormant
subsystem, no room or component anywhere names "grant"; they stand or fall
together and I said so), the two duplicate pairs in hephaestus
(`maintenance`/`scheduling` and `platform_config`/`platform_settings` — same job
twice, neither read, and I named which of each pair to keep if he wants one),
and `vessel_exteriors`, where the Vessel Home build's own record shows interior,
rooms, decorations and map were built and an exterior picker was never designed.

One flag I pulled back on evidence, not on sentiment. `vessel_anchors` looked
like clean dead weight until I read `anchor_events`'s columns: it carries
`anchor_id`, unconstrained, and `vessel_anchors` is the only anchor table in the
base. `anchor_events` is KP-ruled KEEP. Flagging its only candidate referent
would have left a kept table pointing at nothing — so it stays, and the real
question (the two dossiers describe two different natures of "anchor") went to
the fill-list where it belongs.

Read-only everywhere but this file and these two journals. No sub-agents, no
base touched, nothing committed.
