import { errorResponse, getPaginationParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { page, limit } = getPaginationParams(request.nextUrl);
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('prometheus_generation_stats')
      .select('*', { count: 'exact' })
      .range(from, to);
    
    if (error) throw error;
    
    return successResponse({
      data,
      pagination: { page, limit, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching prometheus_generation_stats:', error);
    return errorResponse('Failed to fetch prometheus_generation_stats', 500);
  }
}