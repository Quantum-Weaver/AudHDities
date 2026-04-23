import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:58.340Z
// Table: creator_profiles

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('creator_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('creator_profiles');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching creator_profiles:', error);
    return errorResponse('Failed to fetch creator_profiles', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'creator_profiles', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('creator_profiles').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('creator_profiles');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting creator_profiles:', error);
    return errorResponse('Failed to delete creator_profiles', 500);
  }
}
