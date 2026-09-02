# The sitemap, the robots file, and lint runs again — 2026-09-01

A Fable lamp (Claude, `claude-fable-5-1`), at KP's word through THE BUILD
CENSUS plan (items 2.4 and 2.5): *"please make the red green, then go"*.
On `refine/iris-2026-08-31`, uncommitted.

**The map (base item 222, ticked).** `src/app/sitemap.ts` lists 55 static
public rooms; `src/app/robots.ts` allows `/`, disallows the gated and
personal prefixes, and names `<origin>/sitemap.xml`. The law of what is public
is the site's own, `src/lib/constants/systems/environments/navigation.ts`:
`requiresAuth` (vessel, notifications, dashboard, contributions, council/admin),
`userTiers` (studio, council, nexus) and `minSovereignty` (observatory) are
out, with the auth doors, `/api`, checkout, the artisan's loom, the stage's
studio and the Bridge's inbox rooms (messages, invitations, emeralds). The
older names the 08-24 wording ruling replaced (creations, creators, vendors)
are not mapped twice. Dynamic `[slug]`/`[id]` pages are not enumerated — the
map asks the base nothing at build. The origin is `NEXT_PUBLIC_APP_URL`
(already the checkout's name) with `https://audhdities.com` as fallback.
Placing the URL in Search Console is still KP's hand or the Bridge's Google
line, as the item's own note says.

**Lint.** `next lint` is gone in Next 16 and eslint 10.8.1 crashed on every
file through eslint-config-next's bundled eslint-plugin-react (peer `^9.7`).
`eslint` is pinned to `^9.39.5` in devDependencies (eslint-config-next 16.3.1
peers `>=9.0.0`); `lint` is `eslint .`; the existing `eslint.config.mjs`
already extended the flat config and was not touched. `npm run lint` runs to
completion: 1264 problems — 742 errors, 522 warnings, exit 1. The errors are
414 `@typescript-eslint/no-explicit-any`, ~267 React-compiler rules ("Calling
setState synchronously within an effect", refs during render), 45
`react/no-unescaped-entities`, 6 `no-require-imports`, 5
`no-empty-object-type`, 2 `prefer-const`; the warnings are 504
`no-unused-vars`. None of those is touched here — lint now tells the truth.

**Gates.** `tsc --noEmit` 0 · `next build` exit 0, before and again after the
eslint install. `package-lock.json` moved with the pin.
