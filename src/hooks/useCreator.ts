// app/api/creators/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const supabase = await createServerSupabase();
    const { username } = params;
    
    // First fetch the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .eq('is_creator', true)
      .maybeSingle();
    
    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Then fetch the creator profile separately
    const { data: creatorProfile, error: creatorError } = await supabase
      .from('creator_profiles')
      .select('*')
      .eq('id', profile.id)
      .maybeSingle();
    
    if (creatorError) {
      console.error('Creator profile fetch error:', creatorError);
    }
    
    // Fetch creator's products
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('creator_id', profile.id)
      .eq('is_published', true)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    // Combine the data
    const creator = {
      ...profile,
      creator_profiles: creatorProfile || null,
    };
    
    return NextResponse.json({
      creator,
      products: products || [],
    });
    
  } catch (error) {
    console.error('Creator API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}