// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/protocols.ts
// GENERATED: 2026-04-13T15:29:51.054Z
// SOURCE: database.types.ts
// =====================================================

import type { ProtocolsRow, ProtocolsInsert, ProtocolsUpdate } from 'src/types/generated/hephaestus-infrastructure/protocols.ts';
import { ProtocolsInsertSchema, ProtocolsUpdateSchema } from 'src/lib/validators/generated/protocols.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Protocols CRUD OPERATIONS
// =====================================================

/**
 * Create a new protocols record
 */
export async function createProtocols(data: ProtocolsInsert): Promise<{ data: ProtocolsRow | null; error: string | null }> {
  try {
    const validated = ProtocolsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('protocols')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating protocols:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a protocols record by ID
 */
export async function getProtocols(id: string): Promise<{ data: ProtocolsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching protocols:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List protocols records with pagination and filters
 */
export async function listProtocols(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProtocolsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('protocols').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing protocols:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a protocols record
 */
export async function updateProtocols(id: string, data: ProtocolsUpdate): Promise<{ data: ProtocolsRow | null; error: string | null }> {
  try {
    const validated = ProtocolsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('protocols')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating protocols:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a protocols record
 */
export async function deleteProtocols(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('protocols')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting protocols:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

