import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { UserBubbleLimitsUpdateSchema } from '@/lib/validators/generated/hestia-core/user_bubble_limits';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T15:32:13.816Z
// Table: user_bubble_limits

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_bubble_limits')
      .select('*')
      .eq('user_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_bubble_limits');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching user_bubble_limits:', error);
    return errorResponse('Failed to fetch user_bubble_limits', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'user_bubble_limits', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = UserBubbleLimitsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('user_bubble_limits')
      .update(validated)
      .eq('user_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_bubble_limits');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating user_bubble_limits:', error);
    return errorResponse('Failed to update user_bubble_limits', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'user_bubble_limits', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('user_bubble_limits').delete().eq('user_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_bubble_limits');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting user_bubble_limits:', error);
    return errorResponse('Failed to delete user_bubble_limits', 500);
  }
}
