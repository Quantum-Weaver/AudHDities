// src/app/api/residuals/my/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

// Helper to validate and normalize status
function normalizeStatus(status: string | null): 'pending' | 'paid' | 'failed' | null {
  if (!status) return null;
  if (status === 'pending' || status === 'paid' || status === 'failed') {
    return status;
  }
  return null;
}

interface EarningsByProduct {
  productId: string;
  productTitle: string;
  totalEarned: number;
  pending: number;
  paid: number;
  transactions: number;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const normalizedStatus = normalizeStatus(statusParam);

    // Fetch all residuals for the authenticated user
    let query = supabase
      .from('residual_payouts')
      .select(`
        *,
        product:product_id (
          id,
          title,
          slug,
          creator:creator_id (
            username,
            display_name
          )
        ),
        sale:sale_id (
          id,
          created_at,
          buyer:buyer_id (
            username,
            display_name
          )
        )
      `)
      .eq('contributor_id', user.id);

    if (normalizedStatus) {
      query = query.eq('status', normalizedStatus);
    }

    const { data: residuals, error } = await query
      .order('created_at', { ascending: false });

    if (error) {
      console.error('My residuals fetch error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Calculate earnings by product with safe null handling
    const earningsByProduct: Record<string, EarningsByProduct> = {};
    
    (residuals || []).forEach(r => {
      const productId = r.product_id;
      if (!productId) return; // Skip if no product_id
      
      const amount = typeof r.amount === 'number' ? r.amount : 0;
      const productTitle = r.product?.title || 'Unknown Product';
      
      if (!earningsByProduct[productId]) {
        earningsByProduct[productId] = {
          productId,
          productTitle,
          totalEarned: 0,
          pending: 0,
          paid: 0,
          transactions: 0,
        };
      }
      
      earningsByProduct[productId].totalEarned += amount;
      earningsByProduct[productId].transactions += 1;
      
      if (r.status === 'pending') {
        earningsByProduct[productId].pending += amount;
      } else if (r.status === 'paid') {
        earningsByProduct[productId].paid += amount;
      }
    });

    // Calculate totals with safe null handling
    const totalEarned = residuals?.reduce((sum, r) => {
      const amount = typeof r.amount === 'number' ? r.amount : 0;
      return sum + amount;
    }, 0) || 0;
    
    const totalPending = residuals?.reduce((sum, r) => {
      if (r.status === 'pending') {
        const amount = typeof r.amount === 'number' ? r.amount : 0;
        return sum + amount;
      }
      return sum;
    }, 0) || 0;
    
    const totalPaid = residuals?.reduce((sum, r) => {
      if (r.status === 'paid') {
        const amount = typeof r.amount === 'number' ? r.amount : 0;
        return sum + amount;
      }
      return sum;
    }, 0) || 0;

    return NextResponse.json({
      residuals: residuals || [],
      earningsByProduct: Object.values(earningsByProduct),
      summary: {
        totalEarned,
        totalPending,
        totalPaid,
        totalTransactions: residuals?.length || 0,
        uniqueProducts: Object.keys(earningsByProduct).length,
      },
    });

  } catch (error) {
    console.error('My residuals API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}