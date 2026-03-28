// app/api/sales/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = params;
    
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

    // Fetch sale
    let query = supabase
      .from('sales')
      .select(`
        *,
        products!inner (
          id,
          title,
          slug,
          creator_id,
          creator:creator_id (
            id,
            username,
            display_name
          )
        ),
        buyer:buyer_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        residual_payouts (
          id,
          contributor_id,
          amount,
          status,
          calculation_note,
          contributor:contributor_id (
            username,
            display_name
          )
        )
      `)
      .eq('id', id);

    // Apply access control
    if (!isAdmin) {
      if (isCreator) {
        // Creators see sales of their own products
        query = query.eq('products.creator_id', user.id);
      } else {
        // Regular users see only their own purchases
        query = query.eq('buyer_id', user.id);
      }
    }

    const { data: sale, error } = await query.single();

    if (error || !sale) {
      return NextResponse.json(
        { error: 'Sale not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ sale });

  } catch (error) {
    console.error('Sale fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}