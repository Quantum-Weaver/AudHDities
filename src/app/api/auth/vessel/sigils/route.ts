// src/app/api/auth/vessel/sigils/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { awardSigils } from '@/lib/sigils/award';

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

async function open() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: fail('Authentication required', 401) };
  return { supabase, uid: user.id };
}

export async function GET() {
  const opened = await open();
  if ('error' in opened) return opened.error;
  const { data, error } = await opened.supabase
    .from('vessel_sigils')
    .select('sigil_id, awarded_at, award_context')
    .eq('user_id', opened.uid)
    .order('awarded_at', { ascending: false })
    .limit(500);
  if (error) {
    console.error('Sigil read error:', error);
    return fail('Failed to read the marks', 500);
  }
  return NextResponse.json({ success: true, data: data ?? [] });
}

export async function POST() {
  const opened = await open();
  if ('error' in opened) return opened.error;
  try {
    const awarded = await awardSigils(opened.supabase, opened.uid);
    return NextResponse.json({ success: true, data: awarded });
  } catch (error) {
    console.error('Sigil award error:', error);
    return fail('The marks were not read', 500);
  }
}
