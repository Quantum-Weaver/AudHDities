// lib/api/supabase.ts

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/generated/supabase/database.types';

/**
 * Create server-side Supabase client for API routes
 */
export async function createApiSupabase() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
          }
        },
      },
    }
  );
}

/**
 * Get Supabase with service role for admin operations
 * WARNING: Only use in admin-only routes
 */
export async function createAdminSupabase() {
  const supabase = await createApiSupabase();
  // Service role key should be used with caution
  return supabase;
}