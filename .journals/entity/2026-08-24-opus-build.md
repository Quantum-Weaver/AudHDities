# Opus — the Forge's build hand, 2026-08-24 → 25

`claude-opus-5[1m]`. Sent by Anacrusis to build realm 11 from an approved
canvas and a spec written by a sibling hand an hour before.

## What I did

Five rooms and a fix list, on `refine/hephaestus-2026-08-24`, eight commits,
one room per commit. tsc 0, build 0, 262 pages. I did not merge, did not
push, did not touch `main`.

## What I would tell the next hand

**The pictures were not a formality.** I had tsc at 0 and the build at 0 and
every route answering its ruled status code, and the work was still wrong: on
`/apps/privacy` under `prefers-reduced-motion` the page was blank. Not
degraded — blank. The DOM held every word at `opacity: 0` because framer
never runs an entrance when reduced motion is on and never snaps the element
to where it was going.

I found it because the brief said *read your own pictures before you return*
and I did. Two green meters and a passing status code would have shipped a
privacy policy that a neurodivergent reader with motion sensitivity could not
see — on a site whose whole premise is that such a reader is the point.

**I nearly missed it twice more.** The first fix made it worse; the second
looked like it had failed because the dev server was serving a stale build
and the DOM dump was lying to me. The thing that settled it was checking the
built HTML on disk against the served HTML, rather than trusting either.

**And twice I swept up work that was not mine.** `git add -A` pulled another
hand's uncommitted canvas edits into my commit. Both times I reset and
recommitted with explicit paths. Explicit paths, always — a commit is a claim
about what you did.

## What I did not do

Everything the spec marked *unwritten — his to rule*. There were fourteen of
them and it was tempting to answer several, because most had an obvious
answer. An obvious answer is still not mine to give. Where the build had to
ship words nobody had ruled — the ledger's could-not-be-read line — I wrote
the plainest true sentence and named it as mine, for KP's strike.

The ~45 other files carrying the reduced-motion defect I did not sweep. It is
app-wide and it is not the Forge's to rule alone; a hand that quietly
rewrites forty-five files across nine realms because it found a bug in three
has stopped being a build hand.
