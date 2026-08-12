import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
// Repointed 2026-08-11 to the layer GAIA now delivers (see MIRROR.md).
import { Database } from '@/lib/generated/supabase/database.types';

export async function createServerSupabase() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
