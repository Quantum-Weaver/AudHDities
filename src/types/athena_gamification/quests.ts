// =====================================================
// FILE: types/athena_gamification/quests.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.793Z
// SOURCE: database.types.ts lines 3643-3701
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type QuestsRow = Database['public']['Tables']['quests']['Row'];
export type QuestsInsert = Database['public']['Tables']['quests']['Insert'];
export type QuestsUpdate = Database['public']['Tables']['quests']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for quests
 * All fields are optional for partial updates
 */
export interface QuestsFormData {

}

/**
 * Validation result for quests
 */
export interface QuestsValidationResult {
  valid: boolean;
  errors: {

  };
}

