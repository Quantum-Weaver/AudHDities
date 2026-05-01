import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { PrometheusBoundariesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_boundaries';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.728Z
// Table: prometheus_boundaries

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_boundaries')
      .select('*')
      .eq('prometheus_boundaries_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_boundaries');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching prometheus_boundaries:', error);
    return errorResponse('Failed to fetch prometheus_boundaries', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'prometheus_boundaries', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = PrometheusBoundariesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('prometheus_boundaries')
      .update(validated)
      .eq('prometheus_boundaries_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_boundaries');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating prometheus_boundaries:', error);
    return errorResponse('Failed to update prometheus_boundaries', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'prometheus_boundaries', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('prometheus_boundaries').delete().eq('prometheus_boundaries_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_boundaries');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting prometheus_boundaries:', error);
    return errorResponse('Failed to delete prometheus_boundaries', 500);
  }
}
