import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-07-28T15:33:49.565Z
// Table: assessment_results

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_results');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching assessment_results:', error);
    return errorResponse('Failed to fetch assessment_results', 500);
  }
}

