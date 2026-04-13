// =====================================================
// FILE: types/generated/themis-governance/admin_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.885Z
// SOURCE: database.types.ts lines 267-353
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AdminLogCategory = Database['public']['Enums']['admin_log_category'];
export type AdminLogTargetType = Database['public']['Enums']['admin_log_target_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type AdminLogsRow = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogsInsert = Database['public']['Tables']['admin_logs']['Insert'];
export type AdminLogsUpdate = Database['public']['Tables']['admin_logs']['Update'];

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
  target_type:;
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

