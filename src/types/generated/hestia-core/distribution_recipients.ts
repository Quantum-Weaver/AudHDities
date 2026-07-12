// =====================================================
// FILE: types/generated/hestia-core/distribution_recipients.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.367Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type DistributionRecipientsRow = Tables<'distribution_recipients'>;
export type DistributionRecipientsInsert = TablesInsert<'distribution_recipients'>;
export type DistributionRecipientsUpdate = TablesUpdate<'distribution_recipients'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of distribution_recipients
 */
export interface PublicDistributionRecipients {
  amount: number;
  created_at: string;
  created_by: string | null;
  distribution_id: string;
  id: string;
  status: string;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for distribution_recipients
 * All fields are optional for partial updates
 */
export interface DistributionRecipientsFormData {
  amount?: number;
  created_at?: string;
  created_by?: string | null;
  distribution_id?: string;
  id?: string;
  status?: string;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for distribution_recipients
 */
export interface DistributionRecipientsValidationResult {
  valid: boolean;
  errors: {
    amount?: string;
    created_at?: string;
    created_by?: string;
    distribution_id?: string;
    id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

