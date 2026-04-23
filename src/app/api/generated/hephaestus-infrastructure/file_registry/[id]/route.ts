import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { FileRegistryUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/file_registry';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:58.429Z
// Table: file_registry

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('file_registry')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('file_registry');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching file_registry:', error);
    return errorResponse('Failed to fetch file_registry', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'file_registry', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = FileRegistryUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('file_registry')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('file_registry');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating file_registry:', error);
    return errorResponse('Failed to update file_registry', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'file_registry', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('file_registry').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('file_registry');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting file_registry:', error);
    return errorResponse('Failed to delete file_registry', 500);
  }
}
