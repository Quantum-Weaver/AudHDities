// =====================================================
// UTILITIES: GenerationTemplates
// DEITY: daedalus-meta
// GENERATED: 2026-07-18T23:09:31.224Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GenerationTemplatesInsertSchema, GenerationTemplatesUpdateSchema } from '@/lib/validators/generated/daedalus-meta/generation_templates';
import type { GenerationTemplatesInsert, GenerationTemplatesRow, GenerationTemplatesUpdate } from '@/types/generated/daedalus-meta/generation_templates';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new generation_templates record
 */
export async function createGenerationTemplates(data: GenerationTemplatesInsert): Promise<GenerationTemplatesRow> {
  const validated = GenerationTemplatesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('generation_templates')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single generation_templates record by ID
 */
export async function getGenerationTemplates(id: string): Promise<GenerationTemplatesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('generation_templates')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of generation_templates records with pagination
 */
export async function listGenerationTemplates(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GenerationTemplatesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('generation_templates').select('*', { count: 'exact' });
  
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
 * Update a generation_templates record
 */
export async function updateGenerationTemplates(id: string, data: GenerationTemplatesUpdate): Promise<GenerationTemplatesRow> {
  const validated = GenerationTemplatesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('generation_templates')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a generation_templates record
 */
export async function deleteGenerationTemplates(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('generation_templates')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
