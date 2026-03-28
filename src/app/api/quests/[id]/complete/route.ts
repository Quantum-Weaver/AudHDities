// src/app/api/quests/complete/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for quest completion
const questCompleteSchema = z.object({
  submitted_content: z.string().optional().nullable(),
});

// Helper to award sovereignty points to user
async function awardSovereigntyPoints(supabase: any, userId: string, points: number): Promise<void> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('sovereignty_score')
    .eq('id', userId)
    .single();
  
  const currentScore = profile?.sovereignty_score || 0;
  
  await supabase
    .from('profiles')
    .update({ sovereignty_score: currentScore + points })
    .eq('id', userId);
}

// Helper to award badge
async function awardBadge(supabase: any, userId: string, badgeName: string, reason?: string): Promise<void> {
  try {
    await supabase.rpc('award_badge', {
      badge_name: badgeName,
      user_id: userId,
    });
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
}

// =====================================================
// POST /api/quests/complete/[id]
// Complete a quest
// =====================================================
export async function POST(
  request: NextRequest,
    { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { id: questId } = params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = questCompleteSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid submission data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { submitted_content } = validationResult.data;
    
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
    
    // Check if user already completed this quest
    const { data: existingProgress, error: progressError } = await supabase
      .from('user_quests')
      .select('*')
      .eq('quest_id', questId)
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (progressError) {
      console.error('Error checking quest progress:', progressError);
    }
    
    if (existingProgress?.status === 'completed') {
      return NextResponse.json(
        { error: 'Quest already completed' },
        { status: 400 }
      );
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
    
    // Mark quest as completed
    const now = new Date().toISOString();
    
    let result;
    if (existingProgress) {
      // Update existing progress
      const { data, error } = await supabase
        .from('user_quests')
        .update({
          status: 'completed',
          completed_at: now,
          submitted_content: submitted_content || existingProgress.submitted_content,
        })
        .eq('id', existingProgress.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Create new progress
      const { data, error } = await supabase
        .from('user_quests')
        .insert({
          user_id: user.id,
          quest_id: questId,
          status: 'completed',
          started_at: now,
          completed_at: now,
          submitted_content: submitted_content || null,
        })
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }
    
    // FIX: Handle null sovereignty_reward
    const sovereigntyReward = quest.sovereignty_reward ?? 0;
    
    // Award sovereignty points
    if (sovereigntyReward > 0) {
      await awardSovereigntyPoints(supabase, user.id, sovereigntyReward);
    }
    
    // Award badge for first quest completion
    const { data: completedQuests } = await supabase
      .from('user_quests')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'completed');
    
    const completedCount = completedQuests?.length ?? 0;
    
    if (completedCount === 1) {
      await awardBadge(supabase, user.id, 'first_quest', 'Completed first quest');
    }
    
    if (completedCount === 10) {
      await awardBadge(supabase, user.id, 'quest_master', 'Completed 10 quests');
    }
    
    // Award house-specific badges based on completed quests in that house
    const { data: completedHouseQuests } = await supabase
      .from('user_quests')
      .select('quests!inner(house)')
      .eq('user_id', user.id)
      .eq('status', 'completed');
    
    const houseCounts: Record<string, number> = {};
    completedHouseQuests?.forEach((uq: any) => {
      const house = uq.quests?.house;
      if (house) {
        houseCounts[house] = (houseCounts[house] || 0) + 1;
      }
    });
    
    for (const [house, count] of Object.entries(houseCounts)) {
      if (count === 1 && !existingProgress) {
        await awardBadge(supabase, user.id, `${house}_initiate`, `Completed first ${house} quest`);
      } else if (count === 5) {
        await awardBadge(supabase, user.id, `${house}_adept`, `Completed 5 ${house} quests`);
      } else if (count === 10) {
        await awardBadge(supabase, user.id, `${house}_master`, `Completed 10 ${house} quests`);
      }
    }
    
    return NextResponse.json({
      success: true,
      quest_progress: result,
      sovereignty_reward: sovereigntyReward,
      message: `Quest completed! +${sovereigntyReward} sovereignty points`,
    });
    
  } catch (error) {
    console.error('Quest completion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}