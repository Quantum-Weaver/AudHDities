import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { TaxonomyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/taxonomy';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.917Z
// Table: taxonomy

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('taxonomy')
      .select('*')
      .eq('taxonomy_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('taxonomy');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching taxonomy:', error);
    return errorResponse('Failed to fetch taxonomy', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'taxonomy', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = TaxonomyUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('taxonomy')
      .update(validated)
      .eq('taxonomy_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('taxonomy');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating taxonomy:', error);
    return errorResponse('Failed to update taxonomy', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'taxonomy', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('taxonomy').delete().eq('taxonomy_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('taxonomy');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting taxonomy:', error);
    return errorResponse('Failed to delete taxonomy', 500);
  }
}
