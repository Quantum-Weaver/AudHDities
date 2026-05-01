import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { VercelConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/vercel_connection';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:42.390Z
// Table: vercel_connection

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('vercel_connection')
      .select('*')
      .eq('vercel_connection_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vercel_connection');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching vercel_connection:', error);
    return errorResponse('Failed to fetch vercel_connection', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vercel_connection', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = VercelConnectionUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('vercel_connection')
      .update(validated)
      .eq('vercel_connection_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vercel_connection');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating vercel_connection:', error);
    return errorResponse('Failed to update vercel_connection', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'vercel_connection', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('vercel_connection').delete().eq('vercel_connection_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('vercel_connection');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting vercel_connection:', error);
    return errorResponse('Failed to delete vercel_connection', 500);
  }
}
