// =====================================================
// UTILITIES: Sigils
// DEITY: athena-gamification
// GENERATED: 2026-07-31T23:16:54.846Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SigilsInsertSchema, SigilsUpdateSchema } from '@/lib/validators/generated/athena-gamification/sigils';
import type { SigilsInsert, SigilsRow, SigilsUpdate } from '@/types/generated/athena-gamification/sigils';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new sigils record
 */
export async function createSigils(data: SigilsInsert): Promise<SigilsRow> {
  const validated = SigilsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sigils')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single sigils record by ID
 */
export async function getSigils(id: string): Promise<SigilsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sigils')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of sigils records with pagination
 */
export async function listSigils(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SigilsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('sigils').select('*', { count: 'exact' });
  
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
 * Update a sigils record
 */
export async function updateSigils(id: string, data: SigilsUpdate): Promise<SigilsRow> {
  const validated = SigilsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sigils')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a sigils record
 */
export async function deleteSigils(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('sigils')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
