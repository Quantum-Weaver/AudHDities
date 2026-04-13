// =====================================================
// FILE: app/api/rate_limits/route.ts
// GENERATED: 2026-04-10T22:05:14.469Z
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { errorResponse, getAuthenticatedUser, getFilters, getOptionalUser, getPaginationParams, getSortParams, successResponse, unauthorized } from 'src/lib/api/auth';
import { RateLimitsInsertSchema } from 'src/lib/validators/rate_limits';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { userId } = await getOptionalUser(request);
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('rate_limits' as any).select('*', { count: 'exact' });
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    query = query.order(sortColumn, { ascending });
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return successResponse({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching rate_limits:', error);
    return errorResponse('Failed to fetch rate_limits', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const validated = RateLimitsInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('rate_limits' as any)
      .insert({ ...validated, created_by: userId })
      .select()
      .single();
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error creating rate_limits:', error);
    return errorResponse('Failed to create rate_limits', 500);
  }
}
