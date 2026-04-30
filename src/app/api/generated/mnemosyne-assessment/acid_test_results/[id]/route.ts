import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T15:32:13.256Z
// Table: acid_test_results

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('acid_test_results')
      .select('*')
      .eq('acid_test_results_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('acid_test_results');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching acid_test_results:', error);
    return errorResponse('Failed to fetch acid_test_results', 500);
  }
}

