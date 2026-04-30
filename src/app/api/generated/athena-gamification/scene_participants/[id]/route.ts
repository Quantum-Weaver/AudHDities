import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SceneParticipantsUpdateSchema } from '@/lib/validators/generated/athena-gamification/scene_participants';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T15:32:13.698Z
// Table: scene_participants

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('scene_participants')
      .select('*')
      .eq('scene_participants_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scene_participants');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching scene_participants:', error);
    return errorResponse('Failed to fetch scene_participants', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'scene_participants', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SceneParticipantsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('scene_participants')
      .update(validated)
      .eq('scene_participants_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scene_participants');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating scene_participants:', error);
    return errorResponse('Failed to update scene_participants', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'scene_participants', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('scene_participants').delete().eq('scene_participants_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scene_participants');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting scene_participants:', error);
    return errorResponse('Failed to delete scene_participants', 500);
  }
}
