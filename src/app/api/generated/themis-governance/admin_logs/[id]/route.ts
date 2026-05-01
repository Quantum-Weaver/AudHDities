import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { AdminLogsUpdateSchema } from '@/lib/validators/generated/themis-governance/admin_logs';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.407Z
// Table: admin_logs

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .eq('admin_logs_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('admin_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching admin_logs:', error);
    return errorResponse('Failed to fetch admin_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'admin_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = AdminLogsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('admin_logs')
      .update(validated)
      .eq('admin_logs_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('admin_logs');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating admin_logs:', error);
    return errorResponse('Failed to update admin_logs', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'admin_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('admin_logs').delete().eq('admin_logs_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('admin_logs');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting admin_logs:', error);
    return errorResponse('Failed to delete admin_logs', 500);
  }
}
