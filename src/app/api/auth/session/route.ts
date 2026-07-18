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

    // The profiles join-tree died with its table; the session's identity is
    // community_profiles plus the user's roles.
    const [profileRes, rolesRes] = await Promise.all([
      supabase.from('community_profiles').select('*').eq('created_by', user.id).maybeSingle(),
      supabase.from('user_roles').select('role').eq('user_id', user.id),
    ]);

    if (profileRes.error) {
      console.error('Profile fetch error:', profileRes.error);
    }

    return NextResponse.json({
      user,
      profile: profileRes.data || null,
      roles: (rolesRes.data ?? []).map(r => r.role),
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}