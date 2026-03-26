// src/app/api/badges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { BadgeType } from '@/types/supabase/tables/user_badges';
import { badgeInfo, getBadgeDisplayName, getBadgeDescription } from '@/types/supabase/tables/user_badges';

// Validation schema for manual badge awarding (admin only)
const awardBadgeSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  badge: z.enum([
    'quantum_weaver', 'founding_council', 'genesis_block', 'sanctuary_guardian',
    'verified_creator', 'verified_vendor', 'community_leader',
    'first_sale', 'first_purchase', 'first_quest', 'quest_master',
    'sovereign_seeker', 'sovereign_adept', 'sovereign_master',
    'contributor_concept', 'contributor_code', 'contributor_design', 'contributor_content', 'contributor_testing',
    'hearth_keeper_initiate', 'hearth_keeper_adept', 'hearth_keeper_master',
    'chancellor_initiate', 'chancellor_adept', 'chancellor_master',
    'seer_initiate', 'seer_adept', 'seer_master',
    'aethelred_initiate', 'aethelred_adept', 'aethelred_master',
    'curator_initiate', 'curator_adept', 'curator_master',
    'archivist_initiate', 'archivist_adept', 'archivist_master',
    'skald_initiate', 'skald_adept', 'skald_master',
    'codex_initiate', 'codex_adept', 'codex_master',
    'executioner_initiate', 'executioner_adept', 'executioner_master',
    'bigot_tax_exempt', 'data_sovereign', 'privacy_pioneer'
  ]),
  earned_reason: z.string().optional().nullable(),
});

// =====================================================
// GET /api/badges
// List all badges with metadata
// Query params:
//   - category: string (optional) - filter by category
//   - search: string (optional) - search by name/description
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    // Get current user for badge ownership info
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get all badge types from the enum
    // We'll use the badgeInfo mapping to build the response
    let badges = Object.entries(badgeInfo).map(([key, info]) => ({
      id: key,
      name: info.name,
      description: info.description,
      category: getBadgeCategory(key as BadgeType),
    }));
    
    // Apply filters
    if (category) {
      badges = badges.filter(b => b.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      badges = badges.filter(b => 
        b.name.toLowerCase().includes(searchLower) || 
        b.description.toLowerCase().includes(searchLower)
      );
    }
    
    // If user is logged in, get which badges they have earned
    let userBadges: string[] = [];
    if (user) {
      const { data } = await supabase
        .from('user_badges')
        .select('badge')
        .eq('user_id', user.id);
      
      userBadges = data?.map(b => b.badge) || [];
    }
    
    // Add earned status to each badge
    const badgesWithStatus = badges.map(badge => ({
      ...badge,
      earned: userBadges.includes(badge.id),
    }));
    
    return NextResponse.json({
      badges: badgesWithStatus,
      total: badgesWithStatus.length,
      earned_count: userBadges.length,
    });
    
  } catch (error) {
    console.error('Badges API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper to determine badge category
function getBadgeCategory(badge: BadgeType): string {
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

// =====================================================
// POST /api/badges
// Manually award a badge (admin only)
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
    const validationResult = awardBadgeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid badge data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { user_id, badge, earned_reason } = validationResult.data;
    
    // Check if user exists
    const { data: targetUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user_id)
      .maybeSingle();
    
    if (userError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user already has this badge
    const { data: existingBadge } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', user_id)
      .eq('badge', badge)
      .maybeSingle();
    
    if (existingBadge) {
      return NextResponse.json(
        { error: 'User already has this badge' },
        { status: 400 }
      );
    }
    
    // Award badge using the RPC function
    const { error: awardError } = await supabase.rpc('award_badge', {
      badge_name: badge,
      user_id: user_id,
    });
    
    if (awardError) {
      console.error('Error awarding badge:', awardError);
      return NextResponse.json(
        { error: 'Failed to award badge' },
        { status: 500 }
      );
    }
    
    // Update the earned reason if provided
    if (earned_reason) {
      await supabase
        .from('user_badges')
        .update({ earned_reason: earned_reason })
        .eq('user_id', user_id)
        .eq('badge', badge);
    }
    
    // Log admin action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: user.id,
        action: 'award_badge',
        target_id: user_id,
        target_type: 'user',
        public_note: `Awarded badge: ${badge}`,
        metadata: { badge, reason: earned_reason },
      });
    
    return NextResponse.json({
      success: true,
      badge,
      user_id,
      message: `Badge awarded successfully`,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Badge awarding error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}