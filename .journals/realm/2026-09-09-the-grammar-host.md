# The grammar host double-rewrite — 2026-09-09

Fix to the `grammar.audhdities.com` `beforeFiles` pair in `next.config.ts`.

## The rules, before

```
{
  source: '/',
  destination: '/grammar/explore',
  has: [{ type: 'host', value: 'grammar.audhdities.com' }],
},
{
  source: '/:path*',
  destination: '/grammar/:path*',
  has: [{ type: 'host', value: 'grammar.audhdities.com' }],
},
```

`/` matched the first rule, landing on `/grammar/explore`; the second rule
then matched that already-rewritten path and prefixed it again, producing
`/grammar/grammar/explore` (404). Every other path on the host doubled the
same way.

## The rules, after (second pass)

The first pass above closed the double-prefix but its negative lookahead
excluded only paths starting `grammar`, so `_next/*`, `api/*`,
`artifacts-proxy/*`, `grimoire`, and every static file (`favicon.ico`,
`robots.txt`, css/js chunks, etc.) still gained the `/grammar` prefix and
404'd — a page on the subdomain arrived without its styles and scripts.
Widened the lookahead to exclude those too:

```
{
  source: '/',
  destination: '/grammar/explore',
  has: [{ type: 'host', value: 'grammar.audhdities.com' }],
},
// A path already under /grammar, a framework/API/proxy/grimoire path, or any path ending in a file extension falls through unmatched; every other path gains the prefix once.
{
  source: '/:path((?!grammar(?:/|$)|_next/|api/|artifacts-proxy/|grimoire(?:/|$)|.*\\.[a-z0-9]{1,8}$).*)',
  destination: '/grammar/:path',
  has: [{ type: 'host', value: 'grammar.audhdities.com' }],
},
```

The negative lookahead now keeps the second rule from ever matching a path
that already begins `grammar` or `grammar/`, or `_next/`, `api/`,
`artifacts-proxy/`, `grimoire` or `grimoire/`, or ends in a file extension
(a dot then 1-8 letters/digits at the end of the path) — so framework
assets, API routes, the artifacts proxy, the grimoire route, and any file
pass through unmatched on this host instead of being prefixed and 404ing.

## Verification

Live-work collision: `src/lib/grammar/grammar-contract.ts` and several
other grammar/apps files carried uncommitted, in-progress edits (another
hand's) for the whole verification window. Not touched. To verify against
clean, buildable app code without disturbing that live work, built and ran
the check in a separate `git worktree` (detached at HEAD, `4d9183f73`)
under `g:\materia\.scratch-verify\`, with this fixed `next.config.ts`
copied in and `node_modules` (directory junction) / `.env` (hardlink)
linked in rather than reinstalled or read. `npx next build --webpack` built
clean. Ran `npx next start -p 3100` from the worktree (the real dev server
on :3000 was left alone throughout).

Codes observed, host `grammar.audhdities.com`:

| path | code |
|---|---|
| `/` | 200 |
| `/explore` | 200 |
| `/atoms/resonance` | 200 |
| `/grammar/explore` | 200 |
| `/_next/static/css/4a0b545862a9b0aa.css` (real built hash) | 200 |
| `/_next/static/chunks/14604-58ec7fd4445d3b03.js` (real built hash) | 200 |
| `/favicon.ico` | 200 |
| `/robots.txt` | 200 |

Spot-checked the other excluded prefixes and extension passthrough don't
gain the grammar prefix (their codes are the routes' own, not a
`/grammar/...` 404): `/api/health` → 404 (app's own not-found page, no such
API route exists — confirmed not rewritten by response headers/body, not a
grammar-prefixed 404), `/artifacts-proxy/x` → 302 to
`grammar.audhdities.com/login?redirect=...` (hit the real artifacts-proxy
route handler, unauthenticated — confirms no `/grammar` prefix was added),
`/grimoire` → 404 text/plain (hit the real grimoire route directly, not
`/grammar/grimoire`), `/some/path.pdf` → 404 (no such file, but not
prefixed either).

Titles differ correctly: grammar-host `/` renders "Explore | The Grammar |
Sovereign Sanctuary"; plain `/` (no Host header) renders "AudHDities —
Sovereign Sanctuary", and answers 200.

Cleanup: killed the leftover `next start` node process (taskkill, PID held
the worktree directory open after a plain `kill` on the backgrounded
shell's PID didn't reach the real node.exe), removed the node_modules
junction and the .env hardlink (originals in `G:\materia\AudHDities`
untouched — size/line-count checked, not contents read), removed the
worktree, pruned, and removed the now-empty scratch directory.
`git worktree list` in the real repo shows only `G:/materia/AudHDities`
again.

## Artifacts and kp pairs — doubling, not touched

Read only, not edited. `src/app/artifacts-proxy/[[...path]]/route.ts`
(lines 60-66) documents the artifacts pair carries the same chain: `/` →
`/artifacts-proxy/gallery.html` → re-matched by `/:path*` →
`/artifacts-proxy/artifacts-proxy/gallery.html`; `resolveKey()` drops a
leading `artifacts-proxy` segment to compensate, which also makes a single
and a doubled rewrite resolve to the same storage key — so an HTTP test
against this route cannot externally distinguish doubled from undoubled.
Live curl against `Host: artifacts.audhdities.com`, unauthenticated:
`/` → 302 to `https://audhdities.com/login?redirect=...gallery.html`,
consistent with the documented double-then-compensate path. The kp pair
(`/` → `/grimoire`, `/grimoire` → `/grimoire`) cannot double harmfully by
construction — its second rule's destination equals its own source, so a
re-match is a no-op; `Host: kp.audhdities.com` `/` and `/grimoire` both
answered 404 "The grimoire is not on the shelf yet." (real business-logic
404 from the route, storage object absent under the local anon key — not a
routing 404). Neither pair was changed.

## Checks

`npx tsc --noEmit` — no output. `npx eslint next.config.ts` — exit 0. Both
run against the live repo after the concurrent grammar-contract.ts edit
resolved itself.

Nothing committed.
