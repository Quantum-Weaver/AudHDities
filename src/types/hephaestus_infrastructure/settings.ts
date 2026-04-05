// =====================================================
// FILE: types/hephaestus_infrastructure/settings.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.841Z
// SOURCE: database.types.ts lines 4549-4587
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SettingsRow = Database['public']['Tables']['settings']['Row'];
export type SettingsInsert = Database['public']['Tables']['settings']['Insert'];
export type SettingsUpdate = Database['public']['Tables']['settings']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for settings
 * All fields are optional for partial updates
 */
export interface SettingsFormData {

}

/**
 * Validation result for settings
 */
export interface SettingsValidationResult {
  valid: boolean;
  errors: {

  };
}

