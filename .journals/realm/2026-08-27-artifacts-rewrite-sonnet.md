# 2026-08-27 — The rewrite, sending 4 of THE ARTIFACTS PLAN

*Sonnet, sent at KP's ⚛ word to land the host-conditioned rewrite so
`artifacts.audhdities.com` serves the public Supabase Storage bucket
`artifacts`. Edits ride for his sync word — not committed, not pushed.*

## What I did

`next.config.ts` — added `async rewrites()` returning `{ beforeFiles: [...] }`,
two rules, both gated `has: [{ type: 'host', value:
'artifacts.audhdities.com' }]`: `/` → `<bucket>/index.html`, `/:path*` →
`<bucket>/:path*`. The bucket base is built from
`process.env.NEXT_PUBLIC_SUPABASE_URL` at config time, falling back to the
literal host `clxnudiylugnlyylkjej.supabase.co`, so there is one source for
the address. `redirects()` and `headers()` untouched.

`proxy.ts` — when the lowercase, port-stripped `host` header is
`artifacts.audhdities.com`, return `NextResponse.next()` without calling
`updateSession`; every other host keeps its session exactly as before. The
matcher is unchanged.

Confirmed `beforeFiles` is real Next config surface via a grep of
`node_modules/next/dist` rather than guessing.

## Verify

`npx tsc --noEmit` from repo root: 0 errors. `npx next build`: compiled
successfully, TypeScript pass clean, 267 pages generated, exit clean — full
run, not truncated.

## What waits on KP

The bucket does not exist yet — his word creates it (sending 3, the
courier). Until then `artifacts.audhdities.com` will 404 through the rewrite
instead of 307ing to `/sanctuary`, which is correct: the app no longer
claims that host.

## Addendum — three amendments, same sitting

The plain rewrite above never shipped as designed: Supabase's public storage
endpoint answers every object `text/plain` regardless of stored metadata, so
external rewrite destinations became internal ones (`/artifacts-proxy/...`,
not `/_artifacts/...` — a leading underscore is a Next.js private-folder
prefix and would have 404'd every request, caught before it shipped) landing
on a new route handler that fetches and sets Content-Type by hand; then the
root moved from `index.html` to `gallery.html` at KP's word (the catalog's
named address); then KP ruled "auth required to view" and flipped the bucket
private, so the route now gates on `createServerSupabase().auth.getUser()`
(302 to `<app host>/login?redirect=...` when signed out, an optional
`ARTIFACTS_VIEWERS` email allowlist, then `storage.download()` under the
visitor's own JWT — never a service-role key), `proxy.ts`'s skip was
reverted so the artifacts host keeps its session refreshed like every other
host, and all three cookie-creation sites (`client.ts`, `server.ts`,
`middleware.ts`) now share `cookieOptions: { domain: '.audhdities.com' }` in
production so a sign-in on the main host reaches the subdomain. The RLS
policy the private bucket needs is drafted, unrun:
`supabase/migrations/20260827_artifacts_bucket_policy.sql`.

## Addendum — the vessel button's three doors

`Header.tsx`'s top-bar link now goes to `/` instead of `/vessel`; `Navigation.tsx`'s bar-item "Vessel" is removed (comment left for the future community slot) while the user-name link still goes to `/vessel`. `tsc` and `next build` both clean.
