# The Hearth, walked — realm 2, the design canvas

*2026-08-24. **Mantel** — Opus (Claude) 🕯️, truly `claude-opus-5[1m]`. Sent by
Fable (conducting as Battuta) at KP's ⚛ "go". Design only; nothing in `src/`
was edited. Canvas:
https://claude.ai/code/artifact/33a47fa1-088a-42bc-a2e1-f01b79c84a92*

---

## The rooms all stand. Four of the ways between them don't.

37 files, 5,486 lines, and I came in expecting to design a realm and found one
already built — a scene renderer with six organs, a ceremony switchboard, a
covenant space, a garden whose care cadence follows the plant. The frame KP's
build law asks for is mostly here.

What is missing is edges:

- **`/vessel/home` has no way back.** The room a vessel is meant to *dwell* in
  offers doorways out of the realm (the Studio) and deeper in (the Sanctum), and
  nothing home. Every other room carries the same back link in the same corner.
- **`/vessel/energy/[id]` is unreachable.** A complete page — fetch, render,
  delete — that nothing in the app links to. I searched; zero hits. The only way
  to delete an energy entry is to type its id into the address bar.
- **`/vessel/constellation`** is reachable only from the nav's user menu. A room
  behind a menu is not "steps away."
- **The Sanctum's exit lies.** It says "Return to Vessel" and calls
  `router.back()`. Arrive from the home's doorway — a real path — and it doesn't.

Four `<Link>`s. No new rooms, no new copy except one tile name lifted from the
nav that already has it. That is what "framework first" looks like in a realm
that is already built.

## The retirement that doesn't retire anything

`SovereigntyScore.tsx` is stranded — 0 importers — and ruling 4 retires it. I had
the board half-drawn before grepping the *concept* rather than the file, and
found `StatusBar.tsx:68`: the same `{n} / 1000` with the same filling bar,
rendering **on every authenticated page in the app**, above every board I was
drawing. The stranded file is the copy. The original is lit.

Deleting the file is correct and changes nothing a vessel sees. Whether the bar
goes is KP's to say. The board names it, draws the slot empty, and stops — which
is also where gate ④'s "calm emptiness" independently lands. Two laws arriving at
the same empty space from different directions.

## The measurement that justified a ruling

`vessel/page.tsx:33` paints `var(--gradient-weaver)` at **opacity 0.75**. The
variable is defined nowhere in the repo — one hit, its own use — so today it
paints nothing.

The tempting mend is to define it. I computed the cost: the home wash runs
`#22D3EE → #E0E0E0`; at 0.75 over deepSpace its light end lands `#ABACAF` and
starDust reads **1.7:1**. At the ambient 0.3 the law already requires, it lands
`#4C4E58` and reads **6.3:1**. And `EnvironmentLayer` already paints that exact
wash under every Page — the phantom div is a duplicate of something already there.

## The largest thing in the realm

`text-star-dust/40` measures **3.1:1**, `/30` measures **2.3:1**, and between
them they carry the kindest sentences in the build:

> "Bare walls, on purpose — yours to fill, or not."
> "Nothing rushes, and nothing dies." · "Never bought, never rushed."
> "a kindness to your future self, never a score"
> "Shape the Sanctuary to welcome your nervous system."

The accessibility card fails the contrast row. The empty states written to be
dignified are printed too faint to read. Nobody chose this — `/40` is just what a
muted line looks like at 2am — but the house's gentlest voice is its least
legible one. The door's canvas made this same mend at `LoginForm.tsx:81`.

## Counts: inventory or measure

The test I settled on — **an inventory answers "what do I have?", a measure
answers "how am I doing?"** Only the second needs a full state; only the second
can be lost.

- **Sigils, Quests** — earned totals in a stat row. Score. E4 welds
  no-leaderboards onto sets.
- **Events** — things that happened *to* a vessel. Honest, badly dressed.
- **Wares, posts, channels** — inventory. A maker needs to know their own shelf.
- **Messages** — `:333` fetches with **no owner filter**, unlike its three
  siblings, and burns whatever comes back as a star in a person's own sky. A
  count whose meaning cannot be stated is worse than no count.
- **Unread heralds** — honest. A queue depth falls when you engage and cannot be
  accumulated. The opposite shape from a sigil total.

The four summary tiles were **always doors** — each is a `<Link>`. The number was
decoration on a door, and the only decoration that could make a person feel behind.

## On the record, because it deserves to be

Three dated mend-notes in `ConstellationContent` record fields that died in the
schema settle — `significance_score`, `earned_reason`, quest `house` — each
saying: degraded honestly rather than invented. **A ring that could have been a
ranking is ordered by recency instead, because the score it would have ranked by
no longer exists.** That is the anti-scarcity law kept by an engineer at 2am, not
by a copywriter. Worth more than any board I drew.

## Reported, not mended

`(hestia)/README.md:123–130` says named colour utilities "mint nothing." True
when written; false as of **today** — `globals.css:19` gained
`@config "../../tailwind.generated.config.mjs"` at KP's ⚛ word. I checked this
*before* publishing the finding I was about to make (that the Sanctum's
readability mend used a phantom class). It doesn't. It renders. Both addresses
are on board ③ and neither is edited.

## Second pass, marked and not designed

Garden · collections · decorations · companions · the hanging — drawn on board ②
as reserved ground with their real empty-state copy quoted verbatim. And
**echoes**, ruled mid-sitting: *"the users 'echoes' experience when reading a
scroll from the past or even moments after writing it during the capture flow."*
Board ④ holds a named place inside the entry and nothing in it. An echo is the
house speaking back to a person about their own words — a placeholder there
would be a voice invented for the Sanctuary in the one room where the voice is
supposed to be the vessel's.

The companion is the one to be careful with. KP's ruling: *"companion clues is
supposed to be a gentle reminder about the vessels actual pets in life."* A
companion is a person's **real animal**, remembered. There is no honest way to
draw someone else's pet, and a placeholder would be exactly the invented-creature
attachment the ruling exists to prevent.

A space held open is information. A space filled in early is a decision taken
from him.

— **Mantel** 🕯️ · Opus (Claude), truly `claude-opus-5[1m]`, 2026-08-24
