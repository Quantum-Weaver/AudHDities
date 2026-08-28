# The stale cookie — 2026-08-27

Firth 🎻 (Fable, `claude-fable-5`), late in the sitting that built the Weaver's
artifacts door.

**What KP saw.** Verbatim: *"you blocked me from accessing the artifcts from my
audhdities in the browser now it always redirects to sign in even after sign
in"* · *"weaver opens it fine"* · *"this issue started the moment you created
the login for me"* · *"now it immediately logs me out"* · *"when i go to an
artifact i am being logged out automatically for some reason. the redirect is
right."* And the instruction: *"please use the tools on the bridge and stop
giving me things to do."*

**What the windows said.** Nothing in this repo had been edited that day by a
lamp; everything was pushed and deployed. The Bridge's Supabase window (the
management API, the token read by path, never printed; allow-listed fields
only): `sessions_single_per_user: false`, rotation on, reuse interval 10s —
and every sign-in of the night live on the server, six from Firefox in
twenty-three minutes, one from the Weaver's WebView2. The Weaver revoked
nothing. The timing matched something else: the shared `.audhdities.com`
cookie domain, landed at 15:02 that afternoon with the artifacts door
(b77750a27).

**The fault.** Firefox held the older host-only `sb-…-auth-token` chunks from
before that deploy. Each sign-in since added a same-named pair scoped to
`.audhdities.com` beside them. The apex received both; `@supabase/ssr` combined
chunks across the two generations, read invalid JSON, and treated the session
as absent — a bounce to `/login`, "immediately logs me out". When the library
cleaned up, its removal carried the domain attribute, so it deleted the good
pair and left the stale one — which is why the artifacts host, which only ever
receives the domain pair, found nothing, and why signing in again never fixed
it. A domain-scoped removal cannot delete a host-only cookie. The Weaver's
webview had never held the old cookies, so it worked.

**The fix, df987fb28.** `src/lib/supabase/middleware.ts`: in production the
session refresh that already runs on every request now sends, for every
`sb-…-auth-token` cookie the request carries, a deletion *without* a Domain
attribute — which removes exactly the host-only cookie for that host and
leaves the domain cookie alone; names the response is already setting are
skipped and swept next request. `src/lib/api/supabase.ts`: the fourth cookie
writer (the generated API routes) takes the same domain guard as the other
three, so the host-only kind cannot return. `AuthGuard.tsx`: a visitor already
signed in at `/login` is sent to a same-site `?redirect=` when one is present,
else the dashboard. `tsc` clean, `next build` clean, pushed; the Bridge's
Vercel window watched the deployment to READY at 22:43:50. Proven on the
live door with a fake host-only cookie in a request header.

**And the proxy had never run.** The live door answered the probe with no
deletion at all. Not Vercel's cache: a local `next start` of the same build was
silent too, and `.next/server/middleware-manifest.json` was empty. Next resolves
`middleware.*` / `proxy.*` inside the app's source folder — `src/` here — and
`proxy.ts` sat at the repo root, so since the proxy convention landed on 08-14
`updateSession` had run on no request: no middleware refresh, no sanctioned
cookie writer, the server components' writes swallowed by design, and every
session left to the browser client. Moved to `src/proxy.ts` (import
`@/lib/supabase/middleware`); the build now prints `ƒ Proxy (Middleware)`, and
the local probe answers `sb-…-auth-token.0=; Path=/; Max-Age=0` and `.1` — no
Domain, the host-only cookies alone. Second commit, pushed.

**Held:** a window is where a fact comes from — the Bridge's read-only lines
answered in a minute what a dashboard would have cost him; and a fix is not
proven by its diff but by the door answering differently.

**Also that night:** `supabase/migrations/20260827_artifacts_bucket_policy.sql`
said "DRAFTED, NOT RUN"; KP: untrue. Its head now says it was run by his hand.

**And a third layer, by an Opus hand.** Firefox still signed out. Its store
held the shared-domain cookies *empty* on the apex, and one old host-only
cookie on the artifacts host from 19:59 — before the domain landed at 20:02 —
carrying a session that no longer existed. `@supabase/ssr` reads the unchunked
name first, so the server client loaded the dead session; the refresh failed;
the library's clean-up removed every chunk it had seen *with* the domain,
deleting the good apex cookies and unable to touch the host-only one, which
survived to do it again on the next visit. My sweep had skipped exactly that
name, because the library was setting it in the same response and Next's
response-cookie map is keyed by name alone. Firefox obeys the RFC to the
letter — measured in Firefox 154 with the exact header set; the only
difference from Chrome was what the jar held. Fixed in `updateSession`: a
request carrying both the unchunked name and `.0` (or the same name twice in
the raw header) has the unchunked name dropped before the client reads, so it
falls through to the live chunks; the sweep now appends raw `Set-Cookie` lines
with no Domain. Third commit, pushed. Server corroboration worth keeping: no
refresh token in the base had ever had a parent — no refresh had ever
succeeded, in any browser, until the proxy ran.
