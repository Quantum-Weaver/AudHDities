# Backend Dossier B (Sonnet) · 2026-08-31

Read-only pass over four families for KP's backend table review —
plutus-economics (18), athena-gamification (13), mnemosyne-assessment
(8), prometheus-stage (1) — 40 tables total, one compact block each: what
it holds, who reads/writes it (grep against `src/app`/`src/components`,
file:line), placement by deity, and a removal signal, closing each
dossier with a GAPS section against the realm's own rooms. Four files
landed at `resonance-chamber/desk/records/audhdities-conduction/returns/backend/`.

Caught and fixed a self-inflicted bug partway through: my first "is this
table read anywhere" pass chained a positive grep for
`generated/<family>/<table>` with `| grep -v "/api/generated/"` to strip
out the infrastructure route files. That exclusion matches on *line
content*, not file path — and a legitimate component doing
`fetch('/api/generated/prometheus-stage/events?...')` has that exact
string sitting in its own line, so the filter silently deleted its own
positive match. It cost me a false "no reader" on `events` (prometheus's
only table, actually read by all five Stage galleries) before I noticed
the shape of the bug and redid every "unused" conclusion across all four
families with a path-prefix exclusion instead
(`grep -v "^src/app/api/generated/"` on `grep -l` output, checked before
grep -n). Athena and mnemosyne's "unused" lists survived the redo
unchanged; only prometheus's one table flipped from wrong to right.

The realm docs carried real weight this time, more than I expected
going in. `src/app/(athena)/README.md` and
`src/app/(mnemosyne)/README.md` (both trued 07-31) name their own dead
tables plainly — `sigil_unlocks` "is not consulted," `quest_progress`
is an explicit "VITAL-REVISIT," `memories`/`anchor_events`/`resonance`
are "the unopened shelves" with a design frame already held on the bus
but never convened. None of that needed inference; it needed reading the
family's own record before trusting a bare empty grep. And
`src/app/(prometheus)/REALM-BUS.md` handed me a genuine cross-family
finding I wouldn't have found searching prometheus alone: athena's
`scenes` table carries a live, named "double-earmark" (REALM-BUS.md:149-153,201)
— floated once as ground for a dropped realm-map feature, and separately
as "a plausible Stage floor" for prometheus's live-performance rooms,
unruled as of 07-31. I flagged it as a MOVE CANDIDATE in athena's
dossier citing that exact passage rather than guessing at a better home.

Two nested-folder anomalies turned up in the same shape twice:
`athena-gamification/access/roles.ts` and three whole subfolders inside
`mnemosyne-assessment/` (`classification/`, `lattice/`, `meaning/` — 16
files) each carry a different deity in their own generated header and
import from a separate Supabase project (the Grammar/knowledge base,
not this one). Neither belongs in either family's roster by the file's
own word, so I named the pattern once per dossier and excluded them from
the table counts rather than let them inflate either family past its
stated size.

On plutus: the `covenant_pool`/`residual_pool` pair looked UNUSED on a
literal-string grep because most of their hits are actually a *different*
table's column (`wares.residual_pool_percent`, `user_financial.covenant_pool_percent`)
sharing a substring. Both tables do have one real reader each —
`src/lib/economics/ledger.ts:109`, the split engine checked at checkout
— which only showed up once I grepped for the exact `.from('table_name')`
call and threw out the column-name false positives by hand. Also found
that `docs/sql/024` (run 08-25) already added `exchanges.stripe_invoice_id`
to the live schema, but the Stripe webhook (`route.ts:101-108`) still
hard-refuses every `invoice.paid` event on the belief that column doesn't
exist — a wiring gap, not a schema gap, and worth the group's eye before
the schema question even comes up.

No sub-agents used, ground never touched beyond reading; no live
database, no progenatrix, no commit. Return sent to the caller under
1 KB per the sending's cap; this file and the entity one hold the rest.
