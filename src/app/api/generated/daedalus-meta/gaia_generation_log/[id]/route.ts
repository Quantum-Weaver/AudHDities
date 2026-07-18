import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { GaiaGenerationLogUpdateSchema } from '@/lib/validators/generated/daedalus-meta/gaia_generation_log';
import { NextRequest } from 'next/server';

// Generated: 2026-07-18T23:17:10.807Z
// Table: gaia_generation_log

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('gaia_generation_log')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('gaia_generation_log');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching gaia_generation_log:', error);
    return errorResponse('Failed to fetch gaia_generation_log', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'gaia_generation_log', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = GaiaGenerationLogUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('gaia_generation_log')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('gaia_generation_log');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating gaia_generation_log:', error);
    return errorResponse('Failed to update gaia_generation_log', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'gaia_generation_log', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('gaia_generation_log').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('gaia_generation_log');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting gaia_generation_log:', error);
    return errorResponse('Failed to delete gaia_generation_log', 500);
  }
}
