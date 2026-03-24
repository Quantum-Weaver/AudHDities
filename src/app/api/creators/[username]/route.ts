// src/app/api/creators/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { username } = params;
    
    // Fetch creator profile
    const { data: creator, error } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        banner_url,
        bio,
        created_at,
        creator_profiles!inner (
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
      .single();
    
    if (error || !creator) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Fetch creator's products
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('creator_id', creator.id)
      .eq('is_published', true)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    return NextResponse.json({
      creator,
      products: products || [],
    });
    
  } catch (error) {
    console.error('Creator API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}