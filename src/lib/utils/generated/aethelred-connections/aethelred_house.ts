// =====================================================
// UTILITIES: AethelredHouse
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T15:32:13.282Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AethelredHouseInsertSchema, AethelredHouseUpdateSchema } from '@/lib/validators/generated/aethelred-connections/aethelred_house';
import type { AethelredHouseInsert, AethelredHouseRow, AethelredHouseUpdate } from '@/types/generated/aethelred-connections/aethelred_house';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new aethelred_house record
 */
export async function createAethelredHouse(data: AethelredHouseInsert): Promise<AethelredHouseRow> {
  const validated = AethelredHouseInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('aethelred_house')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single aethelred_house record by ID
 */
export async function getAethelredHouse(id: string): Promise<AethelredHouseRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('aethelred_house')
    .select('*')
    .eq('aethelred_house_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of aethelred_house records with pagination
 */
export async function listAethelredHouse(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AethelredHouseRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('aethelred_house').select('*', { count: 'exact' });
  
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
 * Update a aethelred_house record
 */
export async function updateAethelredHouse(id: string, data: AethelredHouseUpdate): Promise<AethelredHouseRow> {
  const validated = AethelredHouseUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('aethelred_house')
    .update(validated)
    .eq('aethelred_house_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a aethelred_house record
 */
export async function deleteAethelredHouse(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('aethelred_house')
    .delete()
    .eq('aethelred_house_id', id);
  
  if (error) throw error;
  return true;
}
