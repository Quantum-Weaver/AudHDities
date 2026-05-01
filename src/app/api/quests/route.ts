// src/app/api/quests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { QuestInsert, QuestWithRelations } from '@/types/supabase/tables/quests';

// Council house values for validation
const COUNCIL_HOUSES = [
  'hearth_keeper', 'chancellor', 'seer', 'aethelred',
  'curator', 'archivist', 'skald', 'codex', 'executioner'
] as const;

type CouncilHouse = typeof COUNCIL_HOUSES[number];

// Validation schema for quest creation (admin only)
const questCreateSchema = z.object({
  house: z.enum(COUNCIL_HOUSES),
  title: z.string().min(3).max(200),
  description: z.string().max(1000).optional(),
  instructions: z.string().max(5000).optional(),
  required_sovereignty_score: z.number().min(0).optional().default(0),
  prerequisite_quest_id: z.string().uuid().optional().nullable(),
  sovereignty_reward: z.number().min(0).optional().default(10),
  residual_multiplier_bonus: z.number().min(0).max(2).optional().default(1.0),
  submission_type: z.enum(['text', 'image', 'file', 'audio', 'video', 'link', 'auto']).optional().default('text'),
  order_index: z.number().min(0).optional(),
  is_active: z.boolean().optional().default(true),
});

// Helper to check if a string is a valid council house
function isValidCouncilHouse(value: string): value is CouncilHouse {
  return COUNCIL_HOUSES.includes(value as CouncilHouse);
}

// Helper to get user's quest progress
async function getUserQuestProgress(supabase: any, userId: string, questIds: string[]) {
  const { data } = await supabase
    .from('user_quests')
    .select('*')
    .in('quest_id', questIds)
    .eq('user_id', userId);
  
  const progressMap = new Map();
  data?.forEach((progress: any) => {
    progressMap.set(progress.quest_id, progress);
  });
  
  return progressMap;
}

// =====================================================
// GET /api/quests
// List all quests with user progress
// Query params:
//   - house: string (optional) - filter by council house
//   - status: string (optional) - filter by availability
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const houseParam = searchParams.get('house');
    const status = searchParams.get('status');
    
    // Validate house parameter if provided
    let house: CouncilHouse | undefined;
    if (houseParam) {
      if (isValidCouncilHouse(houseParam)) {
        house = houseParam as CouncilHouse;
      } else {
        return NextResponse.json(
          { error: `Invalid house: ${houseParam}. Must be one of: ${COUNCIL_HOUSES.join(', ')}` },
          { status: 400 }
        );
      }
    }
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Build query
    let query = supabase
      .from('quests')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: true });
    
    if (house) {
      query = query.eq('house', house);
    }
    
    const { data: quests, error } = await query;
    
    if (error) {
      console.error('Error fetching quests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quests' },
        { status: 500 }
      );
    }
    
    // Get user's progress if logged in
    let userProgressMap = new Map();
    if (user && quests && quests.length > 0) {
      const questIds = quests.map((q: any) => q.id);
      userProgressMap = await getUserQuestProgress(supabase, user.id, questIds);
    }
    
    // Add user progress to quests
    const questsWithProgress = quests.map((quest: any) => {
      const progress = userProgressMap.get(quest.id);
      let availableStatus = 'available';
      
      // Check if quest is locked due to sovereignty score
      if (user && quest.required_sovereignty_score > 0) {
        // Would need user's sovereignty score - we'll handle in frontend
      }
      
      return {
        ...quest,
        user_status: progress?.status || 'available',
        user_progress: progress,
      };
    });
    
    return NextResponse.json({ quests: questsWithProgress });
    
  } catch (error) {
    console.error('Quests API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/quests
// Create a new quest (admin only)
// =====================================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = questCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid quest data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const questData = validationResult.data;
    
    // Create quest
    const { data, error } = await supabase
      .from('quests')
      .insert(questData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating quest:', error);
      return NextResponse.json(
        { error: 'Failed to create quest' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      quest: data,
      message: 'Quest created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Quest creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}