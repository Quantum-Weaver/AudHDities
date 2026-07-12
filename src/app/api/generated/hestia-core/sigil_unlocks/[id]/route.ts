import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SigilUnlocksUpdateSchema } from '@/lib/validators/generated/hestia-core/sigil_unlocks';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.820Z
// Table: sigil_unlocks

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('sigil_unlocks')
      .select('*')
      .eq('sigil_unlocks_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('sigil_unlocks');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching sigil_unlocks:', error);
    return errorResponse('Failed to fetch sigil_unlocks', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'sigil_unlocks', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SigilUnlocksUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('sigil_unlocks')
      .update(validated)
      .eq('sigil_unlocks_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('sigil_unlocks');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating sigil_unlocks:', error);
    return errorResponse('Failed to update sigil_unlocks', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'sigil_unlocks', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('sigil_unlocks').delete().eq('sigil_unlocks_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('sigil_unlocks');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting sigil_unlocks:', error);
    return errorResponse('Failed to delete sigil_unlocks', 500);
  }
}
