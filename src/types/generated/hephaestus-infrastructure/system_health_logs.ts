// =====================================================
// FILE: types/generated/hephaestus-infrastructure/system_health_logs.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-23T02:14:53.658Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SystemStatus = Enums<'system_status'>;

export type SystemHealthLogsRow = Tables<'system_health_logs'>;
export type SystemHealthLogsInsert = TablesInsert<'system_health_logs'>;
export type SystemHealthLogsUpdate = TablesUpdate<'system_health_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of system_health_logs
 */
export interface PublicSystemHealthLogs {
  checked_at: string | null;
  created_by: string | null;
  error_message: string | null;
  id: string;
  response_time_ms: number | null;
  status: SystemStatus;
  system_id: string;
}

/**
 * Form data for system_health_logs
 * All fields are optional for partial updates
 */
export interface SystemHealthLogsFormData {
  checked_at?: string | null;
  created_by?: string | null;
  error_message?: string | null;
  id?: string;
  response_time_ms?: number | null;
  status?: SystemStatus;
  system_id?: string;
}

/**
 * Validation result for system_health_logs
 */
export interface SystemHealthLogsValidationResult {
  valid: boolean;
  errors: {
    checked_at?: string;
    created_by?: string;
    error_message?: string;
    id?: string;
    response_time_ms?: string;
    status?: string;
    system_id?: string;
  };
}

