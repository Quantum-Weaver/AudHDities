// app/api/creators/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const verifiedOnly = searchParams.get('verified') === 'true';
    
    const offset = (page - 1) * limit;
    
    // FIXED: Use explicit foreign key reference with !fk
    let query = supabase
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
          total_products,
          total_sales,
          total_earnings
        )
      `, { count: 'exact' })
      .eq('is_creator', true);
    
    // Apply filters
    if (verifiedOnly) {
      query = query.eq('creator_profiles.verified_badge', true);
    }
    
    if (search) {
      query = query.or(`display_name.ilike.%${search}%,username.ilike.%${search}%`);
    }
    
    if (category) {
      query = query.contains('creator_profiles.creative_categories', [category]);
    }
    
    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Creators API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      creators: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Creators API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}