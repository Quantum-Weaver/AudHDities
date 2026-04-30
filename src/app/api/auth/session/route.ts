// src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    // Get full profile with relations
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        community_profiles!fk_community_profiles_profile_id (*),
        creator_profiles!fk_creator_profile_id (*),
        vendor_profiles!fk_vendor_profiles_profile_id (*)
      `)
      .eq('profiles_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
    }

    return NextResponse.json({
      user,
      profile: profile || null,
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}