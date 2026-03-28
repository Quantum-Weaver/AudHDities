// src/app/api/emeralds/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';

// Helper to update emerald count after removal
async function updateEmeraldCount(supabase: any, postId: string): Promise<void> {
  const { count } = await supabase
    .from('emeralds')
    .select('id', { count: 'exact', head: true })
    .eq('post_id', postId);
  
  await supabase
    .from('posts')
    .update({ emerald_count: count || 0 })
    .eq('id', postId);
}

// Helper to check if user owns the emerald
async function isEmeraldOwner(supabase: any, emeraldId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('emeralds')
    .select('giver_id')
    .eq('id', emeraldId)
    .single();
  
  return data?.giver_id === userId;
}

// =====================================================
// GET /api/emeralds/[id]
// Get a single emerald by ID
// =====================================================
export async function GET(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    const { data: emerald, error } = await supabase
      .from('emeralds')
      .select(`
        *,
        giver:giver_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        post:post_id (
          id,
          title,
          content_type
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error || !emerald) {
      return NextResponse.json(
        { error: 'Emerald not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ emerald });
    
  } catch (error) {
    console.error('Error fetching emerald:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/emeralds/[id]
// Remove an emerald (owner or admin only)
// =====================================================
export async function DELETE(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get emerald to find its post_id before deletion
    const { data: emerald, error: fetchError } = await supabase
      .from('emeralds')
      .select('post_id, giver_id')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError || !emerald) {
      return NextResponse.json(
        { error: 'Emerald not found' },
        { status: 404 }
      );
    }
    
    // Check if user owns the emerald or is admin
    const isOwner = emerald.giver_id === user.id;
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to remove this emerald' },
        { status: 403 }
      );
    }
    
    // Delete emerald
    const { error: deleteError } = await supabase
      .from('emeralds')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
      console.error('Error removing emerald:', deleteError);
      return NextResponse.json(
        { error: 'Failed to remove emerald' },
        { status: 500 }
      );
    }
    
    // Update emerald count on post
    if (emerald.post_id) {
      await updateEmeraldCount(supabase, emerald.post_id);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Emerald removed successfully',
    });
    
  } catch (error) {
    console.error('Emerald removal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}