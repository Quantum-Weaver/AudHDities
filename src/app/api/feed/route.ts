// src/app/api/feed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import type { PersonalizedFeedItem } from '@/types/supabase/tables/feed';

// Helper to check if user has given emerald to a post
async function getUserEmeralds(supabase: any, userId: string, postIds: string[]): Promise<Set<string>> {
  if (postIds.length === 0) return new Set();
  
  const { data } = await supabase
    .from('emeralds')
    .select('post_id')
    .in('post_id', postIds)
    .eq('giver_id', userId);
  
  // FIX: Explicitly type the parameter
  return new Set(data?.map((item: { post_id: string }) => item.post_id) || []);
}

// Helper to get user's subscriptions for feed ranking
async function getUserSubscriptions(supabase: any, userId: string): Promise<Set<string>> {
  const { data } = await supabase
    .from('subscriptions')
    .select('channel_id')
    .eq('subscriber_id', userId)
    .eq('status', 'active');
  
  // FIX: Explicitly type the parameter
  return new Set(data?.map((item: { channel_id: string }) => item.channel_id) || []);
}

// =====================================================
// GET /api/feed
// Personalized feed for the authenticated user
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - type: string (optional) - 'following', 'discover', 'all' (default 'following')
//   - channel_id: string (optional) - filter by specific channel
//   - author_id: string (optional) - filter by specific author
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const feedType = searchParams.get('type') || 'following';
    const channelId = searchParams.get('channel_id');
    const authorId = searchParams.get('author_id');
    
    const offset = (page - 1) * limit;
    
    // Get current user for personalization
    const { data: { user } } = await supabase.auth.getUser();
    
    // Base query on the personalized_feed view
    let query = supabase
      .from('personalized_feed')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false });
    
    // Apply filters based on feed type
    if (feedType === 'following' && user) {
      // Get user's subscriptions
      const subscriptions = await getUserSubscriptions(supabase, user.id);
      if (subscriptions.size > 0) {
        const channelIds = Array.from(subscriptions);
        query = query.in('channel_id', channelIds);
      } else {
        // If no subscriptions, show nothing for following feed
        return NextResponse.json({
          items: [],
          pagination: {
            page,
            limit,
            total: 0,
            hasMore: false,
          },
        });
      }
    }
    
    // Apply optional filters
    if (channelId) {
      query = query.eq('channel_id', channelId);
    }
    
    if (authorId) {
      query = query.eq('author_id', authorId);
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Feed API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Filter out null IDs
    let feedItems = (data || []).filter((item: PersonalizedFeedItem) => item.id !== null) as PersonalizedFeedItem[];
    
    // Add user-specific engagement data if logged in
    if (user && feedItems.length > 0) {
      const postIds = feedItems.map((item: PersonalizedFeedItem) => item.id).filter((id): id is string => id !== null);
      const userEmeralds = await getUserEmeralds(supabase, user.id, postIds);
      
      feedItems = feedItems.map((item: PersonalizedFeedItem) => ({
        ...item,
        has_emerald_from_user: item.id ? userEmeralds.has(item.id) : false,
      }));
    }
    
    // Check if user is admin to show private content (optional)
    const isAdmin = user ? await isUserAdmin(supabase, user.id) : false;
    
    // Filter private content if not admin or not the author
    const filteredItems = feedItems.filter((item: PersonalizedFeedItem) => {
      // Public posts are always visible
      if (item.visibility === 'public') return true;
      
      // If not logged in, can't see non-public
      if (!user) return false;
      
      // Admin can see everything
      if (isAdmin) return true;
      
      // Author can see their own posts
      if (item.author_id === user.id) return true;
      
      // For subscriber-only posts, check subscription
      if (item.visibility === 'subscribers' && item.channel_id) {
        // This would need a subscription check - we could add this later
        return false;
      }
      
      return false;
    });
    
    return NextResponse.json({
      items: filteredItems,
      pagination: {
        page,
        limit,
        total: filteredItems.length,
        hasMore: filteredItems.length === limit,
      },
    });
    
  } catch (error) {
    console.error('Feed API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}