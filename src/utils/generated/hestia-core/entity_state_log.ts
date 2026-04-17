// =====================================================
// FILE: utils/generated/hestia-core/entity_state_log.ts
// GENERATED: 2026-04-17T22:45:09.886Z
// SOURCE: database.types.ts
// =====================================================

import type { EntityStateLogRow, EntityStateLogInsert, EntityStateLogUpdate } from '@/types/generated/hestia-core/entity_state_log';
import { EntityStateLogRowSchema, EntityStateLogInsertSchema, EntityStateLogUpdateSchema } from '@/lib/validators/generated/hestia-core/entity_state_log';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// EntityStateLog CRUD OPERATIONS
// =====================================================

/**
 * Create a new entity_state_log record
 */
export async function createEntityStateLog(data: EntityStateLogInsert): Promise<{ data: EntityStateLogRow | null; error: string | null }> {
  try {
    const validated = EntityStateLogRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('entity_state_log')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating entity_state_log:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a entity_state_log record by ID
 */
export async function getEntityStateLog(id: string): Promise<{ data: EntityStateLogRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('entity_state_log')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching entity_state_log:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List entity_state_log records with pagination and filters
 */
export async function listEntityStateLog(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EntityStateLogRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('entity_state_log').select('*', { count: 'exact' });
    
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
    console.error('Error listing entity_state_log:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a entity_state_log record
 */
export async function updateEntityStateLog(id: string, data: EntityStateLogUpdate): Promise<{ data: EntityStateLogRow | null; error: string | null }> {
  try {
    const validated = EntityStateLogUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('entity_state_log')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating entity_state_log:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a entity_state_log record
 */
export async function deleteEntityStateLog(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('entity_state_log')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting entity_state_log:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

