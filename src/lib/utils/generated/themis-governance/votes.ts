// =====================================================
// UTILITIES: Votes
// DEITY: themis-governance
// GENERATED: 2026-07-31T23:16:55.014Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VotesInsertSchema, VotesUpdateSchema } from '@/lib/validators/generated/themis-governance/votes';
import type { VotesInsert, VotesRow, VotesUpdate } from '@/types/generated/themis-governance/votes';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new votes record
 */
export async function createVotes(data: VotesInsert): Promise<VotesRow> {
  const validated = VotesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('votes')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single votes record by ID
 */
export async function getVotes(id: string): Promise<VotesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of votes records with pagination
 */
export async function listVotes(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VotesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('votes').select('*', { count: 'exact' });
  
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
 * Update a votes record
 */
export async function updateVotes(id: string, data: VotesUpdate): Promise<VotesRow> {
  const validated = VotesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('votes')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a votes record
 */
export async function deleteVotes(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('votes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
