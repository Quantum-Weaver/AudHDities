// =====================================================
// UTILITIES: Disbursements
// DEITY: plutus-economics
// GENERATED: 2026-04-23T02:16:58.378Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { DisbursementsInsertSchema, DisbursementsUpdateSchema } from '@/lib/validators/generated/plutus-economics/disbursements';
import type { DisbursementsInsert, DisbursementsRow, DisbursementsUpdate } from '@/types/generated/plutus-economics/disbursements';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new disbursements record
 */
export async function createDisbursements(data: DisbursementsInsert): Promise<DisbursementsRow> {
  const validated = DisbursementsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('disbursements')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single disbursements record by ID
 */
export async function getDisbursements(id: string): Promise<DisbursementsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('disbursements')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of disbursements records with pagination
 */
export async function listDisbursements(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: DisbursementsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('disbursements').select('*', { count: 'exact' });
  
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
 * Update a disbursements record
 */
export async function updateDisbursements(id: string, data: DisbursementsUpdate): Promise<DisbursementsRow> {
  const validated = DisbursementsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('disbursements')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a disbursements record
 */
export async function deleteDisbursements(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('disbursements')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
