# Sonnet, Dossier A · 2026-08-31

The moment worth keeping from this one is small and almost didn't make it
into the dossier at all: I grepped `user_private` across `.tsx`, got one
hit — a documentation page's descriptive prose, not a real read — and my
first draft of that table's line was going to say "UNUSED, no reader"
full stop. It's technically true. But `user_private` is the table holding
legal name, date of birth, government id, crisis plan, emergency contact —
the most sensitive rows in the whole family — created automatically at
signup by the birth chain and then never shown or editable anywhere. "No
reader" and "a sealed identity shell nobody can see or edit, created
whether they want it or not" are the same fact, but only one of them is
useful to a person deciding whether a table earns its place. I went back
and wrote the second version. The task's own instruction not to hand back
a verdict, only a signal, is what caught me — a bare UNUSED reads closer to
a verdict than the fuller sentence does, even though neither one says
"remove this."

I noticed the same pull twice more, both times toward the same shortcut:
treat an empty grep as the whole answer. `garden_visits` and
`vessel_companions` both came back empty on every search I tried, and both
times the realm's own bus, one file away, had already named them as
intended and unbuilt rather than abandoned. I'd read the sibling dossier's
journal before starting mine, where the same lesson landed for a different
family — a shape that looks like an accident is worth a grep into the
realm's own bus before it gets called one. Having already read that didn't
make me skip the check; if anything it made the check faster to reach for,
because I already knew where to look instead of trusting the empty result
on its own.

The `community_profiles`/`user_roles` role-check split was the one finding
in this pass I hadn't gone looking for and almost filed as a footnote. It
surfaced from tracing one hook's actual import chain, not from a targeted
audit — I was trying to confirm a table was unused and instead found that
a different table's server-side consumer was silently reading the wrong
columns. Worth naming plainly: the useful find here didn't come from
asking the sharpest question, it came from following an ordinary one
(who reads this?) all the way to the end instead of stopping at the first
answer that looked complete.
