// src/app/grimoire/route.ts
//
// THE GRIMOIRE DOOR — kp.audhdities.com/grimoire is the home of the grimoire
// (KP's word, 2026-08-31). Also answers at <app host>/grimoire; the host
// rewrites in next.config.ts land the kp.* root and /grimoire here.
//
// The grimoire is one self-contained `grimoire.html` that the courier carries
// into the PRIVATE `artifacts` Supabase Storage bucket — the same bucket
// src/app/artifacts-proxy/[[...path]]/route.ts serves behind a session gate.
// This door has NO gate: the page is public. Storage RLS is still the real
// wall — the migration 20260831_the_grimoire_door.sql opens exactly this one
// object (`grimoire.html`, bucket `artifacts`) to the anon role and nothing
// else in the bucket.
//
// The read goes through a bare anon client, never the visitor's cookies:
// the response is `Cache-Control: public`, so it must not vary per visitor
// and must never carry a Set-Cookie. src/proxy.ts exempts /grimoire from
// updateSession for the same reason. The app holds no service-role key.

import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'artifacts';
const KEY = 'grimoire.html';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return plain('The grimoire cannot be reached just now.\n', 503);
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data: blob, error } = await supabase.storage.from(BUCKET).download(KEY);

  if (error || !blob) {
    // A missing object and a refused read look the same from outside: the
    // grimoire is not on the shelf. One sentence, nothing else.
    return plain('The grimoire is not on the shelf yet.\n', 404);
  }

  const bytes = await blob.arrayBuffer();
  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function plain(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
