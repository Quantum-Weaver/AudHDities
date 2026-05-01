// src/app/api/feed/discover/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

// =====================================================
// GET /api/feed/discover
// Discover feed - trending and recommended content
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - sort: 'trending' | 'newest' (default 'trending')
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'trending';
    
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('personalized_feed')
      .select('*')
      .eq('visibility', 'public');
    
    if (sort === 'trending') {
      // Sort by engagement score: emeralds + comments + resonance
      query = query.order('emerald_count', { ascending: false })
        .order('comment_count', { ascending: false })
        .order('resonance_count', { ascending: false });
    } else {
      query = query.order('published_at', { ascending: false, nullsFirst: false });
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Discover feed error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
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
    console.error('Discover feed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}