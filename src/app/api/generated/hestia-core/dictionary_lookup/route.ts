import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const body = await request.json();
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase.rpc('dictionary_lookup', {
      ...body,
      p_user_id: userId
    });
    
    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    console.error('Error invoking dictionary_lookup:', error);
    return errorResponse('Failed to invoke dictionary_lookup', 500);
  }
}