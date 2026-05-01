// src/app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { SubscriptionInsert, SubscriptionWithRelations } from '@/types/supabase/tables/subscriptions';

// Validation schema for creating a subscription
const subscriptionCreateSchema = z.object({
  channel_id: z.string().uuid("Invalid channel ID"),
  tier_applied: z.enum(['community', 'ally', 'corporate', 'patron']).optional().default('ally'),
  monthly_amount: z.number().min(0).optional(),
});

// Validation schema for updating a subscription
const subscriptionUpdateSchema = z.object({
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).optional(),
  tier_applied: z.enum(['community', 'ally', 'corporate', 'patron']).optional(),
  monthly_amount: z.number().min(0).optional(),
});

// Helper to check if user is already subscribed
async function isAlreadySubscribed(supabase: any, channelId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('channel_id', channelId)
    .eq('subscriber_id', userId)
    .eq('status', 'active')
    .maybeSingle();
  
  return !!data;
}

// Helper to update subscriber count on channel
async function updateSubscriberCount(supabase: any, channelId: string): Promise<void> {
  const { count } = await supabase
    .from('subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('channel_id', channelId)
    .eq('status', 'active');
  
  await supabase
    .from('channels')
    .update({ subscriber_count: count || 0 })
    .eq('id', channelId);
}

// Helper to check if channel allows subscriptions
async function channelAllowsSubscriptions(supabase: any, channelId: string): Promise<boolean> {
  const { data } = await supabase
    .from('channels')
    .select('allow_subscriptions')
    .eq('id', channelId)
    .single();
  
  return data?.allow_subscriptions === true;
}

// =====================================================
// GET /api/subscriptions
// Get user's subscriptions
// Query params:
//   - user_id: string (optional, defaults to current user)
//   - status: string (optional, defaults to 'active')
//   - page: number (default 1)
//   - limit: number (default 20)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const userId = searchParams.get('user_id');
    const status = searchParams.get('status') || 'active';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const offset = (page - 1) * limit;
    
    // Get current user for permission checks
    const { data: { user } } = await supabase.auth.getUser();
    
    // Determine which user's subscriptions to fetch
    let targetUserId = userId;
    if (!targetUserId) {
      if (!user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      targetUserId = user.id;
    }
    
    // Check permissions (users can only view their own subscriptions, admins can view any)
    const isAdmin = user ? await isUserAdmin(supabase, user.id) : false;
    if (targetUserId !== user?.id && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to view these subscriptions' },
        { status: 403 }
      );
    }
    
    // Build query
    let query = supabase
      .from('subscriptions')
      .select(`
        *,
        channel:channel_id (
          id,
          handle,
          display_name,
          avatar_url,
          description,
          subscriber_count,
          allow_subscriptions
        )
      `, { count: 'exact' })
      .eq('subscriber_id', targetUserId);
    
    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching subscriptions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      subscriptions: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Subscriptions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/subscriptions
// Subscribe to a channel
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
    const validationResult = subscriptionCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid subscription data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { channel_id, tier_applied, monthly_amount } = validationResult.data;
    
    // Check if channel exists and allows subscriptions
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id, allow_subscriptions')
      .eq('id', channel_id)
      .maybeSingle();
    
    if (channelError || !channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }
    
    if (!channel.allow_subscriptions) {
      return NextResponse.json(
        { error: 'This channel does not accept subscriptions' },
        { status: 400 }
      );
    }
    
    // Check if already subscribed
    const alreadySubscribed = await isAlreadySubscribed(supabase, channel_id, user.id);
    if (alreadySubscribed) {
      return NextResponse.json(
        { error: 'You are already subscribed to this channel' },
        { status: 400 }
      );
    }
    
    // Calculate subscription end date (1 month from now)
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    
    // Create subscription
    const insertData: SubscriptionInsert = {
      channel_id,
      subscriber_id: user.id,
      tier_applied,
      monthly_amount: monthly_amount || null,
      status: 'active',
      expires_at: expiresAt.toISOString(),
    };
    
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(insertData)
      .select(`
        *,
        channel:channel_id (
          id,
          handle,
          display_name,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      console.error('Error creating subscription:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }
    
    // Update subscriber count on channel
    await updateSubscriberCount(supabase, channel_id);
    
    return NextResponse.json({
      success: true,
      subscription: data,
      message: 'Successfully subscribed to channel',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}