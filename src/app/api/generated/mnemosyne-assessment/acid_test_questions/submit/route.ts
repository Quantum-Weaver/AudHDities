import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/mnemosyne-assessment/acid_test_questions/[special]
// METHODS: POST
// GENERATED: 2026-04-16T23:20:33.992Z
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
    
    // Special route logic for submit
    const { data, error } = await supabase
      .rpc('acid_test_questions_submit', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in submit:', error);
    return errorResponse('Failed to process submit', 500);
  }
}