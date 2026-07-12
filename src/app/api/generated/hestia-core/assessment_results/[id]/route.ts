import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { AssessmentResultsUpdateSchema } from '@/lib/validators/generated/hestia-core/assessment_results';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.250Z
// Table: assessment_results

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('assessment_results_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_results');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching assessment_results:', error);
    return errorResponse('Failed to fetch assessment_results', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'assessment_results', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = AssessmentResultsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('assessment_results')
      .update(validated)
      .eq('assessment_results_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_results');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating assessment_results:', error);
    return errorResponse('Failed to update assessment_results', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'assessment_results', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('assessment_results').delete().eq('assessment_results_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('assessment_results');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting assessment_results:', error);
    return errorResponse('Failed to delete assessment_results', 500);
  }
}
