/* @/app/api/users/[id]]/route.ts */
import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const supabase = await createServerSupabase();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // Fetch extended profiles
  const [creator, vendor, community] = await Promise.all([
    supabase.from('creator_profiles').select('*').eq('id', profile.id).single(),
    supabase.from('vendor_profiles').select('*').eq('id', profile.id).single(),
    supabase.from('community_profiles').select('*').eq('id', profile.id).single()
  ]);

  return NextResponse.json({
    profile,
    creator: creator.data,
    vendor: vendor.data,
    community: community.data
  });
}