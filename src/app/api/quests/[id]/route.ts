// src/app/api/quests/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for quest update
const questUpdateSchema = z.object({
  house: z.enum(['hearth_keeper', 'chancellor', 'seer', 'aethelred', 'curator', 'archivist', 'skald', 'codex', 'executioner']).optional(),
  title: z.string().min(3).max(200).optional(),
  description: z.string().max(1000).optional(),
  instructions: z.string().max(5000).optional(),
  required_sovereignty_score: z.number().min(0).optional(),
  prerequisite_quest_id: z.string().uuid().optional().nullable(),
  sovereignty_reward: z.number().min(0).optional(),
  residual_multiplier_bonus: z.number().min(0).max(2).optional(),
  submission_type: z.enum(['text', 'image', 'file', 'audio', 'video', 'link', 'auto']).optional(),
  order_index: z.number().min(0).optional(),
  is_active: z.boolean().optional(),
});

// =====================================================
// GET /api/quests/[id]
// Get a single quest with user progress
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Fetch quest
    const { data: quest, error } = await supabase
      .from('quests')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error || !quest) {
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }
    
    // Get user's progress if logged in
    let userProgress = null;
    if (user) {
      const { data: progress } = await supabase
        .from('user_quests')
        .select('*')
        .eq('quest_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      
      userProgress = progress;
    }
    
    return NextResponse.json({
      quest,
      user_progress: userProgress,
    });
    
  } catch (error) {
    console.error('Error fetching quest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/quests/[id]
// Update a quest (admin only)
// =====================================================
export async function PATCH(
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
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = questUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    // Update quest
    const { data, error } = await supabase
      .from('quests')
      .update({
        ...validationResult.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating quest:', error);
      return NextResponse.json(
        { error: 'Failed to update quest' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      quest: data,
      message: 'Quest updated successfully',
    });
    
  } catch (error) {
    console.error('Quest update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/quests/[id]
// Delete a quest (admin only)
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
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Delete quest
    const { error } = await supabase
      .from('quests')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting quest:', error);
      return NextResponse.json(
        { error: 'Failed to delete quest' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Quest deleted successfully',
    });
    
  } catch (error) {
    console.error('Quest deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}