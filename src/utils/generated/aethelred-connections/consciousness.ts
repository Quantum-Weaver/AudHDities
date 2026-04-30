// =====================================================
// UTILITIES: Consciousness
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:45.764Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ConsciousnessInsertSchema, ConsciousnessUpdateSchema } from '@/lib/validators/generated/aethelred-connections/consciousness';
import type { ConsciousnessInsert, ConsciousnessRow, ConsciousnessUpdate } from '@/types/generated/aethelred-connections/consciousness';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new consciousness record
 */
export async function createConsciousness(data: ConsciousnessInsert): Promise<ConsciousnessRow> {
  const validated = ConsciousnessInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('consciousness')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single consciousness record by ID
 */
export async function getConsciousness(id: string): Promise<ConsciousnessRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('consciousness')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of consciousness records with pagination
 */
export async function listConsciousness(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ConsciousnessRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('consciousness').select('*', { count: 'exact' });
  
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
 * Update a consciousness record
 */
export async function updateConsciousness(id: string, data: ConsciousnessUpdate): Promise<ConsciousnessRow> {
  const validated = ConsciousnessUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('consciousness')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a consciousness record
 */
export async function deleteConsciousness(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('consciousness')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
