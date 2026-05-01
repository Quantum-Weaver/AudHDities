import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:40.984Z
// Table: acid_test_answers

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('acid_test_answers')
      .select('*')
      .eq('acid_test_answers_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('acid_test_answers');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching acid_test_answers:', error);
    return errorResponse('Failed to fetch acid_test_answers', 500);
  }
}

