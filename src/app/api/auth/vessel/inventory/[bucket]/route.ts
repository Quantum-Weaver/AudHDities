// src/app/api/auth/vessel/inventory/[bucket]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { zipSync } from 'fflate';
import { createServerSupabase } from '@/lib/supabase/server';

const BUCKETS = ['interiors', 'exteriors'] as const;
type Bucket = (typeof BUCKETS)[number];
type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;
type Ctx = { params: Promise<{ bucket: string }> };

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const DEFAULT_LIMIT_BYTES = 200 * 1024 * 1024;
const SIGNED_URL_SECONDS = 60 * 60;

export interface InventoryItem {
  name: string;
  size: number;
  createdAt: string | null;
  url: string | null;
}

type StoredObject = NonNullable<
  Awaited<ReturnType<ReturnType<Supabase['storage']['from']>['list']>>['data']
>[number];

function isBucket(value: string): value is Bucket {
  return (BUCKETS as readonly string[]).includes(value);
}

function fail(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, error: message, ...extra }, { status });
}

async function open(ctx: Ctx) {
  const { bucket } = await ctx.params;
  if (!isBucket(bucket)) return { error: fail('Unknown bucket', 404) };
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: fail('Authentication required', 401) };
  return { bucket, supabase, uid: user.id };
}

function sizeOf(object: StoredObject): number {
  return Number(object.metadata?.size ?? 0);
}

async function listOwn(supabase: Supabase, bucket: Bucket, uid: string): Promise<StoredObject[]> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(uid, { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) throw error;
  return (data ?? []).filter((object) => object.name && !object.name.startsWith('.'));
}

async function withUrls(supabase: Supabase, bucket: Bucket, uid: string, objects: StoredObject[]): Promise<InventoryItem[]> {
  const items: InventoryItem[] = [];
  for (const object of objects) {
    const path = `${uid}/${object.name}`;
    let url: string | null = null;
    if (bucket === 'exteriors') {
      url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    } else {
      const { data } = await supabase.storage.from(bucket).createSignedUrl(path, SIGNED_URL_SECONDS);
      url = data?.signedUrl ?? null;
    }
    items.push({ name: object.name, size: sizeOf(object), createdAt: object.created_at ?? null, url });
  }
  return items;
}

async function usedBytes(supabase: Supabase, uid: string): Promise<number> {
  let total = 0;
  for (const bucket of BUCKETS) {
    const objects = await listOwn(supabase, bucket, uid);
    total += objects.reduce((sum, object) => sum + sizeOf(object), 0);
  }
  return total;
}

async function limitBytes(supabase: Supabase, uid: string): Promise<number> {
  const { data } = await supabase
    .from('vessel_config')
    .select('storage_limit_bytes')
    .eq('created_by', uid)
    .maybeSingle();
  return Number(data?.storage_limit_bytes ?? DEFAULT_LIMIT_BYTES);
}

async function wornFor(supabase: Supabase, bucket: Bucket, uid: string): Promise<string | null> {
  if (bucket === 'interiors') {
    const { data } = await supabase.from('vessel_config').select('interior_url').eq('created_by', uid).maybeSingle();
    return data?.interior_url ?? null;
  }
  const { data } = await supabase.from('community_profiles').select('exterior_url').eq('created_by', uid).maybeSingle();
  return data?.exterior_url ?? null;
}

async function clearWornIf(supabase: Supabase, bucket: Bucket, uid: string, names: string[]) {
  const worn = await wornFor(supabase, bucket, uid);
  if (!worn) return;
  const hit = names.some((name) => worn === `${uid}/${name}` || worn.endsWith(`/${uid}/${name}`));
  if (!hit) return;
  if (bucket === 'interiors') {
    await supabase.from('vessel_config').update({ interior_url: null }).eq('created_by', uid);
  } else {
    await supabase.from('community_profiles').update({ exterior_url: null }).eq('created_by', uid);
  }
}

