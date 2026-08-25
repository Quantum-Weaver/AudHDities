# 2026-08-25 — THE BAZAAR, REFINED (realm 3, hermes) · step B

*Opus build hand, `claude-opus-5[1m]`, sent by Anacrusis at KP's ⚛ word,
verbatim: "bazaar is good to build as well". Branch `refine/hermes-2026-08-25`
in a worktree at `c:/_superposition/AudHDities-hermes-wt`, cut from `main`
`a3fe26a39` because the Forge's build hand holds the main tree. Not merged, not
pushed — KP merges.*

Order followed: `SPEC.md` read whole (1753 lines) before the first edit.

## What I did

**CHECK RLS-1, first, before a line of the shelf.** Through the PUBLIC (anon)
door only — no lamp read the live base with anything else and no lamp wrote to
it. The anon read of `wares` returns all four published rows and `works` returns
its one published row, so a visitor's read is open. The signed-in half could not
be walked: there are no draft rows in either table, and no vessel credentials
were on this machine. Creating an account in KP's live base to make one is a
write no lamp makes unbidden. So the answer is UNKNOWN, not open — the policies
stay in the DRAFT for KP's hand, and the shelf ships with its
could-not-be-read state.

One thing the spec assumed that the base does not carry: the spec says the one
`works` row is `draft`. **It is `published`** — so works are visible on the
square today, and the Tapestry's screenshot proves it.

**The frame first, each room its own commit**, in the order the sending set:
the split · THE WORDS · ② the Tapestry · ⑧ a work's own door · §9 the delivery ·
④ the Loom + the owner's shelf · ⑥ the Exchange + the ledger rows ·
① ③ ⑤ ⑦ + the empty states · the FIX lines · the DRAFT SQL.

Seven commits. Meters: `tsc --noEmit` 0 · `npm run build` exit 0, 267 pages ·
the split's 48 assertions green · 17 screenshots at
`.journals/proofs/03-hermes/build/`, read by this hand before KP's eye.

## What waits on KP

- `docs/sql/023-the-bazaar-refined-DRAFT.sql` — nine steps, none run.
  The one the shipped build is actually waiting on is step 2,
  `exchanges.stripe_invoice_id` with its partial unique index: until it exists
  the `invoice.paid` handler refuses to insert and logs plainly, because a
  renewal that can be written twice is a payment counted twice.
- The wares storage bucket. KP's hand, through the storage API, not SQL.
- The five rungs' Stripe Prices, made by his own hand in the dashboard, then the
  seed. A lamp creates no Stripe object; the app reads a Price id.
- The fourteen unwritten lines. Seven of them now stand behind something a
  single word from him moves: the odd-cent constant, FIX 10's subtitle, FIX 26's
  removed row, the descent pointer, the metadata copy, the pool balances, and
  where a subscription's ended-ness lives.

## What I could not do

- The signed-in half of CHECK RLS-1, and everything that hangs off a session:
  ④-2, ④-3, ④-6, ⑤-2, RLS-2 through RLS-5, ⑧-1's owner walk.
- Every Stripe walk. `.env` in this repo carries five keys and none of them is
  `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET`, so ⑥-1 through ⑥-5, T-1, T-4,
  T-5, T-8, L-1 through L-6 and D-1 through D-6 are unwalked. The code paths are
  written and type-check; they have never crossed a wire.
- The contrast measurements (①-4, ⑥-7, A-1) on rendered pixels.

## One house-wide render trait, named not fixed

Every card in the headless screenshots sits its last line hard against its own
bottom edge, and a page's subtitle can overlap the row beneath. An untouched
room (`/library`) shows the same, so it is not this pass's. Named here so the
next hand does not chase it inside hermes.
