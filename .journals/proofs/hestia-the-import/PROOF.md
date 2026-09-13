# PROOF — the import surface

One proof, run from the repo root. Every row is a fixture: nothing here reaches
a base or the network.

| file | proves | run |
|---|---|---|
| `prove-import.ts` | the mirrored seal and open, the envelope's face, the three readers' pure mapping, the merge key, the register | `npx tsx .journals/proofs/hestia-the-import/prove-import.ts` |
| `results.json` | the last run's checks | |

## the fixtures

- **a bubbles export**, sealed by `src/lib/envelope`: three echoes (one with no
  name), a folksonomy of two, and the sky's save with four collected slugs (one
  blank, one at zero), two found collections and the four sky counters.
- **an echoes export**: two echoes, one with a timestamp that is not a stamp,
  and a folksonomy of one.
- **a lantern export**: three sessions (one with a reference and a note, one
  with neither, one with no start date) and one reference image.

## the checks

| set | check |
|---|---|
| seal | the family marker, the version, the app name, the counts on the outside |
| open | the right app reads its own envelope |
| open | another app is refused in the family's own sentence |
| open | a file that is not the family envelope is refused |
| face | the app and the counts are readable before anything lands |
| face | a bare array shows no face |
| bubbles | one row per popped bubble; a zero-pop and a blank slug are dropped |
| bubbles | the pop count rides with the row |
| bubbles | one row per found collection |
| bubbles | the echoes become journal rows with the app as a tag and the echo's date |
| bubbles | the collected date is the envelope's own stamp |
| bubbles | the rows it would land are counted: 2 vessel_bubbles, 2 vessel_collections, 2 journal_entries |
| bubbles | the folksonomy, the found date, the unreadable echo and the sky counters are told, not landed |
| echoes | an echo lands with a name and a stamp, and not without |
| lantern | a session lands with a date and words, and not without |
| lantern | the reference shelf, the duration, the capture and the outline are told, not landed |
| merge | the same file plans the same journal key; two echoes plan two keys |
| register | bubbles, echoes and lantern are read; compass is named; an unknown app is named plainly |

## the last run

36 of 36.
