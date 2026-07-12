import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ThesaurusEntriesUpdateSchema } from '@/lib/validators/generated/hestia-core/thesaurus_entries';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.888Z
// Table: thesaurus_entries

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('thesaurus_entries')
      .select('*')
      .eq('thesaurus_entries_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('thesaurus_entries');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching thesaurus_entries:', error);
    return errorResponse('Failed to fetch thesaurus_entries', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'thesaurus_entries', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ThesaurusEntriesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('thesaurus_entries')
      .update(validated)
      .eq('thesaurus_entries_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('thesaurus_entries');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating thesaurus_entries:', error);
    return errorResponse('Failed to update thesaurus_entries', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'thesaurus_entries', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('thesaurus_entries').delete().eq('thesaurus_entries_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('thesaurus_entries');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting thesaurus_entries:', error);
    return errorResponse('Failed to delete thesaurus_entries', 500);
  }
}
