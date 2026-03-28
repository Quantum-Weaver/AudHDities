// src/app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';

// =====================================================
// GET /api/admin/users
// List users with pagination and filters
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - search: string (optional)
//   - role: 'admin' | 'creator' | 'vendor' (optional)
//   - status: string (optional)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
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
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const role = searchParams.get('role');
    const statusFilter = searchParams.get('status');
    
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    
    if (search) {
      query = query.or(`display_name.ilike.%${search}%,username.ilike.%${search}%,email.ilike.%${search}%`);
    }
    
    if (role === 'admin') {
      query = query.eq('is_admin', true);
    } else if (role === 'creator') {
      query = query.eq('is_creator', true);
    } else if (role === 'vendor') {
      query = query.eq('is_vendor', true);
    }
    
    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
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
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}