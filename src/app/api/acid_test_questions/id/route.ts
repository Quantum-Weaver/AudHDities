// =====================================================
// FILE: app/api/acid_test_questions/[id]/route.ts
// GENERATED: 2026-04-06T00:38:33.388Z
// METHODS: GET_SINGLE
// =====================================================

// =====================================================
// GET /api/acid_test_questions/[id] - Get single acid_test_questions
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, notFound } from '@/lib/api/auth';

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

