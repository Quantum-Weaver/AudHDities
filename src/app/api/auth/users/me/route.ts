// src/app/api/auth/users/me/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const [profileRes, rolesRes, sigilsRes] = await Promise.all([
      supabase.from('community_profiles').select('*').eq('created_by', user.id).maybeSingle(),
      supabase.from('user_roles').select('role').eq('user_id', user.id),
      supabase.from('vessel_sigils').select('*').eq('user_id', user.id),
    ]);

    const profile = profileRes.data ?? null;
    const roles = (rolesRes.data ?? []).map(r => r.role);
    const sigils = sigilsRes.data ?? [];

    if (profileRes.error) {
      console.error('Profile fetch error:', profileRes.error);
    }

    let wares: unknown[] = [];
    if (roles.includes('creator') || roles.includes('vendor')) {
      const { data: userWares } = await supabase
        .from('wares')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      wares = userWares || [];
    }

    const { data: exchanges } = await supabase
      .from('exchanges')
      .select('*, wares!exchanges_ware_id_fkey (name, slug)')
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      user,
      profile,
      roles,
      badges: sigils,
      badgeCount: sigils.length,
      products: wares,
      recentSales: exchanges || [],
    });

  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
