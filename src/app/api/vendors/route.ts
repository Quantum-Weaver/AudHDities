// src/app/api/vendors/route.ts
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
    
    // Build query with explicit foreign key reference
    let query = supabase
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        bio,
        created_at,
        vendor_profiles!vendor_profiles_id_fkey (
          business_name,
          business_type,
          business_description,
          business_logo_url,
          verified_badge,
          verification_status,
          product_categories,
          total_products,
          total_sales,
          total_earnings
        )
      `, { count: 'exact' })
      .eq('is_vendor', true);
    
    // Apply filters
    if (verifiedOnly) {
      query = query.eq('vendor_profiles.verified_badge', true);
    }
    
    if (search) {
      query = query.or(`vendor_profiles.business_name.ilike.%${search}%,display_name.ilike.%${search}%,username.ilike.%${search}%`);
    }
    
    if (category) {
      query = query.contains('vendor_profiles.product_categories', [category]);
    }
    
    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Vendors API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      vendors: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Vendors API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}