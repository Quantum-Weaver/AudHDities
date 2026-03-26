// src/app/api/emeralds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import type { EmeraldInsert } from '@/types/supabase/tables/emeralds';

// Validation schema for giving an emerald
const emeraldCreateSchema = z.object({
  post_id: z.string().uuid("Invalid post ID"),
  amount: z.number().min(0).optional().default(0),
  message: z.string().max(500).optional().nullable(),
});

// Helper to check if user has already given an emerald to this post
async function hasUserGivenEmerald(supabase: any, postId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('emeralds')
    .select('id')
    .eq('post_id', postId)
    .eq('giver_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error checking emerald:', error);
    return false;
  }
  
  return !!data;
}

// Helper to update emerald count on post
async function updateEmeraldCount(supabase: any, postId: string): Promise<void> {
  const { count } = await supabase
    .from('emeralds')
    .select('id', { count: 'exact', head: true })
    .eq('post_id', postId);
  
  await supabase
    .from('posts')
    .update({ emerald_count: count || 0 })
    .eq('id', postId);
}

// Helper to check if user can view the post (for giving emeralds)
async function canViewPost(supabase: any, postId: string, userId: string | null): Promise<boolean> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      visibility,
      channel:channel_id (
        allow_subscriptions
      )
    `)
    .eq('id', postId)
    .single();
  
  if (error || !post) return false;
  
  // Public posts are always viewable
  if (post.visibility === 'public') return true;
  
  // If no user, can't view private posts
  if (!userId) return false;
  
  // For subscriber-only posts, check if user is subscribed
  if (post.visibility === 'subscribers' && post.channel?.allow_subscriptions) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('channel_id', post.channel_id)
      .eq('subscriber_id', userId)
      .eq('status', 'active')
      .maybeSingle();
    
    return !!subscription;
  }
  
  // For tier-specific posts, check user's tier
  if (post.visibility === 'tier_community' || post.visibility === 'tier_ally' || post.visibility === 'tier_corporate') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_tier')
      .eq('id', userId)
      .single();
    
    const tierMap: Record<string, string[]> = {
      tier_community: ['community'],
      tier_ally: ['community', 'ally'],
      tier_corporate: ['community', 'ally', 'corporate'],
    };
    
    const allowedTiers = tierMap[post.visibility] || [];
    return allowedTiers.includes(profile?.user_tier || '');
  }
  
  return false;
}

// =====================================================
// GET /api/emeralds
// Get emeralds for a post
// Query params:
//   - post_id: string (required)
//   - user_id: string (optional) - check if specific user gave emerald
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const postId = searchParams.get('post_id');
    const userId = searchParams.get('user_id');
    
    if (!postId) {
      return NextResponse.json(
        { error: 'post_id is required' },
        { status: 400 }
      );
    }
    
    // Get emeralds for the post
    let query = supabase
      .from('emeralds')
      .select(`
        *,
        giver:giver_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: false });
    
    if (userId) {
      query = query.eq('giver_id', userId);
    }
    
    const { data: emeralds, error } = await query;
    
    if (error) {
      console.error('Error fetching emeralds:', error);
      return NextResponse.json(
        { error: 'Failed to fetch emeralds' },
        { status: 500 }
      );
    }
    
    // Get total count
    const { count } = await supabase
      .from('emeralds')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', postId);
    
    return NextResponse.json({
      emeralds,
      count: count || 0,
      user_has_given: userId ? emeralds && emeralds.length > 0 : false,
    });
    
  } catch (error) {
    console.error('Emeralds API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/emeralds
// Give an emerald to a post (requires authentication)
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
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = emeraldCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { post_id, amount, message } = validationResult.data;
    
    // Check if post exists and is viewable
    const canView = await canViewPost(supabase, post_id, user.id);
    if (!canView) {
      return NextResponse.json(
        { error: 'Post not found or not accessible' },
        { status: 404 }
      );
    }
    
    // Check if user already gave an emerald to this post
    const alreadyGiven = await hasUserGivenEmerald(supabase, post_id, user.id);
    if (alreadyGiven) {
      return NextResponse.json(
        { error: 'You have already given an emerald to this post' },
        { status: 400 }
      );
    }
    
    // Create emerald
    const insertData: EmeraldInsert = {
      post_id,
      giver_id: user.id,
      amount,
      message: message || null,
    };
    
    const { data, error } = await supabase
      .from('emeralds')
      .insert(insertData)
      .select(`
        *,
        giver:giver_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      console.error('Error giving emerald:', error);
      return NextResponse.json(
        { error: 'Failed to give emerald' },
        { status: 500 }
      );
    }
    
    // Update emerald count on post
    await updateEmeraldCount(supabase, post_id);
    
    return NextResponse.json({
      success: true,
      emerald: data,
      message: 'Emerald given successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Emerald creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}