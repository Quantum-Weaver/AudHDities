import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.939Z
// Table: user_badges

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_badges_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_badges');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching user_badges:', error);
    return errorResponse('Failed to fetch user_badges', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'user_badges', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('user_badges').delete().eq('user_badges_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_badges');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting user_badges:', error);
    return errorResponse('Failed to delete user_badges', 500);
  }
}
