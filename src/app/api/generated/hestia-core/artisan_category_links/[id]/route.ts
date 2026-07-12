import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ArtisanCategoryLinksUpdateSchema } from '@/lib/validators/generated/hestia-core/artisan_category_links';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.233Z
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
      .eq('artisan_category_links_id', id)
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

export async function PUT(
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
    
    const body = await request.json();
    const validated = ArtisanCategoryLinksUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('artisan_category_links')
      .update(validated)
      .eq('artisan_category_links_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('artisan_category_links');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating artisan_category_links:', error);
    return errorResponse('Failed to update artisan_category_links', 500);
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
    const { error } = await supabase.from('artisan_category_links').delete().eq('artisan_category_links_id', id);
    
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
