// src/app/api/admin/transparency/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { Json } from '@/types/supabase/database.types';

// Validation schema for creating a public note
const publicNoteSchema = z.object({
  action: z.string().min(1, "Action is required"),
  public_note: z.string().min(1, "Public note is required"),
  target_id: z.string().uuid().optional().nullable(),
  target_type: z.string().optional().nullable(),
  metadata: z.any().optional().nullable(), // Will be cast to Json
});

// =====================================================
// GET /api/admin/transparency
// Get all admin logs (admin only)
// Query params:
//   - page: number (default 1)
//   - limit: number (default 20)
//   - search: string (optional)
// =====================================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
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
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('admin_logs')
      .select(`
        *,
        admin:admin_id (
          id,
          username,
          display_name
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });
    
    if (search) {
      query = query.or(`action.ilike.%${search}%,public_note.ilike.%${search}%`);
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching admin logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch admin logs' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      logs: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    
  } catch (error) {
    console.error('Admin transparency API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/admin/transparency
// Create a public admin note (admin only)
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
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validationResult = publicNoteSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid note data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { action, public_note, target_id, target_type, metadata } = validationResult.data;
    
    // Convert metadata to Json type (if present)
    let metadataJson: Json | null = null;
    if (metadata) {
      metadataJson = metadata as Json;
    }
    
    // Create admin log
    const { data, error } = await supabase
      .from('admin_logs')
      .insert({
        admin_id: user.id,
        action,
        public_note,
        target_id: target_id || null,
        target_type: target_type || null,
        metadata: metadataJson,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating admin log:', error);
      return NextResponse.json(
        { error: 'Failed to create public note' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      log: data,
      message: 'Public note created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Admin transparency create error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}