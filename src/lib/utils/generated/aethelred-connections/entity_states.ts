// =====================================================
// UTILITIES: EntityStates
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:30:03.703Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EntityStatesInsertSchema, EntityStatesUpdateSchema } from '@/lib/validators/generated/aethelred-connections/entity_states';
import type { EntityStatesInsert, EntityStatesRow, EntityStatesUpdate } from '@/types/generated/aethelred-connections/entity_states';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new entity_states record
 */
export async function createEntityStates(data: EntityStatesInsert): Promise<EntityStatesRow> {
  const validated = EntityStatesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('entity_states')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single entity_states record by ID
 */
export async function getEntityStates(id: string): Promise<EntityStatesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('entity_states')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of entity_states records with pagination
 */
export async function listEntityStates(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EntityStatesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('entity_states').select('*', { count: 'exact' });
  
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
 * Update a entity_states record
 */
export async function updateEntityStates(id: string, data: EntityStatesUpdate): Promise<EntityStatesRow> {
  const validated = EntityStatesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('entity_states')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a entity_states record
 */
export async function deleteEntityStates(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('entity_states')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