export async function GET(request: NextRequest, ctx: Ctx) {
  const opened = await open(ctx);
  if ('error' in opened) return opened.error;
  const { bucket, supabase, uid } = opened;
  try {
    const objects = await listOwn(supabase, bucket, uid);

    if (request.nextUrl.searchParams.get('export') === '1') {
      const files: Record<string, Uint8Array> = {};
      for (const object of objects) {
        const { data, error } = await supabase.storage.from(bucket).download(`${uid}/${object.name}`);
        if (error || !data) continue;
        files[object.name] = new Uint8Array(await data.arrayBuffer());
      }
      const zipped = zipSync(files, { level: 0 });
      const body = zipped.buffer.slice(zipped.byteOffset, zipped.byteOffset + zipped.byteLength) as ArrayBuffer;
      const stamp = new Date().toISOString().slice(0, 10);
      return new NextResponse(body, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${bucket}-${stamp}.zip"`,
        },
      });
    }

    const [items, used, limit, worn] = await Promise.all([
      withUrls(supabase, bucket, uid, objects),
      usedBytes(supabase, uid),
      limitBytes(supabase, uid),
      wornFor(supabase, bucket, uid),
    ]);
    return NextResponse.json({ success: true, data: { items, used, limit, worn } });
  } catch (error) {
    console.error('Inventory read error:', error);
    return fail('Failed to read the shelf', 500);
  }
}

export async function POST(request: NextRequest, ctx: Ctx) {
  const opened = await open(ctx);
  if ('error' in opened) return opened.error;
  const { bucket, supabase, uid } = opened;
  try {
    const form = await request.formData();
    const file = form.get('file');
    const replace = form.get('replace');
    if (!(file instanceof File)) return fail('A file is required', 400);
    if (!ACCEPTED_TYPES.includes(file.type)) return fail('png, jpeg, webp, or gif only', 415);
    if (file.size > MAX_FILE_BYTES) return fail('Each file may be at most 10 MB', 413);

    const objects = await listOwn(supabase, bucket, uid);
    const replaceName = typeof replace === 'string' && replace ? replace : null;
    const replacing = replaceName ? objects.find((object) => object.name === replaceName) : undefined;
    if (replaceName && !replacing) return fail('Nothing by that name to replace', 404);

    const [used, limit] = await Promise.all([usedBytes(supabase, uid), limitBytes(supabase, uid)]);
    const after = used - (replacing ? sizeOf(replacing) : 0) + file.size;
    if (after > limit) return fail('Not enough room on the shelf', 413, { used, limit });

    const safe = file.name.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'graphic';
    const name = replacing ? replacing.name : `${Date.now()}-${safe}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(`${uid}/${name}`, file, { upsert: Boolean(replacing), contentType: file.type });
    if (error) throw error;

    const fresh = await listOwn(supabase, bucket, uid);
    const stored = fresh.find((object) => object.name === name);
    const [item] = stored ? await withUrls(supabase, bucket, uid, [stored]) : [];
    return NextResponse.json({
      success: true,
      data: { item: item ?? { name, size: file.size, createdAt: null, url: null }, used: after, limit },
    });
  } catch (error) {
    console.error('Inventory upload error:', error);
    return fail('The upload did not land', 500);
  }
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const opened = await open(ctx);
  if ('error' in opened) return opened.error;
  const { bucket, supabase, uid } = opened;
  try {
    const body = (await request.json().catch(() => ({}))) as { name?: unknown; all?: unknown };
    const objects = await listOwn(supabase, bucket, uid);
    const names = body.all === true
      ? objects.map((object) => object.name)
      : typeof body.name === 'string' && objects.some((object) => object.name === body.name)
        ? [body.name]
        : [];
    if (names.length === 0) return NextResponse.json({ success: true, data: { removed: 0 } });

    const { error } = await supabase.storage.from(bucket).remove(names.map((name) => `${uid}/${name}`));
    if (error) throw error;
    await clearWornIf(supabase, bucket, uid, names);

    const [used, limit] = await Promise.all([usedBytes(supabase, uid), limitBytes(supabase, uid)]);
    return NextResponse.json({ success: true, data: { removed: names.length, used, limit } });
  } catch (error) {
    console.error('Inventory remove error:', error);
    return fail('Nothing was removed', 500);
  }
}
