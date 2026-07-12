import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { CollectionItemsUpdateSchema } from '@/lib/validators/generated/hestia-core/collection_items';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.303Z
// Table: collection_items

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('collection_items')
      .select('*')
      .eq('collection_items_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('collection_items');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching collection_items:', error);
    return errorResponse('Failed to fetch collection_items', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'collection_items', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = CollectionItemsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('collection_items')
      .update(validated)
      .eq('collection_items_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('collection_items');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating collection_items:', error);
    return errorResponse('Failed to update collection_items', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'collection_items', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('collection_items').delete().eq('collection_items_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('collection_items');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting collection_items:', error);
    return errorResponse('Failed to delete collection_items', 500);
  }
}
