// =====================================================
// FILE: types/generated/hestia-core/admin_actions.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.174Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AdminActionsRow = Tables<'admin_actions'>;
export type AdminActionsInsert = TablesInsert<'admin_actions'>;
export type AdminActionsUpdate = TablesUpdate<'admin_actions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of admin_actions
 */
export interface PublicAdminActions {
  action_type: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  metadata: Json | null;
  taken_at: string;
  taken_by: string | null;
  target_entity_id: string | null;
  target_entity_type: string | null;
  target_sovereign_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for admin_actions
 * All fields are optional for partial updates
 */
export interface AdminActionsFormData {
  action_type?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  metadata?: Json | null;
  taken_at?: string;
  taken_by?: string | null;
  target_entity_id?: string | null;
  target_entity_type?: string | null;
  target_sovereign_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for admin_actions
 */
export interface AdminActionsValidationResult {
  valid: boolean;
  errors: {
    action_type?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    metadata?: string;
    taken_at?: string;
    taken_by?: string;
    target_entity_id?: string;
    target_entity_type?: string;
    target_sovereign_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

