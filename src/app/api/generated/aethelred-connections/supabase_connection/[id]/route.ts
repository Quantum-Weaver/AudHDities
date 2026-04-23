import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SupabaseConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/supabase_connection';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:59.148Z
// Table: supabase_connection

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('supabase_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('supabase_connection');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching supabase_connection:', error);
    return errorResponse('Failed to fetch supabase_connection', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'supabase_connection', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SupabaseConnectionUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('supabase_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('supabase_connection');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating supabase_connection:', error);
    return errorResponse('Failed to update supabase_connection', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'supabase_connection', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('supabase_connection').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('supabase_connection');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting supabase_connection:', error);
    return errorResponse('Failed to delete supabase_connection', 500);
  }
}
