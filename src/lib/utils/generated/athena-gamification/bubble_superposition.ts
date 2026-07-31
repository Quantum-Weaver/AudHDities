// =====================================================
// UTILITIES: BubbleSuperposition
// DEITY: athena-gamification
// GENERATED: 2026-07-31T01:03:40.899Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BubbleSuperpositionInsertSchema, BubbleSuperpositionUpdateSchema } from '@/lib/validators/generated/athena-gamification/bubble_superposition';
import type { BubbleSuperpositionInsert, BubbleSuperpositionRow, BubbleSuperpositionUpdate } from '@/types/generated/athena-gamification/bubble_superposition';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new bubble_superposition record
 */
export async function createBubbleSuperposition(data: BubbleSuperpositionInsert): Promise<BubbleSuperpositionRow> {
  const validated = BubbleSuperpositionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('bubble_superposition')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single bubble_superposition record by ID
 */
export async function getBubbleSuperposition(id: string): Promise<BubbleSuperpositionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bubble_superposition')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of bubble_superposition records with pagination
 */
export async function listBubbleSuperposition(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BubbleSuperpositionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('bubble_superposition').select('*', { count: 'exact' });
  
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
 * Update a bubble_superposition record
 */
export async function updateBubbleSuperposition(id: string, data: BubbleSuperpositionUpdate): Promise<BubbleSuperpositionRow> {
  const validated = BubbleSuperpositionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('bubble_superposition')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a bubble_superposition record
 */
export async function deleteBubbleSuperposition(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('bubble_superposition')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
