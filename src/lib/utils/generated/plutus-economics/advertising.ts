// =====================================================
// UTILITIES: Advertising
// DEITY: plutus-economics
// GENERATED: 2026-04-30T15:32:13.276Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AdvertisingInsertSchema, AdvertisingUpdateSchema } from '@/lib/validators/generated/plutus-economics/advertising';
import type { AdvertisingInsert, AdvertisingRow, AdvertisingUpdate } from '@/types/generated/plutus-economics/advertising';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new advertising record
 */
export async function createAdvertising(data: AdvertisingInsert): Promise<AdvertisingRow> {
  const validated = AdvertisingInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('advertising')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single advertising record by ID
 */
export async function getAdvertising(id: string): Promise<AdvertisingRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('advertising')
    .select('*')
    .eq('advertising_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of advertising records with pagination
 */
export async function listAdvertising(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AdvertisingRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('advertising').select('*', { count: 'exact' });
  
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
 * Update a advertising record
 */
export async function updateAdvertising(id: string, data: AdvertisingUpdate): Promise<AdvertisingRow> {
  const validated = AdvertisingUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('advertising')
    .update(validated)
    .eq('advertising_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a advertising record
 */
export async function deleteAdvertising(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('advertising')
    .delete()
    .eq('advertising_id', id);
  
  if (error) throw error;
  return true;
}
