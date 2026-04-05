// =====================================================
// FILE: types/hestia_core/channels.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.647Z
// SOURCE: database.types.ts lines 796-857
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ChannelsRow = Database['public']['Tables']['channels']['Row'];
export type ChannelsInsert = Database['public']['Tables']['channels']['Insert'];
export type ChannelsUpdate = Database['public']['Tables']['channels']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for channels
 * All fields are optional for partial updates
 */
export interface ChannelsFormData {

}

/**
 * Validation result for channels
 */
export interface ChannelsValidationResult {
  valid: boolean;
  errors: {

  };
}

