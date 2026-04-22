// =====================================================
// FILE: types/generated/hephaestus-infrastructure/maintenance.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.071Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MaintenanceStatus = Database['public']['Enums']['maintenance_status'];
export type MaintenanceType = Database['public']['Enums']['maintenance_type'];
export type MaintenanceRow = Tables<'maintenance'>;
export type MaintenanceInsert = TablesInsert<'maintenance'>;
export type MaintenanceUpdate = TablesUpdate<'maintenance'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of maintenance
 */
export interface PublicMaintenance {
  actual_end: string | null;
  actual_start: string | null;
  affected_systems: string[] | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  error_log: string | null;
  id: string;
  notes: string | null;
  performed_by: string | null;
  scheduled_end: string | null;
  scheduled_start: string | null;
  status: MaintenanceStatus | null;
  title: string;
  type: MaintenanceType;
  updated_at: string | null;
}

/**
 * Form data for maintenance
 * All fields are optional for partial updates
 */
export interface MaintenanceFormData {
  actual_end?: string | null;
  actual_start?: string | null;
  affected_systems?: string[] | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  error_log?: string | null;
  id?: string;
  notes?: string | null;
  performed_by?: string | null;
  scheduled_end?: string | null;
  scheduled_start?: string | null;
  status?: MaintenanceStatus | null;
  title?: string;
  type?: MaintenanceType;
  updated_at?: string | null;
}

