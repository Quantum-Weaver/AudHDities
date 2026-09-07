// src/app/api/acid-test/preview/route.ts
// Scores a set of answers for anyone, names the persona, gathers the readings; stores nothing.

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { errorResponse, successResponse } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const answers = Array.isArray(body?.p_answers) ? body.p_answers : [];
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.rpc('preview_acid_test', { p_answers: answers });
    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    console.error('Error previewing the acid test:', error);
    return errorResponse('The result could not be read.', 500);
  }
}
