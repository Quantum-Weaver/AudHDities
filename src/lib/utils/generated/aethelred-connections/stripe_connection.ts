// =====================================================
// UTILITIES: StripeConnection
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:30:04.073Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { StripeConnectionInsertSchema, StripeConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/stripe_connection';
import type { StripeConnectionInsert, StripeConnectionRow, StripeConnectionUpdate } from '@/types/generated/aethelred-connections/stripe_connection';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new stripe_connection record
 */
export async function createStripeConnection(data: StripeConnectionInsert): Promise<StripeConnectionRow> {
  const validated = StripeConnectionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('stripe_connection')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single stripe_connection record by ID
 */
export async function getStripeConnection(id: string): Promise<StripeConnectionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('stripe_connection')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of stripe_connection records with pagination
 */
export async function listStripeConnection(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: StripeConnectionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('stripe_connection').select('*', { count: 'exact' });
  
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
 * Update a stripe_connection record
 */
export async function updateStripeConnection(id: string, data: StripeConnectionUpdate): Promise<StripeConnectionRow> {
  const validated = StripeConnectionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('stripe_connection')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a stripe_connection record
 */
export async function deleteStripeConnection(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('stripe_connection')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
