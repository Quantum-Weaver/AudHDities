// =====================================================
// UTILITIES: Proposals
// DEITY: themis-governance
// GENERATED: 2026-07-31T23:16:54.730Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProposalsInsertSchema, ProposalsUpdateSchema } from '@/lib/validators/generated/themis-governance/proposals';
import type { ProposalsInsert, ProposalsRow, ProposalsUpdate } from '@/types/generated/themis-governance/proposals';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new proposals record
 */
export async function createProposals(data: ProposalsInsert): Promise<ProposalsRow> {
  const validated = ProposalsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('proposals')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single proposals record by ID
 */
export async function getProposals(id: string): Promise<ProposalsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of proposals records with pagination
 */
export async function listProposals(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProposalsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('proposals').select('*', { count: 'exact' });
  
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
 * Update a proposals record
 */
export async function updateProposals(id: string, data: ProposalsUpdate): Promise<ProposalsRow> {
  const validated = ProposalsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('proposals')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a proposals record
 */
export async function deleteProposals(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('proposals')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
