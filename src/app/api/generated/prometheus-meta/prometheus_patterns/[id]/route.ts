import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { PrometheusPatternsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_patterns';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T03:24:41.842Z
// Table: prometheus_patterns

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_patterns')
      .select('*')
      .eq('prometheus_patterns_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_patterns');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching prometheus_patterns:', error);
    return errorResponse('Failed to fetch prometheus_patterns', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'prometheus_patterns', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = PrometheusPatternsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('prometheus_patterns')
      .update(validated)
      .eq('prometheus_patterns_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_patterns');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating prometheus_patterns:', error);
    return errorResponse('Failed to update prometheus_patterns', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'prometheus_patterns', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('prometheus_patterns').delete().eq('prometheus_patterns_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('prometheus_patterns');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting prometheus_patterns:', error);
    return errorResponse('Failed to delete prometheus_patterns', 500);
  }
}
