// src/app/api/quests/start/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

// =====================================================
// POST /api/quests/start/[id]
// Start a quest
// =====================================================
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id: questId } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get quest details
    const { data: quest, error: questError } = await supabase
      .from('quests')
      .select('*')
      .eq('id', questId)
      .maybeSingle();
    
    if (questError || !quest) {
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }
    
    // Check if quest is active
    if (!quest.is_active) {
      return NextResponse.json(
        { error: 'Quest is not currently active' },
        { status: 400 }
      );
    }
    
    // Check if user already started this quest
    const { data: existingProgress, error: progressError } = await supabase
      .from('user_quests')
      .select('*')
      .eq('quest_id', questId)
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (progressError) {
      console.error('Error checking quest progress:', progressError);
    }
    
    if (existingProgress) {
      if (existingProgress.status === 'completed') {
        return NextResponse.json(
          { error: 'Quest already completed' },
          { status: 400 }
        );
      }
      if (existingProgress.status === 'in_progress') {
        return NextResponse.json(
          { error: 'Quest already in progress' },
          { status: 400 }
        );
      }
    }
    
    // FIX: Handle null required_sovereignty_score
    const requiredScore = quest.required_sovereignty_score ?? 0;
    
    // Check if user meets sovereignty requirements
    const { data: profile } = await supabase
      .from('profiles')
      .select('sovereignty_score')
      .eq('id', user.id)
      .single();
    
    const userScore = profile?.sovereignty_score ?? 0;
    if (requiredScore > userScore) {
      return NextResponse.json(
        { error: `Requires ${requiredScore} sovereignty points` },
        { status: 400 }
      );
    }
    
    // Check prerequisites
    if (quest.prerequisite_quest_id) {
      const { data: prerequisiteProgress } = await supabase
        .from('user_quests')
        .select('status')
        .eq('quest_id', quest.prerequisite_quest_id)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (prerequisiteProgress?.status !== 'completed') {
        return NextResponse.json(
          { error: 'Prerequisite quest not completed' },
          { status: 400 }
        );
      }
    }
    
    // Start the quest
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('user_quests')
      .insert({
        user_id: user.id,
        quest_id: questId,
        status: 'in_progress',
        started_at: now,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error starting quest:', error);
      return NextResponse.json(
        { error: 'Failed to start quest' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      quest_progress: data,
      message: 'Quest started successfully',
    });
    
  } catch (error) {
    console.error('Quest start error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}