// =====================================================
// FILE: types/athena_gamification/user_quests.ts
// HANDLING: join_table
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.896Z
// SOURCE: database.types.ts lines 5442-5495
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserQuestsRow = Database['public']['Tables']['user_quests']['Row'];
export type UserQuestsInsert = Database['public']['Tables']['user_quests']['Insert'];
export type UserQuestsUpdate = Database['public']['Tables']['user_quests']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_quests
 * All fields are optional for partial updates
 */
export interface UserQuestsFormData {

}

