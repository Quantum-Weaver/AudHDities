// =====================================================
// UTILITIES: ResidualPayouts
// DEITY: plutus-economics
// GENERATED: 2026-05-01T03:24:41.988Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ResidualPayoutsInsertSchema, ResidualPayoutsUpdateSchema } from '@/lib/validators/generated/plutus-economics/residual_payouts';
import type { ResidualPayoutsInsert, ResidualPayoutsRow, ResidualPayoutsUpdate } from '@/types/generated/plutus-economics/residual_payouts';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new residual_payouts record
 */
export async function createResidualPayouts(data: ResidualPayoutsInsert): Promise<ResidualPayoutsRow> {
  const validated = ResidualPayoutsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('residual_payouts')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single residual_payouts record by ID
 */
export async function getResidualPayouts(id: string): Promise<ResidualPayoutsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('residual_payouts')
    .select('*')
    .eq('residual_payouts_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of residual_payouts records with pagination
 */
export async function listResidualPayouts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResidualPayoutsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('residual_payouts').select('*', { count: 'exact' });
  
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
 * Update a residual_payouts record
 */
export async function updateResidualPayouts(id: string, data: ResidualPayoutsUpdate): Promise<ResidualPayoutsRow> {
  const validated = ResidualPayoutsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('residual_payouts')
    .update(validated)
    .eq('residual_payouts_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a residual_payouts record
 */
export async function deleteResidualPayouts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('residual_payouts')
    .delete()
    .eq('residual_payouts_id', id);
  
  if (error) throw error;
  return true;
}
