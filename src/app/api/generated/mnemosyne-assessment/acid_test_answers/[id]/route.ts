import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/mnemosyne-assessment/acid_test_answers/[id]
// METHODS: GET
// GENERATED: 2026-04-16T23:20:33.989Z
// SOURCE: database.types.ts
// =====================================================
import { AcidTestAnswersRowSchema, AcidTestAnswersInsertSchema, AcidTestAnswersUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/acid_test_answers';

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
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('acid_test_answers');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching acid_test_answers:', error);
    return errorResponse('Failed to fetch acid_test_answers', 500);
  }
}
