// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/maintenance.ts
// GENERATED: 2026-04-17T20:50:06.674Z
// SOURCE: database.types.ts
// =====================================================

import type { MaintenanceRow, MaintenanceInsert, MaintenanceUpdate } from '@/types/generated/hephaestus-infrastructure/maintenance';
import { MaintenanceRowSchema, MaintenanceInsertSchema, MaintenanceUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/maintenance';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Maintenance CRUD OPERATIONS
// =====================================================

/**
 * Create a new maintenance record
 */
export async function createMaintenance(data: MaintenanceInsert): Promise<{ data: MaintenanceRow | null; error: string | null }> {
  try {
    const validated = MaintenanceRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('maintenance')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating maintenance:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a maintenance record by ID
 */
export async function getMaintenance(id: string): Promise<{ data: MaintenanceRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('maintenance')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching maintenance:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List maintenance records with pagination and filters
 */
export async function listMaintenance(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MaintenanceRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('maintenance').select('*', { count: 'exact' });
    
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
    console.error('Error listing maintenance:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a maintenance record
 */
export async function updateMaintenance(id: string, data: MaintenanceUpdate): Promise<{ data: MaintenanceRow | null; error: string | null }> {
  try {
    const validated = MaintenanceUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('maintenance')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating maintenance:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a maintenance record
 */
export async function deleteMaintenance(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('maintenance')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting maintenance:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

