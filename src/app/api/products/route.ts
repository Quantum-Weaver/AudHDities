// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { productTypeLabels, productOwnerTypeLabels } from '@/types/supabase/tables/products';
import type { ProductWithCreator } from '@/types/supabase/tables/products';
import { PRODUCT_CATEGORY_MAP } from '@/types/categories';
import { z } from 'zod';
import { Database } from '@/types/supabase/database.types';

// Validation schema for product creation
const productCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  owner_type: z.enum(Object.keys(productOwnerTypeLabels) as [string, ...string[]]),
  product_type: z.enum(Object.keys(productTypeLabels) as [string, ...string[]]),
  price_ally: z.number().min(0, "Price must be 0 or greater"),
  price_community: z.number().min(0, "Price must be 0 or greater"),
  price_corporate: z.number().min(0, "Price must be 0 or greater"),
  is_recurring: z.boolean().optional().default(false),
  recurring_interval: z.enum(['month', 'year']).optional().nullable(),
  residual_pool_percent: z.number().min(0).max(100).optional().default(30),
  sanctuary_infrastructure_percent: z.number().min(0).max(100).optional().default(10),
  category: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  media_urls: z.array(z.string().url()).optional().default([]),
  download_url: z.string().url().optional().nullable(),
  preview_image: z.string().url().optional().nullable(),
  bigot_tax_cents: z.number().min(0).optional().default(0),
  is_published: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  collaborators: z.array(z.string()).optional().default([]),
  stripe_product_id: z.string().optional().nullable(),
  stripe_price_id: z.string().optional().nullable()
});

// Validation schema for product update
const productUpdateSchema = productCreateSchema.partial();

// Helper function to generate unique slug if needed
async function generateUniqueSlug(supabase: any, baseSlug: string, creatorId: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  let exists = true;
  
  while (exists) {
    const { data } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    
    if (!data) {
      exists = false;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  
  return slug;
}

// =====================================================
// GET /api/products
// Query parameters:
//   - creator_id: string (optional) - filter by creator
//   - published_only: boolean (default true) - show only published products
//   - limit: number (default 20)
//   - offset: number (default 0)
//   - category: string (optional)
//   - tag: string (optional)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creator_id');
    const publishedOnly = searchParams.get('published_only') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    
    // Build query
    let query = supabase
      .from('products')
      .select('*, creator:creator_id(username, display_name, avatar_url)');
    
    // Filter by creator
    if (creatorId) {
      query = query.eq('creator_id', creatorId);
    }
    
    // Filter by published status
    if (publishedOnly) {
      query = query.eq('is_published', true).eq('active', true);
    }
    
    // Filter by category (array contains)
    if (category) {
      query = query.contains('category', [category]);
    }
    
    // Filter by tag (array contains)
    if (tag) {
      query = query.contains('tags', [tag]);
    }
    
    // Pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    // Get total count for pagination
    const countQuery = supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    if (creatorId) {
      countQuery.eq('creator_id', creatorId);
    }
    if (publishedOnly) {
      countQuery.eq('is_published', true).eq('active', true);
    }
    if (category) {
      countQuery.contains('category', [category]);
    }
    if (tag) {
      countQuery.contains('tags', [tag]);
    }
    
    const { count } = await countQuery;
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      products: data as ProductWithCreator[],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0)
      }
    });
    
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/products
// Create a new product (requires authentication and creator status)
// =====================================================
export async function POST(request: NextRequest) {
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
    
    // Check if user is a creator
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_creator')
      .eq('id', user.id)
      .single();
    
    if (!profile?.is_creator) {
      return NextResponse.json(
        { error: 'Only verified creators can create products' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = productCreateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid product data',
          details: validationResult.error 
        },
        { status: 400 }
      );
    }

    const productData = validationResult.data;

    // Check if slug already exists (for this creator)
    const { data: existingSlug } = await supabase
      .from('products')
      .select('slug')
      .eq('slug', productData.slug)
      .maybeSingle();

    let finalSlug = productData.slug;
    if (existingSlug) {
      finalSlug = await generateUniqueSlug(supabase, productData.slug, user.id);
    }

    // Cast product_type to the correct enum type
    const typedProductData = {
      ...productData,
      product_type: productData.product_type as Database['public']['Enums']['product_type'],
    };

    // Create the product
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...typedProductData,
        slug: finalSlug,
        creator_id: user.id,
      })
      .select()
      .single();
    
    // Update creator profile stats (total_products)
    const { data: creatorProfile } = await supabase
      .from('creator_profiles')
      .select('total_products')
      .eq('id', user.id)
      .single();
    
    await supabase
      .from('creator_profiles')
      .update({
        total_products: (creatorProfile?.total_products || 0) + 1
      })
      .eq('id', user.id);
    
    return NextResponse.json({
      success: true,
      product: data,
      message: 'Product created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}