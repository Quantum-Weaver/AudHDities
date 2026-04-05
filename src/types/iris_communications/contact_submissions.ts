// =====================================================
// FILE: types/iris_communications/contact_submissions.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.663Z
// SOURCE: database.types.ts lines 1109-1187
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ContactSubmissionsRow = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionsInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionsUpdate = Database['public']['Tables']['contact_submissions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for contact_submissions
 * All fields are optional for partial updates
 */
export interface ContactSubmissionsFormData {

}

/**
 * Validation result for contact_submissions
 */
export interface ContactSubmissionsValidationResult {
  valid: boolean;
  errors: {

  };
}

