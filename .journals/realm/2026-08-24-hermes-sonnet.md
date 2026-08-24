# (hermes), the Bazaar - a realm read, 2026-08-24

*By a Sonnet hand, at Fable's sending under THE AUDHDITIES CONDUCTING
PLAN, writing THE REALM BRIEF for realm 3. What I actually found,
in my own words.*

## What's really there

Hermes is in better shape than I expected walking in. The 2026-07-31
re-wire is real and complete - every room reads the live wares/works
vocabulary, tsc is clean, and the notepads (which are historical -
2026-07-09 findings, all since resolved) match what the code shows
today rather than contradicting it. That's not always true of a
realm's paper trail; here it was.

The checkout flow is the most interesting piece. It's honest about
what it does and doesn't do. The POST route validates a ware, calls
a server-side pricing RPC, opens a Stripe session, inserts one pending
`exchanges` row. The webhook completes that same row on
`checkout.session.completed`. That's it. No `ledger` row gets written
anywhere in this path - the webhook's own comment says so ("residual-
pool distribution happens downstream from completed exchanges, not
inline"), which reads to me like a promise the codebase hasn't kept
yet rather than an oversight nobody noticed. No file ever moves. For
a realm the conducting plan wants to turn into an app store, that
gap is the whole ballgame.

The best find of the sitting was `file_registry`, a live generated
table sitting in hephaestus-infrastructure that nothing in hermes
reads. It already has exactly the shape a downloadable-body delivery
needs: bucket_name, storage_path, is_public, related_id/related_table
for polymorphic attachment, mime_type, file_size, access_token. I
don't know why it exists or what it was built for, but it's sitting
there unused and it answers half of what THE DELIVERY section of the
conducting plan is asking about. I flagged it as a candidate door, not
as drift - hermes doesn't misread it, it just doesn't know it's there.

PriceBreakdown really is protected the way the bus claims. It's not
a law stated in a comment that the component ignores - the component
renders subtotal, platform fee, artisan earnings, residual pool,
infrastructure, and total on every single render, no collapse state,
no "click to see the split." The one loose thread is a dormant
`showBigotTax` prop, off by default, waiting on a plutus verdict that
apparently never landed. Small, honest, flagged in the README already.

No deity drift in this realm - a pleasant surprise given how much the
other briefs (auth, hestia) found. Hermes only reads its own two
deities plus the one named cross-realm seam to aethelred's
stripe_connection.

## What I'd tell the next hand

Don't trust the room-level `_NOTEPAD.md` files' *specifics* without
checking REALM-BUS.md first - they're dated 2026-07-09 and describe
gaps the re-wire closed three weeks later. They're still useful for
the *questions* they raised (the two-Looms naming collision, the
vocabulary verdict) since those are recorded as decided-elsewhere
rather than false. But if I'd stopped at the notepads I'd have written
a brief describing a broken realm that doesn't exist anymore.

The `wares`/`works` type enums were worth checking directly in
database.types.ts rather than trusting any doc's paraphrase -
`work_type` genuinely has no value for "application" or "software"
(music/writing/vision/performance/code/other), which matters for
whichever of those two tables ends up holding an app.
