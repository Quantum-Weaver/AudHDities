// =====================================================
// UTILITIES: Seer
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:30:04.037Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SeerInsertSchema, SeerUpdateSchema } from '@/lib/validators/generated/aethelred-connections/seer';
import type { SeerInsert, SeerRow, SeerUpdate } from '@/types/generated/aethelred-connections/seer';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new seer record
 */
export async function createSeer(data: SeerInsert): Promise<SeerRow> {
  const validated = SeerInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('seer')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single seer record by ID
 */
export async function getSeer(id: string): Promise<SeerRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('seer')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of seer records with pagination
 */
export async function listSeer(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SeerRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('seer').select('*', { count: 'exact' });
  
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
 * Update a seer record
 */
export async function updateSeer(id: string, data: SeerUpdate): Promise<SeerRow> {
  const validated = SeerUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('seer')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a seer record
 */
export async function deleteSeer(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('seer')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
