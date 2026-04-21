// =====================================================
// API ROUTE: /api/generated/hestia-core/profiles
// =====================================================

import { BADGE_TYPE } from '@/lib/constants/generated/hestia-core/badge_type';
import { COUNCIL_HOUSE } from '@/lib/constants/generated/hestia-core/council_house';
import { NextRequest, NextResponse } from 'next/server';
import { ProfilesInsertSchema } from '@/lib/validators/generated/hestia-core/profiles';
import { SENSORY_MODE } from '@/lib/constants/generated/hestia-core/sensory_mode';
import { USER_STATUS } from '@/lib/constants/generated/hestia-core/user_status';
import { USER_TIER } from '@/lib/constants/generated/hestia-core/user_tier';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = supabase.from('profiles').select('*', { count: 'exact' });
    
    // Apply filters with enum validation if needed
    for (const [key, value] of searchParams.entries()) {
      if (!['limit', 'offset', 'sort', 'order'].includes(key)) {
        // Check if this field is an enum
        const isEnumField = ["badge_type","council_house","sensory_mode","user_status","user_tier"].some(ref => 
          key === ref || key.endsWith('_' + ref)
        );
        if (isEnumField) {
          // Validate enum value before applying filter
          const enumValues = BADGE_TYPE, COUNCIL_HOUSE, SENSORY_MODE, USER_STATUS, USER_TIER;
          if (Object.values(enumValues).includes(value)) {
            query = query.eq(key, value);
          }
        } else {
          query = query.eq(key, value);
        }
      }
    }
    
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') === 'asc';
    query = query.order(sort, { ascending: order });
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    // Remove email for non-owners if present
    const { data: { user } } = await supabase.auth.getUser();
    const sanitizedData = data?.map(item => {
      if (true && item.email && item.id !== user?.id) {
        const { email, ...rest } = item;
        return rest;
      }
      return item;
    });
    
    return NextResponseon({
      success: true,
      data: sanitizedData,
      pagination: { limit, offset, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponseon(
      { success: false, error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await requeston();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponseon(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const validated = ProfilesInsertSchema.parse(body);
    
    const insertData = true 
      ? { ...validated, created_by: user.id }
      : validated;
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(insertData)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponseon({ success: true, data }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponseon(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating profiles:', error);
    return NextResponseon(
      { success: false, error: 'Failed to create profiles' },
      { status: 500 }
    );
  }
}
