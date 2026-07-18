// =====================================================
// UTILITIES: Order
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.369Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { OrderInsertSchema, OrderUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/order';
import type { OrderInsert, OrderRow, OrderUpdate } from '@/types/generated/mnemosyne-assessment/order';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new order record
 */
export async function createOrder(data: OrderInsert): Promise<OrderRow> {
  const validated = OrderInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('order')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single order record by ID
 */
export async function getOrder(id: string): Promise<OrderRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('order')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of order records with pagination
 */
export async function listOrder(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: OrderRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('order').select('*', { count: 'exact' });
  
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
 * Update a order record
 */
export async function updateOrder(id: string, data: OrderUpdate): Promise<OrderRow> {
  const validated = OrderUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('order')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a order record
 */
export async function deleteOrder(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('order')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
