// =====================================================
// UTILITIES: SceneParticipants
// DEITY: athena-gamification
// GENERATED: 2026-04-22T18:24:19.804Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SceneParticipantsInsertSchema, SceneParticipantsUpdateSchema } from '@/lib/validators/generated/athena-gamification/scene_participants';
import type { SceneParticipantsInsert, SceneParticipantsRow, SceneParticipantsUpdate } from '@/types/generated/athena-gamification/scene_participants';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new scene_participants record
 */
export async function createSceneParticipants(data: SceneParticipantsInsert): Promise<SceneParticipantsRow> {
  const validated = SceneParticipantsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scene_participants')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single scene_participants record by ID
 */
export async function getSceneParticipants(id: string): Promise<SceneParticipantsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('scene_participants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of scene_participants records with pagination
 */
export async function listSceneParticipants(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SceneParticipantsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('scene_participants').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

/**
 * Update a scene_participants record
 */
export async function updateSceneParticipants(id: string, data: SceneParticipantsUpdate): Promise<SceneParticipantsRow> {
  const validated = SceneParticipantsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scene_participants')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a scene_participants record
 */
export async function deleteSceneParticipants(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('scene_participants')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
