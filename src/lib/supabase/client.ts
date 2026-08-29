// lib/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/generated/supabase/database.types';
import type { Database as KnowledgeDatabase } from '@/lib/generated/supabase/knowledge/database.types';
import type { SupabaseBase } from '@/lib/api/supabase';

// Singleton pattern to prevent multiple instances in React Strict Mode
let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;
let knowledgeClientInstance: ReturnType<typeof createSupabaseJsClient<KnowledgeDatabase>> | null = null;

export function createClient(base?: 'superposition'): ReturnType<typeof createBrowserClient<Database>>;
export function createClient(base: 'knowledge'): ReturnType<typeof createSupabaseJsClient<KnowledgeDatabase>>;
export function createClient(base: SupabaseBase = 'superposition') {
  if (base === 'knowledge') {
    if (knowledgeClientInstance) return knowledgeClientInstance;

    // Plain client, no SSR cookie helpers, no session: the visitor's session
    // token is issued by the superposition project and would be rejected by
    // the knowledge project. Knowledge's own RLS decides what an anon read gets.
    knowledgeClientInstance = createSupabaseJsClient<KnowledgeDatabase>(
      process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE!
    );

    return knowledgeClientInstance;
  }

  if (clientInstance) return clientInstance;

  // Cross-subdomain sessions in production only — see src/lib/supabase/server.ts.
  clientInstance = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    process.env.NODE_ENV === 'production'
      ? { cookieOptions: { domain: '.audhdities.com' } }
      : undefined
  );

  return clientInstance;
}

// Hook for React components
export const useSupabase = () => {
  return createClient();
};

// Direct client for non-hook usage
export const supabase = createClient();

// Singleton instance for convenience
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient()
  }
  return supabaseInstance
}
