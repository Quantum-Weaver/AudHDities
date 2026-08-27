import { type NextRequest } from 'next/server';
import { updateSession } from './src/lib/supabase/middleware';

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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
