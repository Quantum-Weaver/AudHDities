// =====================================================
// UTILITIES: RateLimits
// DEITY: themis-governance
// GENERATED: 2026-04-22T05:48:50.656Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { RateLimitsInsertSchema, RateLimitsUpdateSchema } from '@/lib/validators/generated/themis-governance/rate_limits';
import type { RateLimitsInsert, RateLimitsRow, RateLimitsUpdate } from '@/types/generated/themis-governance/rate_limits';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new rate_limits record
 */
export async function createRateLimits(data: RateLimitsInsert): Promise<RateLimitsRow> {
  const validated = RateLimitsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('rate_limits')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single rate_limits record by ID
 */
export async function getRateLimits(id: string): Promise<RateLimitsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of rate_limits records with pagination
 */
export async function listRateLimits(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RateLimitsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('rate_limits').select('*', { count: 'exact' });
  
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
 * Update a rate_limits record
 */
export async function updateRateLimits(id: string, data: RateLimitsUpdate): Promise<RateLimitsRow> {
  const validated = RateLimitsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('rate_limits')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a rate_limits record
 */
export async function deleteRateLimits(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('rate_limits')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
