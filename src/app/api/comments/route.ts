// src/app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { CommentInsert, CommentWithRelations } from '@/types/supabase/tables/comments';

// Validation schema for comment creation
const commentCreateSchema = z.object({
  post_id: z.string().uuid("Invalid post ID"),
  parent_id: z.string().uuid("Invalid parent comment ID").optional().nullable(),
  content: z.string().min(1, "Comment cannot be empty").max(5000, "Comment is too long"),
});

// Validation schema for comment update
const commentUpdateSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(5000, "Comment is too long"),
});

// Helper to check if user can comment on a post
async function canCommentOnPost(supabase: any, postId: string, userId: string): Promise<boolean> {
  // First, get the post and its visibility settings
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
  
  // Public posts are always commentable
  if (post.visibility === 'public') return true;
  
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

// Helper to get comment count for a post
async function updateCommentCount(supabase: any, postId: string): Promise<void> {
  const { count } = await supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('post_id', postId);
  
  await supabase
    .from('posts')
    .update({ comment_count: count || 0 })
    .eq('id', postId);
}

// =====================================================
// GET /api/comments
// List comments with pagination
// Query params:
//   - post_id: string (required)
//   - page: number (default 1)
//   - limit: number (default 20)
//   - parent_id: string (optional, for replies)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const postId = searchParams.get('post_id');
    const parentId = searchParams.get('parent_id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    if (!postId) {
      return NextResponse.json(
        { error: 'post_id is required' },
        { status: 400 }
      );
    }
    
    const offset = (page - 1) * limit;
    
    let query = supabase
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
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    
    if (parentId) {
      query = query.eq('parent_id', parentId);
    } else {
      query = query.is('parent_id', null);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }
    
    // Get reply counts for each comment
    let comments = data || [];
    if (comments.length > 0) {
      const commentIds = comments.map(c => c.id);
      const { data: replyCounts } = await supabase
        .from('comments')
        .select('parent_id, id', { count: 'exact' })
        .in('parent_id', commentIds)
        .not('parent_id', 'is', null);
      
      const replyCountMap = new Map<string, number>();
      replyCounts?.forEach(rc => {
        if (rc.parent_id) {
          replyCountMap.set(rc.parent_id, (replyCountMap.get(rc.parent_id) || 0) + 1);
        }
      });
      
      comments = comments.map(comment => ({
        ...comment,
        reply_count: replyCountMap.get(comment.id) || 0,
      }));
    }
    
    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Comments API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/comments
// Create a new comment (requires authentication)
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
    const validationResult = commentCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid comment data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { post_id, parent_id, content } = validationResult.data;
    
    // Check if user can comment on this post
    const canComment = await canCommentOnPost(supabase, post_id, user.id);
    if (!canComment) {
      return NextResponse.json(
        { error: 'You do not have permission to comment on this post' },
        { status: 403 }
      );
    }
    
    // Check if parent comment exists (if provided)
    if (parent_id) {
      const { data: parentComment, error: parentError } = await supabase
        .from('comments')
        .select('id')
        .eq('id', parent_id)
        .maybeSingle();
      
      if (parentError || !parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }
    
    // Create comment
    const insertData: CommentInsert = {
      post_id,
      author_id: user.id,
      parent_id: parent_id || null,
      content,
    };
    
    const { data, error } = await supabase
      .from('comments')
      .insert(insertData)
      .select(`
        *,
        author:author_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }
    
    // Update comment count on post
    await updateCommentCount(supabase, post_id);
    
    return NextResponse.json({
      success: true,
      comment: data,
      message: 'Comment added successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}