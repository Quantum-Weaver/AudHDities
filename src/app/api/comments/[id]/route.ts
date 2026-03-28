// src/app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for comment update
const commentUpdateSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(5000, "Comment is too long"),
});

// Helper to check if user owns the comment
async function isCommentOwner(supabase: any, commentId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('comments')
    .select('author_id')
    .eq('id', commentId)
    .single();
  
  return data?.author_id === userId;
}

// Helper to update comment count after deletion
async function updateCommentCountAfterDelete(supabase: any, postId: string): Promise<void> {
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
// GET /api/comments/[id]
// Get a single comment with its replies
// =====================================================
export async function GET(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    const { data: comment, error } = await supabase
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
      .eq('id', id)
      .maybeSingle();
    
    if (error || !comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Get replies for this comment
    const { data: replies } = await supabase
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
      .eq('parent_id', id)
      .order('created_at', { ascending: true });
    
    return NextResponse.json({
      comment,
      replies: replies || [],
    });
    
  } catch (error) {
    console.error('Error fetching comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/comments/[id]
// Update a comment (owner or admin only)
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
    const isOwner = await isCommentOwner(supabase, id, user.id);
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this comment' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = commentUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    // Update comment
    const { data, error } = await supabase
      .from('comments')
      .update({
        content: validationResult.data.content,
        is_edited: true,
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
        )
      `)
      .single();
    
    if (error) {
      console.error('Error updating comment:', error);
      return NextResponse.json(
        { error: 'Failed to update comment' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      comment: data,
      message: 'Comment updated successfully',
    });
    
  } catch (error) {
    console.error('Comment update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/comments/[id]
// Delete a comment (owner or admin only)
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
    
    // Get comment to find its post_id before deletion
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('post_id, author_id')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError || !comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // FIX: Check if post_id exists before using it
    if (!comment.post_id) {
      // If no post_id, just delete the comment without updating count
      const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        console.error('Error deleting comment:', deleteError);
        return NextResponse.json(
          { error: 'Failed to delete comment' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Comment deleted successfully',
      });
    }
    
    // Check ownership
    const isOwner = comment.author_id === user.id;
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this comment' },
        { status: 403 }
      );
    }
    
    // Delete comment and all its replies
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
      console.error('Error deleting comment:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      );
    }
    
    // Update comment count on post (only if post_id exists)
    await updateCommentCountAfterDelete(supabase, comment.post_id);
    
    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    });
    
  } catch (error) {
    console.error('Comment deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}