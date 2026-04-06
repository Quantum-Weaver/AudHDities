// =====================================================
// FILE: types/themis_governance/moderation_actions.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T21:55:13.013Z
// SOURCE: database.types.ts lines 2755-2817
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ModerationActionType = Database['public']['Enums']['moderation_action_type'];
export type ModerationTargetType = Database['public']['Enums']['moderation_target_type'];

export type ModerationActionsRow = Database['public']['Tables']['moderation_actions']['Row'];
export type ModerationActionsInsert = Database['public']['Tables']['moderation_actions']['Insert'];
export type ModerationActionsUpdate = Database['public']['Tables']['moderation_actions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of moderation_actions
 */
export interface PublicModerationActions {
  action_type: ModerationActionType;
  created_at: string | null;
  duration: string | null;
  id: string;
  is_reverted: boolean | null;
  metadata: Json | null;
  moderator_id: string;
  reason: string | null;
  revert_reason: string | null;
  reverted_at: string | null;
  reverted_by: string | null;
  target_id: string;
  target_type: ModerationTargetType;
}

/**
 * Form data for moderation_actions
 * All fields are optional for partial updates
 */
export interface ModerationActionsFormData {
  action_type?: ModerationActionType;
  created_at?: string | null;
  duration?: string | null;
  id?: string;
  is_reverted?: boolean | null;
  metadata?: Json | null;
  moderator_id?: string;
  reason?: string | null;
  revert_reason?: string | null;
  reverted_at?: string | null;
  reverted_by?: string | null;
  target_id?: string;
  target_type?: ModerationTargetType;
}

/**
 * Validation result for moderation_actions
 */
export interface ModerationActionsValidationResult {
  valid: boolean;
  errors: {
    action_type?: string;
    created_at?: string;
    duration?: string;
    id?: string;
    is_reverted?: string;
    metadata?: string;
    moderator_id?: string;
    reason?: string;
    revert_reason?: string;
    reverted_at?: string;
    reverted_by?: string;
    target_id?: string;
    target_type?: string;
  };
}

