/* @/app/api/creators/route.ts */
import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const verified = searchParams.get('verified');
  
  let query = supabase
    .from('creator_profiles')
    .select('*, profiles(*)')
    .eq('verification_status', 'verified');
  
  if (category) {
    query = query.contains('creative_categories', [category]);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ creators: data });
}