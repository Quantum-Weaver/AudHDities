// =====================================================
// UTILITIES: ResidualPool
// DEITY: plutus-economics
// GENERATED: 2026-04-23T02:16:59.040Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ResidualPoolInsertSchema, ResidualPoolUpdateSchema } from '@/lib/validators/generated/plutus-economics/residual_pool';
import type { ResidualPoolInsert, ResidualPoolRow, ResidualPoolUpdate } from '@/types/generated/plutus-economics/residual_pool';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new residual_pool record
 */
export async function createResidualPool(data: ResidualPoolInsert): Promise<ResidualPoolRow> {
  const validated = ResidualPoolInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('residual_pool')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single residual_pool record by ID
 */
export async function getResidualPool(id: string): Promise<ResidualPoolRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('residual_pool')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of residual_pool records with pagination
 */
export async function listResidualPool(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResidualPoolRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('residual_pool').select('*', { count: 'exact' });
  
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
 * Update a residual_pool record
 */
export async function updateResidualPool(id: string, data: ResidualPoolUpdate): Promise<ResidualPoolRow> {
  const validated = ResidualPoolUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('residual_pool')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a residual_pool record
 */
export async function deleteResidualPool(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('residual_pool')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
