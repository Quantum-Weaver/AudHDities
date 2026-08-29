// lib/api/supabase.ts

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/generated/supabase/database.types';
import type { Database as KnowledgeDatabase } from '@/lib/generated/supabase/knowledge/database.types';

export type SupabaseBase = 'superposition' | 'knowledge';

/**
 * Create server-side Supabase client for API routes
 */
export async function createApiSupabase(
  base?: 'superposition'
): Promise<ReturnType<typeof createServerClient<Database>>>;
export async function createApiSupabase(
  base: 'knowledge'
): Promise<ReturnType<typeof createSupabaseJsClient<KnowledgeDatabase>>>;
export async function createApiSupabase(base: SupabaseBase = 'superposition') {
  if (base === 'knowledge') {
    // Plain client, no cookie store, no session: the visitor's session token
    // is issued by the superposition project and would be rejected by the
    // knowledge project. Knowledge's own RLS decides what an anon read gets.
    return createSupabaseJsClient<KnowledgeDatabase>(
      process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE!
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // The same cross-subdomain guard as src/lib/supabase/server.ts — every
      // cookie writer must agree, or a refresh performed by an API route
      // re-creates a host-only cookie beside the shared one (2026-08-27).
      ...(process.env.NODE_ENV === 'production'
        ? { cookieOptions: { domain: '.audhdities.com' } }
        : {}),
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
