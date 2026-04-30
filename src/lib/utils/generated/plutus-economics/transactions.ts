// =====================================================
// UTILITIES: Transactions
// DEITY: plutus-economics
// GENERATED: 2026-04-30T15:32:13.803Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { TransactionsInsertSchema, TransactionsUpdateSchema } from '@/lib/validators/generated/plutus-economics/transactions';
import type { TransactionsInsert, TransactionsRow, TransactionsUpdate } from '@/types/generated/plutus-economics/transactions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new transactions record
 */
export async function createTransactions(data: TransactionsInsert): Promise<TransactionsRow> {
  const validated = TransactionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('transactions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single transactions record by ID
 */
export async function getTransactions(id: string): Promise<TransactionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('transactions_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of transactions records with pagination
 */
export async function listTransactions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TransactionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('transactions').select('*', { count: 'exact' });
  
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
 * Update a transactions record
 */
export async function updateTransactions(id: string, data: TransactionsUpdate): Promise<TransactionsRow> {
  const validated = TransactionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('transactions')
    .update(validated)
    .eq('transactions_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a transactions record
 */
export async function deleteTransactions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('transactions_id', id);
  
  if (error) throw error;
  return true;
}
