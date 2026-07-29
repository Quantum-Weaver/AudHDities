// =====================================================
// UTILITIES: PatronageTiers
// DEITY: plutus-economics
// GENERATED: 2026-07-29T16:16:53.903Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PatronageTiersInsertSchema, PatronageTiersUpdateSchema } from '@/lib/validators/generated/plutus-economics/patronage_tiers';
import type { PatronageTiersInsert, PatronageTiersRow, PatronageTiersUpdate } from '@/types/generated/plutus-economics/patronage_tiers';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new patronage_tiers record
 */
export async function createPatronageTiers(data: PatronageTiersInsert): Promise<PatronageTiersRow> {
  const validated = PatronageTiersInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patronage_tiers')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single patronage_tiers record by ID
 */
export async function getPatronageTiers(id: string): Promise<PatronageTiersRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('patronage_tiers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of patronage_tiers records with pagination
 */
export async function listPatronageTiers(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PatronageTiersRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('patronage_tiers').select('*', { count: 'exact' });
  
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
 * Update a patronage_tiers record
 */
export async function updatePatronageTiers(id: string, data: PatronageTiersUpdate): Promise<PatronageTiersRow> {
  const validated = PatronageTiersUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patronage_tiers')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a patronage_tiers record
 */
export async function deletePatronageTiers(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('patronage_tiers')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
