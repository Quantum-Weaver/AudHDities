import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { GrantCollaboratorsUpdateSchema } from '@/lib/validators/generated/hestia-core/grant_collaborators';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.492Z
// Table: grant_collaborators

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('grant_collaborators')
      .select('*')
      .eq('grant_collaborators_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('grant_collaborators');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching grant_collaborators:', error);
    return errorResponse('Failed to fetch grant_collaborators', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'grant_collaborators', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = GrantCollaboratorsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('grant_collaborators')
      .update(validated)
      .eq('grant_collaborators_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('grant_collaborators');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating grant_collaborators:', error);
    return errorResponse('Failed to update grant_collaborators', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'grant_collaborators', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('grant_collaborators').delete().eq('grant_collaborators_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('grant_collaborators');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting grant_collaborators:', error);
    return errorResponse('Failed to delete grant_collaborators', 500);
  }
}
