// =====================================================
// UTILITIES: GrantOpportunities
// DEITY: plutus-economics
// GENERATED: 2026-07-18T23:09:31.275Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GrantOpportunitiesInsertSchema, GrantOpportunitiesUpdateSchema } from '@/lib/validators/generated/plutus-economics/grant_opportunities';
import type { GrantOpportunitiesInsert, GrantOpportunitiesRow, GrantOpportunitiesUpdate } from '@/types/generated/plutus-economics/grant_opportunities';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new grant_opportunities record
 */
export async function createGrantOpportunities(data: GrantOpportunitiesInsert): Promise<GrantOpportunitiesRow> {
  const validated = GrantOpportunitiesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_opportunities')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single grant_opportunities record by ID
 */
export async function getGrantOpportunities(id: string): Promise<GrantOpportunitiesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('grant_opportunities')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of grant_opportunities records with pagination
 */
export async function listGrantOpportunities(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GrantOpportunitiesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('grant_opportunities').select('*', { count: 'exact' });
  
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
 * Update a grant_opportunities record
 */
export async function updateGrantOpportunities(id: string, data: GrantOpportunitiesUpdate): Promise<GrantOpportunitiesRow> {
  const validated = GrantOpportunitiesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_opportunities')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a grant_opportunities record
 */
export async function deleteGrantOpportunities(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('grant_opportunities')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
