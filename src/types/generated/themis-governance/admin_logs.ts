// =====================================================
// FILE: types/generated/themis-governance/admin_logs.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-04-23T02:14:52.495Z
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

export type AdminLogCategory = Enums<'admin_log_category'>;
export type AdminLogTargetType = Enums<'admin_log_target_type'>;

export type AdminLogsRow = Tables<'admin_logs'>;
export type AdminLogsInsert = TablesInsert<'admin_logs'>;
export type AdminLogsUpdate = TablesUpdate<'admin_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of admin_logs
 * Excludes sensitive fields: ip_address, user_agent
 */
export interface PublicAdminLogs {
  action: string;
  action_category: AdminLogCategory;
  admin_id: string;
  created_at: string | null;
  created_by: string | null;
  error_message: string | null;
  id: string;
  is_public: boolean | null;
  metadata: Json | null;
  new_state: Json | null;
  previous_state: Json | null;
  public_note: string | null;
  reason: string | null;
  success: boolean | null;
  target_id: string | null;
  target_identifier: string | null;
  target_type: AdminLogTargetType;
}

/**
 * Form data for admin_logs
 * All fields are optional for partial updates
 */
export interface AdminLogsFormData {
  action?: string;
  action_category?: AdminLogCategory;
  admin_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  error_message?: string | null;
  id?: string;
  ip_address?: unknown;
  is_public?: boolean | null;
  metadata?: Json | null;
  new_state?: Json | null;
  previous_state?: Json | null;
  public_note?: string | null;
  reason?: string | null;
  success?: boolean | null;
  target_id?: string | null;
  target_identifier?: string | null;
  user_agent?: string | null;
}

/**
 * Validation result for admin_logs
 */
export interface AdminLogsValidationResult {
  valid: boolean;
  errors: {
    action?: string;
    action_category?: string;
    admin_id?: string;
    created_at?: string;
    created_by?: string;
    error_message?: string;
    id?: string;
    ip_address?: string;
    is_public?: string;
    metadata?: string;
    new_state?: string;
    previous_state?: string;
    public_note?: string;
    reason?: string;
    success?: string;
    target_id?: string;
    target_identifier?: string;
    target_type?: string;
    user_agent?: string;
  };
}

