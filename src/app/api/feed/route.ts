// app/api/feed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const channelId = searchParams.get('channelId');
    const authorId = searchParams.get('authorId');
    
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('personalized_feed')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false });
    
    if (channelId) {
      query = query.eq('channel_id', channelId);
    }
    
    if (authorId) {
      query = query.eq('author_id', authorId);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Feed API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Filter out null IDs
    const validData = (data || []).filter(item => item.id !== null);
    
    return NextResponse.json({
      items: validData,
      pagination: {
        page,
        limit,
        total: validData.length,
        hasMore: validData.length === limit,
      },
    });
    
  } catch (error) {
    console.error('Feed API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}