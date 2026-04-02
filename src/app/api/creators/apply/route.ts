/* @/app/api/users/apply/route.ts */
import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const applicationData = await request.json();
  
  // Check if already a creator
  const { data: existing } = await supabase
    .from('creator_profiles')
    .select('id')
    .eq('id', user.id)
    .single();
  
  if (existing) {
    return NextResponse.json({ error: 'Already a creator' }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: user.id,
      application_type: 'creator',
      form_data: applicationData,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ application: data });
}