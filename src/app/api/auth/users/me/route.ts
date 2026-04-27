// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { ProductsFormData } from '@/types/generated/plutus-economics/products';
import type { PublicProfiles } from '@/types/generated/hestia-core/profiles';
export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch full profile with all relations
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        community_profiles!fk_community_profiles_profile_id (*),
        creator_profiles!fk_creator_profile_id (*),
        vendor_profiles!fk_vendor_profiles_profile_id (*),
        user_badges!user_badges_user_id_fkey (
          *,
          badge
        )
      `)
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      // Still return basic user info even if profile fetch fails
      return NextResponse.json({
        user,
        profile: null,
        badges: [],
        products: [],
        recentSales: [],
      });
    }

    // Get user's products (if creator) - properly typed
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

    // Get recent activity (sales, etc.)
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

    // Get user's badges count
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