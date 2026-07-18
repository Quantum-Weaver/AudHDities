// =====================================================
// UTILITIES: CouncilHouses
// DEITY: themis-governance
// GENERATED: 2026-07-18T21:42:54.068Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CouncilHousesInsertSchema, CouncilHousesUpdateSchema } from '@/lib/validators/generated/themis-governance/council_houses';
import type { CouncilHousesInsert, CouncilHousesRow, CouncilHousesUpdate } from '@/types/generated/themis-governance/council_houses';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new council_houses record
 */
export async function createCouncilHouses(data: CouncilHousesInsert): Promise<CouncilHousesRow> {
  const validated = CouncilHousesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('council_houses')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single council_houses record by ID
 */
export async function getCouncilHouses(id: string): Promise<CouncilHousesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('council_houses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of council_houses records with pagination
 */
export async function listCouncilHouses(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CouncilHousesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('council_houses').select('*', { count: 'exact' });
  
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
 * Update a council_houses record
 */
export async function updateCouncilHouses(id: string, data: CouncilHousesUpdate): Promise<CouncilHousesRow> {
  const validated = CouncilHousesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('council_houses')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a council_houses record
 */
export async function deleteCouncilHouses(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('council_houses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
