import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { SystemTimelineEventsUpdateSchema } from '@/lib/validators/generated/hestia-core/system_timeline_events';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T15:32:13.776Z
// Table: system_timeline_events

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('system_timeline_events')
      .select('*')
      .eq('system_timeline_events_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_timeline_events');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching system_timeline_events:', error);
    return errorResponse('Failed to fetch system_timeline_events', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'system_timeline_events', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = SystemTimelineEventsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('system_timeline_events')
      .update(validated)
      .eq('system_timeline_events_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_timeline_events');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating system_timeline_events:', error);
    return errorResponse('Failed to update system_timeline_events', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'system_timeline_events', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('system_timeline_events').delete().eq('system_timeline_events_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('system_timeline_events');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting system_timeline_events:', error);
    return errorResponse('Failed to delete system_timeline_events', 500);
  }
}
