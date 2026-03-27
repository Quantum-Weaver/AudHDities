// hooks/gamification/useComments.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Comment, CommentInsert, CommentWithRelations } from '@/types/supabase/tables/comments';

interface UseCommentsOptions {
  postId?: string;
  parentId?: string | null;
  limit?: number;
}

interface UseCommentsReturn {
  comments: CommentWithRelations[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  addComment: (content: string, parentId?: string | null) => Promise<CommentWithRelations | null>;
  updateComment: (commentId: string, content: string) => Promise<CommentWithRelations | null>;
  deleteComment: (commentId: string) => Promise<boolean>;
}

export function useComments(options: UseCommentsOptions = {}): UseCommentsReturn {
  const { postId, parentId = null, limit = 20 } = options;
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchComments = useCallback(async (reset: boolean = false) => {
    if (!postId) return;

    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;

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

      if (parentId === null) {
        query = query.is('parent_id', null);
      } else if (parentId) {
        query = query.eq('parent_id', parentId);
      }

      query = query.range(offset, offset + limit - 1);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const normalizedComments = (data || []).map(comment => ({
        ...comment,
        author: comment.author,
      })) as CommentWithRelations[];

      if (reset) {
        setComments(normalizedComments);
      } else {
        setComments(prev => [...prev, ...normalizedComments]);
      }

      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);

    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
    } finally {
      setLoading(false);
    }
  }, [postId, parentId, page, limit, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchComments(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchComments(true);
  };

  const addComment = useCallback(async (content: string, replyToParentId?: string | null): Promise<CommentWithRelations | null> => {
    if (!user) {
      setError(new Error('You must be logged in to comment'));
      return null;
    }
    if (!postId) {
      setError(new Error('No post specified'));
      return null;
    }
    if (!content.trim()) {
      setError(new Error('Comment cannot be empty'));
      return null;
    }

    try {
      const insertData: CommentInsert = {
        post_id: postId,
        author_id: user.id,
        parent_id: replyToParentId !== undefined ? replyToParentId : parentId,
        content: content.trim(),
      };

      const { data, error: insertError } = await supabase
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

      if (insertError) throw insertError;

      const newComment = data as CommentWithRelations;

      // Refresh the list to show the new comment
      await refresh();

      return newComment;

    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err instanceof Error ? err : new Error('Failed to add comment'));
      return null;
    }
  }, [user, postId, parentId, supabase, refresh]);

  const updateComment = useCallback(async (commentId: string, content: string): Promise<CommentWithRelations | null> => {
    if (!user) {
      setError(new Error('You must be logged in to update a comment'));
      return null;
    }
    if (!content.trim()) {
      setError(new Error('Comment cannot be empty'));
      return null;
    }

    try {
      const { data, error: updateError } = await supabase
        .from('comments')
        .update({
          content: content.trim(),
          is_edited: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', commentId)
        .eq('author_id', user.id)
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

      if (updateError) throw updateError;

      const updatedComment = data as CommentWithRelations;

      // Update local state
      setComments(prev => prev.map(c => c.id === commentId ? updatedComment : c));

      return updatedComment;

    } catch (err) {
      console.error('Error updating comment:', err);
      setError(err instanceof Error ? err : new Error('Failed to update comment'));
      return null;
    }
  }, [user, supabase]);

  const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to delete a comment'));
      return false;
    }

    try {
      const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('author_id', user.id);

      if (deleteError) throw deleteError;

      // Remove from local state
      setComments(prev => prev.filter(c => c.id !== commentId));

      return true;

    } catch (err) {
      console.error('Error deleting comment:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete comment'));
      return false;
    }
  }, [user, supabase]);

  useEffect(() => {
    if (postId) {
      fetchComments(true);
    }
  }, [postId, parentId]);

  return {
    comments,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    addComment,
    updateComment,
    deleteComment,
  };
}