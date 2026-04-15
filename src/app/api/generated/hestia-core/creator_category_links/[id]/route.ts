import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import type { CreatorCategoryLinksUpdateSchema } from '@/lib/validators/generated';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/hestia-core/creator_category_links/[id]
// METHODS: GET, PUT, DELETE
// GENERATED: 2026-04-15T01:19:26.485Z
// SOURCE: database.types.ts
// =====================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('creator_category_links')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('creator_category_links');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching creator_category_links:', error);
    return errorResponse('Failed to fetch creator_category_links', 500);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'creator_category_links', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = CreatorCategoryLinksUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('creator_category_links')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('creator_category_links');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating creator_category_links:', error);
    return errorResponse('Failed to update creator_category_links', 500);
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'creator_category_links', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('creator_category_links')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('creator_category_links');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting creator_category_links:', error);
    return errorResponse('Failed to delete creator_category_links', 500);
  }
}
