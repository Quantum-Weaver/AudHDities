// src/app/api/books/[slug]/download/route.ts
//
// THE DELIVERY DOOR for KP's three books as digital wares (2026-08-31):
//   the-poems · the-lyrics · the-philosophies
//
// GET /api/books/<slug>/download[?format=epub|docx]
//
//   unsigned      -> 401, one sentence
//   unknown slug  -> 404, one sentence
//   not entitled  -> 403, one sentence
//   entitled      -> 302 to a short-lived signed URL for `<slug>.<format>`
//                    in the PRIVATE `books` bucket, minted with the
//                    `download` option so Storage answers it
//                    `Content-Disposition: attachment; filename="..."`
//
// Entitlement is the record the Stripe webhook writes on
// checkout.session.completed (src/app/api/webhook/stripe/route.ts): the
// `exchanges` row for this buyer and this ware flipped to status
// 'completed'. Same test as src/app/api/auth/wares/[id]/bodies/route.ts —
// a free ware or the maker is also let through. The signed URL is minted
// through the buyer's own Supabase client, so Storage RLS on the `books`
// bucket (migration 20260831_the_books_as_digital_wares.sql) is the real
// gate; this code is the door in front of it. No service-role key.

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'books';

/** A link lives five minutes — long enough to click, not to share. */
const SIGNED_URL_SECONDS = 5 * 60;

const BOOK_SLUGS = new Set(['the-poems', 'the-lyrics', 'the-philosophies']);

const FORMATS = new Set(['epub', 'docx']);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!BOOK_SLUGS.has(slug)) {
    return sentence('There is no such book on the shelf.', 404);
  }

  const format = (request.nextUrl.searchParams.get('format') || 'epub').toLowerCase();
  if (!FORMATS.has(format)) {
    return sentence('That format is not offered; ask for epub or docx.', 400);
  }

  try {
    const supabase = await createServerSupabase();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return sentence('Sign in to receive your book.', 401);
    }

    const { data: ware, error: wareError } = await supabase
      .from('wares')
      .select('id, name, pricing_model, created_by')
      .eq('slug', slug)
      .maybeSingle();

    if (wareError || !ware) {
      return sentence('There is no such book on the shelf.', 404);
    }

    let entitled = ware.pricing_model === 'free' || ware.created_by === user.id;

    if (!entitled) {
      const { data: exchange } = await supabase
        .from('exchanges')
        .select('id')
        .eq('ware_id', ware.id)
        .eq('buyer_id', user.id)
        .eq('status', 'completed')
        .limit(1)
        .maybeSingle();
      entitled = Boolean(exchange);
    }

    if (!entitled) {
      return sentence('This book has not been received yet.', 403);
    }

    const filename = `${slug}.${format}`;
    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(filename, SIGNED_URL_SECONDS, { download: filename });

    if (signError || !signed?.signedUrl) {
      console.error('Could not mint a link for', filename, signError);
      return sentence('This book is not on the shelf in that format yet.', 404);
    }

    return NextResponse.redirect(signed.signedUrl, {
      status: 302,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (error) {
    console.error('The book delivery road failed:', error);
    return sentence('The book could not be handed over just now.', 500);
  }
}

function sentence(body: string, status: number) {
  return new Response(`${body}\n`, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}
