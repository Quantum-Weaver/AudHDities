// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { PostWithAuthor } from '@/types/supabase/tables/posts';

// Validation schema for post update
const postUpdateSchema = z.object({
  title: z.string().max(200).optional().nullable(),
  body: z.string().max(10000).optional().nullable(),
  media_urls: z.array(z.string().url()).optional(),
  visibility: z.enum(['public', 'subscribers', 'tier_community', 'tier_ally', 'tier_corporate', 'private']).optional(),
  sovereignty_tags: z.array(z.string()).optional(),
  allow_tipping: z.boolean().optional(),
});

// Helper to check if user owns the post
async function isPostOwner(supabase: any, postId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', postId)
    .single();
  
  return data?.author_id === userId;
}

// =====================================================
// GET /api/posts/[id]
// Get a single post by ID
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Get current user for visibility checks
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:author_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        channel:channel_id (
          id,
          handle,
          display_name,
          allow_subscriptions
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Check visibility permissions
    const isOwner = user?.id === post.author_id;
    const isAdmin = user ? await isUserAdmin(supabase, user.id) : false;
    
    // FIX 1: Handle null channel_id safely
    if (post.visibility !== 'public' && !isOwner && !isAdmin) {
      // For subscriber-only posts, check subscription
      if (post.visibility === 'subscribers' && post.channel?.allow_subscriptions && post.channel_id) {
        // FIX 2: Ensure user?.id is a string before using
        const userId = user?.id;
        if (userId) {
          const { data: subscription } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('channel_id', post.channel_id)
            .eq('subscriber_id', userId)
            .eq('status', 'active')
            .maybeSingle();
          
          if (!subscription) {
            return NextResponse.json(
              { error: 'Post not available' },
              { status: 404 }
            );
          }
        } else {
          return NextResponse.json(
            { error: 'Post not available' },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Post not available' },
          { status: 404 }
        );
      }
    }
    
    // Get comments for this post
    const { data: comments } = await supabase
      .from('comments')
      .select(`
        *,
        author:author_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('post_id', id)
      .is('parent_id', null)
      .order('created_at', { ascending: true });
    
    // Get emeralds for this post
    const { data: emeralds } = await supabase
      .from('emeralds')
      .select('id, giver_id')
      .eq('post_id', id);
    
    // FIX 3: Check if user has given an emerald using correct property
    const hasEmeraldFromUser = user?.id ? emeralds?.some(e => e.giver_id === user.id) : false;
    
    return NextResponse.json({
      post: {
        ...post,
        has_emerald_from_user: hasEmeraldFromUser,
      } as PostWithAuthor,
      comments: comments || [],
      emerald_count: emeralds?.length || 0,
    });
    
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/posts/[id]
// Update a post (owner or admin only)
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
    const isOwner = await isPostOwner(supabase, id, user.id);
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this post' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = postUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    // Update post
    const { data, error } = await supabase
      .from('posts')
      .update({
        ...validationResult.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(`
        *,
        author:author_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        channel:channel_id (
          id,
          handle,
          display_name
        )
      `)
      .single();
    
    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      post: data as PostWithAuthor,
      message: 'Post updated successfully',
    });
    
  } catch (error) {
    console.error('Post update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/posts/[id]
// Delete a post (owner or admin only)
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
    const isOwner = await isPostOwner(supabase, id, user.id);
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this post' },
        { status: 403 }
      );
    }
    
    // Delete post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
    
  } catch (error) {
    console.error('Post deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}