import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

// =====================================================
// API ROUTE: /api/generated/plutus-economics/subscriptions/[special]
// METHODS: POST
// GENERATED: 2026-04-15T19:30:36.031Z
// SOURCE: database.types.ts
// =====================================================
import { SubscriptionsRowSchema, SubscriptionsInsertSchema, SubscriptionsUpdateSchema } from '@/lib/validators/generated/plutus-economics/subscriptions';

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
      .rpc('subscriptions_link', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in link:', error);
    return errorResponse('Failed to process link', 500);
  }
}