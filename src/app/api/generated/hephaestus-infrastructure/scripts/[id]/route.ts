import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ScriptsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/scripts';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.792Z
// Table: scripts

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('scripts_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scripts');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return errorResponse('Failed to fetch scripts', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'scripts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ScriptsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('scripts')
      .update(validated)
      .eq('scripts_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scripts');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating scripts:', error);
    return errorResponse('Failed to update scripts', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'scripts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('scripts').delete().eq('scripts_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('scripts');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting scripts:', error);
    return errorResponse('Failed to delete scripts', 500);
  }
}
