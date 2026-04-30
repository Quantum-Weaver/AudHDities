import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { TimelinesUpdateSchema } from '@/lib/validators/generated/athena-gamification/timelines';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T04:17:48.401Z
// Table: timelines

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('timelines')
      .select('*')
      .eq('timelines_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('timelines');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching timelines:', error);
    return errorResponse('Failed to fetch timelines', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'timelines', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = TimelinesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('timelines')
      .update(validated)
      .eq('timelines_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('timelines');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating timelines:', error);
    return errorResponse('Failed to update timelines', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'timelines', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('timelines').delete().eq('timelines_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('timelines');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting timelines:', error);
    return errorResponse('Failed to delete timelines', 500);
  }
}
