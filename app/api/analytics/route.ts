// =====================================================
// FILE: app/api/analytics/route.ts
// GENERATED: 2026-04-06T00:00:37.943Z
// METHODS: GET_LIST, POST
// =====================================================

// =====================================================
// GET /api/analytics - List analytics
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';
import { getOptionalUser } from '@/lib/api/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { userId } = await getOptionalUser(request);
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('analytics').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sortColumn, { ascending });
    
    // Apply pagination
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
    console.error('Error fetching analytics:', error);
    return errorResponse('Failed to fetch analytics', 500);
  }
}

// =====================================================
// POST /api/analytics - Create analytics
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized } from '@/lib/api/auth';
import { getAuthenticatedUser } from '@/lib/api/auth';
import { AnalyticsInsertSchema } from '@/lib/validators/analytics';

export async function POST(request: NextRequest) {
  try {
    const { userId, success, error: authError, status } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const validated = AnalyticsInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('analytics')
      .insert({ ...validated, created_by: userId })
      .select()
      .single();
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    console.error('Error creating analytics:', error);
    return errorResponse('Failed to create analytics', 500);
  }
}

