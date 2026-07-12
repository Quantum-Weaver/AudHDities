import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { AssessmentQuestionsUpdateSchema } from '@/lib/validators/generated/hestia-core/assessment_questions';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.245Z
// Table: assessment_questions

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('assessment_questions')
      .select('*')
      .eq('assessment_questions_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_questions');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching assessment_questions:', error);
    return errorResponse('Failed to fetch assessment_questions', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, 'assessment_questions', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = AssessmentQuestionsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('assessment_questions')
      .update(validated)
      .eq('assessment_questions_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_questions');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating assessment_questions:', error);
    return errorResponse('Failed to update assessment_questions', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, 'assessment_questions', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('assessment_questions').delete().eq('assessment_questions_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_questions');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting assessment_questions:', error);
    return errorResponse('Failed to delete assessment_questions', 500);
  }
}
