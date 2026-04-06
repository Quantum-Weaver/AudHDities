// =====================================================
// FILE: app/api/acid_test_results/[id]/route.ts
// GENERATED: 2026-04-06T00:38:33.394Z
// METHODS: GET_SINGLE
// =====================================================

// =====================================================
// GET /api/acid_test_results/[id] - Get single acid_test_results
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
      .from('acid_test_results')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('acid_test_results');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching acid_test_results:', error);
    return errorResponse('Failed to fetch acid_test_results', 500);
  }
}

