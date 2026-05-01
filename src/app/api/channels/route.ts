// src/app/api/channels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import type { ChannelInsert, ChannelWithRelations } from '@/types/supabase/tables/channels';
import type { Json } from '@/types/supabase/database.types';

// Validation schema for channel creation
const channelCreateSchema = z.object({
  handle: z.string()
    .min(3, "Handle must be at least 3 characters")
    .max(50, "Handle must be less than 50 characters")
    .regex(/^[a-z0-9_]+$/, "Handle must contain only lowercase letters, numbers, and underscores"),
  display_name: z.string().min(1, "Display name is required").max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  allow_subscriptions: z.boolean().optional().default(true),
  subscription_price_community: z.number().min(0).optional().nullable(),
  subscription_price_ally: z.number().min(0).optional().nullable(),
  content_rating: z.enum(['general', 'mature', 'triggering', 'explicit']).optional().default('general'),
});

// Helper to generate unique handle if needed
async function generateUniqueHandle(supabase: any, baseHandle: string): Promise<string> {
  let handle = baseHandle;
  let counter = 1;
  let exists = true;
  
  while (exists) {
    const { data } = await supabase
      .from('channels')
      .select('id')
      .eq('handle', handle)
      .maybeSingle();
    
    if (!data) {
      exists = false;
    } else {
      handle = `${baseHandle}_${counter}`;
      counter++;
    }
  }
  
  return handle;
}

// Helper to convert to Json
function toJson<T>(data: T): Json {
  return data as unknown as Json;
}

// =====================================================
// GET /api/channels
// List channels with pagination and filters
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - search: string (optional)
//   - sort: 'newest' | 'popular' (default 'newest')
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    
    const offset = (page - 1) * limit;
    
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
      `, { count: 'exact' });
    
    if (search) {
      query = query.or(`handle.ilike.%${search}%,display_name.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    if (sort === 'popular') {
      query = query.order('subscriber_count', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching channels:', error);
      return NextResponse.json(
        { error: 'Failed to fetch channels' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      channels: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Channels API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/channels
// Create a new channel (requires authentication)
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
    const validationResult = channelCreateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid channel data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const channelData = validationResult.data;
    
    // Check if handle is available
    const { data: existingHandle } = await supabase
      .from('channels')
      .select('id')
      .eq('handle', channelData.handle)
      .maybeSingle();
    
    let finalHandle = channelData.handle;
    if (existingHandle) {
      finalHandle = await generateUniqueHandle(supabase, channelData.handle);
    }
    
    // Create channel
    const insertData: ChannelInsert = {
      owner_id: user.id,
      handle: finalHandle,
      display_name: channelData.display_name || channelData.handle,
      description: channelData.description || null,
      avatar_url: channelData.avatar_url || null,
      allow_subscriptions: channelData.allow_subscriptions,
      subscription_price_community: channelData.subscription_price_community || null,
      subscription_price_ally: channelData.subscription_price_ally || null,
      content_rating: channelData.content_rating,
    };
    
    const { data, error } = await supabase
      .from('channels')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating channel:', error);
      return NextResponse.json(
        { error: 'Failed to create channel' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      channel: data,
      message: `Channel created successfully: ${finalHandle}`,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Channel creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}