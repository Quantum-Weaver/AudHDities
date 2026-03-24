// src/app/api/vendors/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { username } = params;
    
    // Fetch vendor profile
    const { data: vendor, error } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        display_name,
        avatar_url,
        banner_url,
        bio,
        created_at,
        is_vendor,
        is_creator,
        is_admin,
        user_tier,
        sovereignty_score,
        primary_house,
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
      `)
      .eq('username', username)
      .eq('is_vendor', true)
      .maybeSingle();
    
    if (error || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }
    
    // Fetch vendor's products (vendors use creator_id for products)
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('creator_id', vendor.id)
      .eq('is_published', true)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    return NextResponse.json({
      vendor,
      products: products || [],
    });
    
  } catch (error) {
    console.error('Vendor API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}