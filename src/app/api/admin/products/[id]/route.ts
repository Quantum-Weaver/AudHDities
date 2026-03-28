// src/app/api/admin/products/[id]/route.ts
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