import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { WorkParticipantsUpdateSchema } from '@/lib/validators/generated/hestia-core/work_participants';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.991Z
// Table: work_participants

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('work_participants')
      .select('*')
      .eq('work_participants_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('work_participants');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching work_participants:', error);
    return errorResponse('Failed to fetch work_participants', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'work_participants', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = WorkParticipantsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('work_participants')
      .update(validated)
      .eq('work_participants_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('work_participants');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating work_participants:', error);
    return errorResponse('Failed to update work_participants', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'work_participants', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('work_participants').delete().eq('work_participants_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('work_participants');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting work_participants:', error);
    return errorResponse('Failed to delete work_participants', 500);
  }
}
