// app/api/generated/plutus-economics/products/route.ts
// =====================================================
// PRODUCTS API - CRUD Operations
// =====================================================

import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

import { createApiSupabase } from '@/lib/api/supabase';
import {
  getAuthenticatedUser,
  successResponse,
  errorResponse,
  getPaginationParams,
  getFilters,
  getSortParams,
  unauthorized,
  forbidden,
  notFound,
} from '@/lib/api/auth';
import { handleValidationError, handleDatabaseError } from '@/lib/api/errors';
import { ProductsInsertSchema, ProductsUpdateSchema } from '@/lib/validators/generated/plutus-economics/products';
import { isAdmin, checkOwnership } from '@/lib/api/auth';

// =====================================================
// GET /api/generated/plutus-economics/products
// List products with pagination, filtering, sorting
// =====================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit } = getPaginationParams(new URL(request.url));
    const filters = getFilters(new URL(request.url));
    const { column: sortColumn, ascending } = getSortParams(new URL(request.url));
    
    const supabase = await createApiSupabase();
    
    // Start query
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        query = query.eq(key, value);
      }
    });
    
    // Apply sorting
    query = query.order(sortColumn, { ascending });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) {
      return handleDatabaseError(error);
    }
    
    const totalPages = Math.ceil((count || 0) / limit);
    
    return successResponse({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('GET /products error:', error);
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return errorResponse('Internal server error', 500);
  }
}

// =====================================================
// POST /api/generated/plutus-economics/products
// Create a new product
// =====================================================

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthenticatedUser(request);
    if (!auth.success) {
      return unauthorized();
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ProductsInsertSchema.parse(body);
    
    // Ensure creator_id matches authenticated user
    if (validatedData.creator_id !== auth.userId) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    
    // Check if user is a creator
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_creator, is_admin')
      .eq('id', auth.userId)
      .single();
    
    if (!profile?.is_creator && !profile?.is_admin) {
      return errorResponse('Only creators can create products', 403);
    }
    
    // Insert product
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...validatedData,
        created_by: auth.userId,
      })
      .select()
      .single();
    
    if (error) {
      return handleDatabaseError(error);
    }
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('POST /products error:', error);
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return errorResponse('Internal server error', 500);
  }
}
