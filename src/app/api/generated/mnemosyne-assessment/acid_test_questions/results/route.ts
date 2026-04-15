import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/mnemosyne-assessment/acid_test_questions/[special]
// METHODS: POST
// GENERATED: 2026-04-15T19:30:35.602Z
// SOURCE: database.types.ts
// =====================================================
import { AcidTestQuestionsRowSchema, AcidTestQuestionsInsertSchema, AcidTestQuestionsUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/acid_test_questions';

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
    
    // Special route logic for results
    const { data, error } = await supabase
      .rpc('acid_test_questions_results', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in results:', error);
    return errorResponse('Failed to process results', 500);
  }
}