// =====================================================
// UTILITIES: Resonance
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.476Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ResonanceInsertSchema, ResonanceUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/resonance';
import type { ResonanceInsert, ResonanceRow, ResonanceUpdate } from '@/types/generated/mnemosyne-assessment/resonance';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new resonance record
 */
export async function createResonance(data: ResonanceInsert): Promise<ResonanceRow> {
  const validated = ResonanceInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('resonance')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single resonance record by ID
 */
export async function getResonance(id: string): Promise<ResonanceRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resonance')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of resonance records with pagination
 */
export async function listResonance(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResonanceRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('resonance').select('*', { count: 'exact' });
  
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
 * Update a resonance record
 */
export async function updateResonance(id: string, data: ResonanceUpdate): Promise<ResonanceRow> {
  const validated = ResonanceUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('resonance')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a resonance record
 */
export async function deleteResonance(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('resonance')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
