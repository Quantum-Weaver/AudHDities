// =====================================================
// UTILITIES: Distributions
// DEITY: plutus-economics
// GENERATED: 2026-07-31T00:35:01.345Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { DistributionsInsertSchema, DistributionsUpdateSchema } from '@/lib/validators/generated/plutus-economics/distributions';
import type { DistributionsInsert, DistributionsRow, DistributionsUpdate } from '@/types/generated/plutus-economics/distributions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new distributions record
 */
export async function createDistributions(data: DistributionsInsert): Promise<DistributionsRow> {
  const validated = DistributionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('distributions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single distributions record by ID
 */
export async function getDistributions(id: string): Promise<DistributionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('distributions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of distributions records with pagination
 */
export async function listDistributions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: DistributionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('distributions').select('*', { count: 'exact' });
  
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
 * Update a distributions record
 */
export async function updateDistributions(id: string, data: DistributionsUpdate): Promise<DistributionsRow> {
  const validated = DistributionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('distributions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a distributions record
 */
export async function deleteDistributions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('distributions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
