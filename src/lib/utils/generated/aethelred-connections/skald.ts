// =====================================================
// UTILITIES: Skald
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:09:31.537Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SkaldInsertSchema, SkaldUpdateSchema } from '@/lib/validators/generated/aethelred-connections/skald';
import type { SkaldInsert, SkaldRow, SkaldUpdate } from '@/types/generated/aethelred-connections/skald';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new skald record
 */
export async function createSkald(data: SkaldInsert): Promise<SkaldRow> {
  const validated = SkaldInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('skald')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single skald record by ID
 */
export async function getSkald(id: string): Promise<SkaldRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('skald')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of skald records with pagination
 */
export async function listSkald(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SkaldRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('skald').select('*', { count: 'exact' });
  
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
 * Update a skald record
 */
export async function updateSkald(id: string, data: SkaldUpdate): Promise<SkaldRow> {
  const validated = SkaldUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('skald')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a skald record
 */
export async function deleteSkald(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('skald')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
