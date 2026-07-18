// =====================================================
// UTILITIES: Species
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T21:42:54.530Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SpeciesInsertSchema, SpeciesUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/species';
import type { SpeciesInsert, SpeciesRow, SpeciesUpdate } from '@/types/generated/mnemosyne-assessment/species';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new species record
 */
export async function createSpecies(data: SpeciesInsert): Promise<SpeciesRow> {
  const validated = SpeciesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('species')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single species record by ID
 */
export async function getSpecies(id: string): Promise<SpeciesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('species')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of species records with pagination
 */
export async function listSpecies(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SpeciesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('species').select('*', { count: 'exact' });
  
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
 * Update a species record
 */
export async function updateSpecies(id: string, data: SpeciesUpdate): Promise<SpeciesRow> {
  const validated = SpeciesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('species')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a species record
 */
export async function deleteSpecies(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('species')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
