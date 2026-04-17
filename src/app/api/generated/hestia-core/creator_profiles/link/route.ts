import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/hestia-core/creator_profiles/[special]
// METHODS: POST
// GENERATED: 2026-04-17T01:35:45.633Z
// SOURCE: database.types.ts
// =====================================================
import { CreatorProfilesRowSchema, CreatorProfilesInsertSchema, CreatorProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/creator_profiles';

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
      .rpc('creator_profiles_link', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in link:', error);
    return errorResponse('Failed to process link', 500);
  }
}