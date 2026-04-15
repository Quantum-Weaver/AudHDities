import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/mnemosyne-assessment/acid_test_questions/[id]
// METHODS: GET
// GENERATED: 2026-04-15T01:19:26.374Z
// SOURCE: database.types.ts
// =====================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('acid_test_questions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('acid_test_questions');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching acid_test_questions:', error);
    return errorResponse('Failed to fetch acid_test_questions', 500);
  }
}
