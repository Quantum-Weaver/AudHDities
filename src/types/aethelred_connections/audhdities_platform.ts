// =====================================================
// FILE: types/aethelred_connections/audhdities_platform.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.634Z
// SOURCE: database.types.ts lines 571-638
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AudhditiesPlatformRow = Database['public']['Tables']['audhdities_platform']['Row'];
export type AudhditiesPlatformInsert = Database['public']['Tables']['audhdities_platform']['Insert'];
export type AudhditiesPlatformUpdate = Database['public']['Tables']['audhdities_platform']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for audhdities_platform
 * All fields are optional for partial updates
 */
export interface AudhditiesPlatformFormData {

}

/**
 * Validation result for audhdities_platform
 */
export interface AudhditiesPlatformValidationResult {
  valid: boolean;
  errors: {

  };
}

