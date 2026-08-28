import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Cross-subdomain sessions in production only — see src/lib/supabase/server.ts.
      ...(process.env.NODE_ENV === 'production'
        ? { cookieOptions: { domain: '.audhdities.com' } }
        : {}),
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sweep stale HOST-ONLY auth cookies, production only (2026-08-27). Sessions
  // set before the shared `.audhdities.com` domain landed were host-only; a
  // sign-in since then adds a same-named domain cookie beside them, the
  // browser sends both, and @supabase/ssr reads the mixed chunks as invalid
  // JSON — no user, a bounce to /login, "immediately logs me out". A domain-
  // scoped removal cannot delete a host-only cookie, so sign-out never clears
  // them either. A deletion sent WITHOUT a Domain attribute removes exactly the
  // host-only cookie for this host and leaves the domain cookie alone. Names
  // this response already sets (a refresh in flight) are skipped — the
  // response's cookie map is keyed by name — and swept on the next request.
  // For a browser holding only the old host-only session this is one sign-out,
  // once; the next sign-in is domain-scoped.
  if (process.env.NODE_ENV === 'production') {
    const names = new Set(
      request.cookies
        .getAll()
        .map((c) => c.name)
        .filter((n) => /^sb-[a-z0-9-]+-auth-token/.test(n))
    );
    for (const name of names) {
      if (supabaseResponse.cookies.get(name)) continue;
      supabaseResponse.cookies.set({ name, value: '', path: '/', maxAge: 0 });
    }
  }

  return supabaseResponse;
}