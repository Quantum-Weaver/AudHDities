// =====================================================
// FILE: types/generated/themis-governance/moderation_actions.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.338Z
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

export type ModerationActionType = Database['public']['Enums']['moderation_action_type'];
export type ModerationTargetType = Database['public']['Enums']['moderation_target_type'];
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
  created_by?: string | null;
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

