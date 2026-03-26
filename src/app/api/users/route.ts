// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const role = searchParams.get('role'); // 'creator', 'vendor', 'admin'
    const userTier = searchParams.get('tier'); // 'community', 'ally', 'corporate'
    
    const offset = (page - 1) * limit;
    
    // Build query
    let query = supabase
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        email,
        created_at,
        user_tier,
        is_creator,
        is_vendor,
        is_admin,
        sovereignty_score,
        creator_profiles!creator_profiles_id_fkey (
          verified_badge,
          verification_status,
          total_products,
          total_sales,
          total_earnings
        ),
        vendor_profiles!vendor_profiles_id_fkey (
          verified_badge,
          verification_status,
          business_name,
          total_products,
          total_sales,
          total_earnings
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });
    
    // Apply filters
    if (search) {
      query = query.or(`display_name.ilike.%${search}%,username.ilike.%${search}%,email.ilike.%${search}%`);
    }
    
    if (role === 'creator') {
      query = query.eq('is_creator', true);
    } else if (role === 'vendor') {
      query = query.eq('is_vendor', true);
    } else if (role === 'admin') {
      query = query.eq('is_admin', true);
    }
    
    if (userTier) {
      query = query.eq('user_tier', userTier);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Users API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      users: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}