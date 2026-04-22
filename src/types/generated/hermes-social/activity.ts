// =====================================================
// FILE: types/generated/hermes-social/activity.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.580Z
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

export type ActionType = Database['public']['Enums']['action_type'];
export type TargetType = Database['public']['Enums']['target_type'];
export type ActivityVisibility = Database['public']['Enums']['activity_visibility'];
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

