import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import type { PrometheusMemoriesUpdateSchema } from '@/lib/validators/generated';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/prometheus-meta/prometheus_memories/[id]
// METHODS: GET, PUT, DELETE
// GENERATED: 2026-04-15T01:19:26.639Z
// SOURCE: database.types.ts
// =====================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_memories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('prometheus_memories');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching prometheus_memories:', error);
    return errorResponse('Failed to fetch prometheus_memories', 500);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'prometheus_memories', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = PrometheusMemoriesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('prometheus_memories')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('prometheus_memories');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating prometheus_memories:', error);
    return errorResponse('Failed to update prometheus_memories', 500);
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'prometheus_memories', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('prometheus_memories')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('prometheus_memories');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting prometheus_memories:', error);
    return errorResponse('Failed to delete prometheus_memories', 500);
  }
}
