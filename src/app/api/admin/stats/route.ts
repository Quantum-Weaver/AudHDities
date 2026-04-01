// src/app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';

// =====================================================
// GET /api/admin/stats
// Get platform statistics (admin only)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Get user counts
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    const { count: creators } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_creator', true);
    
    const { count: vendors } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_vendor', true);
    
    const { count: admins } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_admin', true);
    
    // Get product counts
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: publishedProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .eq('active', true);
    
    // Get sales stats
    const { data: salesData } = await supabase
      .from('sales')
      .select('gross_amount, created_at')
      .order('created_at', { ascending: false });
    
    const totalRevenue = salesData?.reduce((sum, sale) => sum + (sale.gross_amount || 0), 0) || 0;
    
    // Get last 7 days sales
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSales = salesData?.filter(sale => 
      sale.created_at && new Date(sale.created_at) >= sevenDaysAgo
    ) || [];
    
    const recentRevenue = recentSales.reduce((sum, sale) => sum + (sale.gross_amount || 0), 0);
    
    // Get pending applications
    const { count: pendingCreatorApps } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('application_type', 'creator')
      .eq('status', 'pending');
    
    const { count: pendingVendorApps } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('application_type', 'vendor')
      .eq('status', 'pending');
    
    return NextResponse.json({
      users: {
        total: totalUsers || 0,
        creators: creators || 0,
        vendors: vendors || 0,
        admins: admins || 0,
      },
      products: {
        total: totalProducts || 0,
        published: publishedProducts || 0,
      },
      revenue: {
        total: totalRevenue,
        last_7_days: recentRevenue,
      },
      applications: {
        creator_pending: pendingCreatorApps || 0,
        vendor_pending: pendingVendorApps || 0,
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}