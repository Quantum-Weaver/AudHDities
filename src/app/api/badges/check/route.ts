// src/app/api/badges/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import type { BadgeType } from '@/types/supabase/tables/user_badges';

// =====================================================
// POST /api/badges/check
// Check and award badges based on user activity
// This endpoint can be called after significant user actions
// Body params:
//   - type: string - 'quest_complete', 'sale_complete', 'purchase_complete', etc.
//   - data: object - relevant data for badge checking
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
    
    const body = await request.json();
    const { type, data } = body;
    
    const badgesToAward: BadgeType[] = [];
    
    // Get user's current badges
    const { data: currentBadges } = await supabase
      .from('user_badges')
      .select('badge')
      .eq('user_id', user.id);
    
    const badgeSet = new Set<BadgeType>(currentBadges?.map(b => b.badge as BadgeType) || []);
    
    // Helper to award badge if not already owned
    const awardIfNotOwned = async (badgeName: BadgeType, reason?: string) => {
      if (!badgeSet.has(badgeName)) {
        await supabase.rpc('award_badge', {
          badge_name: badgeName,
          user_id: user.id,
        });
        
        if (reason) {
          await supabase
            .from('user_badges')
            .update({ earned_reason: reason })
            .eq('user_id', user.id)
            .eq('badge', badgeName);
        }
        
        badgesToAward.push(badgeName);
      }
    };
    
    // Check based on event type
    switch (type) {
      case 'quest_complete': {
        const { quest_id, completed_count } = data;
        
        // First quest badge
        if (completed_count === 1) {
          await awardIfNotOwned('first_quest', 'Completed first quest');
        }
        
        // Quest master badge (10 quests)
        if (completed_count === 10) {
          await awardIfNotOwned('quest_master', 'Completed 10 quests');
        }
        
        break;
      }
      
      case 'sale_complete': {
        const { total_sales } = data;
        
        // First sale badge
        if (total_sales === 1) {
          await awardIfNotOwned('first_sale', 'Made first sale');
        }
        
        break;
      }
      
      case 'purchase_complete': {
        const { total_purchases } = data;
        
        // First purchase badge
        if (total_purchases === 1) {
          await awardIfNotOwned('first_purchase', 'Made first purchase');
        }
        
        break;
      }
      
      case 'sovereignty_update': {
        const { sovereignty_score } = data;
        
        // Sovereignty badges
        if (sovereignty_score >= 100 && sovereignty_score < 500) {
          await awardIfNotOwned('sovereign_seeker', `Reached ${sovereignty_score} sovereignty points`);
        }
        if (sovereignty_score >= 500 && sovereignty_score < 1000) {
          await awardIfNotOwned('sovereign_adept', `Reached ${sovereignty_score} sovereignty points`);
        }
        if (sovereignty_score >= 1000) {
          await awardIfNotOwned('sovereign_master', `Reached ${sovereignty_score} sovereignty points`);
        }
        
        break;
      }
      
      case 'contribution_added': {
        const { contribution_type } = data;
        
        // Contribution badges - typed as const to ensure BadgeType
        const typeMap: Record<string, BadgeType> = {
          concept: 'contributor_concept',
          code: 'contributor_code',
          design: 'contributor_design',
          content: 'contributor_content',
          testing: 'contributor_testing',
        };
        
        const badgeName = typeMap[contribution_type];
        if (badgeName) {
          await awardIfNotOwned(badgeName, `Contributed ${contribution_type} to a product`);
        }
        
        break;
      }
      
      case 'house_quest_milestone': {
        const { house, completed_count } = data;
        
        // House badges - typed as const to ensure BadgeType
        const houseMap: Record<string, string> = {
          hearth_keeper: 'hearth_keeper',
          chancellor: 'chancellor',
          seer: 'seer',
          aethelred: 'aethelred',
          curator: 'curator',
          archivist: 'archivist',
          skald: 'skald',
          codex: 'codex',
          executioner: 'executioner',
        };
        
        const baseName = houseMap[house];
        if (baseName) {
          if (completed_count === 1) {
            await awardIfNotOwned(`${baseName}_initiate` as BadgeType, `Completed first ${house} quest`);
          }
          if (completed_count === 5) {
            await awardIfNotOwned(`${baseName}_adept` as BadgeType, `Completed 5 ${house} quests`);
          }
          if (completed_count === 10) {
            await awardIfNotOwned(`${baseName}_master` as BadgeType, `Completed 10 ${house} quests`);
          }
        }
        
        break;
      }
    }
    
    return NextResponse.json({
      success: true,
      badges_awarded: badgesToAward,
      message: badgesToAward.length > 0 ? `Awarded ${badgesToAward.length} new badges` : 'No new badges earned',
    });
    
  } catch (error) {
    console.error('Badge check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}