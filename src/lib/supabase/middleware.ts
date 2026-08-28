import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Any `sb-<ref>-auth-token`, chunked or not.
const AUTH_COOKIE = /^sb-[a-z0-9-]+-auth-token/;
// The unchunked name only — `…-auth-token`, never `…-auth-token.0`.
const AUTH_COOKIE_UNCHUNKED = /^sb-[a-z0-9-]+-auth-token$/;

export async function updateSession(request: NextRequest) {
  const production = process.env.NODE_ENV === 'production';

  // ── The mixed-scope session cookie (2026-08-28) ────────────────────────
  // A request that carries BOTH `sb-…-auth-token` and `sb-…-auth-token.0` is
  // holding two different sessions. @supabase/ssr never leaves both: its
  // storage.setItem removes every chunk-like name it is not writing
  // (node_modules/@supabase/ssr/dist/main/cookies.js:186-222). The only way
  // to get both is the mixed scope this app created on 2026-08-27 — a
  // HOST-ONLY cookie written on artifacts.audhdities.com before
  // cookieOptions.domain landed, sitting beside the shared `.audhdities.com`
  // cookies of a later sign-in on the apex.
  //
  // That mix is not merely stale, it is actively destructive:
  //   1. combineChunks tries the unchunked name FIRST and returns it if set
  //      (utils/chunker.js:67-69), so the client loads the OLD session.
  //   2. That session no longer exists server-side, so its refresh fails and
  //      auth-js calls _removeSession.
  //   3. applyServerStorage then writes maxAge:0 for EVERY chunk-like name it
  //      saw in the request (cookies.js:335-338) — and, because
  //      cookieOptions.domain is set, with `Domain=.audhdities.com`.
  //   4. Measured in Firefox 154 against this exact header set: the three
  //      Domain-scoped removals delete the good `.audhdities.com` chunks and
  //      CANNOT touch the host-only cookie, which survives to do it again.
  // So every visit to the artifacts host signed the apex out, while the
  // artifacts host itself kept working off the very cookie causing it.
  //
  // Dropping the unchunked name from the request before the client reads it
  // makes combineChunks fall through to the chunks — the live session — so
  // getUser() succeeds and no removal is broadcast to the shared domain. The
  // delete also rides the forwarded request headers into the route handlers
  // downstream (src/app/artifacts-proxy), which build their own client from
  // the same cookies.
  // The same mix has a second shape, reached once a session happens to fit
  // under the 3180-byte chunk threshold: the SAME name arriving twice in one
  // Cookie header, once host-only and once domain-scoped. Next's RequestCookies
  // collapses that to one entry, so it can only be seen in the raw header, and
  // which of the two values won is not knowable here. Treating the name as
  // absent for this one request costs a single signed-out render; leaving it
  // costs the live session permanently, since step 3 above fires on whichever
  // value happened to lose. The removal below clears the host-only copy, so the
  // next request carries one cookie and reads clean.
  const staleUnchunked: string[] = [];
  if (production) {
    const seen = new Map<string, number>();
    for (const pair of (request.headers.get('cookie') ?? '').split(';')) {
      const name = pair.split('=')[0].trim();
      if (name) seen.set(name, (seen.get(name) ?? 0) + 1);
    }
    for (const { name } of request.cookies.getAll()) {
      if (!AUTH_COOKIE.test(name)) continue;
      const mixedScope =
        (AUTH_COOKIE_UNCHUNKED.test(name) && request.cookies.has(`${name}.0`)) ||
        (seen.get(name) ?? 0) > 1;
      if (mixedScope) {
        staleUnchunked.push(name);
        request.cookies.delete(name);
      }
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Cross-subdomain sessions in production only — see src/lib/supabase/server.ts.
      ...(production ? { cookieOptions: { domain: '.audhdities.com' } } : {}),
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  await supabase.auth.getUser();

  // Sweep stale HOST-ONLY auth cookies, production only. Sessions set before
  // the shared `.audhdities.com` domain landed were host-only; a domain-scoped
  // removal cannot delete them, so sign-out never clears them either. Per RFC
  // 6265 a Set-Cookie WITHOUT a Domain attribute names the host-only cookie
  // alone — verified in Firefox 154: the domain cookie of the same name is
  // left byte-for-byte intact, and the host-only one is removed.
  //
  // These go out as raw Set-Cookie headers rather than through
  // supabaseResponse.cookies, because Next's ResponseCookies map is keyed by
  // NAME ALONE: a second set() for a name REPLACES the first and drops its
  // Domain (verified against next@16.3.1). The previous version of this sweep
  // therefore had to skip any name the response already set — which silenced
  // it for precisely the name that mattered, the one @supabase/ssr was
  // removing in the same response. Appending is safe even then: the two
  // Set-Cookie lines address two different cookies in the browser.
  if (production) {
    const names = new Set([
      ...staleUnchunked,
      ...request.cookies
        .getAll()
        .map((c) => c.name)
        .filter((n) => AUTH_COOKIE.test(n)),
    ]);
    for (const name of names) {
      supabaseResponse.headers.append('set-cookie', `${name}=; Path=/; Max-Age=0`);
    }
  }

  return supabaseResponse;
}
