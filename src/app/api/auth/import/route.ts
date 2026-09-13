// src/app/api/auth/import/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { openFrom, type EnvelopeHost, type PickedFile } from '@/lib/envelope';
import { bindFor, face, reads, whyNoReader } from '@/lib/import/registry';

const MAX_FILE_BYTES = 20 * 1024 * 1024;

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

async function open() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: fail('Authentication required', 401) };
  return { supabase, uid: user.id };
}

/** The uploaded file as the envelope's host: it opens that one file and lands nothing. */
function uploadHost(file: PickedFile): EnvelopeHost {
  return {
    suggest: async () => null,
    write: async () => {
      throw new Error('The Sanctuary writes no export file — it opens the one brought to it.');
    },
    pick: async () => file,
  };
}

/** The app an envelope names, read before a reader is chosen. */
function appNamed(bytes: Uint8Array): string {
  try {
    return face(JSON.parse(new TextDecoder().decode(bytes)))?.app ?? '';
  } catch {
    return '';
  }
}

export async function POST(request: NextRequest) {
  const opened = await open();
  if ('error' in opened) return opened.error;
  const { supabase, uid } = opened;
  try {
    const form = await request.formData().catch(() => null);
    if (!form) return fail('A file is required', 400);
    const file = form.get('file');
    if (!(file instanceof File)) return fail('A file is required', 400);
    if (file.size > MAX_FILE_BYTES) return fail('An export may be at most 20 MB', 413);

    const bytes = new Uint8Array(await file.arrayBuffer());
    const named = form.get('app');
    const expected = (typeof named === 'string' ? named.trim() : '') || appNamed(bytes);
    if (!expected) {
      return fail('This file names no app, and a resonance export names its app on the envelope.', 415);
    }
    if (!reads(expected)) return fail(whyNoReader(expected), 422);

    const opening = await openFrom(uploadHost({ name: file.name, bytes }), expected);
    if (!opening.opened) return fail(opening.why, 400);
    if (opening.reading.kind !== 'envelope') {
      return fail('A bare export names no app — bring the file the app writes today.', 415);
    }

    const shown = face(opening.reading.envelope);
    const stamp = shown?.exportedAt || new Date().toISOString();
    const reader = bindFor(expected, opening.reading.data, stamp);
    if (!reader) return fail(whyNoReader(expected), 422);

    const landed = await reader.land(supabase, uid);
    const notLanded = [...reader.notLanded, ...landed.notLanded];

    return NextResponse.json({
      success: true,
      data: {
        file: opening.name,
        app: expected,
        appVersion: shown?.appVersion ?? 'unknown',
        exportedAt: shown?.exportedAt ?? '',
        counts: shown?.counts ?? {},
        tables: reader.tables,
        landings: landed.landings,
        notLanded,
        landed: landed.landings.reduce((sum, one) => sum + one.landed, 0),
        held: landed.landings.reduce((sum, one) => sum + one.held, 0),
      },
    });
  } catch (error) {
    console.error('Import error:', error);
    return fail('The import did not land', 500);
  }
}
