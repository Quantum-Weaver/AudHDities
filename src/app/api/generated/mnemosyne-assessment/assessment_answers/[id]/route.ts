import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-08-01T16:03:06.260Z
// Table: assessment_answers

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('assessment_answers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_answers');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching assessment_answers:', error);
    return errorResponse('Failed to fetch assessment_answers', 500);
  }
}

