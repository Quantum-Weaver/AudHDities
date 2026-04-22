// =====================================================
// FILE: types/generated/hephaestus-infrastructure/system_health_logs.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.982Z
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

export type SystemStatus = Database['public']['Enums']['system_status'];
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

