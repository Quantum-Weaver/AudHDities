// src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { session: null, user: null },
        { status: 200 }
      );
    }

    // Get full profile with relations
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        community_profiles (*),
        creator_profiles (*),
        vendor_profiles (*)
      `)
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
    }

    return NextResponse.json({
      session,
      user: session.user,
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