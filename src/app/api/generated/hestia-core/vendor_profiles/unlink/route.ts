import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/hestia-core/vendor_profiles/[special]
// METHODS: POST
// GENERATED: 2026-04-15T16:41:40.406Z
// SOURCE: database.types.ts
// =====================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const supabase = await createApiSupabase();
    
    // Special route logic for unlink
    const { data, error } = await supabase
      .rpc('vendor_profiles_unlink', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in unlink:', error);
    return errorResponse('Failed to process unlink', 500);
  }
}