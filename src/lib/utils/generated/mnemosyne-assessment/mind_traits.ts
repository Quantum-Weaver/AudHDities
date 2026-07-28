// =====================================================
// UTILITIES: MindTraits
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.350Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { MindTraitsInsertSchema, MindTraitsUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/mind_traits';
import type { MindTraitsInsert, MindTraitsRow, MindTraitsUpdate } from '@/types/generated/mnemosyne-assessment/mind_traits';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new mind_traits record
 */
export async function createMindTraits(data: MindTraitsInsert): Promise<MindTraitsRow> {
  const validated = MindTraitsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('mind_traits')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single mind_traits record by ID
 */
export async function getMindTraits(id: string): Promise<MindTraitsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('mind_traits')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of mind_traits records with pagination
 */
export async function listMindTraits(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MindTraitsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('mind_traits').select('*', { count: 'exact' });
  
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
 * Update a mind_traits record
 */
export async function updateMindTraits(id: string, data: MindTraitsUpdate): Promise<MindTraitsRow> {
  const validated = MindTraitsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('mind_traits')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a mind_traits record
 */
export async function deleteMindTraits(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('mind_traits')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
