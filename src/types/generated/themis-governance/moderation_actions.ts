// =====================================================
// FILE: types/generated/themis-governance/moderation_actions.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-18T23:30:03.888Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ModerationActionsRow = Tables<'moderation_actions'>;
export type ModerationActionsInsert = TablesInsert<'moderation_actions'>;
export type ModerationActionsUpdate = TablesUpdate<'moderation_actions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of moderation_actions
 */
export interface PublicModerationActions {
  action_type: string;
  appealable: boolean;
  created_at: string;
  created_by: string | null;
  description: string | null;
  duration: string | null;
  expires_at: string | null;
  id: string;
  taken_at: string;
  taken_by: string | null;
  target_entity_id: string | null;
  target_entity_type: string | null;
  target_sovereign_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for moderation_actions
 * All fields are optional for partial updates
 */
export interface ModerationActionsFormData {
  action_type?: string;
  appealable?: boolean;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  duration?: string | null;
  expires_at?: string | null;
  id?: string;
  taken_at?: string;
  taken_by?: string | null;
  target_entity_id?: string | null;
  target_entity_type?: string | null;
  target_sovereign_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for moderation_actions
 */
export interface ModerationActionsValidationResult {
  valid: boolean;
  errors: {
    action_type?: string;
    appealable?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    duration?: string;
    expires_at?: string;
    id?: string;
    taken_at?: string;
    taken_by?: string;
    target_entity_id?: string;
    target_entity_type?: string;
    target_sovereign_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

