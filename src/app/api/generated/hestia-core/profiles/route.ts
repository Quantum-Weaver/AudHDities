// app/api/generated/hestia-core/profiles/[id]/route.ts
// Single profile operations by ID

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { 
  errorResponse, 
  successResponse, 
  unauthorized,
  getAuthenticatedUser
} from '@/lib/api/auth';
import { ProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/profiles';

// =====================================================
// GET /api/generated/hestia-core/profiles/[id]
// Get a single profile by ID
// =====================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return errorResponse('Profile not found', 404);
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return errorResponse('Failed to fetch profile', 500);
  }
}

// =====================================================
// PUT /api/generated/hestia-core/profiles/[id]
// Update a profile by ID
// =====================================================

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const { userId, success: authSuccess } = await getAuthenticatedUser(request);
    
    if (!authSuccess || !userId) {
      return unauthorized();
    }
    
    // Ensure user can only update their own profile
    if (id !== userId) {
      return errorResponse('Cannot update another user\'s profile', 403);
    }
    
    const body = await request.json();
    const validated = ProfilesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    
    // Check if profile exists
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', id)
      .single();
    
    if (checkError || !existing) {
      return errorResponse('Profile not found', 404);
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...validated,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating profile:', error);
    return errorResponse('Failed to update profile', 500);
  }
}

// =====================================================
// DELETE /api/generated/hestia-core/profiles/[id]
// Delete a profile by ID
// =====================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const { userId, success: authSuccess } = await getAuthenticatedUser(request);
    
    if (!authSuccess || !userId) {
      return unauthorized();
    }
    
    // Ensure user can only delete their own profile
    if (id !== userId) {
      return errorResponse('Cannot delete another user\'s profile', 403);
    }
    
    const supabase = await createApiSupabase();
    
    // Check if profile exists
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', id)
      .single();
    
    if (checkError || !existing) {
      return errorResponse('Profile not found', 404);
    }
    
    // Hard delete
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return successResponse({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return errorResponse('Failed to delete profile', 500);
  }
}