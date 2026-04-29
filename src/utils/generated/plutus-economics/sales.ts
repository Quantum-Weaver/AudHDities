// =====================================================
// UTILITIES: Sales
// DEITY: plutus-economics
// GENERATED: 2026-04-29T20:53:53.492Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SalesInsertSchema, SalesUpdateSchema } from '@/lib/validators/generated/plutus-economics/sales';
import type { SalesInsert, SalesRow, SalesUpdate } from '@/types/generated/plutus-economics/sales';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new sales record
 */
export async function createSales(data: SalesInsert): Promise<SalesRow> {
  const validated = SalesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sales')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single sales record by ID
 */
export async function getSales(id: string): Promise<SalesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of sales records with pagination
 */
export async function listSales(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SalesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('sales').select('*', { count: 'exact' });
  
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
 * Update a sales record
 */
export async function updateSales(id: string, data: SalesUpdate): Promise<SalesRow> {
  const validated = SalesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sales')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a sales record
 */
export async function deleteSales(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('sales')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
