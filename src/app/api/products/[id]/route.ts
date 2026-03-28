// src/app/api/products/[id]/route.ts// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { ProductWithCreator } from '@/types/supabase/tables/products';
import { isUserAdmin } from '@/lib/auth/admin';

// =====================================================
// GET /api/products/[id]
// Retrieve a single product by ID
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Fetch product with creator info using explicit foreign key
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        creator:profiles!products_creator_id_fkey (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Get current user for visibility checks
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check visibility: published products are public, drafts require ownership
    const isOwner = user && product.creator_id === user.id;
    const isAdmin = user ? await isUserAdmin(supabase, user.id) : false;
    
    if (!product.is_published && !isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product: product as ProductWithCreator });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
