// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/system_health_logs.ts
// GENERATED: 2026-04-13T06:13:42.205Z
// SOURCE: database.types.ts
// =====================================================

import type { SystemHealthLogsRow, SystemHealthLogsInsert, SystemHealthLogsUpdate } from '@/types/hephaestus-infrastructure/system_health_logs';
import { SystemHealthLogsInsertSchema, SystemHealthLogsUpdateSchema } from '@/lib/validators/system_health_logs';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// SystemHealthLogs CRUD OPERATIONS
// =====================================================

/**
 * Create a new system_health_logs record
 */
export async function createSystemHealthLogs(data: SystemHealthLogsInsert): Promise<{ data: SystemHealthLogsRow | null; error: string | null }> {
  try {
    const validated = SystemHealthLogsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('system_health_logs')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating system_health_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a system_health_logs record by ID
 */
export async function getSystemHealthLogs(id: string): Promise<{ data: SystemHealthLogsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('system_health_logs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching system_health_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List system_health_logs records with pagination and filters
 */
export async function listSystemHealthLogs(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemHealthLogsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('system_health_logs').select('*', { count: 'exact' });
    
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
    console.error('Error listing system_health_logs:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a system_health_logs record
 */
export async function updateSystemHealthLogs(id: string, data: SystemHealthLogsUpdate): Promise<{ data: SystemHealthLogsRow | null; error: string | null }> {
  try {
    const validated = SystemHealthLogsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('system_health_logs')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating system_health_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a system_health_logs record
 */
export async function deleteSystemHealthLogs(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('system_health_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting system_health_logs:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

