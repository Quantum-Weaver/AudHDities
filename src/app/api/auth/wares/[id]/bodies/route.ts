// src/app/api/auth/wares/[id]/bodies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

/** How long a minted link lives. A fact about links, not a clock on the page. */
const SIGNED_URL_SECONDS = 60 * 60;

const WITHHELD_EXTENSIONS = ['.aab'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createServerSupabase();
    const { id: wareId } = await params;

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Sign in to receive this.' }, { status: 401 });
    }

    const { data: ware, error: wareError } = await supabase
      .from('wares')
      .select('id, name, pricing_model, status, created_by')
      .eq('id', wareId)
      .maybeSingle();

    if (wareError || !ware) {
      return NextResponse.json({ error: 'This work has been unwoven.' }, { status: 404 });
    }

    const isGifted = ware.pricing_model === 'free';
    const isMaker = ware.created_by === user.id;
    let entitled = isGifted || isMaker;

    if (!entitled) {
      const { data: exchange } = await supabase
        .from('exchanges')
        .select('id')
        .eq('ware_id', wareId)
        .eq('buyer_id', user.id)
        .eq('status', 'completed')
        .limit(1)
        .maybeSingle();
      entitled = Boolean(exchange);
    }

    if (!entitled) {
      return NextResponse.json(
        { error: 'This one has not been received yet.' },
        { status: 403 },
      );
    }

    const { data: rows, error: registryError } = await supabase
      .from('file_registry')
      .select('id, name, bucket_name, storage_path, mime_type, file_size, file_hash, status')
      .eq('related_table', 'wares')
      .eq('related_id', wareId)
      .eq('status', 'published');

    if (registryError) {
      console.error('The bodies could not be read:', registryError);
      return NextResponse.json(
        { error: 'The bodies could not be read just now.' },
        { status: 502 },
      );
    }

    const offered = (rows ?? []).filter((r) => {
      const n = (r.name || r.storage_path || '').toLowerCase();
      return !WITHHELD_EXTENSIONS.some((ext) => n.endsWith(ext));
    });

    const bodies = await Promise.all(
      offered.map(async (r) => {
        let url: string | null = null;
        if (r.bucket_name && r.storage_path) {
          const { data: signed, error: signError } = await supabase
            .storage
            .from(r.bucket_name)
            .createSignedUrl(r.storage_path, SIGNED_URL_SECONDS);
          if (signError) {
            console.error('Could not mint a link for', r.name, signError);
          } else {
            url = signed?.signedUrl ?? null;
          }
        }
        return {
          id: r.id,
          name: r.name,
          // The version is read from the file's own name, never typed.
          version: versionFromFilename(r.name),
          mimeType: r.mime_type,
          fileSize: r.file_size,
          fileHash: r.file_hash,
          url,
          expiresInSeconds: url ? SIGNED_URL_SECONDS : null,
        };
      }),
    );

    return NextResponse.json({
      ware: { id: ware.id, name: ware.name },
      gifted: isGifted,
      bodies,
    });
  } catch (error) {
    console.error('The delivery road failed:', error);
    return NextResponse.json(
      { error: 'The bodies could not be read just now.' },
      { status: 500 },
    );
  }
}

/** resonance-compass-v2.3.6.apk -> 2.3.6. The bundle's own name is the record. */
function versionFromFilename(name: string | null): string | null {
  if (!name) return null;
  const m = name.match(/(\d+\.\d+\.\d+(?:[-.][0-9A-Za-z]+)*)/);
  return m ? m[1] : null;
}
