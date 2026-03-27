// hooks/gamification/useChannels.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Channel, ChannelInsert, ChannelWithRelations } from '@/types/supabase/tables/channels';

interface UseChannelsOptions {
  limit?: number;
  search?: string;
  sort?: 'newest' | 'popular';
}

interface UseChannelsReturn {
  channels: ChannelWithRelations[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface UseChannelReturn {
  channel: ChannelWithRelations | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

// Helper to normalize channel data
function normalizeChannel(data: any): ChannelWithRelations {
  return {
    ...data,
    owner: data.owner || undefined,
    posts: data.posts || [],
    subscriptions: data.subscriptions || [],
  };
}

// =====================================================
// useChannels - fetch list of channels
// =====================================================
export function useChannels(options: UseChannelsOptions = {}): UseChannelsReturn {
  const { limit = 20, search, sort = 'newest' } = options;
  const [channels, setChannels] = useState<ChannelWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchChannels = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;
      
      let query = supabase
        .from('channels')
        .select(`
          *,
          owner:owner_id (
            id,
            username,
            display_name,
            avatar_url
          )
        `);
      
      if (search) {
        query = query.or(`handle.ilike.%${search}%,display_name.ilike.%${search}%,description.ilike.%${search}%`);
      }
      
      if (sort === 'popular') {
        query = query.order('subscriber_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      
      query = query.range(offset, offset + limit - 1);
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      const normalizedChannels = (data || []).map(normalizeChannel);
      
      if (reset) {
        setChannels(normalizedChannels);
      } else {
        setChannels(prev => [...prev, ...normalizedChannels]);
      }
      
      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);
      
    } catch (err) {
      console.error('Error fetching channels:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch channels'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sort, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchChannels(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchChannels(true);
  };

  useEffect(() => {
    fetchChannels(true);
  }, [search, sort]);

  return {
    channels,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}

// =====================================================
// useChannel - fetch single channel by handle
// =====================================================
export function useChannel(handle: string): UseChannelReturn {
  const [channel, setChannel] = useState<ChannelWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchChannel = useCallback(async () => {
    if (!handle) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
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

      if (fetchError) throw fetchError;

      setChannel(data ? normalizeChannel(data) : null);

    } catch (err) {
      console.error('Error fetching channel:', err);
      setError(err instanceof Error ? err : new Error('Channel not found'));
    } finally {
      setLoading(false);
    }
  }, [handle, supabase]);

  useEffect(() => {
    fetchChannel();
  }, [fetchChannel]);

  return {
    channel,
    loading,
    error,
    refresh: fetchChannel,
  };
}

// =====================================================
// useMyChannel - fetch current user's channel
// =====================================================
export function useMyChannel(): UseChannelReturn & { hasChannel: boolean } {
  const { user } = useAuth();
  const [channel, setChannel] = useState<ChannelWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchChannel = useCallback(async () => {
    if (!user) {
      setChannel(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
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
        .eq('owner_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setChannel(data ? normalizeChannel(data) : null);

    } catch (err) {
      console.error('Error fetching my channel:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch channel'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchChannel();
  }, [fetchChannel]);

  return {
    channel,
    loading,
    error,
    refresh: fetchChannel,
    hasChannel: !!channel,
  };
}

// =====================================================
// useCreateChannel - create a new channel
// =====================================================
export function useCreateChannel() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const createChannel = useCallback(async (data: ChannelInsert): Promise<Channel | null> => {
    if (!user) {
      setError(new Error('You must be logged in to create a channel'));
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: channel, error: createError } = await supabase
        .from('channels')
        .insert({
          ...data,
          owner_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;

      return channel;

    } catch (err) {
      console.error('Error creating channel:', err);
      setError(err instanceof Error ? err : new Error('Failed to create channel'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  return { createChannel, loading, error };
}