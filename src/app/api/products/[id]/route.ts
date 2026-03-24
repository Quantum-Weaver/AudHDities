// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for product update (same as create but all fields optional)
const productUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200).optional(),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional(),
  description: z.string().optional(),
  product_type: z.enum([
    'digital_course', 'digital_download', 'digital_membership', 'digital_subscription', 'digital_bundle',
    'physical_product', 'physical_handmade', 'physical_manufactured', 'physical_custom',
    'audio', 'video', 'podcast', 'music', 'livestream',
    'event_live', 'event_virtual', 'workshop', 'class', 'consultation',
    'service', 'commission', 'contract', 'sponsorship',
    'mutual_aid', 'crowdfunding', 'tip', 'donation',
    'clothing', 'accessory', 'fabric', 'pattern',
    'bundle', 'kit', 'subscription_box'
  ]).optional(),
  price_ally: z.number().min(0, "Price must be 0 or greater").optional(),
  price_community: z.number().min(0).optional().nullable(),
  price_corporate: z.number().min(0).optional().nullable(),
  is_recurring: z.boolean().optional(),
  recurring_interval: z.enum(['month', 'year']).optional().nullable(),
  residual_pool_percent: z.number().min(0).max(100).optional(),
  sanctuary_infrastructure_percent: z.number().min(0).max(100).optional(),
  category: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  media_urls: z.array(z.string().url()).optional(),
  download_url: z.string().url().optional().nullable(),
  preview_image: z.string().url().optional().nullable(),
  bigot_tax_cents: z.number().min(0).optional(),
  is_published: z.boolean().optional(),
  active: z.boolean().optional(),
});

// Helper function to check if user owns the product
async function userOwnsProduct(supabase: any, productId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('products')
    .select('creator_id')
    .eq('id', productId)
    .single();
  
  if (error || !data) return false;
  return data.creator_id === userId;
}

// Helper function to check if user is admin
async function isAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();
  
  return data?.is_admin === true;
}

// =====================================================
// GET /api/products/[id]
// Retrieve a single product by ID
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = params;
    
    // Get current user for visibility checks
    const { data: { user } } = await supabase.auth.getUser();
    
    // Fetch product with creator info
    let query = supabase
      .from('products')
      .select('*, creator:creator_id(username, display_name, avatar_url)')
      .eq('id', id);
    
    const { data: product, error } = await query.single();
    
    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check visibility: published products are public, drafts require ownership or admin
    const isOwner = user && product.creator_id === user.id;
    const isAdminUser = user ? await isAdmin(supabase, user.id) : false;
    
    if (!product.is_published && !isOwner && !isAdminUser) {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PUT /api/products/[id]
// Update a product (full update)
// =====================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check ownership or admin
    const ownsProduct = await userOwnsProduct(supabase, id, user.id);
    const isAdminUser = await isAdmin(supabase, user.id);
    
    if (!ownsProduct && !isAdminUser) {
      return NextResponse.json(
        { error: 'You do not have permission to update this product' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = productUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid product data',
          details: validationResult.error 
        },
        { status: 400 }
      );
    }
    
    const updates = validationResult.data;
    
    // If slug is being changed, check for uniqueness
    if (updates.slug) {
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', id)
        .maybeSingle();
      
      if (existing) {
        return NextResponse.json(
          { error: 'Slug already in use by another product' },
          { status: 409 }
        );
      }
    }
    
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
    
    return NextResponse.json({
      success: true,
      product: data,
      message: 'Product updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/products/[id]
// Partial update of a product
// =====================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // PATCH is functionally the same as PUT for our purposes
  // since we use partial validation
  return PUT(request, { params });
}

// =====================================================
// DELETE /api/products/[id]
// Delete a product (soft delete or hard delete)
// =====================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check ownership or admin
    const ownsProduct = await userOwnsProduct(supabase, id, user.id);
    const isAdminUser = await isAdmin(supabase, user.id);
    
    if (!ownsProduct && !isAdminUser) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this product' },
        { status: 403 }
      );
    }
    
    // Get product info before deletion for creator stats update
    const { data: product } = await supabase
      .from('products')
      .select('creator_id, is_published')
      .eq('id', id)
      .single();
    
    // Option 1: Soft delete (set active = false) - Recommended
    // This preserves data for residual calculations and history
    const { data, error } = await supabase
      .from('products')
      .update({
        active: false,
        is_published: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      // Option 2: Hard delete (if soft delete fails or is desired)
      // Comment out the above and uncomment below for hard delete
      /*
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      */
      
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
    
    // Update creator profile stats
    if (product) {
      const { data: creatorProfile } = await supabase
        .from('creator_profiles')
        .select('total_products')
        .eq('id', product.creator_id)
        .single();
      
      if (creatorProfile) {
        await supabase
          .from('creator_profiles')
          .update({
            total_products: Math.max(0, (creatorProfile.total_products || 0) - 1)
          })
          .eq('id', product.creator_id);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}