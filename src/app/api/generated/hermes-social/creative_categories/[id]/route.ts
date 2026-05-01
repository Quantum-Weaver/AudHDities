import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { CreativeCategoriesUpdateSchema } from '@/lib/validators/generated/hermes-social/creative_categories';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:41.292Z
// Table: creative_categories

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('creative_categories')
      .select('*')
      .eq('creative_categories_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('creative_categories');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching creative_categories:', error);
    return errorResponse('Failed to fetch creative_categories', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'creative_categories', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = CreativeCategoriesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('creative_categories')
      .update(validated)
      .eq('creative_categories_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('creative_categories');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating creative_categories:', error);
    return errorResponse('Failed to update creative_categories', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'creative_categories', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('creative_categories').delete().eq('creative_categories_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('creative_categories');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting creative_categories:', error);
    return errorResponse('Failed to delete creative_categories', 500);
  }
}
