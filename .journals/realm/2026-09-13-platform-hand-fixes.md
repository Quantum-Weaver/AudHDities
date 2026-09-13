# 2026-09-13 · (hermes · hestia · athena · cosmic) · platform-hand

## What is now

**The held purchase carries its kind.** `CheckoutButton.tsx:53` stores
`{ id, kind, quantity }` in `sessionStorage.pendingPurchase`;
`src/lib/hooks/commerce/useCheckout.tsx:54` stores `kind` beside `id`, `quantity`
and `amount`. `readHeld()` (`useCheckout.tsx:115`) parses the stored value, keeps
`kind` as `'work'` when it reads `'work'` and `'ware'` otherwise, and answers null
on anything without a string id; `usePendingPurchase` replays through it, so a work
bought before sign-in POSTs `{ workId }` to `/api/auth/checkout`.

**The checkout comment.** `src/app/api/auth/checkout/route.ts:217` states that both
session modes share the `common` fields and that the customer is read from
`user_financial` or opened at Stripe by `customerIdFor` (`:50`).

**One client in the Stripe webhook.** `src/app/api/webhook/stripe/route.ts:35`
creates `createServiceSupabase()` after `stripe.webhooks.constructEvent`, and every
read and write in the route — `exchanges`, `wares`, `user_financial`, and the ledger
through `writeLedgerFor` — runs on it. `createServerSupabase` is no longer imported;
`ServiceDb` (`:9`) is the type the two helpers take.

**The sitemap.** `src/app/sitemap.ts:50` lists `/bazaar/works` beside
`/bazaar/wares`.

**The sky in the status bar.** `StatusBar.tsx` imports `moonPhase` and `season` from
`@/lib/sky`. `useSkyStamp()` (`StatusBar.tsx:157`) reads the clock after mount and
once an hour, holding the moon's emoji and phase name and the wheel-of-year spokes
either side. `CenterVoice` renders the stamp after the voice line at `lg` and wider:
emoji, phase name, `after → next`. Nothing is fetched; no meaning is shown.

**Path sigils read whole.** `src/lib/sigils/award.ts:78` `requiredSteps()` reads
`path_lessons` filtered with `.in('path_id', chunk)` over the published paths in
chunks of 50, ordered by `path_id` then `lesson_id`, paging by 200 up to 25 pages,
and answers null on a read error or an unexhausted cap. `heldPaths()` (`:108`)
answers `NONE` when the vessel has no lesson marks, when the paths read errors, or
when `requiredSteps` answers null, so `every` runs only over a whole `required`.

**The lesson shelf's absence test.** `src/lib/lessons/store.ts:49` `absent()` tests
the codes in `ABSENT` (`PGRST106`, `PGRST205`, `42P01`) only. An RLS or constraint
error naming `vessel_lessons` now answers `ready: true`, so the route returns 500.

**The street and the theater.** `src/lib/constants/systems/the-street.ts:205` carries
`{ href: '/colors', label: 'The Colours' }` in the cosmic realm's rooms.
`src/components/asgard/domains/cosmic/theater/Theater.tsx` and its folder are
removed; `/theater` renders `src/app/(cosmic)/theater/MovingStage.tsx`.

## Gates

`npx tsc --noEmit` exit 0. `npx eslint` over the nine touched files: 6 errors, 0
warnings, all `react-hooks/set-state-in-effect` and
`react-hooks/preserve-manual-memoization` at addresses not touched here
(`useCheckout.tsx:140,150`, `StatusBar.tsx:210,252,316,335`).

## Not done

`src/lib/sky/MIRROR.md` still says its readers in this tree are none.
