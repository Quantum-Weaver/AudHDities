// =====================================================
// UTILITIES: Payouts
// DEITY: plutus-economics
// GENERATED: 2026-04-22T05:15:35.012Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PayoutsInsertSchema, PayoutsUpdateSchema } from '@/lib/validators/generated/plutus-economics/payouts';
import type { PayoutsInsert, PayoutsRow, PayoutsUpdate } from '@/types/generated/plutus-economics/payouts';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new payouts record
 */
export async function createPayouts(data: PayoutsInsert): Promise<PayoutsRow> {
  const validated = PayoutsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('payouts')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single payouts record by ID
 */
export async function getPayouts(id: string): Promise<PayoutsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('payouts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of payouts records with pagination
 */
export async function listPayouts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PayoutsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('payouts').select('*', { count: 'exact' });
  
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
 * Update a payouts record
 */
export async function updatePayouts(id: string, data: PayoutsUpdate): Promise<PayoutsRow> {
  const validated = PayoutsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('payouts')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a payouts record
 */
export async function deletePayouts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('payouts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
