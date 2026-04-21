// =====================================================
// API ROUTE: /api/generated/hestia-core/profiles/[id]
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { ProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/profiles';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'profiles not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    // Remove email for non-owners (customize as needed)
    const { data: { user } } = await supabase.auth.getUser();
    const isOwner = user?.id === data.id;
    
    if (!isOwner && data.email) {
      const { email, ...rest } = data;
      return NextResponse.json({ success: true, data: rest });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    const body = await request.json();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const { data: existing } = await supabase
      .from('profiles')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const validated = ProfilesUpdateSchema.parse(body);
    
    const { data, error } = await supabase
      .from('profiles')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'profiles not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profiles' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const { data: existing } = await supabase
      .from('profiles')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'profiles not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete profiles' },
      { status: 500 }
    );
  }
}
