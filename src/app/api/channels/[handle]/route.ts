// src/app/api/channels/[handle]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for channel update
const channelUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  allow_subscriptions: z.boolean().optional(),
  subscription_price_community: z.number().min(0).optional().nullable(),
  subscription_price_ally: z.number().min(0).optional().nullable(),
  content_rating: z.enum(['general', 'mature', 'triggering', 'explicit']).optional(),
});

// Helper to check if user owns the channel
async function isChannelOwner(supabase: any, channelId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('channels')
    .select('owner_id')
    .eq('id', channelId)
    .single();
  
  return data?.owner_id === userId;
}

// =====================================================
// GET /api/channels/[handle]
// Get a single channel by handle
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { handle } = params;
    
    const { data: channel, error } = await supabase
      .from('channels')
      .select(`
        *,
        owner:owner_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('handle', handle)
      .maybeSingle();
    
    if (error || !channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }
    
    // Get recent posts for this channel
    const { data: recentPosts } = await supabase
      .from('posts')
      .select('*')
      .eq('channel_id', channel.id)
      .eq('visibility', 'public')
      .order('published_at', { ascending: false })
      .limit(10);
    
    return NextResponse.json({
      channel,
      recent_posts: recentPosts || [],
    });
    
  } catch (error) {
    console.error('Error fetching channel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/channels/[handle]
// Update a channel (owner or admin only)
// =====================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { handle } = params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the channel
    const { data: channel, error: fetchError } = await supabase
      .from('channels')
      .select('id, owner_id')
      .eq('handle', handle)
      .maybeSingle();
    
    if (fetchError || !channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }
    
    // Check permissions
    const isOwner = channel.owner_id === user.id;
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this channel' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = channelUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    // Update channel
    const { data, error } = await supabase
      .from('channels')
      .update({
        ...validationResult.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', channel.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating channel:', error);
      return NextResponse.json(
        { error: 'Failed to update channel' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      channel: data,
      message: 'Channel updated successfully',
    });
    
  } catch (error) {
    console.error('Channel update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/channels/[handle]
// Delete a channel (owner or admin only)
// =====================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { handle } = params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the channel
    const { data: channel, error: fetchError } = await supabase
      .from('channels')
      .select('id, owner_id')
      .eq('handle', handle)
      .maybeSingle();
    
    if (fetchError || !channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }
    
    // Check permissions
    const isOwner = channel.owner_id === user.id;
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this channel' },
        { status: 403 }
      );
    }
    
    // Delete channel
    const { error } = await supabase
      .from('channels')
      .delete()
      .eq('id', channel.id);
    
    if (error) {
      console.error('Error deleting channel:', error);
      return NextResponse.json(
        { error: 'Failed to delete channel' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Channel deleted successfully',
    });
    
  } catch (error) {
    console.error('Channel deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}