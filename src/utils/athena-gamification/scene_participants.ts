// =====================================================
// FILE: utils/generated/athena-gamification/scene_participants.ts
// GENERATED: 2026-04-13T06:13:42.201Z
// SOURCE: database.types.ts
// =====================================================

import type { SceneParticipantsRow, SceneParticipantsInsert, SceneParticipantsUpdate } from '@/types/athena-gamification/scene_participants';
import { SceneParticipantsInsertSchema, SceneParticipantsUpdateSchema } from '@/lib/validators/scene_participants';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// SceneParticipants CRUD OPERATIONS
// =====================================================

/**
 * Create a new scene_participants record
 */
export async function createSceneParticipants(data: SceneParticipantsInsert): Promise<{ data: SceneParticipantsRow | null; error: string | null }> {
  try {
    const validated = SceneParticipantsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scene_participants')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating scene_participants:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a scene_participants record by ID
 */
export async function getSceneParticipants(id: string): Promise<{ data: SceneParticipantsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('scene_participants')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching scene_participants:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List scene_participants records with pagination and filters
 */
export async function listSceneParticipants(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SceneParticipantsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('scene_participants').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing scene_participants:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a scene_participants record
 */
export async function updateSceneParticipants(id: string, data: SceneParticipantsUpdate): Promise<{ data: SceneParticipantsRow | null; error: string | null }> {
  try {
    const validated = SceneParticipantsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scene_participants')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating scene_participants:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a scene_participants record
 */
export async function deleteSceneParticipants(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('scene_participants')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting scene_participants:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

