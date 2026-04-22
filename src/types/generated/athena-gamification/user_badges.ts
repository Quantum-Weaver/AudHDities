// =====================================================
// FILE: types/generated/athena-gamification/user_badges.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:15:10.949Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserBadgesRow = Tables<'user_badges'>;
export type UserBadgesInsert = TablesInsert<'user_badges'>;
export type UserBadgesUpdate = TablesUpdate<'user_badges'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_badges
 * All fields are optional for partial updates
 */
export interface UserBadgesFormData {
  badge_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  display_on_profile?: boolean | null;
  earned_at?: string | null;
  earned_reason?: string | null;
  id?: string;
  user_id?: string;
}

