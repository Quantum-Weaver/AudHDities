// =====================================================
// FILE: types/hermes_social/messages.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.747Z
// SOURCE: database.types.ts lines 2694-2754
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type MessagesRow = Database['public']['Tables']['messages']['Row'];
export type MessagesInsert = Database['public']['Tables']['messages']['Insert'];
export type MessagesUpdate = Database['public']['Tables']['messages']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for messages
 * All fields are optional for partial updates
 */
export interface MessagesFormData {

}

/**
 * Validation result for messages
 */
export interface MessagesValidationResult {
  valid: boolean;
  errors: {

  };
}

