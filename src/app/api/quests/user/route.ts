// src/app/api/quests/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { QuestStatus } from '@/types/supabase/tables/quests';

// Valid quest status values
const validQuestStatuses: QuestStatus[] = ['locked', 'available', 'in_progress', 'completed', 'mastered'];

// =====================================================
// GET /api/quests/user
// Get user's quest progress
// Query params:
//   - status: string (optional) - filter by status (locked, available, in_progress, completed, mastered)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const statusParam = searchParams.get('status');
    
    // Validate status if provided
    let status: QuestStatus | undefined;
    if (statusParam && validQuestStatuses.includes(statusParam as QuestStatus)) {
      status = statusParam as QuestStatus;
    } else if (statusParam) {
      // Invalid status provided, return empty result or error
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validQuestStatuses.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    let query = supabase
      .from('user_quests')
      .select(`
        *,
        quest:quest_id (
          *,
          prerequisite:prerequisite_quest_id (*)
        )
      `)
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false, nullsFirst: false });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data: userQuests, error } = await query;
    
    if (error) {
      console.error('Error fetching user quests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quest progress' },
        { status: 500 }
      );
    }
    
    // Get user's sovereignty score
    const { data: profile } = await supabase
      .from('profiles')
      .select('sovereignty_score')
      .eq('id', user.id)
      .single();
    
    // Calculate stats
    const completedCount = userQuests?.filter(q => q.status === 'completed').length || 0;
    const inProgressCount = userQuests?.filter(q => q.status === 'in_progress').length || 0;
    const availableCount = userQuests?.filter(q => q.status === 'available').length || 0;
    const lockedCount = userQuests?.filter(q => q.status === 'locked').length || 0;
    
    return NextResponse.json({
      quests: userQuests || [],
      stats: {
        total: userQuests?.length || 0,
        completed: completedCount,
        in_progress: inProgressCount,
        available: availableCount,
        locked: lockedCount,
        sovereignty_score: profile?.sovereignty_score || 0,
      },
    });
    
  } catch (error) {
    console.error('User quests API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}