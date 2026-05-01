// =====================================================
// FILE: types/generated/themis-governance/moderation_actions.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-05-01T15:31:59.663Z
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

export type ModerationActionType = Enums<'moderation_action_type'>;
export type ModerationTargetType = Enums<'moderation_target_type'>;

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
  action_type: ModerationActionType;
  created_at: string | null;
  created_by: string | null;
  duration: string | null;
  is_reverted: boolean | null;
  metadata: Json | null;
  moderation_actions_id: string;
  moderator_id: string;
  reason: string | null;
  revert_reason: string | null;
  reverted_at: string | null;
  reverted_by: string | null;
  target_id: string;
  target_type: ModerationTargetType;
  updated_at: string | null;
}

/**
 * Form data for moderation_actions
 * All fields are optional for partial updates
 */
export interface ModerationActionsFormData {
  action_type?: ModerationActionType;
  created_at?: string | null;
  created_by?: string | null;
  duration?: string | null;
  is_reverted?: boolean | null;
  metadata?: Json | null;
  moderation_actions_id?: string;
  moderator_id?: string;
  reason?: string | null;
  revert_reason?: string | null;
  reverted_at?: string | null;
  reverted_by?: string | null;
  target_id?: string;
  target_type?: ModerationTargetType;
  updated_at?: string | null;
}

/**
 * Validation result for moderation_actions
 */
export interface ModerationActionsValidationResult {
  valid: boolean;
  errors: {
    action_type?: string;
    created_at?: string;
    created_by?: string;
    duration?: string;
    is_reverted?: string;
    metadata?: string;
    moderation_actions_id?: string;
    moderator_id?: string;
    reason?: string;
    revert_reason?: string;
    reverted_at?: string;
    reverted_by?: string;
    target_id?: string;
    target_type?: string;
    updated_at?: string;
  };
}

