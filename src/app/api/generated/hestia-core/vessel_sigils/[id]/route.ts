import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { VesselSigilsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_sigils';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.974Z
// Table: vessel_sigils

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('vessel_sigils')
      .select('*')
      .eq('vessel_sigils_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_sigils');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching vessel_sigils:', error);
    return errorResponse('Failed to fetch vessel_sigils', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vessel_sigils', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = VesselSigilsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('vessel_sigils')
      .update(validated)
      .eq('vessel_sigils_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_sigils');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating vessel_sigils:', error);
    return errorResponse('Failed to update vessel_sigils', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vessel_sigils', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('vessel_sigils').delete().eq('vessel_sigils_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vessel_sigils');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting vessel_sigils:', error);
    return errorResponse('Failed to delete vessel_sigils', 500);
  }
}
