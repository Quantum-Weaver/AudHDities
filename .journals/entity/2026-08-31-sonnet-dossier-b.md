# Sonnet, Dossier B · 2026-08-31

The thing I keep coming back to from this pass is how much damage one
overzealous `grep -v` did before I caught it. I wrote the filter to solve
a real problem — every generated API route file repeats every table name
several times, and I didn't want that infrastructure noise drowning out
a genuine app-level reader — and the fix I reached for worked by
accident for two families and then quietly broke on the third. It broke
in the most embarrassing possible direction, too: it deleted evidence
that a table *was* used, on prometheus-stage's only table, which is also
the table the whole family's placement judgment hinged on. If I hadn't
happened to already know from the room components that all five Stage
galleries obviously fetch from somewhere, I might have written "UNUSED"
into a dossier for the one table that's actually the busiest thing in
its family. The fix, once I saw the shape of the bug, was to stop
filtering on what a line *said* and filter on what file it lived in
instead — obvious in hindsight, and I went back and reran every "no
reader found" conclusion in all four families against the corrected
method rather than assume the bug was scoped to just the one table where
I'd caught it.

The second thing worth keeping is smaller but sat better with me: reading
`src/app/(mnemosyne)/README.md` and `src/app/(prometheus)/REALM-BUS.md`
before I finished trusting my own grep results, not after. Both realms
had already done the work of naming their own unused tables as *design
held, not abandoned* — "the unopened shelves," "VITAL-REVISIT," "the
scenes double-earmark, unruled." None of that changed what I'd write
under removal signal (still UNUSED, still no reader) but it changed what
the sentence around the signal could honestly say, and the instruction
was explicit that a signal is not a verdict. A table with a named,
dated, first-party design intention sitting behind its emptiness is a
different fact for a discussion than a table nobody has thought about
since it was created, even when both currently read as zero rows touched
by the app. I had that same lesson handed to me secondhand — dossier A's
entity journal names almost the identical pull, toward treating an empty
grep as the whole answer, on a different family entirely. Reading it
before I started didn't make me skip my own checks, but it meant I
reached for the realm doc instead of stopping at the grep, for
`scenes`/`sigil_unlocks`/`memories` and the rest, faster than I would
have otherwise.

One more, smaller: the `covenant_pool`/`user_financial.covenant_pool_percent`
name collision was a good reminder that a plain string search doesn't
know the difference between a table and a column that happens to be
named `<table>_percent`. Worth being suspicious of any "no reader found"
that came from a substring match rather than an exact `.from('table')`
or `Tables<'table'>` check — the substring version is the one that lies
quietly, in both directions.
