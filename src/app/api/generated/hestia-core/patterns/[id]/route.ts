import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { PatternsUpdateSchema } from '@/lib/validators/generated/hestia-core/patterns';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.620Z
// Table: patterns

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('patterns')
      .select('*')
      .eq('patterns_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patterns');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching patterns:', error);
    return errorResponse('Failed to fetch patterns', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'patterns', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = PatternsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('patterns')
      .update(validated)
      .eq('patterns_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patterns');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating patterns:', error);
    return errorResponse('Failed to update patterns', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'patterns', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('patterns').delete().eq('patterns_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patterns');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting patterns:', error);
    return errorResponse('Failed to delete patterns', 500);
  }
}
