// =====================================================
// FILE: types/generated/hephaestus-infrastructure/maintenance.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-18T23:17:10.931Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  created_at: string;
  created_by: string | null;
  cron_expression: string | null;
  description: string | null;
  id: string;
  is_enabled: boolean;
  last_run_at: string | null;
  last_run_status: string | null;
  name: string;
  next_run_at: string | null;
  priority: string;
  slug: string;
  status: ContentStatus;
  task_config: Json | null;
  task_type: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for maintenance
 * All fields are optional for partial updates
 */
export interface MaintenanceFormData {
  created_at?: string;
  created_by?: string | null;
  cron_expression?: string | null;
  description?: string | null;
  id?: string;
  is_enabled?: boolean;
  last_run_at?: string | null;
  last_run_status?: string | null;
  name?: string;
  next_run_at?: string | null;
  priority?: string;
  slug?: string;
  status?: ContentStatus;
  task_config?: Json | null;
  task_type?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for maintenance
 */
export interface MaintenanceValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    cron_expression?: string;
    description?: string;
    id?: string;
    is_enabled?: string;
    last_run_at?: string;
    last_run_status?: string;
    name?: string;
    next_run_at?: string;
    priority?: string;
    slug?: string;
    status?: string;
    task_config?: string;
    task_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

