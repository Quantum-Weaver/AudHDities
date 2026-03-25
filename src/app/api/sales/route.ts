// src/app/api/sales/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    // Optional filters
    const buyerId = searchParams.get('buyerId');
    const productId = searchParams.get('productId');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    let query = supabase
      .from('sales')
      .select(`
        *,
        product:products(title, slug, preview_image),
        buyer:profiles(username, display_name, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (buyerId) {
      query = query.eq('buyer_id', buyerId);
    }
    
    if (productId) {
      query = query.eq('product_id', productId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ sales: data || [] });
    
  } catch (error) {
    console.error('Sales API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}