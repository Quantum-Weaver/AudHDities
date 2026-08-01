// =====================================================
// UTILITIES: Exchanges
// DEITY: plutus-economics
// GENERATED: 2026-08-01T18:34:04.346Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ExchangesInsertSchema, ExchangesUpdateSchema } from '@/lib/validators/generated/plutus-economics/exchanges';
import type { ExchangesInsert, ExchangesRow, ExchangesUpdate } from '@/types/generated/plutus-economics/exchanges';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new exchanges record
 */
export async function createExchanges(data: ExchangesInsert): Promise<ExchangesRow> {
  const validated = ExchangesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('exchanges')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single exchanges record by ID
 */
export async function getExchanges(id: string): Promise<ExchangesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('exchanges')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of exchanges records with pagination
 */
export async function listExchanges(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ExchangesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('exchanges').select('*', { count: 'exact' });
  
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
 * Update a exchanges record
 */
export async function updateExchanges(id: string, data: ExchangesUpdate): Promise<ExchangesRow> {
  const validated = ExchangesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('exchanges')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a exchanges record
 */
export async function deleteExchanges(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('exchanges')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
