// =====================================================
// FILE: utils/generated/themis-governance/moderation_actions.ts
// GENERATED: 2026-04-15T19:30:35.571Z
// SOURCE: database.types.ts
// =====================================================

import type { ModerationActionsRow, ModerationActionsInsert, ModerationActionsUpdate } from '@/types/generated/themis-governance/moderation_actions';
import { ModerationActionsRowSchema, ModerationActionsInsertSchema, ModerationActionsUpdateSchema } from '@/lib/validators/generated/themis-governance/moderation_actions';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// ModerationActions CRUD OPERATIONS
// =====================================================

/**
 * Create a new moderation_actions record
 */
export async function createModerationActions(data: ModerationActionsInsert): Promise<{ data: ModerationActionsRow | null; error: string | null }> {
  try {
    const validated = ModerationActionsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('moderation_actions')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating moderation_actions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a moderation_actions record by ID
 */
export async function getModerationActions(id: string): Promise<{ data: ModerationActionsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('moderation_actions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching moderation_actions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List moderation_actions records with pagination and filters
 */
export async function listModerationActions(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ModerationActionsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('moderation_actions').select('*', { count: 'exact' });
    
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
    console.error('Error listing moderation_actions:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a moderation_actions record
 */
export async function updateModerationActions(id: string, data: ModerationActionsUpdate): Promise<{ data: ModerationActionsRow | null; error: string | null }> {
  try {
    const validated = ModerationActionsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('moderation_actions')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating moderation_actions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a moderation_actions record
 */
export async function deleteModerationActions(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('moderation_actions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting moderation_actions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

