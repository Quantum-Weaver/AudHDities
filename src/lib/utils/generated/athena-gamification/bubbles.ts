// =====================================================
// UTILITIES: Bubbles
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:30:03.589Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BubblesInsertSchema, BubblesUpdateSchema } from '@/lib/validators/generated/athena-gamification/bubbles';
import type { BubblesInsert, BubblesRow, BubblesUpdate } from '@/types/generated/athena-gamification/bubbles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new bubbles record
 */
export async function createBubbles(data: BubblesInsert): Promise<BubblesRow> {
  const validated = BubblesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('bubbles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single bubbles record by ID
 */
export async function getBubbles(id: string): Promise<BubblesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bubbles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of bubbles records with pagination
 */
export async function listBubbles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BubblesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('bubbles').select('*', { count: 'exact' });
  
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
 * Update a bubbles record
 */
export async function updateBubbles(id: string, data: BubblesUpdate): Promise<BubblesRow> {
  const validated = BubblesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('bubbles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a bubbles record
 */
export async function deleteBubbles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('bubbles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
