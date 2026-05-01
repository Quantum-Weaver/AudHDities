import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ResidualPoolUpdateSchema } from '@/lib/validators/generated/plutus-economics/residual_pool';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:41.995Z
// Table: residual_pool

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('residual_pool')
      .select('*')
      .eq('residual_pool_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_pool');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching residual_pool:', error);
    return errorResponse('Failed to fetch residual_pool', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'residual_pool', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ResidualPoolUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('residual_pool')
      .update(validated)
      .eq('residual_pool_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_pool');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating residual_pool:', error);
    return errorResponse('Failed to update residual_pool', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'residual_pool', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('residual_pool').delete().eq('residual_pool_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_pool');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting residual_pool:', error);
    return errorResponse('Failed to delete residual_pool', 500);
  }
}
