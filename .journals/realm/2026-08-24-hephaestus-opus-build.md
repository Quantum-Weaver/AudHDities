# The Forge, second movement — the build

**Realm 11 (hephaestus) · step B of THE AUDHDITIES CONDUCTING PLAN.**
Opus, `claude-opus-5[1m]`, sent by Anacrusis. Branch
`refine/hephaestus-2026-08-24` from `main` (`a3fe26a39`). Not merged, not
pushed — KP merges.

Opened at KP's ⚛ word, 2026-08-24, verbatim: *"we can build hepaestus fixes
if they are not live yet. the boards look good."* and, the same sitting:
*"we are fixing the actual pages now, right, not just still circling
updating artifacts?"*

Ground: `.journals/proofs/11-hephaestus/` — `PROOF.md`, `SPEC.md` (34 KB,
52 printed checks), five artboards, four refusals.

## What was built

**② The four-item nav.** The bar is now Vessel · Bazaar · Playground ·
Sanctuary, and the map keeps everything that left. The four hrefs are READ
from `the-street.ts` at module scope — no route literal survives in
`Navigation.tsx` except the shared auth door — so the bar and the map can no
longer drift, which is the whole reason the street file was extracted in the
first place. A lookup that finds nothing throws while the build prerenders.
The drawer gained the "The four" strip; `aria-current="page"`, a hearth-gold
focus ring and 44px rows came with it. `/` went into the street's Hearth
rooms, being the one retired item that landed nowhere.

**③ `/press`.** One honest card and the form that works. The card's sentence
is stitched from the four honest empty lines the copy half wrote the same
morning — nothing invented. The kit / media / coverage / logo components sit
on disk annotated, imported by nothing.

**④ `/council/ledger`.** The entries themselves, one line each. The three
stat cards left because they summed a 50-row page and called it a total. The
sort was right by accident and is now right on purpose.

**⑤ `/donate` retired** across five files, together. No redirect was
invented, because the canvas drew none.

**① `/apps/privacy`.** Eight apps named, each only with what its own repo
verifies. `resonance-weaver` is absent and waits on KP.

**The words.** Two route renames with `git mv`, both old paths 308ing to the
new; 55 lines of copy swept. What was left alone is named in the commit and
in the files themselves.

## What the proof walk found

The pictures earned their place. Under `prefers-reduced-motion` the legal
rooms rendered as an **empty page** — every framer element that fades in from
`opacity: 0` stayed at its initial state, because the entrance never runs and
framer does not snap the element to its target. `/privacy` and `/terms` had
been doing this before this pass touched anything.

A reader who asked for less motion lost the document. The three components
this pass owns are fixed. **About forty-five other files under `src/` carry
the same shape** — named for the chassis, not swept here.

## The door

`ledger` reads 200 · `[]` · exact count 0 at the anon door, while the control
(`bubbles`) reads 206 with a real count — so grants are live and this is not
a permissions error. No SELECT policy for `ledger` exists in `docs/sql/*`.
The base's own row count could not be read this sitting. Empty and walled are
therefore indistinguishable, so the page says the true thing — *not yet
readable from this room* — and never *no entries*.
`docs/sql/023-the-ledger-door-DRAFT.sql` asks the question for KP's hand and
answers none of it.

## Meters

`npm run type-check` exit **0** · `npm run build` exit **0** · **262 pages**.
Thirteen pictures at `.journals/proofs/11-hephaestus/build/`, read before
this was written.

## What waits on KP

Every line SPEC.md marked *unwritten — his to rule* stayed unbuilt: `/`'s
desktop bar item · what `/enter` is · whether the footer grows · whose eye
the ledger is for · the four nav glyphs · the ledger's failure-line wording
(this build's own words, named for his strike) · whether `/donate` gets a
redirect anyway · whether `weaver` is listed · the apps' effective date ·
`effects.ts:50,89` · a light theme · the four retired press subtitles · the
six brand colours' return · the "support without buying" door.
