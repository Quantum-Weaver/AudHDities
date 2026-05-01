import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { CalendarUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/calendar';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.475Z
// Table: calendar

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('calendar')
      .select('*')
      .eq('calendar_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('calendar');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return errorResponse('Failed to fetch calendar', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'calendar', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = CalendarUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('calendar')
      .update(validated)
      .eq('calendar_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('calendar');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating calendar:', error);
    return errorResponse('Failed to update calendar', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'calendar', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('calendar').delete().eq('calendar_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('calendar');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting calendar:', error);
    return errorResponse('Failed to delete calendar', 500);
  }
}
