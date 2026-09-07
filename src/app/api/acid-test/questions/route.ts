// src/app/api/acid-test/questions/route.ts
// Draws the Acid Test's questions for anyone, signed in or not.

import { createClient } from '@supabase/supabase-js';
import { errorResponse, successResponse } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.rpc('get_acid_test_questions', {});
    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    console.error('Error drawing the acid test questions:', error);
    return errorResponse('The questions could not be gathered.', 500);
  }
}
