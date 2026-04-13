// =====================================================
// FILE: types/generated/hephaestus-infrastructure/system_health_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.755Z
// SOURCE: database.types.ts lines 6048-6092
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SystemStatus = Database['public']['Enums']['system_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type SystemHealthLogsRow = Database['public']['Tables']['system_health_logs']['Row'];
export type SystemHealthLogsInsert = Database['public']['Tables']['system_health_logs']['Insert'];
export type SystemHealthLogsUpdate = Database['public']['Tables']['system_health_logs']['Update'];

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

