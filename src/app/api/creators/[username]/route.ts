// src/app/api/creators/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { ProfileWithRelations } from '@/types/supabase/tables/profiles';
import type { CreatorProfileWithRelations } from '@/types/supabase/tables/creator_profiles';
import type { ProductWithCreator } from '@/types/supabase/tables/products';

// Combined type for creator detail
export type CreatorDetail = ProfileWithRelations & {
  creator_profiles: CreatorProfileWithRelations | null;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { username } = params;
    
    // Fetch creator profile with explicit foreign key
    const { data: creator, error } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        bio,
        created_at,
        creator_profiles!creator_profiles_id_fkey (
          verified_badge,
          verification_status,
          creative_categories,
          creative_description,
          portfolio_url,
          total_products,
          total_sales,
          total_earnings,
          default_residual_pool
        )
      `)
      .eq('username', username)
      .eq('is_creator', true)
      .maybeSingle();  // Changed from .single()
    
    if (error || !creator) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Fetch creator's products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('creator_id', creator.id)
      .eq('is_published', true)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    if (productsError) {
      console.error('Error fetching creator products:', productsError);
      // Don't fail the request, just return empty products
    }
    
    // Type-safe response
    return NextResponse.json({
      creator: creator as CreatorDetail,
      products: (products || []) as ProductWithCreator[],
    });
    
  } catch (error) {
    console.error('Creator API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}