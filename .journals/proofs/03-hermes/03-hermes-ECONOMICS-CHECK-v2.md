# 03-hermes — Economics Check — v2

Read-only re-check of the Bazaar's approved design canvas
(`AudHDities/.journals/proofs/03-hermes/`) against the SECOND-PASS
CORRECTED model — KP ⚛ 2026-08-24, `AudHDities/docs/architecture/residual-system.md`
("Second pass" note). Sonnet hand, Ricercar conducting. Nothing edited
outside this file.

**⚠ THE GROUND MOVED, NOT JUST THE MODEL.** Every `.dc.html` row below was
re-read at its live file:line, not trusted from the v1 paraphrase — and
five of the six canvas files (`Main.dc.html`, `Tapestry.dc.html`,
`Weavers.dc.html`, `Loom.dc.html`, `Exchange.dc.html`) have themselves
been rewritten since the v1 table was authored. `git log` shows the bulk
of that rewrite landed in commit `de6940e24` ("The economics found and
trued; the covenant display moved; the Bazaar canvas corrected; hephaestus
opened," 2026-08-24 18:43:38), and `git status` at the moment of this
re-grade shows **further uncommitted, in-progress edits on the same five
files right now** — small diffs (2–11 lines each), consistent with the
second-pass fee-split correction being hand-applied live. This table is a
snapshot; it may already be behind by the time it is read. The live TSX
components (`PriceBreakdown.tsx`, `StudioCreate.tsx`, `StudioEdit.tsx`,
`checkout/route.ts`, `CreationDetail.tsx`, `ProductCard.tsx`) carry **no**
such changes — confirmed unchanged on direct read — so the canvas mockups
now run considerably ahead of the code they describe.

**The corrected model, one line each:** platform fee 10% fixed, of which
30% returns to the residual pool and 70% funds the machine — fixed,
always, not a dial · the residual DIAL (0–50%, default 0) is the main
artisan's PLEDGE, taken from the 90% (never the fee), pays ALL artisans
platform-wide equally · what's left of the 90% divides EQUALLY among the
item's own contributors, creator among them, no per-contributor
percentage · covenant pool = each vessel's own 0–50% dial, default 0, set
in the Sanctum, a slice of THAT VESSEL'S OWN share of a SALE, pays ALL
opted-in users equally, forever · pool distributions arrive WHOLE — no
pledge is ever taken from a payout.

**New verdict vocabulary:** ✔ true · ✗ fee-as-dial · ✗ March · ✗ roster ·
✗ cap/default · ✗ garnish · ? silent. A relabel (vocabulary changed, truth
value did not) is called out as such, distinct from a flip.

## The table

| # | Address | What it says (re-read live) | Original | New | Reason if different |
|---|---|---|---|---|---|
| 1 | Main.dc.html:123 | **CHANGED.** Now: "10% funds the machine. The other 90% circulates — up to half of it pledged to the residual pool." | ✗ March | **✔ true** | **FULL FLIP — file rewritten.** The line quoted in v1 ("up to 50% of it flows to contributors forever," framed as a % of the fee) is no longer at this address. Current text matches the model exactly: fee funds the machine, the 90% carries the pledge, dial bounded at half. |
| 2 | Tapestry.dc.html:125 | "Artisan profit (90%)" "$3.00" | ✔ true | ✔ true | Unchanged in substance (label reworded from "earnings" to "profit," same fact). |
| 3 | Tapestry.dc.html:126–127 | **CHANGED.** Now: "→ Residual pool — pledged 50% $1.50" / "→ This ware's contributors $1.50" | ✗ March | **✔ true** | **FULL FLIP — file rewritten.** The v1-quoted "(30% of fee) $0.10 / Infrastructure $0.23" text is gone. Current text is the model's own worked-example shape: the pledge taken from the 90%, the remainder split with contributors. |
| 4 | Tapestry.dc.html:130 | **CHANGED.** Now: "Half this ware's profit is pledged to the residual pool, shared by every artisan; the rest divides equally among this ware's contributors" | ✗ March | **✔ true** | **FULL FLIP — file rewritten.** Precisely the corrected model's mechanism, stated in the model's own terms (pledge from profit, equal division of the remainder). |
| 5 | Weavers.dc.html:193 | **CHANGED/EXPANDED.** Now: "...the residual pledge set per ware, out of the 90% (0–50%, default 0), and the covenant set once in the Sanctum on their own income; both of KP's stand at 50%." | ? | **✔ true** | **FLIP — file rewritten.** No longer imprecise: explicitly states the pledge is out of the 90% (not the fee), gives the correct bounds AND default (0), and separates the covenant as the Sanctum-level dial. |
| 6 | Loom.dc.html:132–134 | **CHANGED.** Now: "Residual pool [optional]" / "0% — nothing pledged ▾" / "The share of this ware's profit — the 90% left after the platform fee — you pledge to the residual pool, which pays every artisan on the platform. 0 to 50%; the rest divides equally among this ware's contributors." | ✗ March | **✔ true** | **FULL FLIP — file rewritten.** Default is now 0 (was "30% — Standard"); base is explicitly the 90%, not the fee; distribution language matches the model exactly. |
| 7 | StudioCreate.tsx:44–51, 84 · StudioEdit.tsx:43–50 | `RESIDUAL_OPTIONS` 0/10/20/30/40/50, `defaultValue="30"`, label "30% — Standard" | ✗ March | ✗ cap/default | **Confirmed unchanged on direct read.** Relabel only — default should be 0, not 30; no truth change. |
| 8 | StudioCreate.tsx:249 (mirrored Loom.dc.html:134 in v1 — no longer mirrored, see row 6) | "Percentage of platform fee shared with contributors who helped create this work" | ✗ March | ✗ fee-as-dial | **Confirmed unchanged on direct read.** Relabel — dial-as-fee-share error, the live component has NOT caught up to the canvas mockup (row 6). |
| 9 | StudioCreate.tsx:325–343 "The Economics" card | Tiles "10% / 90% / 0-50%" + "The residual pool comes from your chosen percentage of the 10% platform fee — rewarding contributors forever." | ✗ March | ✗ fee-as-dial | **Confirmed unchanged on direct read.** Relabel only — states outright the residual comes from the fee, still wrong. |
| 10 | **PriceBreakdown.tsx:22, 26–29** (the computation itself) | `residualPool = platformFee * residualPoolPercent/100`; `infrastructure = platformFee - residualPool`; `creatorEarnings = subtotal - platformFee` (flat 90%) | ✗ March | ✗ fee-as-dial | **Confirmed unchanged on direct read — still the root cause.** Relabel only. `residualPoolPercent` still defaults to 50, disagreeing with StudioCreate's 30 and the checkout route's '30' — none of the three is the standing default of 0. |
| 11 | PriceBreakdown.tsx:59 (tooltip) | **UNCHANGED live**, but Exchange.dc.html's own REWRITE 18 (row 14, below) now quotes and assesses it. "10% platform fee — the lowest in the industry. Covers operations **and the residual pool**." | ✗ March ("contradicts '10% is the only money that leaves'") | **✔ true** | **FULL FLIP.** Under the corrected model this sentence is factually correct — the 10% fee *does* cover both operations (70%) and the residual pool (30%); v1's contradiction-finding relied on the pre-correction reading where the residual pool was thought to come only from the artisan's dial. The remaining defect (an unsourced "lowest in the industry" superlative, and imprecision about the 70/30 split) is a copy-quality note, not an economics error — confirmed by Exchange.dc.html's own rewrite (row 14), which corrects only the superlative and adds precision, not the underlying claim. |
| 12 | PriceBreakdown.tsx:84 (tooltip) | "Shared with contributors forever — the 'background actor dividend'" | ✗ March | ✗ roster | **Confirmed unchanged on direct read.** Relabel — still conflates the platform-wide residual pool with this item's own contributors; the fee's pool pays ALL artisans, not just this item's. |
| 13 | Exchange.dc.html adjusted-price card | **CHANGED.** Now shows both splits: "Platform fee (10%) $0.22 → 30% to the residual pool $0.07 / → 70% funds the machine $0.15" AND "Artisan profit (90%) $2.00 → Pledged 50% to the residual pool $1.00 / → This ware's contributors, equally $1.00" | ✗ March | **✔ true** | **FULL FLIP — file rewritten.** This is now a complete, correct worked example matching the model's own $100-sale shape at 90% smaller scale — fee's fixed 30/70 split shown separately from the artisan's own 50% pledge from the 90%. |
| 14 | Exchange.dc.html REWRITE 18 (→ PriceBreakdown.tsx:59) | **CHANGED.** Old quote unchanged, but the proposed NEW copy now reads: "10% platform fee. 70% of it funds the machine — the only money that leaves; 30% of it returns to the residual pool on every sale." — citing `residual-system.md`, "second pass" | ✗ March, kept | **✔ true** | **FULL FLIP — file rewritten.** v1 found the canvas's own rewrite "leaves the wrong economics claim standing"; it no longer does. The new copy is exactly the corrected model's split, cited to the second pass by name. |
| 15 | Exchange.dc.html "Two findings" panel | **CHANGED.** Now explicitly states: "The standing default is 0 — a pledge nobody has made... and none of the three live values is it." | ? (never states the true default is 0) | **✔ true** | **FLIP — file rewritten.** The gap v1 found (catches the 3-way disagreement but never names the correct default) is closed; the panel now names 0 as the standing default, sourced to `residual-system.md`, 2026-08-24. |
| 16 | checkout/route.ts:137 | `residualPoolPercent: ware.residual_pool_percent?.toString() || '30'` | ✗ March | ✗ cap/default | **Confirmed unchanged on direct read.** Relabel only — fallback should be '0'. |
| 17 | checkout/route.ts:91–93 | `netAmount = grossAmount * (1 - PLATFORM_FEE_PERCENT/100)` — flat 90/10 at the `exchanges` row | ✔ true | ✔ true | Unchanged — confirmed on direct read; still consistent with residual/covenant being a downstream disbursement, not a point-of-sale computation. |
| 18 | **Contributions.dc.html, whole board** | No amounts anywhere; "Any contribution-percentage number on the card" explicitly refused; "Credit, not payout math" | ✔ true | ✔ true | Unchanged — confirmed via direct read/grep, same refusal language still present at :165. |
| 19 | Contributions.dc.html:44, 146–147 (KP's 2026-08-01 quote, kept verbatim) | "...enable distribution of residual pool regardless of published status" | ? | ? | Unchanged — still present verbatim; pre-dates the 08-24 correction's terminology split (platform-wide "residual pool" vs. item-level "contributors divide the remainder"), and the canvas still doesn't flag the drift. Not touched by the two named corrections specifically. |
| 20 | CreationDetail.tsx:139 · ProductCard.tsx:201 | "{residual_pool_percent}% flows to the residual pool" | ? | ? | Unchanged — confirmed unchanged on direct read; still doesn't specify fee vs. 90% as the base. |
| 21 | All 7 boards, covenant mechanics | No board states the covenant dial's bounds, default, "own income wherever it lands," or the opt-in-forever rule. | ? | ? | Largely unchanged — Weavers.dc.html:193 (row 5) now states residual's bounds/default precisely and gestures at the covenant dial living in the Sanctum, but still does not state covenant's own bounds, default, or the forever-opt-in rule explicitly. Kept as silent. |

## Counts

- **✔ true: 12** (#1, 2, 3, 4, 5, 6, 11, 13, 14, 15, 17, 18) — up from 3.
- **✗ (all flavors): 6** (#7 cap/default, #8 fee-as-dial, #9 fee-as-dial,
  #10 fee-as-dial [root cause], #12 roster, #16 cap/default) — down from 13.
- **? silent: 3** (#19, #20, #21) — down from 5.
- **21 rows total.**

**Nine rows flipped to true** — seven from ✗ (#1, 3, 4, 6, 11, 13, 14) and
two from ? (#5, #15). **Of those nine, six are flips because the canvas
FILE itself was rewritten** (#1, 3, 4, 5, 6, and the pair #13/#14/#15 on
Exchange.dc.html — all committed at `de6940e24` plus further uncommitted
edits in progress right now), and **one is a pure model-correction flip
with no file change** (#11 — PriceBreakdown.tsx's live tooltip did not
move; only the reading of it did). **Six rows relabelled, no truth
change** (#7, 8, 9, 10, 12, 16 — ✗ March → ✗ fee-as-dial/roster/cap-default).

## Root cause, restated

`PriceBreakdown.tsx:26–29` — the live computation, not the mockups — is
still the single place every remaining wrong dollar figure traces to: it
computes the residual pool as a percentage of the **10% platform fee**
and defaults that percentage to 50, agreeing with neither `StudioCreate`'s
default of 30 nor the checkout route's fallback of '30'. **The design
canvas (Tapestry, Loom, Exchange, Main, Weavers) has now been hand-revised
to show the correct shape; the code that would make that shape real has
not moved.** Fixing `PriceBreakdown.tsx`'s formula and its default, plus
`StudioCreate.tsx`/`StudioEdit.tsx`'s default and copy, plus the checkout
route's fallback, would close every remaining ✗ row in this table.
