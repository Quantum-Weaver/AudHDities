import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { PatronageUpdateSchema } from '@/lib/validators/generated/hestia-core/patronage';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.610Z
// Table: patronage

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('patronage')
      .select('*')
      .eq('patronage_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patronage');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching patronage:', error);
    return errorResponse('Failed to fetch patronage', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'patronage', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = PatronageUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('patronage')
      .update(validated)
      .eq('patronage_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patronage');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating patronage:', error);
    return errorResponse('Failed to update patronage', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'patronage', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('patronage').delete().eq('patronage_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('patronage');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting patronage:', error);
    return errorResponse('Failed to delete patronage', 500);
  }
}
