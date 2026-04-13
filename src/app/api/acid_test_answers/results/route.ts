// =====================================================
// FILE: app/api/acid_test_answers/results/route.ts
// GENERATED: 2026-04-13T21:47:21.191Z
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from 'src/lib/api/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .rpc('acid_test_answers_results', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in results:', error);
    return errorResponse('Failed to process results', 500);
  }
}
