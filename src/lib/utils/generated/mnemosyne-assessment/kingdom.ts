// =====================================================
// UTILITIES: Kingdom
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T21:42:54.264Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { KingdomInsertSchema, KingdomUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/kingdom';
import type { KingdomInsert, KingdomRow, KingdomUpdate } from '@/types/generated/mnemosyne-assessment/kingdom';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new kingdom record
 */
export async function createKingdom(data: KingdomInsert): Promise<KingdomRow> {
  const validated = KingdomInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('kingdom')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single kingdom record by ID
 */
export async function getKingdom(id: string): Promise<KingdomRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('kingdom')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of kingdom records with pagination
 */
export async function listKingdom(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: KingdomRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('kingdom').select('*', { count: 'exact' });
  
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
 * Update a kingdom record
 */
export async function updateKingdom(id: string, data: KingdomUpdate): Promise<KingdomRow> {
  const validated = KingdomUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('kingdom')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a kingdom record
 */
export async function deleteKingdom(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('kingdom')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
