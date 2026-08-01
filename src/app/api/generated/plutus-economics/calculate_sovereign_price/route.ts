import { errorResponse, getAuthenticatedUser, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();

    const body = await request.json();
    const supabase = await createApiSupabase();

    // p_user_id is offered to every function; if this function's signature
    // doesn't accept it, retry without (PGRST202 = no matching function).
    let { data, error } = await supabase.rpc('calculate_sovereign_price', {
      ...body,
      p_user_id: userId
    });
    if (error && (error.code === 'PGRST202' || (error.message || '').includes('p_user_id'))) {
      ({ data, error } = await supabase.rpc('calculate_sovereign_price', body));
    }

    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    console.error('Error invoking calculate_sovereign_price:', error);
    return errorResponse('Failed to invoke calculate_sovereign_price', 500);
  }
}