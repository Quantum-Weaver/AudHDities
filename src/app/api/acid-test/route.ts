// app/api/acid-test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Fetch all questions with their answers
    const { data: questions, error: questionsError } = await supabase
      .from('acid_test_questions')
      .select(`
        *,
        acid_test_answers (*)
      `)
      .eq('is_active', true)
      .order('order_index');
    
    if (questionsError) {
      console.error('Error fetching acid test questions:', questionsError);
      return NextResponse.json({ error: questionsError.message }, { status: 500 });
    }
    
    return NextResponse.json({ questions: questions || [] });
    
  } catch (error) {
    console.error('Acid test API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();
    const { answers, score, persona, tier } = body;
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Save results
    const { data, error } = await supabase
      .from('acid_test_results')
      .insert({
        user_id: user.id,
        answers,
        total_score: score,
        persona_label: persona,
        suggested_tier: tier,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving acid test results:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Update profile
    await supabase
      .from('profiles')
      .update({
        user_tier: tier,
        acid_test_persona: persona,
        acid_test_score: score,
        acid_test_taken_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    
    return NextResponse.json({ success: true, result: data });
    
  } catch (error) {
    console.error('Acid test API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}