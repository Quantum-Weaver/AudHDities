// =====================================================
// FILE: types/hermes_social/activity.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T21:55:12.904Z
// SOURCE: database.types.ts lines 186-236
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ActionType = Database['public']['Enums']['action_type'];
export type TargetType = Database['public']['Enums']['target_type'];
export type ActivityVisibility = Database['public']['Enums']['activity_visibility'];

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
    id?: string;
    metadata?: string;
    target_id?: string;
    target_type?: string;
    user_id?: string;
    visibility?: string;
  };
}

