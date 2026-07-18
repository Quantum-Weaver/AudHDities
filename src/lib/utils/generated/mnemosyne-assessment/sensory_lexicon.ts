// =====================================================
// UTILITIES: SensoryLexicon
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:04.041Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SensoryLexiconInsertSchema, SensoryLexiconUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/sensory_lexicon';
import type { SensoryLexiconInsert, SensoryLexiconRow, SensoryLexiconUpdate } from '@/types/generated/mnemosyne-assessment/sensory_lexicon';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new sensory_lexicon record
 */
export async function createSensoryLexicon(data: SensoryLexiconInsert): Promise<SensoryLexiconRow> {
  const validated = SensoryLexiconInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sensory_lexicon')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single sensory_lexicon record by ID
 */
export async function getSensoryLexicon(id: string): Promise<SensoryLexiconRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sensory_lexicon')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of sensory_lexicon records with pagination
 */
export async function listSensoryLexicon(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SensoryLexiconRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('sensory_lexicon').select('*', { count: 'exact' });
  
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
 * Update a sensory_lexicon record
 */
export async function updateSensoryLexicon(id: string, data: SensoryLexiconUpdate): Promise<SensoryLexiconRow> {
  const validated = SensoryLexiconUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sensory_lexicon')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a sensory_lexicon record
 */
export async function deleteSensoryLexicon(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('sensory_lexicon')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
