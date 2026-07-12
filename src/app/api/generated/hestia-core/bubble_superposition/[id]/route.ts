import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { BubbleSuperpositionUpdateSchema } from '@/lib/validators/generated/hestia-core/bubble_superposition';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.265Z
// Table: bubble_superposition

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('bubble_superposition')
      .select('*')
      .eq('bubble_superposition_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('bubble_superposition');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching bubble_superposition:', error);
    return errorResponse('Failed to fetch bubble_superposition', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'bubble_superposition', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = BubbleSuperpositionUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('bubble_superposition')
      .update(validated)
      .eq('bubble_superposition_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('bubble_superposition');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating bubble_superposition:', error);
    return errorResponse('Failed to update bubble_superposition', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'bubble_superposition', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('bubble_superposition').delete().eq('bubble_superposition_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('bubble_superposition');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting bubble_superposition:', error);
    return errorResponse('Failed to delete bubble_superposition', 500);
  }
}
