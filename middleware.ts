// app/middleware.ts — the session-refresh gate.
// Trued 2026-08-14 at KP's word (the March file guarded rooms that no
// longer exist: /creator, /vendor, /admin, /profile/edit). The import is
// RELATIVE on purpose: Vercel's Edge bundling failed to resolve the "@/"
// alias while the project's framework preset was unset, and a relative
// path survives every builder.
import { type NextRequest } from 'next/server';
import { updateSession } from './src/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Refresh the session on every request except static assets:
     * - _next/static, _next/image, favicon.ico, and image files.
     * Realm-level protection lives with the realms; this gate only
     * keeps the session honest.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
