// =====================================================
// UTILITIES: MerchantProfiles
// DEITY: hermes-social
// GENERATED: 2026-07-28T05:07:04.341Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { MerchantProfilesInsertSchema, MerchantProfilesUpdateSchema } from '@/lib/validators/generated/hermes-social/merchant_profiles';
import type { MerchantProfilesInsert, MerchantProfilesRow, MerchantProfilesUpdate } from '@/types/generated/hermes-social/merchant_profiles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new merchant_profiles record
 */
export async function createMerchantProfiles(data: MerchantProfilesInsert): Promise<MerchantProfilesRow> {
  const validated = MerchantProfilesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('merchant_profiles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single merchant_profiles record by ID
 */
export async function getMerchantProfiles(id: string): Promise<MerchantProfilesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('merchant_profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of merchant_profiles records with pagination
 */
export async function listMerchantProfiles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MerchantProfilesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('merchant_profiles').select('*', { count: 'exact' });
  
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
 * Update a merchant_profiles record
 */
export async function updateMerchantProfiles(id: string, data: MerchantProfilesUpdate): Promise<MerchantProfilesRow> {
  const validated = MerchantProfilesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('merchant_profiles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a merchant_profiles record
 */
export async function deleteMerchantProfiles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('merchant_profiles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
