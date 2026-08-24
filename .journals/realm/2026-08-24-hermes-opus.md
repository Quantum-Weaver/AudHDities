# The Bazaar — realm 3, the design canvas

*2026-08-24. **Trestle** — Opus (Claude), truly `claude-opus-5[1m]`. Step P of
the per-realm arc: the canvas at KP's eye, nothing in `src/` edited.*

**Canvas:** https://claude.ai/code/artifact/5405dd04-de8b-40f8-ae42-aa0a2ae19766
· `PROOF.md` and `design/` beside it at `.journals/proofs/03-hermes/`.

---

## What the reading found before any drawing started

The Bazaar is in better shape than its brief suggests. The copy is largely
already in the settled register — *"These have all gone home — the maker may
weave more"*, *"the guild is forming"*, *"Gweld ti'n fuan — the Bazaar keeps
no ledger of this"*. The census looked for `buy`, `cart`, `purchase`, `stock`,
`hurry`, `rating`, `trending` and found none of them. The refusal column was
mostly already honoured before anyone checked it against a list.

So the work was not to clean a dirty room. It was to find the four or five
places where the room's own laws are not quite kept, and the one place where
something is missing entirely.

**Three findings that were worth the reading.**

**The split shown is not guaranteed to be the split charged.** `PriceBreakdown`
renders at the stall against `ware.price`. The gesture then posts, the server
calls `calculate_sovereign_price`, and `useCheckout.tsx:55–59` sends the vessel
*straight to Stripe* with whatever came back. Where the acid test moves the
number, a vessel reads one price, presses a button, and meets another, with no
screen in between. Law 7 of this realm's bus says the buyer sees the split *at
the moment of purchase*, and the protected feature is technically present while
the guarantee behind it is not. The canvas draws one confirming screen, fired
only when the number changed — never when it did not, because a confirmation
that always fires is friction and one that fires only on a surprise is the law
working.

**Twenty-five live user-facing strings render a mojibake em-dash.** The bytes
are `C3 A2 E2 82 AC E2 80 9D` — a UTF-8 em-dash read once as cp1252 and
re-encoded. Four files, all carrying a UTF-8 BOM, which is the round-trip's
fingerprint. Eleven of the twenty-five are the pricing dropdown's own option
labels in `StudioCreate`, which is the first thing an artisan reads when
deciding what to charge. Not a wording question — an encoding repair.

**`file_registry` has a complete generated CRUD surface and zero callers.**
Utils, hooks, validators, both API routes, all live, all wired to Supabase,
and nothing anywhere in the application imports any of it. The delivery's door
was already built. Nobody had walked through it.

## The delivery, drawn

KP's ruling settled it in one sentence — *"checkout is using stripe, why would
we duplicate the data capture?"* — and the ground turned out to agree in
detail. The POST route inserts one `exchanges` row; the webhook updates that
same row and inserts nothing at all. The duplication was removed once already,
and the webhook's own header says so.

So the frame adds exactly one step and no tables: on completion, the `kept`
object the success page already asks for carries the bodies too — the
`file_registry` rows where `related_table = 'wares'` and `related_id = kept.id`,
each with a signed URL minted on the ask and never stored. `related_table` +
`related_id` is untyped by design, which is why no schema change is needed.

The bodies are read from the real shelf: Compass v2.3.6, APK 132 MB, setup.exe
21 MB, MSI 23 MB, the AAB in the same folder and never mentioned on the stall.
The version comes from the bundle's own filename because a typed version is a
second truth waiting to disagree with the first.

## Four doors, not six

The hub drops the Exchange tile and moves Contributions to a quiet line.
Taking the tile away surfaced something: `/bazaar/checkout` has exactly one
inbound link in the whole realm, and it was that tile. So the canvas gives it a
better one — from the stall, beside the split, where the question is actually
asked. Two more dead ends turned up in the same trace: `/bazaar/studio/[id]`
is reachable only by a post-save redirect, which means **an artisan who saves a
draft and closes the tab can never find it again**; and a ware's stall never
says who made it.

## Where the ground was silent

Four things are drawn as the plainest available shape and marked *proposed*:
the storage-path layout, `is_public = false` on every body, the adjusted-price
screen, and the four new edges. None is written as a ruling.

Nothing was seeded. Method first — KP's word.
