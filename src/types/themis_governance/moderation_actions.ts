// =====================================================
// FILE: types/themis_governance/moderation_actions.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T18:12:44.750Z
// SOURCE: database.types.ts lines 2755-2817
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ModerationActionsRow = Database['public']['Tables']['moderation_actions']['Row'];
export type ModerationActionsInsert = Database['public']['Tables']['moderation_actions']['Insert'];
export type ModerationActionsUpdate = Database['public']['Tables']['moderation_actions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for moderation_actions
 * All fields are optional for partial updates
 */
export interface ModerationActionsFormData {

}

/**
 * Validation result for moderation_actions
 */
export interface ModerationActionsValidationResult {
  valid: boolean;
  errors: {

  };
}

