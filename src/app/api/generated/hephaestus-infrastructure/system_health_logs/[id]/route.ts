import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SystemHealthLogsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/system_health_logs';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:59.186Z
// Table: system_health_logs

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('system_health_logs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_health_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching system_health_logs:', error);
    return errorResponse('Failed to fetch system_health_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'system_health_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SystemHealthLogsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('system_health_logs')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_health_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating system_health_logs:', error);
    return errorResponse('Failed to update system_health_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'system_health_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('system_health_logs').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_health_logs');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting system_health_logs:', error);
    return errorResponse('Failed to delete system_health_logs', 500);
  }
}
