import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ProposalsUpdateSchema } from '@/lib/validators/generated/hestia-core/proposals';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.658Z
// Table: proposals

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('proposals_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('proposals');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return errorResponse('Failed to fetch proposals', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'proposals', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ProposalsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('proposals')
      .update(validated)
      .eq('proposals_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('proposals');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating proposals:', error);
    return errorResponse('Failed to update proposals', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'proposals', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('proposals').delete().eq('proposals_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('proposals');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting proposals:', error);
    return errorResponse('Failed to delete proposals', 500);
  }
}
