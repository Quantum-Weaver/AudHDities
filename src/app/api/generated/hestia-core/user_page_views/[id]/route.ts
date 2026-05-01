import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { UserPageViewsUpdateSchema } from '@/lib/validators/generated/hestia-core/user_page_views';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:42.350Z
// Table: user_page_views

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_page_views')
      .select('*')
      .eq('user_page_views_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_page_views');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching user_page_views:', error);
    return errorResponse('Failed to fetch user_page_views', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'user_page_views', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = UserPageViewsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('user_page_views')
      .update(validated)
      .eq('user_page_views_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_page_views');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating user_page_views:', error);
    return errorResponse('Failed to update user_page_views', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'user_page_views', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('user_page_views').delete().eq('user_page_views_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('user_page_views');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting user_page_views:', error);
    return errorResponse('Failed to delete user_page_views', 500);
  }
}
