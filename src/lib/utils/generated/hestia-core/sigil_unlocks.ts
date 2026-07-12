// =====================================================
// UTILITIES: SigilUnlocks
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.823Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SigilUnlocksInsertSchema, SigilUnlocksUpdateSchema } from '@/lib/validators/generated/hestia-core/sigil_unlocks';
import type { SigilUnlocksInsert, SigilUnlocksRow, SigilUnlocksUpdate } from '@/types/generated/hestia-core/sigil_unlocks';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new sigil_unlocks record
 */
export async function createSigilUnlocks(data: SigilUnlocksInsert): Promise<SigilUnlocksRow> {
  const validated = SigilUnlocksInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sigil_unlocks')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single sigil_unlocks record by ID
 */
export async function getSigilUnlocks(id: string): Promise<SigilUnlocksRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sigil_unlocks')
    .select('*')
    .eq('sigil_unlocks_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of sigil_unlocks records with pagination
 */
export async function listSigilUnlocks(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SigilUnlocksRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('sigil_unlocks').select('*', { count: 'exact' });
  
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
 * Update a sigil_unlocks record
 */
export async function updateSigilUnlocks(id: string, data: SigilUnlocksUpdate): Promise<SigilUnlocksRow> {
  const validated = SigilUnlocksUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sigil_unlocks')
    .update(validated)
    .eq('sigil_unlocks_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a sigil_unlocks record
 */
export async function deleteSigilUnlocks(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('sigil_unlocks')
    .delete()
    .eq('sigil_unlocks_id', id);
  
  if (error) throw error;
  return true;
}
