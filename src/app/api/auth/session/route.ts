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

    const profileRes = await supabase
      .from('community_profiles')
      .select('*')
      .eq('created_by', user.id)
      .maybeSingle();

    if (profileRes.error) {
      console.error('Profile fetch error:', profileRes.error);
    }

    return NextResponse.json({
      user,
      profile: profileRes.data || null,
      roles: profileRes.data?.roles ?? [],
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}