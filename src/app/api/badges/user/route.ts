// src/app/api/badges/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { getBadgeDisplayName, getBadgeDescription } from '@/types/supabase/tables/user_badges';

// =====================================================
// GET /api/badges/user
// Get current user's earned badges
// Query params:
//   - user_id: string (optional, defaults to current user)
//   - category: string (optional) - filter by category
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const targetUserId = searchParams.get('user_id');
    const category = searchParams.get('category');
    
    // Get current user for permission checks
    const { data: { user } } = await supabase.auth.getUser();
    
    // Determine which user's badges to fetch
    let userId = targetUserId;
    if (!userId) {
      if (!user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      userId = user.id;
    }
    
    // Check permissions (users can only view their own badges, admins can view any)
    const isAdmin = user ? await isUserAdmin(supabase, user.id) : false;
    if (targetUserId && targetUserId !== user?.id && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to view these badges' },
        { status: 403 }
      );
    }
    
    // Fetch user's badges with details
    let query = supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });
    
    const { data: badges, error } = await query;
    
    if (error) {
      console.error('Error fetching user badges:', error);
      return NextResponse.json(
        { error: 'Failed to fetch badges' },
        { status: 500 }
      );
    }
    
    // Add badge metadata
    const badgesWithMeta = badges.map(badge => ({
      ...badge,
      name: getBadgeDisplayName(badge.badge),
      description: getBadgeDescription(badge.badge),
      category: getBadgeCategoryFromType(badge.badge),
    }));
    
    // Apply category filter if provided
    let filteredBadges = badgesWithMeta;
    if (category) {
      filteredBadges = badgesWithMeta.filter(b => b.category === category);
    }
    
    // Get user's sovereignty score for badge progression context
    const { data: profile } = await supabase
      .from('profiles')
      .select('sovereignty_score')
      .eq('id', userId)
      .single();
    
    // Get counts by category
    const counts = {
      total: badgesWithMeta.length,
      founding: badgesWithMeta.filter(b => b.category === 'founding').length,
      verification: badgesWithMeta.filter(b => b.category === 'verification').length,
      achievement: badgesWithMeta.filter(b => b.category === 'achievement').length,
      sovereignty: badgesWithMeta.filter(b => b.category === 'sovereignty').length,
      contribution: badgesWithMeta.filter(b => b.category === 'contribution').length,
      house: badgesWithMeta.filter(b => b.category === 'house').length,
      special: badgesWithMeta.filter(b => b.category === 'special').length,
    };
    
    return NextResponse.json({
      badges: filteredBadges,
      counts,
      sovereignty_score: profile?.sovereignty_score || 0,
    });
    
  } catch (error) {
    console.error('User badges API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper to get badge category from type
function getBadgeCategoryFromType(badge: string): string {
  if (badge === 'quantum_weaver' || badge === 'founding_council' || badge === 'genesis_block' || badge === 'sanctuary_guardian') {
    return 'founding';
  }
  if (badge === 'verified_creator' || badge === 'verified_vendor' || badge === 'community_leader') {
    return 'verification';
  }
  if (badge === 'first_sale' || badge === 'first_purchase' || badge === 'first_quest' || badge === 'quest_master') {
    return 'achievement';
  }
  if (badge === 'sovereign_seeker' || badge === 'sovereign_adept' || badge === 'sovereign_master') {
    return 'sovereignty';
  }
  if (badge.startsWith('contributor_')) {
    return 'contribution';
  }
  if (badge.endsWith('_initiate') || badge.endsWith('_adept') || badge.endsWith('_master')) {
    return 'house';
  }
  if (badge === 'bigot_tax_exempt' || badge === 'data_sovereign' || badge === 'privacy_pioneer') {
    return 'special';
  }
  return 'other';
}