// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import type { PostInsert, PostWithAuthor } from '@/types/supabase/tables/posts';
import type { Json } from '@/types/supabase/database.types';

// Validation schema for post creation
const postCreateSchema = z.object({
  channel_id: z.string().uuid("Invalid channel ID"),
  title: z.string().max(200).optional().nullable(),
  body: z.string().max(10000).optional().nullable(),
  content_type: z.enum(['text', 'image', 'audio', 'video', 'mixed']).default('text'),
  media_urls: z.array(z.string().url()).optional().default([]),
  visibility: z.enum(['public', 'subscribers', 'tier_community', 'tier_ally', 'tier_corporate', 'private']).default('public'),
  sovereignty_tags: z.array(z.string()).optional().default([]),
  allow_tipping: z.boolean().optional().default(true),
});

// Helper to convert to Json
function toJson<T>(data: T): Json {
  return data as unknown as Json;
}

// Helper to check channel visibility access
async function canAccessChannel(supabase: any, channelId: string, userId: string | null): Promise<boolean> {
  const { data: channel } = await supabase
    .from('channels')
    .select('allow_subscriptions')
    .eq('id', channelId)
    .single();
  
  // Public channels are always accessible
  if (channel?.allow_subscriptions !== true) {
    return true;
  }
  
  // If user is not logged in and channel requires subscription, deny
  if (!userId) {
    return false;
  }
  
  // Check if user is subscribed
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('channel_id', channelId)
    .eq('subscriber_id', userId)
    .eq('status', 'active')
    .maybeSingle();
  
  return !!subscription;
}

// =====================================================
// GET /api/posts
// List posts with pagination and filters
// Query params:
//   - channel_id: string (optional)
//   - page: number (default 1)
//   - limit: number (default 20)
//   - visibility: string (optional)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const channelId = searchParams.get('channel_id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const visibility = searchParams.get('visibility') || 'public';
    
    const offset = (page - 1) * limit;
    
    // Get current user for visibility checks
    const { data: { user } } = await supabase.auth.getUser();
    
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
      `, { count: 'exact' })
      .order('published_at', { ascending: false });
    
    if (channelId) {
      // Check if user can access this channel
      const canAccess = await canAccessChannel(supabase, channelId, user?.id || null);
      if (!canAccess) {
        return NextResponse.json(
          { error: 'Access denied to this channel' },
          { status: 403 }
        );
      }
      query = query.eq('channel_id', channelId);
    }
    
    // Filter by visibility
    if (visibility !== 'all') {
      if (visibility === 'public') {
        query = query.eq('visibility', 'public');
      } else {
        query = query.eq('visibility', visibility);
      }
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }
    
    // Check if current user has emeralds on posts
    let enhancedPosts = data || [];
    if (user && enhancedPosts.length > 0) {
      const postIds = enhancedPosts.map(p => p.id);
      const { data: emeralds } = await supabase
        .from('emeralds')
        .select('post_id')
        .in('post_id', postIds)
        .eq('giver_id', user.id);
      
      const emeraldSet = new Set(emeralds?.map(e => e.post_id));
      enhancedPosts = enhancedPosts.map(post => ({
        ...post,
        has_emerald_from_user: emeraldSet.has(post.id),
      }));
    }
    
    return NextResponse.json({
      posts: enhancedPosts as PostWithAuthor[],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Posts API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/posts
// Create a new post (requires authentication)
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
    const validationResult = postCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid post data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const postData = validationResult.data;
    
    // Verify channel exists and user has permission to post
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id, owner_id')
      .eq('id', postData.channel_id)
      .maybeSingle();
    
    if (channelError || !channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }
    
    // Only channel owner can post (for now - can be extended)
    if (channel.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'You do not have permission to post in this channel' },
        { status: 403 }
      );
    }
    
    // Create post
    const insertData: PostInsert = {
      author_id: user.id,
      channel_id: postData.channel_id,
      title: postData.title || null,
      body: postData.body || null,
      content_type: postData.content_type,
      media_urls: postData.media_urls,
      visibility: postData.visibility,
      sovereignty_tags: postData.sovereignty_tags,
      allow_tipping: postData.allow_tipping,
      published_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('posts')
      .insert(insertData)
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
      console.error('Error creating post:', error);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      post: data as PostWithAuthor,
      message: 'Post created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}