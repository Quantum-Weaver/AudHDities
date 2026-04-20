// =====================================================
// API ROUTE: /api/hestia-core/profiles
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabase();
  const body = await request.json();
  const { data, error } = await supabase.from('profiles').insert(body).select().single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data }, { status: 201 });
}
