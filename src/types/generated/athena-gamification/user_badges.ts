// =====================================================
// FILE: types/generated/athena-gamification/user_badges.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-04-30T00:26:46.832Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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

