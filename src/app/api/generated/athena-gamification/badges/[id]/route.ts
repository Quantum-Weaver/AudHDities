import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import type { BadgesUpdateSchema } from '@/lib/validators/generated';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/athena-gamification/badges/[id]
// METHODS: GET, PUT, DELETE
// GENERATED: 2026-04-15T01:19:26.424Z
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
      .from('badges')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('badges');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching badges:', error);
    return errorResponse('Failed to fetch badges', 500);
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
    const ownsRecord = await checkOwnership(userId, 'badges', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = BadgesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('badges')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('badges');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating badges:', error);
    return errorResponse('Failed to update badges', 500);
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
    const ownsRecord = await checkOwnership(userId, 'badges', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('badges')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('badges');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting badges:', error);
    return errorResponse('Failed to delete badges', 500);
  }
}
