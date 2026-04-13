// =====================================================
// API ROUTE: /api/vendor_profiles/[special]
// METHODS: POST
// GENERATED: 2026-04-12T23:25:46.121Z
// SOURCE: database.types.ts
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, unauthorized } from 'src/lib/api/auth';
import { getAuthenticatedUser } from 'src/lib/api/auth';

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
    
    // Special route logic for link
    const { data, error } = await supabase
      .rpc('vendor_profiles_link', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in link:', error);
    return errorResponse('Failed to process link', 500);
  }
}
