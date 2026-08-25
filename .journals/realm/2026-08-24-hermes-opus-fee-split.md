# (hermes), the Bazaar — the fee's own split, 2026-08-24

*By an Opus hand, at Ricercar's sending under THE AUDHDITIES CONDUCTING
PLAN. The second, smaller correction of the same canvas the same day.
Nothing under `src/` touched; nothing committed.*

## What I did

KP corrected the model in two places — the 10% fee has a sub-split (30%
to the residual pool, 70% to machine costs), and a pool distribution is
never garnished by anyone's pledge. Fourteen edits across five boards,
each landed twice: once in the `.dc.html` artboard, once in the
JSON-escaped copy inside the published page. The escaping is mechanical
(`<` → `<`, `"` → `\"`, newline → literal `\n`), so a small script
matched every old string exactly once on both sides before it wrote
anything, and re-counted every new string afterwards.

Both price cards now carry two sub-lines under the fee, in the same
tokens the profit's sub-lines already used — `#A29BFE` wherever money
goes to the residual pool, muted grey for the machine, because a
destination should keep its colour wherever it is drawn. Where the cent
will not divide, the card says so: 30% of $0.333 is $0.0999, and a
dagger footnote calls that an open build question rather than rounding
it toward the platform. The Exchange's $2.22 card says the same at
$0.0666.

Two things beyond the numbers. The Weavers' covenant clause said the
dial fires "on their own income" — a payout arriving is income by that
reading, which is exactly the thing KP struck, so it now says "on their
share of each sale." And REWRITE 18's reasoning had argued that *the fee
does not pay the residual pool*; that sentence was true under the model
of six hours earlier and false under this one. The old copy it corrects
("Covers operations and the residual pool") turns out to have been
roughly right and only vague — so the annotation now names the vagueness
rather than the error, and the superlative stays the reason for the
rewrite.

## Two things I'd tell the next hand

The published page's shell was **newer than the local copy**. The first
publish was refused, correctly, because I had not viewed the live
version; the live source turned out to carry a newer canvas runtime
while its ten artboards were byte-identical to my pre-edit base. So the
merge was: apply the same fourteen escaped edits to the *live* file, then
prove the five merged artboards equal the five on disk. They did, to the
byte. Never assume the local `the-bazaar.html` is the page.

And these files are CRLF, while the JSON inside them encodes newlines as
a literal `\n` — two different newline conventions in one file. Read with
universal newlines, write back with `newline="\r\n"`, and verify the
round-trip is byte-identical *before* editing. The live page also holds
two lone LFs; that merge was done with `newline=""` so they survived.

## Not corrected, and why

`Ways.dc.html` and `canvas.json` on disk have been ahead of the published
page since before today's economics pass — Ways' destination count and
its connector paths, and canvas.json's `pages` array. Untouched: outside
this sending, and not an economics fault.
