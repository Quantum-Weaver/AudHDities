// =====================================================
// UTILITIES: SeedTypes
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.835Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SeedTypesInsertSchema, SeedTypesUpdateSchema } from '@/lib/validators/generated/hestia-core/seed_types';
import type { SeedTypesInsert, SeedTypesRow, SeedTypesUpdate } from '@/types/generated/hestia-core/seed_types';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new seed_types record
 */
export async function createSeedTypes(data: SeedTypesInsert): Promise<SeedTypesRow> {
  const validated = SeedTypesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('seed_types')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single seed_types record by ID
 */
export async function getSeedTypes(id: string): Promise<SeedTypesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('seed_types')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of seed_types records with pagination
 */
export async function listSeedTypes(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SeedTypesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('seed_types').select('*', { count: 'exact' });
  
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
 * Update a seed_types record
 */
export async function updateSeedTypes(id: string, data: SeedTypesUpdate): Promise<SeedTypesRow> {
  const validated = SeedTypesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('seed_types')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a seed_types record
 */
export async function deleteSeedTypes(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('seed_types')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
