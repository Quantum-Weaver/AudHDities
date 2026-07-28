import { errorResponse, getAuthenticatedUser, getFilters, getOptionalUser, getPaginationParams, getSortParams, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { UserPrivateInsertSchema } from '@/lib/validators/generated/hestia-core/user_private';
import { NextRequest } from 'next/server';

// Generated: 2026-07-28T15:33:50.035Z
// Table: user_private

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('user_private').select('*', { count: 'exact' });
    
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
    console.error('Error fetching user_private:', error);
    return errorResponse('Failed to fetch user_private', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const body = await request.json();
    const validated = UserPrivateInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('user_private')
      .insert({ ...validated, created_by: userId })
      .select()
      .single();
    
    if (error) throw error;
    return successResponse(data, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error creating user_private:', error);
    return errorResponse('Failed to create user_private', 500);
  }
}
