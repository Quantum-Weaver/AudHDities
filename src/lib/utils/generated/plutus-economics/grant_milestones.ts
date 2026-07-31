// =====================================================
// UTILITIES: GrantMilestones
// DEITY: plutus-economics
// GENERATED: 2026-07-31T01:03:41.254Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GrantMilestonesInsertSchema, GrantMilestonesUpdateSchema } from '@/lib/validators/generated/plutus-economics/grant_milestones';
import type { GrantMilestonesInsert, GrantMilestonesRow, GrantMilestonesUpdate } from '@/types/generated/plutus-economics/grant_milestones';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new grant_milestones record
 */
export async function createGrantMilestones(data: GrantMilestonesInsert): Promise<GrantMilestonesRow> {
  const validated = GrantMilestonesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_milestones')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single grant_milestones record by ID
 */
export async function getGrantMilestones(id: string): Promise<GrantMilestonesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('grant_milestones')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of grant_milestones records with pagination
 */
export async function listGrantMilestones(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GrantMilestonesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('grant_milestones').select('*', { count: 'exact' });
  
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
 * Update a grant_milestones record
 */
export async function updateGrantMilestones(id: string, data: GrantMilestonesUpdate): Promise<GrantMilestonesRow> {
  const validated = GrantMilestonesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_milestones')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a grant_milestones record
 */
export async function deleteGrantMilestones(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('grant_milestones')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
