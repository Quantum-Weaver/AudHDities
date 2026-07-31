// =====================================================
// UTILITIES: Ledger
// DEITY: plutus-economics
// GENERATED: 2026-07-31T01:03:41.330Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LedgerInsertSchema, LedgerUpdateSchema } from '@/lib/validators/generated/plutus-economics/ledger';
import type { LedgerInsert, LedgerRow, LedgerUpdate } from '@/types/generated/plutus-economics/ledger';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new ledger record
 */
export async function createLedger(data: LedgerInsert): Promise<LedgerRow> {
  const validated = LedgerInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ledger')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single ledger record by ID
 */
export async function getLedger(id: string): Promise<LedgerRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ledger')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of ledger records with pagination
 */
export async function listLedger(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LedgerRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('ledger').select('*', { count: 'exact' });
  
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
 * Update a ledger record
 */
export async function updateLedger(id: string, data: LedgerUpdate): Promise<LedgerRow> {
  const validated = LedgerUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ledger')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a ledger record
 */
export async function deleteLedger(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('ledger')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
