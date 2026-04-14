// =====================================================
// FILE: types/generated/hephaestus-infrastructure/maintenance.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:30.021Z
// SOURCE: database.types.ts lines 3067-3138
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MaintenanceStatus = Database['public']['Enums']['maintenance_status'];
export type MaintenanceType = Database['public']['Enums']['maintenance_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type MaintenanceRow = Database['public']['Tables']['maintenance']['Row'];
export type MaintenanceInsert = Database['public']['Tables']['maintenance']['Insert'];
export type MaintenanceUpdate = Database['public']['Tables']['maintenance']['Update'];

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
  "created_at": "string | null";
  created_by: string | null;
  description: string | null;
  error_log: string | null;
  id: string;
  notes: string | null;
  performed_by: string | null;
  "scheduled_end": "string | null";
  "scheduled_start": "string | null";
  status: MaintenanceStatus | null;
  title: string;
  type: MaintenanceType;
  "updated_at": "string | null";
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

