import { errorResponse, getAuthenticatedUser, getFilters, getOptionalUser, getPaginationParams, getSortParams, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SalesInsertSchema } from '@/lib/validators/generated/plutus-economics/sales';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:59.043Z
// Table: sales

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('sales').select('*', { count: 'exact' });
    
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
      pagination: { page, limit, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return errorResponse('Failed to fetch sales', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const body = await request.json();
    const validated = SalesInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('sales')
      .insert({ ...validated, created_by: userId })
      .select()
      .single();
    
    if (error) throw error;
    return successResponse(data, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error creating sales:', error);
    return errorResponse('Failed to create sales', 500);
  }
}
