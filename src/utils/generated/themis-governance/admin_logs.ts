// =====================================================
// FILE: utils/generated/themis-governance/admin_logs.ts
// GENERATED: 2026-04-13T21:47:21.118Z
// SOURCE: database.types.ts
// =====================================================

import type { AdminLogsRow, AdminLogsInsert, AdminLogsUpdate } from 'src/types/generated/themis-governance/admin_logs.ts';
import { AdminLogsInsertSchema, AdminLogsUpdateSchema } from 'src/lib/validators/generated/admin_logs.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// AdminLogs CRUD OPERATIONS
// =====================================================

/**
 * Create a new admin_logs record
 */
export async function createAdminLogs(data: AdminLogsInsert): Promise<{ data: AdminLogsRow | null; error: string | null }> {
  try {
    const validated = AdminLogsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('admin_logs')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating admin_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a admin_logs record by ID
 */
export async function getAdminLogs(id: string): Promise<{ data: AdminLogsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching admin_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List admin_logs records with pagination and filters
 */
export async function listAdminLogs(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AdminLogsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('admin_logs').select('*', { count: 'exact' });
    
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
    console.error('Error listing admin_logs:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a admin_logs record
 */
export async function updateAdminLogs(id: string, data: AdminLogsUpdate): Promise<{ data: AdminLogsRow | null; error: string | null }> {
  try {
    const validated = AdminLogsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('admin_logs')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating admin_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a admin_logs record
 */
export async function deleteAdminLogs(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('admin_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting admin_logs:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

