// =====================================================
// FILE: types/generated/hermes-social/activity.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.719Z
// SOURCE: database.types.ts lines 206-266
// =====================================================

import type { Database } from '@/types/supabase/database.types';

import type { Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ActionType = Database['public']['Enums']['action_type'];
export type TargetType = Database['public']['Enums']['target_type'];
export type ActivityVisibility = Database['public']['Enums']['activity_visibility'];

// =====================================================
// CORE TYPES
// =====================================================

export type ActivityRow = Database['public']['Tables']['activity']['Row'];
export type ActivityInsert = Database['public']['Tables']['activity']['Insert'];
export type ActivityUpdate = Database['public']['Tables']['activity']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of activity
 */
export interface PublicActivity {
  action_type: ActionType;
  actor_id: string | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  metadata: Json | null;
  target_id: string | null;
  target_type: TargetType | null;
  user_id: string;
  visibility: ActivityVisibility | null;
}

/**
 * Form data for activity
 * All fields are optional for partial updates
 */
export interface ActivityFormData {
  action_type?: ActionType;
  actor_id?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  metadata?: Json | null;
  target_id?: string | null;
  target_type?: TargetType | null;
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
    actor_id?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    metadata?: string;
    target_id?: string;
    target_type?: string;
    user_id?: string;
    visibility?: string;
  };
}

