# The Forge, made to say the true thing — 2026-08-24

*A content-truth pass on hephaestus, KP watching the residual-system page
on the dev server while it changed under them. Opus hand, Ricercar
conducting.*

Twenty-seven files. The shape of every page is exactly what it was: same
sections, same cards, same tokens, same slots. Only the claims moved.

What was wrong, and now is not: the per-ware dial was drawn everywhere as
a share of the **fee**; it is a pledge out of the ware's own **90%**, and
it defaults to 0, not 30 and not 50. Contributors were ranked by
percentage (40/35/25 in three separate diagrams); they divide **equally**,
the main artisan one of them. The covenant pool was said to pay "all
active members"; it pays every user who has opted in to be identified, and
an opt-in holds forever. Two pools that do not exist — a **Future Fund**
and a **Mutual Aid Reserve** — were standing as recipients of a sale, and
a third fee destination, a "Community reserve (remainder)," was on the
live transparency page beside real Supabase numbers. All three are gone,
each with a dated comment where it stood, because a page that quietly
loses a slot teaches nothing.

What was right and stays: **30% of the fee returns to the residual pool,
70% funds the machine.** The March draft had that sentence correct, the
08-12 pass struck it, and KP's own words this morning put it back. I left
it wherever it stood and made the rest of the page agree with it.

The Terms are the part KP should read first. Section 4.2 said the platform
fee was **30%** and the creator share **70%** — a binding document stating
the inverse of the model. It now states 10 / 90, the fee's own 30/70, the
pledge with its default, equal division regardless of role, and that
distributions arrive whole. Section 5.3's "honor contribution percentages
… cannot be changed retroactively" is replaced by the equal-division rule
in the document's own register. I touched nothing else in that file. §4.3
still says "Sanctuary Commons" and "mutual aid" where the model says
covenant pool and dignity floor; that line was outside the sending's span,
so it stands, named, for KP's hand.

The code that makes the shape real: `PriceBreakdown` computes the model's
way now — fee with two sub-lines, profit, pledge, contributors — no
Infrastructure line, no "of fee" dial, default 0. Its one caller already
passed the ware's own row value. `StudioCreate`/`StudioEdit` default to 0
instead of 30, and the checkout route's `'30'` fallback is the ware's own
value or 0.

Every worked example on the realm now adds to the cent, and the
interactive one says so out loud when a cent will not divide by three
rather than rounding in the platform's favour.

`npm run type-check` 0. `npm run build` 0.
