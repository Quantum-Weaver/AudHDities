// src/app/api/residuals/route.ts
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
      .select('is_admin')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.is_admin === true;

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const statusParam = searchParams.get('status');
    const contributorId = searchParams.get('contributorId');
    
    const offset = (page - 1) * limit;
    const normalizedStatus = normalizeStatus(statusParam);

    // Build query
    let query = supabase
      .from('residual_payouts')
      .select(`
        *,
        product:product_id (
          id,
          title,
          slug
        ),
        contributor:contributor_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        sale:sale_id (
          id,
          created_at,
          buyer:buyer_id (
            username,
            display_name
          )
        )
      `, { count: 'exact' });

    // Apply filters based on user role
    if (!isAdmin) {
      // Users only see their own residuals
      query = query.eq('contributor_id', user.id);
    } else if (contributorId) {
      query = query.eq('contributor_id', contributorId);
    }

    if (normalizedStatus) {
      query = query.eq('status', normalizedStatus);
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: residuals, error, count } = await query;

    if (error) {
      console.error('Residuals fetch error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Calculate summary stats with safe null handling
    const totalPending = residuals?.reduce((sum, r) => {
      if (r.status === 'pending') {
        return sum + (typeof r.amount === 'number' ? r.amount : 0);
      }
      return sum;
    }, 0) || 0;
    
    const totalPaid = residuals?.reduce((sum, r) => {
      if (r.status === 'paid') {
        return sum + (typeof r.amount === 'number' ? r.amount : 0);
      }
      return sum;
    }, 0) || 0;
    
    const totalEarned = totalPending + totalPaid;

    return NextResponse.json({
      residuals: residuals || [],
      summary: {
        totalEarned,
        totalPending,
        totalPaid,
        count: residuals?.length || 0,
      },
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });

  } catch (error) {
    console.error('Residuals API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}