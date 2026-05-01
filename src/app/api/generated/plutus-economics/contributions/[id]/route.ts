import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.518Z
// Table: contributions

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('contributions')
      .select('*')
      .eq('contributions_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('contributions');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return errorResponse('Failed to fetch contributions', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'contributions', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('contributions').delete().eq('contributions_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('contributions');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting contributions:', error);
    return errorResponse('Failed to delete contributions', 500);
  }
}
