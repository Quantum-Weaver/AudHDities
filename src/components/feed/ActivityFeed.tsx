// components/feed/ActivityFeed.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Heart, MessageCircle, Share2, Eye, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase/database.types';

// Use the generated types from your database
type PersonalizedFeedRow = Database['public']['Views']['personalized_feed']['Row'];

interface ActivityFeedProps {
  userId?: string;
  limit?: number;
  showEmptyState?: boolean;
}

// Helper function for safe date formatting
const formatRelativeTime = (dateString: string | null): string => {
  if (!dateString) return 'Unknown date';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
};

// Helper for content type colors
const getContentTypeColor = (type: string | null): string => {
  if (!type) return 'bg-white/5 text-white/40';
  
  const colors: Record<string, string> = {
    text: 'bg-blue-500/20 text-blue-400',
    image: 'bg-green-500/20 text-green-400',
    audio: 'bg-purple-500/20 text-purple-400',
    video: 'bg-pink-500/20 text-pink-400',
    mixed: 'bg-cyan-500/20 text-cyan-400',
  };
  
  return colors[type] || 'bg-white/5 text-white/40';
};

export function ActivityFeed({ 
  userId, 
  limit = 10,
  showEmptyState = true 
}: ActivityFeedProps) {
  const [feed, setFeed] = useState<PersonalizedFeedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    async function loadFeed() {
      try {
        setLoading(true);
        
        let query = supabase
          .from('personalized_feed')
          .select('*')
          .order('published_at', { ascending: false, nullsFirst: false })
          .limit(limit);

        if (userId) {
          query = query.eq('author_id', userId);
        }

        const { data, error: feedError } = await query;

        if (feedError) throw feedError;
        
        // Filter out items with null id since they're not useful
        const validData = (data || []).filter((item): item is PersonalizedFeedRow => item.id !== null);
        
        if (isMounted) {
          setFeed(validData);
        }
      } catch (err) {
        console.error('Error loading feed:', err);
        if (isMounted) {
          setError('Failed to load activity feed');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFeed();

    const channel = supabase
      .channel('feed-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        () => {
          loadFeed();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [userId, limit, supabase]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/5 rounded w-1/4" />
                <div className="h-3 bg-white/5 rounded w-1/3" />
                <div className="h-20 bg-white/5 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <p className="text-red-400">{error}</p>
      </Card>
    );
  }

  if (feed.length === 0 && showEmptyState) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="text-white/20" size={24} />
        </div>
        <h3 className="text-white font-bold mb-2">No activity yet</h3>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          {userId 
            ? "This user hasn't posted anything yet. Check back later!"
            : "Your feed is empty. Follow some creators to see their posts here!"}
        </p>
      </Card>
    );
  }

  if (feed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {feed.map((item) => (
        <Card key={item.id} className="p-4 hover:border-white/20 transition-colors">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar 
                src={null} 
                alt={item.channel_name || 'User'}
                size="sm"
              />
              <div>
                <Link 
                  href={`/channel/${item.channel_handle}`}
                  className="text-white font-medium hover:text-cyan-400 transition-colors"
                >
                  {item.channel_name || item.channel_handle || 'Anonymous'}
                </Link>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock size={12} />
                  <span>{formatRelativeTime(item.published_at || item.created_at)}</span>
                  {item.visibility && item.visibility !== 'public' && (
                    <Badge variant="outline" size="sm">
                      {item.visibility}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {item.content_type && (
              <Badge className={getContentTypeColor(item.content_type)} size="sm">
                {item.content_type}
              </Badge>
            )}
          </div>

          {/* Content */}
          <Link href={`/post/${item.id}`} className="block group">
            {item.title && (
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h4>
            )}
            
            {item.body && (
              <p className="text-white/70 text-sm line-clamp-3 mb-3">
                {item.body}
              </p>
            )}

            {item.media_urls && item.media_urls.length > 0 && (
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img 
                  src={item.media_urls[0]} 
                  alt=""
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.media_urls.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded">
                    +{item.media_urls.length - 1} more
                  </div>
                )}
              </div>
            )}

            {item.sovereignty_tags && item.sovereignty_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {item.sovereignty_tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </Link>

          {/* Engagement stats */}
          <div className="flex items-center gap-4 pt-3 border-t border-white/5">
            <button className="flex items-center gap-1 text-white/40 hover:text-cyan-400 transition-colors">
              <Heart size={16} />
              <span className="text-sm">{item.emerald_count || 0}</span>
            </button>
            
            <Link 
              href={`/post/${item.id}#comments`}
              className="flex items-center gap-1 text-white/40 hover:text-cyan-400 transition-colors"
            >
              <MessageCircle size={16} />
              <span className="text-sm">{item.comment_count || 0}</span>
            </Link>
            
            <button className="flex items-center gap-1 text-white/40 hover:text-cyan-400 transition-colors ml-auto">
              <Share2 size={16} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}