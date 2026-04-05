// =====================================================
// FILE: types/iris_communications/email_communications.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.699Z
// SOURCE: database.types.ts lines 1761-1816
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type EmailCommunicationsRow = Database['public']['Tables']['email_communications']['Row'];
export type EmailCommunicationsInsert = Database['public']['Tables']['email_communications']['Insert'];
export type EmailCommunicationsUpdate = Database['public']['Tables']['email_communications']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for email_communications
 * All fields are optional for partial updates
 */
export interface EmailCommunicationsFormData {

}

/**
 * Validation result for email_communications
 */
export interface EmailCommunicationsValidationResult {
  valid: boolean;
  errors: {

  };
}

