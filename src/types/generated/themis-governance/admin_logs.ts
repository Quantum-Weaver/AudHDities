// =====================================================
// FILE: types/generated/themis-governance/admin_logs.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.599Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AdminLogCategory = Database['public']['Enums']['admin_log_category'];
export type AdminLogTargetType = Database['public']['Enums']['admin_log_target_type'];
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

