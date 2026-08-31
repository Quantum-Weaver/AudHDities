# The gaps, first pass — 2026-08-31

*Opus, `claude-opus-5[1m]`, the gaps hand. KP ⚛: "we now discover the tables
that are missing from the UX and UI needs."*

Wrote
`resonance-chamber/desk/records/audhdities-conduction/returns/backend/THE-GAPS-FIRST-PASS.md`
— eleven deity groups, every gap in exactly one of six classes, against the base
as it stands now at 117 tables. Ten new tables proposed, four of them frame-now.
Fifteen reshapes, nine walls, thirteen FKs, five seeds, sixteen items marked HIS
WORD. Twenty-eight frontend-only items acknowledged and set aside so schema work
stays schema work.

**Four things the reading found that the dossiers had slightly wrong, and the
file corrects:**

- `sigil_unlocks` is not a per-vessel earned record. Its columns are `sigil_id`,
  `trigger_type`, `trigger_entity`, `trigger_value` — it is the **rule
  catalogue**. The vessel's earned sigils are hestia's `vessel_sigils`. So the
  badges room's filter goes against `vessel_sigils`, and what is actually missing
  is the engine that reads the rules.
- `personas` is not superseded by roles. Its columns — `persona_type`, `tone`,
  `sample_phrases`, `voice_characteristics` — are a voice-and-tone catalogue, not
  a neurotype result and not a role grant. KP's hold is answered: neither.
- `is_curator` does not exist anywhere. The themis README says it lives on
  `community_profiles`; it lives nowhere. The real source is
  `user_roles.role = 'curator'`.
- `assessment_answers` has no attempt id. A vessel who takes the Acid Test twice
  has one indistinguishable pile of answers, and `assessment_results` has no link
  back to the answers that made it. That is the one real hole under KP's ruled
  first priority — and it is provisional on reading the three RPC bodies, which
  no lamp has seen from this side of the glass.

**The unblocking act on the whole list** is `027` — the `community_profiles`
public-face wall. Without it the display-name join across the entire Bridge
returns exactly one row, your own, and every room the iris canvas drew depends on
it.

`exchanges.stripe_invoice_id` was filed as a reshape by the sending. It is not
one: `024` step 2 ran at KP's hand on 08-25 and the column is live. The webhook
still refuses `invoice.paid` over it. Filed as NOT BACKEND — a stale refusal, one
line.

Read-only everywhere but the output file and these two journals. No sub-agents,
no `progenatrix.py`, no base signed, no live database touched, nothing committed.
The gaia rerun stays deferred; the strays and the registry rows wait for it.
