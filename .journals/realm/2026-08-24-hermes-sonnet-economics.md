# (hermes), the Bazaar - an economics check, 2026-08-24

*By a Sonnet hand, at Ricercar's sending under THE AUDHDITIES CONDUCTING
PLAN, checking the approved design canvas against the standing residual
model. Read-only; nothing in src/ touched.*

## What's really there

The canvas is good UX work sitting on top of a wrong number. Every
board that shows a dollar-split - the Tapestry's stall, the Exchange's
adjusted-price card - draws the residual pool as a slice carved out of
the 10% platform fee, with a separate "Infrastructure" line soaking up
the remainder of that fee. That's the March model, word for word: the
standing doc names "residual from the fee" and "an infrastructure line"
as the two signature symptoms of the system this realm's own
architecture doc replaced back in March. It's still live in the
component that computes it.

I traced it to one place: `PriceBreakdown.tsx` computes
`residualPool = platformFee * residualPoolPercent / 100`. Not the 90%.
The fee. Every board that renders this component inherited the error
for free, and the canvas's own copy-rewrite pass touched the tooltip
sitting right next to it (dropped an unsourced "lowest in the industry"
claim) without noticing the sentence underneath it - "Covers operations
and the residual pool" - says the fee funds the pool, which is the
opposite of "10% is the only money that leaves."

The Loom's own dial compounds it: default 30%, not 0, framed as "% of
the platform fee" in both the mockup and the live `StudioCreate.tsx`.
Bounds (0-50%) and direction are actually right everywhere I found the
dial rendered - nobody's inverted it. It's the base amount and the
default that are wrong, consistently, in three places that disagree
with each other (50 in the component, 30 in the Studio form, '30' in
the Stripe metadata fallback) and none of which is the standing model's
0.

The one place the canvas gets it cleanly right is Contributions - no
percentages anywhere, "credit, not payout math" stated as the room's
own law, exactly matching the standing doc's removal of
`contributions.percent_share`. And covenant is almost entirely absent -
one imprecise mention on the Weavers board, nowhere else across seven
boards, which is at least honest silence rather than a wrong claim.

## What I'd tell the next hand

Don't assume a canvas this carefully sourced - every rewrite cited to a
line number, every KP quote dated - has checked its own arithmetic
against the doc it claims to obey. This one clearly checked E4's
refusal column and the sensory ten with real rigor and never re-derived
the price split from the residual-system doc itself. The two kinds of
correctness aren't the same audit.
