// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for product moderation
const productModerationSchema = z.object({
  is_published: z.boolean().optional(),
  active: z.boolean().optional(),
  flag_reason: z.string().optional(),
});

// =====================================================
// GET /api/admin/products
// List all products for moderation
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - status: 'published' | 'draft' | 'flagged' (optional)
//   - search: string (optional)
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
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('products')
      .select(`
        *,
        creator:creator_id (
          id,
          username,
          display_name,
          email
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });
    
    if (status === 'published') {
      query = query.eq('is_published', true).eq('active', true);
    } else if (status === 'draft') {
      query = query.eq('is_published', false);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,creator.display_name.ilike.%${search}%`);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      products: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Admin products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/admin/products/[id]
// Moderate a product (admin only)
// =====================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
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
    
    const body = await request.json();
    const validationResult = productModerationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid moderation data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const updates = validationResult.data;
    
    // Get product before update for logging
    const { data: product } = await supabase
      .from('products')
      .select('title, creator_id')
      .eq('id', id)
      .single();
    
    // Update product
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }
    
    // Log admin action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: user.id,
        action: 'moderate_product',
        target_id: id,
        target_type: 'product',
        public_note: updates.is_published !== undefined 
          ? `${updates.is_published ? 'Published' : 'Unpublished'} product: ${product?.title}`
          : `Updated product: ${product?.title}`,
        metadata: updates,
      });
    
    return NextResponse.json({
      success: true,
      product: data,
      message: 'Product updated successfully',
    });
    
  } catch (error) {
    console.error('Product moderation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}