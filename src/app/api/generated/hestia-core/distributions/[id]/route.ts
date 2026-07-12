import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { DistributionsUpdateSchema } from '@/lib/validators/generated/hestia-core/distributions';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.373Z
// Table: distributions

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('distributions')
      .select('*')
      .eq('distributions_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distributions');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching distributions:', error);
    return errorResponse('Failed to fetch distributions', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'distributions', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = DistributionsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('distributions')
      .update(validated)
      .eq('distributions_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distributions');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating distributions:', error);
    return errorResponse('Failed to update distributions', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'distributions', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('distributions').delete().eq('distributions_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distributions');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting distributions:', error);
    return errorResponse('Failed to delete distributions', 500);
  }
}
