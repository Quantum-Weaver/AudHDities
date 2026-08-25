# Re-grading two economics truth tables against the second-pass model - 2026-08-24

*By a Sonnet hand, at Ricercar's sending under THE AUDHDITIES CONDUCTING
PLAN. Read-only. Nothing under `src/` touched; nothing committed.*

## What I did

Two earlier hands graded every money claim in the Forge (46 rows) and the
Bazaar (21 rows) against the standing model before KP corrected it twice
today: the fee's own 30%/70% sub-split is real and fixed, not invented,
and a pool payout is never garnished by anyone's pledge. I re-read the
corrected doc whole, then re-read every graded row at its own file:line -
not the old row's paraphrase - and wrote both as v2 files beside the
originals, each row carrying both verdicts and a reason where they
differ.

The hephaestus table barely moved: one clean flip (a "Complete
Circulation" diagram whose fixed 70/30 fee split was wrongly called
fabricated before the correction), three rows where one line inside an
otherwise-still-wrong claim now reads true, and twenty-one relabels
(inverted → fee-as-dial) with no truth change. The hermes table moved a
great deal more, and for a reason the task didn't predict: five of the
six Bazaar canvas files had already been rewritten by another hand today
- committed at `de6940e24`, with further uncommitted edits live in the
working tree at the moment I read them. Nine rows flipped true there;
six of those nine flipped because the file itself changed, not because I
read the same words differently. `git log`/`git status` confirmed this
before I trusted it.

## What's true now

Both v2 files stand at their addresses beside the v1s. The live TSX
components behind the Bazaar canvas (`PriceBreakdown.tsx`,
`StudioCreate.tsx`, checkout's route) have not caught up to what the
mockups now show - the design is ahead of the code it describes, and I
said so plainly rather than letting the table imply otherwise.
