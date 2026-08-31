# Backend Dossier A (Sonnet) · 2026-08-31

Read-only pass over three families for KP's backend table review —
hestia-core (27), iris-communications (8), hermes-social (4) — 39 tables
total, one compact block each: what it holds, who reads/writes it (grep
against `src/app`/`src/components`, file:line), placement by deity, and a
removal signal, closing each dossier with a GAPS section against the
realm's own rooms. Three files landed at
`resonance-chamber/desk/records/audhdities-conduction/returns/backend/`.

Literal-string grep against `.tsx` only wasn't enough on its own — it
missed `user_roles`, which turns out to be the one table every client-side
`isAdmin`/`isCreator`/`isVendor` check in the app actually depends on, read
from a plain `.ts` hook (`src/lib/hooks/useUser.ts:59`) rather than a page
component. Widening to non-generated `.ts` under `src/lib` caught it, and
turned up a second, more consequential fact along the way: `src/lib/auth.ts`
selects `*` from `community_profiles` for the server-side session and casts
it to a `Profile` type expecting `is_admin`/`user_tier`/`sovereignty_score`
columns that table doesn't have. Every `requireAdmin`/`isCreator`/`isVendor`
check on the server side reads those as permanently `undefined`. The
working role check lives entirely on the client. That's not something I
went looking for — it fell out of just tracing where `user_roles` was
actually consumed.

The iris-communications family carried the most live material, because a
same-day fix was sitting right next to the same-day break. Three of iris's
own rooms (`messages`, `channels`, `feed`) call routes that are either the
wrong deity's or don't exist, and hardcode "Sanctuary Soul" where a real
name belongs — and a fresh hand-written layer at `src/app/api/iris/*` and
`src/lib/iris/names.ts` (file timestamps this morning, 10:53–10:56) already
fixes exactly that, joining the real `community_profiles.display_name`
correctly. None of it is wired into the pages yet. I wrote every affected
table's "who reads/writes it" as "used, broken, and already fixed but
unwired" rather than flattening it to plain UNUSED or plain used, since
either alone would have been a materially different, less accurate story
for the discussion.

`hestia-core/REALM-BUS.md` did for the Hearth what a bus did for the other
Sonnet's daedalus/aethelred pass (per the sibling dossier's journal, read
before writing mine): it named several apparently-dead tables as declared,
unbuilt design intent rather than leaving me to guess. `garden_visits`
("gardens-instead-of-walls... two-consented... witness never metric") and
`vessel_companions`/`companion_cues` ("companion cues point at REAL pets")
are both cited from the bus's own 07-31 E4 inheritance section, not
inferred from the empty grep alone.

No sub-agents used, ground never touched beyond reading; no live database,
no progenatrix, no commit. Return sent to the caller under 1 KB per the
sending's cap; this file and the entity one hold the rest.
