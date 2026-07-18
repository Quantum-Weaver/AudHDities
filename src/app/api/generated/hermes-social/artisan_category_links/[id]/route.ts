import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// Generated: 2026-07-18T23:17:10.620Z
// Table: artisan_category_links

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('artisan_category_links')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('artisan_category_links');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching artisan_category_links:', error);
    return errorResponse('Failed to fetch artisan_category_links', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'artisan_category_links', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('artisan_category_links').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('artisan_category_links');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting artisan_category_links:', error);
    return errorResponse('Failed to delete artisan_category_links', 500);
  }
}
