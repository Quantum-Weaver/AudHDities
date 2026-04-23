import { errorResponse, notFound, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('personalized_feed')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('personalized_feed');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching personalized_feed:', error);
    return errorResponse('Failed to fetch personalized_feed', 500);
  }
}