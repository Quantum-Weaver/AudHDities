import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { EnergyLogsUpdateSchema } from '@/lib/validators/generated/hestia-core/energy_logs';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:41.398Z
// Table: energy_logs

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('energy_logs')
      .select('*')
      .eq('energy_logs_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('energy_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching energy_logs:', error);
    return errorResponse('Failed to fetch energy_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'energy_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = EnergyLogsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('energy_logs')
      .update(validated)
      .eq('energy_logs_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('energy_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating energy_logs:', error);
    return errorResponse('Failed to update energy_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'energy_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('energy_logs').delete().eq('energy_logs_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('energy_logs');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting energy_logs:', error);
    return errorResponse('Failed to delete energy_logs', 500);
  }
}
