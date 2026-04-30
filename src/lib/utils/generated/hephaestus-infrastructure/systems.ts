// =====================================================
// UTILITIES: Systems
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T15:32:13.786Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SystemsInsertSchema, SystemsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/systems';
import type { SystemsInsert, SystemsRow, SystemsUpdate } from '@/types/generated/hephaestus-infrastructure/systems';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new systems record
 */
export async function createSystems(data: SystemsInsert): Promise<SystemsRow> {
  const validated = SystemsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('systems')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single systems record by ID
 */
export async function getSystems(id: string): Promise<SystemsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('systems')
    .select('*')
    .eq('systems_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of systems records with pagination
 */
export async function listSystems(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('systems').select('*', { count: 'exact' });
  
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
 * Update a systems record
 */
export async function updateSystems(id: string, data: SystemsUpdate): Promise<SystemsRow> {
  const validated = SystemsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('systems')
    .update(validated)
    .eq('systems_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a systems record
 */
export async function deleteSystems(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('systems')
    .delete()
    .eq('systems_id', id);
  
  if (error) throw error;
  return true;
}
