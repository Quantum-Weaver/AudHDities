// =====================================================
// UTILITIES: GiftWrappings
// DEITY: plutus-economics
// GENERATED: 2026-08-01T21:41:40.798Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GiftWrappingsInsertSchema, GiftWrappingsUpdateSchema } from '@/lib/validators/generated/plutus-economics/gift_wrappings';
import type { GiftWrappingsInsert, GiftWrappingsRow, GiftWrappingsUpdate } from '@/types/generated/plutus-economics/gift_wrappings';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new gift_wrappings record
 */
export async function createGiftWrappings(data: GiftWrappingsInsert): Promise<GiftWrappingsRow> {
  const validated = GiftWrappingsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gift_wrappings')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single gift_wrappings record by ID
 */
export async function getGiftWrappings(id: string): Promise<GiftWrappingsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gift_wrappings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of gift_wrappings records with pagination
 */
export async function listGiftWrappings(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GiftWrappingsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('gift_wrappings').select('*', { count: 'exact' });
  
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
 * Update a gift_wrappings record
 */
export async function updateGiftWrappings(id: string, data: GiftWrappingsUpdate): Promise<GiftWrappingsRow> {
  const validated = GiftWrappingsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gift_wrappings')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a gift_wrappings record
 */
export async function deleteGiftWrappings(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('gift_wrappings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
