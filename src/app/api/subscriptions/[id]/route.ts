// src/app/api/subscriptions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for updating a subscription
const subscriptionUpdateSchema = z.object({
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).optional(),
  tier_applied: z.enum(['community', 'ally', 'corporate', 'patron']).optional(),
  monthly_amount: z.number().min(0).optional(),
});

// Helper to check if user owns the subscription
async function isSubscriptionOwner(supabase: any, subscriptionId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('subscriptions')
    .select('subscriber_id')
    .eq('id', subscriptionId)
    .single();
  
  return data?.subscriber_id === userId;
}

// Helper to update subscriber count after status change
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

// =====================================================
// GET /api/subscriptions/[id]
// Get a single subscription by ID
// =====================================================
export async function GET(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Get current user for permission checks
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { data: subscription, error } = await supabase
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
        ),
        subscriber:subscriber_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // Check permissions
    const isOwner = subscription.subscriber_id === user.id;
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to view this subscription' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ subscription });
    
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/subscriptions/[id]
// Update a subscription (pause, cancel, change tier)
// =====================================================
export async function PATCH(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const isOwner = await isSubscriptionOwner(supabase, id, user.id);
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this subscription' },
        { status: 403 }
      );
    }
    
    // Get current subscription to find channel_id
    const { data: currentSubscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('channel_id, status')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError || !currentSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // FIX: Check if channel_id exists before using it
    if (!currentSubscription.channel_id) {
      return NextResponse.json(
        { error: 'Invalid subscription: missing channel reference' },
        { status: 400 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = subscriptionUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const updates = validationResult.data;
    
    // Update subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
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
      console.error('Error updating subscription:', error);
      return NextResponse.json(
        { error: 'Failed to update subscription' },
        { status: 500 }
      );
    }
    
    // Update subscriber count if status changed
    if (updates.status && updates.status !== currentSubscription.status) {
      await updateSubscriberCount(supabase, currentSubscription.channel_id);
    }
    
    let message = '';
    if (updates.status === 'paused') {
      message = 'Subscription paused';
    } else if (updates.status === 'cancelled') {
      message = 'Subscription cancelled';
    } else if (updates.status === 'active' && currentSubscription.status !== 'active') {
      message = 'Subscription resumed';
    } else {
      message = 'Subscription updated successfully';
    }
    
    return NextResponse.json({
      success: true,
      subscription: data,
      message,
    });
    
  } catch (error) {
    console.error('Subscription update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/subscriptions/[id]
// Delete a subscription (hard delete)
// =====================================================
export async function DELETE(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const isOwner = await isSubscriptionOwner(supabase, id, user.id);
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this subscription' },
        { status: 403 }
      );
    }
    
    // Get channel_id before deletion
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('channel_id')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // FIX: Store channel_id before deletion for later use
    const channelId = subscription.channel_id;
    
    // Delete subscription
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting subscription:', error);
      return NextResponse.json(
        { error: 'Failed to delete subscription' },
        { status: 500 }
      );
    }
    
    // Update subscriber count if channel_id exists
    if (channelId) {
      await updateSubscriberCount(supabase, channelId);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully',
    });
    
  } catch (error) {
    console.error('Subscription deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}