// hooks/gamification/usePosts.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Post, PostWithAuthor, PostInsert } from '@/types/supabase/tables/posts';

interface UsePostsOptions {
  channelId?: string;
  authorId?: string;
  limit?: number;
}

interface UsePostsReturn {
  posts: PostWithAuthor[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  createPost: (post: PostInsert) => Promise<PostWithAuthor | null>;
}

// Helper to normalize post with author and channel
function normalizePost(data: any): PostWithAuthor {
  return {
    ...data,
    author: data.author ? {
      id: data.author.id,
      username: data.author.username,
      display_name: data.author.display_name,
      avatar_url: data.author.avatar_url,
    } : null,
    channel: data.channel ? {
      id: data.channel.id,
      handle: data.channel.handle,
      display_name: data.channel.display_name,
    } : null,
  };
}

export function usePosts(options: UsePostsOptions = {}): UsePostsReturn {
  const { channelId, authorId, limit = 20 } = options;
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchPosts = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;

      let query = supabase
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
            display_name
          )
        `)
        .order('published_at', { ascending: false, nullsFirst: false });

      if (channelId) {
        query = query.eq('channel_id', channelId);
      }

      if (authorId) {
        query = query.eq('author_id', authorId);
      }

      // Only show public posts or user's own posts
      if (!user) {
        query = query.eq('visibility', 'public');
      }

      query = query.range(offset, offset + limit - 1);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const normalizedPosts = (data || []).map(normalizePost);

      if (reset) {
        setPosts(normalizedPosts);
      } else {
        setPosts(prev => [...prev, ...normalizedPosts]);
      }

      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);

    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, channelId, authorId, user, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchPosts(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchPosts(true);
  };

  const createPost = useCallback(async (post: PostInsert): Promise<PostWithAuthor | null> => {
    if (!user) {
      setError(new Error('You must be logged in to create a post'));
      return null;
    }

    try {
      const postData = {
        ...post,
        author_id: user.id,
        published_at: new Date().toISOString(),
      };

      const { data, error: createError } = await supabase
        .from('posts')
        .insert(postData)
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

      if (createError) throw createError;

      // Refresh list
      await refresh();

      return normalizePost(data);

    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err : new Error('Failed to create post'));
      return null;
    }
  }, [user, supabase, refresh]);

  useEffect(() => {
    fetchPosts(true);
  }, [channelId, authorId]);

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    createPost,
  };
}