// =====================================================
// FILE: types/hermes_social/notifications.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.756Z
// SOURCE: database.types.ts lines 2878-2933
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type NotificationsRow = Database['public']['Tables']['notifications']['Row'];
export type NotificationsInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationsUpdate = Database['public']['Tables']['notifications']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for notifications
 * All fields are optional for partial updates
 */
export interface NotificationsFormData {

}

/**
 * Validation result for notifications
 */
export interface NotificationsValidationResult {
  valid: boolean;
  errors: {

  };
}

