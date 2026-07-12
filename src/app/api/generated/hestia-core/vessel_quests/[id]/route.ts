import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { VesselQuestsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_quests';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.964Z
// Table: vessel_quests

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('vessel_quests')
      .select('*')
      .eq('vessel_quests_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_quests');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching vessel_quests:', error);
    return errorResponse('Failed to fetch vessel_quests', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vessel_quests', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = VesselQuestsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('vessel_quests')
      .update(validated)
      .eq('vessel_quests_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_quests');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating vessel_quests:', error);
    return errorResponse('Failed to update vessel_quests', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vessel_quests', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('vessel_quests').delete().eq('vessel_quests_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_quests');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting vessel_quests:', error);
    return errorResponse('Failed to delete vessel_quests', 500);
  }
}
