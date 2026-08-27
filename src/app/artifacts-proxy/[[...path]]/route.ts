// src/app/artifacts-proxy/[[...path]]/route.ts
//
// Serves the PRIVATE `artifacts` Supabase Storage bucket for
// artifacts.audhdities.com, reached only through the host-conditioned
// INTERNAL rewrite in next.config.ts — never a public route name. KP's word
// 2026-08-27, verbatim: "auth required to view" — the bucket is no longer
// public (public reads now answer 400), so this route no longer fetches the
// bucket's public URL. It builds a Supabase server client bound to the
// visitor's own cookies (src/lib/supabase/server.ts, same as every signed-in
// page in the app) and downloads through THAT client, so Storage RLS decides
// per request — the app never holds or uses a service-role key.
//
// NOTE: this folder is named `artifacts-proxy`, not `_artifacts` — a
// leading underscore makes Next.js treat a folder as PRIVATE and exclude it
// and its subfolders from routing entirely (App Router convention), which
// would 404 every request including the internal rewrite. Confirmed against
// node_modules/next/dist's own project-structure docs before naming this.
//
// Contract, in four lines:
//   unsigned  -> 302 to <app host>/login?redirect=<this artifacts URL>
//   signed    -> allowlist checked, then storage.download() under the user's
//                own JWT; RLS (not this code) is the real gate
//   allowlist -> ARTIFACTS_VIEWERS unset: skipped; set: user's lowercase
//                email must be in the comma-separated list, else 403
//   key       -> path segments join to a raw path (`gallery.html` when
//                empty — the catalog KP named as root); a raw path ending
//                .html/.json/.svg/.css is used as-is; extension-less
//                resolves to `<raw>.html`; any other extension, or a key
//                holding `..` or a leading `/`, is refused with 404 first,
//                naming the resolved key in the body

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import {
  AUTH_ROUTES,
  AUTH_REDIRECT_PARAM,
} from '@/lib/constants/components/asgard/auth/auth.constants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
};

function extensionOf(path: string): string | null {
  const dot = path.lastIndexOf('.');
  if (dot === -1) return null;
  return path.slice(dot).toLowerCase();
}

// Root and extension-less paths resolve to an .html bucket key; a path that
// already carries a recognized extension is used as-is; anything else (an
// unrecognized extension) is passed through unchanged so the content-type
// check below refuses it.
function resolveKey(segments: string[] | undefined): string {
  if (!segments || segments.length === 0) return 'gallery.html';
  const raw = segments.join('/');
  return extensionOf(raw) === null ? `${raw}.html` : raw;
}

function plainText(body: string, status: number) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  const key = resolveKey(path);

  const ext = extensionOf(key);
  const contentType = ext ? CONTENT_TYPES[ext] : undefined;

  if (key.includes('..') || key.startsWith('/') || !contentType) {
    return plainText(`not found: ${key}\n`, 404);
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // artifacts.audhdities.com carries no app routes of its own — send the
    // visitor to the main app's sign-in, with a `redirect` back to exactly
    // the URL they asked for (the app host is the request host with its
    // "artifacts." prefix stripped, so this generalizes past production
    // without hardcoding a second literal).
    const host = (request.headers.get('host') || 'artifacts.audhdities.com')
      .split(':')[0]
      .toLowerCase();
    const appHost = host.replace(/^artifacts\./, '') || 'audhdities.com';
    const backTo = `https://${host}/${key}`;
    const signIn = new URL(`https://${appHost}${AUTH_ROUTES.LOGIN}`);
    signIn.searchParams.set(AUTH_REDIRECT_PARAM, backTo);
    return NextResponse.redirect(signIn, 302);
  }

  const allowlistRaw = process.env.ARTIFACTS_VIEWERS;
  if (allowlistRaw) {
    const allowlist = allowlistRaw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const email = (user.email || '').toLowerCase();
    if (!allowlist.includes(email)) {
      return plainText(`forbidden: ${email || 'no email on session'}\n`, 403);
    }
  }

  const { data: blob, error } = await supabase.storage
    .from('artifacts')
    .download(key);

  if (error || !blob) {
    return plainText(
      `storage error for ${key}: ${error?.message ?? 'no data'}\n`,
      error?.status ?? 404
    );
  }

  const bytes = await blob.arrayBuffer();
  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      // Per-user now — nothing upstream of this route should cache it.
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
