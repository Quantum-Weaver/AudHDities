// app/api/sales/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, is_creator')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.is_admin === true;
    const isCreator = profile?.is_creator === true;

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const productId = searchParams.get('productId');
    const status = searchParams.get('status');
    
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('sales')
      .select(`
        *,
        products!inner (
          id,
          title,
          slug,
          creator_id
        ),
        buyer:buyer_id (
          id,
          username,
          display_name
        )
      `, { count: 'exact' });

    // Apply filters based on user role
    if (!isAdmin) {
      if (isCreator) {
        // Creators see sales of their own products
        query = query.eq('products.creator_id', user.id);
      } else {
        // Regular users see their own purchases
        query = query.eq('buyer_id', user.id);
      }
    }

    if (productId) {
      query = query.eq('product_id', productId);
    }

    if (status) {
      query = query.eq('payment_status', status);
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: sales, error, count } = await query;

    if (error) {
      console.error('Sales fetch error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sales: sales || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });

  } catch (error) {
    console.error('Sales API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}