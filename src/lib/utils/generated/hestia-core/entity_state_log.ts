// =====================================================
// UTILITIES: EntityStateLog
// DEITY: hestia-core
// GENERATED: 2026-04-30T15:32:13.448Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EntityStateLogInsertSchema, EntityStateLogUpdateSchema } from '@/lib/validators/generated/hestia-core/entity_state_log';
import type { EntityStateLogInsert, EntityStateLogRow, EntityStateLogUpdate } from '@/types/generated/hestia-core/entity_state_log';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new entity_state_log record
 */
export async function createEntityStateLog(data: EntityStateLogInsert): Promise<EntityStateLogRow> {
  const validated = EntityStateLogInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('entity_state_log')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single entity_state_log record by ID
 */
export async function getEntityStateLog(id: string): Promise<EntityStateLogRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('entity_state_log')
    .select('*')
    .eq('entity_state_log_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of entity_state_log records with pagination
 */
export async function listEntityStateLog(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EntityStateLogRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('entity_state_log').select('*', { count: 'exact' });
  
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
 * Update a entity_state_log record
 */
export async function updateEntityStateLog(id: string, data: EntityStateLogUpdate): Promise<EntityStateLogRow> {
  const validated = EntityStateLogUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('entity_state_log')
    .update(validated)
    .eq('entity_state_log_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a entity_state_log record
 */
export async function deleteEntityStateLog(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('entity_state_log')
    .delete()
    .eq('entity_state_log_id', id);
  
  if (error) throw error;
  return true;
}
