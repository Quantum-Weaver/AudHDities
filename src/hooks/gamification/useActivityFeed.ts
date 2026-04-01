// hooks/gamification/useActivityFeed.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { PersonalizedFeedItem } from '@/types/supabase/tables/feed';

interface UseActivityFeedOptions {
  userId?: string;
  channelId?: string;
  limit?: number;
  type?: 'following' | 'discover' | 'all';
}

interface UseActivityFeedReturn {
  items: PersonalizedFeedItem[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useActivityFeed(options: UseActivityFeedOptions = {}): UseActivityFeedReturn {
  const { userId, channelId, limit = 20, type = 'following' } = options;
  const { user } = useAuth();
  const [items, setItems] = useState<PersonalizedFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchFeed = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;

      let query = supabase
        .from('personalized_feed')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false });

      // Apply filters
      if (userId) {
        query = query.eq('author_id', userId);
      }

      if (channelId) {
        query = query.eq('channel_id', channelId);
      }

      // Type-based filtering
      if (type === 'following' && user) {
        // Get user's subscriptions for feed ranking
        const { data: subscriptions } = await supabase
          .from('subscriptions')
          .select('channel_id')
          .eq('subscriber_id', user.id)
          .eq('status', 'active');

        if (subscriptions && subscriptions.length > 0) {
          const channelIds = subscriptions.map(s => s.channel_id);
          query = query.in('channel_id', channelIds);
        } else {
          // No subscriptions, return empty
          setItems([]);
          setHasMore(false);
          setLoading(false);
          return;
        }
      }

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Filter out null IDs
      const validItems = (data || []).filter(item => item.id !== null) as PersonalizedFeedItem[];

      if (reset) {
        setItems(validItems);
      } else {
        setItems(prev => [...prev, ...validItems]);
      }

      setHasMore(validItems.length === limit);
      setPage(currentPage);

    } catch (err) {
      console.error('Error fetching activity feed:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch feed'));
    } finally {
      setLoading(false);
    }
  }, [userId, channelId, limit, type, page, supabase, user]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchFeed(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchFeed(true);
  };

  useEffect(() => {
    fetchFeed(true);
  }, [userId, channelId, type]);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}