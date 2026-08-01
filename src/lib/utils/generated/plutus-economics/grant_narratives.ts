// =====================================================
// UTILITIES: GrantNarratives
// DEITY: plutus-economics
// GENERATED: 2026-08-01T16:03:06.630Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GrantNarrativesInsertSchema, GrantNarrativesUpdateSchema } from '@/lib/validators/generated/plutus-economics/grant_narratives';
import type { GrantNarrativesInsert, GrantNarrativesRow, GrantNarrativesUpdate } from '@/types/generated/plutus-economics/grant_narratives';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new grant_narratives record
 */
export async function createGrantNarratives(data: GrantNarrativesInsert): Promise<GrantNarrativesRow> {
  const validated = GrantNarrativesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_narratives')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single grant_narratives record by ID
 */
export async function getGrantNarratives(id: string): Promise<GrantNarrativesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('grant_narratives')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of grant_narratives records with pagination
 */
export async function listGrantNarratives(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GrantNarrativesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('grant_narratives').select('*', { count: 'exact' });
  
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
 * Update a grant_narratives record
 */
export async function updateGrantNarratives(id: string, data: GrantNarrativesUpdate): Promise<GrantNarrativesRow> {
  const validated = GrantNarrativesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_narratives')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a grant_narratives record
 */
export async function deleteGrantNarratives(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('grant_narratives')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
