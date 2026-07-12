import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { AethelredHouseUpdateSchema } from '@/lib/validators/generated/aethelred-connections/aethelred_house';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.189Z
// Table: aethelred_house

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('aethelred_house')
      .select('*')
      .eq('aethelred_house_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('aethelred_house');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching aethelred_house:', error);
    return errorResponse('Failed to fetch aethelred_house', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'aethelred_house', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = AethelredHouseUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('aethelred_house')
      .update(validated)
      .eq('aethelred_house_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('aethelred_house');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating aethelred_house:', error);
    return errorResponse('Failed to update aethelred_house', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'aethelred_house', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('aethelred_house').delete().eq('aethelred_house_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('aethelred_house');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting aethelred_house:', error);
    return errorResponse('Failed to delete aethelred_house', 500);
  }
}
