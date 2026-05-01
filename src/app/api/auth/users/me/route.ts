// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { ProductsFormData } from '@/types/generated/plutus-economics/products';
import type { PublicProfiles } from '@/types/generated/hestia-core/profiles';

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

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        community_profiles!fk_community_profiles_profile_id (*),
        creator_profiles!fk_creator_profile_id (*),
        vendor_profiles!fk_vendor_profiles_profile_id (*),
        user_badges!user_badges_user_id_fkey (
          *,
          badges!user_badges_badge_id_fkey (*)
        )
      `)
      .eq('profiles_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return NextResponse.json({
        user,
        profile: null,
        badges: [],
        products: [],
        recentSales: [],
      });
    }

    let products: ProductsFormData[] = [];
    if (profile.is_creator) {
      const { data: userProducts } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      products = (userProducts as ProductsFormData[]) || [];
    }

    let recentSales: any[] = [];
    const { data: sales } = await supabase
      .from('sales')
      .select(`
        *,
        products!sales_product_id_fkey (
          title, 
          slug
        )
      `)
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    recentSales = sales || [];

    const badgeCount = profile.user_badges?.length || 0;

    return NextResponse.json({
      user,
      profile,
      badges: profile.user_badges || [],
      badgeCount,
      products,
      recentSales,
    });
    
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}