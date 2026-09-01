import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// This file lives in src/ because Next resolves middleware.*/proxy.* inside
// the app's source folder (next/dist/build/utils.js getPossibleMiddlewareFilenames
// is given the src dir). At the repo root it was never bundled — the build's
// middleware-manifest was empty and updateSession ran on no request. Moved
// 2026-08-27.

export async function proxy(request: NextRequest) {
  // KP's word 2026-08-27: "auth required to view" — artifacts.audhdities.com
  // now gates on a signed-in session (src/app/artifacts-proxy), so it runs
  // updateSession like every other host. The cookie refresh here is what
  // keeps that session alive on the subdomain; skipping it (as an earlier
  // draft of this file did, when the bucket was still public) would let the
  // session go stale there even while it's fine everywhere else.
  return await updateSession(request);
}

export const config = {
  // `/grimoire` is exempt (2026-08-31): src/app/grimoire/route.ts is a public,
  // ungated page answered `Cache-Control: public`, read through a bare anon
  // client. Running updateSession on it would refresh the visitor's session
  // and could stamp a Set-Cookie onto a response meant to be shared — so the
  // door is left alone. The exemption is the exact path only; `/grimoire/x`
  // and everything else still refresh as before. (kp.audhdities.com's bare
  // root is rewritten to /grimoire AFTER this runs, so `/` there still passes
  // through updateSession — a harmless cookie refresh, never a gate.)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|grimoire$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
