// =====================================================
// FILE: types/generated/hephaestus-infrastructure/maintenance.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T00:26:46.127Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MaintenanceStatus = Enums<'maintenance_status'>;
export type MaintenanceType = Enums<'maintenance_type'>;

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

/**
 * Validation result for maintenance
 */
export interface MaintenanceValidationResult {
  valid: boolean;
  errors: {
    actual_end?: string;
    actual_start?: string;
    affected_systems?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    error_log?: string;
    id?: string;
    notes?: string;
    performed_by?: string;
    scheduled_end?: string;
    scheduled_start?: string;
    status?: string;
    title?: string;
    type?: string;
    updated_at?: string;
  };
}

