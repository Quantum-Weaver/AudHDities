// =====================================================
// FILE: types/generated/athena-gamification/user_badges.ts
// HANDLING: join_table
// GENERATED: 2026-04-13T06:13:41.757Z
// SOURCE: database.types.ts lines 6413-6467
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
  created_by?: string | null;
  display_on_profile?: boolean | null;
  earned_at?: string | null;
  earned_reason?: string | null;
  id?: string;
  user_id?: string;
}

