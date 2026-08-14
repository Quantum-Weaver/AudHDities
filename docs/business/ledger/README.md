# THE LEDGER — the one book everything else is generated from

*Raised 2026-08-10 by **Lintel** 📋 · Opus (Claude) 🕯️, at KP's ⚛ word: "we intend
to fill gaps not get lost in reporting them." This is Tier 2's keystone from
`resonance-chamber/constellation/weaver/business/BUSINESS-PAPERS.md`, which named
it plainly: **"the SOURCE from which every statement below is generated — without
it, nothing else can exist."***

**Standing disclaimer, carried forward unchanged from the Business Papers:** this
is organizational help from a friend who reads a great deal — **not legal, tax, or
accounting advice.** Filings are KP's hands. When real money or grants arrive, one
session with a small-business accountant (many offer free first consults;
SCORE.org mentors are free) is worth more than any document drafted here.

---

## Why this file is one CSV and not an app

At this size a spreadsheet is genuinely the right tool, and a **plain CSV** is
better than a spreadsheet because it is diffable, greppable, and readable by a
script without anyone's permission. `ledger-2026.csv` currently holds **one line:
its header.** That is not an empty file — it is a schema, standing ahead of need.

Every other money document AudHDities will ever be asked for is a *view* of this
one file:

```
ledger-2026.csv
     │
     ├──▶ Profit & Loss        money in − money out, grouped by category, over a period
     ├──▶ Balance sheet        what the business owns vs owes, at a date
     ├──▶ Operating budget     last period's actuals → next period's plan
     └──▶ Schedule C           the sole prop's business return, inside the 1040
```

**Nothing downstream can be produced honestly without rows here.** Being new is
not disqualifying to a grantmaker; being undocumented is.

## The three wards this file keeps

1. **The privacy law stands over every row.** Business address is **the PO box,
   never home.** If a row's `notes` would name a home address, it does not go in.
2. **Secrets stay pointers.** **No account numbers, no card numbers, no API keys,
   ever** — not even partial. `method` names an account by *nickname*
   (`cu-checking`, `stripe`, `personal-card-reimbursed`), never by number.
3. **Every row descends from a receipt.** If there is no receipt, PDF, or emailed
   confirmation, write the row anyway and put `no-receipt` in `reference` — an
   honest gap is auditable; a missing row is not.

## The columns

| Column | What goes in it |
|---|---|
| `date` | **ISO only** — `2026-08-10`. Sorts correctly, never ambiguous across locales. |
| `direction` | `in` or `out`. Nothing else. |
| `amount_usd` | Positive decimal, always. **Direction carries the sign, not the number** — so a mistyped minus can never silently flip a total. |
| `category` | One word from the vocabulary below. |
| `counterparty` | Who the money came from or went to (`Namecheap`, `USPS`, `Stripe`). |
| `method` | Which account moved — by nickname, never by number. |
| `reference` | Invoice/receipt id, or `no-receipt`. |
| `schedule_c` | The tax line this expense most likely belongs to (see below). Blank for money in. |
| `notes` | Plain sentence. Optional. No addresses, no secrets. |

## The category vocabulary

Keep it small on purpose. A category nobody uses is a category that hides things.

**Money in** — `sales` · `advertising` · `donations` · `grants` · `refund-received` · `other-income`

**Money out** — `hosting` · `domains` · `mailbox` · `software` · `hardware` ·
`processing-fees` · `professional` · `filings` · `supplies` · `marketing` ·
`refund-issued` · `other-expense`

**Capital / owner rows** — `owner-contribution` (money KP puts in) ·
`owner-draw` (money KP takes out). These are **not** income or expense; they are
equity, and they only touch the balance sheet. Keeping them in the same file with
their own categories is what stops them polluting the P&L.

## The Schedule C hint column

A sole proprietorship's business return is **Schedule C inside the personal
1040.** Filling `schedule_c` as you go turns tax season from an archaeology
project into a sort. *These are the common landing places, not a ruling — the
disclaimer above governs:*

| category | usual Schedule C line |
|---|---|
| `processing-fees` | 10 — Commissions and fees |
| `hardware` | 13 — Depreciation / §179 *(ask the accountant; the share used for business matters)* |
| `professional` | 17 — Legal and professional services |
| `mailbox`, `software`, `hosting`, `domains` | 18 — Office expense *(or 27a, Other)* |
| `supplies` | 22 — Supplies |
| `filings` | 23 — Taxes and licenses |
| `marketing` | 8 — Advertising |

## What rows look like

```csv
2026-07-14,out,13.98,domains,Namecheap,personal-card-reimbursed,NC-88421,18,audhdities.com renewal
2026-08-01,out,25.00,mailbox,USPS,cu-checking,PO-BOX-Q3,18,quarterly box fee — street addressing
2026-08-03,in,40.00,sales,Stripe payout,stripe,po_1P4x,,first three sales
2026-08-03,out,1.46,processing-fees,Stripe,stripe,po_1P4x,10,fees on the payout above
2026-08-05,in,500.00,owner-contribution,KP,cu-checking,,,seed float for operating costs
```

**Two habits worth having from row one:** record the Stripe **fee** as its own
`out` row rather than netting it against the payout (grant reviewers and the IRS
both want gross revenue), and use the *same* `reference` on a payout and its fee
so the pair stays findable forever.

## How each statement derives

**Profit & Loss** — filter to a date range, drop `owner-*` rows, sum `in` by
category, sum `out` by category, subtract. That is the whole thing.

**Balance sheet** — at a date: **assets** = cash across accounts (running sum of
all `in` minus all `out`, including owner rows) + hardware not yet written off;
**liabilities** = anything owed (today: likely none); **equity** = assets minus
liabilities. *At AudHDities' current size this is nearly trivial to produce —
which is exactly why it should exist. It reads as competence, and it costs an
afternoon once.*

**Operating budget** — last period's actuals, per category, plus what is known to
be coming (annual domain renewals, the box, hosting tiers). The numbers here are
small and honest, and **small and honest reads well.**

## Where to start, and it is smaller than it looks

1. **One row.** The most recent business expense you can find a receipt for.
2. **Backfill what's easy** — domains and hosting are in renewal emails; Stripe's
   dashboard exports its own history whole.
3. **Then only ever add forward.** Ten seconds per transaction, and the P&L, the
   balance sheet and Schedule C all become sorting problems instead of memory
   problems.

**Backfill is optional and it is not a debt.** A ledger that starts today and is
honest is worth more than one that starts in January and is guessed.

## Deliberately not here

- **No generator script yet.** The natural home is
  `resonance-ziggy/modules/` — the house's deterministic-expertise wing, *no AI
  where a script suffices* — reading this CSV and emitting P&L + balance sheet as
  markdown. **It waits on rows, not on permission.**
- **No numbers.** Not one figure in this folder is real. The header stands and
  the vocabulary stands; the amounts are KP's to enter, from receipts.
- **No bank or EIN identifiers**, per ward 2 above. Those live where secrets live.

---

*Kin: `../business-plan.md` (the ask and the model) · `../financial-ecosystem.md`
(the flows) · and the map that called for this file,
`resonance-chamber/constellation/weaver/business/BUSINESS-PAPERS.md`.*

*The two documents beside this one describe how money will move **through the
platform**. This one records how money moves **through the business.** They are
different questions and only this one has a tax form attached.*
