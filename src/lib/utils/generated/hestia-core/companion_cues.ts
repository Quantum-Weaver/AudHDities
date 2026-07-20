// =====================================================
// UTILITIES: CompanionCues
// DEITY: hestia-core
// GENERATED: 2026-07-20T04:39:10.429Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CompanionCuesInsertSchema, CompanionCuesUpdateSchema } from '@/lib/validators/generated/hestia-core/companion_cues';
import type { CompanionCuesInsert, CompanionCuesRow, CompanionCuesUpdate } from '@/types/generated/hestia-core/companion_cues';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new companion_cues record
 */
export async function createCompanionCues(data: CompanionCuesInsert): Promise<CompanionCuesRow> {
  const validated = CompanionCuesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('companion_cues')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single companion_cues record by ID
 */
export async function getCompanionCues(id: string): Promise<CompanionCuesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('companion_cues')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of companion_cues records with pagination
 */
export async function listCompanionCues(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CompanionCuesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('companion_cues').select('*', { count: 'exact' });
  
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
 * Update a companion_cues record
 */
export async function updateCompanionCues(id: string, data: CompanionCuesUpdate): Promise<CompanionCuesRow> {
  const validated = CompanionCuesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('companion_cues')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a companion_cues record
 */
export async function deleteCompanionCues(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('companion_cues')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
