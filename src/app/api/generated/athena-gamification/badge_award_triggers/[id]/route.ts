import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { BadgeAwardTriggersUpdateSchema } from '@/lib/validators/generated/athena-gamification/badge_award_triggers';
import { NextRequest } from 'next/server';

// Generated: 2026-05-01T15:31:59.460Z
// Table: badge_award_triggers

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('badge_award_triggers')
      .select('*')
      .eq('badge_award_triggers_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('badge_award_triggers');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching badge_award_triggers:', error);
    return errorResponse('Failed to fetch badge_award_triggers', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'badge_award_triggers', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = BadgeAwardTriggersUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('badge_award_triggers')
      .update(validated)
      .eq('badge_award_triggers_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('badge_award_triggers');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating badge_award_triggers:', error);
    return errorResponse('Failed to update badge_award_triggers', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'badge_award_triggers', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('badge_award_triggers').delete().eq('badge_award_triggers_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('badge_award_triggers');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting badge_award_triggers:', error);
    return errorResponse('Failed to delete badge_award_triggers', 500);
  }
}
