// =====================================================
// FILE: types/hephaestus_infrastructure/system_health_logs.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:13.101Z
// SOURCE: database.types.ts lines 4965-4999
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SystemStatus = Database['public']['Enums']['system_status'];

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
    error_message?: string;
    id?: string;
    response_time_ms?: string;
    status?: string;
    system_id?: string;
  };
}

