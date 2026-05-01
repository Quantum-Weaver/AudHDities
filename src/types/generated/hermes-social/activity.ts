// =====================================================
// FILE: types/generated/hermes-social/activity.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-05-01T15:31:59.398Z
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

export type ActionType = Enums<'action_type'>;
export type TargetType = Enums<'target_type'>;
export type ActivityVisibility = Enums<'activity_visibility'>;

export type ActivityRow = Tables<'activity'>;
export type ActivityInsert = TablesInsert<'activity'>;
export type ActivityUpdate = TablesUpdate<'activity'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of activity
 */
export interface PublicActivity {
  action_type: ActionType;
  activity_id: string;
  actor_id: string | null;
  created_at: string | null;
  created_by: string | null;
  metadata: Json | null;
  target_id: string | null;
  target_type: TargetType | null;
  updated_at: string | null;
  updated_by: string | null;
  user_id: string;
  visibility: ActivityVisibility | null;
}

/**
 * Form data for activity
 * All fields are optional for partial updates
 */
export interface ActivityFormData {
  action_type?: ActionType;
  activity_id?: string;
  actor_id?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  metadata?: Json | null;
  target_id?: string | null;
  target_type?: TargetType | null;
  updated_at?: string | null;
  updated_by?: string | null;
  user_id?: string;
  visibility?: ActivityVisibility | null;
}

/**
 * Validation result for activity
 */
export interface ActivityValidationResult {
  valid: boolean;
  errors: {
    action_type?: string;
    activity_id?: string;
    actor_id?: string;
    created_at?: string;
    created_by?: string;
    metadata?: string;
    target_id?: string;
    target_type?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
    visibility?: string;
  };
}

