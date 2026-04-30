import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_generation_stats')
      .select('*')
      .eq('prometheus_generation_stats_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_generation_stats');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching prometheus_generation_stats:', error);
    return errorResponse('Failed to fetch prometheus_generation_stats', 500);
  }
}