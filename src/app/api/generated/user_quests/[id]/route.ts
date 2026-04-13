// =====================================================
// API ROUTE: /api/user_quests/[id]
// METHODS: GET, DELETE
// GENERATED: 2026-04-12T23:25:46.120Z
// SOURCE: database.types.ts
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, notFound } from 'src/lib/api/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_quests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('user_quests');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching user_quests:', error);
    return errorResponse('Failed to fetch user_quests', 500);
  }
}
import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from 'src/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from 'src/lib/api/auth';

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
    const ownsRecord = await checkOwnership(userId, 'user_quests', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('user_quests')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('user_quests');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting user_quests:', error);
    return errorResponse('Failed to delete user_quests', 500);
  }
}
