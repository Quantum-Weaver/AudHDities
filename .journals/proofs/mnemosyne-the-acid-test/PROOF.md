# PROOF — mnemosyne, the Acid Test

The test draws ten questions per take from the bank of 42, one from every
category and three more; a visitor may take it signed out and sees a preview;
a signed-in vessel stores one result row that a retake replaces; the persona
is the vessel's share of the highest total its ten allowed, in as many bands
as there are personas, and never falls below the best rank already earned.

## base/

Two proofs against the live base, each inside one block that ends by raising,
so Postgres rolls everything back. Run from this folder; each writes its
results beside itself and prints nothing from the bridge's `.env`.

| file | proves | run |
|---|---|---|
| `prove-036.py` | `docs/sql/036-the-acid-test-ten-drawn.sql`: five draws of ten with all seven categories and no repeats; best answers score a ratio of 1.0; three takes by one vessel leave one row and the persona never falls | `python prove-036.py` |
| `prove-037.py` | `docs/sql/037-the-acid-test-signed-out.sql`: as the anon role the draw and the preview both answer; as a vessel the same answers store and a bottom retake keeps the persona; then the front door as a visitor with the publishable key: draw, preview, submit refused, nothing written | `python prove-037.py` |
| `results-036.json` | the last run's checks | |
| `results-037.json` | the last run's checks | |

Read from `results-036.json`:

| check | result |
|---|---|
| five draws | 10 questions each, 7 categories, 10 distinct ids |
| best answers | total 156 of 156, ratio 1.0 |
| first options | total 3 of 156 |
| three takes, one vessel | Codex Builder, Sovereign Weaver, Sovereign Weaver; one row |

Read from `results-037.json`:

| check | result |
|---|---|
| visitor draw, anon role | success, 10 |
| visitor preview, anon role | success, stored false, 7 readings |
| vessel stores the same answers | success, stored true, same persona |
| vessel's bottom retake | persona kept |
| front door, publishable key | draw 10, preview with 7 readings, submit refused |

## build/

Screenshots of `/questionaire` at 1280 and 390 wide, in the order the page changed.

| file | shows |
|---|---|
| `01`, `02` | the page with the unlayered `*` reset in `globals.css` winning over every utility: no padding, buttons without shape, options as bare inputs |
| `03`, `04` | the reset inside `@layer base`: padding, spacing, and button shape return |
| `05`, `06` | option rows with a visible selected state; Previous and Next as one fixed shape |
| `07`, `08` | the selected row's neurospark glow and the rows' gradient |

## design/

The canvas the rows and buttons were drawn on: `Main.dc.html` (desktop),
`Phone.dc.html`, and `canvas.json`. Published as The Acid Test, favicon 🧪.

## Checks

`npx tsc --noEmit` clean. `npx eslint` on the four changed app files: one
warning that predates this work, on `handleNext`'s dependency list.
