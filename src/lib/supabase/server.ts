import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/lib/generated/supabase/database.types';

export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Cross-subdomain sessions, production only, 2026-08-27: a sign-in on
      // audhdities.com must also be valid on artifacts.audhdities.com.
      // Supabase SSR cookies are host-only unless cookieOptions.domain is
      // set. Guarded on NODE_ENV so localhost (host-only cookies) keeps
      // working. Same guard in client.ts and middleware.ts — all three must
      // agree or the cookie a session sets on one won't be read by another.
      // Sessions that predate this deploy were set host-only and will need
      // one re-sign-in to pick up the shared domain.
      ...(process.env.NODE_ENV === 'production'
        ? { cookieOptions: { domain: '.audhdities.com' } }
        : {}),
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
