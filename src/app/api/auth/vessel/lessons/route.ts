// src/app/api/auth/vessel/lessons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { readMarks, setMark } from '@/lib/lessons/store';
import { awardSigils } from '@/lib/sigils/award';
import type { MarkAction } from '@/lib/lessons/marks';

const ACTIONS: readonly MarkAction[] = ['mark', 'unmark'];

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

async function open() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: fail('Authentication required', 401) };
  return { supabase, uid: user.id };
}

async function lessonExists(supabase: Awaited<ReturnType<typeof createServerSupabase>>, lessonId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('id')
    .eq('id', lessonId)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function GET(request: NextRequest) {
  const opened = await open();
  if ('error' in opened) return opened.error;
  try {
    const lessonId = request.nextUrl.searchParams.get('lesson_id') ?? undefined;
    const read = await readMarks(opened.supabase, opened.uid, lessonId);
    if (!read.ok && read.ready) return fail('Failed to read the marks', 500);
    return NextResponse.json({ success: true, data: read.marks, ready: read.ready });
  } catch (error) {
    console.error('Lesson mark read error:', error);
    return fail('Failed to read the marks', 500);
  }
}

export async function POST(request: NextRequest) {
  const opened = await open();
  if ('error' in opened) return opened.error;
  const { supabase, uid } = opened;
  try {
    const body = (await request.json().catch(() => ({}))) as {
      lesson_id?: unknown;
      action?: unknown;
    };
    const lessonId = typeof body.lesson_id === 'string' ? body.lesson_id : '';
    const action = ACTIONS.find((a) => a === body.action);
    if (!lessonId || !action) return fail('lesson_id and action are required', 400);

    if (!(await lessonExists(supabase, lessonId))) return fail('No such lesson', 404);

    const done = action === 'mark';
    const written = await setMark(supabase, uid, lessonId, done);
    if (!written.ready) return fail('The marks have no shelf yet', 503);
    if (!written.ok) return fail('The mark did not land', 500);

    const sigils = done ? await awardSigils(supabase, uid) : [];
    const read = await readMarks(supabase, uid, lessonId);
    return NextResponse.json({ success: true, data: read.marks[0] ?? null, sigils });
  } catch (error) {
    console.error('Lesson mark write error:', error);
    return fail('The mark did not land', 500);
  }
}
