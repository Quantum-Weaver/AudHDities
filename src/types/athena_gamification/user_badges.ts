// =====================================================
// FILE: types/athena_gamification/user_badges.ts
// HANDLING: join_table
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.169Z
// SOURCE: database.types.ts lines 5279-5323
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserBadgesRow = Database['public']['Tables']['user_badges']['Row'];
export type UserBadgesInsert = Database['public']['Tables']['user_badges']['Insert'];
export type UserBadgesUpdate = Database['public']['Tables']['user_badges']['Update'];

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
  display_on_profile?: boolean | null;
  earned_at?: string | null;
  earned_reason?: string | null;
  id?: string;
  user_id?: string;
}

