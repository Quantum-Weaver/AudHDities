import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ExecutionerUpdateSchema } from '@/lib/validators/generated/aethelred-connections/executioner';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:41.435Z
// Table: executioner

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('executioner')
      .select('*')
      .eq('executioner_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('executioner');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching executioner:', error);
    return errorResponse('Failed to fetch executioner', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'executioner', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ExecutionerUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('executioner')
      .update(validated)
      .eq('executioner_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('executioner');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating executioner:', error);
    return errorResponse('Failed to update executioner', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'executioner', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('executioner').delete().eq('executioner_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('executioner');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting executioner:', error);
    return errorResponse('Failed to delete executioner', 500);
  }
}
