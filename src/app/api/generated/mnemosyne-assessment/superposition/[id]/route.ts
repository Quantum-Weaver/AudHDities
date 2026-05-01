import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SuperpositionUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/superposition';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:42.186Z
// Table: superposition

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('superposition')
      .select('*')
      .eq('superposition_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('superposition');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching superposition:', error);
    return errorResponse('Failed to fetch superposition', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'superposition', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SuperpositionUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('superposition')
      .update(validated)
      .eq('superposition_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('superposition');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating superposition:', error);
    return errorResponse('Failed to update superposition', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'superposition', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('superposition').delete().eq('superposition_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('superposition');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting superposition:', error);
    return errorResponse('Failed to delete superposition', 500);
  }
}
