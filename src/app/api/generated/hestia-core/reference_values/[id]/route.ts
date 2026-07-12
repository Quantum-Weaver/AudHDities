import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ReferenceValuesUpdateSchema } from '@/lib/validators/generated/hestia-core/reference_values';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.729Z
// Table: reference_values

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('reference_values')
      .select('*')
      .eq('reference_values_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('reference_values');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching reference_values:', error);
    return errorResponse('Failed to fetch reference_values', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'reference_values', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ReferenceValuesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('reference_values')
      .update(validated)
      .eq('reference_values_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('reference_values');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating reference_values:', error);
    return errorResponse('Failed to update reference_values', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'reference_values', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('reference_values').delete().eq('reference_values_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('reference_values');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting reference_values:', error);
    return errorResponse('Failed to delete reference_values', 500);
  }
}
