// =====================================================
// FILE: types/generated/hestia-core/energy_logs.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-05-01T03:24:41.395Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type EnergyLogsRow = Tables<'energy_logs'>;
export type EnergyLogsInsert = TablesInsert<'energy_logs'>;
export type EnergyLogsUpdate = TablesUpdate<'energy_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of energy_logs
 */
export interface PublicEnergyLogs {
  activity: string | null;
  created_at: string | null;
  created_by: string | null;
  energy_level: number;
  energy_logs_id: string;
  notes: string | null;
  updated_at: string | null;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for energy_logs
 * All fields are optional for partial updates
 */
export interface EnergyLogsFormData {
  activity?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  energy_level?: number;
  energy_logs_id?: string;
  notes?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for energy_logs
 */
export interface EnergyLogsValidationResult {
  valid: boolean;
  errors: {
    activity?: string;
    created_at?: string;
    created_by?: string;
    energy_level?: string;
    energy_logs_id?: string;
    notes?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

